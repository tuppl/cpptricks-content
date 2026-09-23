---
title: Namespace
description: Groups identifiers to a named scope to prevent name collisions.
language: cpp
versions: [C++98, C++17]
difficulty: beginner
tags: []
example: |
  namespace GroupA { int var = 1; }
  GroupA::var;
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Namespaces act as a scope/grouping around declarations (named types, variables, functions, etc.) to prevent name collisions and help organise code.

To create a namespace:
```cpp
namespace GroupA {
  int var = 1;
  void foo() {}
}
```

Then access the members of the namespace with the scope operator (`::`):
```cpp
GroupA::var;
GroupA::foo();
```

Namespaces can be nested:
```cpp
namespace GroupA {
  namespace GroupB {
    int bar = 2;
  }
}

GroupA::GroupB::bar;
```

You can bring the members of a namespace into global scope with the `using` directive:
```cpp
using namespace GroupA;
```

Which lets you access those members without the scope operator:
```cpp
var;
foo();
```

> [!WARNING]
> Avoid `using` namespaces (in header files especially) since this pollutes the global scope which can cause name collisions.

::::
::::version{std="C++17"}

Nested namespaces can be defined with the shorthand `::` syntax:
```cpp
namespace GroupC::GroupD {
  int car = 3;
}

GroupC::GroupD::car;
```

::::

## References

- [cppreference: namespace](https://en.cppreference.com/cpp/language/namespace)