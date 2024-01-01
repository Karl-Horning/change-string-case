// jshint esversion: 6

const pressed = [];
const secretCode = "wooooooooooo";

window.addEventListener("keyup", (e) => {
    console.log(e);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join("").includes(secretCode)) {
        console.log("Ding Ding!");
        cornify_add();
    }
    console.log(pressed);
});

function formatString() {
    let inputOutput = document.getElementById("string");
    let str = String(inputOutput.value);

    // outputs string by removing punctuation and replacing spaces with hyphens
    str = str.replace(/[.,\/#!?$%\^&\*;:{}=\_"'`~()]/g, "");
    str = str.replace(/\s+/g, "-");
    str = str.toLowerCase();
    inputOutput.value = str;

    // copy formatted string to clipboard
    inputOutput.select();
    document.execCommand("Copy");
}
