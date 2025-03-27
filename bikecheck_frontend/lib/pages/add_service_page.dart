import 'dart:convert';
import 'package:bikecheck_frontend/classes/bike.dart';
import 'package:bikecheck_frontend/classes/component.dart';
import 'package:bikecheck_frontend/router.config.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class AddServicePage extends StatefulWidget {
  const AddServicePage({super.key});

  @override
  State<AddServicePage> createState() => _AddServicePageState();
}

class _AddServicePageState extends State<AddServicePage> {
  final TextEditingController _descController = TextEditingController();

  Future<void> _addService(Component component, Bike bike) async {
    final String apiUrl = 'https://bikecheck.onrender.com/service/components/${component.componentId}/service_intervals';
    final Map<String, dynamic> body = {
      'description': _descController.text.isNotEmpty ? _descController.text : 'Service for ${component.name}',
    };

    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );

    if (response.statusCode == 200) {
      print('Service added successfully');
      router.go('/services', extra: {'bike': bike, 'component': component});
    } else {
      print('Failed to add service, error code: ${response.statusCode}, body: ${response.body}');
      router.go('/services', extra: {'bike': bike, 'component': component});
    }
  }

  @override
  Widget build(BuildContext context) {
    final extras = GoRouterState.of(context).extra as Map<String, dynamic>?;
    final Bike? bike = extras!['bike'] as Bike?;
    final Component? component = extras['component'] as Component?;
    return Scaffold(
      appBar: AppBar(title: Text('Add service to component ${component!.name}', style:  const TextStyle(fontWeight: FontWeight.bold)),
      leading: IconButton(onPressed: () => router.go('/services', extra: {'bike': bike, 'component': component}), icon: const Icon(Icons.arrow_back)),),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _descController,
              decoration: const InputDecoration(labelText: 'Service description'),
            ),
            const SizedBox(height: 24),
            Center(
              child: ElevatedButton(
                onPressed: () => _addService(component, bike!),
                child: const Text('Add Service'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}