---
title: Const Method
description: Member function that cannot modify the object it is called on.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [classes]
example: |
  class Foo {
  public:
    int get() const { return val; }
  private:
    int val;
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A member function with the `const` keyword after its parameter list cannot modify its object's fields:
```cpp
class Counter {
public:
  int get() const { return count; }
  void reset() const { count = 0; }  // ERROR.

private:
  int count;
};
```

A `const` object can **only** call its `const` methods:
```cpp
class Counter {
public:
  Counter() : count(0) {}
  int get() const { return count; }
  void increment() { count++; }

private:
  int count;
};

const Counter c;
c.get();        // OK.
c.increment();  // ERROR.
```

This also applies when an object is passed by `const` reference:
```cpp
void print(const Counter& c) {
  std::cout << c.get() << "\n";  // OK.
  c.increment();                 // ERROR.
}
```

When a `const` method is defined outside the class, `const` must appear on both the declaration and the definition:
```cpp
class Counter {
public:
  int get() const;

private:
  int count;
};

int Counter::get() const {
  return count;
}
```

::::

## References

- [cppreference: const-qualified member functions](https://en.cppreference.com/cpp/language/member_functions)

## Related

- [class](/collection/class)
- [const variable](/collection/const-variable)
- [reference](/collection/reference)
