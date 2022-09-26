import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { postRecipes, getAllDiet, getAllRecipes } from '../../redux/actions/actions';
import style from './Created.module.css'


const validateForm = (input) => {
    let errors = {}
    if (/^[A-Za-z0-9\s]+$/g.test(input.title)) errors.name = 'invalid name'
    if(!input.name) errors.name = 'name is required'
    if(input.name.length < 3 ) errors.name = 'invalid name'
    if(input.name.length > 15) errors.name = 'Invalid name'
    if (!input.summary) {
        errors.summary = "A summary is required";
        } else if (input.summary.length < 20) {
        errors.summary = "must have at least 20 characters";
        }
    if(!input.healthScore){
        errors.healthScore = 'Health Score is required'
    } else if(input.healthScore < 5 || input.healthScore > 100){
        errors.healthScore = 'The healt Score must be between 5 and 100'
    }
return errors;
}

export default function  CreateRecipe(){
    const dispatch = useDispatch()
    const recipes = useSelector((state)=> state.recipes)
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        steps:"",
        diets: [],
        summary:"",
        healthScore:5,
    });

    useEffect(()=>{
        dispatch(getAllDiet())
    },[dispatch])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,

        })

        setErrors(
            validateForm({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    }
    const handleSelectDiets = (e) => {
        if(e.target.checked){
            setInput({
                ...input,
                diets:[...new Set([...input.diets, e.target.value])],
                });
        setErrors(
            validateForm({
                
                    ...input,
                    diets:[...new Set([...input.diets, e.target.value])],
                
            })
        );
        } else if(!e.target.checked){
            setInput({
                ...input,
                diets:[...input.diets.filter(p => p !== e.target.value)]
            })
            setErrors(
                validateForm({
                    ...input,
                    diet:[...input.diets.filter(p => p !== e.target.value)]
                })
            )
        }
    
    }
    const handleSubmitForm = (e) => {
        if (!input.summary) {
            return alert("A summary is required");
            } else if (input.summary.length < 20) {
            alert("Must have at least 20 characters")}
        else if(!input.healthScore){
            return alert('Health Score is required')
        } else if(input.healthScore < 1 || input.healthScore > 100){
            return alert('The healt Score must be between 5 and 100')
        }
    else if(!input.name) return alert('name is required')
    else if(input.name.length < 3) return alert('invalid name')
    else if(input.name.length > 15) return alert('Invalid name')
    else if (/^[A-Za-z0-9\s]+$/g.test(input.title)) return alert('Invalid Name')
    else if(recipes.find((recipes) => recipes.name.toLowerCase()=== input.name.toLowerCase())) { 
            return alert( 'Not create, the Recipe already existing' )
        }
        else if(input.diets.length ===0) return alert('Not create, at least 1 diets is required')
        else if (input.diets.length > 4) return alert('Not create, maximum 4 diets')
        else {
            dispatch(postRecipes(input))
            dispatch(getAllRecipes())
        alert('¡Successfully created recipe!')
        setInput({
        name: "",
        steps:"",
        diets: [],
        summary:"",
        healthScore:5,
            })
        history.push('/home')
        }
    }
    return (
        <div>
            <div className={style.containerForm}>
                <Link to = "/home">
                    <button className={style.ButtonBack}>Back</button>
                </Link>
                <div className={style.containertitle}>
                    <h1>Create Recipe</h1>
                </div>

                <form
                className={style.containerFormInside}
                onSubmit={(e)=> handleSubmitForm(e)}>
                    <div>
                        <h3 className={style.textForm}>Name:</h3>
                        <input 
                        className={style.inputForm}
                        type='text'
                        value={input.name.toLowerCase()}
                        name ='name'
                        placeholder='Title...'
                        onChange={(e) => handleChange(e)}
                        required={true}></input>
                        {errors.name && <p className={style.errorText}>{errors.name}</p>}
                    </div> 

                    <div>
                        <h5 >Summary:</h5>
                        <input
                        className={style.textSummary}
                        type='text'
                        value={input.summary}
                        name='summary'
                        placeholder='Summary...'
                        onChange={(e) => handleChange(e)}
                        ></input>
                        {errors.summary && <p className={style.errorText}>{errors.summary}</p>}
                    </div>

                    <div>
                        <h5>Steps: </h5>
                        <input
                        className={style.textSteps}
                        type="text"
                        name="steps"
                        value={input.steps}
                        placeholder='Steps...'
                        onChange={e => handleChange(e)}
                        />
                            {errors.steps && <p className={style.errorText}>{errors.steps}</p>}
                            
                    </div>

                    <div>
                        <div className={style.DietsForm}>
                    <h5>Select Diets:</h5>
                    <input value ='dairy free' type = 'checkbox' onClick={handleSelectDiets}/> <label>Dairy Free</label>
                    <input value ='gluten free' type = 'checkbox' onClick={handleSelectDiets} /> <label>Gluten Free</label>
                    <input value ='ketogenic' type = 'checkbox' onClick={handleSelectDiets}/> <label>Ketogenic</label>
                    <input value ='lacto ovo vegetarian' type = 'checkbox'onClick={handleSelectDiets} /> <label>Lacto Ovo Vegetarian</label>
                    <input value ='fodmap friendly' type = 'checkbox'onClick={handleSelectDiets} /> <label>Fodmap Friendly</label>
                    <input value ='paleolithic' type = 'checkbox' onClick={handleSelectDiets}/> <label>Paleolithic</label>
                    <input value ='pescetarian' type = 'checkbox'onClick={handleSelectDiets} /> <label>Pescetarian</label>
                    <input value ='primal' type = 'checkbox'onClick={handleSelectDiets} /> <label>Primal</label>
                    <input value ='vegan' type = 'checkbox'onClick={handleSelectDiets} /> <label>Vegan</label>
                    <input value ='whole 30' type = 'checkbox'onClick={handleSelectDiets} /> <label>Whole 30</label>
                    <input value ='vegetarian' type = 'checkbox'onClick={handleSelectDiets} /> <label>Vegetarian</label>
                        </div>
                    </div>
                    {errors.diets && <p className={style.errorText}>{errors.diets}</p>}

                    <div>
                        <h5 className={style.textForm}>Health Score:</h5>
                        <input 
                        className={style.inputForm}
                        type ="number"
                        value={input.healthScore}
                        min = "5"
                        max="100"
                        name= 'healthScore' 
                        onChange = {(e) => handleChange(e)} />
                        {errors.healthScore && (
                            <p className={style.errorText}>{errors.healthScore}</p>
                        )}
                    </div>

                    <div>
                        <button className={style.buttonCreate}
                        type='submit'>Create Recipe</button>
                </div>
                </form>
            </div>
        </div>
    )
}