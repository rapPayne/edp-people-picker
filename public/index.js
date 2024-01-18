let errorMessage = "";
let unpickedPeople = [];
let pickedPeople = [];

window.addEventListener('DOMContentLoaded', getPeople);
async function getPeople() {
  const url = `/api/people`;
  pickedPeople = [];
  unpickedPeople = await fetch(url)
    .then((res) => res.json());

  drawPeople();
}

function drawPeople() {
  const unpickedHtml = unpickedPeople.map(person => drawPerson(person)).join("");
  document.querySelector('section#unpickedPeople').innerHTML = unpickedHtml;
  const pickedHtml = pickedPeople.map(person => drawPerson(person)).join("");
  document.querySelector('section#pickedPeople').innerHTML = pickedHtml;
}

function pickRandomPerson() {
  const randomNumber = Math.floor(Math.random() * unpickedPeople.length);
  pickedPerson = unpickedPeople[randomNumber];
  pickedPeople = [...pickedPeople, pickedPerson];
  unpickedPeople = unpickedPeople.filter(person => person !== pickedPerson);
  console.log(`Person is ${pickedPerson.name}`);
  drawPeople();
}

function drawPerson(person) {
  return `<div class="person">${person.name}</div>`;
}