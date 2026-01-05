const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Ensure display starts with 0
display.value = "0";
display.style.textAlign = "center";

function appendToDisplay(input) {
    if (display.value === "0") {
        display.value = input;
    } else {
        display.value += input;
    }
    adjustFontSize();
    adjustAlignment();
}

function adjustFontSize() {
    const length = display.value.length;

    if (length > 12) {
        display.style.fontSize = "1.5rem";
    } else {
        display.style.fontSize = "2rem";
    }

    display.scrollLeft = display.scrollWidth;
}

function adjustAlignment() {
    if (display.value.length > 10) {
        display.style.textAlign = "right";
    } else {
        display.style.textAlign = "center";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (!value) return;

        if (value === "clear") {
            display.value = "0";
        }
        else if (value === "backspace") {
            display.value = display.value.slice(0, -1) || "0";
        }
        else if (value === "percent") {
            applyPercent();
        }
        else if (value === "=") {
            calculate();
        }
        else {
            appendToDisplay(value);
            return;
        }

        adjustFontSize();
        adjustAlignment();
    });
});

function clearDisplay() {
    display.value = "0";
    adjustAlignment();
}

function applyPercent() {
    if (!display.value || display.value === "0") return;

    const match = display.value.match(/(\d+\.?\d*)$/);
    if (!match) return;

    const number = match[0];
    const percentValue = parseFloat(number) / 100;

    display.value =
        display.value.slice(0, -number.length) + percentValue;

    adjustFontSize();
    adjustAlignment();
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
    adjustFontSize();
    adjustAlignment();
}

//funtion to get uers fullname
/*const fullName = (firstName, lastName) => {
    let fullName = firstName + " " + lastName;
    return fullName;
}


console.log(fullName("Joshua", "Sampson"))*/