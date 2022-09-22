const {Router} = require('express');
const db = require('../db');
const {Recipe, Diet} = require('../db');
const router = Router();

const DietDb = ['gluten free', 'ketogenic', 'vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'whole 30', 'dairy free', 'fodmap friendly'];

const DietList = async (req, res)=>{
    DietDb.forEach(e => {
        Diet.findOrCreate({
            where: {
                name:e
            }
        })
    })
    const diets = await Diet.findAll()
    res.status(200).json(diets)
}

module.exports = {
    DietList
}