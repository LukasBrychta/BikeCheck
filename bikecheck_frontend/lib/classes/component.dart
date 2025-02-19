enum ComponentType {chain, cassette, chainring, brakePads, brakeRotors, tires, suspension}
class Component {
  int? componentId;
  String name;
  ComponentType type;
  double usage;
  double lifespan;
  Component({ this.componentId, required this.name, required this.type, this.usage = 0}) : lifespan = _setLifeSpan(type);

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
    }
  }
}

