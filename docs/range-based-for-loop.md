---
title: Range-Based For Loops
description: Loop over containers without writing indices or iterators.
language: cpp11
difficulty: beginner
tags: [syntactic sugar]
example: |
  for (auto& element : container) {
    // Do something with element.
  }
authors:
  - name: Dan
    github: dennuguyen
---

Consider a container like so:
```cpp
std::vector<int> cont = {0, 1, 2, 3};
```

Range-based for loops allow you to loop over each element in a container without writing an index or iterator:
```cpp
for (auto element : cont) {
  std::cout << element << "\n";
}
```

The above is equivalent to this `for` loop:
```cpp
for (size_t i = 0; i < cont.size(); i++) {
  auto element = cont[i];
  std::cout << element << "\n";
}
```

And you can also get elements by reference if you want mutation:
```cpp
for (auto& element : cont) {
  element *= 2;
}
```

You can get elements as a const if you do not need mutation:
```cpp
for (auto const& element : cont) {
  std::cout << element << "\n";
}
```

## References

- [cpprefrence: range-based for loop](https://en.cppreference.com/cpp/language/range-for)