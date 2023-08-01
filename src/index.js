module.exports = function toReadable(number) {
    let digitsAsStrTo20 = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];

    let digitsAsStr = {
        1: "one",
        2: "twen",
        3: "thir",
        4: "four",
        5: "fif",
        6: "six",
        7: "seven",
        8: "eigh",
        9: "nine",
    };

    let postfix = ["ty ", " hundred ", " thousand ", " million "];

    function convertNumberToWordUp100(number) {
        if (number < 20) return digitsAsStrTo20[number];

        if (number >= 20 && number < 100) {
            let firstDigits = Math.trunc(number / 10);
            let secondDigits = number % 10;

            if (secondDigits != 0) {
                return (
                    digitsAsStr[firstDigits] +
                    postfix[0] +
                    digitsAsStrTo20[secondDigits]
                );
            } else return digitsAsStr[firstDigits] + postfix[0];
        }
    }

    function convertNumberToWordUp1000(number) {
        if (number >= 100) {
            let dozens = splitNumberByHundreds(number, 2).reverse();

            if (number % 100 === 0)
                return digitsAsStrTo20[dozens[0]] + postfix[1];

            let firstDigits = dozens[0];
            let secondDigits = dozens[1];

            return (
                digitsAsStrTo20[firstDigits] +
                postfix[1] +
                convertNumberToWordUp100(secondDigits)
            );
        } else return convertNumberToWordUp100(number);
    }

    function splitNumberByHundreds(number, N) {
        let str = number.toString();

        const arr = [];

        for (let i = str.length; i > 0; i -= N) {
            arr.push(str.substring(i, i - N));
        }

        return arr;
    }

    let hundreds = splitNumberByHundreds(number, 3);

    let words = [];
    for (let i = 0; i < hundreds.length; i++) {
        let str = convertNumberToWordUp1000(hundreds[i]);

        if (i != 0) str += postfix[i + 1];
        words.push(str);
    }

    let result = words.reverse().join("").trim();

    return result;
};
