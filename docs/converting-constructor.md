---
title: Converting Constructor
description: Constructor that implicitly converts a value into the class type.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [classes, constructors, types]
example: |
  class Circle {
  public:
    Circle(double r) : radius(r) {}
    double radius;
  };

  Circle c = 2.0;  // Implicitly converts 2.0 to Circle.
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Converting constructors are single-argument constructors that implicitly convert a value of the parameter type to the class type:
```cpp
class Circle {
public:
  Circle(double r) : radius(r) {}
  double radius;
};

Circle c = 2.0;  // Same as Circle c(2.0);
```

This implicit conversion also happens when passing an argument to a function:
```cpp
void print(Circle c) {
  std::cout << c.radius << "\n";
}

print(2.0);  // 2.0 is converted to a Circle.
```

The implicit conversion can be disabled by marking the constructor with `explicit`:
```cpp
class Circle {
public:
  explicit Circle(double r) : radius(r) {}
  double radius;
};

Circle a(2.0);       // OK.
Circle b = 2.0;      // ERROR.
print(2.0);          // ERROR.
print(Circle(2.0));  // OK: conversion is written out.
```

> [!NOTE]
> Prefer marking single-argument constructors `explicit` unless the conversion is intended.

::::
::::version{std="C++11"}

Multi-argument constructors can also be converting constructors through list-initialisation:
```cpp
class Point {
public:
  Point(int x, int y) : x(x), y(y) {}
  int x;
  int y;
};

void print(Point p) {}

Point p = {1, 2};  // OK.
print({1, 2});     // OK.
```

The implicit conversion can be disabled by marking the constructor with `explicit`:
```cpp
class Point {
public:
  explicit Point(int x, int y) : x(x), y(y) {}
  int x;
  int y;
};

Point p = {1, 2};  // ERROR.
print({1, 2});     // ERROR.
Point q{1, 2};     // OK.
```

::::

## References

- [cppreference: converting constructor](https://en.cppreference.com/cpp/language/converting_constructor)
- [cppreference: explicit specifier](https://en.cppreference.com/cpp/language/explicit)

## Related

- [constructor](/collection/constructor)
- [implicit type conversion](/collection/implicit-type-conversion)
