---
title: Static Cast
description: Explicitly convert a value to another type at compile time.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [types]
example: |
  double d = 3.99;
  int i = static_cast<int>(d);  // 3
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`static_cast` explicitly converts a value to another type. The target type is written in angle brackets and the value in parentheses:
```cpp
double d = 3.99;
int i = static_cast<int>(d);  // 3
```

`static_cast` satisfies brace initialisation, which would otherwise reject narrowing conversions, since the intent is explicit:
```cpp
int i{static_cast<int>(3.99)};
```

Conversions that make no sense are rejected at compile time:
```cpp
int* p = static_cast<int*>(3.14);  // ERROR.
```

> [!WARNING]
> Avoid C-style casts, which silently try `static_cast`, `const_cast`, and `reinterpret_cast` in turn, so they can compile code that should not compile:
> ```cpp
> int i = (int)d;  // Avoid.
> int i = int(d);  // Avoid.
> ```

::::

## References

- [cppreference: static_cast](https://en.cppreference.com/cpp/language/static_cast)
- [cppreference: explicit type conversion](https://en.cppreference.com/cpp/language/explicit_cast)

## Related

- [implicit type conversion](/collection/implicit-type-conversion)
