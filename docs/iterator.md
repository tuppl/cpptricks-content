---
title: Iterator
description: Object that points to an element in a container.
language: cpp
difficulty: beginner
tags: [stl, iterator]
example: |
  std::vector<int> v = {1, 2, 3};
  auto it = v.begin();
  *it;  // 1
  ++it;
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

An iterator is an object that points to an element in a container. As the name suggests, iterators are used to iterate through a container. Iterators can be used like pointers: `*` accesses the element and `++` moves to the next element:
```cpp
std::vector<int> v;
v.push_back(10);
v.push_back(20);
v.push_back(30);

std::vector<int>::iterator it = v.begin();
*it;  // 10
++it;
*it;  // 20
```

`begin()` returns the iterator to the first element and `end()` returns the iterator one past the last element, so the range is `[begin, end)`:
```cpp
v.end() - v.begin();  // 3
*v.end();             // Undefined behaviour because end() doesn't point to any element.
```

Iterators can be compared with other iterators from the same container. Comparing `begin()` with `end()` checks if a container is empty:
```cpp
std::vector<int> u;
u.begin() == u.end();  // true
```

Iterators can be used in a loop with `end()` to know when all elements have been iterated over:
```cpp
for (std::vector<int>::iterator it = v.begin(); it != v.end(); ++it) {
  *it;
}
```

### Const Iterator

A `const_iterator` can read but not modify the element it points to. The iterator itself can still move:
```cpp
std::vector<int>::const_iterator cit = v.begin();
*cit;      // 10
*cit = 5;  // ERROR.
++cit;     // OK.
```

Calling `begin()` and `end()` on a const container returns a `const_iterator`:
```cpp
const std::vector<int>& cv = v;
std::vector<int>::const_iterator a = cv.begin();  // OK.
std::vector<int>::iterator b = cv.begin();        // ERROR.
```

### Iterator Categories

Iterators are grouped into categories by supported operations:

| Category | `*it` | `*it = x` | `++` | Multi-pass | `--` | `+`, `-`, `[]`, `<` | Containers |
|---|:-:|:-:|:-:|:-:|:-:|:-:|---|
| Input | ✓ | | ✓ | | | | `std::istream_iterator` |
| Forward | ✓ | ✓ | ✓ | ✓ | | | |
| Bidirectional | ✓ | ✓ | ✓ | ✓ | ✓ | | `std::list`, `std::set`, `std::map` |
| Random access | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | `std::vector`, `std::deque`, `std::string` |
| Output | | ✓ | ✓ | | | | `std::ostream_iterator`, `std::back_inserter` |

> [!NOTE]
> `std::set` and `std::map` use bidirectional iterators, but set elements and map keys do not support writing.

Using an operation that the iterator's category doesn't support is a compile error:
```cpp
std::set<int> s;
std::set<int>::iterator st = s.begin();
st += 2;  // ERROR.
++st;     // OK.
```

Multi-pass means multiple iterators can pass over the same range. Stream iterators aren't multi-pass because moving the iterator consumes the input:
```cpp
std::istringstream ss("1 2 3");
std::istream_iterator<int> it1(ss);
std::istream_iterator<int> it2 = it1;
++it1;
++it2;
*it1;  // 2
*it2;  // 3
```

### Invalidation

Iterators become invalidated when the element they point to is moved or removed. Using an invalidated iterator is undefined behaviour:
```cpp
std::vector<int>::iterator it = v.begin();
v.push_back(40);  // May reallocate.
*it;              // Undefined behaviour if the vector reallocated.
```

::::
::::version{std="C++11"}

`cbegin()` and `cend()` always return a `const_iterator`, even on a non-const container:
```cpp
std::vector<int>::const_iterator cit = v.cbegin();
*cit = 5;  // ERROR.
```

`std::next()` and `std::prev()` return a new iterator moved forward or backward by a number of steps. They work with any category that can move in that direction:
```cpp
std::set<int> s = {1, 2, 3, 4};
std::set<int>::iterator it = std::next(s.begin(), 2);
*it;             // 3
*std::prev(it);  // 2
```

`std::begin()` and `std::end()` return iterators for containers and C-style arrays:
```cpp
int arr[] = {1, 2, 3};
int* first = std::begin(arr);  // Points to 1.
int* last = std::end(arr);     // Points one past 3.
```

::::

## References

- [cppreference: iterator library](https://en.cppreference.com/cpp/iterator)
- [cppreference: std::next](https://en.cppreference.com/cpp/iterator/next)
- [cppreference: std::prev](https://en.cppreference.com/cpp/iterator/prev)

## Related

- [iterator-based for loop](/collection/iterator-based-for-loop)
- [container](/collection/container)
- [algorithm](/collection/algorithm)
- [vector](/collection/vector)
- [set](/collection/set)
- [map](/collection/map)
