import { createCounter, createAdvancedCounter } from "./counter.js";

// Basic counters
const counter1 = createCounter(0);
const counter2 = createCounter(10);

counter1.increment();
console.log(counter1.getValue());
console.log(counter2.getValue());

// Transform counter
counter1.transform((x) => x * 2);
console.log(counter1.getValue());

const counter = createCounter(5); //intial value of 5
counter.increment();
counter.decrement();
counter.transform((x) => x * 2);

// View history
console.log("History:", counter.getHistory());

// onChange listener
counter1.onChange((value, op) => {
  console.log(`Operation: ${op}, New Value: ${value}`);
});
counter1.increment();

// Immutable add
const newCounter = counter1.add(5);
console.log(newCounter.getValue());
console.log(counter1.getValue());

// Advanced counter
const advCounter = createAdvancedCounter({
  initialValue: 5,
  step: 2,
  min: 0,
  max: 10,
});

advCounter.increment();
console.log(advCounter.getValue());
advCounter.decrement();
console.log(advCounter.getValue());
advCounter.increment();
advCounter.increment();
advCounter.increment();
console.log(advCounter.getValue());
