export const dataStructuresAlgorithmsCards = [
  // ============================================================
  // BIG O NOTATION (cards 0-7)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is **Big O notation** and why is it important?",
    back: "Big O notation describes the **upper bound** of an algorithm's time or space complexity as input size grows. It helps compare algorithm efficiency and predict performance at scale, ignoring constants and lower-order terms.",
    position: 0,
  },
  {
    type: "STANDARD" as const,
    front: "What does **O(1)** mean? Give an example.",
    back: "**O(1)** means **constant time** -- the operation takes the same amount of time regardless of input size.\n\nExample: Accessing an array element by index (`arr[5]`), or inserting/removing from the front of a hash map.",
    position: 1,
  },
  {
    type: "STANDARD" as const,
    front: "What does **O(n)** mean? Give an example.",
    back: "**O(n)** means **linear time** -- the time grows proportionally with input size.\n\nExample: Iterating through every element of an array to find a value (linear search).",
    position: 2,
  },
  {
    type: "STANDARD" as const,
    front: "What does **O(n^2)** mean? Give an example.",
    back: "**O(n^2)** means **quadratic time** -- the time grows proportionally to the square of input size, typically from nested loops.\n\nExample: Bubble sort, which compares every pair of elements using two nested loops.",
    position: 3,
  },
  {
    type: "STANDARD" as const,
    front: "What does **O(log n)** mean? Give an example.",
    back: "**O(log n)** means **logarithmic time** -- the problem size is halved with each step.\n\nExample: Binary search on a sorted array. Each comparison eliminates half the remaining elements.",
    position: 4,
  },
  {
    type: "STANDARD" as const,
    front: "What does **O(n log n)** mean? Which common algorithms have this complexity?",
    back: "**O(n log n)** means the algorithm does `log n` work for each of `n` elements. This is the best possible time complexity for comparison-based sorting.\n\nExamples: **Merge Sort**, **Quick Sort** (average case), **Heap Sort**.",
    position: 5,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Rank these Big O complexities from fastest to slowest.",
    back: "The correct order from fastest to slowest is: O(1) < O(log n) < O(n) < O(n log n) < O(n^2).",
    codeSnippet: "Fastest to Slowest:\n1. {{O(1)}}\n2. {{O(log n)}}\n3. {{O(n)}}\n4. {{O(n log n)}}\n5. {{O(n^2)}}",
    blankAnswers: ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
    position: 6,
  },
  {
    type: "CODE" as const,
    front: "Write a function that demonstrates **O(n)** vs **O(1)** operations on an array. Log the results.",
    back: "Accessing by index is O(1) because it goes directly to the memory address. Finding a value requires scanning, which is O(n) in the worst case.",
    codeTemplate: `// O(1): Access element by index
function constantTime(arr, index) {
  // Return the element at the given index
  // TODO: implement
}

// O(n): Find an element by value
function linearTime(arr, target) {
  // Loop through arr and return the index of target, or -1
  // TODO: implement
}

const nums = [10, 20, 30, 40, 50];
console.log(constantTime(nums, 2));
console.log(linearTime(nums, 40));
console.log(linearTime(nums, 99));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "30\n3\n-1",
    position: 7,
  },

  // ============================================================
  // ARRAYS (cards 8-12)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What are the time complexities for common **array** operations?",
    back: "- **Access by index**: O(1)\n- **Search (unsorted)**: O(n)\n- **Search (sorted, binary search)**: O(log n)\n- **Insert at end**: O(1) amortized\n- **Insert at beginning/middle**: O(n)\n- **Delete at end**: O(1)\n- **Delete at beginning/middle**: O(n)",
    position: 8,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the time complexities for array operations.",
    back: "Array access is O(1) because of direct indexing. Insertion at the beginning is O(n) because all elements must shift right.",
    codeSnippet: "Array Operation Complexities:\n- Access by index: {{O(1)}}\n- Search (unsorted): {{O(n)}}\n- Insert at beginning: {{O(n)}}\n- Push to end (amortized): {{O(1)}}",
    blankAnswers: ["O(1)", "O(n)", "O(n)", "O(1)"],
    position: 9,
  },
  {
    type: "CODE" as const,
    front: "Implement a function `reverseArray` that reverses an array **in place** (without creating a new array). Log the result.",
    back: "Use two pointers: one at the start and one at the end. Swap elements and move the pointers inward until they meet. This is O(n) time and O(1) space.",
    codeTemplate: `function reverseArray(arr) {
  // Use two pointers to swap elements in place
  // TODO: implement
  return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5]).join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "5, 4, 3, 2, 1",
    position: 10,
  },
  {
    type: "CODE" as const,
    front: "Write a function `twoSum` that finds two numbers in an array that add up to a target. Return their indices.",
    back: "Use a hash map to store each number's index as you iterate. For each element, check if `target - current` exists in the map. This gives O(n) time instead of O(n^2) with brute force.",
    codeTemplate: `function twoSum(nums, target) {
  // Use a hash map for O(n) solution
  // Return an array of two indices
  // TODO: implement
}

console.log(twoSum([2, 7, 11, 15], 9).join(", "));
console.log(twoSum([3, 2, 4], 6).join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "0, 1\n1, 2",
    position: 11,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the blanks about static vs dynamic arrays.",
    back: "Static arrays have a fixed size. Dynamic arrays (like JavaScript's `Array`) automatically resize, typically doubling capacity. Push is O(1) amortized because the costly resize operation happens infrequently.",
    codeSnippet: "Static array: {{fixed}} size, cannot grow\nDynamic array: automatically {{resizes}}\n- Typical growth factor: {{2x}} (doubles)\n- Push (amortized): {{O(1)}}",
    blankAnswers: ["fixed", "resizes", "2x", "O(1)"],
    position: 12,
  },

  // ============================================================
  // LINKED LISTS (cards 13-18)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is a **linked list** and how does it differ from an array?",
    back: "A linked list is a linear data structure where each element (**node**) contains a value and a pointer to the next node.\n\n**vs Arrays**:\n- No contiguous memory needed\n- O(1) insertion/deletion at head (vs O(n) for arrays)\n- O(n) access by index (vs O(1) for arrays)\n- Extra memory for pointers",
    position: 13,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between a **singly linked list** and a **doubly linked list**?",
    back: "- **Singly linked list**: Each node has a `value` and a `next` pointer. Can only traverse forward.\n- **Doubly linked list**: Each node has `value`, `next`, and `prev` pointers. Can traverse both directions. Uses more memory but supports O(1) deletion when you have a reference to the node.",
    position: 14,
  },
  {
    type: "CODE" as const,
    front: "Implement a basic **singly linked list** with `append` and `print` methods.",
    back: "A linked list needs a `Node` class (value + next pointer) and a `LinkedList` class that tracks the head. `append` traverses to the end and adds a new node. `print` collects all values by traversing from head.",
    codeTemplate: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    // Add a new node to the end of the list
    // TODO: implement
  }

  print() {
    // Return a string of all values joined by " -> "
    // TODO: implement
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
console.log(list.print());`,
    codeLanguage: "javascript" as const,
    expectedOutput: "1 -> 2 -> 3",
    position: 15,
  },
  {
    type: "CODE" as const,
    front: "Implement a `reverse` method for a singly linked list. Log the list before and after reversing.",
    back: "To reverse in place, use three pointers: `prev`, `current`, and `next`. Iterate through the list, pointing each node backward. Time: O(n), Space: O(1).",
    codeTemplate: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() { this.head = null; }

  append(value) {
    const node = new Node(value);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  reverse() {
    // Reverse the list in place using three pointers
    // TODO: implement
  }

  print() {
    const vals = [];
    let curr = this.head;
    while (curr) { vals.push(curr.value); curr = curr.next; }
    return vals.join(" -> ");
  }
}

const list = new LinkedList();
list.append(1); list.append(2); list.append(3); list.append(4);
console.log(list.print());
list.reverse();
console.log(list.print());`,
    codeLanguage: "javascript" as const,
    expectedOutput: "1 -> 2 -> 3 -> 4\n4 -> 3 -> 2 -> 1",
    position: 16,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the time complexities for linked list operations.",
    back: "Linked lists excel at insertions/deletions at the head (O(1)) but suffer from O(n) access since you must traverse from the head.",
    codeSnippet: "Singly Linked List Complexities:\n- Access by index: {{O(n)}}\n- Search: {{O(n)}}\n- Insert at head: {{O(1)}}\n- Insert at tail (no tail pointer): {{O(n)}}\n- Delete at head: {{O(1)}}",
    blankAnswers: ["O(n)", "O(n)", "O(1)", "O(n)", "O(1)"],
    position: 17,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the node structure for a doubly linked list.",
    back: "A doubly linked list node has three properties: the stored value, a pointer to the next node, and a pointer to the previous node.",
    codeSnippet: "class DoublyNode {\n  constructor(value) {\n    this.value = {{value}};\n    this.next = {{null}};\n    this.prev = {{null}};\n  }\n}",
    blankAnswers: ["value", "null", "null"],
    position: 18,
  },

  // ============================================================
  // STACKS (cards 19-23)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is a **stack** and what principle does it follow?",
    back: "A stack is a linear data structure that follows the **LIFO** (Last In, First Out) principle. The last element added is the first one removed.\n\nCore operations:\n- **push**: Add to top -- O(1)\n- **pop**: Remove from top -- O(1)\n- **peek**: View top element -- O(1)",
    position: 19,
  },
  {
    type: "STANDARD" as const,
    front: "Name 3 common **use cases** for stacks.",
    back: "1. **Function call stack** -- tracks active function calls and local variables during program execution\n2. **Undo/Redo** -- editors push actions onto a stack; undo pops the most recent\n3. **Balanced parentheses checking** -- push opening brackets, pop when closing brackets match\n\nOther uses: browser back button, expression evaluation, DFS traversal.",
    position: 20,
  },
  {
    type: "CODE" as const,
    front: "Implement a **Stack** class with `push`, `pop`, `peek`, and `isEmpty` methods using an array.",
    back: "A stack can be implemented with an array using `push()` and `pop()` for O(1) operations at the end. `peek` returns the last element without removing it.",
    codeTemplate: `class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    // Add element to top of stack
    // TODO: implement
  }

  pop() {
    // Remove and return top element, or undefined if empty
    // TODO: implement
  }

  peek() {
    // Return top element without removing it
    // TODO: implement
  }

  isEmpty() {
    // Return true if stack is empty
    // TODO: implement
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.isEmpty());`,
    codeLanguage: "javascript" as const,
    expectedOutput: "30\n30\n20\nfalse",
    position: 21,
  },
  {
    type: "CODE" as const,
    front: "Write a function `isBalanced` that checks if a string of brackets `()[]{}` is **balanced** using a stack.",
    back: "Push opening brackets onto the stack. For each closing bracket, check if the top of the stack is the matching opener. If not, or if the stack is empty, return false. At the end, the stack should be empty.",
    codeTemplate: `function isBalanced(str) {
  // Use a stack to check for balanced brackets
  // Return true if balanced, false otherwise
  // TODO: implement
}

