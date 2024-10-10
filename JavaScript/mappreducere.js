const texts = [
    "Hello Word",
    "Bem vindo ao outro lado da força",
    "Olá, atleticano",
    "Aula map reduce"
]

//map para transformar o array em pares chave valor

const map = texts.flatMap(text => {
    return text.split(' ').map(word => ({word: word, cont: 1}));
})

console.log("Map: ", map);
