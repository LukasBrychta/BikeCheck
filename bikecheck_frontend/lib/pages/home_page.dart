import 'package:bikecheck_frontend/router.config.dart';
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
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              UserInfo.instance.user!.username,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: UserInfo.instance.user!.bikes!.length,
                itemBuilder: (context, index) {
                  var bike = UserInfo.instance.user!.bikes!.values.toList()[index];
                  return Card(
                    child: ListTile(
                      title: Text(bike.name),
                      subtitle: Text('${bike.mToKm(bike.distance).toStringAsFixed(2)} km'),
                      leading: const Icon(Icons.pedal_bike),
                      trailing: const Icon(Icons.arrow_forward_ios),
                      onTap: () {
                        router.go('/components', extra: bike);
                      },
                    ),
                  );
                },
              ),
            ),
            Container(
                  padding: const EdgeInsets.all(16),
                  child: Center(
                    child: Image.asset('assets/api_logo_pwrdBy_strava_horiz_orange.png'),
                  ),
                )
          ],
        ),
      ),
    );
  }
}