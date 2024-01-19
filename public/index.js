let errorMessage = "";
let unpickedPeople = [];
let pickedPeople = [];
let pickedPerson;

window.addEventListener("DOMContentLoaded", getPeople);
async function getPeople() {
  const url = `/api/people`;
  pickedPerson = undefined;
  pickedPeople = [];
  unpickedPeople = await fetch(url).then((res) => res.json());

  drawPeople();
}

function drawPeople() {
  const unpickedHtml = unpickedPeople
    .map((person) => drawPerson(person))
    .join("");
  document.querySelector("section#unpickedPeople").innerHTML = unpickedHtml;
  const pickedHtml = pickedPeople.map((person) => drawPerson(person)).join("");
  document.querySelector("section#pickedPeople").innerHTML = pickedHtml;
  document.querySelector("section#pickedPerson").innerHTML =
    drawPerson(pickedPerson);
}

function pickRandomPerson() {
  const randomNumber = Math.floor(Math.random() * unpickedPeople.length);
  pickedPerson = unpickedPeople[randomNumber];
  pickedPeople = [...pickedPeople, pickedPerson];
  unpickedPeople = unpickedPeople.filter((person) => person !== pickedPerson);
  console.log(`Person is ${pickedPerson.name}`);
  drawPeople();
}

function drawPerson(person) {
  if (!person) return "";
  return `
  <div class="person" data-id="${person.id}">
   <p>${person.name}</p>
   <img class="person-image" src="${person.picture}" alt="${person.name}" />
  </div>
  `;
}
