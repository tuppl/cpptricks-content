---
title: Auto
description: Automatic type deduction of an object or expression at compile time.
language: cpp
versions: [C++11]
difficulty: beginner
tags: [types]
example: |
  auto x = 123;      // int
  auto y = x + 456;  // int
  auto z = "str";    // const char*
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++11"}

Type inference is the ability of the compiler to deduce the type of an object or expression at compile time.

To create a variable with an inferred type, use the `auto` keyword:
```cpp
auto x = 123;      // int
auto y = x + 456;  // int
auto z = "str";    // const char*
```

`auto` always needs an initialiser:
```cpp
auto x;  // ERROR.
```

`auto` drops top-level `const` and references, so write them explicitly to keep them:
```cpp
const int a = 123;
auto x = a;   // int, const dropped.
auto& y = a;  // const int&

int b = 456;
auto& z = b;  // int&
```

::::

## References

- [cppreference: placeholder type specifiers](https://en.cppreference.com/cpp/language/auto)