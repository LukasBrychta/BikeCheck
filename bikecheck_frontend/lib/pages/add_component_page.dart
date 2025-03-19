import 'dart:io';

import 'package:bikecheck_frontend/classes/component.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:bikecheck_frontend/classes/bike.dart';

class AddComponentPage extends StatefulWidget {
  const AddComponentPage({super.key});

  @override
  State<AddComponentPage> createState() => _AddComponentPageState();
}

class _AddComponentPageState extends State<AddComponentPage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _usageController = TextEditingController();
  String _selectedType = 'chain';

  double _getLifespan(String type) {
    switch (type) {
      case 'chain':
        return 2800;
      case 'cassette':
        return 5200;
      case 'chainring':
        return 6400;
      case 'brakePads':
        return 1600;
      case 'brakeRotors':
        return 6400;
      case 'tires':
        return 2800;
      case 'suspension':
        return 1250;
      default:
        return 0;
    }
  }

  Future<void> _addComponent(Bike bike) async {
    final String apiUrl = 'https://your-backend-url.com/components?bike_id=${bike.id}';
    final Map<String, dynamic> body = {
      'name': _nameController.text,
      'type': _selectedType,
      'usage': double.tryParse(_usageController.text) ?? 0.0,
      'lifespan': _getLifespan(_selectedType),
    };

    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );

    if (response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Component added successfully!')),
      );
      Navigator.pop(context);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to add component: ${response.body}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final Bike? bike = GoRouterState.of(context).extra as Bike?;
    if (bike == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Add Component')),
        body: const Center(child: Text('No bike selected.')),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Add component to bike ${bike.name}')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Component name'),
            ),
            const SizedBox(height: 16),
            DropdownButton<String>(
              value: _selectedType,
              items: <String>[ 
                'chain', 'cassette', 'chainring', 'brakePads', 'brakeRotors', 'tires', 'suspension', 'other'
              ].map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (String? newValue) {
                if (newValue != null) {
                  setState(() {
                    _selectedType = newValue;
                  });
                }
              },
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _usageController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Component usage (km)'),
            ),
            const SizedBox(height: 24),
            Center(
              child: ElevatedButton(
                onPressed: () => _addComponent(bike),
                child: const Text('Add Component'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}