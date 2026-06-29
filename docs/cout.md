---
title: cout
description: Print to standard output using I/O streams.
language: cpp98
difficulty: beginner
tags: [streams, io]
example: |
  #include <iostream>
  std::cout << var << "\n";
authors:
  - name: Dan
    github: dennuguyen
---

Print using stream-based output devices as a type-safe alternative to C's `printf`. The stream to print to output is `std::cout` from the `iostream` library:

```cpp
#include <iostream>
```

Variables and literals can be printed to `std::cout` using the stream insertion operator (`<<`):
```cpp
int var = 123;
std::cout << var;
```

Printing can also be chained:
```cpp
std::cout << "nums: " << var << ", " << 456 << "\n";
```

Classes can be printed if the stream insertion operator has been implemented:
```cpp
class Foo {
public:
  int var = 24;

  friend std::ostream& operator<<(std::ostream& os,
                           Foo const& obj) {
    os << obj.var;
    return os;
  }
};

Foo obj;
std::cout << obj;
```

`iostream` introduces `std::endl` which is syntactic-sugar for printing a new line and flushing the buffer:
```cpp
std::cout << var << std::endl;
```

## References

- [cppreference: std:cout](https://en.cppreference.com/cpp/io/cout)
- [cppreference: operator<<](https://en.cppreference.com/cpp/io/basic_ostream/operator_ltlt2)
