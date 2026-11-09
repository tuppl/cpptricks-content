---
title: Vector
description: Dynamic array of the same type.
language: cpp
versions: [C++98, C++11]
difficulty: beginner
tags: [stl]
example: |
  #include <vector>
  std::vector<int> v;
  v.push_back(1);
  v.push_back(2);
  v.size();  // 2
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`std::vector` is a dynamic array. It holds a pointer to an array on the heap and stores its elements contiguously there. Elements can be added and removed at runtime and the vector manages its own memory. It is available from the `vector` header:
```cpp
#include <vector>

std::vector<int> v;
```

Elements are appended with `push_back()` and the count is given by `size()`:
```cpp
v.push_back(1);
v.push_back(2);
v.push_back(3);
v.size();  // 3
```

Elements are accessed with `[]`, or `at()` which throws an exception when the index is out of range:
```cpp
v[0];       // 1
v[0] = 10;
v.at(5);    // Throws std::out_of_range.
```

Elements can be removed from the end or all at once:
```cpp
v.pop_back();  // Removes the last element.
v.clear();     // Removes everything.
v.empty();     // true
```

Internally, a vector tracks its size and capacity. The size is the number of elements in use and the capacity is how many elements fit before the array is full:
```cpp
std::vector<int> v;
v.push_back(1);
v.size();      // 1
v.capacity();  // At least 1.
```

When the array is full, `push_back()` allocates a larger array, copies the elements across and freeing the old one. The capacity will grow by a factor of 1.5 or 2, depending on standard library implementation. Pointers and references to elements are invalidated when this happens:
```cpp
int* p = &v[0];
v.push_back(2);  // May reallocate.
*p;              // Undefined behaviour if the vector reallocated.
```

::::
::::version{std="C++11"}

When the array is full, `push_back()` will move the elements instead of copying if the element's move constructor is `noexcept`.

::::
::::version{std="C++98"}

`reserve()` allocates capacity up front, which avoids repeated reallocation when the final size is known:
```cpp
v.reserve(100);
v.capacity();  // At least 100.
```

A vector can be created with a given size, and every element is value-initialised:
```cpp
std::vector<int> zeros(5);  // {0, 0, 0, 0, 0}
```

Prefer `std::vector` over a C-style array allocated with `new[]`. The vector frees its memory automatically and cannot be used with the wrong `delete`.

::::
::::version{std="C++11"}

A vector can be initialised with a list of values:
```cpp
std::vector<int> v = {1, 2, 3};
```

Vectors work with range-based for loops:
```cpp
for (int x : v) {
  std::cout << x << "\n";
}
```

::::

## References

- [cppreference: std::vector](https://en.cppreference.com/cpp/container/vector)

## Related

- [array](/collection/array)
- [range-based for loop](/collection/range-based-for-loop)
- [iterator-based for loop](/collection/iterator-based-for-loop)
- [new and delete](/collection/new-delete)
