---
title: Array
description: Fixed-size array of the same type.
language: cpp
difficulty: beginner
tags: [stl]
example: |
  #include <array>
  std::array<int, 3> arr = {1, 2, 3};
  arr.size();  // 3
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++11"}

`std::array` is a fixed-size array. It encapsulates a C-style array and stores its elements contiguously inside the object. The element type and size are given as template arguments and the size cannot change after declaration. It is available from the `array` header:
```cpp
#include <array>

std::array<int, 3> arr = {1, 2, 3};
```

Elements are accessed with `[]`, and `size()` returns the number of elements:
```cpp
arr[0];       // 1
arr[0] = 10;
arr.size();   // 3
```

`at()` does the same as `[]` but throws an exception if the index is out of range instead of reading invalid memory:
```cpp
arr.at(1);  // 2
arr.at(5);  // Throws std::out_of_range.
```

`std::array` works with range-based for loops:
```cpp
for (int x : arr) {
  std::cout << x << "\n";
}
```

> [!NOTE]
> Prefer `std::array` over a C-style array of the same size. A C-style array does turns into a pointer when passed to a function, whereas `std::array` keeps its size and is copied like any other object.

::::

## References

- [cppreference: std::array](https://en.cppreference.com/cpp/container/array)

## Related

- [vector](/collection/vector)
- [range-based for loop](/collection/range-based-for-loop)
