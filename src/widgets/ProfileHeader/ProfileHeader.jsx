import React from 'react';
import ProfileHeaderImg from '@assets/profileHeader.webp';
import s from './style.module.css';

export default function ProfileHeader() {
    return (
        <img className={s.img} src={ProfileHeaderImg} alt="Профиль" />
    )
}
