var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// javascript filter
var fltarray = numbers.filter(function (item) {
    return item > 5;
});

console.log("Original array: ", numbers);
console.log("Filtered array: ", fltarray);
