---
title: Const Variable
description: Declare a variable whose value cannot change after initialisation.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [types]
example: |
  const int size = 100;
  size = 200;  // ERROR
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A variable declared with the `const` qualifier cannot be modified after it is initialised:
```cpp
const int size = 100;
size = 200;  // ERROR
```

Const variables must be initialised at declaration since they cannot be assigned later:
```cpp
const int size;  // ERROR
```

`const` can be written on either side of the type:
```cpp
const int a = 1;
int const b = 2;
```

Prefer `const` over a `#define` macro for constant values:
```cpp
#define SIZE 100         // Avoid.
const int size = 100;    // Prefer.
```

A macro does not have a type so the compiler cannot type-check it. `NULL_ID` expands to the literal `0`, which is also a valid null pointer constant:
```cpp
#define NULL_ID 0
const int null_id = 0;

void reset(int* p) {}

reset(NULL_ID);  // Compiles but passes a null pointer.
reset(null_id);  // ERROR
```

A macro is a textual substitution which will replace every occurrence of its name after the macro definition:
```cpp
#define SIZE 100
const int size = 100;

void resize() {
  int SIZE = 50;  // ERROR: expands to "int 100 = 50;"
  int size = 50;  // OK: shadows the global size.
}
```

By default, a macro is not visible to the debugger. The preprocessor removes it before compilation so there is no symbol to inspect:
```
(gdb) print SIZE
No symbol "SIZE" in current context.
(gdb) print size
$1 = 100
```

`const` on a function parameter states that the function will not modify the argument. This is most useful with references to avoid copying large objects:
```cpp
void foo(const BigClass& bigObject) { ... }
```

::::

## References

- [cppreference: cv type qualifiers](https://en.cppreference.com/cpp/language/cv)
