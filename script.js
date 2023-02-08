let process = document.getElementById("process");

let result = document.getElementById("result");

let buttons = document.querySelectorAll(".no");

let stringResult = "";
let stringProcess = "";

let operator = /[+-/*%]/g;
let number = /[1234567890]/g

let eq = false;

let op="+"

const calc = (val) => {
    // console.log(val);

    //  For Clearing
    if (val == "C") {
        stringResult = "";
        stringProcess = "";
        process.innerHTML = `<p>${stringProcess}</p>`;
        result.innerHTML = `<p>${stringResult}</p>`;
    }

    //  For Backspace
    else if (val == "" && stringProcess!="") {
        try {
            if (stringProcess[stringProcess.length - 1].match(operator) && stringProcess[stringProcess.length - 1] != ".") {
                stringProcess = stringProcess.slice(0, stringProcess.length - 1);

               stringResult=stringProcess;
            }
            else {
                stringResult = stringResult.slice(0, stringResult.length - 1);
                stringProcess = stringProcess.slice(0, stringProcess.length - 1);
            }

            // console.log(stringProcess);
            process.innerHTML = `<p>${stringProcess}</p>`;
            result.innerHTML = `<p>${stringResult}</p>`;
        }
        catch (Error) {
            process.innerHTML = `<p>Error</p>`;
            result.innerHTML = `<p>Error</p>`;
        }
    }

    //  For Equal
    else if (val == "=" && stringProcess != "" && !stringProcess[stringProcess.length - 1].match(operator)) {
        try {
            stringResult = eval(stringProcess);
            process.innerHTML = `<p>${stringProcess}</p>`;
            result.innerHTML = `<p>${stringResult}</p>`;
            eq = true;
        }
        catch (Error) {
            process.innerHTML = `<p>Error</p>`;
            result.innerHTML = `<p>Error</p>`;
        }
    }

    //  For Dot
    else if (val == "." && !stringResult.includes(".")) {
        try {
            stringResult += val;
            stringProcess += val;
            process.innerHTML = `<p>${stringProcess}</p>`;
            result.innerHTML = `<p>${stringResult}</p>`;
        }
        catch (Error) {
            process.innerHTML = `<p>Error</p>`;
            result.innerHTML = `<p>Error</p>`;
        }
    }

    //  For Operator
    else if (val.match(operator) && stringProcess != "" && !stringProcess[stringProcess.length - 1].match(operator) && val != ".") {

        try {
            if (stringProcess[0].match(number) && stringProcess.match(operator) && stringProcess[stringProcess.length - 1].match(number)) {
                try {
                    let a = eval(stringProcess);
                    stringProcess = "";
                    stringResult = "";
                    stringProcess = a + val;
                    process.innerHTML = `<p>${stringProcess}</p>`;
                    eq = false;
                }
                catch (Error) {
                    result.innerHTML = `<p>Error</p>`;
                }
            }
            else {
                try {
                    stringProcess += val;
                    stringResult = "";
                    process.innerHTML = `<p>${stringProcess}</p>`;
                }
                catch (Error) {
                    result.innerHTML = `<p>Error</p>`;
                }
            }
        }
        catch (Error) {
            process.innerHTML = `<p>Error</p>`;
            result.innerHTML = `<p>Error</p>`;
        }
    }

    //  For Numbers
    else if (val.match(number)) {
        try {
            if (eq == true) {
                stringResult = "";
                stringProcess = "";
                eq = false;
            }
            stringResult += val;
            stringProcess += val;
            process.innerHTML = `<p>${stringProcess}</p>`;
            result.innerHTML = `<p>${stringResult}</p>`;
        }
        catch (Error) {
            process.innerHTML = `<p>Error</p>`;
            result.innerHTML = `<p>Error</p>`;
        }
    }
}

buttons.forEach((elem) => {
    // console.log(elem);
    elem.addEventListener('click', (val) => {
        // console.log(val.target.innerHTML);
        calc(val.target.innerHTML);
    })
})