---
title: Implicit Type Conversion
description: Automatic conversion between types performed by the compiler.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [types]
example: |
  int i = 3.99;  // 3, fractional part discarded
  double d = 3;  // 3.0
  bool b = 42;   // true
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

The compiler will automagically convert a value to a different type when the context requires it, e.g. during initialisation, assignment, arithmetic, or passing arguments to a function:
```cpp
double d = 3;  // int converted to double.
int i = 3.99;  // double converted to int.
```

Converting to a wider type (e.g. `int` to `double`) is safe. Converting to a narrower type is a narrowing conversion and can lose information or give surprising results:
```cpp
int i = 3.99;      // becomes 3 as the fractional part is discarded.
char c = 300;      // becomes 44 due to modulo 256 wrap around.
unsigned u = -1;   // becomes 4294967295 due to 4-byte wrap around.
```

Arithmetic on mixed types converts the operands to a common type before evaluating:
```cpp
int i = 7;
double d = 2.0;
i / 2;  // is 3 due to integer division.
i / d;  // is 3.5 due to i being implicitly converted to double.
```

Any numeric value can be converted to `bool` where zero is `false` and everything else is `true`:
```cpp
if (42) {}   // true
if (0.0) {}  // false
```

::::
::::version{std="C++11"}

Brace initialisation does not allow narrowing conversions and turns them into a compiler error:
```cpp
int i{3.99};   // ERROR: narrowing.
char c{300};   // ERROR: narrowing.
double d{3};   // OK: int to double is not narrowing.
```

::::

## References

- [cppreference: implicit conversions](https://en.cppreference.com/cpp/language/implicit_conversion)
- [cppreference: list initialization](https://en.cppreference.com/cpp/language/list_initialization)

## Related

- [static_cast](/collection/static-cast)
