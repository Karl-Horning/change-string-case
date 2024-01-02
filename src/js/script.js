const pressed = [];
const secretCode = "wooooooooooo";
const searchButton = document.getElementById("searchButton");
const stringToFormat = document.getElementById("stringToFormat");

/**
 * Handles key events for secret code checking.
 *
 * @param {KeyboardEvent} e - The key event.
 */
const handleSecretCodeCheck = (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join("").includes(secretCode)) {
        console.log("Ding Ding!");
        cornify_add();
    }
};

/**
 * Converts a string to snake_case.
 *
 * @param {string} str - The input string.
 * @returns {string} - The formatted string.
 * Example of using toSnakeCase:
 * @example
 * const inputString = 'This is  a   _sample-string  with--special___characters! and hyphens_';
 * const snakeCaseResult = toSnakeCase(inputString);
 * console.log(snakeCaseResult);
 * // Output: 'this_is_a_sample_string_with_special_characters_and_hyphens'
 */
const toSnakeCase = (str) => {
    return (
        str
            // Add spaces before capital letters
            .replace(/([A-Z])/g, " $1")

            // Replace multiple hyphens with a single hyphen
            .replace(/-+/g, "-")

            // Replace whitespace characters and hyphens with underscores
            .replace(/[\s-]+/g, "_")

            // Remove all special characters except underscores
            .replace(/[^\w\s]|_/g, "_")

            // Replace multiple underscores with a single underscore
            .replace(/_+/g, "_")

            // Remove special characters from the beginning and end of the string
            .replace(/^[^a-zA-Z0-9]+/, "")
            .replace(/[^a-zA-Z0-9]+$/, "")

            // Convert the string to lowercase
            .toLowerCase()
    );
};

/**
 * Converts a string to kebab-case.
 *
 * @param {string} str - The input string.
 * @returns {string} - The formatted string.
 */
const toKebabCase = (str) => {
    return (
        str
            // Add spaces before capital letters
            .replace(/([A-Z])/g, " $1")

            // Replace multiple hyphens with a single hyphen
            .replace(/-+/g, "-")

            // Replace whitespace characters and underscores with hyphens
            .replace(/[\s_]+/g, "-")

            // Remove all special characters except hyphens
            .replace(/[^\w\s-]|_/g, "")

            // Replace multiple hyphens with a single hyphen
            .replace(/-+/g, "-")

            // Remove hyphens from the beginning and end of the string
            .replace(/^-+/, "")
            .replace(/-+$/, "")

            // Convert the string to lowercase
            .toLowerCase()
    );
};

/**
 * Converts a string to PascalCase.
 *
 * @param {string} str - The input string.
 * @returns {string} - The formatted string.
 */
const toPascalCase = (str) => {
    return (
        str
            // Replace all whitespace, special characters, and underscores with a single space
            .replace(/[^\w\s]|_+/g, " ")
            .replace(/\s+/g, " ")
            // Remove whitespace from beginning and end
            .trim()
            // Capitalise the first letter of each word
            .replace(/(?:^|\W|_)\w/g, (match) => {
                return match.toUpperCase();
            })
            // Replace whitespace characters
            .replace(/[\s]+/g, "")
    );
};

/**
 * Converts a string to camelCase.
 *
 * @param {string} str - The input string.
 * @returns {string} - The formatted string.
 */
const toCamelCase = (str) => {
    // Use the toPascalCase function to format the string
    const pascalCase = toPascalCase(str);
    // Make the first character in a string lower case
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
};

/**
 * Formats the input string based on the selected case and copies it to the clipboard.
 */
const formatString = () => {
    const stringToFormat = document.getElementById("stringToFormat");
    const caseSelector = document.getElementById("caseSelect");
    let formattedString = String(stringToFormat.value);

    switch (caseSelector.value) {
        case "snakeCase":
            formattedString = toSnakeCase(formattedString);
            break;
        case "kebabCase":
            formattedString = toKebabCase(formattedString);
            break;
        case "camelCase":
            formattedString = toCamelCase(formattedString);
            break;
        case "pascalCase":
            formattedString = toPascalCase(formattedString);
            break;
        default:
            console.error("Unexpected case value");
            break;
    }

    stringToFormat.value = formattedString;

    // copy formatted string to clipboard
    stringToFormat.select();
    navigator.clipboard
        .writeText(formattedString)
        .then(() => console.log("Text successfully copied to clipboard"))
        .catch((err) => console.error("Unable to copy text to clipboard", err));
};

searchButton.addEventListener("click", formatString);

/**
 * Adds a keypress event listener for the Enter key on the string input element.
 *
 * @param {KeyboardEvent} e - The key event.
 */
stringToFormat.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        formatString();
    }
});

window.addEventListener("keyup", handleSecretCodeCheck);
