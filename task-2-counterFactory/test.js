import { createCounter, createAdvancedCounter } from "./counter.js";

// Basic counters
const counter1 = createCounter(0);
const counter2 = createCounter(10);

counter1.increment();
console.log(counter1.getValue()); // 1
console.log(counter2.getValue()); // 10

// Transform
counter1.transform((x) => x * 2);
console.log(counter1.getValue()); // 2

// onChange listener
counter1.onChange((value, op) => {
  console.log(`Operation: ${op}, New Value: ${value}`);
});
counter1.increment(); // triggers onChange

// Immutable add
const newCounter = counter1.add(5);
console.log(newCounter.getValue()); // e.g., 8
console.log(counter1.getValue()); // original still 3

// Advanced counter
const advCounter = createAdvancedCounter({
  initialValue: 5,
  step: 2,
  min: 0,
  max: 10,
});

advCounter.increment();
console.log(advCounter.getValue()); // 7
advCounter.decrement();
console.log(advCounter.getValue()); // 5
advCounter.increment();
advCounter.increment();
advCounter.increment();
console.log(advCounter.getValue()); // should clamp at 10
