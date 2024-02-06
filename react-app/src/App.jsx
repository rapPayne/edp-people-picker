import { useState, useEffect } from 'react';
import { PickerButtons } from './PickerButtons';
import { getPeople } from './getPeople';
import { People } from './People';
import { PersonCard } from './PersonCard';
import { PickedPerson } from './PickedPerson';

export function App() {
  let [selectedPerson, setSelectedPerson] = useState(undefined);
  let [unselectedPeople, setUnselectedPeople] = useState([]);
  let [selectedPeople, setSelectedPeople] = useState([]);
  let [stashedPeople, setStashedPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(peeps => setUnselectedPeople(peeps))
  }, []);

  console.log(selectedPerson?.name, unselectedPeople?.length, selectedPeople?.length, stashedPeople?.length);
  return (
    <>
      <header>
        <h1>People Picker</h1>
        <div className="duck">
          <img className="duck" src="/images/duck.png" />
        </div>

      </header>
      <main>
        <>
          <PickerButtons getAllThePeople={getAllThePeople} pickRandomPerson={pickRandomPerson} stashPerson={stashPerson} />
          {selectedPerson && <section>
            <PickedPerson person={selectedPerson} />
          </section>}
          <People people={unselectedPeople} header="To be chosen" />
          <People people={stashedPeople} header="Stashed" />
          <People people={selectedPeople} header="Chosen already" />
        </>
      </main >
      <footer>
        Copyright &copy; {(new Date()).getFullYear()} us.com
      </footer>
    </>
  )
  async function getAllThePeople() {
    //TODO: Show the 'are you sure' dialog
    //Clear selectedPerson, selectedPeople, stashedPeople, unselectedPeople
    setSelectedPeople([]);
    setStashedPeople([]);
    setUnselectedPeople([]);
    setSelectedPerson(undefined);
    //getPeople and setUnselectedPeople again
    await getPeople()
      .then(peeps => setUnselectedPeople(peeps));
  }

  // Given a list from which to choose, pick a random element and return that 
  // element and the rest of the list.
  function pickRandomElementFromList(list) {
    const element = list[Math.floor(Math.random() * list.length)];
    const rest = list.filter(item => item !== element);
    return [element, rest];
  }

  function pickRandomPerson() {
    // Add the old selectedPerson to selectedPeople
    selectedPerson && setSelectedPeople([...selectedPeople, selectedPerson]);
    let newSelectedPerson, newUnselectedPeople, newStashedPeople;
    // Get a random person from unselectedPeople. If unselectedPeople is empty or 
    // undefined, get them from stashedPeople. Remove them from the list.
    if (!unselectedPeople || unselectedPeople.length > 0) {
      [newSelectedPerson, newUnselectedPeople] = pickRandomElementFromList(unselectedPeople);
      setSelectedPerson(newSelectedPerson);
      setUnselectedPeople(newUnselectedPeople);
    } else {
      [newSelectedPerson, newStashedPeople] = pickRandomElementFromList(stashedPeople);
      setSelectedPerson(newSelectedPerson);
      setStashedPeople(newStashedPeople);
    }
  }
  function stashPerson() {
    if (!selectedPerson) return; // Don't stash if no person is selected. 
    // Remove selectedPerson from unselectedPeople and stashedPeople
    setUnselectedPeople(() => unselectedPeople.filter(person => person !== selectedPerson));
    setStashedPeople(() => stashedPeople.filter(person => person !== selectedPerson));
    // Add selectedPerson to stashedPeople
    setStashedPeople(() => [...stashedPeople, selectedPerson]);
    setSelectedPerson(undefined);
    // call pickRandomPerson
    //pickRandomPerson();
  }
}
