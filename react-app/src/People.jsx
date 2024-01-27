/* eslint-disable react/prop-types */
import { PersonCard } from './PersonCard';
import './People.css';

export function People({ people, header }) {
  if (!people || people.length === 0) return undefined;
  return (
    <section className="People">
      <h2>{header}</h2>
      <div className="people-wrapper">
        {people.map(person => <PersonCard person={person} key={person.name} />)}
      </div>
    </section>
  )
}