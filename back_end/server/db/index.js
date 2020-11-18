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
        pool.query('SELECT spending.value, spending.idspending, spending.type, DATE_FORMAT(spending.date, "%d-%m-%Y") AS Date, category.name FROM spending INNER JOIN category ON spending.categoryid = category.idcategory ORDER BY Date DESC', (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    })
};

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

module.exports = appdb;