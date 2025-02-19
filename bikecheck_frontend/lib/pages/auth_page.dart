import 'package:bikecheck_frontend/classes/user.dart';
import 'package:bikecheck_frontend/router.config.dart';
import 'package:flutter/material.dart';
import 'package:bikecheck_frontend/auth.dart';
import 'package:bikecheck_frontend/classes/userinfo.dart';

class AuthPage extends StatelessWidget {
  const AuthPage({super.key});

  Future<void> _authAndRedirect() async {
    print('Running _authAndRedirect');
    User user = await authenticate();
    UserInfo.instance.setUser(user);
    print('Redirecting to HomePage for ${UserInfo.instance.user!.username}');
    router.go('/home');
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(onPressed: () async {
          print('Connect button pressed');
          await _authAndRedirect();
        }, child: const Text('Connect with Strava'))
      ),
    );
  }
}