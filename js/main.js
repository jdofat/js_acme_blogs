/* 1. createElemWithText */
function createElemWithText (stringOne="p", textContent="hi", firstClassName) {
    let elText = document.createElement(stringOne);
    elText.innerHTML = textContent;
    if (firstClassName) {
        elText.className = firstClassName;
    };
    return elText;
}
createElemWithText();

/**/





