/* eslint-disable react/prop-types */
import { PersonCard } from './PersonCard';
import './PickedPerson.css';

export function PickedPerson({ person }) {
  return (
    <section className="pickedPerson">
      <h2>The Lucky Person</h2>
      <div className="people-wrapper">
        <PersonCard person={person} />
      </div>
    </section>
  )
}