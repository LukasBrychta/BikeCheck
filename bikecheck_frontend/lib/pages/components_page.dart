import 'package:bikecheck_frontend/classes/userinfo.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:bikecheck_frontend/classes/bike.dart';
import 'package:bikecheck_frontend/classes/component.dart';

class ComponentsPage extends StatefulWidget {
  const ComponentsPage({super.key});

  @override
  State<ComponentsPage> createState() => _ComponentsPageState();
}

class _ComponentsPageState extends State<ComponentsPage> {
  Bike? bike;
  bool isLoading = true;

  @override
  void didChangeDependencies() { //called when the dependencies of the state object change
    super.didChangeDependencies();
    if (bike == null) {
      bike = GoRouterState.of(context).extra as Bike?;
      if(bike != null) {
        UserInfo.instance.user!.bikes![bike!.bikeId]!.components = {};
        _fetchComponets(bike!.bikeId);
      }
    } else {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> _fetchComponets(String bikeId) async {
    try {
      final componentsUri = Uri.parse(
          'https://bikecheck.onrender.com/components/bikes/$bikeId/components');
      final response = await http.get(
        componentsUri,
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        Map<String, dynamic> data = jsonDecode(response.body);
        List<dynamic> componentList = data['components'];
        Map<String, Component> componentMap = {
          for (var component in componentList)
            component['component_id'].toString(): Component.fromJson(component)
        };
        setState(() {
          UserInfo.instance.user!.bikes![bike!.bikeId]!.components = componentMap;
          isLoading = false;
        });
      } else {
        print(
            'Failed to fetch components, error code: ${response.statusCode}, body: ${response.body}');
        setState(() {
          isLoading = false;
        });
      }
    } catch (e) {
      print('Failed to fetch components: $e');
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
          title: Text('${bike!.name} components'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('${bike?.name} components')),
      body: UserInfo.instance.user!.bikes![bike!.bikeId]!.components!.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('No components for this bike'),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      _fetchComponets(bike!.bikeId);
                    },
                    child: Text('Retry'),
                  ),
                ],
              ),
            )
          : ListView.builder(
              itemCount: UserInfo.instance.user!.bikes![bike!.bikeId]!.components!.length,
              itemBuilder: (context, index) {
                var component = UserInfo.instance.user!.bikes![bike!.bikeId]!.components!.values.toList()[index];
                return Card(
                  child: ListTile(
                    title: Text(component.name),
                    subtitle: Text('${component.type.toString().split('.').last} - ${component.usage} km'),
                  ),
                );
              },
            ),
    );
  }
}