console.log(isBalanced("({[]})"));
console.log(isBalanced("([)]"));
console.log(isBalanced("{[]}()"));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "true\nfalse\ntrue",
    position: 22,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the stack operation descriptions.",
    back: "LIFO means the last element pushed is the first one popped. All three core stack operations run in O(1) constant time.",
    codeSnippet: "Stack follows the {{LIFO}} principle.\n\npush: O({{1}}) - adds to {{top}}\npop:  O({{1}}) - removes from {{top}}",
    blankAnswers: ["LIFO", "1", "top", "1", "top"],
    position: 23,
  },

  // ============================================================
  // QUEUES (cards 24-28)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is a **queue** and what principle does it follow?",
    back: "A queue is a linear data structure that follows the **FIFO** (First In, First Out) principle. The first element added is the first one removed.\n\nCore operations:\n- **enqueue**: Add to back -- O(1)\n- **dequeue**: Remove from front -- O(1)\n- **peek/front**: View front element -- O(1)",
    position: 24,
  },
  {
    type: "STANDARD" as const,
    front: "Name 3 common **use cases** for queues.",
    back: "1. **Task scheduling** -- OS process scheduling, print job queues\n2. **BFS traversal** -- uses a queue to explore nodes level by level\n3. **Message queues** -- handling async requests in order (e.g., RabbitMQ, SQS)\n\nOther uses: rate limiting, buffering data streams.",
    position: 25,
  },
  {
    type: "CODE" as const,
    front: "Implement a **Queue** class with `enqueue`, `dequeue`, `peek`, and `size` methods.",
    back: "Using an object with head/tail indices avoids the O(n) cost of `Array.shift()`. Each operation is O(1).",
    codeTemplate: `class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    // Add element to back of queue
    // TODO: implement
  }

  dequeue() {
    // Remove and return front element, or undefined if empty
    // TODO: implement
  }

  peek() {
    // Return front element without removing
    // TODO: implement
  }

  size() {
    // Return number of elements
    // TODO: implement
  }
}

const q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.enqueue("c");
console.log(q.peek());
console.log(q.dequeue());
console.log(q.size());`,
    codeLanguage: "javascript" as const,
    expectedOutput: "a\na\n2",
    position: 26,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the queue operation descriptions.",
    back: "FIFO means the first element enqueued is the first one dequeued, just like a real-world line.",
    codeSnippet: "Queue follows the {{FIFO}} principle.\n\nenqueue: adds to {{back}}\ndequeue: removes from {{front}}",
    blankAnswers: ["FIFO", "back", "front"],
    position: 27,
  },
  {
    type: "CODE" as const,
    front: "Implement a **hot potato** game simulation using a queue. Players are in a circle; every `num`th person is eliminated until one remains.",
    back: "Enqueue all players. Repeatedly dequeue and re-enqueue `num` times, then dequeue the eliminated player. The last one remaining wins. This demonstrates a practical queue application.",
    codeTemplate: `function hotPotato(players, num) {
  // Use a queue (array with push/shift for simplicity)
  // Rotate num times, then eliminate the front person
  // Repeat until one player remains
  // Return the winner's name
  // TODO: implement
}

console.log(hotPotato(["Alice", "Bob", "Charlie", "Dave", "Eve"], 3));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "Alice",
    position: 28,
  },

  // ============================================================
  // HASH TABLES / HASH MAPS (cards 29-34)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is a **hash table** (hash map) and how does it work?",
    back: "A hash table stores **key-value pairs** using a **hash function** that converts keys into array indices.\n\n- **Average** lookup, insert, delete: **O(1)**\n- **Worst case** (many collisions): **O(n)**\n\nIn JavaScript, `Map` and plain objects `{}` are hash-table-based.",
    position: 29,
  },
  {
    type: "STANDARD" as const,
    front: "What is a **hash collision** and how can it be resolved?",
    back: "A collision occurs when two different keys hash to the **same index**.\n\nCommon resolution strategies:\n1. **Chaining**: Each bucket holds a linked list of entries\n2. **Open Addressing (Linear Probing)**: If the slot is taken, check the next slot sequentially\n3. **Double Hashing**: Use a second hash function to determine the probe step",
    position: 30,
  },
  {
    type: "CODE" as const,
    front: "Implement a simple **HashTable** class with `set`, `get`, and a basic hash function. Use chaining for collision handling.",
    back: "The hash function converts a string key to a numeric index. Chaining stores collisions in an array at each bucket. `set` appends or updates, `get` searches the chain.",
    codeTemplate: `class HashTable {
  constructor(size = 16) {
    this.buckets = new Array(size).fill(null).map(() => []);
    this.size = size;
  }

  _hash(key) {
    // Simple hash: sum char codes, mod by size
    // TODO: implement
  }

  set(key, value) {
    // Hash the key, find the bucket, update or push [key, value]
    // TODO: implement
  }

  get(key) {
    // Hash the key, search the bucket for matching key
    // Return value or undefined
    // TODO: implement
  }
}

const table = new HashTable();
table.set("name", "Alice");
table.set("age", 30);
table.set("mane", "Bob"); // likely same hash as "name"
console.log(table.get("name"));
console.log(table.get("age"));
console.log(table.get("mane"));
console.log(table.get("missing"));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "Alice\n30\nBob\nundefined",
    position: 31,
  },
  {
    type: "CODE" as const,
    front: "Write a function `charFrequency` that uses a hash map to count the frequency of each character in a string.",
    back: "Iterate through the string. For each character, increment its count in the map (defaulting to 0). This is O(n) time where n is the string length.",
    codeTemplate: `function charFrequency(str) {
  // Use a Map or object to count character frequencies
  // Return the map/object
  // TODO: implement
}

const freq = charFrequency("banana");
console.log(freq["b"]);
console.log(freq["a"]);
console.log(freq["n"]);`,
    codeLanguage: "javascript" as const,
    expectedOutput: "1\n3\n2",
    position: 32,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the hash table complexity analysis.",
    back: "Hash tables achieve O(1) average case through direct indexing via the hash function. Worst case O(n) occurs when all keys hash to the same bucket.",
    codeSnippet: "Hash Table Complexities:\n- Insert (average): {{O(1)}}\n- Lookup (average): {{O(1)}}\n- Delete (average): {{O(1)}}\n- Worst case (all collisions): {{O(n)}}",
    blankAnswers: ["O(1)", "O(1)", "O(1)", "O(n)"],
    position: 33,
  },
  {
    type: "CODE" as const,
    front: "Write a function `groupAnagrams` that groups an array of strings into anagrams using a hash map.",
    back: "Sort each word's characters to create a key. Words with the same sorted key are anagrams. Use a hash map where keys are sorted strings and values are arrays of original words. Time: O(n * k log k) where k is max word length.",
    codeTemplate: `function groupAnagrams(words) {
  // Use a map: sorted word -> array of original words
  // Return the grouped arrays
  // TODO: implement
}

const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// Sort each group and sort groups by first element for consistent output
const sorted = result.map(g => g.sort()).sort((a, b) => a[0].localeCompare(b[0]));
sorted.forEach(group => console.log(group.join(", ")));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "ate, eat, tea\nbat\nnat, tan",
    position: 34,
  },

  // ============================================================
  // TREES (cards 35-41)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is a **binary tree** and what is a **binary search tree (BST)**?",
    back: "- **Binary tree**: Each node has at most **2 children** (left and right).\n- **BST**: A binary tree with the **ordering property**: for every node, all values in the **left subtree are smaller** and all values in the **right subtree are larger**.\n\nBST enables O(log n) average search, insert, and delete.",
    position: 35,
  },
  {
    type: "STANDARD" as const,
    front: "What are the three main **depth-first tree traversal** orders?",
    back: "1. **Inorder** (Left, Root, Right): Visits nodes in sorted order for a BST.\n2. **Preorder** (Root, Left, Right): Useful for copying/serializing a tree.\n3. **Postorder** (Left, Right, Root): Useful for deleting a tree or evaluating expressions.\n\nAll three are O(n) since every node is visited once.",
    position: 36,
  },
  {
    type: "CODE" as const,
    front: "Implement a **Binary Search Tree** with `insert` and `inorderTraversal` methods.",
    back: "Insert compares the value with the current node and recurses left or right. Inorder traversal visits left subtree, then current node, then right subtree, producing sorted output.",
    codeTemplate: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }

  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) { this.root = node; return; }
    // Recursively or iteratively find correct position
    // TODO: implement
  }

  inorder(node = this.root, result = []) {
    // Left -> Root -> Right
    // TODO: implement
    return result;
  }
}

const bst = new BST();
[5, 3, 7, 1, 4, 6, 8].forEach(v => bst.insert(v));
console.log(bst.inorder().join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "1, 3, 4, 5, 6, 7, 8",
    position: 37,
  },
  {
    type: "CODE" as const,
    front: "Implement **preorder** and **postorder** traversal for a binary tree. Log both results.",
    back: "Preorder visits Root first, then Left, then Right. Postorder visits Left, then Right, then Root last. Both are recursive DFS approaches.",
    codeTemplate: `class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function preorder(node, result = []) {
  // Root -> Left -> Right
  // TODO: implement
  return result;
}

function postorder(node, result = []) {
  // Left -> Right -> Root
  // TODO: implement
  return result;
}

//       1
//      / \\
//     2   3
//    / \\
//   4   5
const tree = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(preorder(tree).join(", "));
console.log(postorder(tree).join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "1, 2, 4, 5, 3\n4, 5, 2, 3, 1",
    position: 38,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the traversal order for each type.",
    back: "Inorder gives sorted output on a BST. The traversal name hints at when the root is visited: Pre (before children), In (between children), Post (after children).",
    codeSnippet: "Inorder:   {{Left}}, Root, {{Right}}\nPreorder:  {{Root}}, Left, Right\nPostorder: Left, {{Right}}, {{Root}}",
    blankAnswers: ["Left", "Right", "Root", "Right", "Root"],
    position: 39,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the BST complexities.",
    back: "A balanced BST has O(log n) operations because each comparison eliminates half the tree. A degenerate (skewed) BST becomes a linked list with O(n) operations.",
    codeSnippet: "BST (balanced):\n- Search: {{O(log n)}}\n- Insert: {{O(log n)}}\n- Delete: {{O(log n)}}\n\nBST (worst case / skewed):\n- All operations: {{O(n)}}",
    blankAnswers: ["O(log n)", "O(log n)", "O(log n)", "O(n)"],
    position: 40,
  },
  {
    type: "STANDARD" as const,
    front: "What is a **balanced binary tree** and why does it matter?",
    back: "A balanced binary tree has the property that the height difference between left and right subtrees of any node is at most 1.\n\nIt matters because it guarantees **O(log n)** operations. Without balancing, a BST can degenerate into a linked list with **O(n)** operations.\n\nExamples of self-balancing trees: **AVL tree**, **Red-Black tree**.",
    position: 41,
  },

  // ============================================================
  // GRAPHS (cards 42-46)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is a **graph**? What are **directed** vs **undirected** graphs?",
    back: "A graph is a collection of **vertices (nodes)** connected by **edges**.\n\n- **Directed graph**: Edges have direction (A -> B doesn't mean B -> A)\n- **Undirected graph**: Edges are bidirectional (A -- B means both can reach each other)\n\nExamples: Social networks (undirected), web links (directed).",
    position: 42,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between an **adjacency list** and an **adjacency matrix**?",
    back: "- **Adjacency list**: Each vertex stores a list of its neighbors. Space: O(V + E). Better for **sparse** graphs.\n- **Adjacency matrix**: A V x V matrix where `matrix[i][j] = 1` if edge exists. Space: O(V^2). Better for **dense** graphs and O(1) edge lookup.\n\nV = vertices, E = edges.",
    position: 43,
  },
  {
    type: "CODE" as const,
    front: "Implement a **Graph** class using an adjacency list with `addVertex`, `addEdge`, and `printGraph` methods.",
    back: "An adjacency list uses a Map or object where each key is a vertex and its value is an array of neighbor vertices. For an undirected graph, adding edge (A,B) adds B to A's list and A to B's list.",
    codeTemplate: `class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    // Add vertex with empty neighbors array if not exists
    // TODO: implement
  }

  addEdge(v1, v2) {
    // Add undirected edge between v1 and v2
    // TODO: implement
  }

  printGraph() {
    for (const vertex in this.adjacencyList) {
      console.log(vertex + " -> " + this.adjacencyList[vertex].join(", "));
    }
  }
}

const g = new Graph();
["A", "B", "C", "D"].forEach(v => g.addVertex(v));
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.printGraph();`,
    codeLanguage: "javascript" as const,
    expectedOutput: "A -> B, C\nB -> A, D\nC -> A\nD -> B",
    position: 44,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Compare adjacency list vs adjacency matrix space complexity.",
    back: "Adjacency lists are more space-efficient for sparse graphs (few edges). Adjacency matrices use V^2 space regardless of edge count but allow O(1) edge existence checks.",
    codeSnippet: "Adjacency List space:  {{O(V + E)}}\nAdjacency Matrix space: {{O(V^2)}}\n\nEdge lookup:\n- List:   {{O(V)}} worst case\n- Matrix: {{O(1)}}",
    blankAnswers: ["O(V + E)", "O(V^2)", "O(V)", "O(1)"],
    position: 45,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the blanks about graph types and their representations.",
    back: "Directed graphs have one-way edges while undirected graphs have two-way edges. Weighted graphs assign costs to edges, used in shortest-path algorithms.",
    codeSnippet: "Graph where edges have direction: {{directed}}\nGraph where edges go both ways: {{undirected}}\nGraph where edges have costs: {{weighted}}\n\nShortest path algorithm for weighted graphs: {{Dijkstra}}",
    blankAnswers: ["directed", "undirected", "weighted", "Dijkstra"],
    position: 46,
  },

  // ============================================================
  // LINEAR SEARCH vs BINARY SEARCH (cards 47-50)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "Compare **linear search** vs **binary search**.",
    back: "| | Linear Search | Binary Search |\n|---|---|---|\n| Prerequisite | None | Array must be **sorted** |\n| Time | **O(n)** | **O(log n)** |\n| Method | Check each element sequentially | Repeatedly divide the search interval in half |\n| Best for | Small or unsorted data | Large sorted datasets |",
    position: 47,
  },
  {
    type: "CODE" as const,
    front: "Implement **binary search** that returns the index of a target value in a sorted array, or -1 if not found.",
    back: "Set `left` and `right` pointers. Find the `mid` index. If target equals `arr[mid]`, return `mid`. If target is less, search left half. If greater, search right half. Time: O(log n).",
    codeTemplate: `function binarySearch(arr, target) {
  // Implement iterative binary search
  // Return index of target or -1
  // TODO: implement
}

const sorted = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sorted, 7));
console.log(binarySearch(sorted, 13));
console.log(binarySearch(sorted, 6));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "3\n6\n-1",
    position: 48,
  },
  {
    type: "CODE" as const,
    front: "Implement **linear search** that returns the index of the first occurrence of a target, or -1.",
    back: "Linear search simply iterates from index 0 to the end, checking each element. It works on both sorted and unsorted arrays. Time: O(n).",
    codeTemplate: `function linearSearch(arr, target) {
  // Check each element sequentially
  // Return index of first match or -1
  // TODO: implement
}

console.log(linearSearch([4, 2, 7, 1, 9], 7));
console.log(linearSearch([4, 2, 7, 1, 9], 5));
console.log(linearSearch([10, 20, 30], 10));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "2\n-1\n0",
    position: 49,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the blanks comparing search algorithms.",
    back: "Binary search requires a sorted array and is much faster (O(log n)) for large datasets. Linear search works on any array but checks every element.",
    codeSnippet: "Linear Search: O({{n}}) - works on {{unsorted}} arrays\nBinary Search: O({{log n}}) - requires {{sorted}} array",
    blankAnswers: ["n", "unsorted", "log n", "sorted"],
    position: 50,
  },

  // ============================================================
  // BUBBLE SORT (cards 51-53)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "How does **Bubble Sort** work and what is its time complexity?",
    back: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and **swaps** them if they are in the wrong order. Larger elements 'bubble' to the end.\n\n- **Best case** (already sorted): O(n) with optimization\n- **Average/Worst case**: **O(n^2)**\n- **Space**: O(1) -- sorts in place\n\nRarely used in practice due to poor performance.",
    position: 51,
  },
  {
    type: "CODE" as const,
    front: "Implement **Bubble Sort** with an optimization that stops early if no swaps occur in a pass.",
    back: "The outer loop runs n-1 passes. The inner loop compares and swaps adjacent elements. If a full pass completes with no swaps, the array is sorted and we can exit early.",
    codeTemplate: `function bubbleSort(arr) {
  // Implement bubble sort with early termination
  // TODO: implement
  return arr;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]).join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "11, 12, 22, 25, 34, 64, 90",
    position: 52,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the Bubble Sort complexity analysis.",
    back: "Bubble sort uses nested loops giving O(n^2) time. It sorts in place so space is O(1). The early termination optimization makes best case O(n) for already-sorted input.",
    codeSnippet: "Bubble Sort:\n- Best case:  {{O(n)}} (with early termination)\n- Worst case: {{O(n^2)}}\n- Space:      {{O(1)}}\n- Stable:     {{yes}}",
    blankAnswers: ["O(n)", "O(n^2)", "O(1)", "yes"],
    position: 53,
  },

  // ============================================================
  // MERGE SORT (cards 54-57)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "How does **Merge Sort** work?",
    back: "Merge Sort is a **divide and conquer** algorithm:\n\n1. **Divide**: Split the array in half recursively until each sub-array has 1 element\n2. **Conquer**: Merge pairs of sub-arrays back together in sorted order\n\n- **Time**: O(n log n) in all cases\n- **Space**: O(n) for the temporary arrays\n- **Stable**: Yes (preserves order of equal elements)",
    position: 54,
  },
  {
    type: "CODE" as const,
    front: "Implement **Merge Sort** with a `merge` helper and a recursive `mergeSort` function.",
    back: "The `merge` function takes two sorted arrays and combines them into one sorted array using two pointers. `mergeSort` recursively splits, then merges the results.",
    codeTemplate: `function merge(left, right) {
  // Merge two sorted arrays into one sorted array
  // TODO: implement
}

function mergeSort(arr) {
  // Base case: arrays of length 0 or 1 are sorted
  // Split in half, recursively sort, then merge
  // TODO: implement
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]).join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "3, 9, 10, 27, 38, 43, 82",
    position: 55,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the Merge Sort complexity analysis.",
    back: "Merge sort always divides in half (log n levels) and does n work per level, giving O(n log n) for all cases. It needs O(n) extra space for temporary arrays during merging.",
    codeSnippet: "Merge Sort:\n- Best case:  {{O(n log n)}}\n- Worst case: {{O(n log n)}}\n- Space:      {{O(n)}}\n- Strategy:   {{divide and conquer}}",
    blankAnswers: ["O(n log n)", "O(n log n)", "O(n)", "divide and conquer"],
    position: 56,
  },
  {
    type: "CODE" as const,
    front: "Implement a function `isSorted` that checks if an array is sorted in ascending order, then test it on an unsorted array and a merge-sorted array.",
    back: "Iterate through the array checking if each element is less than or equal to the next. This is useful for verifying sort implementations. Time: O(n).",
    codeTemplate: `function isSorted(arr) {
  // Check if array is sorted in ascending order
  // Return true if sorted, false otherwise
  // TODO: implement
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

const unsorted = [5, 3, 8, 1, 2];
console.log(isSorted(unsorted));
const sorted = mergeSort(unsorted);
console.log(isSorted(sorted));
console.log(sorted.join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "false\ntrue\n1, 2, 3, 5, 8",
    position: 57,
  },

  // ============================================================
  // QUICK SORT (cards 58-60)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "How does **Quick Sort** work and what are its complexities?",
    back: "Quick Sort is a **divide and conquer** algorithm:\n\n1. Choose a **pivot** element\n2. **Partition**: Move elements smaller than pivot to the left, larger to the right\n3. Recursively sort the left and right sub-arrays\n\n- **Average**: O(n log n)\n- **Worst** (bad pivot, e.g., already sorted): O(n^2)\n- **Space**: O(log n) for recursion stack\n- **Not stable**",
    position: 58,
  },
  {
    type: "CODE" as const,
    front: "Implement **Quick Sort** using the Lomuto partition scheme (pivot = last element).",
    back: "The partition function places the pivot in its correct position, with smaller elements left and larger right. It uses an index `i` to track the boundary of smaller elements.",
    codeTemplate: `function partition(arr, low, high) {
  // Use last element as pivot
  // Move smaller elements to the left
  // Return the pivot's final index
  // TODO: implement
}

function quickSort(arr, low = 0, high = arr.length - 1) {
  // Base case: low >= high
  // Partition and recursively sort both halves
  // TODO: implement
  return arr;
}

console.log(quickSort([10, 7, 8, 9, 1, 5]).join(", "));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "1, 5, 7, 8, 9, 10",
    position: 59,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Compare Quick Sort and Merge Sort.",
    back: "Quick Sort is generally faster in practice due to better cache performance and O(log n) space, but has O(n^2) worst case. Merge Sort guarantees O(n log n) but uses O(n) space.",
    codeSnippet: "Quick Sort average: {{O(n log n)}}, worst: {{O(n^2)}}, space: {{O(log n)}}\nMerge Sort average: {{O(n log n)}}, worst: O(n log n), space: {{O(n)}}",
    blankAnswers: ["O(n log n)", "O(n^2)", "O(log n)", "O(n log n)", "O(n)"],
    position: 60,
  },

  // ============================================================
  // RECURSION (cards 61-64)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is **recursion**? What are the two essential parts of a recursive function?",
    back: "Recursion is when a function **calls itself** to solve smaller instances of the same problem.\n\nTwo essential parts:\n1. **Base case**: The condition that stops recursion (prevents infinite loops)\n2. **Recursive case**: The function calls itself with a modified argument that moves toward the base case\n\nEach call is added to the **call stack**.",
    position: 61,
  },
  {
    type: "CODE" as const,
    front: "Implement **factorial** using recursion. `factorial(5) = 5 * 4 * 3 * 2 * 1 = 120`.",
    back: "Base case: `n <= 1` returns 1. Recursive case: `n * factorial(n - 1)`. Each call multiplies n by the factorial of (n-1) until reaching 1.",
    codeTemplate: `function factorial(n) {
  // Base case: n <= 1 returns 1
  // Recursive case: n * factorial(n - 1)
  // TODO: implement
}

console.log(factorial(5));
console.log(factorial(0));
console.log(factorial(1));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "120\n1\n1",
    position: 62,
  },
  {
    type: "CODE" as const,
    front: "Implement a recursive **Fibonacci** function. `fib(n)` returns the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1).",
    back: "Base cases: `fib(0) = 0`, `fib(1) = 1`. Recursive case: `fib(n) = fib(n-1) + fib(n-2)`. Note: naive recursion is O(2^n) -- it can be optimized with memoization.",
    codeTemplate: `function fib(n) {
  // Base cases: fib(0) = 0, fib(1) = 1
  // Recursive case: fib(n-1) + fib(n-2)
  // TODO: implement
}

console.log(fib(0));
console.log(fib(1));
console.log(fib(6));
console.log(fib(10));`,
    codeLanguage: "javascript" as const,
    expectedOutput: "0\n1\n8\n55",
    position: 63,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the recursion concepts.",
    back: "Every recursive function needs a base case to stop and a recursive case to progress. Without a base case, recursion never terminates and causes a stack overflow.",
    codeSnippet: "function countdown(n) {\n  if (n <= 0) return; // This is the {{base case}}\n  console.log(n);\n  countdown(n - 1);   // This is the {{recursive case}}\n}\n// Without a base case, you get a {{stack overflow}}",
    blankAnswers: ["base case", "recursive case", "stack overflow"],
    position: 64,
  },

  // ============================================================
  // BFS and DFS (cards 65-68)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is **Breadth-First Search (BFS)** and when should you use it?",
    back: "BFS explores a graph **level by level**, visiting all neighbors of a node before moving to the next depth level.\n\n- Uses a **queue** (FIFO)\n- Time: O(V + E)\n- Space: O(V)\n\n**Use when**: Finding the shortest path in an unweighted graph, level-order traversal of a tree, or when the solution is likely near the root.",
    position: 65,
  },
  {
    type: "STANDARD" as const,
    front: "What is **Depth-First Search (DFS)** and when should you use it?",
    back: "DFS explores a graph by going as **deep as possible** along each branch before backtracking.\n\n- Uses a **stack** (or recursion)\n- Time: O(V + E)\n- Space: O(V)\n\n**Use when**: Detecting cycles, topological sorting, solving mazes, pathfinding when you need to explore all possibilities.",
    position: 66,
  },
  {
    type: "CODE" as const,
    front: "Implement **BFS** on a graph represented as an adjacency list. Start from a given node and log the visit order.",
    back: "BFS uses a queue. Start by enqueuing the source node and marking it visited. Dequeue a node, process it, then enqueue all unvisited neighbors.",
    codeTemplate: `function bfs(graph, start) {
  // Use a queue and a visited set
  // Log each node as you visit it
  // TODO: implement
}

const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

bfs(graph, "A");`,
    codeLanguage: "javascript" as const,
    expectedOutput: "A\nB\nC\nD\nE\nF",
    position: 67,
  },
  {
    type: "CODE" as const,
    front: "Implement **DFS** on a graph using recursion. Start from a given node and log the visit order.",
    back: "DFS uses recursion (implicit stack). Mark the node as visited, process it, then recursively visit each unvisited neighbor.",
    codeTemplate: `function dfs(graph, node, visited = new Set()) {
  // Mark node as visited, log it, then recurse on unvisited neighbors
  // TODO: implement
}

const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

dfs(graph, "A");`,
    codeLanguage: "javascript" as const,
    expectedOutput: "A\nB\nD\nE\nF\nC",
    position: 68,
  },

  // ============================================================
  // DYNAMIC PROGRAMMING (card 69)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is **Dynamic Programming (DP)**? Explain **memoization** vs **tabulation**.",
    back: "DP solves problems by breaking them into **overlapping subproblems** and storing results to avoid redundant computation.\n\n**Memoization** (top-down): Use recursion + cache. Store results of function calls; return cached result if already computed.\n\n**Tabulation** (bottom-up): Build a table iteratively from the smallest subproblem up to the answer.\n\nExample: Fibonacci -- naive recursion is O(2^n), DP reduces it to O(n).",
    position: 69,
  },
];
