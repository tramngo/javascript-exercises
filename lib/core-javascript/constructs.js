'use strict';

// Using a switch statement, write a function that returns the text "Weekend"
// for an input of "Saturday" or "Sunday", the text "Weekday" for every other day name,
// and the text "Not a day" for any other input.
function getTypeOfDay(input) {
}

// The following function takes in an array of numbers.
// It should return the sum of all the numbers.
// It should use a for loop.
function sumOfValuesUsingForLoop(numbers) {
}

// The following function takes in an array of numbers.
// It should return the sum of all the numbers.
// It should use a while loop.
function sumOfValuesUsingWhileLoop(numbers) {
}

// The following function takes in an array of customers.
// For each customer it validates the customer and then saves the customer.
// The validation function returns a true/false valid indicating whether the customer
// is valid.
// However, management have noticed a bug where invalid customers are being saved.
// You need to fix this bug through using the continue keyword.
// You should not rename any of the existing parameters or loop variables.
function validateAndCreateCustomers(customers, validateCustomer, saveCustomer) {
    for (let customer of customers) {
        validateCustomer(customer);
        saveCustomer(customer);
    }
}

// The following function returns the binary representations of the numbers 0 to 7 in a comma separated string.
// Modify the code so that if a binary representation is provided (i.e. 011) then only the binary representation
// of the numbers up to and including the provided number are output.
// The current output is always:
// 000, 001, 010, 011, 100, 101, 110, 111
// If the user provides 011 then they should see:
// 000, 001, 010, 011
// Note: the values must still be generated by the existing triple nested loop
// and you are expected to break out of the triple nested loop early.
// As additional challenges, try to achieve the following:
// 1) Don't use any break or continue statements.
// 2) Only use the return statement to return a value once.
//    You can use the return statement without returning a value as many times as you like.
function getBinaryValuesUpTo(input, counters) {
    let ret = [];
    for (counters.i = 0; counters.i <= 1; counters.i++) {
        for (counters.j = 0; counters.j <= 1; counters.j++) {
            for (counters.k = 0; counters.k <= 1; counters.k++) {
                ret.push(`${counters.i}${counters.j}${counters.k}`);
            }
        }
    }
    return ret.join(', ');
}


module.exports = {
    getTypeOfDay,
    sumOfValuesUsingForLoop,
    sumOfValuesUsingWhileLoop,
    validateAndCreateCustomers,
    getBinaryValuesUpTo
};