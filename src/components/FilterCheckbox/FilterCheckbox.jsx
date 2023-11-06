

import './FilterCheckbox.css';

export default function FilterCheckbox({ isCheck, changeShort }) {
  return (
    <label className="checkbox style-e">
      <input type="checkbox" checked={isCheck} onChange={() => changeShort()} />
      <div className="checkbox__checkmark"></div>
      <div className="checkbox__body">Короткометражки</div>
    </label>
  );
}





