---
title: Multiple Inheritance
description: Subclass extending from multiple base classes.
language: cpp
versions: [C++98]
difficulty: intermediate
tags: [classes]
example: |
  class Base1 {};
  class Base2 {};
  class Derived : public Base1, public Base2 {};
authors:
  - name: Dan
    github: dennuguyen
---

:::version{std="C++98"}

A subclass can inherit from multiple base classes which requires a comma-separated base-specifier list:
```cpp
class Base1 {};
class Base2 {};
class Child : public Base1, public Base2 {};
```

> [!CAUTION]
> Inheriting the same class twice directly is ill-formed:
> ```cpp
> class Child : public Base1, public Base1 {};  // Error.
> ```

### Order

The order of construction/destruction will be:
1. Construction of each base class in the base-specifier list (left-to-right).
2. Construct derived object.
3. Destroy derived object.
4. Destroy each base class in base-specifier list in reverse (right-to-left).

### Ambiguity

If two inherited base classes contain members with the same name, there will be a compiler error. Use the scope resolution (`::`) operator to target the class before accessing the member:
```cpp
struct Base1 { int data; };
struct Base2 { int data; };
struct Child : public Base1, public Base2 {};

Child c;
// c.data;  // Error: ambiguous.
c.Base1::data;
c.Base2::data;
```

### Virtual Inheritance

Consider when a class inherits two parent classes that in-turn inherit a common grandparent class:
```cpp
struct Grandparent { int data; };
struct Parent1 : public Grandparent {};
struct Parent2 : public Grandparent {};
struct Child : public Parent1, public Parent2 {};

Child c;
c.data;  // Error: ambiguous.
```
The `c` object has two separate grandparent instances thus it is ambiguous if `data` is resolved through `Parent1` or `Parent2`. This is the "dreaded diamond" problem:
```
     Grandparent
        /  \
       /    \
      /      \
Parent1      Parent2
      \      /
       \    /
        \  /
       Child
```

Virtual inheritance resolves the diamond problem so there is only a single instance of the grandparent object. Virtual inheritance should be applied on the classes deriving the grandparent (where the inheritance chain begins to split):
```cpp
struct Grandparent { int data; };
struct Parent1 : virtual public Grandparent {};
struct Parent2 : virtual public Grandparent {};
struct Child : public Parent1, public Parent2 {};
```

:::

## References

- [cpprefrence: derived class](https://en.cppreference.com/cpp/language/derived_class)
- [isocpp: multiple inheritance](https://isocpp.org/wiki/faq/multiple-inheritance)