export async function getPeople() {
  const url = `/api/people`;
  // pickedPerson = undefined;
  // pickedPeople = [];
  // stashedPeople = [];
  let unpickedPeople = await fetch(url)
    .then((res) => res.json());
  return unpickedPeople;
}