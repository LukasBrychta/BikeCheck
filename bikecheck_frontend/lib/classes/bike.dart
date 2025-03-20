import 'component.dart';

class Bike {
  String bikeId;
  String name;
  int distance;
  int userId;
  Map<int,Component>? components;
  Bike({required this.bikeId, required this.name, required this.distance, required this.userId});

  static Bike fromJson(data) {
    return Bike(
      bikeId: data['bike_id'],
      name: data['name'],
      distance: int.parse(data['distance']),
      userId: int.parse(data['user_id']),
    );
  }

  double mToKm(int distance) {
    return distance / 1000;
  }
}