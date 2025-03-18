import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'classes/user.dart';

Future<User?> authenticate() async {
  String clientId;
  String callbackUrl;
  try{
    clientId = dotenv.env['CLIENT_ID']!;
    callbackUrl = dotenv.env['CALLBACK_URL']!;
  } catch (e) {
    print('Failed to load .env file');
    return null;
  }

  final authUrl = Uri.https('www.strava.com', '/oauth/mobile/authorize', {
    'response_type': 'code',
    'client_id': clientId,
    'redirect_uri': callbackUrl,
    'scope': 'read,profile:read_all,activity:read'
  });

  try {
    final result = await FlutterWebAuth2.authenticate(url: authUrl.toString(), callbackUrlScheme: 'bikecheck');
    final authCode = Uri.parse(result).queryParameters['code'];
    print(authCode);

    final exchangeUri = Uri.parse('https://bikecheck.onrender.com/strava/auth/tokenexchange');
    final response = await http.post(
      exchangeUri, 
      headers: {'Content-Type': 'application/json'}, 
      body: jsonEncode({'code': authCode})
    );

    if (response.statusCode == 200) {
      Map<String, dynamic> data = jsonDecode(response.body);
      User user = User.fromJson(data['user']);
      return user;
    } else {
      print('Failed to authenticate, error code: ${response.statusCode}, body: ${response.body}');
      return null;
    }
  } catch (e) {
    print('Failed to authenticate: $e');
    return null;
  }
}