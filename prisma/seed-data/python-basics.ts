type Card = {
  type: "STANDARD" | "CODE" | "FILL_IN_BLANK";
  front: string;
  back: string;
  position: number;
  codeTemplate?: string;
  codeLanguage?: "python";
  expectedOutput?: string;
  codeSnippet?: string;
  blankAnswers?: string[];
};

export const pythonBasicsCards: Card[] = [
  // ============================================================
  // TOPIC 1: Variables and Data Types (cards 0-11)
  // ============================================================
  {
    type: "STANDARD",
    front: "What are the four basic built-in data types in Python?",
    back: "The four basic built-in data types are:\n\n- `int` -- integers (e.g. `42`)\n- `float` -- decimal numbers (e.g. `3.14`)\n- `str` -- strings (e.g. `\"hello\"`)\n- `bool` -- booleans (`True` or `False`)",
    position: 0,
  },
  {
    type: "STANDARD",
    front: "How do you check the type of a variable in Python?",
    back: "Use the built-in `type()` function.\n\n```python\nx = 42\nprint(type(x))  # <class 'int'>\n```",
    position: 1,
  },
  {
    type: "STANDARD",
    front: "What is the difference between `int` and `float` in Python?",
    back: "`int` represents whole numbers without a decimal point (e.g. `5`, `-3`). `float` represents numbers with a decimal point (e.g. `5.0`, `-3.14`). Dividing two integers with `/` always produces a `float`.",
    position: 2,
  },
  {
    type: "CODE",
    front: "Create variables for your name (string), age (int), height in meters (float), and whether you are a student (bool). Print each variable.",
    back: "Each variable is assigned with `=`. Python infers the type automatically based on the value you assign.",
    position: 3,
    codeTemplate: "# Write your code here\nname = \nage = \nheight = \nis_student = \n\nprint(name)\nprint(age)\nprint(height)\nprint(is_student)",
    codeLanguage: "python",
    expectedOutput: "Alice\n25\n1.68\nTrue",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to convert a string to an integer and a float.",
    back: "Use `int()` to convert to an integer and `float()` to convert to a floating-point number. These are called type-casting functions.",
    position: 4,
    codeSnippet: 'num_str = "42"\nnum_int = {{int}}(num_str)\nnum_float = {{float}}(num_str)\nprint(num_int, num_float)',
    blankAnswers: ["int", "float"],
  },
  {
    type: "STANDARD",
    front: "What happens when you add a string and an integer in Python, e.g. `\"age: \" + 25`?",
    back: "Python raises a `TypeError`. You cannot concatenate a `str` and an `int` directly. You must convert the integer to a string first:\n\n```python\n\"age: \" + str(25)\n```",
    position: 5,
  },
  {
    type: "CODE",
    front: "Write code that swaps the values of two variables `a` and `b` without using a temporary variable, then print both.",
    back: "Python supports tuple unpacking which allows elegant variable swapping in a single line: `a, b = b, a`.",
    position: 6,
    codeTemplate: "a = 10\nb = 20\n\n# Write your code here to swap a and b\n\nprint(a)\nprint(b)",
    codeLanguage: "python",
    expectedOutput: "20\n10",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to check if a value is of type `str`.",
    back: "`isinstance()` checks whether an object is an instance of a given class or type. It returns `True` or `False`.",
    position: 7,
    codeSnippet: 'value = "hello"\nresult = {{isinstance}}(value, {{str}})\nprint(result)',
    blankAnswers: ["isinstance", "str"],
  },
  {
    type: "STANDARD",
    front: "What is the result of `True + True + False` in Python?",
    back: "The result is `2`. In Python, `bool` is a subclass of `int`. `True` equals `1` and `False` equals `0`, so `1 + 1 + 0 = 2`.",
    position: 8,
  },
  {
    type: "CODE",
    front: "Write code that uses `//` (floor division) and `%` (modulo) to find the quotient and remainder of 17 divided by 5. Print both.",
    back: "`//` performs integer (floor) division, discarding the decimal. `%` gives the remainder after division.",
    position: 9,
    codeTemplate: "# Write your code here\nquotient = \nremainder = \n\nprint(quotient)\nprint(remainder)",
    codeLanguage: "python",
    expectedOutput: "3\n2",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the multiple assignment statement.",
    back: "Python allows you to assign multiple variables in a single line using comma-separated values. This is called multiple assignment or tuple unpacking.",
    position: 10,
    codeSnippet: 'x, y, z = 1, {{2}}, {{3}}\nprint(x + y + z)',
    blankAnswers: ["2", "3"],
  },
  {
    type: "STANDARD",
    front: "What is `None` in Python?",
    back: "`None` is Python's null value. It represents the absence of a value. It is its own type (`NoneType`). Functions that don't explicitly return a value return `None` by default. Use `is None` (not `== None`) to check for it.",
    position: 11,
  },

  // ============================================================
  // TOPIC 2: String Methods and Formatting (cards 12-19)
  // ============================================================
  {
    type: "STANDARD",
    front: "Name five commonly used string methods in Python.",
    back: "Common string methods include:\n\n- `upper()` / `lower()` -- change case\n- `strip()` -- remove leading/trailing whitespace\n- `split()` -- split string into a list\n- `replace(old, new)` -- replace substrings\n- `find(sub)` -- find index of substring (-1 if not found)",
    position: 12,
  },
  {
    type: "CODE",
    front: "Given `text = \"  Hello, World!  \"`, strip whitespace, convert to uppercase, and print the result.",
    back: "String methods can be chained. `strip()` removes leading/trailing whitespace, and `upper()` converts all characters to uppercase.",
    position: 13,
    codeTemplate: 'text = "  Hello, World!  "\n\n# Write your code here\nresult = \n\nprint(result)',
    codeLanguage: "python",
    expectedOutput: "HELLO, WORLD!",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the f-string to insert the variable values.",
    back: "F-strings (formatted string literals) are prefixed with `f` and use curly braces `{}` to embed expressions directly inside strings. They were introduced in Python 3.6.",
    position: 14,
    codeSnippet: 'name = "Alice"\nage = 30\nprint({{f}}"My name is {name} and I am {age} years old.")',
    blankAnswers: ["f"],
  },
  {
    type: "CODE",
    front: "Write code to count how many times the letter `\"a\"` appears in `\"banana\"` using a string method. Print the count.",
    back: "The `count()` string method returns the number of non-overlapping occurrences of a substring.",
    position: 15,
    codeTemplate: 'word = "banana"\n\n# Write your code here\n\nprint(result)',
    codeLanguage: "python",
    expectedOutput: "3",
  },
  {
    type: "STANDARD",
    front: "What is string slicing and how does it work?",
    back: "String slicing extracts a portion of a string using `[start:stop:step]`.\n\n- `start` is inclusive (default 0)\n- `stop` is exclusive (default end)\n- `step` is the increment (default 1)\n\n```python\ns = \"Python\"\ns[0:3]   # \"Pyt\"\ns[::-1]  # \"nohtyP\" (reversed)\n```",
    position: 16,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to split a sentence into words and join them with hyphens.",
    back: "`split()` breaks a string into a list of substrings. `join()` concatenates an iterable of strings with a separator.",
    position: 17,
    codeSnippet: 'sentence = "hello world python"\nwords = sentence.{{split}}()\nresult = "-".{{join}}(words)\nprint(result)',
    blankAnswers: ["split", "join"],
  },
  {
    type: "CODE",
    front: "Write code to check if the string `\"Hello123\"` contains only alphanumeric characters. Print the boolean result.",
    back: "The `isalnum()` string method returns `True` if all characters are alphanumeric (letters or digits) and the string is non-empty.",
    position: 18,
    codeTemplate: 'text = "Hello123"\n\n# Write your code here\n\nprint(result)',
    codeLanguage: "python",
    expectedOutput: "True",
  },
  {
    type: "STANDARD",
    front: "What is the difference between `\"hello\" == \"Hello\"` and `\"hello\".lower() == \"Hello\".lower()`?",
    back: "String comparison in Python is case-sensitive. `\"hello\" == \"Hello\"` returns `False` because `h` and `H` differ. Converting both to the same case with `.lower()` makes `\"hello\" == \"hello\"` which returns `True`.",
    position: 19,
  },

  // ============================================================
  // TOPIC 3: Lists, Tuples, and Sets (cards 20-29)
  // ============================================================
  {
    type: "STANDARD",
    front: "What are the key differences between lists, tuples, and sets in Python?",
    back: "- **List** (`[]`): ordered, mutable, allows duplicates\n- **Tuple** (`()`): ordered, immutable, allows duplicates\n- **Set** (`{}`): unordered, mutable, no duplicates\n\nUse lists for collections that change, tuples for fixed data, and sets for unique elements.",
    position: 20,
  },
  {
    type: "CODE",
    front: "Create a list of numbers `[3, 1, 4, 1, 5]`. Sort it in ascending order and print the sorted list.",
    back: "The `sort()` method sorts a list in-place and returns `None`. Alternatively, `sorted()` returns a new sorted list without modifying the original.",
    position: 21,
    codeTemplate: "numbers = [3, 1, 4, 1, 5]\n\n# Write your code here\n\nprint(numbers)",
    codeLanguage: "python",
    expectedOutput: "[1, 1, 3, 4, 5]",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to add an element to a list and remove the first occurrence of a value.",
    back: "`append()` adds an element to the end of a list. `remove()` removes the first occurrence of the specified value.",
    position: 22,
    codeSnippet: 'fruits = ["apple", "banana"]\nfruits.{{append}}("cherry")\nfruits.{{remove}}("banana")\nprint(fruits)',
    blankAnswers: ["append", "remove"],
  },
  {
    type: "STANDARD",
    front: "How do you access the last element of a list in Python?",
    back: "Use negative indexing: `my_list[-1]` returns the last element. Similarly, `my_list[-2]` returns the second-to-last element. This works because negative indices count from the end.",
    position: 23,
  },
  {
    type: "CODE",
    front: "Create a set from the list `[1, 2, 2, 3, 3, 3]` to remove duplicates, then print the length of the set.",
    back: "Converting a list to a set automatically removes duplicate elements. `len()` returns the number of elements.",
    position: 24,
    codeTemplate: "numbers = [1, 2, 2, 3, 3, 3]\n\n# Write your code here\n\nprint(len(unique))",
    codeLanguage: "python",
    expectedOutput: "3",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to unpack a tuple into individual variables.",
    back: "Tuple unpacking assigns each element of a tuple to a separate variable. The number of variables must match the number of elements.",
    position: 25,
    codeSnippet: 'coordinates = (10, 20, 30)\n{{x}}, {{y}}, {{z}} = coordinates\nprint(x, y, z)',
    blankAnswers: ["x", "y", "z"],
  },
  {
    type: "CODE",
    front: "Given two sets `a = {1, 2, 3}` and `b = {2, 3, 4}`, print their intersection and union.",
    back: "Set intersection (`&` or `.intersection()`) returns common elements. Set union (`|` or `.union()`) returns all unique elements from both sets.",
    position: 26,
    codeTemplate: "a = {1, 2, 3}\nb = {2, 3, 4}\n\n# Write your code here\n\nprint(intersection)\nprint(union)",
    codeLanguage: "python",
    expectedOutput: "{2, 3}\n{1, 2, 3, 4}",
  },
  {
    type: "STANDARD",
    front: "Why are tuples immutable, and when should you use them over lists?",
    back: "Tuples cannot be modified after creation -- you cannot add, remove, or change elements. Use tuples when:\n\n- Data should not change (e.g. coordinates, RGB values)\n- You need a hashable type (e.g. as dictionary keys)\n- You want slightly better performance than lists\n- You want to signal intent that the data is fixed",
    position: 27,
  },
  {
    type: "CODE",
    front: "Write code to slice the list `[10, 20, 30, 40, 50]` to get the sublist `[20, 30, 40]`. Print the result.",
    back: "List slicing uses the syntax `list[start:stop]` where `start` is inclusive and `stop` is exclusive. `list[1:4]` returns elements at indices 1, 2, and 3.",
    position: 28,
    codeTemplate: "numbers = [10, 20, 30, 40, 50]\n\n# Write your code here\n\nprint(result)",
    codeLanguage: "python",
    expectedOutput: "[20, 30, 40]",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to check membership in a list.",
    back: "The `in` keyword checks whether a value exists in a sequence (list, tuple, set, string, etc.). It returns a boolean.",
    position: 29,
    codeSnippet: 'fruits = ["apple", "banana", "cherry"]\nprint("banana" {{in}} fruits)\nprint("grape" {{not in}} fruits)',
    blankAnswers: ["in", "not in"],
  },

  // ============================================================
  // TOPIC 4: Dictionaries (cards 30-37)
  // ============================================================
  {
    type: "STANDARD",
    front: "What is a dictionary in Python and how is it structured?",
    back: "A dictionary (`dict`) is an unordered collection of key-value pairs. Keys must be unique and hashable (strings, numbers, tuples). Values can be any type.\n\n```python\nperson = {\"name\": \"Alice\", \"age\": 30}\n```\n\nAccess values with `person[\"name\"]` or `person.get(\"name\")`.",
    position: 30,
  },
  {
    type: "CODE",
    front: "Create a dictionary with keys `\"name\"`, `\"age\"`, and `\"city\"`. Print each value using bracket notation.",
    back: "Dictionaries store key-value pairs. Access values using `dict[key]` syntax. This raises `KeyError` if the key doesn't exist.",
    position: 31,
    codeTemplate: "# Write your code here\nperson = \n\nprint(person[\"name\"])\nprint(person[\"age\"])\nprint(person[\"city\"])",
    codeLanguage: "python",
    expectedOutput: "Alice\n30\nNew York",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to safely get a value from a dictionary with a default.",
    back: "The `get()` method returns the value for a key if it exists, otherwise returns the default value (second argument). This avoids `KeyError` exceptions.",
    position: 32,
    codeSnippet: 'person = {"name": "Alice", "age": 30}\ncountry = person.{{get}}("country", {{\"Unknown\"}})\nprint(country)',
    blankAnswers: ["get", '"Unknown"'],
  },
  {
    type: "CODE",
    front: "Given a dictionary `scores = {\"alice\": 85, \"bob\": 92, \"charlie\": 78}`, iterate over it and print each name with their score.",
    back: "Use `.items()` to iterate over key-value pairs. This returns tuples of `(key, value)` that can be unpacked in the loop.",
    position: 33,
    codeTemplate: 'scores = {"alice": 85, "bob": 92, "charlie": 78}\n\n# Write your code here',
    codeLanguage: "python",
    expectedOutput: "alice: 85\nbob: 92\ncharlie: 78",
  },
  {
    type: "STANDARD",
    front: "What is the difference between `dict[key]` and `dict.get(key)`?",
    back: "`dict[key]` raises a `KeyError` if the key doesn't exist. `dict.get(key)` returns `None` if the key doesn't exist (or a custom default if provided as a second argument). Use `.get()` when you're unsure if a key exists.",
    position: 34,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to get all keys and all values from a dictionary.",
    back: "`.keys()` returns a view of all keys, `.values()` returns a view of all values. These views are dynamic and reflect changes to the dictionary.",
    position: 35,
    codeSnippet: 'data = {"a": 1, "b": 2, "c": 3}\nall_keys = list(data.{{keys}}())\nall_values = list(data.{{values}}())\nprint(all_keys)\nprint(all_values)',
    blankAnswers: ["keys", "values"],
  },
  {
    type: "CODE",
    front: "Write code to merge two dictionaries `d1 = {\"a\": 1, \"b\": 2}` and `d2 = {\"c\": 3, \"d\": 4}` into a new dictionary. Print the result.",
    back: "In Python 3.5+, you can merge dictionaries with `{**d1, **d2}`. In Python 3.9+, you can also use `d1 | d2`.",
    position: 36,
    codeTemplate: 'd1 = {"a": 1, "b": 2}\nd2 = {"c": 3, "d": 4}\n\n# Write your code here\n\nprint(merged)',
    codeLanguage: "python",
    expectedOutput: "{'a': 1, 'b': 2, 'c': 3, 'd': 4}",
  },
  {
    type: "STANDARD",
    front: "How do you delete a key-value pair from a dictionary?",
    back: "There are several ways:\n\n- `del dict[key]` -- removes the pair, raises `KeyError` if missing\n- `dict.pop(key)` -- removes and returns the value, raises `KeyError` if missing\n- `dict.pop(key, default)` -- removes and returns value, returns `default` if missing\n- `dict.clear()` -- removes all pairs",
    position: 37,
  },

  // ============================================================
  // TOPIC 5: Control Flow (cards 38-44)
  // ============================================================
  {
    type: "STANDARD",
    front: "What is the syntax for `if`/`elif`/`else` in Python?",
    back: "```python\nif condition1:\n    # runs if condition1 is True\nelif condition2:\n    # runs if condition2 is True\nelse:\n    # runs if no condition was True\n```\n\nPython uses indentation (not braces) to define blocks. The colon `:` is required after each condition.",
    position: 38,
  },
  {
    type: "CODE",
    front: "Write a program that checks if a number is positive, negative, or zero and prints the appropriate message.",
    back: "Use `if`/`elif`/`else` to handle multiple conditions. Only one branch executes -- the first one whose condition is `True`.",
    position: 39,
    codeTemplate: "num = -5\n\n# Write your code here",
    codeLanguage: "python",
    expectedOutput: "Negative",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the conditional expression (ternary operator).",
    back: "Python's ternary operator has the syntax `value_if_true if condition else value_if_false`. It's a concise way to write simple `if/else` statements in a single line.",
    position: 40,
    codeSnippet: 'age = 20\nstatus = "adult" {{if}} age >= 18 {{else}} "minor"\nprint(status)',
    blankAnswers: ["if", "else"],
  },
  {
    type: "STANDARD",
    front: "What are truthy and falsy values in Python?",
    back: "**Falsy values** evaluate to `False` in a boolean context:\n- `False`, `None`, `0`, `0.0`\n- Empty sequences: `\"\"`, `[]`, `()`, `{}`\n- Empty set: `set()`\n\n**Everything else is truthy**, including non-zero numbers, non-empty strings, and non-empty collections.",
    position: 41,
  },
  {
    type: "CODE",
    front: "Write code that uses logical operators (`and`, `or`, `not`) to check if a number is between 1 and 100 (inclusive). Print the boolean result for `num = 50`.",
    back: "Python uses `and`, `or`, and `not` as logical operators (not `&&`, `||`, `!`). Chain comparisons are also supported: `1 <= num <= 100`.",
    position: 42,
    codeTemplate: "num = 50\n\n# Write your code here\n\nprint(result)",
    codeLanguage: "python",
    expectedOutput: "True",
  },
  {
    type: "STANDARD",
    front: "What is short-circuit evaluation in Python?",
    back: "Python evaluates boolean expressions lazily:\n\n- `and` stops at the first `False` value and returns it\n- `or` stops at the first `True` value and returns it\n\n```python\n0 and print(\"skip\")  # 0 (print never runs)\n1 or print(\"skip\")   # 1 (print never runs)\n```\n\nThis is useful for guard clauses and default values.",
    position: 43,
  },
  {
    type: "CODE",
    front: "Write code to classify a score: 90+ is `\"A\"`, 80+ is `\"B\"`, 70+ is `\"C\"`, below 70 is `\"F\"`. Print the grade for `score = 85`.",
    back: "Use `if`/`elif`/`else` chains to check ranges. Order matters -- check from highest to lowest since `elif` only runs if all previous conditions were `False`.",
    position: 44,
    codeTemplate: "score = 85\n\n# Write your code here\n\nprint(grade)",
    codeLanguage: "python",
    expectedOutput: "B",
  },

  // ============================================================
  // TOPIC 6: Loops (cards 45-54)
  // ============================================================
  {
    type: "STANDARD",
    front: "What are the two types of loops in Python?",
    back: "- **`for` loop**: iterates over a sequence (list, string, range, etc.)\n- **`while` loop**: repeats as long as a condition is `True`\n\n```python\nfor i in range(5):    # 0, 1, 2, 3, 4\n    print(i)\n\nwhile x > 0:\n    x -= 1\n```",
    position: 45,
  },
  {
    type: "CODE",
    front: "Write a `for` loop that prints the numbers 1 through 5 using `range()`.",
    back: "`range(start, stop)` generates numbers from `start` (inclusive) to `stop` (exclusive). `range(1, 6)` produces 1, 2, 3, 4, 5.",
    position: 46,
    codeTemplate: "# Write your code here",
    codeLanguage: "python",
    expectedOutput: "1\n2\n3\n4\n5",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the `while` loop to count down from 3.",
    back: "A `while` loop runs as long as its condition is `True`. Make sure to update the variable in the loop body to avoid an infinite loop.",
    position: 47,
    codeSnippet: "count = 3\n{{while}} count > 0:\n    print(count)\n    count {{-=}} 1",
    blankAnswers: ["while", "-="],
  },
  {
    type: "CODE",
    front: "Write a loop that iterates over the list `[10, 20, 30, 40, 50]` and prints only values greater than 25.",
    back: "Combine a `for` loop with an `if` statement to filter elements during iteration.",
    position: 48,
    codeTemplate: "numbers = [10, 20, 30, 40, 50]\n\n# Write your code here",
    codeLanguage: "python",
    expectedOutput: "30\n40\n50",
  },
  {
    type: "STANDARD",
    front: "What do `break` and `continue` do in a loop?",
    back: "- `break` immediately exits the entire loop\n- `continue` skips the rest of the current iteration and moves to the next one\n\n```python\nfor i in range(5):\n    if i == 3:\n        break     # stops loop at 3\n    if i == 1:\n        continue  # skips printing 1\n    print(i)\n```",
    position: 49,
  },
  {
    type: "CODE",
    front: "Use `enumerate()` to print each item in `[\"a\", \"b\", \"c\"]` with its index.",
    back: "`enumerate()` returns pairs of `(index, value)` for each element, letting you track position without a manual counter.",
    position: 50,
    codeTemplate: 'items = ["a", "b", "c"]\n\n# Write your code here',
    codeLanguage: "python",
    expectedOutput: "0: a\n1: b\n2: c",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to iterate over two lists simultaneously using `zip()`.",
    back: "`zip()` pairs elements from multiple iterables together. It stops when the shortest iterable is exhausted.",
    position: 51,
    codeSnippet: 'names = ["Alice", "Bob"]\nages = [25, 30]\nfor name, age in {{zip}}(names, ages):\n    print(f"{{{}}}name} is {age}")',
    blankAnswers: ["zip", "{"],
  },
  {
    type: "CODE",
    front: "Write a `for` loop that sums all even numbers from 1 to 20 (inclusive). Print the total.",
    back: "Use `range(2, 21, 2)` to generate even numbers, or use `range(1, 21)` with an `if` check for `% 2 == 0`.",
    position: 52,
    codeTemplate: "# Write your code here\n\nprint(total)",
    codeLanguage: "python",
    expectedOutput: "110",
  },
  {
    type: "STANDARD",
    front: "What does the `else` clause do on a `for` or `while` loop?",
    back: "The `else` block after a loop runs only if the loop completed without hitting a `break` statement.\n\n```python\nfor n in range(5):\n    if n == 10:\n        break\nelse:\n    print(\"Loop completed\")  # This prints\n```\n\nIf `break` is triggered, the `else` block is skipped.",
    position: 53,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the nested loop to create a multiplication pair.",
    back: "Nested loops iterate through all combinations of the outer and inner sequences. The inner loop completes fully for each iteration of the outer loop.",
    position: 54,
    codeSnippet: "for i in {{range}}(1, 3):\n    for j in range(1, {{3}}):\n        print(f\"{i} x {j} = {i * j}\")",
    blankAnswers: ["range", "3"],
  },

  // ============================================================
  // TOPIC 7: Functions (cards 55-64)
  // ============================================================
  {
    type: "STANDARD",
    front: "How do you define a function in Python?",
    back: "Use the `def` keyword:\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n```\n\n- `def` starts the definition\n- Parameters go in parentheses\n- The body is indented\n- `return` sends back a value (optional)",
    position: 55,
  },
  {
    type: "CODE",
    front: "Write a function `add(a, b)` that returns the sum of two numbers. Call it with `3` and `7` and print the result.",
    back: "Functions are defined with `def`, take parameters, and use `return` to send a value back to the caller.",
    position: 56,
    codeTemplate: "# Write your code here\n\nresult = add(3, 7)\nprint(result)",
    codeLanguage: "python",
    expectedOutput: "10",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the function with a default parameter value.",
    back: "Default parameters provide a fallback value when the argument is not passed. They must come after non-default parameters in the function definition.",
    position: 57,
    codeSnippet: 'def greet(name, greeting={{\"Hello\"}}):\n    {{return}} f"{greeting}, {name}!"\n\nprint(greet("Alice"))\nprint(greet("Bob", "Hi"))',
    blankAnswers: ['"Hello"', "return"],
  },
  {
    type: "CODE",
    front: "Write a function `is_even(n)` that returns `True` if a number is even, `False` otherwise. Test it with 4 and 7.",
    back: "Use the modulo operator `%` to check divisibility. `n % 2 == 0` means `n` is even.",
    position: 58,
    codeTemplate: "# Write your code here\n\nprint(is_even(4))\nprint(is_even(7))",
    codeLanguage: "python",
    expectedOutput: "True\nFalse",
  },
  {
    type: "STANDARD",
    front: "What is the difference between `*args` and `**kwargs`?",
    back: "- `*args` collects extra positional arguments into a **tuple**\n- `**kwargs` collects extra keyword arguments into a **dictionary**\n\n```python\ndef func(*args, **kwargs):\n    print(args)    # (1, 2, 3)\n    print(kwargs)  # {'name': 'Alice'}\n\nfunc(1, 2, 3, name='Alice')\n```",
    position: 59,
  },
  {
    type: "CODE",
    front: "Write a function `multiply_all(*args)` that takes any number of arguments and returns their product. Test with `multiply_all(2, 3, 4)`.",
    back: "`*args` allows a function to accept any number of positional arguments as a tuple. Iterate over them to compute the product.",
    position: 60,
    codeTemplate: "# Write your code here\n\nprint(multiply_all(2, 3, 4))",
    codeLanguage: "python",
    expectedOutput: "24",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the lambda (anonymous) function.",
    back: "Lambda functions are small anonymous functions defined with the `lambda` keyword. They can take any number of arguments but have only one expression.",
    position: 61,
    codeSnippet: "square = {{lambda}} x: x ** {{2}}\nprint(square(5))",
    blankAnswers: ["lambda", "2"],
  },
  {
    type: "STANDARD",
    front: "What is variable scope in Python functions?",
    back: "Python follows the **LEGB** rule for name resolution:\n\n- **L**ocal: inside the current function\n- **E**nclosing: in enclosing function(s)\n- **G**lobal: at module level\n- **B**uilt-in: Python's built-in names\n\nVariables defined inside a function are local and not accessible outside. Use `global` keyword to modify a global variable from within a function.",
    position: 62,
  },
  {
    type: "CODE",
    front: "Write a function `fizzbuzz(n)` that returns `\"FizzBuzz\"` if `n` is divisible by both 3 and 5, `\"Fizz\"` if only by 3, `\"Buzz\"` if only by 5, or `str(n)` otherwise. Test with 15, 9, 10, and 7.",
    back: "Check divisibility using `%`. Check the combined condition first (divisible by both 3 and 5) before individual conditions.",
    position: 63,
    codeTemplate: "# Write your code here\n\nprint(fizzbuzz(15))\nprint(fizzbuzz(9))\nprint(fizzbuzz(10))\nprint(fizzbuzz(7))",
    codeLanguage: "python",
    expectedOutput: "FizzBuzz\nFizz\nBuzz\n7",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the function that uses a type hint and docstring.",
    back: "Type hints annotate parameter and return types. They don't enforce types at runtime but help with documentation and IDE support. Docstrings describe what the function does.",
    position: 64,
    codeSnippet: 'def square(n: {{int}}) -> int:\n    """Return the square of n."""\n    return n ** {{2}}\n\nprint(square(6))',
    blankAnswers: ["int", "2"],
  },

  // ============================================================
  // TOPIC 8: List Comprehensions (cards 65-70)
  // ============================================================
  {
    type: "STANDARD",
    front: "What is a list comprehension in Python?",
    back: "A list comprehension is a concise way to create lists:\n\n```python\n[expression for item in iterable if condition]\n```\n\nExample:\n```python\nsquares = [x**2 for x in range(5)]\n# [0, 1, 4, 9, 16]\n```\n\nIt is equivalent to a `for` loop with `.append()` but more Pythonic.",
    position: 65,
  },
  {
    type: "CODE",
    front: "Use a list comprehension to create a list of squares of numbers from 1 to 5. Print the result.",
    back: "List comprehensions follow the pattern `[expression for variable in iterable]`. The expression is evaluated for each element.",
    position: 66,
    codeTemplate: "# Write your code here\n\nprint(squares)",
    codeLanguage: "python",
    expectedOutput: "[1, 4, 9, 16, 25]",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the list comprehension with a filter condition.",
    back: "Add an `if` clause at the end of a list comprehension to filter elements. Only elements where the condition is `True` are included.",
    position: 67,
    codeSnippet: "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = [x {{for}} x in numbers {{if}} x % 2 == 0]\nprint(evens)",
    blankAnswers: ["for", "if"],
  },
  {
    type: "CODE",
    front: "Use a dictionary comprehension to create a dict mapping numbers 1-5 to their cubes. Print the result.",
    back: "Dictionary comprehensions use `{key: value for item in iterable}` syntax. They work just like list comprehensions but produce dictionaries.",
    position: 68,
    codeTemplate: "# Write your code here\n\nprint(cubes)",
    codeLanguage: "python",
    expectedOutput: "{1: 1, 2: 8, 3: 27, 4: 64, 5: 125}",
  },
  {
    type: "STANDARD",
    front: "What is a nested list comprehension?",
    back: "A nested list comprehension has multiple `for` clauses:\n\n```python\nmatrix = [[1, 2], [3, 4], [5, 6]]\nflat = [x for row in matrix for x in row]\n# [1, 2, 3, 4, 5, 6]\n```\n\nThe order reads left to right, like nested `for` loops. Use them sparingly for readability.",
    position: 69,
  },
  {
    type: "CODE",
    front: "Use a list comprehension to flatten the nested list `[[1, 2, 3], [4, 5], [6, 7, 8, 9]]` into a single list. Print the result.",
    back: "Nested list comprehensions iterate through the outer list first, then the inner elements: `[item for sublist in nested for item in sublist]`.",
    position: 70,
    codeTemplate: "nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]\n\n# Write your code here\n\nprint(flat)",
    codeLanguage: "python",
    expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
  },

  // ============================================================
  // TOPIC 9: Error Handling (cards 71-77)
  // ============================================================
  {
    type: "STANDARD",
    front: "What is the basic syntax for error handling in Python?",
    back: "```python\ntry:\n    # code that might raise an exception\nexcept ExceptionType as e:\n    # handle the exception\nelse:\n    # runs if no exception occurred\nfinally:\n    # always runs, exception or not\n```\n\n`else` and `finally` are optional. `except` can catch specific or general exceptions.",
    position: 71,
  },
  {
    type: "CODE",
    front: "Write a `try`/`except` block that catches a `ZeroDivisionError` when dividing 10 by 0 and prints an error message.",
    back: "`ZeroDivisionError` is raised when dividing by zero. Wrap the operation in `try` and catch the specific exception with `except`.",
    position: 72,
    codeTemplate: "# Write your code here",
    codeLanguage: "python",
    expectedOutput: "Cannot divide by zero!",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the error handling code to catch a specific exception.",
    back: "`try` wraps code that may raise an exception. `except` specifies which exception to catch. The `as` keyword binds the exception to a variable for inspection.",
    position: 73,
    codeSnippet: '{{try}}:\n    num = int("abc")\n{{except}} ValueError as e:\n    print(f"Error: {e}")',
    blankAnswers: ["try", "except"],
  },
  {
    type: "STANDARD",
    front: "Name five common built-in exceptions in Python.",
    back: "- `ValueError` -- wrong value type (e.g. `int(\"abc\")`)\n- `TypeError` -- wrong operation for the type\n- `KeyError` -- dictionary key not found\n- `IndexError` -- list index out of range\n- `FileNotFoundError` -- file doesn't exist\n\nOther common ones: `AttributeError`, `ZeroDivisionError`, `ImportError`, `NameError`.",
    position: 74,
  },
  {
    type: "CODE",
    front: "Write code that uses `try`/`except`/`else`/`finally` to safely convert user input. Use `\"42\"` as the input string.",
    back: "`else` runs when no exception occurs. `finally` always runs regardless of exceptions. This pattern is useful for cleanup operations.",
    position: 75,
    codeTemplate: 'user_input = "42"\n\n# Write your code here using try/except/else/finally\n# Convert user_input to int, print success or error, and "Done" in finally',
    codeLanguage: "python",
    expectedOutput: "Converted: 42\nDone",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to raise a custom exception.",
    back: "Use `raise` to throw an exception. You can raise built-in exceptions with a custom message or create custom exception classes by inheriting from `Exception`.",
    position: 76,
    codeSnippet: 'def validate_age(age):\n    if age < 0:\n        {{raise}} {{ValueError}}("Age cannot be negative")\n    return age\n\ntry:\n    validate_age(-1)\nexcept ValueError as e:\n    print(e)',
    blankAnswers: ["raise", "ValueError"],
  },
  {
    type: "CODE",
    front: "Write code that catches multiple exception types (`ValueError` and `TypeError`) in a single `except` clause. Test by converting `None` to an integer.",
    back: "Catch multiple exceptions by grouping them in a tuple: `except (ValueError, TypeError)`. This handles either exception with the same block.",
    position: 77,
    codeTemplate: "# Write your code here\n# Try to convert None to int and catch the appropriate exceptions",
    codeLanguage: "python",
    expectedOutput: "Caught an error: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'",
  },

  // ============================================================
  // TOPIC 10: File I/O Basics (cards 78-81)
  // ============================================================
  {
    type: "STANDARD",
    front: "How do you read a file in Python using the `with` statement?",
    back: "```python\nwith open(\"file.txt\", \"r\") as f:\n    content = f.read()\n```\n\nThe `with` statement ensures the file is properly closed after the block. Modes:\n- `\"r\"` -- read (default)\n- `\"w\"` -- write (overwrites)\n- `\"a\"` -- append\n- `\"x\"` -- exclusive create",
    position: 78,
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the code to write text to a file.",
    back: "Use `open()` with mode `\"w\"` to write. The `with` statement ensures the file is closed automatically. `write()` writes a string to the file.",
    position: 79,
    codeSnippet: '{{with}} open("output.txt", {{"w"}}) as f:\n    f.write("Hello, World!")',
    blankAnswers: ["with", '"w"'],
  },
  {
    type: "STANDARD",
    front: "What is the difference between `read()`, `readline()`, and `readlines()`?",
    back: "- `read()` -- reads the entire file as a single string\n- `readline()` -- reads one line at a time\n- `readlines()` -- reads all lines into a list of strings\n\nFor large files, iterate line by line:\n```python\nfor line in f:\n    print(line.strip())\n```",
    position: 80,
  },
  {
    type: "CODE",
    front: "Write code that demonstrates writing a list of lines to a file and reading them back. Print each line without extra newlines.",
    back: "Use `writelines()` to write multiple strings, but you must add `\\n` yourself. When reading, use `strip()` to remove trailing newlines.",
    position: 81,
    codeTemplate: 'lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]\n\n# Write lines to file\nwith open("test.txt", "w") as f:\n    # Write your code here\n\n# Read and print lines\nwith open("test.txt", "r") as f:\n    # Write your code here',
    codeLanguage: "python",
    expectedOutput: "Line 1\nLine 2\nLine 3",
  },

  // ============================================================
  // TOPIC 11: Classes and Objects Basics (cards 82-87)
  // ============================================================
  {
    type: "STANDARD",
    front: "How do you define a class in Python?",
    back: "```python\nclass Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def bark(self):\n        return f\"{self.name} says Woof!\"\n```\n\n- `__init__` is the constructor\n- `self` refers to the instance\n- Methods are functions defined inside the class",
    position: 82,
  },
  {
    type: "CODE",
    front: "Create a `Rectangle` class with `width` and `height` attributes and an `area()` method. Create an instance with width 5 and height 3, then print its area.",
    back: "Classes bundle data (attributes) and behavior (methods). The `__init__` method initializes attributes, and `self` lets methods access them.",
    position: 83,
    codeTemplate: "# Write your code here\n\nrect = Rectangle(5, 3)\nprint(rect.area())",
    codeLanguage: "python",
    expectedOutput: "15",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the class definition with a constructor and a method.",
    back: "`__init__` is the constructor that runs when an object is created. `self` is a reference to the current instance and must be the first parameter in all instance methods.",
    position: 84,
    codeSnippet: 'class Person:\n    def {{__init__}}(self, name):\n        {{self}}.name = name\n\n    def greet(self):\n        return f"Hello, I am {self.name}"\n\np = Person("Alice")\nprint(p.greet())',
    blankAnswers: ["__init__", "self"],
  },
  {
    type: "STANDARD",
    front: "What is inheritance in Python?",
    back: "Inheritance lets a class (child) derive from another class (parent), inheriting its attributes and methods.\n\n```python\nclass Animal:\n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof!\"\n```\n\nUse `super()` to call parent methods. A child can override parent methods.",
    position: 85,
  },
  {
    type: "CODE",
    front: "Create a `Counter` class with `count` attribute starting at 0, an `increment()` method, and a `__str__` method that returns the count. Increment twice and print.",
    back: "`__str__` is a special method that defines how an object is converted to a string (used by `print()`). It should return a string.",
    position: 86,
    codeTemplate: "# Write your code here\n\nc = Counter()\nc.increment()\nc.increment()\nprint(c)",
    codeLanguage: "python",
    expectedOutput: "2",
  },
  {
    type: "FILL_IN_BLANK",
    front: "Complete the child class that inherits from a parent class.",
    back: "Put the parent class name in parentheses after the child class name. Use `super().__init__()` to call the parent's constructor and inherit its setup.",
    position: 87,
    codeSnippet: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog({{Animal}}):\n    def __init__(self, name, breed):\n        {{super}}().__init__(name)\n        self.breed = breed\n\nd = Dog("Rex", "Labrador")\nprint(f"{d.name} is a {d.breed}")',
    blankAnswers: ["Animal", "super"],
  },

  // ============================================================
  // TOPIC 12: Modules and Imports (cards 88-89)
  // ============================================================
  {
    type: "STANDARD",
    front: "What are the different ways to import modules in Python?",
    back: "```python\nimport math            # import entire module\nfrom math import sqrt  # import specific item\nfrom math import *     # import everything (discouraged)\nimport math as m       # import with alias\nfrom math import sqrt as s  # item with alias\n```\n\nPrefer explicit imports (`import math` or `from math import sqrt`) for clarity and to avoid name conflicts.",
    position: 88,
  },
  {
    type: "CODE",
    front: "Write code that imports the `math` module and uses it to calculate the square root of 144 and the value of pi rounded to 2 decimal places. Print both.",
    back: "The `math` module provides mathematical functions and constants. Use `math.sqrt()` for square root and `math.pi` for the pi constant. `round()` rounds to the specified number of decimal places.",
    position: 89,
    codeTemplate: "# Write your code here\n\nprint(square_root)\nprint(pi_rounded)",
    codeLanguage: "python",
    expectedOutput: "12.0\n3.14",
  },
];
