import React from 'react';
import Spinner from '../Spinner/Spinner';
import style from './Cards.module.css'

export default function Card({name, image, diets, createdInDb, healthScore}){
    <Spinner />
    return (
        <div className={style.cardContainer}>
            <h1 className={style.titleCard}>{name}</h1>
            <img className={style.imgCard} src={image} alt={name}></img>
            <p className={style.diets}>
                {!!createdInDb
                ? diets.map((e,i)=>{
                    return i === diets.length -1? e.name : e.name + ' - '
                }):
                diets.map((e,i)=>{
                    return i === diets.length -1? e : e + ' - '
                })
                } 
            </p>
            <h3 className ={style.healthScore} >Health Score: {healthScore}</h3>
        </div>
    )
}
<Spinner />