import 'dart:convert';

import 'package:bikecheck_frontend/classes/bike.dart';
import 'package:bikecheck_frontend/classes/user.dart';
import 'package:http/http.dart' as http;


class UserInfo{
  User? _user;

  static final UserInfo instance = UserInfo._();
  
  UserInfo._();

  void setUser(User user){
    _user = user;
  }

  Future<void> setBikes(int id) async {  
  final paramsId = id.toString();
  final url = Uri.parse('https://bikecheck.onrender.com/bikes/users/$paramsId/bikes');
  final response = await http.get(
    url,
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    
    if (data.containsKey('bikes')) {
      final List<dynamic> bikes = data['bikes'];
      print('Fetched ${bikes.length} bikes for user $id');
      
      // Initialize bikes if null
      if (UserInfo.instance.user?.bikes == null) {
        UserInfo.instance.user!.bikes = {}; // Ensure bikes is initialized
      }
      
      for (var bike in bikes) {
        String bikeId = bike['id']; // Convert the id to int
        String bikeName = bike['name']; // Assuming the name is a string
        
        // Safely update the user's bike list
        UserInfo.instance.user!.bikes![bikeId] = Bike(bikeId: bikeId, name: bikeName, userId: id);
        print('Bike was set with id: $bikeId, name: $bikeName and userId: $id');
        print('${UserInfo.instance.user!.bikes!.length}');
      }
    } else {
      print('No bikes found in response');
    }
  } else {
    print('Failed to get bikes: ${response.statusCode}');
  }
}

  bool get isLoggedIn => _user != null;
  User? get user => _user;
}