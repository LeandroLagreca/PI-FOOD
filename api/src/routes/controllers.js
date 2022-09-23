const { Router } = require('express');
const axios = require('axios')
const {Op} = require('sequelize');
const {Recipe, Diet} = require('../db');
const {API_KEY} = process.env
const router = Router();

const getApiInfo= async() =>{
    let Url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    let apiInfo = Url.data.results.map(e=>{
        return {
            id : e.id,
            name: e.title,
            image: e.image,
            diets: e.diets,
            summary: e.summary,
            healthScore: e.healthScore,
            dishType: e.dishTypes,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
        })
    }
})
    return apiInfo;
};

    const getDbInfo = async() =>{
        return await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: [],
                }
            }
        })
    };

    const apiById = async(id) =>{
        return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
    }

    const apiDB = async (id) =>{
        return await Recipe.findByPk(id,{       
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        
    })
}

const recipeByiD = async (req, res) =>{
    const {id} = req.params;
    try {
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
        let dbRecipesById = await apiDB(id);            
        return res.status(200).json(dbRecipesById)
} else {
    var apiRecipesById = await apiById(id)
    if(apiRecipesById.data.id){
    let info = {           
        image: apiRecipesById.data.image,
        name: apiRecipesById.data.title,
        dishType: apiRecipesById.data.dishTypes,
        diets: apiRecipesById.data.diets,
        summary: apiRecipesById.data.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        healthScore: apiRecipesById.data.healthScore,
        steps: apiRecipesById.data.analyzedInstructions
    }
    return res.send(info)
    }
}

        } catch(error){
        return res.status(400).send('the recipe does not exist')
}
};

const DataRecipe = async (req, res) => {
    const {name} = req.query;
    const data = await getApiInfo();
    const info = await getDbInfo()
    const allData = data.concat(info)
    try {
        if(name !== undefined){
            if(name!== null){
                const li = allData.filter((e)=> e.name.toLowerCase().includes(name.toLowerCase()));
                if(li.length === 0){
                    res.json('not Recet')
                } else {
                    res.json(li)
                }
            }
        } else {
            res.status(200).json(allData)
        }

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const recipeCreate = async(req, res) => {
    try {
        const {name, summary, image, healthScore, steps, diets, createdInDb}= req.body;
        const newRecipe = await Recipe.create({
            name, 
            summary,
            image,
            healthScore,
            createdInDb,
            steps
            
        })
        let dietDB = await Diet.findAll({
            where: {
                name : diets
            }
        })
        newRecipe.addDiet(dietDB)
        res.status(200).json(newRecipe)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    recipeCreate,
    DataRecipe,
    recipeByiD
}