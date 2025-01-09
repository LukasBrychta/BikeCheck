import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'package:bikecheck_frontend/router.config.dart';

void authenticate() async {
  
  String clientId = dotenv.env['CLIENT_ID'] ?? '';
  String callbackUrl = dotenv.env['CALLBACK_URL'] ?? '';
  print(callbackUrl);

  final authUrl = Uri.https('www.strava.com', '/oauth/mobile/authorize', {
    'response_type': 'code',
    'client_id': clientId,
    'redirect_uri': callbackUrl,
    'scope': 'read,profile:read_all,activity:read'
  });

  final result = await FlutterWebAuth2.authenticate(url: authUrl.toString(), callbackUrlScheme: 'bikecheck');

  final code = Uri.parse(result).queryParameters['code'];
  
  router.go('/home');
}