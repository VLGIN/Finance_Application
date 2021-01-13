const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/add/user', async(req, res, next) =>{
    try{
        let account = req.body.account;
        let pass = req.body.pass;
        let balance = req.body.balance;
        let results = await db.add_user(account, pass, balance);
        res.redirect('/login/' + account + '/' + pass);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

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

router.get('/login/:username/:password', async(req, res, next) => {
    try{
        let results = await db.login(req.params.username, req.params.password);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);        
    }
})

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

router.get('/get/spending/:cate/:userid', async(req, res, next) => {
    try{
        let results = await db.get_spending_cate(req.params.cate, req.params.userid);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/spending/:userid', async(req, res, next) => {
    try{
        let results = await db.get_spending(req.params.userid);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/income/:userid', async(req, res, next) => {
    try{
        let results = await db.get_income(req.params.userid);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/limitation/:userid', async(req, res, next) => {
    try{
        let results = await db.get_limitation(req.params.userid);
        res.json(results);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/year/:userid', async(req, res, next) => {
    try{
        let results = await db.get_year(req.params.userid);
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

router.post('/add/monthly', async(req, res, next) => {
    try{
        let categoryid = req.body.categoryid;
        let value = req.body.value;
        let type = req.body.type;
        let userid = req.body.userid;
        let date = req.body.date;
        let results = await db.add_monthly(userid, categoryid, value, type, date);
        res.redirect('/get/category/0');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/delete/monthly', async(req, res, next) => {
    try{
        let categoryid = req.body.categoryid;
        let userid = req.body.userid;
        let results = await db.delete_monthly(userid, categoryid);
        res.redirect('/get/category');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/get/monthly/:type/:userid', async(req, res, next)=>{
    try{
        let results = await db.get_monthly(req.params.userid, req.params.type);
        res.json(results);
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
        res.redirect('/get/spending/' + userid);
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
        let userid = req.body.userid;
        await db.add_limitation(categoryid, max, userid);
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
        let userid = req.body.userid;
        console.log(categoryid);
        await db.update_limitation(categoryid, value, date, userid);
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
        res.redirect('/get/income/' + userid);
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
        res.redirect('/get/spending/1');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/delete/category', async(req,res, next) => {
    try{
        let id = req.body.id;
        await db.delete_category(id);
        res.redirect('/get/category/0');
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
        res.redirect('/get/income/1');
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/delete/limitation', async(req, res, next) => {
    try{
        let id = req.body.categoryid;
        let userid = req.body.userid;
        await db.delete_limitation(id, userid);
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

router.get('/spending/per/month/:year/:userid', async(req, res, next) => {
    try{
        let result = await db.get_spending_permonth(req.params.year, req.params.userid);
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/income/per/month/:year/:userid', async(req, res, next) => {
    try{
        let result = await db.get_income_permonth(req.params.year, req.params.userid);
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/spending/per/cate/:year/:userid', async(req, res, next) => {
    try{
        let result = await db.get_spending_percate(req.params.year, req.params.userid);
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/income/per/cate/:year/:userid', async(req, res, next) => {
    try{
        let result = await db.get_income_percate(req.params.year, req.params.userid);
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/spending/type/:type/:userid', async(req, res, next) => {
    try{
        let type = req.params.type;
        let userid = req.params.userid;
        let result = await db.get_spending_type(type, userid);
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/income/type/:type/:userid', async(req, res, next) => {
    try{
        let result = await db.get_income_type(req.params.type, req.params.userid);
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;