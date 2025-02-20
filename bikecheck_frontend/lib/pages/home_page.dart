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
      appBar: AppBar(
        title: const Text('BikeCheck'),
        centerTitle: true, // Centers the title
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Name Row
            Text(
              UserInfo.instance.user!.username,
              style: Theme.of(context).textTheme.headlineSmall, // Uses default text style
            ),
            const SizedBox(height: 16), // Spacing

            // Bike List
            Expanded(
              child: ListView.builder(
                itemCount: UserInfo.instance.user!.bikes!.length,
                itemBuilder: (context, index) {
                  var bike = UserInfo.instance.user!.bikes!.values.toList()[index];
                  return Card(
                    child: ListTile(
                      title: Text(bike.name),
                      leading: const Icon(Icons.pedal_bike), // Bike icon
                      trailing: const Icon(Icons.arrow_forward_ios), // Arrow icon
                      onTap: () {
                        // Handle bike tap
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}