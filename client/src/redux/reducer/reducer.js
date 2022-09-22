import { Get_All_Diet,
    Get_All_Recipes,
    Get_Detail,
    post_Recipes,
    Filter_Diet,
    filter_By_Created,
    Search_recipe,
    Order_By_Name,
    Order_Health_Score,
    Clear_detail,
} from "../actions/actions"


const initialState = {
    recipes : [],
    RecipesDetails: [],
    diets: [],
    AllRecipes:[],
}
const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case Get_All_Recipes: {
            return{
                ...state,
                recipes: action.payload,
                AllRecipes: action.payload
            }
        }
        case Get_Detail:{
            return {
                ...state,
                RecipesDetails: action.payload
            }
        }
        case Get_All_Diet:{
            return {
                ...state,
                diets: action.payload
            }
        }
        case post_Recipes:{
            return {
                ...state,
            }
        }
        case Filter_Diet:{
            const AllDiet = state.AllRecipes
            const statusFilter = action.payload === 'All' 
            ? AllDiet 
            : AllDiet.filter((e)=>
                !!e.createdInDb
                ? e.diets.some((g)=> g.name === action.payload)
                : e.diets.some((g)=> g === action.payload)
            )
            if(statusFilter.length === 0) {
                alert('diet does not belong to any food')
                return {
                    ...state,
                    recipes: state.AllRecipes
                }
            } else {
                return {
                ...state,
                recipes: statusFilter,
                }
            }
        }
        case filter_By_Created:{
            const AllRecipesCreated = state.AllRecipes
            const FilterCreated = action.payload === 'Created'
            ? AllRecipesCreated.filter((e)=> e.createdInDb)
            : AllRecipesCreated.filter((e)=> !e.createdInDb)
            if(FilterCreated.length === 0){
                alert('No Recipes Created');
                return {
                    ...state,
                    recipes: AllRecipesCreated
                }
            } else {
                return {
                    ...state,
                    recipes: 
                    action.payload === 'All' ? state.AllRecipes : FilterCreated
                }
            }
        }
        case Order_By_Name: {
            const sorted = action.payload === 'asc'
            ? state.recipes.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
                return 0
            })
            : state.recipes.sort(function (a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                return 0
            })
            return {
                ...state,
                recipes: sorted.map((e)=> e)
            }
        }
        case Order_Health_Score  : {
            const SorteHealthscore = action.payload === 'min'
            ? state.recipes.sort(function(a, b){
                if(a.healthScore > b.healthScore) return 1
                if(b.healthScore > a.healthScore )return -1
                return 0
            })
            : state.recipes.sort(function (a, b){
                if(a.healthScore > b.healthScore )return -1
                if(a.healthScore > b.healthScore ) return 1
                return 0
            })
            return {
                ...state,
                recipes: SorteHealthscore.map((e)=> e)
            }
        }
        case Search_recipe: {
            if(typeof action.payload === 'string'){
                alert('Not found the recipes')
                return {...state}
            }
            return {
                ...state,
                recipes:action.payload
            }
        }
        case Clear_detail : {
            return {
            ...state,
            RecipesDetails: {}
        }
    }

        default :
        return state
    }
};


export default rootReducer;