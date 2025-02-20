import 'bike.dart';
class User {
  int? userId;
  int stravaId;
  String username;
  Map<String, Bike>? bikes;
  User({this.userId, required this.stravaId, required this.username});
}