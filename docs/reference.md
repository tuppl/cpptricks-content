---
title: Reference
description: Alias for an existing variable.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [memory]
example: |
  int var = 1;
  int& ref = var;  // ref is an alias for var.
  ref = 2;         // var is now 2.
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A reference is an alternative name for an existing variable. A reference is declared by specifying the variable type followed by `&`:
```cpp
int var = 1;
int& ref = var;
```

Reading and writing the reference reads and writes the original variable:
```cpp
ref = 2;
std::cout << var << "\n";  // 2
```

References must be initialised when declared:
```cpp
int& ref;  // ERROR.
```

References cannot rebound to another variable:
```cpp
int a = 1;
int& ref = a;

int b = 2;
ref = b;  // a is now 2, ref still refers to a.
```

A `const` reference can read but not modify the variable it refers to:
```cpp
int var = 1;
const int& ref = var;
ref = 2;  // ERROR.
```

References are most often used as function parameters so the function can modify the caller's variable, or to avoid copying large objects:
```cpp
void increment(int& n) { n++; }
void print(const std::string& s) { std::cout << s; }

int count = 0;
increment(count);  // count is now 1.
```

> [!NOTE]
> Prefer references over pointers where possible. A reference can never be null or uninitialised, so it does not need to be checked before use.

::::

## References

- [cppreference: reference declaration](https://en.cppreference.com/cpp/language/reference)

## Related

- [pointer](/collection/pointer)
- [const variable](/collection/const-variable)
