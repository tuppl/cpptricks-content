---
title: Constructor
description: Member function that runs when an object is created.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [classes, constructors]
example: |
  class Circle {
  public:
    Circle(double r) : radius(r) {}
    double radius;
  };

  Circle c(2.0);
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A constructor is a special member function that runs when an object is created. It has the same name as the class and no return type:
```cpp
class Circle {
public:
  Circle(double r) : radius(r) {}
  double radius;
};
```

Creating an object by calling the constructor with direct-initialisation:
```cpp
Circle c1(2.0);
std::cout << c1.radius << "\n";  // 2
```

Creating an object by calling the constructor with copy-initialisation:
```cpp
Circle c2 = Circle(3.0);
std::cout << c2.radius << "\n";  // 3
```

::::
::::version{std="C++11"}

Creating an object by calling the constructor with list-initialisation:
```cpp
Circle c3{4.0};
std::cout << c3.radius << "\n";  // 4
```

::::
::::version{std="C++98"}

Constructors are used to put the object into a valid state before it is used:
```cpp
class Circle {
public:
  Circle(double r) {
    radius = r;
    if (radius < 0) {
      radius = 0;
    }
  }
  double radius;
};
```

Multiple constructors can be defined if they have different parameter lists:
```cpp
class Circle {
public:
  Circle() : radius(1.0), scale(1.0) {}
  Circle(double r) : radius(r), scale(1.0) {}
  Circle(double r, double s) : radius(r), scale(s) {}
  double radius;
  double scale;
};

Circle a;            // selects Circle().
Circle b(2.0);       // selects Circle(double).
Circle c(2.0, 2.0);  // selects Circle(double, double).
```

::::

## References

- [cppreference: constructors and member initializer lists](https://en.cppreference.com/cpp/language/constructor)
- [cppreference: initialization](https://en.cppreference.com/cpp/language/initialization)

## Related

- [class](/collection/class)
- [converting constructor](/collection/converting-constructor)
- [default constructor](/collection/default-constructor)
- [member initialiser list](/collection/member-initialiser-list)
- [delegating constructor](/collection/delegating-constructor)
- [destructor](/collection/destructor)
