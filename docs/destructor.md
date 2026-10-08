---
title: Destructor
description: Member function that runs when an object is destroyed.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [classes, memory]
example: |
  class Buffer {
  public:
    Buffer() : data(new int[8]) {}
    ~Buffer() { delete[] data; }
    int* data;
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A destructor is a special member function that runs when an object is destroyed. It has the same name as the class with a leading `~`, no parameters, and no return type:
```cpp
class Logger {
public:
  Logger() { std::cout << "created\n"; }
  ~Logger() { std::cout << "destroyed\n"; }
};
```

For an object on the stack, the destructor runs when the object goes out of scope:
```cpp
void run() {
  Logger log;  // Prints "created".
}              // Prints "destroyed".
```

For an object allocated with `new`, the destructor runs when `delete` is called:
```cpp
Logger* log = new Logger;  // Prints "created".
delete log;                // Prints "destroyed".
```

Destructors are used to release resources the object acquired, such as memory from `new`:
```cpp
class Buffer {
public:
  Buffer() : data(new int[8]) {}
  ~Buffer() { delete[] data; }
  int* data;
};

void run() {
  Buffer buf;
}  // ~Buffer runs and internally frees data.
```

If no destructor is written, the compiler generates one that does nothing beyond destroying each field.

::::

## References

- [cppreference: destructors](https://en.cppreference.com/cpp/language/destructor)

## Related

- [constructor](/collection/constructor)
- [new and delete](/collection/new-delete)
