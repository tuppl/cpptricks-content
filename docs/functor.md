---
title: Functors
description: Objects that are callable like functions and with internal state.
language: cpp
difficulty: beginner
tags: [classes]
example: |
  Doubler obj(1);
  obj();  // value = 2
  obj();  // value = 4
authors:
  - name: Dan
    github: dennuguyen
---

Functors (function objects) are classes that are callable like functions and can hold state between calls. The below example shows an `obj` doubling in value with every function call: 

```cpp
Doubler obj(1);
obj();  // value = 2
obj();  // value = 4
```

Functors are implemented by overloading the function call operator.

```cpp
struct Doubler {
  int value;

  Doubler(int v) : value(v) {}

  void operator()() {
    value *= 2;
  }
};
```

## References

- [cppreference: function objects](https://cppreference.com/cpp/utility/functional)