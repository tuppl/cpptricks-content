---
title: Static Member
description: Class member shared by all objects.
language: cpp
versions: [C++98, C++11, C++17]
difficulty: beginner
tags: [classes]
example: |
  class Shape {
  public:
    static int count;
  };

  Shape::count;
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A static member is a member that is bound to the class itself and not to any object. Thus it is a shared copy for all objects of the same class. Static members are accessed with the scope resolution operator (`::`) on the class name instead of the dot operator on an object:
```cpp
class Shape {
public:
  static int count;
};

int Shape::count = 0;

int main() {
  Shape::count = 2;
}
```

A static member variable must be defined once outside the class and cannot be initialised inline:
```cpp
class Shape {
public:
  static int count = 0;  // ERROR.
};
```

Static members defined outside the class must omit the `static` keyword:
```cpp
int Shape::count = 0;         // OK.
static int Shape::count = 0;  // ERROR.
```

::::
::::version{std="C++17"}

Inline initialisation is possible with the `inline` keyword:
```cpp
class Shape {
public:
  static inline int count = 0;
};
```

::::
::::version{std="C++98"}

A static member function can be called without an object. It can access static members but not the fields of any object since it has no object to work with:
```cpp
class Shape {
public:
  static int getCount() { return count; }  // OK.
  static int count;

  static int getSides() { return sides; }  // ERROR.
  int sides;
};

int Shape::count = 0;
```

Static members can also be accessed through an object with the dot operator, which still refers to the shared copy:
```cpp
Shape a;
Shape b;
a.count = 5;
b.count;  // 5
```

::::
::::version{std="C++11"}

A `static constexpr` member can be initialised inside the class, which is the usual way to define a class-level constant:
```cpp
class Shape {
public:
  static constexpr int MAX_SIDES = 12;
};

int limit = Shape::MAX_SIDES;
```

::::

## References

- [cppreference: static members](https://en.cppreference.com/cpp/language/static)

## Related

- [class](/collection/class)
- [const variable](/collection/const-variable)
