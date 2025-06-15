// Step 2: Create CounterPrototype
const CounterPrototype = {
  increment() {
    throw new Error("Not implemented");
  },
  decrement() {
    throw new Error("Not implemented");
  },
  getValue() {
    throw new Error("Not implemented");
  },
  reset() {
    throw new Error("Not implemented");
  },
};

// Step 3 & 4: Factory function with private count using closure
function createCounter(initialValue = 0) {
  let count = initialValue;
  const originalValue = initialValue;
  let onChangeCallback = null;

  const counter = Object.create(CounterPrototype);

  counter.increment = () => {
    count += 1;
    if (onChangeCallback) onChangeCallback(count, "increment");
    return count;
  };

  counter.decrement = () => {
    count -= 1;
    if (onChangeCallback) onChangeCallback(count, "decrement");
    return count;
  };

  counter.getValue = () => count;

  counter.reset = () => {
    count = originalValue;
    return count;
  };

  // Step 5.1: Higher-order transform
  counter.transform = (transformFn) => {
    count = transformFn(count);
    return count;
  };

  // Step 5.2: createPredicate
  counter.createPredicate = () => (threshold) => count >= threshold;

  // Step 5.3: onChange callback
  counter.onChange = (callback) => {
    onChangeCallback = callback;
    return counter;
  };

  // Step 6: Immutable methods
  counter.add = (value) => createCounter(count + value);
  counter.subtract = (value) => createCounter(count - value);
  counter.multiply = (value) => createCounter(count * value);

  counter.snapshot = () => createCounter(count);

  // Step 7: Batch operation
  counter.batch = ({ increments = 0, decrements = 0 } = {}) => {
    count += increments;
    count -= decrements;
    return count;
  };

  // Step 7.3: toString method
  counter.toString = () => `Counter current value is: ${count}`;

  return counter;
}

// Step 8: createAdvancedCounter
function createAdvancedCounter({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
} = {}) {
  let count = initialValue;
  const config = { initialValue, step, min, max };

  const counter = Object.create(CounterPrototype);

  const clamp = (value) => Math.min(Math.max(value, min), max);

  counter.increment = () => {
    count = clamp(count + step);
    return count;
  };

  counter.decrement = () => {
    count = clamp(count - step);
    return count;
  };

  counter.getValue = () => count;

  counter.reset = () => {
    count = initialValue;
    return count;
  };

  counter.getConfig = () => ({ ...config });

  return counter;
}

module.exports = { createCounter, createAdvancedCounter };
