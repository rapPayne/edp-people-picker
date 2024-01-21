let errorMessage = "";
let unpickedPeople = [];
let pickedPeople = [];
let pickedPerson;

window.addEventListener('DOMContentLoaded', getPeople);

function openDialogGetPeople() {
  const textDialog = 'This will erase your current progress and reset everything. Are you sure?';
  confirmDialog(textDialog, getPeople);
}

function confirmDialog(text, callback) {
  const dialogConfirm = document.getElementById("dialogConfirm");
  const elemText = document.getElementById("dialogConfirmText");
  const buttonYes = document.getElementById("dialogConfirmYes");
  elemText.innerText = text;
  buttonYes.removeEventListener("click", callback);
  buttonYes.addEventListener("click", callback);
  dialogConfirm.showModal();
}

async function getPeople() {
  const url = `/api/people`;
  pickedPerson = undefined;
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
  document.querySelector('section#pickedPerson').innerHTML = drawPerson(pickedPerson);

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
  if (!person) return "";
  return `
  <div class="person" data-id="${person.id}">
   <p>${person.name}</p>
   <img src="${person.picture}" alt="${person.name}" />
  </div>
  `;
}
