import readline from "readline";

// Basic arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error: Division by zero!";
  return a / b;
}

function power(a, b) {
  return Math.pow(a, b);
}

function squareRoot(a) {
  if (a < 0) return "Error: Cannot find square root of negative number!";
  return Math.sqrt(a);
}

function percentage(a, b) {
  return (a / b) * 100;
}

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let history = [];
let memory = null;

function showWelcome() {
  console.log(" Welcome to Dev_Presh Node.js Calculator!");
}

function showMenu() {
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

function getNumber(promptText, allowResult = false) {
  return new Promise((resolve) => {
    rl.question(promptText, (input) => {
      if (input.toLowerCase() === "m") {
        if (memory !== null) {
          console.log(`Using stored memory value: ${memory}`);
          resolve(memory);
        } else {
          console.log("No value in memory.\n");
          resolve(getNumber(promptText, allowResult));
        }
      } else if (allowResult && input.toLowerCase() === "r") {
        if (lastResult !== null) {
          console.log(`Using previous result: ${lastResult}`);
          resolve(lastResult);
        } else {
          console.log("No previous result available.\n");
          resolve(getNumber(promptText, allowResult));
        }
      } else {
        const number = parseFloat(input);
        if (isNaN(number)) {
          console.log("Invalid number. Try again.");
          resolve(getNumber(promptText, allowResult));
        } else {
          resolve(number);
        }
      }
    });
  });
}

function operationSymbol(choice) {
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

let lastResult = null;

async function main() {
  showWelcome();

  while (true) {
    showMenu();

    await new Promise((resolve) => {
      rl.question("Enter your choice (1-12): ", async (choice) => {
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
          else history.forEach((item, i) => console.log(` ${i + 1}. ${item}`));
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
        let num1, num2, result;

        if (choice === "6") {
          // Square Root needs one number
          num1 = await getNumber(
            "Enter a number (or M for memory, R for result): ",
            true
          );
          result = squareRoot(num1);
          console.log(`\n Result: ${result}\n`);
          history.push(`√${num1} = ${result}`);
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
          }

          console.log(`\n Result: ${result}\n`);
          history.push(
            `${num1} ${operationSymbol(choice)} ${num2} = ${result}`
          );
        }

        lastResult =
          typeof result === "string" && result.includes("Error")
            ? null
            : parseFloat(result);
        resolve();
      });
    });
  }
}

main();
