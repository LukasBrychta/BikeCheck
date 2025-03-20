class Service {
  int? serviceId;
  String description;
  DateTime date;
  Service({this.serviceId, required this.description, required this.date});

  static Service fromJson(data) {
    return Service(
      serviceId: data['service_id'],
      description: data['description'],
      date: DateTime.parse(data['createdAt']),
    );
  }
}