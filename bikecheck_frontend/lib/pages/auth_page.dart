import 'package:bikecheck_frontend/classes/user.dart';
import 'package:bikecheck_frontend/router.config.dart';
import 'package:flutter/material.dart';
import 'package:bikecheck_frontend/auth.dart';
import 'package:bikecheck_frontend/classes/userinfo.dart';

class AuthPage extends StatefulWidget {
  const AuthPage({super.key});

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  Future<void> _authAndRedirect() async {
    router.go('/loading');
    User? user = await authenticate();
    if (user == null) {
      _showAuthFailedDialog();
      return;
    }

    UserInfo.instance.setUser(user);
    await UserInfo.instance.setBikes(user.userId);
    router.go('/home');
  }

  void _showAuthFailedDialog() {
    showDialog(context: context, builder: (BuildContext context) {
      return AlertDialog(
        title: const Text('Auth failed'),
        content: const Text('Failed to authenticate. Try again.'),
        actions: [
          TextButton(onPressed: () => router.go('/'), child: const Text('OK')),
        ],
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(onPressed: () async {
          await _authAndRedirect();
        }, child: const Text('Connect with Strava'))
      ),
    );
  }
}