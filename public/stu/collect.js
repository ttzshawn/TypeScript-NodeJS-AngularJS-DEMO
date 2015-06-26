/* 最大公约数 */
function commonDivisor(a, b) {
    var temp = 0;
    while (b != 0) {
        temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}

/* 数字反转 */
function reverseNum(num) {
    var reverse = 0;
    do {
        var lastDigit = num % 10;
        reverse = reverse * 10 + lastDigit;
        num = parseInt(num / 10);
        console.log(reverse);
    } while (num > 0);
    return reverse;
}


