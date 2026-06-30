---
title: Character Input
description: Write to standard input using I/O streams.
language: cpp98
difficulty: beginner
tags: [streams, io]
example: |
  #include <iostream>
  std::cin >> var;
authors:
  - name: Dan
    github: dennuguyen
---

Capture user input from the standard input device to `std::cin` stream object as a type-safe alternative to C's `scanf`. `std::cin` is available from the `iostream` library:

```cpp
#include <iostream>
```

Values can be read from `std::cin` using the stream extraction operator (`>>`):
```cpp
int var;
std::cin >> var;
```

Reading can also be chained. `>>` reads the next whitespace-delimited token from input so values can be delimited by spaces, tabs, or newlines:
```cpp
int var1, var2, var3;
std::cin >> var1 >> var2 >> var3;
// input: 1 2 3    (works)
// input: 1\n2\n3  (also works)
```

> [!WARNING]
> `>>` stops reading at whitespace. To read a full line including spaces,
> use `std::getline(std::cin, std::string&)` instead.

The expression `std::cin >> var` returns the stream itself which becomes `false` if the extraction fails e.g. end-of-input or invalid type. This makes it usable as a loop condition to read values:
```cpp
int var;
while (std::cin >> var) {
    std::cout << var << "\n";
}
```

Variables of different types can be read and extracted from the user input in the order it is found:
```cpp
int var;
char ch;
float num;

std::cin >> var >> ch >> num;
// input: 10 a 3.14  (works)
// input: 10a3.14    (also works)
```

> [!NOTE]
> `>>` also doesn't require whitespace between different types and will stops if the > character that doesn't fit the target type.
> 
> `10a3.14` works because `10` stops at `a` (non-digit),  `a` is a single character, and `3.14` is read as a float.

## References

- [cppreference: std:cin](https://en.cppreference.com/cpp/io/cin)
- [cppreference: operator>>](https://en.cppreference.com/cpp/io/basic_istream/operator_gtgt2)
