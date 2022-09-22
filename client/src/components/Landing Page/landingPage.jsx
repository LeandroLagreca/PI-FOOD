import React from 'react';
import {Link} from 'react-router-dom';
import style from './landingPage.module.css';


export default function LandingPage(){
    return (
        <>
        <div className={style.container}>
            <div alt = 'BackGround' className={style.img_background}/>
            <Link to='/home' className={style.link}>
            < div className={style.buttonContainer}>
                <button className={style.btn}>Welcome To My App! </button>
            </div>
            </Link>
        </div>
    </>
    )
}