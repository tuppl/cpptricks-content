---
title: Inheritance
description: Create a new class using another class as a base to extend from.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [classes]
example: |
  class Base {};
  class Derived : Base {};
authors:
  - name: Dan
    github: dennuguyen
---

:::version{std="C++98"}

Inheritance allows a new class (subclass) to adopt the features of an existing (base) class. The subclass can extend the base with new features or override behaviour without modifying the base class. It is a core concept of object-oriented programming (OOP) which promotes code reusability.

Inheritance is enabled using the `:` syntax:
```cpp
class Base {};
class Derived : public Base {};
```

Base classes with non-default constructors must be called in the derived class constructor initialiser list:
```cpp
class Base {
public:
  Base(int) {}
};

class Derived : public Base {
public:
  Derived() : Base(0) {}
  Derived(int x) : Base(x) {}
};
```

> [!NOTE]
> If the base class has a default constructor, it is called implicitly and does not need to be listed in the initialiser list.

### Order

The order of construction/destruction is:
1. Construct base object.
2. Construct derived object.
3. Destroy derived object.
4. Destroy base object.

### Access Specifier

The access specifier **caps** the access of members of base class members in the derived class:
```cpp
class PublicDerived : public Base {};
class ProtectedDerived : protected Base {};
class PrivateDerived : private Base {};
```
- In all three access types of inheritance, the private members are inaccessible to derived classes.
- Public inheritance does not change access to members of the base class.
- Protected inheritance causes public members of the base class to become protected.
- Private inheritance causes public and protected members of the base class to become private.

If the access specifier is omitted:
```cpp
class Derived : Base {};   // Private inheritance by default.
struct Derived : Base {};  // Public inheritance by default.
```

:::
:::version{std="C++11"}

### Final

The `final` specifier stops other classes from deriving that class:
```cpp
class LastDerived final : public Base {};
class TryDerived : public LastDerived {};  // Compiler error.
```
:::

## References

- [cpprefrence: derived class](https://en.cppreference.com/cpp/language/derived_class)