---
title: Class
description: User-defined type that groups data and functions.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [classes]
example: |
  class Circle {
  public:
    double area() { return 3.14 * radius * radius; }
    double radius;
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A class is a user-defined type that groups fields (member variables) and methods (member functions) together. Declare a class with the `class` keyword and end the definition with a semicolon:
```cpp
class Circle {
public:
  double radius;
};
```

### Object

An object is an instance of a class. Members of an object are accessed with the dot operator (`.`):
```cpp
Circle c;
c.radius = 2.0;
std::cout << c.radius << "\n";  // 2
```

Each object has its own copy of the fields:
```cpp
Circle a;
Circle b;
a.radius = 1.0;
b.radius = 5.0;  // a.radius is still 1.
```

### Method

Methods can be defined inside the class and use the fields of the object they are called on:
```cpp
class Circle {
public:
  double area() { return 3.14 * radius * radius; }
  double radius;
};
```

Methods can be defined outside the class using the scope resolution operator (`::`):
```cpp
class Circle {
public:
  double perimeter();
  double radius;
};

double Circle::perimeter() {
  return 2 * 3.14 * radius;
}
```

> [!NOTE]
> Members of a class are `private` by default so they must be listed under `public:` to be accessible outside the class.

::::

## References

- [cppreference: class declaration](https://en.cppreference.com/cpp/language/class)
- [cppreference: member access operators](https://en.cppreference.com/cpp/language/operator_member_access)

## Related

- [access specifier](/collection/access-specifier)
- [default constructor](/collection/default-constructor)
- [const method](/collection/const-method)
- [static member](/collection/static-member)
