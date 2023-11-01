
import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isCheck, changeShort }) {
  return (
    <div className={`checkbox style-e ${isCheck ? 'checked' : ''}`}>
      <input type="checkbox" checked={isCheck} onChange={changeShort} />
      <div className="checkbox__checkmark"></div>
      <div className="checkbox__body">Короткометражки</div>
    </div>
  );
}





