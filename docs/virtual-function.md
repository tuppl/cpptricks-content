---
title: Virtual Function
description: Member functions that can be overridden in derived classes.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [classes, polymorphism]
example: |
  class Base { virtual void f() {} }
  class Derived : Base
    { virtual void f() override {} }
authors:
  - name: Dan
    github: dennuguyen
---

:::version{std="C++98"}

Virtual functions are methods whose implementation can be redefined in the derived class i.e. overridden. They are declared with the `virtual` specifier:
```cpp
class Base {
public:
  virtual void f() {
    std::cout << "base";
  }
};
```

A derived class can then override `f` by redefining the function:
```cpp
class Derived : public Base {
public:
  virtual void f() {
    std::cout << "derived";
  }
};
```

Virtual function calls from a derived object via a base class pointer or reference will invoke the overridden function:
```cpp
// Pass-by-reference.
void foo(Base& b) { b.f(); }

// Pass-by-pointer.
void foo(Base* b) { b->f(); }

int main() {
  Base b;
  Derived d;

  foo(b);   // Prints "base".
  foo(d);   // Prints "derived".

  foo(&b);  // Prints "base".
  foo(&d);  // Prints "derived".
}
```

> [!NOTE]
> Virtual function calls are enabled by dynamic dispatch.
> 
> Each polymorphic class contains a vtable (virtual table) of function pointers to all virtual method implementations available to the class (generated at compile time).
> 
> Every object instance of the polymorphic class has a vptr (virtual pointer) which (during object construction) points to the vtable.
> 
> This dynamically binds the virtual function call to the overridden implementation.

:::
:::version{std="C++11"}

Prefer to mark overriding functions with `override`:
```cpp
virtual void f() override {
  std::cout << "derived";
}
```

> [!CAUTION]
> A compiler error occurs if a method marked `override` tries to override a non-virtual function.

Virtual functions can be marked `final` to declare that the function cannot be overridden in a derived class:

```cpp
class Derived : public Base {
public:
  virtual void f() override final {
    std::cout << "derived";
  }
};

class DerivedAgain : public Derived {
public:
  virtual void f() override {  // ERROR.
    std::cout << "derived again";
  }
};
```

:::

## References

- [cpprefrence: virtual function](https://en.cppreference.com/cpp/language/virtual)
- [cppreference: override](https://en.cppreference.com/cpp/language/override)