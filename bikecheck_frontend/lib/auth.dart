import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'dart:convert' show jsonDecode, jsonEncode;
import 'package:go_router/go_router.dart';


void authenticate() async {
  
  String clientId = dotenv.env['CLIENT_ID'] ?? '';
  String callbackUrl = dotenv.env['CALLBACK_URL'] ?? '';
  String backendUrl = dotenv.env['BACKEND_URL'] ?? '';
  print("Callback URL: $callbackUrl");
  print("Callback URL Scheme: ${Uri.parse(callbackUrl).scheme}");


  final authUrl = Uri.https('www.strava.com', '/oauth/mobile/authorize', {
    'response_type': 'code',
    'client_id': clientId,
    'redirect_uri': callbackUrl,
    'scope': 'read,profile:read_all,activity:read'
  });

  final result = await FlutterWebAuth2.authenticate(url: authUrl.toString(), callbackUrlScheme: 'bikecheck');

  final code = Uri.parse(result).queryParameters['code'];
  print("code: $code");
}