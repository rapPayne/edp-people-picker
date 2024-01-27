/* eslint-disable react/prop-types */
import './PersonCard.css';

export const PersonCard = ({ person }) => (
  <section className="PersonCard" data-id={person.id}>
    <div className="person-name-container">
      <p className="person-name">{person.name}</p>
    </div>
    <img className="person-avi" src={person.picture} alt={person.name} />
  </section>
)