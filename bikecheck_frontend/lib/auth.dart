import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'dart:convert' show jsonDecode, jsonEncode;
import 'package:go_router/go_router.dart';


void authenticate(BuildContext context) async {
  
  String clientId = dotenv.env['CLIENT_ID'] ?? '';
  String callbackUrl = 'com.bikecheck';//dotenv.env['CALLBACK_URL'] ?? '';
  String backendUrl = dotenv.env['BACKEND_URL'] ?? '';

  final authUrl = Uri.https('www.strava.com', 'oauth/mobile/authorize', {
    'client_id': clientId,
    'redirect_uri': callbackUrl,
    'response_type': 'code',
    'scope': 'read,profile:read_all,activity:read_all'
  });
  print('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
  print(authUrl);

  final result = await FlutterWebAuth2.authenticate(url: authUrl.toString(), callbackUrlScheme: 'com.bikecheck');

  final code = Uri.parse(result).queryParameters['code'];

  final response = await http.post(
    Uri.parse('$backendUrl/exchange'),
    body: jsonEncode({'code': code}),
    headers: {'Content-Type': 'application/json'},
  );

  if(response.statusCode == 200) {
    final responseData = jsonDecode(response.body);
    final accessToken = responseData['access_token'];

    if(context.mounted) {
      context.go('/home');
    }
  } else {
    print('Error exchanging token');
  }
}