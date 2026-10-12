---
title: Tuple
description: Holds a fixed number of values of possibly different types.
language: cpp
versions: [C++11]
difficulty: beginner
tags: [stl]
example: |
  #include <tuple>
  std::tuple<std::string, int, double> t("alice", 30, 1.7);
  std::get<0>(t);  // "alice"
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++11"}

`std::tuple` groups any number of values into a single object:
```cpp
// Tuple with 3 elements.
std::tuple<std::string, int, double> t("alice", 30, 1.7);

// Tuple with 5 elements.
std::tuple<int, int, double, int, std::string> u(-3, 30, 1.7, 0, "str");

// Tuple with 6 elements.
std::tuple<char, char, char, char, char, char> v('a', 'b', 'c', 'd', 'e', 'f');
```

`std::tuple` is available from the `tuple` header:
```cpp
#include <tuple>
```

Tuple elements are accessed by index with `std::get`. The index is a template argument and must be known at compile time:
```cpp
std::get<0>(t);  // "alice"
std::get<1>(t);  // 30
std::get<2>(t);  // 1.7
std::get<1>(t) = 31;
```

`std::make_tuple` creates a tuple without writing out the types. The function deduces the types from the arguments:
```cpp
// std::tuple<const char*, int, double>
auto t = std::make_tuple("alice", 30, 1.7);
```

Tuples are often used to return several values from a function:
```cpp
std::tuple<int, int, int> stats(int a, int b) {
  return std::make_tuple(a + b, a - b, a * b);
}

std::tuple<int, int, int> result = stats(5, 3);
std::get<0>(result);  // 8
std::get<1>(result);  // 2
std::get<2>(result);  // 15
```

> [!NOTE]
> Tuples are best used for short-lived groups of values and accessing a tuple with `std::get<1>` is non-descriptive. Prefer a `struct` with named fields when the values belong together and will be used across the program.

::::

## References

- [cppreference: std::tuple](https://en.cppreference.com/cpp/utility/tuple)

## Related

- [pair](/collection/pair)
- [tie](/collection/tie)
- [structured binding](/collection/structured-binding)
