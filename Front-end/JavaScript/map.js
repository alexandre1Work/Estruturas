const numbers = [1,2,3,4,5];
//variavel chamada do array num = expresão lambda
const double = numbers.map(num => num * 2);

console.log(doubled);
console.log(numbers);
//Output:[2,4,6,8,10]

console.log("\n\n\n Função reduce")

const sum = numbers.reduce((accumulator, currentValue) => accumulator = currentValue, 0);

console.log(sum); //output: 15