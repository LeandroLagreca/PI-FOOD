import { useEffect, React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { Getdetail, getAllDiet, clearDetail } from "../../redux/actions/actions";
import Spinner from '../Spinner/Spinner';
import style from './Details.module.css'

export default function RecipesDetails(){
    const dispatch = useDispatch();
    const recipe = useSelector((state)=> state.RecipesDetails)
    const {id} = useParams();
    const [spinner, setSpinner] = useState(false)

    useEffect(()=>{
        setSpinner(true)
        dispatch(clearDetail)
        dispatch(Getdetail(id))
        setTimeout(()=>{
            setSpinner(false)
        }, 1000)
    },[dispatch, id])

    useEffect(()=>{
        dispatch(getAllDiet())
    },[dispatch])

    return(
        <div>
            {
                spinner ? <Spinner />  :
                (
                    <div className={style.containerDetail}>
                        <div className={style.containerGpr}>
                            <div className={style.imgDetail}>
                                <img height='100%' width='100%' src ={recipe.image} alt= 'img' />
                            </div>
                            <div className={style.containerTitle} >
                                <h2 className={style.detailTitle}>{recipe.name}</h2>
                            </div>
                            <div className={style.summaryText}>
                                <h5>Summary: {recipe.summary}</h5>
                                </div>
                                <div className={style.healthText}>
                                <h5>Dish Types: {recipe.dishType}</h5> 
                                </div> 
                                <div className={style.healthText}>
                                    <h5>Health Score: {recipe.healthScore}</h5>
                                    </div>
                            <div className={style.stepText} >
                            {recipe.steps && recipe.steps.length ? <h4>Step by Step:</h4> : null}
                                {recipe.steps ? <h5 > {Array.isArray(recipe.steps) ? recipe.steps.map(e => e.steps.map(f => f.step)) : recipe.steps }</h5>:null}
                                </div> 
                                <div>
                                <h5 className={style.dietsText}>
                                Diets: {
                                    recipe.createdInDb ?
                                    recipe.diets?.map((e)=> e.name).join(' - ')
                                    : recipe.diets?.join(' - ')
                                }
                                </h5>
                                <div className={style.btn}>
                                <Link to="/home">
                                    <button className={style.btnBack}>Back</button>
                                </Link>
                                </div>
                                </div>
                                </div>
                                </div>
                )
            }
        </div>
        
    )};
    <Spinner />