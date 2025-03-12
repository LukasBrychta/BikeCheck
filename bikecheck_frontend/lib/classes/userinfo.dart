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
    
    if (data.containsKey('data')) {
      final List<dynamic> bikes = data['data'];
      print('Fetched ${bikes.length} bikes for user $id');
      
      // Initializing bikes map if it doesn't exist
      if (UserInfo.instance.user?.bikes == null) {
        UserInfo.instance.user!.bikes = {};
      }
      
      for (var b in bikes) {
        Bike bike = Bike.fromJson(b);
        UserInfo.instance.user!.bikes![bike.bikeId] = bike;
        print('Bike was set with id: ${bike.bikeId}, name: ${bike.name} and userId: $id');
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