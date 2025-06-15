# Counter Factory Project

## Task 1.1: Challenges in Implementation

1. Connecting prototype methods to private variables maintained via closures since prototypes exist outside the closure scope.
2. Ensuring private state remains isolated per counter instance while sharing common methods.
3. Implementing immutability without affecting the original counter instance.
4. Designing higher-order functions that elegantly interact with private state.
5. Maintaining clean, readable ES6 syntax throughout.
6. Respecting boundary constraints in advanced counters.
7. Ensuring chaining works cleanly with modified methods like `onChange`.

---

## Task 2.2: Why Create a Prototype First

Creating a prototype allows methods to be shared across multiple instances, reducing memory footprint and improving efficiency. If methods were placed directly on each instance, it would duplicate the method definitions unnecessarily, making the code less DRY and more memory-intensive.

---

## Task 3.2: Should Two Counters Share the Same Count?

No — each counter instance should have its own private `count` variable to ensure operations on one do not affect the other. This is crucial for data encapsulation and ensures independent state management per counter.

---

## Reflection Questions

1. **How do closures help maintain private state?**  
   Closures allow variables defined in an outer function scope to persist within inner functions, enabling each counter to keep its own `count` private and inaccessible from outside.

2. **Benefits of Prototypal Inheritance?**  
   It allows sharing of methods across instances, saving memory and promoting DRY code, while still maintaining isolated state through closures.

3. **When to use mutable vs immutable methods?**  
   Use mutable methods (`increment`, `decrement`) for direct, in-place state changes, and immutable methods (`add`, `subtract`, `multiply`) when you need to preserve original instances for safer functional programming practices.

4. **How do higher-order functions help?**  
   They improve flexibility by allowing functions to be passed in or returned dynamically, enabling behaviors like dynamic transformation and customized predicates.

5. **ES6 features that improved readability:**
   - Arrow functions: concise syntax
   - Object destructuring: cleaner function parameters
   - Template literals: clearer string concatenation
   - `const`/`let`: better scoping control
   - Object shorthand syntax
