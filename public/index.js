let errorMessage = "";
let unpickedPeople = [];
let pickedPeople = [];
let stashedPeople = [];
let pickedPerson;

const dialogConfirm = document.getElementById("dialogConfirm");
const buttonYes = dialogConfirm.querySelector("#yes");
buttonYes.addEventListener("click", getPeople);

window.addEventListener('DOMContentLoaded', getPeople);

function confirmDialog() {
  dialogConfirm.showModal();
}

async function getPeople() {
  const url = `/api/people`;
  pickedPerson = undefined;
  pickedPeople = [];
  stashedPeople = [];
  unpickedPeople = await fetch(url)
    .then((res) => res.json());

  drawPeople();
}

function drawPeople() {
  const unpickedHtml = unpickedPeople.map(person => drawPerson(person)).join("");
  document.querySelector('section#unpickedPeople').innerHTML = unpickedHtml;
  const pickedHtml = pickedPeople.map(person => drawPerson(person)).join("");
  document.querySelector('section#pickedPeople').innerHTML = pickedHtml;
  const stashedHtml = stashedPeople.map(person => drawPerson(person)).join("");
  document.querySelector('section#stashedPeople').innerHTML = stashedHtml;
  document.querySelector('section#pickedPerson').innerHTML = drawPerson(pickedPerson);
}

function getNextPerson() {
  if (unpickedPeople.length !== 0) {
    pickRandomPerson(unpickedPeople);
    unpickedPeople = unpickedPeople.filter(person => person !== pickedPerson);

    const stars = document.querySelectorAll('.star');
    stars.forEach(function(star) {
      // Remove the class to reset the animation
      star.classList.remove('animate');
        
      // Trigger reflow to restart the animation
      void star.offsetWidth;

      // Add the class back to start the animation
      star.classList.add('animate');
    });

  } else {
    pickRandomPerson(stashedPeople);
    stashedPeople = stashedPeople.filter(person => person !== pickedPerson);
  }
  drawPeople();
}

function pickRandomPerson(peopleArray) {
  const randomNumber = Math.floor(Math.random() * peopleArray.length);
  pickedPerson = peopleArray[randomNumber];
  pickedPeople = [...pickedPeople, pickedPerson];
  console.log(`Person is ${pickedPerson.name}`);
}

function stashPerson() {
  if (!pickedPerson) return;
  stashedPeople.push(pickedPerson);
  pickedPeople = pickedPeople.filter(person => person !== pickedPerson);
  pickedPerson = undefined;
  drawPeople();
}

function drawPerson(person) {
  if (!person) return "";
  return `
  <div class="person" data-id="${person.id}">
    <div class="person-name-container">
      <p class="person-name">${person.name}</p>
    </div>
    <img class="person-avi" src="${person.picture}" alt="${person.name}" />
  </div>
  `;
}