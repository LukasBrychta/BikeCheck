import 'package:bikecheck_frontend/classes/user.dart';
import 'package:bikecheck_frontend/router.config.dart';
import 'package:flutter/material.dart';
import 'package:bikecheck_frontend/auth.dart';
import 'package:bikecheck_frontend/classes/userinfo.dart';

class AuthPage extends StatelessWidget {
  const AuthPage({super.key});

  Future<void> _authAndRedirect() async {
    router.go('/loading');
    User user = await authenticate();
    print('authenticated');
    UserInfo.instance.setUser(user);
    print('user set ${user.username}, ${user.userId}');
    /*await UserInfo.instance.setBikes(user.userId);
    print('bikes set');
    router.go('/home');*/
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