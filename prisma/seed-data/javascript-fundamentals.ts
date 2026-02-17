type Card = {
  type: "STANDARD" | "CODE" | "FILL_IN_BLANK";
  front: string;
  back: string;
  position: number;
  codeTemplate?: string;
  codeLanguage?: "javascript";
  expectedOutput?: string;
  codeSnippet?: string;
  blankAnswers?: string[];
};

export const javascriptFundamentalsCards: Card[] = [
  // ============================================================
  // TOPIC 1: Variables (let, const, var) and Data Types
  // ============================================================
  {
    type: "STANDARD",
    front: "What are the three ways to declare a variable in JavaScript, and how do they differ in scope?",
    back: "`var` is **function-scoped** and is hoisted. `let` is **block-scoped** and is not accessible before its declaration. `const` is also **block-scoped** but cannot be reassigned after initialization.",
    position: 0,
  },
  {
    type: "STANDARD",
    front: "What are the seven primitive data types in JavaScript?",
    back: "1. `string`\n2. `number`\n3. `boolean`\n4. `null`\n5. `undefined`\n6. `symbol`\n7. `bigint`",
    position: 1,
  },
  {
    type: "STANDARD",
    front: "What is the difference between `null` and `undefined`?",
    back: "`undefined` means a variable has been declared but not assigned a value. `null` is an intentional assignment representing \"no value.\" `typeof undefined` returns `\"undefined\"`, while `typeof null` returns `\"object\"` (a historical quirk).",
    position: 2,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the variable declarations using the correct keywords.",
    back: "Use `const` for values that won't change, `let` for values that will be reassigned.",
    position: 3,
    codeSnippet: "{{const}} PI = 3.14159;\n{{let}} counter = 0;\ncounter = counter + 1;",
    blankAnswers: ["const", "let"],
  },
  {
    type: "CODE",
    front: "Declare a `const` variable called `greeting` set to `\"Hello, World!\"` and log it to the console.",
    back: "Variables declared with `const` cannot be reassigned. They must be initialized at the time of declaration.",
    position: 4,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "Hello, World!",
  },
  {
    type: "STANDARD",
    front: "What does the `typeof` operator return for each of these values: `42`, `\"hello\"`, `true`, `null`, `undefined`?",
    back: "- `typeof 42` -> `\"number\"`\n- `typeof \"hello\"` -> `\"string\"`\n- `typeof true` -> `\"boolean\"`\n- `typeof null` -> `\"object\"` (historical bug)\n- `typeof undefined` -> `\"undefined\"`",
    position: 5,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Fill in the correct `typeof` results.",
    back: "`typeof` returns a string describing the type of the operand. Remember that `typeof null` is `\"object\"` due to a long-standing bug in the language.",
    position: 6,
    codeSnippet: "typeof 3.14    // \"{{number}}\"\ntypeof \"JS\"    // \"{{string}}\"\ntypeof false   // \"{{boolean}}\"",
    blankAnswers: ["number", "string", "boolean"],
  },
  {
    type: "STANDARD",
    front: "What happens when you try to reassign a `const` variable?",
    back: "A `TypeError` is thrown at runtime: **Assignment to constant variable.** However, if the `const` holds an object or array, the contents of that object/array can still be mutated.",
    position: 7,
  },

  // ============================================================
  // TOPIC 2: Strings and Template Literals
  // ============================================================
  {
    type: "STANDARD",
    front: "What are template literals and how do you create one?",
    back: "Template literals use **backticks** (`` ` ``) instead of quotes. They support **string interpolation** with `${expression}` and can span **multiple lines** without escape characters.",
    position: 8,
  },
  {
    type: "CODE",
    front: "Create variables `firstName` (`\"Ada\"`) and `lastName` (`\"Lovelace\"`), then use a template literal to log `\"Ada Lovelace\"`.",
    back: "Template literals allow embedding expressions inside `${}` within backtick strings.",
    position: 9,
    codeTemplate: "const firstName = \"Ada\";\nconst lastName = \"Lovelace\";\n// Use a template literal to log the full name\n",
    codeLanguage: "javascript",
    expectedOutput: "Ada Lovelace",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the template literal to produce the output `\"I have 3 cats.\"`",
    back: "Use `${}` inside backticks to embed expressions in template literals.",
    position: 10,
    codeSnippet: "const count = 3;\nconst animal = \"cats\";\nconsole.log({{`I have ${count} ${animal}.`}});",
    blankAnswers: ["`I have ${count} ${animal}.`"],
  },
  {
    type: "STANDARD",
    front: "What is the `.length` property on a string, and how do you access individual characters?",
    back: "`.length` returns the number of UTF-16 code units in the string. Access individual characters with **bracket notation** (`str[0]`) or `.charAt(0)`. Indexing is zero-based:\n```js\n\"JavaScript\".length  // 10\n\"JavaScript\"[4]      // \"S\"\n```",
    position: 11,
  },
  {
    type: "STANDARD",
    front: "Name four commonly used string methods in JavaScript.",
    back: "1. `.toUpperCase()` / `.toLowerCase()` -- change case\n2. `.trim()` -- remove leading/trailing whitespace\n3. `.includes(str)` -- check if substring exists\n4. `.slice(start, end)` -- extract part of a string\n\nOthers: `.split()`, `.replace()`, `.indexOf()`, `.startsWith()`, `.endsWith()`",
    position: 12,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Fill in the string method calls to transform the string.",
    back: "`.toUpperCase()` converts all characters to uppercase. `.slice(0, 5)` extracts characters from index 0 up to (but not including) index 5.",
    position: 13,
    codeSnippet: "const str = \"hello world\";\nconsole.log(str.{{toUpperCase}}()); // \"HELLO WORLD\"\nconsole.log(str.{{slice}}(0, 5));    // \"hello\"",
    blankAnswers: ["toUpperCase", "slice"],
  },

  // ============================================================
  // TOPIC 3: Arrays and Array Methods
  // ============================================================
  {
    type: "STANDARD",
    front: "What is the difference between `.push()` and `.unshift()` on an array?",
    back: "`.push()` adds one or more elements to the **end** of an array. `.unshift()` adds one or more elements to the **beginning**. Both return the new length of the array and mutate the original array.",
    position: 14,
  },
  {
    type: "CODE",
    front: "Use `.map()` to create a new array where each number in `[1, 2, 3, 4, 5]` is doubled. Log the result.",
    back: "`.map()` returns a **new array** by applying a callback to every element of the original array. It does not mutate the original.",
    position: 15,
    codeTemplate: "const numbers = [1, 2, 3, 4, 5];\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "[ 2, 4, 6, 8, 10 ]",
  },
  {
    type: "CODE",
    front: "Use `.filter()` to keep only even numbers from `[1, 2, 3, 4, 5, 6]`. Log the result.",
    back: "`.filter()` returns a new array containing only elements for which the callback returns `true`.",
    position: 16,
    codeTemplate: "const numbers = [1, 2, 3, 4, 5, 6];\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "[ 2, 4, 6 ]",
  },
  {
    type: "CODE",
    front: "Use `.reduce()` to compute the sum of `[10, 20, 30, 40]`. Log the result.",
    back: "`.reduce()` takes a callback `(accumulator, currentValue) => ...` and an optional initial value. It reduces the array to a single value by applying the callback cumulatively.",
    position: 17,
    codeTemplate: "const numbers = [10, 20, 30, 40];\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "100",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the array method calls to produce the expected output.",
    back: "`.forEach()` executes a callback for each element but returns `undefined`. `.includes()` checks if a value exists in the array.",
    position: 18,
    codeSnippet: "const fruits = [\"apple\", \"banana\", \"cherry\"];\nfruits.{{forEach}}(fruit => console.log(fruit));\nconsole.log(fruits.{{includes}}(\"banana\")); // true",
    blankAnswers: ["forEach", "includes"],
  },
  {
    type: "STANDARD",
    front: "What does `.find()` return compared to `.filter()`?",
    back: "`.find()` returns the **first element** that satisfies the callback, or `undefined` if none match. `.filter()` returns a **new array** of all elements that satisfy the callback.",
    position: 19,
  },
  {
    type: "CODE",
    front: "Use `.forEach()` to log each item in the array `[\"red\", \"green\", \"blue\"]` prefixed with its index, e.g. `\"0: red\"`.",
    back: "`.forEach()` passes the current element, its index, and the array to the callback. It always returns `undefined`.",
    position: 20,
    codeTemplate: "const colors = [\"red\", \"green\", \"blue\"];\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "0: red\n1: green\n2: blue",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Fill in the blanks to chain `.map()` and `.filter()`.",
    back: "Array methods that return arrays can be chained. Here we first double each number, then keep only those greater than 5.",
    position: 21,
    codeSnippet: "const result = [1, 2, 3, 4, 5]\n  .{{map}}(n => n * 2)\n  .{{filter}}(n => n > 5);\nconsole.log(result); // [6, 8, 10]",
    blankAnswers: ["map", "filter"],
  },

  // ============================================================
  // TOPIC 4: Objects and Destructuring
  // ============================================================
  {
    type: "STANDARD",
    front: "What are the two ways to access a property on a JavaScript object?",
    back: "1. **Dot notation**: `obj.property`\n2. **Bracket notation**: `obj[\"property\"]`\n\nBracket notation is required when the property name is dynamic, stored in a variable, or not a valid identifier (e.g., contains spaces or starts with a number).",
    position: 22,
  },
  {
    type: "CODE",
    front: "Create an object `person` with properties `name: \"Alice\"` and `age: 30`. Log the name using dot notation and the age using bracket notation.",
    back: "Objects store key-value pairs. Both dot notation and bracket notation access the same property.",
    position: 23,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "Alice\n30",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the object destructuring assignment.",
    back: "Destructuring lets you extract properties from an object into distinct variables using `{ }` syntax.",
    position: 24,
    codeSnippet: "const user = { name: \"Bob\", age: 25, city: \"NYC\" };\nconst { {{name}}, {{age}} } = user;\nconsole.log(name); // \"Bob\"\nconsole.log(age);  // 25",
    blankAnswers: ["name", "age"],
  },
  {
    type: "CODE",
    front: "Use destructuring with a default value to extract `color` (default `\"blue\"`) from `{ size: \"large\" }`. Log the result.",
    back: "You can provide default values in destructuring with `=`. If the property is `undefined`, the default is used.",
    position: 25,
    codeTemplate: "const config = { size: \"large\" };\n// Destructure color with a default of \"blue\"\n// Log color\n",
    codeLanguage: "javascript",
    expectedOutput: "blue",
  },
  {
    type: "STANDARD",
    front: "What is the shorthand property syntax in ES6 objects?",
    back: "When a variable name matches the property name, you can omit the colon:\n\n```js\nconst x = 10;\nconst y = 20;\nconst point = { x, y };\n// Same as { x: x, y: y }\n```",
    position: 26,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the nested destructuring to extract `city`.",
    back: "Nested destructuring lets you reach into nested objects by mirroring the object structure in the destructuring pattern.",
    position: 27,
    codeSnippet: "const data = { user: { name: \"Eve\", address: { city: \"Paris\" } } };\nconst { user: { address: { {{city}} } } } = data;\nconsole.log(city); // \"Paris\"",
    blankAnswers: ["city"],
  },

  // ============================================================
  // TOPIC 5: Control Flow
  // ============================================================
  {
    type: "STANDARD",
    front: "What is the difference between `==` and `===` in JavaScript?",
    back: "`==` (loose equality) performs **type coercion** before comparing, so `\"5\" == 5` is `true`. `===` (strict equality) does **no type coercion**, so `\"5\" === 5` is `false`. Always prefer `===` to avoid unexpected coercions.",
    position: 28,
  },
  {
    type: "CODE",
    front: "Write an `if/else if/else` chain that logs `\"child\"` for ages under 13, `\"teenager\"` for 13-17, and `\"adult\"` for 18+. Use `age = 15`.",
    back: "`if/else if/else` lets you test multiple conditions in sequence. Only the first matching branch executes.",
    position: 29,
    codeTemplate: "const age = 15;\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "teenager",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the ternary expression.",
    back: "The ternary operator `condition ? exprIfTrue : exprIfFalse` is a concise alternative to a simple `if/else`.",
    position: 30,
    codeSnippet: "const score = 85;\nconst grade = score >= 90 {{?}} \"A\" {{:}} \"B\";\nconsole.log(grade); // \"B\"",
    blankAnswers: ["?", ":"],
  },
  {
    type: "CODE",
    front: "Write a `switch` statement that logs the day type: `\"weekday\"` for `\"Monday\"` through `\"Friday\"`, and `\"weekend\"` for `\"Saturday\"` and `\"Sunday\"`. Use `day = \"Saturday\"`.",
    back: "A `switch` statement compares a value against multiple `case` clauses. Use `break` to prevent fall-through, or group cases intentionally.",
    position: 31,
    codeTemplate: "const day = \"Saturday\";\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "weekend",
  },
  {
    type: "STANDARD",
    front: "What are the **falsy** values in JavaScript?",
    back: "There are exactly **8 falsy values**:\n\n`false`, `0`, `-0`, `0n` (BigInt zero), `\"\"` (empty string), `null`, `undefined`, `NaN`\n\nEverything else is **truthy**, including `[]`, `{}`, and `\"0\"`.",
    position: 32,
  },

  // ============================================================
  // TOPIC 6: Loops
  // ============================================================
  {
    type: "CODE",
    front: "Use a `for` loop to log the numbers `1` through `5`, each on a new line.",
    back: "The classic `for` loop has three parts: initialization, condition, and increment. It runs as long as the condition is `true`.",
    position: 33,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "1\n2\n3\n4\n5",
  },
  {
    type: "STANDARD",
    front: "What is the difference between `for...of` and `for...in`?",
    back: "`for...of` iterates over **iterable values** (arrays, strings, Maps, Sets). `for...in` iterates over **enumerable property keys** of an object (including inherited ones). Use `for...of` for arrays and `for...in` for object keys.",
    position: 34,
  },
  {
    type: "CODE",
    front: "Use `for...of` to log each character of the string `\"Hello\"` on a new line.",
    back: "Strings are iterable in JavaScript, so `for...of` iterates over each character.",
    position: 35,
    codeTemplate: "const word = \"Hello\";\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "H\ne\nl\nl\no",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the `for...in` loop to log each key-value pair.",
    back: "`for...in` iterates over the enumerable string-keyed properties of an object.",
    position: 36,
    codeSnippet: "const car = { make: \"Toyota\", year: 2023 };\nfor (const {{key}} in car) {\n  console.log(`${key}: ${car[key]}`);\n}",
    blankAnswers: ["key"],
  },
  {
    type: "CODE",
    front: "Use a `while` loop to log the values `10, 8, 6, 4, 2` (counting down by 2).",
    back: "A `while` loop continues executing as long as its condition is `true`. Make sure the condition eventually becomes `false` to avoid infinite loops.",
    position: 37,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "10\n8\n6\n4\n2",
  },
  {
    type: "STANDARD",
    front: "What do `break` and `continue` do inside a loop?",
    back: "`break` **exits the loop entirely**, stopping all further iterations. `continue` **skips the rest of the current iteration** and jumps to the next one.\n```js\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue; // skip 3\n  if (i === 5) break;    // stop at 5\n  console.log(i);        // logs 1, 2, 4\n}\n```",
    position: 38,
  },

  // ============================================================
  // TOPIC 7: Functions
  // ============================================================
  {
    type: "STANDARD",
    front: "What is the difference between a function **declaration** and a function **expression**?",
    back: "A **function declaration** is hoisted, so it can be called before its definition:\n```js\ngreet(); // works\nfunction greet() { ... }\n```\n\nA **function expression** is not hoisted:\n```js\ngreet(); // ReferenceError\nconst greet = function() { ... };\n```",
    position: 39,
  },
  {
    type: "CODE",
    front: "Write an arrow function `square` that takes a number and returns its square. Log `square(7)`.",
    back: "Arrow functions with a single expression can use the concise body syntax (no braces, implicit return): `const fn = x => x * x;`",
    position: 40,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "49",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the arrow function with a default parameter.",
    back: "Default parameters provide fallback values when an argument is `undefined` or not passed.",
    position: 41,
    codeSnippet: "const greet = (name {{= \"World\"}}) => `Hello, ${name}!`;\nconsole.log(greet());        // \"Hello, World!\"\nconsole.log(greet(\"Alice\")); // \"Hello, Alice!\"",
    blankAnswers: ["= \"World\""],
  },
  {
    type: "CODE",
    front: "Write a function `sum` that accepts any number of arguments using rest parameters and returns their sum. Log `sum(1, 2, 3, 4)`.",
    back: "Rest parameters `...args` collect all remaining arguments into an array. You can then use array methods on them.",
    position: 42,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "10",
  },
  {
    type: "STANDARD",
    front: "How does `this` behave differently in arrow functions vs regular functions?",
    back: "Regular functions have their own `this` binding, determined by how they are called. Arrow functions do **not** have their own `this` -- they **inherit** `this` from the enclosing lexical scope. This makes arrow functions ideal for callbacks where you want to preserve the outer `this`.",
    position: 43,
  },
  {
    type: "STANDARD",
    front: "What is an IIFE (Immediately Invoked Function Expression)?",
    back: "An IIFE is a function that runs as soon as it is defined:\n```js\n(function() {\n  console.log(\"Runs immediately!\");\n})();\n```\nIIFEs create a private scope, preventing variable pollution of the global namespace.",
    position: 44,
  },
  {
    type: "CODE",
    front: "Write a function `clamp(value, min, max)` that restricts `value` to the range `[min, max]`. Log `clamp(15, 0, 10)` and `clamp(-5, 0, 10)`.",
    back: "Use `Math.min` and `Math.max` together: `Math.max(min, Math.min(value, max))`.",
    position: 45,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "10\n0",
  },

  // ============================================================
  // TOPIC 8: Closures and Scope
  // ============================================================
  {
    type: "STANDARD",
    front: "What is a **closure** in JavaScript?",
    back: "A closure is a function that **remembers the variables from its outer (lexical) scope** even after the outer function has returned. The inner function \"closes over\" those variables, keeping them alive.",
    position: 46,
  },
  {
    type: "CODE",
    front: "Write a `makeCounter()` function that returns a function. Each call to the returned function should log an incrementing count starting from `1`. Call it 3 times.",
    back: "This is the classic closure example. The inner function closes over the `count` variable, which persists between calls because of the closure.",
    position: 47,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "1\n2\n3",
  },
  {
    type: "STANDARD",
    front: "What are the three types of scope in JavaScript?",
    back: "1. **Global scope** -- variables declared outside any function or block.\n2. **Function scope** -- variables declared with `var` inside a function.\n3. **Block scope** -- variables declared with `let` or `const` inside `{}` blocks (if, for, etc.).",
    position: 48,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the closure-based function that creates a greeting function.",
    back: "The inner function captures the `greeting` parameter from the outer function's scope.",
    position: 49,
    codeSnippet: "function makeGreeter(greeting) {\n  return function(name) {\n    return `${{{greeting}}}, ${name}!`;\n  };\n}\nconst hello = makeGreeter(\"Hello\");\nconsole.log(hello(\"Alice\")); // \"Hello, Alice!\"",
    blankAnswers: ["greeting"],
  },
  {
    type: "CODE",
    front: "Demonstrate the closure pitfall with `var` in a loop: create an array of 3 functions that should log `0`, `1`, `2`, but with `var` they all log `3`. Then fix it using `let`.",
    back: "`var` is function-scoped, so the loop variable is shared across all closures. `let` is block-scoped, creating a new binding per iteration.",
    position: 50,
    codeTemplate: "// Broken version with var\nconst funcsVar = [];\nfor (var i = 0; i < 3; i++) {\n  funcsVar.push(() => i);\n}\nconsole.log(funcsVar[0](), funcsVar[1](), funcsVar[2]());\n\n// Fixed version with let\nconst funcsLet = [];\nfor (let j = 0; j < 3; j++) {\n  funcsLet.push(() => j);\n}\nconsole.log(funcsLet[0](), funcsLet[1](), funcsLet[2]());",
    codeLanguage: "javascript",
    expectedOutput: "3 3 3\n0 1 2",
  },

  // ============================================================
  // TOPIC 9: Callbacks and Higher-Order Functions
  // ============================================================
  {
    type: "STANDARD",
    front: "What is a **higher-order function**?",
    back: "A higher-order function is a function that either:\n1. **Takes a function as an argument** (e.g., `.map()`, `.filter()`, `setTimeout()`)\n2. **Returns a function** (e.g., factory functions, closures)\n\nThey are fundamental to functional programming in JavaScript.",
    position: 51,
  },
  {
    type: "CODE",
    front: "Write a higher-order function `repeat(n, action)` that calls `action(i)` for `i` from `0` to `n-1`. Use it to log `0`, `1`, `2`.",
    back: "Higher-order functions accept other functions as arguments, enabling flexible and reusable code.",
    position: 52,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "0\n1\n2",
  },
  {
    type: "STANDARD",
    front: "What is a **callback function**?",
    back: "A callback is a function **passed as an argument** to another function, which then invokes it at the appropriate time. Callbacks can be **synchronous** (like in `.map()`) or **asynchronous** (like in `setTimeout()` or event handlers).",
    position: 53,
  },
  {
    type: "CODE",
    front: "Write a function `applyOperation(a, b, operation)` that applies the given operation to two numbers. Test it with addition and multiplication.",
    back: "Passing functions as arguments lets you decouple logic. The caller decides what operation to perform.",
    position: 54,
    codeTemplate: "// Write your code here\n// Log applyOperation(5, 3, add) => 8\n// Log applyOperation(5, 3, multiply) => 15\n",
    codeLanguage: "javascript",
    expectedOutput: "8\n15",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the higher-order function that transforms an array.",
    back: "The `transform` function accepts an array and a callback, applying the callback to each element just like `.map()`.",
    position: 55,
    codeSnippet: "function transform(arr, {{callback}}) {\n  const result = [];\n  for (const item of arr) {\n    result.push(callback(item));\n  }\n  return result;\n}\nconsole.log(transform([1, 2, 3], n => n * 10)); // [10, 20, 30]",
    blankAnswers: ["callback"],
  },
  {
    type: "CODE",
    front: "Write a `compose(f, g)` function that returns a new function which applies `g` first, then `f`. Test with `double` and `addOne` on the value `5`.",
    back: "Function composition combines two functions into one. `compose(f, g)(x)` equals `f(g(x))`.",
    position: 56,
    codeTemplate: "const double = x => x * 2;\nconst addOne = x => x + 1;\n// Write compose function\n// Log compose(double, addOne)(5) => double(addOne(5)) => double(6) => 12\n",
    codeLanguage: "javascript",
    expectedOutput: "12",
  },

  // ============================================================
  // TOPIC 10: Promises and Async/Await
  // ============================================================
  {
    type: "STANDARD",
    front: "What is a **Promise** in JavaScript?",
    back: "A Promise is an object representing the **eventual completion or failure** of an asynchronous operation. It can be in one of three states:\n1. **Pending** -- initial state\n2. **Fulfilled** -- operation succeeded (`.then()` is called)\n3. **Rejected** -- operation failed (`.catch()` is called)",
    position: 57,
  },
  {
    type: "CODE",
    front: "Create a Promise that resolves with `\"Success!\"` after a simulated delay. Chain `.then()` to log the result and `.catch()` for errors.",
    back: "The Promise constructor takes an executor function with `resolve` and `reject` callbacks. `.then()` handles the fulfilled value.",
    position: 58,
    codeTemplate: "const myPromise = new Promise((resolve, reject) => {\n  resolve(\"Success!\");\n});\n// Chain .then() and .catch()\n",
    codeLanguage: "javascript",
    expectedOutput: "Success!",
  },
  {
    type: "STANDARD",
    front: "What does `async/await` do, and how does it relate to Promises?",
    back: "`async` declares a function that **always returns a Promise**. `await` pauses execution inside an `async` function until a Promise settles. It is **syntactic sugar** over `.then()` chains, making asynchronous code look synchronous and easier to read.",
    position: 59,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the `async/await` function.",
    back: "`await` pauses the function until the Promise resolves, then assigns the resolved value to the variable.",
    position: 60,
    codeSnippet: "{{async}} function fetchData() {\n  const result = {{await}} Promise.resolve(\"Data loaded\");\n  console.log(result);\n}\nfetchData();",
    blankAnswers: ["async", "await"],
  },
  {
    type: "CODE",
    front: "Use `Promise.all()` to wait for three Promises that resolve with `1`, `2`, and `3`. Log the results array.",
    back: "`Promise.all()` takes an iterable of Promises and returns a single Promise that fulfills with an array of results when **all** input Promises fulfill.",
    position: 61,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "[ 1, 2, 3 ]",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the error handling in async/await using try/catch.",
    back: "Use `try/catch` blocks inside `async` functions to handle rejected Promises, just like you would handle synchronous exceptions.",
    position: 62,
    codeSnippet: "async function safeFetch() {\n  {{try}} {\n    const data = await Promise.reject(\"Network error\");\n  } {{catch}} (error) {\n    console.log(\"Caught:\", error);\n  }\n}\nsafeFetch();",
    blankAnswers: ["try", "catch"],
  },
  {
    type: "STANDARD",
    front: "What is the difference between `Promise.all()` and `Promise.allSettled()`?",
    back: "`Promise.all()` **short-circuits** on the first rejection -- if any Promise rejects, the whole result rejects.\n\n`Promise.allSettled()` waits for **all** Promises to settle (fulfilled or rejected) and returns an array of outcome objects: `{ status, value }` or `{ status, reason }`.",
    position: 63,
  },
  {
    type: "CODE",
    front: "Write an `async` function that sequentially awaits two Promises: one resolving to `\"Hello\"` and one to `\"World\"`. Log them combined as `\"Hello World\"`.",
    back: "Sequential `await` statements execute one after the other, unlike `Promise.all()` which executes in parallel.",
    position: 64,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "Hello World",
  },

  // ============================================================
  // TOPIC 11: DOM Basics
  // ============================================================
  {
    type: "STANDARD",
    front: "What does `document.querySelector()` do?",
    back: "`document.querySelector(selector)` returns the **first element** that matches the CSS selector, or `null` if no match is found. For selecting multiple elements, use `document.querySelectorAll()` which returns a **NodeList**.",
    position: 65,
  },
  {
    type: "STANDARD",
    front: "What is the difference between `textContent` and `innerHTML`?",
    back: "`textContent` gets/sets the **plain text** content of an element (ignoring HTML tags). `innerHTML` gets/sets the **HTML markup** inside the element. Using `innerHTML` with user input can lead to **XSS vulnerabilities** -- prefer `textContent` when you only need text.",
    position: 66,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the DOM code to add a click event listener.",
    back: "`.addEventListener()` takes an event type string and a callback function that runs when the event fires.",
    position: 67,
    codeSnippet: "const button = document.querySelector(\"#myBtn\");\nbutton.{{addEventListener}}(\"{{click}}\", () => {\n  console.log(\"Button clicked!\");\n});",
    blankAnswers: ["addEventListener", "click"],
  },
  {
    type: "STANDARD",
    front: "What is **event delegation** and why is it useful?",
    back: "Event delegation attaches a **single event listener to a parent element** instead of individual listeners on each child. It works because events **bubble** up the DOM. Benefits:\n- Better **performance** with many elements\n- Automatically handles **dynamically added** elements\n- Less **memory** usage",
    position: 68,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to create and append a new DOM element.",
    back: "`document.createElement()` creates a new element node. `.appendChild()` adds it as the last child of the target element.",
    position: 69,
    codeSnippet: "const newDiv = document.{{createElement}}(\"div\");\nnewDiv.textContent = \"Hello!\";\ndocument.body.{{appendChild}}(newDiv);",
    blankAnswers: ["createElement", "appendChild"],
  },
  {
    type: "STANDARD",
    front: "What does `event.preventDefault()` do?",
    back: "`event.preventDefault()` stops the **default browser behavior** for an event. Common uses:\n- Prevent a form from submitting and refreshing the page\n- Prevent a link from navigating to its `href`\n- Prevent a checkbox from toggling\n\nIt does **not** stop event propagation (use `event.stopPropagation()` for that).",
    position: 70,
  },
  {
    type: "STANDARD",
    front: "How do you create a new element, set its text, and add it to the page using the DOM API?",
    back: "Use three steps:\n```js\nconst el = document.createElement(\"p\");\nel.textContent = \"Hello!\";\ndocument.body.appendChild(el);\n```\n- `createElement(tag)` creates the element\n- `textContent` sets its text safely (no HTML injection)\n- `appendChild(node)` inserts it into the DOM",
    position: 71,
  },

  // ============================================================
  // TOPIC 12: ES6+ Features
  // ============================================================
  {
    type: "STANDARD",
    front: "What does the **spread operator** (`...`) do?",
    back: "The spread operator expands an iterable into individual elements. Uses:\n- **Arrays**: `[...arr1, ...arr2]` (merge arrays)\n- **Objects**: `{ ...obj1, ...obj2 }` (merge objects)\n- **Function calls**: `Math.max(...numbers)`\n\nIt creates **shallow copies**, not deep copies.",
    position: 72,
  },
  {
    type: "CODE",
    front: "Use the spread operator to merge two arrays `[1, 2, 3]` and `[4, 5, 6]` into one. Then use it to create a shallow copy of an object `{ a: 1, b: 2 }` with an added property `c: 3`. Log both.",
    back: "The spread operator creates shallow copies of arrays and objects. When spreading objects, later properties override earlier ones with the same key.",
    position: 73,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "[ 1, 2, 3, 4, 5, 6 ]\n{ a: 1, b: 2, c: 3 }",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the rest parameter and spread operator usage.",
    back: "Rest parameters collect arguments into an array. The spread operator expands an array into individual arguments.",
    position: 74,
    codeSnippet: "function logAll({{...args}}) {\n  console.log(args);\n}\nconst nums = [1, 2, 3];\nlogAll({{...nums}}); // [1, 2, 3]",
    blankAnswers: ["...args", "...nums"],
  },
  {
    type: "STANDARD",
    front: "What is **optional chaining** (`?.`) and when should you use it?",
    back: "Optional chaining `?.` short-circuits to `undefined` if the left side is `null` or `undefined`, instead of throwing an error:\n```js\nuser?.address?.city  // safe property access\narr?.[0]             // safe array access\nfn?.()               // safe function call\n```\nUse it when a value might not exist.",
    position: 75,
  },
  {
    type: "CODE",
    front: "Given a nested object that may have missing properties, use optional chaining to safely access a deep value. Log the result (which should be `undefined`).",
    back: "Optional chaining prevents `TypeError: Cannot read properties of undefined` by returning `undefined` early if any part of the chain is nullish.",
    position: 76,
    codeTemplate: "const user = { name: \"Alice\", profile: null };\n// Safely try to access user.profile.avatar.url\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "undefined",
  },
  {
    type: "STANDARD",
    front: "What is the **nullish coalescing operator** (`??`) and how does it differ from `||`?",
    back: "`??` returns the right-hand side only when the left is `null` or `undefined`.\n`||` returns the right-hand side for **any falsy** value (`0`, `\"\"`, `false`, etc.).\n\n```js\n0 || 10   // 10 (0 is falsy)\n0 ?? 10   // 0 (0 is not null/undefined)\n\"\" || \"default\"  // \"default\"\n\"\" ?? \"default\"  // \"\"\n```",
    position: 77,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code using nullish coalescing to provide defaults.",
    back: "`??` only kicks in for `null` or `undefined`, preserving intentional falsy values like `0` or `\"\"`.",
    position: 78,
    codeSnippet: "const count = 0;\nconst name = undefined;\n\nconst displayCount = count {{??}} 10;\nconst displayName = name {{??}} \"Anonymous\";\nconsole.log(displayCount); // 0\nconsole.log(displayName); // \"Anonymous\"",
    blankAnswers: ["??", "??"],
  },
  {
    type: "CODE",
    front: "Use destructuring with the rest operator to extract the first element and collect the remaining elements from `[10, 20, 30, 40, 50]`. Log both.",
    back: "The rest element in array destructuring collects all remaining items into a new array. It must be the last element in the pattern.",
    position: 79,
    codeTemplate: "const numbers = [10, 20, 30, 40, 50];\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "10\n[ 20, 30, 40, 50 ]",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the `Map` usage to store and retrieve values.",
    back: "`Map` is a built-in collection that stores key-value pairs. Unlike objects, keys can be **any type** (not just strings).",
    position: 80,
    codeSnippet: "const map = new {{Map}}();\nmap.{{set}}(\"name\", \"Alice\");\nconsole.log(map.{{get}}(\"name\")); // \"Alice\"\nconsole.log(map.{{has}}(\"name\")); // true",
    blankAnswers: ["Map", "set", "get", "has"],
  },
  {
    type: "CODE",
    front: "Use `Object.entries()` and destructuring in a `for...of` loop to log each key-value pair of `{ x: 1, y: 2, z: 3 }` in the format `\"x = 1\"`.",
    back: "`Object.entries()` returns an array of `[key, value]` pairs. Combined with destructuring, it provides a clean way to iterate over object properties.",
    position: 81,
    codeTemplate: "const coords = { x: 1, y: 2, z: 3 };\n// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "x = 1\ny = 2\nz = 3",
  },

  // ============================================================
  // MIXED ADVANCED CARDS (pulling from multiple topics)
  // ============================================================
  {
    type: "CODE",
    front: "Write a `pipe` function that takes any number of functions and returns a new function that applies them left-to-right. Test with `addOne`, `double`, `square` on value `2`.",
    back: "`pipe` is the opposite of `compose` -- it applies functions left-to-right. It can be implemented with `.reduce()`.",
    position: 82,
    codeTemplate: "const addOne = x => x + 1;\nconst double = x => x * 2;\nconst square = x => x * x;\n// Write pipe function\n// pipe(addOne, double, square)(2) => square(double(addOne(2))) => square(double(3)) => square(6) => 36\n",
    codeLanguage: "javascript",
    expectedOutput: "36",
  },
  {
    type: "STANDARD",
    front: "What is a **tagged template literal** in JavaScript?",
    back: "A tagged template is a function call where the function name precedes a template literal:\n```js\nfunction tag(strings, ...values) { ... }\ntag`Hello ${name}, you are ${age}`;\n```\n`strings` is an array of string parts, and `values` are the interpolated expressions. Used in libraries like `styled-components` and `GraphQL`.",
    position: 83,
  },
  {
    type: "CODE",
    front: "Write a `memoize(fn)` function that caches results of a single-argument function. Test it with a function that adds 10 to its input.",
    back: "Memoization stores previously computed results in a cache (often a `Map`). When called again with the same argument, it returns the cached result instead of recomputing.",
    position: 84,
    codeTemplate: "// Write memoize function\n// Then test:\n// const addTen = memoize(x => x + 10);\n// console.log(addTen(5));  => 15\n// console.log(addTen(5));  => 15 (from cache)\n// console.log(addTen(10)); => 20\n",
    codeLanguage: "javascript",
    expectedOutput: "15\n15\n20",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the `Symbol` usage to create a unique property key.",
    back: "`Symbol()` creates a globally unique value, useful for non-string property keys that won't collide with other properties.",
    position: 85,
    codeSnippet: "const id = {{Symbol}}(\"id\");\nconst user = { name: \"Alice\", [id]: 123 };\nconsole.log(user[{{id}}]); // 123\nconsole.log(user.name);    // \"Alice\"",
    blankAnswers: ["Symbol", "id"],
  },
  {
    type: "CODE",
    front: "Write a `debounce(fn, delay)` function that returns a debounced version. Demonstrate that calling it multiple times quickly only triggers the function once. (Use synchronous simulation with a counter.)",
    back: "Debouncing ensures a function only executes after a certain period of inactivity. It uses `setTimeout` and `clearTimeout` internally.",
    position: 86,
    codeTemplate: "function debounce(fn, delay) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\n// Demonstration (synchronous log of concept)\nlet callCount = 0;\nconst increment = () => { callCount++; };\nconst debouncedIncrement = debounce(increment, 100);\n\n// Simulate rapid calls\ndebouncedIncrement();\ndebouncedIncrement();\ndebouncedIncrement();\n\n// Check immediately (timer hasn't fired yet)\nconsole.log(\"Immediate count:\", callCount);\n\n// After delay, check again\nsetTimeout(() => {\n  console.log(\"After delay count:\", callCount);\n}, 200);",
    codeLanguage: "javascript",
    expectedOutput: "Immediate count: 0\nAfter delay count: 1",
  },
  {
    type: "STANDARD",
    front: "What are **generator functions** and what does `yield` do?",
    back: "Generator functions (declared with `function*`) return a **Generator object** that implements the iterable protocol. `yield` pauses execution and returns a value. Calling `.next()` resumes from where it left off.\n\n```js\nfunction* count() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst gen = count();\ngen.next(); // { value: 1, done: false }\n```",
    position: 87,
  },
  {
    type: "CODE",
    front: "Use `Array.from()` with a mapping function to create an array of the first 5 squares: `[1, 4, 9, 16, 25]`. Log the result.",
    back: "`Array.from({ length: n }, (_, i) => ...)` is a concise way to generate arrays from a computed sequence.",
    position: 88,
    codeTemplate: "// Write your code here\n",
    codeLanguage: "javascript",
    expectedOutput: "[ 1, 4, 9, 16, 25 ]",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the `Proxy` usage to intercept property access.",
    back: "A `Proxy` wraps an object and intercepts operations via **handler traps**. The `get` trap intercepts property reads.",
    position: 89,
    codeSnippet: "const handler = {\n  {{get}}(target, prop) {\n    return prop in target ? target[prop] : `Property \"${prop}\" not found`;\n  }\n};\nconst obj = new {{Proxy}}({ name: \"Alice\" }, handler);\nconsole.log(obj.name);  // \"Alice\"\nconsole.log(obj.age);   // 'Property \"age\" not found'",
    blankAnswers: ["get", "Proxy"],
  },
];
