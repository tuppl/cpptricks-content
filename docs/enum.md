---
title: Enumeration
description: User-defined data type to give integer constants meaningful names.
language: cpp
difficulty: beginner
tags: [enum]
example: |
  enum class Status {
    Stopped,
    Running,
    Paused
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++11"}

Enums allow meaningful names to be used instead of magic numbers. The first enum has the value `0` with each subsequent enum incrementing by `1`:
```cpp
enum Status {
  Stopped,  // 0
  Running,  // 1
  Paused    // 2
};

Status status;
switch (status) {
  case Stopped: break;
  case Running: break;
  case Paused: break;
}
```

Enums can be assigned custom values. Enums that did not get assigned a custom value will be the previous enum's value plus one:
```cpp
enum HttpStatus {
  OK = 200,
  NotFound = 404,
  InternalError = 500,
  NotImplemented  // 501
};
```

The enum's default underlying type is an `int`. This underlying type can be changed to any integral type that can represent all the enum values:
```cpp
enum Status : char {
  Stopped = 'S',
  Running = 'R',
  Paused = 'P'
};
```

The enums covered so far are unscoped enums which pollutes the enclosing scope and can implicitly convert breaking type safety. Enums can be scoped by declaring `enum class`:
```cpp
enum class Status {
  Stopped,
  Running,
  Paused
};

Status status;
switch (status) {
  case Status::Stopped: break;
  case Status::Running: break;
  case Status::Paused: break;
}
```

Implicit conversions from scoped enum values to integral types are not allowed:
```cpp
// int s = status;                 // error
int s = static_cast<int>(status);  // ok
```

:::version{std="C++20"}
`using enum` statements allow scoped enums to be used without typing its full scope.
```cpp
switch (status) {
  using enum Status;
  case Stopped: break;
  case Running: break;
  case Paused: break;
}
```
:::
::::

## References

- [cppreferences: enum](https://en.cppreference.com/cpp/language/enum)
