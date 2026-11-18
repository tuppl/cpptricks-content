---
title: Algorithm
description: Standard library functions that operate on containers.
language: cpp
difficulty: beginner
tags: [stl]
example: |
  #include <algorithm>
  std::vector<int> v = {3, 1, 2};
  std::sort(v.begin(), v.end());  // {1, 2, 3}
authors:
  - name: Dan
    github: dennuguyen
---

::::version{std="C++98"}

The `algorithm` and `numeric` headers provide functions that operate on a range of elements. The range is given by a start and end iterator, where the end is not included:
```cpp
#include <algorithm>
#include <numeric>
```

Some examples use these functions:
```cpp
bool is_even(int x) {
  return x % 2 == 0;
}

void print(int x) {
  std::cout << x << "\n";
}
```

In some examples, a `?` means an element with an unspecified value.

::::

### Non-modifying

Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
std::vector<int> w = {1, 4};
```

::::version{std="C++98"}

These algorithms read a range without changing it:
```cpp
std::for_each(v.begin(), v.end(), print);    // Prints 3, 1, 4, 1, 4, 4.
std::count(v.begin(), v.end(), 1);           // 2
std::count_if(v.begin(), v.end(), is_even);  // 3
std::find(v.begin(), v.end(), 4);            // Points to v[2].
std::find_if(v.begin(), v.end(), is_even);   // Points to v[2].

// Finds the first element that is equal to any element of w.
std::find_first_of(v.begin(), v.end(), w.begin(), w.end());  // Points to v[1].

// Finds the first occurrence of the sequence 1, 4.
std::search(v.begin(), v.end(), w.begin(), w.end());  // Points to v[1].

// Finds the last occurrence of the sequence 1, 4.
std::find_end(v.begin(), v.end(), w.begin(), w.end());  // Points to v[3].

// Finds the first run of two 4's.
std::search_n(v.begin(), v.end(), 2, 4);  // Points to v[4].

// Finds the first two neighbours that are equal.
std::adjacent_find(v.begin(), v.end());  // Points to v[4].

// Finds the first position where v and w differ, as a pair of iterators.
std::mismatch(v.begin(), v.begin() + 2, w.begin());  // Pair of v[0] and w[0].

// Checks whether the first two elements of v are equal to the elements of w.
std::equal(v.begin(), v.begin() + 2, w.begin());  // false
```

::::
::::version{std="C++11"}

```cpp
std::all_of(v.begin(), v.end(), [](int x) { return x > 0; });  // true
std::any_of(v.begin(), v.end(), is_even);                      // true
std::none_of(v.begin(), v.end(), is_even);                     // false

// Finds the first element that doesn't match the predicate.
std::find_if_not(v.begin(), v.end(), is_even);  // Points to v[0].
```

::::
::::version{std="C++17"}

```cpp
std::for_each_n(v.begin(), 2, print);  // Prints 3, 1.
```

::::

### Modifying

Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
std::vector<int> w = {1, 4};
std::vector<int> out(6);
```

::::version{std="C++98"}

