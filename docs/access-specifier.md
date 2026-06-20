---
title: Access Specifier
description: Set class member accessibility.
language: cpp
difficulty: beginner
tags: [classes]
example: |
  class Example {
  public:
  protected:
  private:
  };
authors:
  - name: Dan
    github: dennuguyen
---

Access specifiers define the accessibility of class members. There are 3 specifiers:
- `public`: members accessible outside the class.
- `private`: members only accessible within the class and friends.
- `protected`: members only accessible within the class, friends, and its derived classes.

Members written beneath an access specifier have that specifier until the next access specifier or end of class definition:
```cpp
class Base {
public:
  int a = 1;

protected:
  int b = 2;

private:
  int c = 3;
};
```

## Inheritance

Class inheritance can also have access specifiers which redefines the accessibility of inherited members. The rule-of-thumb is *member accessibility is capped at the access specifier of inheritance*.

```cpp
class PublicDerived : public Base {
  // a is public
  // b is protected
  // c is inaccessible to PublicDerived
};

class ProtectedDerived : protected Base {
  // a is protected
  // b is protected
  // c is inaccessible to ProtectedDerived
};

class PrivateDerived : private Base {
  // a is private
  // b is private
  // c is inaccessible to PrivateDerived
};
```

## Class vs Struct

Classes and structs are identical except for their default access specifier.
- Classes are by default `private` and structs by default `public`.
- Class inheritance is by default `private`  and structs by default `public`.
  ```cpp
  class ClassDerived : Base;
  struct StructDerived : Base;
  ```

## References

- [cpprefrence: access specifiers](https://en.cppreference.com/cpp/language/access)
