/* eslint-disable react/prop-types */
import { Button } from './Button';
import './PickerButtons.css';

export const PickerButtons = ({ getAllThePeople, pickRandomPerson, stashPerson }) => (
  <section className="Buttons">
    <Button handleClick={getAllThePeople} text="Get the people" />
    <Button handleClick={pickRandomPerson} text="Pick a random person" />
    <Button handleClick={stashPerson} text="Stash" />
  </section>
)