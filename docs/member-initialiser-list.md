---
title: Member Initialiser List
description: Initialise class member variables before the constructor body runs.
language: cpp
difficulty: beginner
tags: [classes]
example: |
  class Foo {
    Foo(int arg): val(arg) {}
    int val;
  };
authors:
  - name: Dan
    github: dennuguyen
---

Member initialiser lists allow initialisation of class member variables before the constructor body runs. They are written after the `:` character:

```cpp
class Foo {
public:
  Foo(int arg1, std::string arg2) : mem1(arg1), mem2(arg2) {}

private:
  int mem1;
  std::string mem2;
};
```

As opposed to assigning members in the constructor body, initialiser lists have a performance benefit by directly constructing members with their final value. This avoids redundant default-construction then assignment and is especially true for non-trivial types like `std::string`.

Initialiser lists are required for constant and reference member variables to be direct-initialised (with a value) as they cannot be assigned in the constructor body:
```cpp
class Foo {
public:
  Foo(int& arg1, const int arg2) : ref(arg1), cnst(arg2) {}

private:
  int& ref;
  const int cnst;
};
```

## References

- [cppreference: member initialiser list](https://en.cppreference.com/cpp/language/constructor)