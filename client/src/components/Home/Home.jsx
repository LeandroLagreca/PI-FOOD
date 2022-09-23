
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllRecipes} from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import Filter from '../Filters/Filters';
import style from './Home.module.css'
import Card from '../Cards/Cards';
import SearchBar from '../Search Bar/SearchBar';

export default function Home(){
    const dispatch = useDispatch()
    const AllRecipes = useSelector((state)=> state.recipes)
    const [currentPage, SetCurrentPage] = useState(1)
    const [RecipeXPage] = useState(9)
    const indexOfLastRecipe= currentPage * RecipeXPage;
    const indexOFirstRecipe = indexOfLastRecipe - RecipeXPage;
    const currentRecipes= AllRecipes.slice(indexOFirstRecipe, indexOfLastRecipe)
    const paginate = (pageNumber) => SetCurrentPage(pageNumber);

    
    const changePage = (pageNumber)=>{
        SetCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getAllRecipes())
    }, [dispatch])

    return (
        <div className={style.homelogo}>
        {currentRecipes.length > 0 ? (
            <div>
                <div className={style.containerNav}>
                    <SearchBar />
                <Link to='/createRecipes'>
                    <button className={style.buttonCreate}>Create Recipes</button>
                </Link>
                <img className={style.homelogo} alt =''></img>
                    </div>
            <Filter  
                setCurrentPage={SetCurrentPage}/>
                <Pagination RecipeXPage={RecipeXPage}
                AllRecipes={AllRecipes.length}
                paginate = {paginate}
                currentPage={currentPage}
                changePage={changePage}/>
                <div className={style.containerCard}>
                    {currentRecipes !== 'NotFound' ? (
                        currentRecipes && currentRecipes.map((e)=>{
                            return (
                                <div key={e.name}>
                                    <div>
                                        <Link className={style.linkHome} 
                                        to={`recipes/${e.id}`}>
                                            <Card 
                                            name ={e.name}
                                            image={e.image}
                                            healthScore={e.healthScore}
                                            createdInDb={e.createdInDb}
                                            diets={e.diets} />
                                        </Link>
                                        </div>
                                        </div>
                            )
                        })
                        ) : (
                            'Not Found'
                        )}
                        </div>
                        </div>
                        ): (
                            <Spinner />
                        
                    )}
                </div>
                );
                }

