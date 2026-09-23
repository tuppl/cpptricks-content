---
title: Delegating Constructor
description: Reduce constructor boilerplate by delegating to another constructor in the same class.
language: cpp
versions: [C++11]
difficulty: beginner
tags: [classes]
example: |
  class Foo {
    Foo(int x)
      : Foo(x, 'y') {}
    Foo(int x, char y)
      : x(x), y(y) {}
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++11"}

A constructor can call another constructor in the initialiser list which heavily reduces writing boilerplate:
```cpp
class MyClass {
public:
  // Target constructor.
  MyClass(int x, char y) : x(x), y(y) {}

  // Delegating constructor to target constructor.
  MyClass(int x) : MyClass(x, 'y') {}

  // Delegating constructor to target constructor.
  MyClass(char y) : MyClass(1, y) {}

private:
  int x;
  char y;
};
```

You cannot use constructor delegation together with member initialisation:
```cpp
MyClass(int x) : MyClass(x), y('y') {}
```

::::

## References

- [cppreference: delegating constructor](https://en.cppreference.com/cpp/language/constructor#Delegating_constructor)
