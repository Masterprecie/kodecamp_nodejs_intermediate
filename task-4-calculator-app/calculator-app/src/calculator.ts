import readline from "readline";

/**
 * Performs addition of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
function add(a: number, b: number): number {
  return a + b;
}

/**
 * Performs subtraction of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The result of a minus b
 */
function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Performs multiplication of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 */
function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Performs division of two numbers
 * @param a - Numerator
 * @param b - Denominator
 * @returns The result of a divided by b
 * @throws Error if b is zero
 */
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero!");
  return a / b;
}

/**
 * Calculates a to the power of b
 * @param a - Base number
 * @param b - Exponent
 * @returns a raised to the power b
 */
function power(a: number, b: number): number {
  return Math.pow(a, b);
}

/**
 * Calculates the square root of a number
 * @param a - Number to find the square root of
 * @returns The square root of a
 * @throws Error if a is negative
 */
function squareRoot(a: number): number {
  if (a < 0) throw new Error("Cannot find square root of negative number!");
  return Math.sqrt(a);
}

/**
 * Calculates what percentage b is of a
 * @param a - The total value
 * @param b - The part value
 * @returns Percentage value
 */
function percentage(a: number, b: number): number {
  return (a / b) * 100;
}

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Interface for calculation history
 */
interface CalculationHistory {
  operation: string;
  operand1: number;
  operand2?: number;
  result: number | string;
}

let history: CalculationHistory[] = [];
let memory: number | null = null;

/**
 * Displays the welcome message
 */
function showWelcome(): void {
  console.log(" Welcome to Dev_Presh Node.js Calculator!");
}

/**
 * Displays the menu of available operations
 */
function showMenu(): void {
  console.log("Select an operation:");
  console.log("1. Add");
  console.log("2. Subtract");
  console.log("3. Multiply");
  console.log("4. Divide");
  console.log("5. Power");
  console.log("6. Square Root");
  console.log("7. Percentage");
  console.log("8. View History");
  console.log("9. Store Last Result to Memory");
  console.log("10. Recall Memory");
  console.log("11. Clear Memory");
  console.log("12. Exit\n");
}

function getNumber(
  promptText: string,
  allowResult: boolean = false
): Promise<number> {
  return new Promise<number>((resolve) => {
    rl.question(promptText, (input: string) => {
      if (input.toLowerCase() === "m") {
        if (memory !== null) {
          console.log(`Using stored memory value: ${memory}`);
          resolve(memory);
        } else {
          console.log("No value in memory.\n");
          getNumber(promptText, allowResult).then(resolve);
        }
      } else if (allowResult && input.toLowerCase() === "r") {
        if (lastResult !== null) {
          console.log(`Using previous result: ${lastResult}`);
          resolve(lastResult);
        } else {
          console.log("No previous result available.\n");
          getNumber(promptText, allowResult).then(resolve);
        }
      } else {
        const number: number = parseFloat(input);
        if (isNaN(number)) {
          console.log("Invalid number. Try again.");
          getNumber(promptText, allowResult).then(resolve);
        } else {
          resolve(number);
        }
      }
    });
  });
}

/**
 * Returns the symbol for a given operation choice
 * @param choice - The operation choice as a string
 * @returns The symbol representing the operation
 */
function operationSymbol(choice: string): string {
  switch (choice) {
    case "1":
      return "+";
    case "2":
      return "-";
    case "3":
      return "×";
    case "4":
      return "÷";
    case "5":
      return "^";
    case "6":
      return "√";
    case "7":
      return "%";
    default:
      return "";
  }
}

/**
 * Stores the last calculation result
 */
let lastResult: number | null = null;

/**
 * Main application loop for the calculator
 */
async function main(): Promise<void> {
  showWelcome();

  while (true) {
    showMenu();

    await new Promise<void>((resolve) => {
      rl.question("Enter your choice (1-12): ", async (choice: string) => {
        if (!"123456789101112".includes(choice)) {
          console.log(" Invalid choice. Select between 1-12.\n");
          return resolve();
        }

        if (choice === "12") {
          console.log(
            "\n Thanks for using Dev_Presh Node.js Calculator. See you another time!"
          );
          rl.close();
          process.exit(0);
        }

        // View history
        if (choice === "8") {
          console.log("\n Calculation History:");
          if (history.length === 0) console.log(" No history yet.\n");
          else
            history.forEach((item, i) => {
              const opStr =
                item.operand2 !== undefined
                  ? `${item.operand1} ${item.operation} ${item.operand2} = ${item.result}`
                  : `${item.operation}${item.operand1} = ${item.result}`;
              console.log(` ${i + 1}. ${opStr}`);
            });
          console.log("");
          return resolve();
        }

        // Store last result
        if (choice === "9") {
          if (lastResult !== null) {
            memory = lastResult;
            console.log(`Stored ${memory} in memory.\n`);
          } else console.log(" No result to store.\n");
          return resolve();
        }

        // Recall memory
        if (choice === "10") {
          if (memory !== null) console.log(` Memory value: ${memory}\n`);
          else console.log(" Memory is empty.\n");
          return resolve();
        }

        // Clear memory
        if (choice === "11") {
          memory = null;
          console.log(" Memory cleared.\n");
          return resolve();
        }

        // Perform arithmetic operations
        let num1: number, num2: number;
        let result: number | string = 0;
        let historyEntry: CalculationHistory;

        try {
          if (choice === "6") {
            // Square Root needs one number
            num1 = await getNumber(
              "Enter a number (or M for memory, R for result): ",
              true
            );
            result = squareRoot(num1);
            console.log(`\n Result: ${result}\n`);
            historyEntry = {
              operation: operationSymbol(choice),
              operand1: num1,
              result,
            };
            history.push(historyEntry);
          } else {
            num1 = await getNumber(
              "Enter first number (or M for memory, R for result): ",
              true
            );
            num2 = await getNumber(
              "Enter second number (or M for memory, R for result): ",
              true
            );

            switch (choice) {
              case "1":
                result = add(num1, num2);
                break;
              case "2":
                result = subtract(num1, num2);
                break;
              case "3":
                result = multiply(num1, num2);
                break;
              case "4":
                result = divide(num1, num2);
                break;
              case "5":
                result = power(num1, num2);
                break;
              case "7":
                result = percentage(num1, num2) + " %";
                break;
              default:
                result = 0;
                break;
            }

            console.log(`\n Result: ${result}\n`);
            historyEntry = {
              operation: operationSymbol(choice),
              operand1: num1,
              operand2: num2,
              result,
            };
            history.push(historyEntry);
          }

          lastResult =
            typeof result === "string" && result.includes("Error")
              ? null
              : typeof result === "number"
              ? result
              : parseFloat(result);
        } catch (error) {
          if (error instanceof Error) {
            console.log(`\n Error: ${error.message}\n`);
            lastResult = null;
          } else {
            console.log("\n Unknown error occurred.\n");
            lastResult = null;
          }
        }
        resolve();
      });
    });
  }
}

main();
