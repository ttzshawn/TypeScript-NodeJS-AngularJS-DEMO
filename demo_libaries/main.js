var splitDrink = function(a, b, c) {
    if (b >= 2 || c >= 4) {
        a = a + parseInt(b / 2) + parseInt(c / 4) + parseInt(c / 4) + parseInt(b / 2);
        b = parseInt(b % 2) + parseInt(b / 2) + parseInt(c / 4);
        c = parseInt(c % 4) + parseInt(c / 4) + parseInt(b / 2);
        return splitDrink(a, b, c);
    } else {
        return a;
    }
}

var calBottle = function(money) {
    var sum = money >= 2 ? parseInt(money / 2) : 0;
    return splitDrink(sum, sum, sum);
}

console.log(calBottle(10));