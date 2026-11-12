---
title: Friend
description: Give a function or class access to private members.
language: cpp
difficulty: beginner
tags: [classes]
example: |
  class Account {
    double balance;
    friend void audit(const Account& a);
  };
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

A friend is a function or class that can access the `private` and `protected` members of the class that declares it:
```cpp
class Account {
public:
  Account(double b) : balance(b) {}
private:
  double balance;
  friend void audit(const Account& a);
};

void audit(const Account& a) {
  std::cout << a.balance << "\n";  // OK, audit is a friend.
}
```

A friend function isn't a member of the class, so it's called like a normal function and has no `this` pointer to the object. The `friend` declaration can go in any section of the class, since access specifiers don't apply to it.

Friends are often used for operators that need private fields but can't be methods, such as `<<` where the stream is on the left. A friend function can be defined inside the class:
```cpp
class Vector2 {
public:
  Vector2(double px, double py) : x(px), y(py) {}
  friend std::ostream& operator<<(std::ostream& os, const Vector2& v) {
    return os << "(" << v.x << ", " << v.y << ")";
  }
private:
  double x;
  double y;
};

std::cout << Vector2(1, 2) << "\n";  // (1, 2)
```

A friend class can access the `private` and `protected` members of the class from any of its methods:
```cpp
class Engine {
private:
  int rpm;
  friend class Car;
};

class Car {
public:
  void rev(Engine& e) {
    e.rpm = 3000;  // OK, Car is a friend of Engine.
  }
};
```

Friendship is limited:
- It isn't mutual: `Car` can access `Engine`'s private members, but not the other way around.
- It isn't inherited: a class derived from `Car` is not a friend of `Engine`.
- It isn't transitive: a friend of `Car` is not a friend of `Engine`.

> [!NOTE]
> Friends weaken encapsulation, so use them sparingly. Prefer adding a public method when one makes sense.

::::

## References

- [cppreference: friend declaration](https://en.cppreference.com/cpp/language/friend)

## Related

- [access specifier](/collection/access-specifier)
- [operator overload](/collection/operator-overload)
- [class](/collection/class)
