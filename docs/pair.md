---
title: Pair
description: Holds two values of possibly different types.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [stl]
example: |
  #include <utility>
  std::pair<char, int> p('c', 30);
  p.first;   // 'c'
  p.second;  // 30
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`std::pair` groups two values into a single object where the two values can be of different types. The two types are given as template arguments:
```cpp
std::pair<int, int> p1;
std::pair<std::string, int> p2;
std::pair<double, std::string> p3;
```

`std::pair` is available from the `utility` header:
```cpp
#include <utility>
```

Pairs can be given initial values:
```cpp
std::pair<int, int> p1(100, 200);
std::pair<std::string, int> p2("age", 30);
std::pair<double, std::string> p3(3.14, "pi");
```

The pair values can be accessed as `first` and `second`:
```cpp
std::pair<std::string, int> p("young", 10);
std::cout << p.first << "\n";   // "young"
std::cout << p.second << "\n";  // 10

p.first = "old";
p.second = 80;
```

`std::make_pair` creates a pair without writing out the types. The function deduces the types from the arguments:
```cpp
std::pair<std::string, int> p = std::make_pair("age", 30);
```

Pairs are often used to return two values from a function:
```cpp
std::pair<int, int> divide(int a, int b) {
  return std::make_pair(a / b, a % b);
}

std::pair<int, int> result = divide(7, 2);
result.first;   // 3
result.second;  // 1
```

::::
::::version{std="C++11"}

A pair can be list-initialised:
```cpp
std::pair<std::string, int> p = {"age", 30};
```

::::

## References

- [cppreference: std::pair](https://en.cppreference.com/cpp/utility/pair)

## Related

- [tuple](/collection/tuple)
- [structured binding](/collection/structured-binding)
