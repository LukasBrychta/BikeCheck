import 'package:bikecheck_frontend/classes/service.dart';
enum ComponentType {chain, cassette, chainring, brakePads, brakeRotors, tires, suspension, other}
class Component {
  int? componentId;
  String name;
  ComponentType type;
  double usage;
  double lifespan;
  Map<int, Service>? services;
  Component({ this.componentId, required this.name, required this.type, this.usage = 0,}) : lifespan = _setLifeSpan(type);

  static double _setLifeSpan(ComponentType type){
    switch(type){
      case ComponentType.chain:
      return 2800;
      case ComponentType.cassette:
      return 5200;
      case ComponentType.chainring:
      return 6400;
      case ComponentType.brakePads:
      return 1600;
      case ComponentType.brakeRotors:
      return 6400;
      case ComponentType.tires:
      return 2800;
      case ComponentType.suspension:
      return 1250;
      case ComponentType.other:
      return 0;
    }
  }

  static Component fromJson(data){
    ComponentType type;
    switch(data['type']){
      case 'chain':
      type = ComponentType.chain;
      break;
      case 'cassette':
      type = ComponentType.cassette;
      break;
      case 'chainring':
      type = ComponentType.chainring;
      break;
      case 'brakePads':
      type = ComponentType.brakePads;
      break;
      case 'brakeRotors':
      type = ComponentType.brakeRotors;
      break;
      case 'tires':
      type = ComponentType.tires;
      break;
      case 'suspension':
      type = ComponentType.suspension;
      break;
      default:
      type = ComponentType.other;
      break;
    }
    return Component(
      componentId: data['component_id'],
      name: data['name'],
      type: type,
      usage: double.parse(data['usage']),
    );
  }
}

