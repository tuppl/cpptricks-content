---
title: Iterator-Based For Loop
description: Loop over containers with STL iterators.
language: cpp
versions: [C++11]
difficulty: beginner
tags: [iterator, loop]
example: |
  for (auto it = c.begin(); it != c.end(); ++it) {
    *it;
  }
authors:
  - name: Dan
    github: dennuguyen
---

> [!NOTE]
> Iterator-based for loops were present since C++98 but `auto` and initialiser lists are C++11 features.

:::version{std="C++11"}

Iterator-based for loops allow you to loop over each element in a container using iterators:
```cpp
std::vector<int> cont = {0, 1, 2, 3, 4};
for (auto it = cont.begin(); it != cont.end(); ++it) {
  *it *= 2;
  std::cout << *it << "\n";
}
```
```
0
2
4
6
8
```

> [!NOTE]
> `it` has type `std::vector<int>::iterator` which is cumbersome to write so it is usually written with `auto`.

The above is equivalent to this `for` loop:
```cpp
for (size_t i = 0; i < cont.size(); i++) {
  auto& element = cont[i];
  element *= 2;
  std::cout << element << "\n";
}
```

The iteration range and increment size can be changed:
```cpp
std::vector<int> cont = {0, 1, 2, 3, 4};
for (auto it = cont.begin() + 1; it < cont.end() - 1; it += 2) {
  std::cout << *it << "\n";
}
```
```
1
3
```

Const iterators can be used to prevent modifications during looping:
```cpp
for (auto it = cont.cbegin(); it != cont.cend(); ++it) {
  std::cout << *it << "\n";
  // *it = 123;  // ERROR.
}
```

Iterators can traverse the container in reverse order:
```cpp
std::vector<int> cont = {0, 1, 2};
for (auto it = cont.rbegin(); it != cont.rend(); ++it) {
  std::cout << *it << "\n";
}
```
```
2
1
0
```

Const iterators can traverse the container in reverse order:
```cpp
for (auto it = cont.crbegin(); it != cont.crend(); ++it) {
  std::cout << *it << "\n";
}
```
:::

## References

- [cpprefrence: iterator](https://cppreference.com/cpp/iterator)
- [cpprefrence: begin](https://cppreference.com/cpp/iterator/begin)
- [cpprefrence: end](https://cppreference.com/cpp/iterator/end)
- [cppreference: rbegin](https://cppreference.com/cpp/iterator/rbegin)
- [cppreference: rend](https://cppreference.com/cpp/iterator/rend)