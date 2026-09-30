---
title: Function Overloading
description: Define multiple functions with the same name but different parameters.
language: cpp
versions: [C++98]
difficulty: beginner
tags: [functions]
example: |
  void print(int i);
  void print(double d);
  void print(std::string s);
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Multiple functions can share a name as long as their parameter lists differ. The compiler picks the overload whose parameters best match the arguments:
```cpp
void print(int i) { std::cout << "int " << i << "\n"; }
void print(double d) { std::cout << "double " << d << "\n"; }
void print(std::string s) { std::cout << "string " << s << "\n"; }

print(1);                   // int 1
print(1.5);                 // double 1.5
print(std::string("hi"));   // string hi
```

Overloads can differ by the number of parameters or their types:
```cpp
int add(int a, int b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }
double add(double a, double b) { return a + b; }
```

Overloads may have different return types, but the return type alone is not enough to distinguish them:
```cpp
int add(int a, int b);
double add(int a, int b);  // ERROR: differs only by return type.
```

> [!WARNING]
> If no overload is an exact match the compiler applies implicit conversions. If more than one overload matches equally well the call is ambiguous:
> ```cpp
> void f(int i);
> void f(double d);
> f('a');  // OK: char promotes to int.
> f(1L);   // ERROR: ambiguous, long converts to int and double equally.
> ```

Overloads should do the same thing for different types. A reader expects `print(int)` and `print(double)` to both print.

::::

## References

- [cppreference: overload resolution](https://en.cppreference.com/cpp/language/overload_resolution)

## Related

- [default argument](/collection/default-argument)