These algorithms change the elements of a range, or write them to another range:
```cpp
std::copy(v.begin(), v.end(), out.begin());  // Writes 3, 1, 4, 1, 4, 4.

// Copies so that the last element copied lands at the end of out.
std::copy_backward(v.begin(), v.begin() + 2, out.end());  // out is {0, 0, 0, 0, 3, 1}.

std::fill(v.begin(), v.end(), 0);  // v is {0, 0, 0, 0, 0, 0}.
std::fill_n(v.begin(), 2, 0);      // v is {0, 0, 4, 1, 4, 4}.

// Applies a function to each element and writes the results.
std::transform(v.begin(), v.end(), out.begin(), std::negate<int>());  // Writes -3, -1, -4, -1, -4, -4.

// Assigns each element the result of calling a function.
std::generate(v.begin(), v.end(), std::rand);  // Fills v with random numbers.
std::generate_n(v.begin(), 2, std::rand);      // Sets v[0] and v[1] to random numbers.

// Moves the elements that aren't 1 to the front.
// Returns an iterator to the new end, which is v[4].
std::remove(v.begin(), v.end(), 1);  // v is {3, 4, 4, 4, ?, ?}.

// Moves the elements that aren't even to the front.
// Returns an iterator to the new end, which is v[3].
std::remove_if(v.begin(), v.end(), is_even);  // v is {3, 1, 1, ?, ?, ?}.

// Copies the elements that aren't 1.
std::remove_copy(v.begin(), v.end(), out.begin(), 1);  // Writes 3, 4, 4, 4.

std::remove_copy_if(v.begin(), v.end(), out.begin(), is_even);      // Writes 3, 1, 1.
std::replace(v.begin(), v.end(), 1, 9);                             // v is {3, 9, 4, 9, 4, 4}.
std::replace_if(v.begin(), v.end(), is_even, 0);                    // v is {3, 1, 0, 1, 0, 0}.
std::replace_copy(v.begin(), v.end(), out.begin(), 1, 9);           // Writes 3, 9, 4, 9, 4, 4.
std::replace_copy_if(v.begin(), v.end(), out.begin(), is_even, 0);  // Writes 3, 1, 0, 1, 0, 0.

// Swaps the first two elements of v with the elements of w.
std::swap_ranges(v.begin(), v.begin() + 2, w.begin());  // v is {1, 4, 4, 1, 4, 4} and w is {3, 1}.

// Swaps the two elements the iterators point to.
std::iter_swap(v.begin(), v.begin() + 1);  // v is {1, 3, 4, 1, 4, 4}.

std::reverse(v.begin(), v.end());                    // v is {4, 4, 1, 4, 1, 3}.
std::reverse_copy(v.begin(), v.end(), out.begin());  // Writes 4, 4, 1, 4, 1, 3.

// Rotates the elements left so that v[2] becomes the first element.
std::rotate(v.begin(), v.begin() + 2, v.end());  // v is {4, 1, 4, 4, 3, 1}.

std::rotate_copy(v.begin(), v.begin() + 2, v.end(), out.begin());  // Writes 4, 1, 4, 4, 3, 1.

// Removes adjacent duplicates, so both 1's stay but the last two 4's become one.
// Returns an iterator to the new end, which is v[5].
std::unique(v.begin(), v.end());  // v is {3, 1, 4, 1, 4, ?}.

// Copies the elements without adjacent duplicates.
std::unique_copy(v.begin(), v.end(), out.begin());  // Writes 3, 1, 4, 1, 4.
```

::::
::::version{std="C++11"}

```cpp
std::copy_if(v.begin(), v.end(), out.begin(), is_even);  // Writes 4, 4, 4.
std::copy_n(v.begin(), 2, out.begin());                  // Writes 3, 1.

// Moves each element instead of copying it.
std::move(v.begin(), v.end(), out.begin());  // Writes 3, 1, 4, 1, 4, 4.

// Moves so that the last element moved lands at the end of out.
std::move_backward(v.begin(), v.begin() + 2, out.end());  // out is {0, 0, 0, 0, 3, 1}.

std::shuffle(v.begin(), v.end(), std::mt19937());  // Puts v in a random order.
```

::::
::::version{std="C++17"}

```cpp
// Picks random elements without repeats, keeping their original order.
std::sample(v.begin(), v.end(), out.begin(), 2, std::mt19937());  // Writes 2 random elements of v.
```

::::
::::version{std="C++20"}

```cpp
// Shifts the elements 2 places towards the front.
std::shift_left(v.begin(), v.end(), 2);  // v is {4, 1, 4, 4, ?, ?}.

// Shifts the elements 2 places towards the back.
std::shift_right(v.begin(), v.end(), 2);  // v is {?, ?, 3, 1, 4, 1}.
```

::::

### Partitioning

Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
```

::::version{std="C++98"}

These algorithms move the elements that match a predicate in front of the ones that don't:
```cpp
std::partition(v.begin(), v.end(), is_even);  // Even elements first, in any order.

// Same as partition, but keeps the original order within each group.
std::stable_partition(v.begin(), v.end(), is_even);  // v is {4, 4, 4, 3, 1, 1}.
```

::::
::::version{std="C++11"}

Let:
```cpp
std::vector<int> evens(6);
std::vector<int> odds(6);
```

```cpp
// Checks whether every even element comes before every odd element.
std::is_partitioned(v.begin(), v.end(), is_even);  // false

// Copies the even elements to one range and the odd elements to another.
std::partition_copy(v.begin(), v.end(), evens.begin(), odds.begin(), is_even);  // Writes 4, 4, 4 to evens and 3, 1, 1 to odds.

// On a partitioned range, finds the first element that doesn't match.
std::stable_partition(v.begin(), v.end(), is_even);  // v is {4, 4, 4, 3, 1, 1}.
std::partition_point(v.begin(), v.end(), is_even);   // Points to v[3].
```

::::

### Sorting

Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
std::vector<int> out(6);
```

::::version{std="C++98"}

