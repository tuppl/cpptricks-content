---
title: Exception
description: Report and handle errors with throw, try and catch.
language: cpp
difficulty: beginner
tags: [errors]
example: |
  try {
    throw std::runtime_error("Oops.");
  } catch (const std::exception& e) {
    e.what();  // "Oops."
  }
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

An exception reports an error by transferring control to a handler. The control flow is as follows:
1. `throw` raises an exception.
2. The rest of the `try` block is skipped, and the call stack is unwound back to it.
3. The first matching `catch` block runs, then the program continues after the try-catch block.

If nothing catches the exception, the program terminates:
```cpp
#include <stdexcept>

double divide(double a, double b) {
  if (b == 0) {
    throw std::invalid_argument("Division by zero.");
  }
  return a / b;
}

try {
  divide(1, 0);
} catch (const std::invalid_argument& e) {
  // e.what() returns the exception's message.
  std::cout << e.what() << "\n";  // Division by zero.
}
```

> [!NOTE]
> Catch exceptions by `const` reference. Catching by value copies the exception, and slices derived exceptions caught as their base type.

When an exception is thrown, the call stack is unwound:
```cpp
void f() {
  std::vector<int> v(100);
  throw std::runtime_error("Oops.");
}  // v is destroyed before the exception leaves f.
```

> [!WARNING]
> Don't throw exceptions from a destructor. If a destructor throws during stack unwinding, the program terminates.

The standard exceptions all derive from `std::exception`. The most common ones come from the `stdexcept` header:
- `std::runtime_error` for errors that can only be detected while the program runs.
- `std::logic_error` for bugs that could have been caught before running. Deriving from `std::logic_error` are:
  - `std::invalid_argument` for an argument with a value the function doesn't accept, such as `divide(1, 0)` above.
  - `std::out_of_range` for an index or value outside the allowed range, such as `v.at(10)` on a vector of 3 elements.

A `try` block can have multiple `catch` blocks for different types of exceptions. These `catch` blocks are checked in the order they are written:
```cpp
try {
  std::vector<int> v;
  v.at(0);
} catch (const std::out_of_range& e) {
  std::cout << "Out of range: " << e.what() << "\n";
} catch (const std::exception& e) {
  std::cout << "Other error: " << e.what() << "\n";
}
```

> [!NOTE]
> Write the more specific exception types first, otherwise a `catch` for a base class would catch the exception first.

The catch-all handler is `catch (...)`, which catches any exception:
```cpp
try {
  throw std::runtime_error("Oops.");
} catch (...) {
}
```

`throw;` rethrows the current exception from inside a `catch` block:
```cpp
try {
  throw std::runtime_error("Oops.");
} catch (...) {
  throw;
}
```

### Custom Exception

Custom exceptions usually derive from a standard exception, so they can still be caught as `std::exception`:
```cpp
class ParseError : public std::runtime_error {
public:
  ParseError(const std::string& msg) : std::runtime_error(msg) {}
};

try {
  throw ParseError("Expected a number.");
} catch (const ParseError& e) {
  std::cout << e.what() << "\n";  // Expected a number.
}
```

::::
::::version{std="C++11"}

`noexcept` marks a function that is not allowed to throw. If it throws, the program terminates instead of passing the exception to the caller:
```cpp
int add(int a, int b) noexcept {
  return a + b;
}
```

> [!NOTE]
> Destructors and `operator delete` are implicitly `noexcept`.

::::

## References

- [cppreference: throw](https://en.cppreference.com/cpp/language/throw)
- [cppreference: try block](https://en.cppreference.com/cpp/language/try)
- [cppreference: std::exception](https://en.cppreference.com/cpp/error/exception)
- [cppreference: noexcept specifier](https://en.cppreference.com/cpp/language/noexcept_spec)

## Related

- [destructor](/collection/destructor)
- [optional](/collection/optional)
- [expected](/collection/expected)
