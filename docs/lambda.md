---
title: Lambda
description: Unnamed function object that can capture variables from the surrounding scope.
language: cpp
versions: [C++11, C++17, C++20, C++23]
difficulty: beginner
tags: [functions, syntactic sugar]
example: |
  auto foo = [var](int arg) -> int { return arg * var; };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++11"}

Lambda expressions are syntactic sugar for writing unnamed function objects (functors). Lambdas have the general syntax:
```
[ capture_list ] ( parameter_list ) specifiers -> return_type { body }
```

Lambdas can take parameters and are invoked like a function:
```cpp
// Single parameter.
auto foo = [](int arg) {};
foo(1);

// Multiple parameters.
auto bar = [](std::string str, int pos, char ch) {};
bar("abc", 3, 'c');
```

### Capture List

The capture list can capture variables from the surrounding scope by value or by reference, either one at a time or all at once:
```cpp
int var = 123;

// Capture var by value.
auto foo = [var]() { return var; };

// Capture var by reference.
auto bar = [&var]() { var = 456; };

// Capture all variables by value.
auto baz = [=]() { return var; };

// Capture all variables by reference.
auto qux = [&]() { var = 789; };

// Call the lambdas.
foo();
bar();
baz();
qux();
```

Lambdas in a method can capture `this` to access the fields of the object:
```cpp
class Circle {
public:
  double area() {
    auto compute = [this]() { return 3.14 * radius * radius; };
    return compute();
  }
  double radius;
};
```

### Specifier

A lambda's call operator is `const` by default, so the copies made by value captures cannot be modified. `mutable` allows copied variables to be modified:
```cpp
int count = 0;
auto inc = [count]() mutable { count++; return count; };

inc();  // 1
inc();  // 2, count outside is still 0.
```

Lambdas can optionally have a trailing return type:
```cpp
auto foo = []() -> int { return 0; };
```

::::
::::version{std="C++17"}

`constexpr` lambdas can be evaluated at compile time:
```cpp
auto twice = [](int n) constexpr { return n * 2; };
constexpr int x = twice(2);  // Evaluated at compile time.
```

::::
::::version{std="C++20"}

`consteval` lambdas must be evaluated at compile time:
```cpp
auto twice = [](int n) consteval { return n * 2; };
constexpr int x = twice(2);  // OK.
int y = 2;
int z = twice(y);            // ERROR: y is not a compile-time constant.
```

::::
::::version{std="C++23"}

A `static` lambda cannot capture anything, which lets the compiler avoid passing an object pointer on each call:
```cpp
auto twice = [](int n) static { return n * 2; };
```

::::

## References

- [cppreference: lambda expressions](https://en.cppreference.com/cpp/language/lambda)

## Related

- [functor](/collection/functor)
- [this pointer](/collection/this-pointer)