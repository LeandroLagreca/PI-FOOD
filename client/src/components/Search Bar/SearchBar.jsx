import{useState} from 'react';
import {useDispatch} from 'react-redux';
import { SearchRecipes } from '../../redux/actions/actions';
import Spinner from '../Spinner/Spinner';
import style from './SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [recipeName, SetRecipeName] = useState("")
    const [spinner, setSpinner] = useState(false);

    
    const handleSubmit = (e) =>{
        e.preventDefault()
        setSpinner(true);
        dispatch(SearchRecipes(recipeName))
        setTimeout(()=> {
            setSpinner(false)
        }, 4000)
        SetRecipeName("")
    };
    
    const handleInputChange = (e) => {
        SetRecipeName(e.target.value)
    };
    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            handleSubmit(e)
        }
    };

    return (
        <div>
            {
                spinner ? <Spinner /> :
                <div>
                    <input 
                    onKeyPress={handleKeyPress}
                    className = {style.input}
                    onChange = { (e) => handleInputChange(e)}
                    type='text'
                    placeholder='Search Recipes' />
                    <button 
                    className={style.btn}
                    onClick = {(e)=> handleSubmit(e)}
                    type='submit'> Search </button>
                    </div>
            }
        </div>
    )
}