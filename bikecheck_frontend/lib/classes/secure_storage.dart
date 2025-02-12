import 'package:flutter_secure_storage/flutter_secure_storage.dart';

AndroidOptions _getAndroidOptions() => const AndroidOptions(
    encryptedSharedPreferences: true,
  );

class SecureStorage {
  final storage = FlutterSecureStorage(aOptions: _getAndroidOptions());
  writeSecureData(String key, String value) async {
    await storage.write(key: key, value: value);
  }

  readSecureData(String key) async {
    String value = await storage.read(key: key) ?? 'No data found!';
    return value;
  }

  deleteSecureData(String key) async {
    await storage.delete(key: key);
  }

  deleteAllSecureData() async {
    await storage.deleteAll();
  }
}