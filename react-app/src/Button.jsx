/* eslint-disable react/prop-types */
import './Button.css';

export const Button = ({ text, handleClick }) => (
  <section className="Button">
    <button onClick={handleClick}>{text}</button>
  </section>
)