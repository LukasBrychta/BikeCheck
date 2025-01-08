import 'package:flutter/material.dart';
import 'package:bikecheck_frontend/auth.dart';

class AuthPage extends StatelessWidget {
  const AuthPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(onPressed: (() => {authenticate()}), child: const Text('Connect with Strava')),
      ),
    );
  }
}