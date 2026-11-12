---
title: Virtual Destructor
description: Destroy a derived object correctly through a base class pointer.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [classes, polymorphism, memory]
example: |
  class Shape {
  public:
    virtual ~Shape() {}
  };

  Shape* s = new Circle();
  delete s;
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Consider a pointer to a `Circle` inheriting `Shape`, which is deleted via the base pointer:
```cpp
class Shape {
public:
  ~Shape() { std::cout << "~Shape\n"; }
};

class Circle : public Shape {
public:
  ~Circle() { std::cout << "~Circle\n"; }
};

Shape* s = new Circle();
delete s;  // Undefined behaviour.
```

The above program has undefined behaviour, but usually outputs:
```
~Shape
```

`~Circle()` never runs, so anything `Circle` owns, such as memory from `new`, is never freed.

Declaring the base class destructor `virtual` makes `delete` call the destructor of the object's actual type. The derived destructor runs first, then the base destructor:
```cpp
class Shape {
public:
  virtual ~Shape() { std::cout << "~Shape\n"; }
};

class Circle : public Shape {
public:
  ~Circle() { std::cout << "~Circle\n"; }
};

Shape* s = new Circle();
delete s;
```
```
~Circle
~Shape
```

Once the base class destructor is `virtual`, every derived class destructor is `virtual` too (without needing the `virtual` keyword).

> [!NOTE]
> If a class has any virtual functions, give it a virtual destructor too.

::::

## References

- [cppreference: destructors](https://en.cppreference.com/cpp/language/destructor)
- [cppreference: virtual function specifier](https://en.cppreference.com/cpp/language/virtual)

## Related

- [destructor](/collection/destructor)
- [virtual function](/collection/virtual-function)
- [abstract class](/collection/abstract-class)
- [inheritance](/collection/inheritance)
