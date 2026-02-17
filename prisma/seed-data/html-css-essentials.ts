export const htmlCssEssentialsCards = [
  // ============================================================
  // TOPIC 1: HTML Document Structure (Cards 0-4)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is the purpose of the `<!DOCTYPE html>` declaration?",
    back: "It tells the browser to render the page in **standards mode** using the HTML5 specification. It must be the very first line of an HTML document, before the `<html>` tag. Without it, browsers may fall back to **quirks mode**, which emulates legacy rendering behaviour.",
    position: 0,
  },
  {
    type: "STANDARD" as const,
    front: "What are the two required children of the `<html>` element?",
    back: "`<head>` and `<body>`.\n\n- `<head>` contains **metadata**, stylesheets, scripts, and the document title.\n- `<body>` contains all **visible content** rendered in the browser window.",
    position: 1,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the minimal HTML5 document structure.",
    back: "Every HTML5 document starts with `<!DOCTYPE html>`, followed by an `<html>` element containing `<head>` (with a `<meta charset>` and `<title>`) and `<body>` for visible content.",
    codeSnippet: `{{blank}}
<html lang="en">
  <head>
    <meta charset="{{blank}}">
    <title>My Page</title>
  </head>
  <{{blank}}>
    <h1>Hello World</h1>
  </body>
</html>`,
    blankAnswers: ["<!DOCTYPE html>", "UTF-8", "body"],
    position: 2,
  },
  {
    type: "STANDARD" as const,
    front: "What does the `<meta charset=\"UTF-8\">` tag do?",
    back: "It declares the **character encoding** of the document as UTF-8, which supports virtually all characters and symbols from every writing system. It should be placed as early as possible inside `<head>` so the browser can correctly decode the page content.",
    position: 3,
  },
  {
    type: "STANDARD" as const,
    front: "What is the purpose of the `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` tag?",
    back: "It controls how the page is scaled on **mobile devices**.\n\n- `width=device-width` sets the viewport width to the device screen width.\n- `initial-scale=1.0` sets the initial zoom level to 100%.\n\nWithout it, mobile browsers render the page at a desktop width and then shrink it down.",
    position: 4,
  },

  // ============================================================
  // TOPIC 2: Semantic HTML (Cards 5-11)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "Why should you use semantic HTML elements instead of only `<div>` and `<span>`?",
    back: "Semantic elements provide **meaning** to the document structure, which:\n\n1. Improves **accessibility** for screen readers and assistive technology\n2. Helps **search engines** understand page content (SEO)\n3. Makes code **easier to read** and maintain\n4. Enables browser **outline algorithms** to generate document outlines",
    position: 5,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the correct semantic HTML elements for a typical page layout.",
    back: "Use `<header>` for introductory content, `<nav>` for navigation links, `<main>` for the primary content, and `<footer>` for closing information.",
    codeSnippet: `<body>
  <{{blank}}>
    <h1>My Website</h1>
    <{{blank}}>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <{{blank}}>
    <p>Welcome to my site!</p>
  </main>
  <{{blank}}>
    <p>&copy; 2024</p>
  </footer>
</body>`,
    blankAnswers: ["header", "nav", "main", "footer"],
    position: 6,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `<article>` and `<section>`?",
    back: "- `<article>` represents a **self-contained** piece of content that makes sense on its own (e.g., a blog post, news story, or comment).\n- `<section>` represents a **thematic grouping** of content, typically with a heading, that is part of a larger whole.\n\nA page can have multiple `<section>` elements inside an `<article>`, or multiple `<article>` elements inside a `<section>`.",
    position: 7,
  },
  {
    type: "STANDARD" as const,
    front: "When should you use `<aside>` in HTML?",
    back: "Use `<aside>` for content that is **tangentially related** to the surrounding content. Common uses:\n\n- Sidebars with related links\n- Pull quotes\n- Advertising blocks\n- Author bio boxes\n- Glossary definitions\n\nIt signals to assistive tech that this content is supplementary.",
    position: 8,
  },
  {
    type: "CODE" as const,
    front: "Create an array of all semantic HTML5 structural elements and log them grouped by their typical page position.",
    back: "Semantic elements can be grouped by where they typically appear: **top** (`header`, `nav`), **middle** (`main`, `article`, `section`, `aside`), and **bottom** (`footer`).",
    codeTemplate: `// Create an object grouping semantic elements by page position
const semanticElements = {
  top: [],
  middle: [],
  bottom: []
};

// Add elements to each group and log the result
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `{"top":["header","nav"],"middle":["main","article","section","aside"],"bottom":["footer"]}`,
    position: 9,
  },
  {
    type: "STANDARD" as const,
    front: "Can there be more than one `<header>` or `<footer>` on a page?",
    back: "**Yes.** While there is typically one page-level `<header>` and `<footer>`, the spec allows them inside `<article>`, `<section>`, and other sectioning elements.\n\nFor example, an `<article>` can have its own `<header>` with the post title and date, and its own `<footer>` with author info and tags.",
    position: 10,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the semantic structure for a blog post.",
    back: "An `<article>` wraps the self-contained post, `<header>` contains the title/date, and `<footer>` holds metadata like tags.",
    codeSnippet: `<{{blank}}>
  <header>
    <h2>My Blog Post</h2>
    <time datetime="2024-01-15">Jan 15, 2024</time>
  </header>
  <{{blank}}>
    <p>Introduction to the topic...</p>
  </section>
  <{{blank}}>
    <p>Tags: HTML, CSS</p>
  </footer>
</article>`,
    blankAnswers: ["article", "section", "footer"],
    position: 11,
  },

  // ============================================================
  // TOPIC 3: Text Elements (Cards 12-16)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "How many heading levels does HTML provide, and what is the recommended usage?",
    back: "HTML provides **six heading levels**: `<h1>` through `<h6>`.\n\n- `<h1>`: Main page heading (generally one per page)\n- `<h2>`: Major section headings\n- `<h3>` to `<h6>`: Subsection headings\n\nHeadings should follow a **logical hierarchy** without skipping levels (e.g., don't jump from `<h2>` to `<h4>`).",
    position: 12,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `<strong>` and `<b>`, and between `<em>` and `<i>`?",
    back: "- `<strong>` conveys **strong importance** (semantic). Screen readers may stress it.\n- `<b>` is **stylistically bold** without extra importance (presentational).\n- `<em>` conveys **emphasis** that changes sentence meaning (semantic).\n- `<i>` is for text in an **alternate voice** like technical terms or foreign words (presentational).\n\nPrefer semantic elements (`<strong>`, `<em>`) for meaningful emphasis.",
    position: 13,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the text markup using the correct inline elements.",
    back: "Use `<strong>` for important text, `<em>` for emphasis, and `<span>` as a generic inline container for styling.",
    codeSnippet: `<p>
  This is <{{blank}}>very important</strong> information.
  Please <{{blank}}>do not</em> ignore it.
  The status is <{{blank}} class="status">active</span>.
</p>`,
    blankAnswers: ["strong", "em", "span"],
    position: 14,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `<div>` and `<span>`?",
    back: "- `<div>` is a **block-level** generic container. It takes up the full width available and starts on a new line.\n- `<span>` is an **inline** generic container. It only takes up as much width as its content and does not break the flow.\n\nBoth are non-semantic and primarily used as hooks for CSS styling or JavaScript.",
    position: 15,
  },
  {
    type: "CODE" as const,
    front: "Write a function that takes a heading level (1-6) and text, then returns the corresponding HTML heading string.",
    back: "Template literals make it easy to dynamically construct HTML element strings based on parameters.",
    codeTemplate: `function createHeading(level, text) {
  // Return an HTML heading string like "<h1>Hello</h1>"
  // If level is not 1-6, return a <p> tag instead
}

console.log(createHeading(1, "Main Title"));
console.log(createHeading(3, "Subsection"));
console.log(createHeading(7, "Fallback"));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `<h1>Main Title</h1>
<h3>Subsection</h3>
<p>Fallback</p>`,
    position: 16,
  },

  // ============================================================
  // TOPIC 4: Links and Images (Cards 17-21)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What attributes are essential on an `<a>` (anchor) element, and what does `target=\"_blank\"` do?",
    back: "The essential attribute is `href`, which specifies the URL destination.\n\n`target=\"_blank\"` opens the link in a **new tab/window**. When using it, you should also add `rel=\"noopener noreferrer\"` for security:\n- `noopener` prevents the new page from accessing `window.opener`\n- `noreferrer` prevents sending the referrer header",
    position: 17,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the anchor tag that opens in a new tab with proper security attributes.",
    back: "When using `target=\"_blank\"`, always add `rel=\"noopener noreferrer\"` to prevent security vulnerabilities like reverse tabnapping.",
    codeSnippet: `<a
  {{blank}}="https://example.com"
  target="{{blank}}"
  rel="{{blank}}"
>
  Visit Example
</a>`,
    blankAnswers: ["href", "_blank", "noopener noreferrer"],
    position: 18,
  },
  {
    type: "STANDARD" as const,
    front: "What attributes are required on an `<img>` element?",
    back: "`src` and `alt` are both required:\n\n- `src`: Path or URL to the image file\n- `alt`: Alternative text describing the image for accessibility\n\nOptional but recommended attributes include `width` and `height` (to prevent layout shift), and `loading=\"lazy\"` for below-the-fold images.",
    position: 19,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the responsive image element with lazy loading.",
    back: "`src` sets the image source, `alt` provides accessible description, `loading=\"lazy\"` defers loading until the image is near the viewport.",
    codeSnippet: `<img
  {{blank}}="photo.jpg"
  {{blank}}="A sunset over the ocean"
  width="800"
  height="600"
  {{blank}}="lazy"
/>`,
    blankAnswers: ["src", "alt", "loading"],
    position: 20,
  },
  {
    type: "CODE" as const,
    front: "Write a function that validates an image object has all required attributes and returns an array of missing ones.",
    back: "Images require `src` and `alt` attributes. Checking for these programmatically helps catch accessibility issues.",
    codeTemplate: `function validateImage(imgAttrs) {
  // imgAttrs is an object like { src: "photo.jpg", alt: "A photo" }
  // Return an array of missing required attributes
  // Required: "src", "alt"
}

console.log(validateImage({ src: "photo.jpg", alt: "Nice photo" }));
console.log(validateImage({ src: "photo.jpg" }));
console.log(validateImage({}));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `[]
["alt"]
["src","alt"]`,
    position: 21,
  },

  // ============================================================
  // TOPIC 5: Lists (Cards 22-24)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is the difference between `<ul>`, `<ol>`, and `<dl>` in HTML?",
    back: "- `<ul>` (**unordered list**): Bulleted list where order doesn't matter\n- `<ol>` (**ordered list**): Numbered list where sequence matters\n- `<dl>` (**description list**): A list of term-description pairs using `<dt>` (term) and `<dd>` (description)\n\nBoth `<ul>` and `<ol>` use `<li>` for list items.",
    position: 22,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the nested list structure.",
    back: "`<ul>` creates an unordered list, `<li>` defines each item, and lists can be nested by placing a new `<ul>` or `<ol>` inside an `<li>`.",
    codeSnippet: `<{{blank}}>
  <{{blank}}>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables</li>
</{{blank}}>`,
    blankAnswers: ["ul", "li", "ul"],
    position: 23,
  },
  {
    type: "CODE" as const,
    front: "Write a function that takes an array of items and returns an HTML unordered list string.",
    back: "Building HTML strings from arrays is a common pattern when dynamically rendering lists in JavaScript.",
    codeTemplate: `function createList(items) {
  // Return an HTML string like "<ul><li>Item1</li><li>Item2</li></ul>"
}

console.log(createList(["HTML", "CSS", "JS"]));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `<ul><li>HTML</li><li>CSS</li><li>JS</li></ul>`,
    position: 24,
  },

  // ============================================================
  // TOPIC 6: Forms (Cards 25-33)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What are the most commonly used `<input>` types in HTML forms?",
    back: "Common `<input>` types:\n\n- `text`: Single-line text\n- `password`: Masked text input\n- `email`: Email with validation\n- `number`: Numeric input with spinners\n- `checkbox`: Toggle on/off\n- `radio`: Select one from a group\n- `date`: Date picker\n- `file`: File upload\n- `submit`: Form submission button\n- `hidden`: Non-visible data field",
    position: 25,
  },
  {
    type: "STANDARD" as const,
    front: "Why is the `<label>` element important, and how do you associate it with an input?",
    back: "Labels make forms **accessible** by giving screen readers a text description for inputs. Two ways to associate:\n\n1. **Explicit**: `<label for=\"email\">` matches `<input id=\"email\">`\n2. **Implicit**: Wrap the input inside the label: `<label>Email <input type=\"email\"></label>`\n\nClicking a label also focuses/toggles its associated input.",
    position: 26,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the login form with proper label associations.",
    back: "The `for` attribute on `<label>` must match the `id` attribute on the corresponding `<input>` for explicit association.",
    codeSnippet: `<form action="/login" method="{{blank}}">
  <label {{blank}}="email">Email</label>
  <input type="email" {{blank}}="email" name="email" required>

  <label for="password">Password</label>
  <input type="{{blank}}" id="password" name="password" required>

  <button type="{{blank}}">Log In</button>
</form>`,
    blankAnswers: ["POST", "for", "id", "password", "submit"],
    position: 27,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `<button type=\"submit\">`, `<button type=\"button\">`, and `<button type=\"reset\">`?",
    back: "- `type=\"submit\"` (default): Submits the parent form\n- `type=\"button\"`: Does nothing by default; used for JavaScript event handlers\n- `type=\"reset\"`: Resets all form fields to their initial values\n\nAlways explicitly set the `type` attribute to avoid accidentally submitting forms.",
    position: 28,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the `<select>` dropdown element.",
    back: "A `<select>` element contains `<option>` children. The `value` attribute is what gets submitted; the text content is what the user sees.",
    codeSnippet: `<label for="color">Favorite Color</label>
<{{blank}} id="color" name="color">
  <{{blank}} value="">Choose one...</option>
  <option {{blank}}="red">Red</option>
  <option value="blue">Blue</option>
</select>`,
    blankAnswers: ["select", "option", "value"],
    position: 29,
  },
  {
    type: "STANDARD" as const,
    front: "What is the `<textarea>` element used for, and how does it differ from `<input type=\"text\">`?",
    back: "`<textarea>` provides a **multi-line** text input field, while `<input type=\"text\">` is **single-line**.\n\nKey differences:\n- `<textarea>` uses `rows` and `cols` attributes for sizing\n- Its default value goes **between** the tags, not in a `value` attribute\n- It can be **resized** by the user (controllable via CSS `resize` property)",
    position: 30,
  },
  {
    type: "CODE" as const,
    front: "Write a function that generates an HTML `<select>` element string from an array of option objects.",
    back: "Dynamically building form elements from data is a core pattern in frontend development.",
    codeTemplate: `function createSelect(name, options) {
  // options is an array of { value, label } objects
  // Return a <select> HTML string with <option> children
}

const colors = [
  { value: "r", label: "Red" },
  { value: "g", label: "Green" },
  { value: "b", label: "Blue" }
];
console.log(createSelect("color", colors));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `<select name="color"><option value="r">Red</option><option value="g">Green</option><option value="b">Blue</option></select>`,
    position: 31,
  },
  {
    type: "CODE" as const,
    front: "Write a function that validates form data by checking which required fields are empty.",
    back: "Client-side validation checks form data before submission to provide immediate feedback to users.",
    codeTemplate: `function validateForm(formData, requiredFields) {
  // formData is an object like { name: "Alice", email: "" }
  // requiredFields is an array like ["name", "email"]
  // Return an array of field names that are empty or missing
}

console.log(validateForm(
  { name: "Alice", email: "", age: "25" },
  ["name", "email", "phone"]
));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `["email","phone"]`,
    position: 32,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the form inputs with proper validation attributes.",
    back: "`required` prevents form submission if empty. `minlength` and `maxlength` constrain text length. `pattern` accepts a regex for custom validation.",
    codeSnippet: `<input type="text" name="username"
  {{blank}}
  minlength="3"
  {{blank}}="20"
>

<input type="email" name="email"
  required
  {{blank}}="[a-z]+@[a-z]+\\.[a-z]+"
>`,
    blankAnswers: ["required", "maxlength", "pattern"],
    position: 33,
  },

  // ============================================================
  // TOPIC 7: Tables (Cards 34-37)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is the proper semantic structure of an HTML table?",
    back: "A well-structured table uses:\n\n- `<table>`: Container\n- `<thead>`: Header row group\n- `<tbody>`: Body row group\n- `<tfoot>`: Footer row group (optional)\n- `<tr>`: Table row\n- `<th>`: Header cell (use `scope=\"col\"` or `scope=\"row\"` for accessibility)\n- `<td>`: Data cell\n\nThis structure helps screen readers navigate tables correctly.",
    position: 34,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the semantic HTML table structure.",
    back: "`<thead>` groups header rows, `<th>` defines header cells, `<tbody>` groups data rows, and `<td>` defines data cells.",
    codeSnippet: `<table>
  <{{blank}}>
    <tr>
      <{{blank}} scope="col">Name</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <{{blank}}>
    <tr>
      <{{blank}}>Alice</td>
      <td>95</td>
    </tr>
  </tbody>
</table>`,
    blankAnswers: ["thead", "th", "tbody", "td"],
    position: 35,
  },
  {
    type: "STANDARD" as const,
    front: "When should you use HTML tables, and when should you avoid them?",
    back: "**Use tables for** tabular data: spreadsheets, schedules, comparison charts, statistics.\n\n**Do not use tables for** page layout. CSS Flexbox and Grid are the modern tools for layout.\n\nUsing tables for layout harms accessibility because screen readers interpret them as data tables, confusing the content structure.",
    position: 36,
  },
  {
    type: "CODE" as const,
    front: "Write a function that takes a 2D array and returns an HTML table string with the first row as headers.",
    back: "Converting data arrays to HTML tables is a common task when dynamically rendering tabular data.",
    codeTemplate: `function createTable(data) {
  // data[0] is the header row, remaining rows are body data
  // Return an HTML table string with <thead>, <tbody>, <th>, <td>
}

const data = [
  ["Name", "Age"],
  ["Alice", "30"],
  ["Bob", "25"]
];
console.log(createTable(data));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `<table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>Alice</td><td>30</td></tr><tr><td>Bob</td><td>25</td></tr></tbody></table>`,
    position: 37,
  },

  // ============================================================
  // TOPIC 8: CSS Selectors (Cards 38-44)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What are the three basic CSS selectors and their specificity values?",
    back: "1. **Element selector** (`p`, `div`): Specificity `0-0-1`\n2. **Class selector** (`.classname`): Specificity `0-1-0`\n3. **ID selector** (`#idname`): Specificity `1-0-0`\n\nHigher specificity wins when multiple rules target the same element. IDs are the most specific, then classes, then elements.",
    position: 38,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between a **descendant** selector and a **child** selector in CSS?",
    back: "- **Descendant** (`div p`): Selects all `<p>` elements **anywhere inside** a `<div>`, at any nesting depth.\n- **Child** (`div > p`): Selects only `<p>` elements that are **direct children** of a `<div>`.\n\nExample: `div > p` would not select a `<p>` inside a `<span>` inside a `<div>`, but `div p` would.",
    position: 39,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS selectors to target specific elements.",
    back: "`.` prefix targets classes, `#` prefix targets IDs, `:` prefix introduces pseudo-classes, and `>` selects direct children.",
    codeSnippet: `/* Select all elements with class "card" */
{{blank}}card {
  border: 1px solid gray;
}

/* Select the element with ID "main-title" */
{{blank}}main-title {
  font-size: 2rem;
}

/* Select direct children <li> of <ul> */
ul {{blank}} li {
  padding: 8px;
}

/* Select the first child */
li{{blank}}first-child {
  font-weight: bold;
}`,
    blankAnswers: [".", "#", ">", ":"],
    position: 40,
  },
  {
    type: "STANDARD" as const,
    front: "Name five commonly used CSS **pseudo-classes**.",
    back: "1. `:hover` -- when the user hovers over an element\n2. `:focus` -- when an element has keyboard/input focus\n3. `:first-child` -- first child of its parent\n4. `:last-child` -- last child of its parent\n5. `:nth-child(n)` -- the nth child (supports formulas like `2n`, `odd`, `even`)\n\nOthers include `:active`, `:visited`, `:not()`, `:checked`, and `:disabled`.",
    position: 41,
  },
  {
    type: "CODE" as const,
    front: "Write a function that calculates CSS specificity for a simple selector string containing IDs, classes, and element names.",
    back: "CSS specificity is calculated as three components: number of ID selectors, class selectors, and element selectors.",
    codeTemplate: `function calculateSpecificity(selector) {
  // Parse a simple selector string like "#main .card p"
  // Count IDs (#), classes (.), and element names
  // Return [ids, classes, elements]
  // Assume tokens are space-separated, no pseudo-classes
}

console.log(calculateSpecificity("#main .card p"));
console.log(calculateSpecificity(".nav .link"));
console.log(calculateSpecificity("div"));
console.log(calculateSpecificity("#app #sidebar .active a"));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `[1,1,1]
[0,2,0]
[0,0,1]
[2,1,1]`,
    position: 42,
  },
  {
    type: "STANDARD" as const,
    front: "What are CSS **pseudo-elements** and how do they differ from pseudo-classes?",
    back: "**Pseudo-elements** (prefixed with `::`) create virtual elements not in the DOM:\n- `::before` / `::after`: Insert generated content\n- `::first-line` / `::first-letter`: Style text portions\n- `::placeholder`: Style input placeholder text\n\n**Pseudo-classes** (`:`) target existing elements in a specific state. Pseudo-elements create new render targets.",
    position: 43,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS that uses pseudo-elements to add decorative content.",
    back: "`::before` and `::after` pseudo-elements require the `content` property to render. They create inline elements by default.",
    codeSnippet: `.quote{{blank}}before {
  {{blank}}: "\\201C";
  font-size: 2rem;
  color: gray;
}

.quote{{blank}}after {
  content: "{{blank}}";
  font-size: 2rem;
  color: gray;
}`,
    blankAnswers: ["::", "content", "::", "\\201D"],
    position: 44,
  },

  // ============================================================
  // TOPIC 9: Box Model (Cards 45-49)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What are the four layers of the CSS box model, from inside to outside?",
    back: "1. **Content** -- The actual text, image, or child elements\n2. **Padding** -- Space between content and border (inside the element)\n3. **Border** -- A visible or invisible line around the padding\n4. **Margin** -- Space outside the border (between this element and others)\n\nBy default (`box-sizing: content-box`), `width` only applies to the content area.",
    position: 45,
  },
  {
    type: "STANDARD" as const,
    front: "What does `box-sizing: border-box` do and why is it commonly used?",
    back: "With `border-box`, the `width` and `height` properties include **content + padding + border** (but not margin).\n\nWith the default `content-box`, padding and border are **added on top** of the specified width, making sizing unpredictable.\n\nMost projects apply: `*, *::before, *::after { box-sizing: border-box; }` as a global reset.",
    position: 46,
  },
  {
    type: "CODE" as const,
    front: "Write a function that calculates the total outer width of an element given its box model properties.",
    back: "The total outer width is content + left/right padding + left/right border + left/right margin.",
    codeTemplate: `function calculateTotalWidth(boxModel) {
  // boxModel: { width, paddingLeft, paddingRight,
  //             borderLeft, borderRight,
  //             marginLeft, marginRight, boxSizing }
  // If boxSizing is "border-box", width already includes padding+border
  // Return the total outer width (including margin)
}

console.log(calculateTotalWidth({
  width: 200, paddingLeft: 20, paddingRight: 20,
  borderLeft: 1, borderRight: 1,
  marginLeft: 10, marginRight: 10,
  boxSizing: "content-box"
}));
console.log(calculateTotalWidth({
  width: 200, paddingLeft: 20, paddingRight: 20,
  borderLeft: 1, borderRight: 1,
  marginLeft: 10, marginRight: 10,
  boxSizing: "border-box"
}));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `262
220`,
    position: 47,
  },
  {
    type: "CODE" as const,
    front: "Write a function that simulates CSS margin collapse between adjacent vertical margins.",
    back: "When two vertical margins meet, they collapse into the **larger** value (not the sum). This function demonstrates that behaviour.",
    codeTemplate: `function collapseMargins(marginBottom, marginTop) {
  // Vertical margins collapse to the larger of the two
  // If both are positive, take the larger
  // If one is negative, add them together
  // If both are negative, take the more negative (smaller value)
}

console.log(collapseMargins(20, 30));
console.log(collapseMargins(20, -10));
console.log(collapseMargins(-5, -15));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `30
10
-15`,
    position: 48,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS to properly set up the box model for a card component.",
    back: "`border-box` includes padding and border in the width. Shorthand `padding` and `margin` accept values for all sides.",
    codeSnippet: `.card {
  box-sizing: {{blank}};
  width: 300px;
  {{blank}}: 16px;        /* inner spacing */
  {{blank}}: 1px solid #ccc; /* visible outline */
  {{blank}}: 0 auto;      /* centered horizontally */
}`,
    blankAnswers: ["border-box", "padding", "border", "margin"],
    position: 49,
  },

  // ============================================================
  // TOPIC 10: Flexbox (Cards 50-55)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What does `display: flex` do, and what are the two axes it creates?",
    back: "`display: flex` turns an element into a **flex container** whose direct children become **flex items**.\n\nIt creates two axes:\n- **Main axis**: Direction items flow (default: horizontal/row)\n- **Cross axis**: Perpendicular to the main axis (default: vertical)\n\n`flex-direction` controls the main axis: `row`, `row-reverse`, `column`, `column-reverse`.",
    position: 50,
  },
  {
    type: "STANDARD" as const,
    front: "What do `justify-content` and `align-items` control in Flexbox?",
    back: "- `justify-content`: Distributes items along the **main axis**\n  - `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`\n\n- `align-items`: Aligns items along the **cross axis**\n  - `stretch` (default), `flex-start`, `flex-end`, `center`, `baseline`\n\nThink of `justify` as horizontal and `align` as vertical (in default `row` direction).",
    position: 51,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS to create a centered flex layout with evenly spaced items.",
    back: "`display: flex` enables flexbox, `justify-content` distributes items along the main axis, `align-items` aligns on the cross axis, and `gap` adds spacing.",
    codeSnippet: `.container {
  display: {{blank}};
  {{blank}}: space-between;
  {{blank}}: center;
  {{blank}}: 16px;
}`,
    blankAnswers: ["flex", "justify-content", "align-items", "gap"],
    position: 52,
  },
  {
    type: "STANDARD" as const,
    front: "What do the three values of the `flex` shorthand property represent?",
    back: "`flex: <grow> <shrink> <basis>`\n\n- `flex-grow`: How much the item should **grow** relative to siblings (default: `0`)\n- `flex-shrink`: How much the item should **shrink** when space is limited (default: `1`)\n- `flex-basis`: The item's **initial size** before growing/shrinking (default: `auto`)\n\nCommon patterns: `flex: 1` (equal sizing), `flex: 0 0 auto` (no grow/shrink).",
    position: 53,
  },
  {
    type: "CODE" as const,
    front: "Write a function that determines how wide each flex item will be given container width, gap, and flex-grow values.",
    back: "Flex items distribute remaining space proportionally based on their `flex-grow` values after accounting for gaps.",
    codeTemplate: `function calculateFlexWidths(containerWidth, gap, items) {
  // items is an array of { basis, grow } objects
  // 1. Subtract total gap space: gap * (items.length - 1)
  // 2. Subtract each item's basis from available space
  // 3. Distribute remaining space by grow ratios
  // Return array of final widths
}

console.log(calculateFlexWidths(600, 20, [
  { basis: 100, grow: 1 },
  { basis: 100, grow: 2 },
  { basis: 100, grow: 1 }
]));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `[165,230,165]`,
    position: 54,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS for a navigation bar using Flexbox.",
    back: "`flex-direction: row` arranges items horizontally, `flex-wrap: wrap` allows items to flow to the next line, and individual items use `flex` shorthand for sizing.",
    codeSnippet: `.navbar {
  display: flex;
  flex-direction: {{blank}};
  {{blank}}: wrap;
  justify-content: {{blank}};
  padding: 0 16px;
}

.nav-item {
  {{blank}}: 0 0 auto;
}`,
    blankAnswers: ["row", "flex-wrap", "space-between", "flex"],
    position: 55,
  },

  // ============================================================
  // TOPIC 11: CSS Grid (Cards 56-59)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "How do you create a basic CSS Grid layout?",
    back: "Set `display: grid` on the container, then define columns and rows:\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto;\n  gap: 16px;\n}\n```\n\n- `fr` is a **fractional unit** that distributes available space\n- `gap` sets spacing between grid cells\n- Items are placed automatically in source order",
    position: 56,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS Grid layout with three equal columns and a gap.",
    back: "`display: grid` enables grid layout, `grid-template-columns` defines column sizes, and `gap` controls gutter spacing.",
    codeSnippet: `.grid-container {
  display: {{blank}};
  {{blank}}: 1fr 1fr 1fr;
  {{blank}}: 20px;
}`,
    blankAnswers: ["grid", "grid-template-columns", "gap"],
    position: 57,
  },
  {
    type: "STANDARD" as const,
    front: "What does the `repeat()` function do in CSS Grid, and what is `minmax()`?",
    back: "`repeat(count, size)` avoids writing the same track size repeatedly:\n- `repeat(3, 1fr)` equals `1fr 1fr 1fr`\n- `repeat(auto-fill, minmax(250px, 1fr))` creates as many columns as fit\n\n`minmax(min, max)` sets a size range:\n- `minmax(200px, 1fr)` means at least 200px, up to 1fr of available space\n\nTogether they create **responsive grids** without media queries.",
    position: 58,
  },
  {
    type: "CODE" as const,
    front: "Write a function that generates a CSS `grid-template-columns` value from a layout configuration.",
    back: "Grid column definitions can be built programmatically using `fr` units, fixed values, or `repeat()`.",
    codeTemplate: `function gridColumns(columns) {
  // columns is an array of numbers representing fr units
  // Return a grid-template-columns string
  // Example: [1, 2, 1] => "1fr 2fr 1fr"
}

console.log(gridColumns([1, 2, 1]));
console.log(gridColumns([1, 1, 1, 1]));
console.log(gridColumns([3, 1]));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `1fr 2fr 1fr
1fr 1fr 1fr 1fr
3fr 1fr`,
    position: 59,
  },

  // ============================================================
  // TOPIC 12: Positioning (Cards 60-63)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What are the five CSS `position` values and how do they differ?",
    back: "1. `static` (default): Normal document flow; `top`/`left`/etc. have no effect\n2. `relative`: Offset from its normal position; still occupies original space\n3. `absolute`: Removed from flow; positioned relative to nearest positioned ancestor\n4. `fixed`: Removed from flow; positioned relative to the viewport\n5. `sticky`: Acts like `relative` until a scroll threshold, then acts like `fixed`\n\nOnly `relative`, `absolute`, `fixed`, and `sticky` respond to `top`, `right`, `bottom`, `left`.",
    position: 60,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS to position a modal overlay and its content.",
    back: "The overlay uses `fixed` to cover the viewport, while the modal content uses `absolute` positioning within it for centering.",
    codeSnippet: `.overlay {
  position: {{blank}};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  position: {{blank}};
  top: 50%;
  left: 50%;
  {{blank}}: translate(-50%, -50%);
}`,
    blankAnswers: ["fixed", "absolute", "transform"],
    position: 61,
  },
  {
    type: "CODE" as const,
    front: "Write a function that determines whether a sticky element should be stuck based on scroll position and threshold.",
    back: "`position: sticky` behaves like `relative` until the scroll crosses a threshold (e.g., `top: 0`), at which point it behaves like `fixed` within its parent.",
    codeTemplate: `function isStickyStuck(scrollY, elementTop, stickyOffset, parentBottom, elementHeight) {
  // Returns "relative" if scroll hasn't reached the element
  // Returns "stuck" if scroll passed elementTop - stickyOffset
  //   but element bottom hasn't passed parentBottom
  // Returns "relative" again if element would overflow parent
  // elementTop is the element's original position in the document
}

console.log(isStickyStuck(0, 200, 0, 1000, 50));
console.log(isStickyStuck(250, 200, 0, 1000, 50));
console.log(isStickyStuck(960, 200, 0, 1000, 50));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `relative
stuck
relative`,
    position: 62,
  },
  {
    type: "CODE" as const,
    front: "Write a function that determines the rendered position of an element given its position type, offsets, and parent info.",
    back: "Understanding how different position values resolve coordinates helps debug layout issues.",
    codeTemplate: `function getRenderedPosition(element) {
  // element: { position, top, left, normalTop, normalLeft,
  //            parentTop, parentLeft }
  // Return { top, left } based on the position type:
  // "static" -> normalTop, normalLeft (ignores top/left)
  // "relative" -> normalTop + top, normalLeft + left
  // "absolute" -> parentTop + top, parentLeft + left
  // "fixed" -> top, left (relative to viewport 0,0)
}

console.log(getRenderedPosition({
  position: "static", top: 10, left: 20,
  normalTop: 100, normalLeft: 50,
  parentTop: 200, parentLeft: 30
}));
console.log(getRenderedPosition({
  position: "relative", top: 10, left: 20,
  normalTop: 100, normalLeft: 50,
  parentTop: 200, parentLeft: 30
}));
console.log(getRenderedPosition({
  position: "absolute", top: 10, left: 20,
  normalTop: 100, normalLeft: 50,
  parentTop: 200, parentLeft: 30
}));
console.log(getRenderedPosition({
  position: "fixed", top: 10, left: 20,
  normalTop: 100, normalLeft: 50,
  parentTop: 200, parentLeft: 30
}));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `{"top":100,"left":50}
{"top":110,"left":70}
{"top":210,"left":50}
{"top":10,"left":20}`,
    position: 63,
  },

  // ============================================================
  // TOPIC 13: Responsive Design (Cards 64-66)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What are CSS media queries and what is a common breakpoint strategy?",
    back: "Media queries apply styles conditionally based on device characteristics:\n\n```css\n@media (max-width: 768px) { ... }\n```\n\nCommon breakpoints:\n- **Mobile**: up to `480px`\n- **Tablet**: `481px` to `768px`\n- **Desktop**: `769px` to `1024px`\n- **Large desktop**: `1025px`+\n\n**Mobile-first** approach: Write base styles for mobile, then use `min-width` queries to add desktop styles.",
    position: 64,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the mobile-first responsive CSS using media queries.",
    back: "Mobile-first means base styles target small screens. Use `min-width` media queries to progressively add styles for larger screens.",
    codeSnippet: `/* Base styles (mobile) */
.container {
  display: grid;
  grid-template-columns: 1fr;
  padding: 16px;
}

/* Tablet and up */
@{{blank}} ({{blank}}: 768px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop and up */
@media (min-width: {{blank}}) {
  .container {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
  }
}`,
    blankAnswers: ["media", "min-width", "1024px"],
    position: 65,
  },
  {
    type: "CODE" as const,
    front: "Write a function that converts viewport units to pixel values given the viewport dimensions.",
    back: "Viewport units are relative to the browser viewport: `vw` = 1% of width, `vh` = 1% of height, `vmin` = 1% of the smaller dimension, `vmax` = 1% of the larger.",
    codeTemplate: `function viewportToPixels(value, unit, viewportWidth, viewportHeight) {
  // Convert viewport units to pixels
  // "vw" = 1% of viewportWidth
  // "vh" = 1% of viewportHeight
  // "vmin" = 1% of the smaller dimension
  // "vmax" = 1% of the larger dimension
}

console.log(viewportToPixels(50, "vw", 1200, 800));
console.log(viewportToPixels(100, "vh", 1200, 800));
console.log(viewportToPixels(10, "vmin", 1200, 800));
console.log(viewportToPixels(10, "vmax", 1200, 800));
`,
    codeLanguage: "javascript" as const,
    expectedOutput: `600
800
80
120`,
    position: 66,
  },

  // ============================================================
  // TOPIC 14: CSS Variables (Cards 67-68)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "How do you define and use CSS custom properties (CSS variables)?",
    back: "**Define** with double-dash prefix, typically on `:root` for global scope:\n\n```css\n:root {\n  --primary-color: #3b82f6;\n  --spacing-md: 16px;\n}\n```\n\n**Use** with the `var()` function:\n\n```css\n.button {\n  background: var(--primary-color);\n  padding: var(--spacing-md);\n}\n```\n\n`var()` accepts a fallback: `var(--color, blue)`. Variables **cascade and inherit** like other CSS properties.",
    position: 67,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the CSS using custom properties for a theme system.",
    back: "CSS custom properties are defined with `--` prefix on `:root` for global scope, and accessed with `var()`. They can be overridden in child selectors for theming.",
    codeSnippet: `:root {
  {{blank}}primary: #3b82f6;
  --bg-color: #ffffff;
}

.dark-theme {
  --primary: #60a5fa;
  {{blank}}: #1f2937;
}

.button {
  background: {{blank}}(--primary);
  color: var({{blank}}, #ffffff);
}`,
    blankAnswers: ["--", "--bg-color", "var", "--text-color"],
    position: 68,
  },

  // ============================================================
  // TOPIC 15: Accessibility (Cards 69-69 [index 69])
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What are the most important HTML accessibility attributes to know?",
    back: "Key accessibility attributes:\n\n- `alt` on `<img>`: Text alternative for images (empty `alt=\"\"` for decorative images)\n- `aria-label`: Provides an accessible name when visible text is absent\n- `aria-hidden=\"true\"`: Hides decorative elements from screen readers\n- `role`: Defines the element's purpose (e.g., `role=\"navigation\"`, `role=\"alert\"`)\n- `aria-live`: Announces dynamic content changes (`polite` or `assertive`)\n- `aria-describedby`: Links to an element that describes this one\n- `tabindex`: Controls keyboard focus order (`0` = focusable, `-1` = programmatic only)",
    position: 69,
  },
];
