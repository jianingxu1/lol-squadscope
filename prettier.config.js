// prettier.config.js
module.exports = {
  semi: true, // Use semicolons at the end of statements.
  trailingComma: 'all', // Use trailing commas wherever possible.
  singleQuote: true, // Use single quotes for string literals.
  printWidth: 100, // Maximum line width before code formatting.
  tabWidth: 2, // Number of spaces for each level of indentation.
  jsxSingleQuote: true, // Use single quotes for JSX attributes.
  bracketSpacing: true, // Add spaces inside curly braces in object literals.
  arrowParens: 'always', // Always include parentheses for arrow function parameters.
  endOfLine: 'auto', // Determine line endings based on your environment (LF for Unix-like systems, CRLF for Windows).
  plugins: ['prettier-plugin-tailwindcss'],
};
