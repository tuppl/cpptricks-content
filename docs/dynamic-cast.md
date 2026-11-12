---
title: Dynamic Cast
description: Safely convert a base class pointer or reference to a derived class.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [types, polymorphism]
example: |
  Shape* s = new Circle();
  Circle* c = dynamic_cast<Circle*>(s);  // OK.
  Square* q = dynamic_cast<Square*>(s);  // Null pointer.
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Consider this inheritance tree:
```cpp
class Shape {
public:
  virtual ~Shape() {}
};

class Circle : public Shape {};
class Square : public Shape {};
```

`dynamic_cast` converts a pointer or reference to a base class into a pointer or reference to a derived class (downcasting). Unlike `static_cast`, it checks at runtime that the object really is the derived type, and the cast fails if it isn't. A `static_cast` to the wrong type isn't checked, so using its result is undefined behaviour.

When casting a pointer, a failed cast returns a null pointer, so the result can be checked in an `if`:
```cpp
Shape* s = new Circle();

if (Circle* c = dynamic_cast<Circle*>(s)) {
  // Runs, since s points to a Circle.
}

if (Square* q = dynamic_cast<Square*>(s)) {
  // Doesn't run, since q is a null pointer.
}
```

When casting a reference, a failed cast throws `std::bad_cast`:
```cpp
Shape& r = *s;
Circle& c = dynamic_cast<Circle&>(r);  // OK.
Square& q = dynamic_cast<Square&>(r);  // Throws std::bad_cast.
```

Downcasting with `dynamic_cast` only works when the base class is polymorphic, meaning it has at least one virtual function:
```cpp
class Base {};
class Derived : public Base {};

Base* b = new Derived();
dynamic_cast<Derived*>(b);  // ERROR: Base is not polymorphic.
```

::::

## References

- [cppreference: dynamic_cast conversion](https://en.cppreference.com/cpp/language/dynamic_cast)

## Related

- [static cast](/collection/static-cast)
- [virtual function](/collection/virtual-function)
- [inheritance](/collection/inheritance)
