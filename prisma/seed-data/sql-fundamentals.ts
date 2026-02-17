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

export const sqlFundamentalsCards: Card[] = [
  // ──────────────────────────────────────────────
  // 1. SELECT basics and column selection
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What does the `SELECT` statement do in SQL?",
    back: "`SELECT` retrieves data from one or more tables. It is the most commonly used SQL statement.\n\n```sql\nSELECT column1, column2 FROM table_name;\n```\n\nUse `SELECT *` to retrieve all columns.",
    position: 0,
  },
  {
    type: "STANDARD",
    front: "How do you select only unique values from a column?",
    back: "Use `SELECT DISTINCT` to return only unique values.\n\n```sql\nSELECT DISTINCT department FROM employees;\n```\n\nThis removes duplicate rows from the result set for the specified columns.",
    position: 1,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to select the `name` and `email` columns from the `users` table.",
    back: "The `SELECT` statement specifies which columns to retrieve, and `FROM` specifies the table.",
    position: 2,
    codeSnippet: "{{SELECT}} name, email {{FROM}} users;",
    blankAnswers: ["SELECT", "FROM"],
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to select all unique job titles from the `employees` table.",
    back: "`DISTINCT` eliminates duplicate rows from the result set.",
    position: 3,
    codeSnippet: "SELECT {{DISTINCT}} job_title FROM {{employees}};",
    blankAnswers: ["DISTINCT", "employees"],
  },
  {
    type: "CODE",
    front: "Write JavaScript that constructs a `SELECT` query to fetch `name` and `salary` from an `employees` table, then log the query string.",
    back: "A basic `SELECT` query specifies the columns after `SELECT` and the table after `FROM`.",
    position: 4,
    codeTemplate: `// Build a SELECT query for name and salary from employees
const query = "";
console.log(query);`,
    codeLanguage: "javascript",
    expectedOutput: "SELECT name, salary FROM employees;",
  },

  // ──────────────────────────────────────────────
  // 2. WHERE clause and operators
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What is the purpose of the `WHERE` clause in SQL?",
    back: "`WHERE` filters rows based on a condition. Only rows that satisfy the condition are returned.\n\n```sql\nSELECT * FROM products WHERE price > 50;\n```\n\nCommon operators: `=`, `<>`, `>`, `<`, `>=`, `<=`, `LIKE`, `IN`, `BETWEEN`.",
    position: 5,
  },
  {
    type: "STANDARD",
    front: "How does the `LIKE` operator work in SQL? What are its wildcard characters?",
    back: "`LIKE` performs pattern matching on strings.\n\n- `%` matches zero or more characters\n- `_` matches exactly one character\n\n```sql\nSELECT * FROM customers WHERE name LIKE 'J%';\n-- Matches John, Jane, etc.\n\nSELECT * FROM products WHERE code LIKE 'A_B';\n-- Matches A1B, AXB, etc.\n```",
    position: 6,
  },
  {
    type: "STANDARD",
    front: "What is the difference between the `IN` and `BETWEEN` operators?",
    back: "`IN` checks if a value matches any value in a list:\n```sql\nSELECT * FROM orders WHERE status IN ('shipped', 'delivered');\n```\n\n`BETWEEN` checks if a value falls within an inclusive range:\n```sql\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n```\n\n`BETWEEN` includes both boundary values.",
    position: 7,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to find employees whose salary is between 40000 and 80000.",
    back: "`BETWEEN` defines an inclusive range; both endpoints are included.",
    position: 8,
    codeSnippet: "SELECT * FROM employees\n{{WHERE}} salary {{BETWEEN}} 40000 {{AND}} 80000;",
    blankAnswers: ["WHERE", "BETWEEN", "AND"],
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to find customers whose country is either USA, Canada, or Mexico.",
    back: "`IN` lets you specify multiple values in a `WHERE` clause without chaining `OR` conditions.",
    position: 9,
    codeSnippet: "SELECT * FROM customers\nWHERE country {{IN}} ('USA', 'Canada', 'Mexico');",
    blankAnswers: ["IN"],
  },
  {
    type: "CODE",
    front: "Write a function `buildWhereQuery` that takes a table name, a column, an operator, and a value, then returns a SQL query string. Log a sample call.",
    back: "Dynamically constructing WHERE queries helps understand how filters are structured.",
    position: 10,
    codeTemplate: `function buildWhereQuery(table, column, operator, value) {
  // Return a SELECT * query with a WHERE clause
}

console.log(buildWhereQuery("products", "price", ">", 100));`,
    codeLanguage: "javascript",
    expectedOutput: "SELECT * FROM products WHERE price > 100;",
  },

  // ──────────────────────────────────────────────
  // 3. ORDER BY and LIMIT
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "How do you sort query results in SQL?",
    back: "Use `ORDER BY` to sort results. Default order is ascending (`ASC`).\n\n```sql\nSELECT * FROM employees ORDER BY salary DESC;\nSELECT * FROM products ORDER BY category ASC, price DESC;\n```\n\nYou can sort by multiple columns; each can have its own direction.",
    position: 11,
  },
  {
    type: "STANDARD",
    front: "How do you limit the number of rows returned in SQL?",
    back: "Use `LIMIT` to restrict the number of rows returned.\n\n```sql\nSELECT * FROM products ORDER BY price DESC LIMIT 10;\n```\n\nUse `OFFSET` to skip rows:\n```sql\nSELECT * FROM products LIMIT 10 OFFSET 20;\n```\n\nNote: SQL Server uses `TOP` instead of `LIMIT`.",
    position: 12,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to get the 5 highest-paid employees.",
    back: "`ORDER BY ... DESC` sorts from highest to lowest, and `LIMIT` restricts the result count.",
    position: 13,
    codeSnippet: "SELECT name, salary FROM employees\n{{ORDER BY}} salary {{DESC}}\n{{LIMIT}} 5;",
    blankAnswers: ["ORDER BY", "DESC", "LIMIT"],
  },

  // ──────────────────────────────────────────────
  // 4. Aggregate functions
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "Name the five main SQL aggregate functions and what each does.",
    back: "1. `COUNT()` - counts the number of rows\n2. `SUM()` - totals numeric values\n3. `AVG()` - calculates the arithmetic mean\n4. `MIN()` - finds the smallest value\n5. `MAX()` - finds the largest value\n\n```sql\nSELECT COUNT(*), AVG(salary), MAX(salary)\nFROM employees;\n```\n\nAggregate functions ignore `NULL` values (except `COUNT(*)`).",
    position: 14,
  },
  {
    type: "STANDARD",
    front: "What is the difference between `COUNT(*)` and `COUNT(column_name)`?",
    back: "`COUNT(*)` counts all rows including those with `NULL` values.\n\n`COUNT(column_name)` counts only rows where that column is not `NULL`.\n\n```sql\n-- Counts all rows\nSELECT COUNT(*) FROM employees;\n\n-- Counts only rows where email is not NULL\nSELECT COUNT(email) FROM employees;\n```",
    position: 15,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to find the total and average salary of all employees.",
    back: "`SUM()` adds up all values; `AVG()` calculates the mean. Both ignore NULLs.",
    position: 16,
    codeSnippet: "SELECT {{SUM}}(salary) AS total_salary,\n       {{AVG}}(salary) AS avg_salary\nFROM employees;",
    blankAnswers: ["SUM", "AVG"],
  },
  {
    type: "CODE",
    front: "Write JavaScript that simulates `COUNT`, `SUM`, and `AVG` on an array of employee salary objects. Log the results.",
    back: "Aggregate functions reduce a set of values into a single result. These JavaScript equivalents help illustrate the concept.",
    position: 17,
    codeTemplate: `const employees = [
  { name: "Alice", salary: 60000 },
  { name: "Bob", salary: 75000 },
  { name: "Carol", salary: 55000 },
  { name: "Dave", salary: 80000 },
];

// Calculate COUNT, SUM, AVG
const count = 0;
const sum = 0;
const avg = 0;

console.log("COUNT:", count, "SUM:", sum, "AVG:", avg);`,
    codeLanguage: "javascript",
    expectedOutput: "COUNT: 4 SUM: 270000 AVG: 67500",
  },

  // ──────────────────────────────────────────────
  // 5. GROUP BY and HAVING
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What does `GROUP BY` do, and when is it required?",
    back: "`GROUP BY` groups rows that share values in specified columns, allowing aggregate functions to operate on each group.\n\n```sql\nSELECT department, COUNT(*) AS emp_count\nFROM employees\nGROUP BY department;\n```\n\nIt is required whenever you use aggregate functions alongside non-aggregated columns in `SELECT`.",
    position: 18,
  },
  {
    type: "STANDARD",
    front: "What is the difference between `WHERE` and `HAVING`?",
    back: "`WHERE` filters individual rows **before** grouping.\n`HAVING` filters groups **after** aggregation.\n\n```sql\nSELECT department, AVG(salary) AS avg_sal\nFROM employees\nWHERE hire_date > '2020-01-01'\nGROUP BY department\nHAVING AVG(salary) > 60000;\n```\n\n`HAVING` can reference aggregate functions; `WHERE` cannot.",
    position: 19,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to find departments with more than 10 employees.",
    back: "`HAVING` filters groups after `GROUP BY`, allowing conditions on aggregate results.",
    position: 20,
    codeSnippet: "SELECT department, COUNT(*) AS emp_count\nFROM employees\n{{GROUP BY}} department\n{{HAVING}} COUNT(*) > 10;",
    blankAnswers: ["GROUP BY", "HAVING"],
  },
  {
    type: "CODE",
    front: "Write JavaScript that groups an array of products by category and counts items per category (simulating `GROUP BY` with `COUNT`). Log the result.",
    back: "`GROUP BY` partitions data into groups. In JavaScript, you can simulate this with `reduce()`.",
    position: 21,
    codeTemplate: `const products = [
  { name: "Laptop", category: "Electronics" },
  { name: "Phone", category: "Electronics" },
  { name: "Desk", category: "Furniture" },
  { name: "Chair", category: "Furniture" },
  { name: "Monitor", category: "Electronics" },
];

// Group by category and count
const grouped = {};

console.log(JSON.stringify(grouped));`,
    codeLanguage: "javascript",
    expectedOutput: '{"Electronics":3,"Furniture":2}',
  },

  // ──────────────────────────────────────────────
  // 6. JOINs
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What does an `INNER JOIN` return?",
    back: "`INNER JOIN` returns only the rows where there is a matching value in **both** tables.\n\n```sql\nSELECT e.name, d.department_name\nFROM employees e\nINNER JOIN departments d\n  ON e.department_id = d.id;\n```\n\nRows without a match in either table are excluded.",
    position: 22,
  },
  {
    type: "STANDARD",
    front: "What is the difference between `LEFT JOIN` and `RIGHT JOIN`?",
    back: "`LEFT JOIN` returns all rows from the **left** table and matched rows from the right. Unmatched right-side columns are `NULL`.\n\n`RIGHT JOIN` returns all rows from the **right** table and matched rows from the left.\n\n```sql\n-- All employees, even those without a department\nSELECT e.name, d.name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.id;\n```",
    position: 23,
  },
  {
    type: "STANDARD",
    front: "What does a `FULL OUTER JOIN` return?",
    back: "`FULL OUTER JOIN` returns all rows from **both** tables. Where there is no match, the missing side is filled with `NULL`.\n\n```sql\nSELECT e.name, d.department_name\nFROM employees e\nFULL OUTER JOIN departments d\n  ON e.department_id = d.id;\n```\n\nThis combines the results of both `LEFT JOIN` and `RIGHT JOIN`.",
    position: 24,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to get all employees with their department names, including employees who have no department assigned.",
    back: "A `LEFT JOIN` keeps all rows from the left table (`employees`) even when there is no match in the right table.",
    position: 25,
    codeSnippet: "SELECT e.name, d.department_name\nFROM employees e\n{{LEFT JOIN}} departments d\n  {{ON}} e.department_id = d.id;",
    blankAnswers: ["LEFT JOIN", "ON"],
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to find employees and their order totals using an inner join.",
    back: "`INNER JOIN` returns only rows with matching keys in both tables.",
    position: 26,
    codeSnippet: "SELECT e.name, SUM(o.amount) AS total\nFROM employees e\n{{INNER JOIN}} orders o\n  ON e.id = o.{{employee_id}}\nGROUP BY e.name;",
    blankAnswers: ["INNER JOIN", "employee_id"],
  },
  {
    type: "CODE",
    front: "Write JavaScript that simulates an `INNER JOIN` between two arrays (users and orders) on `userId`. Log matching pairs.",
    back: "An `INNER JOIN` matches rows from two datasets where a shared key is equal.",
    position: 27,
    codeTemplate: `const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" },
];

const orders = [
  { orderId: 101, userId: 1, product: "Laptop" },
  { orderId: 102, userId: 3, product: "Phone" },
  { orderId: 103, userId: 1, product: "Mouse" },
];

// Simulate INNER JOIN on userId
const result = [];

console.log(JSON.stringify(result));`,
    codeLanguage: "javascript",
    expectedOutput: '[{"name":"Alice","product":"Laptop"},{"name":"Carol","product":"Phone"},{"name":"Alice","product":"Mouse"}]',
  },

  // ──────────────────────────────────────────────
  // 7. Subqueries
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What is a subquery in SQL, and where can it be used?",
    back: "A subquery is a query nested inside another query. It can appear in:\n\n1. **WHERE clause**: filter based on another query's result\n```sql\nSELECT * FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n```\n\n2. **FROM clause**: use query results as a derived table\n```sql\nSELECT dept, avg_sal FROM\n  (SELECT department AS dept, AVG(salary) AS avg_sal\n   FROM employees GROUP BY department) sub;\n```\n\n3. **SELECT clause**: as a scalar subquery",
    position: 28,
  },
  {
    type: "STANDARD",
    front: "What is a correlated subquery?",
    back: "A correlated subquery references columns from the outer query and executes once for each row of the outer query.\n\n```sql\nSELECT e.name, e.salary\nFROM employees e\nWHERE e.salary > (\n  SELECT AVG(salary)\n  FROM employees\n  WHERE department_id = e.department_id\n);\n```\n\nThis finds employees earning more than their department average. It is typically slower than non-correlated subqueries.",
    position: 29,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to find employees who earn more than the company average salary.",
    back: "A subquery in the `WHERE` clause can compute a value that the outer query compares against.",
    position: 30,
    codeSnippet: "SELECT name, salary FROM employees\nWHERE salary > (\n  SELECT {{AVG}}(salary) {{FROM}} employees\n);",
    blankAnswers: ["AVG", "FROM"],
  },

  // ──────────────────────────────────────────────
  // 8. INSERT, UPDATE, DELETE
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "How do you insert a new row into a table in SQL?",
    back: "Use `INSERT INTO` to add new rows.\n\n```sql\n-- Insert with column list\nINSERT INTO employees (name, email, salary)\nVALUES ('Alice', 'alice@example.com', 75000);\n\n-- Insert multiple rows\nINSERT INTO employees (name, email, salary)\nVALUES\n  ('Bob', 'bob@example.com', 65000),\n  ('Carol', 'carol@example.com', 70000);\n```",
    position: 31,
  },
  {
    type: "STANDARD",
    front: "How do `UPDATE` and `DELETE` work in SQL? What precaution should you always take?",
    back: "`UPDATE` modifies existing rows; `DELETE` removes rows.\n\n```sql\nUPDATE employees SET salary = 80000\nWHERE id = 42;\n\nDELETE FROM employees WHERE id = 42;\n```\n\n**Always include a `WHERE` clause.** Without it, `UPDATE` changes all rows and `DELETE` removes all rows in the table.",
    position: 32,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the statement to update the salary of the employee with id 5 to 90000.",
    back: "`UPDATE ... SET ... WHERE` modifies specific columns for rows matching the condition.",
    position: 33,
    codeSnippet: "{{UPDATE}} employees\n{{SET}} salary = 90000\nWHERE id = 5;",
    blankAnswers: ["UPDATE", "SET"],
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the statement to delete all orders placed before 2020.",
    back: "`DELETE FROM` removes rows. The `WHERE` clause is critical to avoid deleting everything.",
    position: 34,
    codeSnippet: "{{DELETE FROM}} orders\nWHERE order_date < '{{2020}}-01-01';",
    blankAnswers: ["DELETE FROM", "2020"],
  },
  {
    type: "CODE",
    front: "Write a JavaScript function `buildInsertQuery` that takes a table name and an object of column-value pairs, then returns an `INSERT INTO` SQL string. Log a sample call.",
    back: "`INSERT INTO` requires a table name, column list, and corresponding values.",
    position: 35,
    codeTemplate: `function buildInsertQuery(table, data) {
  // Return an INSERT INTO query string
}

console.log(buildInsertQuery("users", { name: "Alice", age: 30 }));`,
    codeLanguage: "javascript",
    expectedOutput: "INSERT INTO users (name, age) VALUES ('Alice', 30);",
  },

  // ──────────────────────────────────────────────
  // 9. CREATE TABLE, ALTER TABLE
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "How do you create a new table in SQL?",
    back: "Use `CREATE TABLE` with column definitions:\n\n```sql\nCREATE TABLE products (\n  id INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  price DECIMAL(10, 2),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n```\n\nEach column specifies a name, data type, and optional constraints.",
    position: 36,
  },
  {
    type: "STANDARD",
    front: "How do you modify an existing table structure in SQL?",
    back: "Use `ALTER TABLE` to add, modify, or drop columns:\n\n```sql\n-- Add a column\nALTER TABLE employees ADD COLUMN phone VARCHAR(20);\n\n-- Modify a column type\nALTER TABLE employees ALTER COLUMN phone TYPE TEXT;\n\n-- Drop a column\nALTER TABLE employees DROP COLUMN phone;\n```\n\nSyntax varies slightly between database systems.",
    position: 37,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the statement to add an `email` column to the `customers` table.",
    back: "`ALTER TABLE ... ADD COLUMN` extends a table with a new column.",
    position: 38,
    codeSnippet: "{{ALTER TABLE}} customers\n{{ADD COLUMN}} email VARCHAR(255);",
    blankAnswers: ["ALTER TABLE", "ADD COLUMN"],
  },

  // ──────────────────────────────────────────────
  // 10. Constraints
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What are the five main SQL constraints?",
    back: "1. **PRIMARY KEY** - uniquely identifies each row; implies `NOT NULL` + `UNIQUE`\n2. **FOREIGN KEY** - enforces referential integrity to another table\n3. **NOT NULL** - prevents `NULL` values in a column\n4. **UNIQUE** - ensures all values in a column are different\n5. **CHECK** - validates that values meet a specified condition\n\n```sql\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT REFERENCES customers(id),\n  amount DECIMAL NOT NULL CHECK (amount > 0)\n);\n```",
    position: 39,
  },
  {
    type: "STANDARD",
    front: "What is a foreign key and why is it important?",
    back: "A foreign key is a column (or set of columns) that references the primary key of another table. It enforces **referential integrity**, ensuring that relationships between tables remain valid.\n\n```sql\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id)\n    REFERENCES customers(id)\n    ON DELETE CASCADE\n);\n```\n\n`ON DELETE CASCADE` automatically deletes child rows when the parent is deleted.",
    position: 40,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the table definition with a primary key and a foreign key constraint.",
    back: "`PRIMARY KEY` uniquely identifies rows. `FOREIGN KEY ... REFERENCES` links to another table.",
    position: 41,
    codeSnippet: "CREATE TABLE orders (\n  id INT {{PRIMARY KEY}},\n  customer_id INT,\n  {{FOREIGN KEY}} (customer_id)\n    {{REFERENCES}} customers(id)\n);",
    blankAnswers: ["PRIMARY KEY", "FOREIGN KEY", "REFERENCES"],
  },

  // ──────────────────────────────────────────────
  // 11. Indexes and performance
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What is an index in SQL and why is it used?",
    back: "An index is a data structure that speeds up data retrieval by allowing the database to find rows without scanning the entire table.\n\n```sql\nCREATE INDEX idx_employees_email\nON employees (email);\n```\n\n**Trade-offs:**\n- Faster `SELECT` / `WHERE` queries\n- Slower `INSERT`, `UPDATE`, `DELETE` (index must be maintained)\n- Uses additional disk space",
    position: 42,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the statement to create a unique index on the `email` column of the `users` table.",
    back: "A `UNIQUE` index enforces that no two rows can have the same value in the indexed column, combining an index with a uniqueness constraint.",
    position: 43,
    codeSnippet: "CREATE {{UNIQUE}} INDEX idx_users_email\nON {{users}} (email);",
    blankAnswers: ["UNIQUE", "users"],
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the statement to create an index on the `last_name` column of the `customers` table.",
    back: "`CREATE INDEX` builds a lookup structure for faster queries on the indexed column.",
    position: 44,
    codeSnippet: "{{CREATE INDEX}} idx_customers_lastname\n{{ON}} customers (last_name);",
    blankAnswers: ["CREATE INDEX", "ON"],
  },

  // ──────────────────────────────────────────────
  // 12. CASE expressions
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "How does the `CASE` expression work in SQL?",
    back: "`CASE` provides conditional logic within a query, similar to if/else.\n\n```sql\nSELECT name, salary,\n  CASE\n    WHEN salary >= 100000 THEN 'Senior'\n    WHEN salary >= 60000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS level\nFROM employees;\n```\n\n`CASE` can be used in `SELECT`, `WHERE`, `ORDER BY`, and `UPDATE` statements.",
    position: 45,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the `CASE` expression to categorize products by price range.",
    back: "`CASE WHEN ... THEN ... ELSE ... END` evaluates conditions in order and returns the first match.",
    position: 46,
    codeSnippet: "SELECT name, price,\n  {{CASE}}\n    {{WHEN}} price > 100 THEN 'Expensive'\n    WHEN price > 50 THEN 'Moderate'\n    {{ELSE}} 'Cheap'\n  {{END}} AS category\nFROM products;",
    blankAnswers: ["CASE", "WHEN", "ELSE", "END"],
  },
  {
    type: "CODE",
    front: "Write JavaScript that simulates a SQL `CASE` expression: categorize an array of employees into salary tiers ('High', 'Medium', 'Low') and log the result.",
    back: "A SQL `CASE` expression is analogous to if/else logic applied to each row.",
    position: 47,
    codeTemplate: `const employees = [
  { name: "Alice", salary: 120000 },
  { name: "Bob", salary: 65000 },
  { name: "Carol", salary: 40000 },
];

// Categorize: >= 100k = "High", >= 60k = "Medium", else "Low"
const result = [];

console.log(JSON.stringify(result));`,
    codeLanguage: "javascript",
    expectedOutput: '[{"name":"Alice","tier":"High"},{"name":"Bob","tier":"Medium"},{"name":"Carol","tier":"Low"}]',
  },

  // ──────────────────────────────────────────────
  // 13. String functions and date functions
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "Name four commonly used SQL string functions.",
    back: "1. `UPPER(str)` / `LOWER(str)` - changes case\n2. `LENGTH(str)` - returns string length\n3. `SUBSTRING(str, start, length)` - extracts a portion\n4. `CONCAT(str1, str2)` - joins strings together\n\n```sql\nSELECT UPPER(name),\n       LENGTH(email),\n       CONCAT(first_name, ' ', last_name)\nFROM users;\n```",
    position: 48,
  },
  {
    type: "STANDARD",
    front: "Name three commonly used SQL date functions.",
    back: "1. `NOW()` / `CURRENT_TIMESTAMP` - returns current date and time\n2. `DATE_PART('year', date)` or `EXTRACT(YEAR FROM date)` - extracts part of a date\n3. `DATE_TRUNC('month', date)` - truncates date to specified precision\n\n```sql\nSELECT name,\n       EXTRACT(YEAR FROM hire_date) AS hire_year,\n       NOW() - hire_date AS tenure\nFROM employees;\n```\n\nSyntax varies between database systems.",
    position: 49,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to get the uppercase name and the first 3 characters of each product code.",
    back: "`UPPER()` converts text to uppercase; `SUBSTRING()` extracts a portion of a string.",
    position: 50,
    codeSnippet: "SELECT {{UPPER}}(name) AS upper_name,\n       {{SUBSTRING}}(code, 1, 3) AS code_prefix\nFROM products;",
    blankAnswers: ["UPPER", "SUBSTRING"],
  },

  // ──────────────────────────────────────────────
  // 14. Window functions basics
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "What are window functions in SQL and how do they differ from aggregate functions?",
    back: "Window functions perform calculations across a set of related rows (a \"window\") without collapsing them into a single row.\n\n```sql\nSELECT name, department, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC)\n    AS dept_rank\nFROM employees;\n```\n\nUnlike `GROUP BY` aggregates, window functions keep all individual rows in the result.",
    position: 51,
  },
  {
    type: "STANDARD",
    front: "What is the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`?",
    back: "All assign a number to each row within a partition, but handle ties differently:\n\n- `ROW_NUMBER()` - unique sequential number, no ties (1, 2, 3, 4)\n- `RANK()` - same rank for ties, skips numbers (1, 2, 2, 4)\n- `DENSE_RANK()` - same rank for ties, no gaps (1, 2, 2, 3)\n\n```sql\nSELECT name, salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,\n  RANK() OVER (ORDER BY salary DESC) AS rnk,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk\nFROM employees;\n```",
    position: 52,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to assign a row number to employees within each department, ordered by salary descending.",
    back: "`ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` assigns sequential numbers within each partition.",
    position: 53,
    codeSnippet: "SELECT name, department, salary,\n  {{ROW_NUMBER}}() OVER (\n    {{PARTITION BY}} department\n    ORDER BY salary DESC\n  ) AS dept_rank\nFROM employees;",
    blankAnswers: ["ROW_NUMBER", "PARTITION BY"],
  },
  {
    type: "CODE",
    front: "Write JavaScript that simulates `ROW_NUMBER() OVER (ORDER BY score DESC)` on an array of students. Log the result with each student's rank.",
    back: "`ROW_NUMBER()` assigns a unique sequential integer to each row based on the specified ordering.",
    position: 54,
    codeTemplate: `const students = [
  { name: "Alice", score: 92 },
  { name: "Bob", score: 88 },
  { name: "Carol", score: 95 },
  { name: "Dave", score: 88 },
];

// Sort by score DESC and assign row numbers
const ranked = [];

console.log(JSON.stringify(ranked));`,
    codeLanguage: "javascript",
    expectedOutput: '[{"name":"Carol","score":95,"row_number":1},{"name":"Alice","score":92,"row_number":2},{"name":"Bob","score":88,"row_number":3},{"name":"Dave","score":88,"row_number":4}]',
  },

  // ──────────────────────────────────────────────
  // 15. NULL handling
  // ──────────────────────────────────────────────
  {
    type: "STANDARD",
    front: "How do you check for `NULL` values in SQL?",
    back: "Use `IS NULL` and `IS NOT NULL` to check for `NULL`. You **cannot** use `=` or `<>` with `NULL`.\n\n```sql\n-- Correct\nSELECT * FROM employees WHERE manager_id IS NULL;\n\n-- Wrong (never matches)\nSELECT * FROM employees WHERE manager_id = NULL;\n```\n\n`NULL` represents the absence of a value. Any comparison with `NULL` using `=` returns `NULL` (not `TRUE` or `FALSE`).",
    position: 55,
  },
  {
    type: "STANDARD",
    front: "What do `COALESCE` and `NULLIF` do in SQL?",
    back: "`COALESCE` returns the first non-`NULL` value from its arguments:\n```sql\nSELECT COALESCE(nickname, first_name, 'Unknown') AS display_name\nFROM users;\n```\n\n`NULLIF` returns `NULL` if two values are equal, otherwise returns the first value:\n```sql\n-- Avoids division by zero\nSELECT total / NULLIF(count, 0) AS average\nFROM stats;\n```",
    position: 56,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the query to display a fallback value when `phone` is `NULL`.",
    back: "`COALESCE` returns the first non-NULL argument, providing a fallback default value.",
    position: 57,
    codeSnippet: "SELECT name,\n  {{COALESCE}}(phone, 'N/A') AS phone_number\nFROM customers\nWHERE email IS {{NOT NULL}};",
    blankAnswers: ["COALESCE", "NOT NULL"],
  },
  {
    type: "CODE",
    front: "Write JavaScript that simulates `COALESCE` behavior: given an array of user objects with optional fields, log the first non-null display value from `nickname`, `first_name`, or `'Anonymous'`.",
    back: "`COALESCE` returns the first non-NULL value in its argument list. The JavaScript `??` (nullish coalescing) operator behaves similarly.",
    position: 58,
    codeTemplate: `const users = [
  { nickname: null, first_name: "Alice" },
  { nickname: "Bobby", first_name: "Robert" },
  { nickname: null, first_name: null },
];

// Simulate COALESCE(nickname, first_name, 'Anonymous')
const results = [];

console.log(JSON.stringify(results));`,
    codeLanguage: "javascript",
    expectedOutput: '["Alice","Bobby","Anonymous"]',
  },
  {
    type: "CODE",
    front: "Write JavaScript that constructs a `SELECT` query with a `LEFT JOIN`, `WHERE`, and `ORDER BY` clause. The query should find all customers and their order totals, filtering for totals over 500, ordered by total descending.",
    back: "Complex queries combine multiple clauses. Building them programmatically helps understand the clause ordering: `SELECT ... FROM ... JOIN ... WHERE ... ORDER BY`.",
    position: 59,
    codeTemplate: `// Build a complex query step by step
const parts = {
  select: "",
  from: "",
  join: "",
  where: "",
  orderBy: "",
};

const query = Object.values(parts).filter(Boolean).join("\\n");
console.log(query);`,
    codeLanguage: "javascript",
    expectedOutput:
      "SELECT c.name, SUM(o.amount) AS total\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.amount > 500\nORDER BY total DESC;",
  },
];
