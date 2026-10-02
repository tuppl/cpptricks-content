---
title: New and Delete
description: Allocate and free memory at runtime.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [memory]
example: |
  int* ptr = new int(1);
  delete ptr;

  int* arr = new int[3]{1, 2, 3};
  delete[] arr;
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

Variables declared normally live on the stack and are destroyed automatically when they go out of scope. `new` allocates an object on the heap instead, which lives until it is explicitly freed with `delete`. `new` returns a pointer to the allocated object:
```cpp
int* ptr = new int;
delete ptr;
```

The allocated object can be given an initial value:
```cpp
int* ptr = new int(1);
std::cout << *ptr << "\n";  // 1
delete ptr;
```

Class objects are allocated the same way and their constructor is called with the given arguments. `delete` calls the destructor before freeing the memory:
```cpp
struct Point {
  Point(int x, int y) : x(x), y(y) {}
  int x;
  int y;
};

Point* p = new Point(1, 2);
std::cout << p->x << "\n";  // 1
delete p;
```

Arrays are allocated with `new[]` and must be freed with `delete[]`:
```cpp
int* arr = new int[3];
arr[0] = 1;
delete[] arr;
```

> [!CAUTION]
> Every `new` must be matched with exactly one `delete`, and every `new[]` with exactly one `delete[]`. Mixing them, deleting twice, or using the pointer after deleting it is undefined behaviour.

Forgetting to `delete` is a memory leak. The memory stays allocated until the program exits:
```cpp
void leak() {
  int* ptr = new int(1);
}  // ptr goes out of scope but the int is never freed.
```

::::
::::version{std="C++11"}

Array elements can be initialised with values:
```cpp
int* arr = new int[3]{1, 2, 3};
```

::::

## References

- [cppreference: new expression](https://en.cppreference.com/cpp/language/new)
- [cppreference: delete expression](https://en.cppreference.com/cpp/language/delete)

## Related

- [pointer](/collection/pointer)
