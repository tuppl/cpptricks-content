---
title: Structured Binding
description: Unpack pairs, tuples, and aggregates cleanly.
tags: [modern, stl, c++17]
example: |
  auto [x, y] = std::pair{1, 2};
authors:
  - name: Dan
    github: dennuguyen
---

Unpacks compound values into named variables with an initialiser.

Pairs and tuples:
```cpp
auto [x, y] = std::pair{1, 2};
auto [name, age] = std::tuple{"alice", 30};
```

Getting key and value from a map:
```cpp
for (auto& [key, val] : my_map) {
    std::cout << key << ": " << val << '\n';
}
```

> [!WARNING]
> C++ bindings are **copies** by default. Use `auto&` in loops to avoid copying every element. Use `const auto&` when mutation isn't needed.

## References

- [cpprefrence: structured binding](https://en.cppreference.com/cpp/language/structured_binding)