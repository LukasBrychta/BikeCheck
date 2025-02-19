import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'classes/secure_storage.dart';
import 'classes/user.dart';

Future<User> authenticate() async {
  print('Authenticate function called');
  String clientId;
  String callbackUrl;
  try{
    print('Initializing .env values');
    clientId = dotenv.env['CLIENT_ID']!;
    callbackUrl = dotenv.env['CALLBACK_URL']!;
  } catch (e) {
    print('Error: $e');
    rethrow;
  }

  final SecureStorage secureStorage = SecureStorage();

  final authUrl = Uri.https('www.strava.com', '/oauth/mobile/authorize', {
    'response_type': 'code',
    'client_id': clientId,
    'redirect_uri': callbackUrl,
    'scope': 'read,profile:read_all,activity:read'
  });

  final result = await FlutterWebAuth2.authenticate(url: authUrl.toString(), callbackUrlScheme: 'bikecheck');

  final authCode = Uri.parse(result).queryParameters['code'];
  print('Auth Code: $authCode');

  final exchangeUri = Uri.parse('https://bikecheck.onrender.com/strava/auth/tokenexchange');
  print('Exchange URI: $exchangeUri');

  final tokensResponse = await http.post(exchangeUri, headers: {'Content-Type': 'application/json'}, body: jsonEncode({'code': authCode}));
  print('TokenResponse: $tokensResponse');

  Map<String, dynamic> data = jsonDecode(tokensResponse.body);
  print('Returned data: $data');
  secureStorage.writeSecureData('access_token', data['access_token'].toString());
  secureStorage.writeSecureData('refresh_token', data['refresh_token'].toString());
  secureStorage.writeSecureData('expires_at', data['expires_at'].toString());

  return initializeUser(data);
}

initializeUser(Map<String, dynamic> data) {
  print('Initializing user');
  Map<String, dynamic> athlete = data['athlete'];
  int stravaId = athlete['id'];
  String firstName = athlete['firstname'];
  String lastName = athlete['lastname'];
  String username = '$firstName $lastName';
  print('Returning user $username');
  return User(stravaId: stravaId, username: username, authorized: true);
}