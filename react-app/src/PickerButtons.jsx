/* eslint-disable react/prop-types */
import { useRef } from "react"
import { Button } from './Button';
import './PickerButtons.css';

export function PickerButtons({ getAllThePeople, pickRandomPerson, stashPerson }) {
  const dialogRef = useRef();
  const openDialog = () => {
    dialogRef.current.showModal();
  }
  const dialogConfirm = () => {
    getAllThePeople();
    dialogRef.current.close();
  }
  const dialogCancel = () => {
    dialogRef.current.close();
  }

  return (
    <>
      <dialog ref={dialogRef} className="Popup">
        <h2>Are you sure?</h2>
        <section className="Buttons">
          <Button handleClick={dialogCancel} text="Cancel" />
          <Button handleClick={dialogConfirm} text="Confirm" />
        </section>
      </dialog>
      <section className="Buttons">
        <Button handleClick={openDialog} text="Get the people" />
        <Button handleClick={pickRandomPerson} text="Pick a random person" />
        <Button handleClick={stashPerson} text="Stash" />
      </section>
    </>
  )
}