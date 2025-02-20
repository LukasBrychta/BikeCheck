import 'package:bikecheck_frontend/pages/home_page.dart';
import 'package:bikecheck_frontend/pages/loading_page.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:bikecheck_frontend/pages/auth_page.dart';

final router = GoRouter(
  errorBuilder: (context, state) => const Scaffold(
    body: Center(
      child: Text('Page not found'),
    ),
  ),
  initialLocation: '/',
  routes: [
    GoRoute(path: '/', builder: (context, state) => const AuthPage()),
    GoRoute(path: '/home', builder: (context, state) => const HomePage()),
    GoRoute(path: '/loading', builder: (context, state) => const LoadingPage()),
  ]
);