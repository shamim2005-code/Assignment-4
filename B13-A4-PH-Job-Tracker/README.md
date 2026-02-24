Answers of Questions :
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ans : getElementById("id") returns one element with that exact id. It is direct and fast when you already know the id.
getElementsByClassName("class") returns a live HTMLCollection of all elements with that class. Live means if DOM changes, this collection updates automatically.
querySelector("selector") returns the first element that matches a CSS selector.
querySelectorAll("selector") returns a static NodeList of all matches for a CSS selector. Static means it does not auto-update after DOM changes.

2. How do you create and insert a new element into the DOM?

ans : We usually do 3 steps:

i.. Create element with document.createElement().
ii. Add content/attributes/classes.
iii. Insert using methods like appendChild(), append(), prepend(), or insertBefore().

Example:

```js
const card = document.createElement("div");
card.textContent = "New Job";
card.classList.add("job-card");
document.getElementById("jobsGrid").appendChild(card);
```

3. What is Event Bubbling? And how does it work?

ans : Event bubbling means an event starts from the target element and then moves upward through parent elements.

If we click a button inside a card, the click event first happens on the button, then on the card, then on higher parent containers, up to document.

This behavior helps when we want a parent element to react to child events.

4. What is Event Delegation in JavaScript? Why is it useful?

ans : Event delegation means attaching one event listener to a parent element and handling child events from there.

Why useful:

i. Fewer event listeners, so cleaner and often better performance.
ii. Works for dynamically added elements (new cards/buttons still work without adding new listeners).
iii. Easier to maintain in larger UIs.

5. What is the difference between preventDefault() and stopPropagation() methods?

ans : preventDefault() - stops the browser's default action. Example : preventing a form submit reload or blocking a link navigation .
stopPropagation() stops the event from moving to parent elements.
