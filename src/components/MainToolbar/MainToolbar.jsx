import React from 'react';
import s from './style.module.css';

export default function MainToolbar({ children }) {
  return (
    <div className={s.wrapper}>
        { children }
    </div>
  )
}
