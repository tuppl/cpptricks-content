---
title: Structured Binding
description: Unpack pairs, tuples, and aggregates cleanly.
language: cpp17
difficulty: beginner
tags: [syntactic sugar]
example: |
  auto [x, y] = std::pair{1, 2};
authors:
  - name: Dan
    github: dennuguyen
---

Unpacks compound values into named variables with an initialiser.

Pairs and tuples:
```cpp
auto [x, y] = std::pair<int, int>{1, 2};
auto [name, job, age] = std::tuple<std::string, std::string, int>{"alice", "nurse", 30};
```

Getting key and value from a map:
```cpp
for (auto& [key, val] : my_map) {
  std::cout << key << ": " << val << '\n';
}
```

> [!WARNING]
> C++ bindings are **copies** by default. Use `auto&` to avoid copying every element. Use `const auto&` when mutation isn't needed.

## References

- [cpprefrence: structured binding](https://en.cppreference.com/cpp/language/structured_binding)