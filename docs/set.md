---
title: Set
description: Sorted collection of unique elements.
language: cpp
difficulty: beginner
tags: [stl]
example: |
  #include <set>
  std::set<int> s = {3, 1, 2, 1};  // {1, 2, 3}
  s.count(2);  // 1
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`std::set` is a sorted collection of unique elements. The elements are kept in a balanced binary search tree (usually a red-black tree), so inserting, finding and removing an element takes O(log n) time. It is available from the `set` header:
```cpp
#include <set>

std::set<int> s;
```

Elements are added with `insert()`. Duplicates are ignored:
```cpp
s.insert(3);
s.insert(1);
s.insert(3);  // Ignored.
s.size();     // 2
```

`count()` returns 1 if the element exists and 0 otherwise:
```cpp
s.count(1);  // 1
s.count(2);  // 0
```

`find()` returns an iterator to the element, or `end()` if it doesn't exist:
```cpp
s.find(2) == s.end();  // true
```

::::
::::version{std="C++20"}

`contains()` is a clearer way to check whether an element exists:
```cpp
s.contains(3);  // true
s.contains(5);  // false
```

::::
::::version{std="C++98"}

Elements are removed by value with `erase()`:
```cpp
s.erase(1);
s.count(1);  // 0
```

Elements can't be modified through an iterator, since changing the element can break the sorted order. Erase the old value and insert the new one instead:
```cpp
*s.find(3) = 5;  // ERROR.
s.erase(3);
s.insert(5);
```

::::
::::version{std="C++11"}

A set can be initialised with a list of values. Duplicates are removed and the elements are sorted:
```cpp
std::set<int> s = {3, 1, 2, 1};  // {1, 2, 3}
```

Sets work with range-based for loops and are always iterated in sorted order:
```cpp
for (const auto& x : s) {
  std::cout << x << "\n";  // 1, 2, 3
}
```

::::

## References

- [cppreference: std::set](https://en.cppreference.com/cpp/container/set)

## Related

- [map](/collection/map)
- [vector](/collection/vector)
- [range-based for loop](/collection/range-based-for-loop)
