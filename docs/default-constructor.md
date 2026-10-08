---
title: Default Constructor
description: Constructor that can be called with no arguments.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [classes, constructors]
example: |
  class Foo {
  public:
    Foo() : val(0) {}
    int val;
  };

  Foo obj;  // Calls Foo().
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A constructor is a special member function that runs when an object is created. It has the same name as the class and no return type. A default constructor is a constructor that can be called with no arguments:
```cpp
class Foo {
public:
  Foo() : val(0) {}
  int val;
};

Foo obj;
std::cout << obj.val << "\n";  // 0
```

If a class declares no constructors, the compiler generates a default constructor that does nothing. Members of fundamental types are left uninitialised:
```cpp
class Foo {
public:
  int val;
};

Foo obj;  // OK: val is uninitialised.
```

Declaring any other constructor stops the compiler from generating the default constructor:
```cpp
class Foo {
public:
  Foo(int v) : val(v) {}
  int val;
};

Foo a(1);  // OK.
Foo b;     // ERROR.
```

A constructor where every parameter has a default argument is also a default constructor:
```cpp
class Foo {
public:
  Foo(int v = 0) : val(v) {}
  int val;
};

Foo a;     // val = 0
Foo b(1);  // val = 1
```

> [!WARNING]
> Do not write empty parentheses when calling the default constructor. This declares a function instead of creating an object:
> ```cpp
> Foo obj();  // Function named obj that returns a Foo.
> ```

::::
::::version{std="C++11"}

A default constructor that does nothing can be requested explicitly with `= default`, even when other constructors are declared:
```cpp
class Foo {
public:
  Foo() = default;
  Foo(int v) : val(v) {}
  int val;
};

Foo a;     // val is uninitialised.
Foo b(1);  // val = 1
```

Braces can be used to call the default constructor without declaring a function:
```cpp
Foo obj{};
```

::::

## References

- [cppreference: default constructors](https://en.cppreference.com/cpp/language/default_constructor)

## Related

- [class](/collection/class)
- [member initialiser list](/collection/member-initialiser-list)
- [delegating constructor](/collection/delegating-constructor)
- [default argument](/collection/default-argument)
