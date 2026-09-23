---
title: Boolalpha
description: Print booleans as "true"/"false" strings instead of the default 1/0.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [io]
example: |
  std::cout << std::boolalpha
    << true << "\n"
    << false << "\n";
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`std::boolalpha` is an I/O manipulator which prints boolean expressions as "true" and "false" strings instead of the usual 1/0.

```cpp
#include <iostream>

int main() {
  std::cout << std::boolalpha
    << true << "\n"
    << false << "\n";
}
```

::::

## References

- [cppreference: boolalpha](https://en.cppreference.com/cpp/io/manip/boolalpha)