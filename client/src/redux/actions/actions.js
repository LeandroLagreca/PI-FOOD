import axios from 'axios';


export const Get_All_Recipes = 'Get_all_recipes';
export const Get_All_Diet = 'Get_all_diet';
export const filter_By_Created = 'Filter_by_created'
export const post_Recipes = 'Post_Recipes';
export const Search_recipe = 'Search_Recipe';
export const Filter_Diet = 'filter_diet';
export const Order_By_Name = 'order_by_name';
export const Order_Health_Score = 'order_health_score';
export const Get_Detail = 'get_details';
export const Clear_detail= 'Clear_Details';
export const DELETE_RECIPE = 'Delete_Recipe'
/*
return async function(dispatch){
    const response = await axios.get('http://localhost:3001/recipes')
    return dispatch({
        type : Get_All_Recipes,
        payload: response.data
    })
} */
export function getAllRecipes() {
    return async function(dispatch){
    return fetch('http://localhost:3001/recipes')
    .then((response)=> response.json())
    .then((json)=>{
        dispatch({type:Get_All_Recipes, payload: json})
    })
};
}
export function Getdetail(id){
    return async function (dispatch){
        const detail = await axios.get(`http://localhost:3001/recipes/${id}`)
        console.log(detail)
        return dispatch({
            type : Get_Detail,
            payload: detail.data
        })
    }
}

export function postRecipes(payload){
    return async function(dispatch){
        try {
        const response = await axios.post('http://localhost:3001/recipes', payload)
        console.log(response)
        return response;
    } catch(error){
        console.log(error)
    }
}
};

export function SearchRecipes(name){
    return async function(dispatch){
        const search = await axios.get('http://localhost:3001/recipes?name=' + name)
        console.log(search.data)
        return dispatch({
            type: Search_recipe,
            payload: search.data
        })
    }
}

export function getAllDiet(){
    return function(dispatch){ axios.get('http://localhost:3001/diets')
    .then((res)=>{
        dispatch(
            {type: Get_All_Diet,
            payload:res.data})
    })
    }
};

export function filterCreated(payload){
    return{
        type : filter_By_Created,
        payload
    }
};

export function filterDiet(payload){
    return {
        type : Filter_Diet,
        payload
    }
};

export function orderByName(payload){
    return {
        type : Order_By_Name,
        payload
    }
};

export function orderByHealthScore(payload){
    return{
        type: Order_Health_Score,
        payload
    }
};

export function clearDetail(payload){
    return {
        type: Clear_detail,
        payload    
    }
}

export const deleteRecipe = function (id){
    return { type: DELETE_RECIPE, payload: id };
}