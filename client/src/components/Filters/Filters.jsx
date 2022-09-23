import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { filterCreated, orderByHealthScore, orderByName, getAllRecipes, filterDiet } from '../../redux/actions/actions';
import Spinner from '../Spinner/Spinner';
import style from './Filter.module.css'


export default function Filter({setCurrentPage}){
    const dispatch = useDispatch();
    const [/*order */, setOrder] = useState('')
    const [spinner, SetSpinner] = useState(false);

    const handleFilterHealth = (e) =>{
        dispatch(orderByHealthScore(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    };

    const handleOrderName = (e) => {
        dispatch(orderByName(e.target.value))
        
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }
    const handlefilterDiet = (e) =>{
        dispatch(filterDiet(e.target.value))
        setCurrentPage(1)
        setOrder('')
    }

    const handleClick = (e) => {
        SetSpinner(true)
        e.preventDefault()
        dispatch(getAllRecipes())
        setTimeout(()=>{
            SetSpinner(false)
        }, 1000)
        setCurrentPage(1)
        setOrder('')
    }

    return (
        <div >
            {
                spinner ? <Spinner /> :
                <div className={style.filtersContainer}>
                    <div>
                        <select className={style.selectFilter} onChange = {e => handleOrderName(e)}>
                            <option hidden>Sort By Name</option>
                            <option value = 'asc'> A-Z </option>
                            <option value = 'des'> Z-A</option>
                        </select>
                    </div>
                    <div className={style.filtersContainer}>
                    <div>
                        <select className={style.selectFilter} onChange={e=> handleFilterCreated(e)}>
                            <option hidden> Origin </option>
                            <option value = 'All'> All </option>
                            <option value= 'Created'> Created </option>
                            <option value= 'Existing'> Existing </option>
                        </select>
                    </div>
                    <select className={style.selectFilter} onChange= {e => handlefilterDiet(e)}>
                        <option hidden> Diets </option>
                        <option value = 'dairy free'> Dairy Free </option>
                        <option value = 'gluten free'> Gluten Free </option>
                        <option value = 'ketogenic'> Ketogenic </option>
                        <option value = 'lacto ovo vegetarian'> Lacto Ovo Vegetarian </option>
                        <option value = 'fodmap friendly'> Fodmap Friendly </option>
                        <option value = 'paleolithic'> Paleolithic </option>
                        <option value = 'pescetarian'> Pescatarian </option>
                        <option value = 'primal'> Primal </option>
                        <option value = 'vegan'> Vegan </option>
                        <option value = 'whole 30'> Whole 30 </option>
                    </select>
                    </div>
                    <div>
                    <select className={style.selectFilter} onChange={e => handleFilterHealth(e)}>
                        <option hidden> Health Score </option>
                        <option value = 'min'> Min </option>
                        <option value='max'> Max </option>
                    </select>
                    </div>
                    <div>
                        <button className={style.buttonReset} onClick = {e => handleClick(e)}> Clean Filter </button>
            </div>
            </div>
}
        </div>
    );
}