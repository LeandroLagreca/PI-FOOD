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
                    <div className={style.containerBgDetail}>
                        <div className={style.containerDetail}>
                            <div className={style.imgDetail}>
                                <img src ={recipe.image} alt= 'img' />
                            </div>
                            <div className={style.conatinerTitle} >
                                <h2 className={style.detailTitle}>{recipe.name}</h2>
                            </div>
                            <div className={style.summarys}>
                                <h5>Summary:{recipe.summary}</h5>
                                </div>
                            <div className={style.containerSteps} >
                                <div className={style.StepsText}>
                                    Steps: {recipe.steps
                                    }
                                </div>
                                </div> 
                                <div>
                                <p>
                                Diets : {
                                    recipe.createdInDb ?
                                    recipe.diets?.map((e)=> e.name).join(' - ')
                                    : recipe.diets?.join(' - ')
                                }
                                </p>
                                <Link to="/home">
                                    <button className={style.btnBack}>Back</button>
                                </Link>
                                </div>
                                </div>
                                </div>
                )
            }
        </div>
        
    )};
    <Spinner />