---
title: Expected
description: Hold a value or an error.
language: cpp
difficulty: beginner
tags: [stl, errors]
example: |
  #include <expected>
  std::expected<int, std::string> r = std::unexpected("Oops.");
  r.has_value();  // false
  r.error();      // "Oops."
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++23"}

`std::expected<T, E>` holds either a value of type `T` or an error of type `E`. An error is created with `std::unexpected`. It is available from the `expected` header:
```cpp
#include <expected>

std::expected<int, std::string> to_int(char c) {
  if (c >= '0' && c <= '9') {
    return c - '0';
  }
  return std::unexpected("Not a digit.");
}
```

Whether an expected has a value can be checked by converting it to a `bool` or with `has_value()`:
```cpp
auto r = to_int('2');
static_cast<bool>(r);  // true
r.has_value();         // true
```

If the expected has a value, it can be accessed with `*` or `value()`:
```cpp
auto r = to_int('4');
if (r) {
  *r;  // 4
}
r.value();  // 4
```

> [!WARNING]
> If there is an error, using `*` is undefined behaviour and `value()` will throw `std::bad_expected_access`.

If the expected has an error, it can be accessed with `error()`:
```cpp
auto r = to_int('x');
if (!r) {
  r.error();  // "Not a digit."
}
```

> [!WARNING]
> If there is a value, using `error()` is undefined behaviour.

`value_or()` returns the value, or a fallback when there's an error:
```cpp
to_int('x').value_or(0);  // 0
```

`transform()` applies a function to the value if there is one:
```cpp
to_int('7').transform([](int x) { return x * 2; });  // Holds 14.
to_int('x').transform([](int x) { return x * 2; });  // Holds "Not a digit.".
```

`and_then()` calls a function that returns another expected, if there is a value:
```cpp
std::expected<int, std::string> half(int x) {
  if (x % 2 != 0) {
    return std::unexpected("Odd.");
  }
  return x / 2;
}

to_int('8').and_then(half);  // Holds 4.
to_int('7').and_then(half);  // Holds "Odd.".
to_int('x').and_then(half);  // Holds "Not a digit.".
```

`or_else()` calls a function that returns another expected, if there is an error:
```cpp
auto zero = [](const std::string&) -> std::expected<int, std::string> { return 0; };
to_int('7').or_else(zero);  // Holds 7.
to_int('x').or_else(zero);  // Holds 0.
```

> [!NOTE]
> Prefer `std::expected` over exceptions for errors the caller is expected to handle, since the error is visibly part of the function signature. Exceptions suit rare errors that can't be handled near where they occur.

::::

## References

- [cppreference: std::expected](https://en.cppreference.com/cpp/utility/expected)

## Related

- [optional](/collection/optional)
- [exception](/collection/exception)
