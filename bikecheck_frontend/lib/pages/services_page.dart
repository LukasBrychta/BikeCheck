import 'package:bikecheck_frontend/classes/bike.dart';
import 'package:bikecheck_frontend/classes/component.dart';
import 'package:bikecheck_frontend/classes/service.dart';
import 'package:bikecheck_frontend/classes/userinfo.dart';
import 'package:bikecheck_frontend/router.config.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ServicesPage extends StatefulWidget {
  const ServicesPage({super.key});

  @override
  State<ServicesPage> createState() => _ServicesPageState();
}

class _ServicesPageState extends State<ServicesPage> {
  Bike? bike;
  Component? component;
  bool isLoading = true;

  @override
  void didChangeDependencies() { //called once when component is recieved, prevents multiple calls to fetch services
    super.didChangeDependencies();
    if (component == null && bike == null) {
      final extras = GoRouterState.of(context).extra as Map<String, dynamic>?;
      bike = extras!['bike'] as Bike?;
      component = extras['component'] as Component?;
      if(component != null && bike != null) {
        UserInfo.instance.user!.bikes![bike!.bikeId]!.components![component!.componentId]!.services = {};
        _fetchServices(component!.componentId!);
      }
    } else {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> _fetchServices(int componentId) async {
    try {
      final servicesUri = Uri.parse(
          'https://bikecheck.onrender.com/service/components/$componentId/service_intervals');
      final response = await http.get(
        servicesUri,
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        Map<String, dynamic> data = jsonDecode(response.body);
        List<dynamic> serviceList = data['services'];
        Map<int, Service> serviceMap = {
          for (var service in serviceList)
            service['service_id']: Service.fromJson(service)
        };
        setState(() {
          UserInfo.instance.user!.bikes![bike!.bikeId]!.components![component!.componentId]!.services = serviceMap;
          isLoading = false;
        });
      } else {
        print(
            'Failed to fetch services, error code: ${response.statusCode}, body: ${response.body}');
        setState(() {
          isLoading = false;
        });
      }
    } catch (e) {
      print('Failed to fetch services: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: Text('${component!.name} services', style:  const TextStyle(fontWeight: FontWeight.bold)),
          leading: IconButton(onPressed: () => router.go('/components', extra: bike), icon: const Icon(Icons.arrow_back)),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ), 
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('${component?.name} services', style:  const TextStyle(fontWeight: FontWeight.bold)), leading: IconButton(onPressed: () => router.go('/components', extra: bike), icon: const Icon(Icons.arrow_back)),),
      body: UserInfo.instance.user!.bikes![bike!.bikeId]!.components![component!.componentId]!.services!.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('No services found for this component'),
                  ElevatedButton(
                    onPressed: () => router.go('/addService', extra: {'bike': bike, 'component': component}), 
                    child: const Text('Add service'),
                  ),
                ],
              ),
          )
        : Center(
            child: Column(
              children: [
                Expanded(
                  child: ListView.builder(
                      itemCount: UserInfo.instance.user!.bikes![bike!.bikeId]!.components![component!.componentId]!.services!.length,
                      itemBuilder: (context, index) {
                        var service = UserInfo.instance.user!.bikes![bike!.bikeId]!.components![component!.componentId]!.services!.values.toList()[index];
                        return Card(
                          child: ListTile(
                            title: Text(service.description),
                            subtitle: Text('Date: ${service.date}'),
                          ),
                        );
                      },
                    ),
                ),
                  ElevatedButton(onPressed: () => router.go('/addService', extra: {'bike': bike, 'component': component}), child: const Text('Add Service'))
              ],
            ),
          ),
    );
  }
}