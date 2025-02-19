import 'package:bikecheck_frontend/classes/user.dart';

class UserInfo{
  User? _user;

  static final UserInfo instance = UserInfo._();
  
  UserInfo._();

  void setUser(User user){
    _user = user;
  }

  bool get isLoggedIn => _user != null;
  User? get user => _user;
}