```cpp
std::sort(v.begin(), v.end());                       // v is {1, 1, 3, 4, 4, 4}.
std::sort(v.begin(), v.end(), std::greater<int>());  // v is {4, 4, 4, 3, 1, 1}.

// Sorts, keeping equal elements in their original order.
std::stable_sort(v.begin(), v.end());  // v is {1, 1, 3, 4, 4, 4}.

// Sorts only the 2 smallest elements into the front.
std::partial_sort(v.begin(), v.begin() + 2, v.end());  // v is {1, 1, ?, ?, ?, ?}.

// Copies the 2 smallest elements, sorted.
std::partial_sort_copy(v.begin(), v.end(), out.begin(), out.begin() + 2);  // Writes 1, 1.

// Puts the element that belongs at v[2] after sorting there.
// Smaller elements go before it and larger elements after.
std::nth_element(v.begin(), v.begin() + 2, v.end());  // v[2] is 3.
```

::::
::::version{std="C++11"}

```cpp
std::is_sorted(v.begin(), v.end());  // false

// Finds the first element that breaks the sorted order.
std::is_sorted_until(v.begin(), v.end());  // Points to v[1].
```

::::

### Binary search

Let:
```cpp
std::vector<int> s = {1, 1, 3, 4, 4, 4};
```

::::version{std="C++98"}

These algorithms need a sorted range, and take O(log n) time on random access iterators:
```cpp
// Finds the first element that isn't less than 3.
std::lower_bound(s.begin(), s.end(), 3);  // Points to s[2].

// Finds the first element that is greater than 3.
std::upper_bound(s.begin(), s.end(), 3);  // Points to s[3].

std::binary_search(s.begin(), s.end(), 4);  // true

// Finds the range of elements equal to 1, as a pair of lower_bound and upper_bound.
std::equal_range(s.begin(), s.end(), 1);  // Pair of s[0] and s[2].
```

::::

### Merging and sets

Let:
```cpp
std::vector<int> a = {1, 2, 3, 4};
std::vector<int> b = {3, 4, 5};
std::vector<int> c = {2, 5, 1, 3};
std::vector<int> out(7);
```

::::version{std="C++98"}

These algorithms need sorted ranges:
```cpp
// Combines two sorted ranges into one sorted range.
std::merge(a.begin(), a.end(), b.begin(), b.end(), out.begin());  // Writes 1, 2, 3, 3, 4, 4, 5.

// Merges the two sorted halves of c, {2, 5} and {1, 3}, in place.
std::inplace_merge(c.begin(), c.begin() + 2, c.end());  // c is {1, 2, 3, 5}.

// Checks whether every element of b is in a.
std::includes(a.begin(), a.end(), b.begin(), b.end());  // false

// Writes the elements in a but not in b.
std::set_difference(a.begin(), a.end(), b.begin(), b.end(), out.begin());  // Writes 1, 2.

// Writes the elements in both a and b.
std::set_intersection(a.begin(), a.end(), b.begin(), b.end(), out.begin());  // Writes 3, 4.

// Writes the elements in only one of a and b.
std::set_symmetric_difference(a.begin(), a.end(), b.begin(), b.end(), out.begin());  // Writes 1, 2, 5.

// Writes the elements in either a or b.
std::set_union(a.begin(), a.end(), b.begin(), b.end(), out.begin());  // Writes 1, 2, 3, 4, 5.
```

::::

### Heap


Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
std::vector<int> h = {5, 3, 4, 1, 2};
```

::::version{std="C++98"}

These algorithms arrange a range as a max heap, where the largest element is always at the front:
```cpp
// Rearranges v into a max heap.
std::make_heap(v.begin(), v.end());  // v[0] is 4, which is the largest element.

// Moves the last element into its place in the heap.
// Call it after push_back().
h.push_back(9);
std::push_heap(h.begin(), h.end());  // h is {9, 3, 5, 1, 2, 4}.

// Moves the largest element to the back and keeps the rest a heap.
// Call pop_back() after it to remove the element.
std::pop_heap(h.begin(), h.end());  // h is {4, 3, 2, 1, 5}.

// Sorts a heap in ascending order.
std::sort_heap(h.begin(), h.end());  // h is {1, 2, 3, 4, 5}.
```

::::
::::version{std="C++11"}

```cpp
std::is_heap(v.begin(), v.end());  // false
std::is_heap(h.begin(), h.end());  // true

// Finds the first element that breaks the heap order.
// v[2] is 4, which is larger than its parent v[0].
std::is_heap_until(v.begin(), v.end());  // Points to v[2].
```

::::

### Minimum and maximum

Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
std::vector<int> w = {1, 4};
```

::::version{std="C++98"}

