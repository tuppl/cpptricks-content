---
title: Boolalpha
description: Print booleans as "true"/"false" strings instead of the default 1/0.
tags: [cpp98, beginner]
example: |
  std::cout << std::boolalpha
    << true << "\n"
    << false << "\n";
authors:
  - name: Dan
    github: dennuguyen
---

`std::boolalpha` is an I/O manipulator which prints boolean expressions as "true" and "false" strings instead of the usual 1/0.

```cpp
#include <iostream>

int main() {
  std::cout << std::boolalpha
    << true << "\n"
    << false << "\n";
}
```

## References

- [cppreferences: boolalpha](https://en.cppreference.com/cpp/io/manip/boolalpha)