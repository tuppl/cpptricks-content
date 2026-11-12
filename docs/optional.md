---
title: Optional
description: Hold a value or nothing.
language: cpp
versions: [C++17, C++23]
difficulty: beginner
tags: [stl, errors]
example: |
  #include <optional>
  std::optional<int> x;
  x.has_value();  // false
  x = 5;
  *x;             // 5
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++17"}

`std::optional` holds either a value or nothing. It can be used for returning a result that might not exist, without needing a special value like `-1` or a null pointer. Instead, `std::nullopt` represents no value, and can be assigned to an optional. It is available from the `optional` header:
```cpp
#include <optional>

std::optional<float> divide(int numerator, int denominator) {
  if (denominator == 0) {
    return std::nullopt;
  }
  return static_cast<float>(numerator) / denominator;
}
```

Whether an optional has a value is checked with `has_value()` or by converting it to `bool`:
```cpp
std::optional<float> val = divide(10, 2);
val.has_value();         // true
static_cast<bool>(val);  // true
```

If the optional has a value, it can be accessed with `*`:
```cpp
std::optional<float> val = divide(10, 2);
if (val) {
  *val;  // 5
}
```

The optional can also be accessed with `value()`, which throws `std::bad_optional_access` if empty:
```cpp
std::optional<float> val = divide(10, 0);
val.value();  // Throws std::bad_optional_access.
```

> [!WARNING]
> Using `*` on an empty optional is undefined behaviour, so check that it has a value first or use `value()`.

`value_or()` returns the value, or a fallback when the optional is empty:
```cpp
divide(10, 0).value_or(0);  // 0
```

An optional starts empty, and can be assigned or cleared:
```cpp
std::optional<std::string> name;
name.has_value();  // false
name = "Alice";
name.reset();      // Empty again.
```

::::
::::version{std="C++23"}

`transform()` applies a function to the value if there is one:
```cpp
divide(10, 2).transform([](float x) { return x * 2; });  // Holds 10.
divide(10, 0).transform([](float x) { return x * 2; });  // Empty.
```

`and_then()` chains another function that returns an optional:
```cpp
divide(10, 2).and_then([](float x) { return x * 2; });  // Holds 10.
```

`or_else()` calls a function only when the optional is empty:
```cpp
divide(10, 0).or_else([] { return std::optional<float>(0); });  // Holds 0.
```

::::

## References

- [cppreference: std::optional](https://en.cppreference.com/cpp/utility/optional)

## Related

- [expected](/collection/expected)
- [exception](/collection/exception)