```cpp
std::min(3, 5);                        // 3
std::max(3, 5);                        // 5
std::min_element(v.begin(), v.end());  // Points to v[1].

// Finds the first largest element.
std::max_element(v.begin(), v.end());  // Points to v[2].

// Checks whether v comes before w in dictionary order.
// It doesn't, since 3 > 1.
std::lexicographical_compare(v.begin(), v.end(), w.begin(), w.end());  // false
```

::::
::::version{std="C++11"}

```cpp
std::min({3, 1, 4});  // 1
std::minmax(3, 5);    // Pair of 3 and 5.

// Finds the first smallest and the last largest element.
std::minmax_element(v.begin(), v.end());  // Pair of v[1] and v[5].
```

::::
::::version{std="C++17"}

```cpp
// Limits 7 to the range 0 to 5.
std::clamp(7, 0, 5);  // 5
```

::::
::::version{std="C++20"}

```cpp
// Compares v and w in dictionary order, like <=>.
std::lexicographical_compare_three_way(v.begin(), v.end(), w.begin(), w.end());  // std::strong_ordering::greater
```

::::

### Permutations

Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
```

::::version{std="C++98"}

```cpp
// Rearranges v into the next permutation in sorted order.
// Returns false if v was already the last one.
std::next_permutation(v.begin(), v.end());  // v is {3, 1, 4, 4, 1, 4}.

// Rearranges v into the previous permutation in sorted order.
// Returns false if v was already the first one.
std::prev_permutation(v.begin(), v.end());  // v is {3, 1, 1, 4, 4, 4}.
```

::::
::::version{std="C++11"}

Let:
```cpp
std::vector<int> s = {1, 1, 3, 4, 4, 4};
```

```cpp
// Checks whether v and s hold the same elements, in any order.
std::is_permutation(v.begin(), v.end(), s.begin());  // true
```

::::

### Numeric

Let:
```cpp
std::vector<int> v = {3, 1, 4, 1, 4, 4};
std::vector<int> out(6);
```

::::version{std="C++98"}

These algorithms are available from the `numeric` header:
```cpp
// Adds up the elements, starting from 0.
std::accumulate(v.begin(), v.end(), 0);  // 17

// Multiplies the two ranges element by element, then adds up the products.
std::inner_product(v.begin(), v.end(), v.begin(), 0);  // 59

// Writes the running total.
std::partial_sum(v.begin(), v.end(), out.begin());  // Writes 3, 4, 8, 9, 13, 17.

// Writes the difference between each element and the one before it.
std::adjacent_difference(v.begin(), v.end(), out.begin());  // Writes 3, -2, 3, -3, 3, 0.
```

::::
::::version{std="C++11"}

```cpp
// Fills v with increasing values, starting from 1.
std::iota(v.begin(), v.end(), 1);  // v is {1, 2, 3, 4, 5, 6}.
```

::::
::::version{std="C++17"}

Let:
```cpp
auto square = [](int x) { return x * x; };
```

```cpp
// Like accumulate, but may add in any order, so it can run in parallel.
std::reduce(v.begin(), v.end());  // 17

// Like inner_product, but may add in any order.
std::transform_reduce(v.begin(), v.end(), v.begin(), 0);  // 59

// Like partial_sum, but may add in any order.
std::inclusive_scan(v.begin(), v.end(), out.begin());  // Writes 3, 4, 8, 9, 13, 17.

// Writes the running total before each element, starting from 0.
std::exclusive_scan(v.begin(), v.end(), out.begin(), 0);  // Writes 0, 3, 4, 8, 9, 13.

// Squares each element, then writes the running total.
std::transform_inclusive_scan(v.begin(), v.end(), out.begin(), std::plus<>(), square);  // Writes 9, 10, 26, 27, 43, 59.

// Squares each element, then writes the running total before each element.
std::transform_exclusive_scan(v.begin(), v.end(), out.begin(), 0, std::plus<>(), square);  // Writes 0, 9, 10, 26, 27, 43.

// Greatest common divisor.
std::gcd(12, 18);  // 6

// Lowest common multiple.
std::lcm(4, 6);  // 12
```

::::
::::version{std="C++20"}

```cpp
// Halfway between two numbers, without overflowing.
std::midpoint(2, 8);  // 5
```

::::

## References

- [cppreference: algorithms library](https://en.cppreference.com/cpp/algorithm)
- [cppreference: numeric algorithms](https://en.cppreference.com/cpp/numeric#Numeric_algorithms)

## Related

- [iterator](/collection/iterator)
- [container](/collection/container)
- [remove-erase idiom](/collection/remove-erase-idiom)
- [range](/collection/range)
- [lambda](/collection/lambda)
