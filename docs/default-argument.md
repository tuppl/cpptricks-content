---
title: Default Argument
description: A function parameter uses a default value when the caller omits it.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [functions]
example: |
  void greet(std::string name = "world");
  greet();         // Hello world
  greet("there");  // Hello there
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A function parameter can be given a default value which is used when the caller does not pass an argument for it:
```cpp
void greet(std::string name = "world") {
  std::cout << "Hello " << name << "\n";
}

greet();         // Hello world
greet("there");  // Hello there
```

Parameters with default arguments can only appear at the end of a parameter list:
```cpp
void f(int a, int b = 2, int c = 3);  // OK.
void g(int a = 1, int b);             // ERROR.
```

Default arguments are always filled from the end of the parameter list, so a caller cannot skip an earlier default argument:
```cpp
void f(int a, int b = 2, int c = 3);
f(1);        // a = 1, b = 2, c = 3
f(1, 5);     // a = 1, b = 5, c = 3
f(1, 5, 9);  // a = 1, b = 5, c = 9
```

Default values must go in the function declaration and not the definition:
```cpp
void f(int a, int b = 2);  // Declaration.
void f(int a, int b) {}    // Definition.
```

> [!CAUTION]
> Repeating the default arguments in the definition is a compiler error.

::::

## References

- [cppreference: default arguments](https://en.cppreference.com/cpp/language/default_arguments)

## Related

- [function overloading](/collection/function-overloading)
