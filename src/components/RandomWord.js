var dictionary = [
    "daffodil",
    "robot",
    "finglonger",
    "heiny",
    "werewolf",
    "hufflepuff",
    "jabba",
    "fencing",
    "martini",
    "cheesecake",
    "glitter",
    "rainbow",
    "pedestrian",
    "basic",
    "husk",
    "mimosa",
    "blimp",
    "fattening",
    "pandemic",
    "gasworks",
    "galactic",
    "neutronic"
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomWord() {
    var dictionaryLength = dictionary.length;
    var randomIndex = getRandomInt(dictionaryLength);
    return dictionary[randomIndex];
}

export default randomWord();