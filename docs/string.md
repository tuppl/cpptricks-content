---
title: String
description: Sequence of characters.
language: cpp
difficulty: beginner
tags: [stl]
example: |
  #include <string>
  std::string s = "hello";
  s += " world";
  s.size();  // 11
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

`std::string` is a container that holds text. It grows and shrinks as needed and frees its memory automatically. The characters are stored contiguously on the heap, though most implementations keep short strings inside the object itself to avoid an allocation. It is available from the `string` header:
```cpp
#include <string>

std::string s = "hello";
```

Strings can be concatenated with `+` and `+=`:
```cpp
std::string a = "hello";
std::string b = a + " world";
b += "!";
std::cout << b << "\n";  // hello world!
```

`size()` returns the number of characters and `empty()` checks whether the string has no characters:
```cpp
std::string s = "hello";
s.size();   // 5
s.empty();  // false
```

Characters are accessed with `[]`, or `at()` which throws `std::out_of_range` when the index is out of range:
```cpp
std::string s = "hello";
s[0];         // 'h'
s.at(0);      // 'h'
s.at(10);     // Throws std::out_of_range.
s[0] = 'j';   // s is now "jello".
```

Strings compare by content with the usual operators:
```cpp
std::string a = "apple";
std::string b = "banana";
a == b;  // false
a < b;   // true, lexicographical.
```

Common operations include finding and extracting substrings:
```cpp
std::string s = "hello world";
s.find("world");  // 6
s.find("xyz");    // std::string::npos
s.substr(0, 5);   // "hello"
```

`c_str()` returns the contents as a null-terminated C-string, for passing to functions that expect a `const char*`:
```cpp
std::string s = "hello";
std::printf("%s\n", s.c_str());
```

> [!NOTE]
> Prefer `std::string` over C-style `char` arrays. A C-string is a raw array with a null terminator and no size, so concatenation, comparison and resizing all need manual function calls and are easy to get wrong.

::::
::::version{std="C++11"}

Numbers can be converted to and from strings:
```cpp
std::string s = std::to_string(42);  // "42"
int n = std::stoi("123");            // 123
double d = std::stod("3.14");        // 3.14
```

`std::stoi` and `std::stod` throw an exception if the string does not start with a number:
```cpp
std::stoi("abc");  // Throws std::invalid_argument.
std::stoi("12ab"); // 12, trailing characters are ignored.
```

::::

## References

- [cppreference: std::string](https://en.cppreference.com/cpp/string/basic_string)

## Related

- [character output](/collection/cout)
- [vector](/collection/vector)
