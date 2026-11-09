---
title: Tie
description: Unpack a tuple or pair into existing variables.
language: cpp
versions: [C++11]
difficulty: beginner
tags: [stl]
example: |
  #include <tuple>
  int a;
  int b;
  std::tie(a, b) = std::make_tuple(1, 2);
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++11"}

`std::tie` creates a tuple of references to existing variables. Assigning a tuple to it writes each element into the matching variable:
```cpp
int a;
int b;
std::tie(a, b) = std::make_tuple(1, 2);  // a = 1, b = 2
```

`std::tie` is available from the `tuple` header:
```cpp
#include <tuple>
```

It is commonly used to unpack several values returned from a function:
```cpp
std::tuple<int, int, int> stats(int a, int b) {
  return std::make_tuple(a + b, a - b, a * b);
}

int sum;
int diff;
int prod;
std::tie(sum, diff, prod) = stats(5, 3);  // 8, 2, 15
```

A `std::pair` can be unpacked the same way:
```cpp
std::pair<int, int> divide(int a, int b) {
  return std::make_pair(a / b, a % b);
}

int quotient;
int remainder;
std::tie(quotient, remainder) = divide(7, 2);  // 3, 1
```

`std::ignore` skips an element that is not needed:
```cpp
int sum;
int prod;
std::tie(sum, std::ignore, prod) = stats(5, 3);  // 8, 15
```

`std::tie` is also a concise way to compare several values at once. Tuples compare element by element from left to right, so this compares by `age` and then by `name` only when the ages are equal:
```cpp
struct Person {
  std::string name;
  int age;
};

bool younger(const Person& a, const Person& b) {
  return std::tie(a.age, a.name) < std::tie(b.age, b.name);
}
```

> [!NOTE]
> The variables must already exist since `std::tie` takes references to them. To declare and unpack in one step, use structured bindings.

::::

## References

- [cppreference: std::tie](https://en.cppreference.com/cpp/utility/tuple/tie)
- [cppreference: std::ignore](https://en.cppreference.com/cpp/utility/tuple/ignore)

## Related

- [tuple](/collection/tuple)
- [pair](/collection/pair)
- [structured binding](/collection/structured-binding)
