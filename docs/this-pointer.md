---
title: This Pointer
description: Pointer to the current object.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [classes, memory]
example: |
  class Circle {
  public:
    void setRadius(double radius) {
      this->radius = radius;
    }
    double radius;
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Inside a member function, `this` is a pointer to the object the member function was invoked on and cannot be reassigned:
```cpp
class Circle {
public:
  double area() { return 3.14 * this->radius * this->radius; }
  double radius;
};

Circle c;
c.radius = 2.0;
c.area();  // this == &c
```

Fields can be accessed without `this` since the compiler adds it implicitly. `this->radius` and `radius` are equivalent:
```cpp
double area() { return 3.14 * radius * radius; }
```

`this` is needed to differentiate a parameter and field with the same name:
```cpp
class Circle {
public:
  void setRadius(double radius) {
    this->radius = radius;
  }

  double radius;
};
```

`this` can be dereferenced to get a reference to the object itself. Returning `*this` lets member function calls be chained:
```cpp
class Circle {
public:
  Circle& setRadius(double r) {
    radius = r;
    return *this;
  }

  Circle& scale(double factor) {
    radius *= factor;
    return *this;
  }

  double radius;
};

Circle c;
c.setRadius(2.0).scale(3.0);  // radius = 6
```

> [!NOTE]
> `this` cannot be used in static member functions.

::::

## References

- [cppreference: the this pointer](https://en.cppreference.com/cpp/language/this)

## Related

- [class](/collection/class)
- [pointer](/collection/pointer)
- [static member](/collection/static-member)
