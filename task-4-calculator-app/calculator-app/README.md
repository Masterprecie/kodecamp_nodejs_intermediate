# Node.js CLI Calculator (TypeScript)

A simple yet powerful command-line calculator built with Node.js and TypeScript.  
This interactive CLI tool performs basic arithmetic operations, tracks calculation history, and supports memory functions for storing and recalling results — all in your terminal.

---

## Project Overview

This project was designed to practice Node.js and TypeScript fundamentals, command-line interface development, input validation, and error handling. It serves as a great starting point for building interactive CLI tools with type safety.

---

## Features

Basic arithmetic operations:

- Addition
- Subtraction
- Multiplication
- Division (with division by zero handling)

Calculation history:

- View a list of all previous calculations during the session.

Memory functionality:

- **Store** the last result to memory.
- **Recall** memory value for reuse.
- **Clear** memory when no longer needed.
- Use `M` during number input to insert the stored memory value.

### Previous Result:

- Use `R` when prompted for a number to insert the result from your last calculation.

### Advanced Math:

- **Power** (x to the power y)
- **Square Root**
- **Percentage calculation** (what % of one number is another)

User-friendly CLI:

- Interactive menus and prompts.
- Robust input validation and error feedback.
- Clean, readable output formatting.

---

## Installation & Setup

### Prerequisites:

- [Node.js](https://nodejs.org/en/) installed on your machine.
- npm (comes with Node.js)

---

## TypeScript Setup

1. Install dependencies:
   ```bash
   npm install --save-dev typescript @types/node ts-node
   ```

2. Build configuration:
   - Ensure you have a `tsconfig.json` in your project root. Example:
     ```json
     {
       "compilerOptions": {
         "target": "ES2020",
         "module": "ESNext",
         "outDir": "dist",
         "rootDir": "src",
         "strict": true
       }
     }
     ```

3. Scripts (already in package.json):
   - `npm run build` — Compile TypeScript to JavaScript
   - `npm run dev` — Run the app in development mode (TypeScript directly)
   - `npm start` — Run the compiled JavaScript

---

## Running the Calculator

### Development:
```bash
npm run dev
```

### Production:
```bash
npm run build
npm start
```

---

## TypeScript Highlights

- All functions and variables are type-annotated for safety.
- Input validation and error handling use TypeScript's type system.
- Calculation history and memory features are fully typed.
- Division by zero and invalid input are handled with typed errors.

---

## Project Structure

- `src/calculator.ts` — Main TypeScript application file
- `tsconfig.json` — TypeScript configuration
- `package.json` — Project scripts and dependencies
- `dist/calculator.js` — Compiled JavaScript output
- `README.md` — Project documentation

---

## License

MIT
