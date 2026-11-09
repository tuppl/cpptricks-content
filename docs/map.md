---
title: Map
description: Sorted collection of key-value pairs with unique keys.
language: cpp
versions: [C++98, C++11, C++17, C++20]
difficulty: beginner
tags: [stl]
example: |
  #include <map>
  std::map<std::string, int> ages;
  ages["Alice"] = 30;
  ages["Alice"];  // 30
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`std::map` stores key-value pairs sorted by key, where each key is unique. The elements are stored in a balanced binary search tree (usually a red-black tree), so inserting, finding and removing a key have O(log n) time complexity. The key and value types are given as template arguments. It is available from the `map` header:
```cpp
#include <map>

std::map<std::string, int> ages;
```

`[]` accesses the value for a key. If the key doesn't exist, it is inserted with a value-initialised value:
```cpp
ages["Alice"] = 30;
ages["Bob"] = 25;
ages["Carol"];  // Inserts "Carol" with 0.
ages.size();    // 3
```

`find()` returns an iterator to a pair of key and value, or `end()` if the key doesn't exist:
```cpp
std::map<std::string, int>::iterator it = ages.find("Alice");
if (it != ages.end()) {
  it->first;   // "Alice"
  it->second;  // 30
}
```

`count()` returns 1 if the key exists and 0 otherwise:
```cpp
ages.count("Alice");  // 1
ages.count("Dave");   // 0
```

::::
::::version{std="C++20"}

`contains()` is a clearer way to check whether a key exists:
```cpp
ages.contains("Alice");  // true
ages.contains("Dave");   // false
```

::::
::::version{std="C++98"}

`insert()` adds a pair but does not overwrite an existing key:
```cpp
ages.insert(std::make_pair("Dave", 40));
ages.insert(std::make_pair("Alice", 99));  // Ignored.
ages["Alice"];                             // 30
```

Keys are removed with `erase()`:
```cpp
ages.erase("Bob");
ages.count("Bob");  // 0
```

::::
::::version{std="C++11"}

A map can be initialised with a list of key-value pairs:
```cpp
std::map<std::string, int> ages = {{"Alice", 30}, {"Bob", 25}};
```

`at()` accesses the value for a key but throws an exception instead of inserting when the key doesn't exist:
```cpp
ages.at("Alice");  // 30
ages.at("Dave");   // Throws std::out_of_range.
```

Maps work with range-based for loops and are always iterated in key order:
```cpp
for (const auto& p : ages) {
  std::cout << p.first << ": " << p.second << "\n";
}
```

::::
::::version{std="C++17"}

Structured bindings unpack each pair into named variables:
```cpp
for (const auto& [name, age] : ages) {
  std::cout << name << ": " << age << "\n";
}
```

::::

## References

- [cppreference: std::map](https://en.cppreference.com/cpp/container/map)

## Related

- [set](/collection/set)
- [pair](/collection/pair)
- [structured binding](/collection/structured-binding)
- [range-based for loop](/collection/range-based-for-loop)
