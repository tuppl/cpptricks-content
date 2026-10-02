---
title: Pointer
description: Variable that stores the memory address of another variable.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [memory]
example: |
  int var = 1;
  int* ptr = &var;  // Address of var.
  *ptr = 2;         // var = 2.
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A pointer is a variable that stores the memory address of another variable. Declare a pointer by specifying the variable type followed by an asterisk `*`:
```cpp
int* ptr;
```

The address of a variable is obtained with the address-of operator (`&`):
```cpp
int var = 1;
int* ptr = &var;
```

The value at the address is accessed with the dereference operator (`*`). Reading and writing through the pointer reads and writes the original variable:
```cpp
std::cout << *ptr << "\n";  // 1
*ptr = 2;
std::cout << var << "\n";   // 2
```

A pointer can be reassigned to point at a different variable:
```cpp
int a = 1;
int b = 2;
int* ptr = &a;
ptr = &b;
*ptr = 3;  // b is now 3, a is unchanged.
```

Members of a pointed-to object are accessed with the stab operator (`->`), which is syntactic sugar for dereferencing then using the dot operator:
```cpp
struct Point { int x; int y; };

Point p = {1, 2};
Point* ptr = &p;
ptr->x = 5;   // Same as (*ptr).x = 5;
```

`const` can apply to the pointed-to value, the pointer itself, or both:
```cpp
int var = 1;
const int* a = &var;        // Cannot modify *a, can reassign a.
int* const b = &var;        // Can modify *b, cannot reassign b.
const int* const c = &var;  // Cannot modify *c, cannot reassign c.
```

> [!CAUTION]
> Dereferencing an uninitialised or null pointer is undefined behaviour and usually crashes the program. Always initialise a pointer during declaration.

::::
::::version{std="C++11"}

A null pointer can be assigned by using the `nullptr` keyword and can be checked before dereferencing:
```cpp
int* ptr = nullptr;

if (ptr != nullptr) {
  *ptr = 1;
}
```

> [!NOTE]
> Prefer `nullptr` over `NULL` or `0`. `nullptr` has its own type so it cannot be confused with an integer.

::::

## References

- [cppreference: pointer declaration](https://en.cppreference.com/cpp/language/pointer)
- [cppreference: nullptr](https://en.cppreference.com/cpp/language/nullptr)

## Related

- [const variable](/collection/const-variable)
