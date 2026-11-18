---
title: Getline
description: Read a line of input into a string.
language: cpp
difficulty: beginner
tags: [streams, io]
example: |
  std::string line;
  std::getline(std::cin, line);
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`std::getline` reads characters into a `std::string` until it reaches a newline (`\n`) or the end of input. The newline is removed from the input and not stored in the string. It is available from the `string` header:
```cpp
#include <string>

std::string line;
std::getline(std::cin, line);  // hello world\ngoodbye world
std::cout << line;             // hello world
```

The first argument can be any input stream, such as `std::cin`, a file stream, or a string stream:
```cpp
std::ifstream fs("notes.txt");
std::getline(fs, line);

std::istringstream ss("hello world\ngoodbye world");
std::getline(ss, line);  // hello world
```

`std::getline` accepts an optional third argument to set a different delimiter:
```cpp
std::string line;
std::getline(std::cin, line, ',');  // hello world\ngoodbye, world
std::cout << line;                  // hello world\ngoodbye
```

`std::getline` returns the stream. It is convertible to a boolean, which is `false` when end of input is reached. This makes it usable as a loop condition:
```cpp
std::string line;
while (std::getline(std::cin, line)) {
  std::cout << line << "\n";
}
```

::::

## References

- [cppreference: std::getline](https://en.cppreference.com/cpp/string/basic_string/getline)

## Related

- [character input](/collection/cin)
- [string](/collection/string)
- [string stream](/collection/string-stream)
- [file stream](/collection/file-stream)
