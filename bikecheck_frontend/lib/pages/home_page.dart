import 'package:flutter/material.dart';
import 'package:bikecheck_frontend/classes/userinfo.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AppBar(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Center(
            child: Column(
              children: [
                Row(
                  children: [
                    Text(
                      UserInfo.instance.user!.username,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ],
                ),
                const Row(
                  children: [
                    
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}