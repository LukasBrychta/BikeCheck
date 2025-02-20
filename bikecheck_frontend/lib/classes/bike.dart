import 'component.dart';

class Bike {
  String? bikeId;
  String name;
  int userId;
  Map<String,Component>? components;
  Bike({this.bikeId, required this.name, required this.userId});
}