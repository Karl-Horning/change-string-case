const pressed = [];
const secretCode = "wooooooooooo";

const handleSecretCodeCheck = (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join("").includes(secretCode)) {
        console.log("Ding Ding!");
        cornify_add();
    }
};

// outputs string by removing punctuation and replacing spaces with hyphens
const formatStrUsingSnakeCase = (str) =>
    str
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

const formatStrUsingKebabCase = (str) =>
    str
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "_")
        .toLowerCase();

// This is  a   _sample-string  with--special___characters! and hyphens_
const toSnakeCase = (str) => {
    return (
        str
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

const toKebabCase = (str) => {
    return (
        str
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

const toPascalCase = (str) => {
    return (
        str
            // Replace all whitespace, special characters, and underscores with a single space
            .replace(/[^\w\s]|_+/g, " ")
            .replace(/\s+/g, " ")
            // Remove whitespace from beginning and end
            .trim()
            // Capitalise the first letter of each word
            .replace(/(?:^|\W|_)\w/g, function (match) {
                return match.toUpperCase();
            })
            // Replace whitespace characters
            .replace(/[\s]+/g, "")
    );
};

const toCamelCase = (str) => {
    const pascalCase = toPascalCase(str);
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
};

function formatString() {
    const stringToFormat = document.getElementById("stringToFormat");
    const caseSelect = document.getElementById("caseSelect");
    let formattedString = String(stringToFormat.value);

    switch (true) {
        case caseSelect.value === "snakeCase":
            formattedString = toSnakeCase(formattedString);
            break;
        case caseSelect.value === "kebabCase":
            formattedString = toKebabCase(formattedString);
            break;
        case caseSelect.value === "camelCase":
            formattedString = toCamelCase(formattedString);
            break;
        case caseSelect.value === "pascalCase":
            formattedString = toPascalCase(formattedString);
            break;
        default:
            break;
    }

    stringToFormat.value = formattedString;

    // copy formatted string to clipboard
    stringToFormat.select();
    navigator.clipboard
        .writeText(formattedString)
        .then(() => console.log("Text successfully copied to clipboard"))
        .catch((err) => console.error("Unable to copy text to clipboard", err));
}

document.getElementById("searchButton").addEventListener("click", formatString);

// Add keypress event listener for the Enter key
document
    .getElementById("stringToFormat")
    .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            formatString();
        }
    });

window.addEventListener("keyup", handleSecretCodeCheck);
