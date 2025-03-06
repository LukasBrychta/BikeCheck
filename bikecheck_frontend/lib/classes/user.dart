import 'bike.dart';
class User {
  int userId;
  String username;
  Map<String, Bike>? bikes;
  User({required this.userId, required this.username});

  static User fromJson(data) {
    return User(
      userId: int.parse(data['user_id']),
      username: data['username'],
    );
  }
}