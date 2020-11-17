_ = require('lodash')

sum = (a, b) => _.add(a, b)
subtract = (a, b) => _.subtract(a, b)
multiply = (a, b) => _.multiply(a, b)
divide = (a, b) => _.floor(_.divide(a, b), 2)

module.exports = {sum, subtract, multiply, divide}
