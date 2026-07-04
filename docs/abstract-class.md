---
title: Abstract Class
description: Class that cannot be instantiated but can be used as a base class for inheritance.
language: cpp
versions: [C++11]
difficulty: beginner
tags: [classes]
example: |
  class Base {
    virtual void f() = 0;
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Abstract classes are classes that cannot be instantiated directly but instead intended to be used as a base class for inheritance. Any class that defines or inherits a class with at least a pure virtual function is abstract. Pure virtual functions are virtual functions with the pure-specifier (`= 0`):
```cpp
class Base {
  virtual void f() = 0;
};
```

`= 0` means implementation will be deferred to the subclass instead. Any subclass that implements all its pure virtual functions is no longer an abstract class and can be instantiated:
```cpp
class Derived : public Base {
  virtual void f() { ... }
};
```

Pure virtual destructors can be used if the base class must be abstract and has no appropriate function to defer to the subclass to implement. Pure virtual destructors must still have a class definition provided since the destructor-call is mandatory for clean-up:
```cpp
class Base {
  virtual ~Base() = 0;
};

// MUST be provided outside the class definition.
Base::~Base() {}

class Derived : public Base {
  virtual ~Derived() {}
};
```

Derived classes cannot override functions to become pure:
```cpp
class Base {
  virtual void f() {}
};

class Derived : public Base {
  virtual void f() = 0;  // ERROR.
};
```

::::

## References

- [cpprefrence: abstract class](https://en.cppreference.com/cpp/language/abstract_class)