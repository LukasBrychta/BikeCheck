class User {
  int? userId;
  int stravaId;
  String username;
  bool authorized;
  User({this.userId, required this.stravaId, required this.username, required this.authorized});
}