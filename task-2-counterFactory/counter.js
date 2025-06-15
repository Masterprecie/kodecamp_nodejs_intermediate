// Counter Prototype
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

// factory function that uses closures to maintain private state.
export function createCounter(initialValue = 0) {
  let count = initialValue;
  const originalValue = initialValue;
  let onChangeCallback = null;
  const history = [];

  //modified to include history tracking
  const recordHistory = (operation, oldValue, newValue) => {
    history.push({
      operation,
      oldValue,
      newValue,
      timestamp: new Date().toISOString(),
    });
  };

  const counter = Object.create(CounterPrototype);

  counter.increment = () => {
    const oldValue = count;
    count += 1;
    recordHistory("increment", oldValue, count);
    if (onChangeCallback) onChangeCallback(count, "increment");
    return count;
  };

  counter.decrement = () => {
    const oldValue = count;
    count -= 1;
    recordHistory("decrement", oldValue, count);
    if (onChangeCallback) onChangeCallback(count, "decrement");
    return count;
  };

  counter.getValue = () => count;

  counter.reset = () => {
    const oldValue = count;
    count = originalValue;
    recordHistory("reset", oldValue, count);
    return count;
  };

  //Higher-order transform
  counter.transform = (transformFn) => {
    const oldValue = count;
    count = transformFn(count);
    recordHistory("transform", oldValue, count);
    return count;
  };

  // Create Predicate method
  counter.createPredicate = () => (threshold) => count >= threshold;

  // onChange callback
  counter.onChange = (callback) => {
    onChangeCallback = callback;
    return counter;
  };

  // Immutable methods
  counter.add = (value) => createCounter(count + value);
  counter.subtract = (value) => createCounter(count - value);
  counter.multiply = (value) => createCounter(count * value);

  counter.snapshot = () => createCounter(count);

  // Batch operation method
  counter.batch = ({ increments = 0, decrements = 0 } = {}) => {
    const oldValue = count;
    count += increments;
    count -= decrements;
    recordHistory("batch", oldValue, count);
    return count;
  };

  // toString method
  counter.toString = () => `Counter current value is: ${count}`;

  // History tracking
  counter.getHistory = () => [...history];

  return counter;
}

//  Advanced Counter Factory
export function createAdvancedCounter({
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
