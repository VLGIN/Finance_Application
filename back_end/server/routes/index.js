const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/get/user', async(req, res, next) => {
    try{
        let results = await db.get_all();
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/get/user/:id', async(req, res, next) => {
    try{
        let results = await db.get_one(req.params.id);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/get/category/:type', async(req, res, next)=>{
    try{
        let results = await db.get_category(req.params.type);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/spending/:cate', async(req, res, next) => {
    try{
        let results = await db.get_spending_cate(req.params.cate);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/spending', async(req, res, next) => {
    try{
        let results = await db.get_spending();
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/income', async(req, res, next) => {
    try{
        let results = await db.get_income();
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/limitation', async(req, res, next) => {
    try{
        let results = await db.get_limitation();
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/post/category', async(req, res, next)=>{
    try{
        let idcate = req.body.id;
        let name = req.body.name;
        let results = await db.update_category(idcate, name);
        res.redirect('/get/category');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    
})

router.post('/post/spending', async(req, res, next) => {
    try{
        let categoryid = req.body.categoryid;
        let value = req.body.value;
        let date = req.body.date;
        let type = req.body.type;
        let userid = req.body.userid;
        await db.add_spending(categoryid, value, date, type, userid);
        res.redirect('/get/spending');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/post/limitation', async(req, res, next) => {
    try{
        let categoryid = req.body.categoryid;
        let max = req.body.max;
        await db.add_limitation(categoryid, max);
        res.redirect('/get/limitation');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/update/limitation', async(req, res, next) => {
    try{
        let categoryid = req.body.categoryid;
        let value = req.body.value;
        let date = req.body.date;
        console.log(categoryid);
        await db.update_limitation(categoryid, value, date);
        res.redirect('/get/limitation');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})
router.post('/post/income', async(req, res, next) => {
    try{
        let categoryid = req.body.categoryid;
        let value = req.body.value;
        let date = req.body.date;
        let type = req.body.type;
        let userid = req.body.userid;
        await db.add_income(categoryid, value, date, type, userid);
        res.redirect('/get/income');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/update/balance', async(req, res, next) => {
    try{
        let value = req.body.value;
        let id = req.body.id;
        await db.update_balance(value, id);
        res.redirect('/get/user');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/delete/spending', async(req, res, next) => {
    try{
        let id = req.body.id;
        await db.delete_spending(id);
        res.redirect('get/spending');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/delete/income', async(req, res, next) => {
    try{
        let id = req.body.id;
        await db.delete_income(id);
        res.redirect('/get/income');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/delete/limitation', async(req, res, next) => {
    try{
        let id = req.body.categoryid;
        await db.delete_limitation(id);
        res.redirect('/get/limitation');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
   
})

router.post('/add/category', async(req, res, next) => {
    try{
        let name = req.body.name;
        let type = req.body.type;
        await db.add_category(name, type);
        res.redirect("/get/category/" + type.toString());
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/spending/per/month', async(req, res, next) => {
    try{
        let result = await db.get_spending_permonth();
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/income/per/month', async(req, res, next) => {
    try{
        let result = await db.get_income_permonth();
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/spending/per/cate', async(req, res, next) => {
    try{
        let result = await db.get_spending_percate();
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/income/per/cate', async(req, res, next) => {
    try{
        let result = await db.get_income_percate();
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;