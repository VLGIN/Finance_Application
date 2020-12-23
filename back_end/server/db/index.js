const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'longgiang2010',
    user: "root",
    database: "financial_app",
    host: 'localhost',
    port: '3306',
    multipleStatements: true
});

let appdb = {};

appdb.get_all = () => {
    return new Promise((resolve, reject) =>{
        pool.query('SELECT * FROM user', (err, results) => {
            if(err) {
                return reject(err);
            }

            return resolve(results);
        });
    })
};

appdb.get_one = (id) => {
    return new Promise((resolve, reject) =>{
        pool.query('SELECT user.account, balance FROM user WHERE iduser = ?',[id], (err, results) => {
            if(err) {
                return reject(err);
            }

            return resolve(results[0]);
        });
    })
};

appdb.get_category = (type) => {
    return new Promise((resolve, reject) =>{
        pool.query('SELECT * FROM category WHERE type = ?',[type], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

appdb.get_spending = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT spending.value, spending.idspending, spending.type, DATE_FORMAT(spending.date, "%d-%m-%Y") AS Date, category.name FROM spending INNER JOIN category ON spending.categoryid = category.idcategory;', (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    })
};

appdb.get_spending_cate = (cate) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT spending.categoryid, spending.value, spending.idspending, spending.type, DATE_FORMAT(spending.date, "%d-%m-%Y") AS Date, category.name FROM spending INNER JOIN category ON spending.categoryid = category.idcategory WHERE category.idcategory = ? and month(date) = month(curdate()) ORDER BY Date DESC', [cate], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    })
};

appdb.get_year = () => {
    return new Promise((resolve, reject) => {
        pool.query('(SELECT DISTINCT YEAR(date) AS YEAR from spending) union (SELECT DISTINCT YEAR(date) AS YEAR from income) ORDER BY YEAR DESC;', (err, results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    })
}

appdb.get_income = () => {
    return new Promise((resolve, reject) =>{
        pool.query('SELECT income.value, income.idincome, income.type, DATE_FORMAT(income.date, "%d-%m-%Y") AS Date, category.name FROM income INNER JOIN category ON income.categoryid = category.idcategory ORDER BY Date DESC', (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    })
};

appdb.get_limitation = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT limitation.*, name FROM limitation INNER JOIN category ON limitation.categoryid = category.idcategory', (err, results) => {
            if(err){
                return reject(ree);
            }
            return resolve(results);
        })
    })
}
appdb.update_category = (idcategory, name) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO category (idcategory, name) VALUES (?, ?)', [idcategory,name], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.add_spending = (categoryid, value, date, type, userid) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO spending (categoryid, value, date, type, userid) VALUES (?, ?, ?, ?, ?)', [categoryid, value, date, type, userid], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.add_income = (categoryid, value, date, type, userid) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO income (categoryid, value, date, type, userid) VALUES (?, ?, ?, ?, ?)', [categoryid, value, date, type, userid], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.add_category = (name, type) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO category (name, type) VALUES (?,?)', [name, type], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.update_balance = (value, id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE user SET balance = ? WHERE iduser = ?', [value, id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.delete_spending = (id) => {
    return new Promise((resolve, reject) =>{
        pool.query('DELETE FROM spending WHERE idspending = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.delete_limitation = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM limitation WHERE categoryid = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.add_limitation = (categoryid, max) => {
    return new Promise((resolve, reject)=>{
        pool.query('call add_limitation(?,?);', [categoryid, max], (err, results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.update_limitation = (categoryid, value, date) => {
    return new Promise ((resolve, reject) => {
        pool.query("call update_limitation(?,?, ?);", [categoryid, value, date], (err, results) => {
            if(err){
                return reject(err);
            }
            else resolve(results);
        })
    })
}

appdb.delete_income = (id)=> {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM income WHERE idincome = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.delete_category = (id) => {
    return new Promise ((resolve, reject) => {
        console.log(id);
        pool.query('DELETE FROM category WHERE idcategory = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}


appdb.get_spending_permonth = (year) => {
    return new Promise((resolve, reject) => {
        pool.query('select sum(value) as value, month(date) as month from spending where year(date) = ? group by month(date);', [year], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.get_income_permonth = (year) => {
    return new Promise((resolve, reject) => {
        pool.query('select sum(value) as value, month(date) as month from income where year(date) = ? group by month(date);', [year], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.get_spending_percate = (year) => {
    return new Promise((resolve, reject) => {
        pool.query("select sum(value) as value, name from spending inner join category on spending.categoryid = category.idcategory where year(date) = ? group by name;", [year],(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

appdb.get_income_percate = (year) => {
    return new Promise((resolve, reject) => {
        pool.query("select sum(value) as value, name from income inner join category on income.categoryid = category.idcategory where year(date) = ? group by name;",[year] ,(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}
module.exports = appdb;