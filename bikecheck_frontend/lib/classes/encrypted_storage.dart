import 'secure_storage.dart';

class EncryptedStorage {
  SecureStorage? _secureStorage;

  static final EncryptedStorage instance = EncryptedStorage._();

  EncryptedStorage._();

  void setEncryptedStorage(SecureStorage storage){
    _secureStorage = storage;
  }

  SecureStorage? get secureStorage => _secureStorage;
}