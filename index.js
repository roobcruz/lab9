/* Require external APIs and start our application instance */
var express = require('express');
var mysql = require('mysql');
var app = express();

/* Configure our server to read public folder and ejs files */
app.use(express.static('public'));
app.set('view engine', 'ejs');

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'roober', //username of the account that has the database
    password: 'roober', //password of that account
    database: 'quotes_db'
});
connection.connect();

/* The handler for the DEFAULT route */
app.get('/', function(req, res){
    var statement = "select category from l9_quotes";
    connection.query(statement, function(error, found){
        console.log(found);
        let catSet = new Set();
        found.forEach(function(c){
            catSet.add(c.category);
        });
        console.log(catSet);
        res.render('home', {catSet, catSet});
    });
});

/* The handler for the /author route */
/**
app.get('/author', function(req, res){
    var statement = 'select * from l9_author where firstName=\'' 
                + req.query.firstname + '\' and lastName=\'' 
                + req.query.lastname + '\';'
	connection.query(statement, function(error, found){
	    var author = null;
	    if(error) throw error;
	    if(found.length){
	        author = found[0];
	        // Convert the Date type into the String type
	        author.dob = author.dob.toString().split(' ').slice(0,4).join(' ');
	        author.dod = author.dod.toString().split(' ').slice(0,4).join(' ');
	    }
	    //console.log("This is author: " + author);
	    console.log("Found is right below");
	    console.log(found);
	    console.log("And Found[0] is...");
	    console.log(found[0]);
	    res.render('author', {author: author});
	});
}); **/

/* The handler for the /author/name/id route */
/**
app.get('/author/:aid', function(req, res){
    var stmt = 'select quote, firstName, lastName ' +
               'from l9_quotes, l9_author ' +
               'where l9_quotes.authorId=l9_author.authorId ' + 
               'and l9_quotes.authorId=' + req.params.aid + ';'
    connection.query(stmt, function(error, results){
        if(error) throw error;
        var name = results[0].firstName + ' ' + results[0].lastName;
        res.render('quotes', {name: name, quotes: results});      
    });
}); **/

app.get('/keyword', function(req, res) {
    var stmt = "select * " + 
               "from l9_quotes, l9_author " + 
               "where l9_quotes.quote like '%" + req.query.keyword + "%' and l9_quotes.authorId=l9_author.authorId;"
    connection.query(stmt, function(error, found) {
        if(error) throw error;
        if(found.length){
            //console.log(found);
            var keyword = req.query.keyword
            res.render('keyword', {quotes: found, keyword: keyword});
        }else{
            res.render('error');
        }
        console.log("This is what I found...");
        console.log(found);
        //var name = found[0].firstName + ' ' + found[0].lastName;
        
    })
})

app.get('/category', function(req, res) {
    var stmt = "select * " + 
               "from l9_quotes, l9_author " + 
               "where l9_quotes.category='" + req.query.category + "' and l9_quotes.authorId=l9_author.authorId;"
    console.log(req.query.category);
    connection.query(stmt, function(error, found) {
        if(error) throw error;
        if(found.length){
            //console.log(found);
            res.render('category', {quotes: found});
        }else{
            res.render('error');
        }
        console.log("This is what I found...");
        //console.log(found);
        //var name = found[0].firstName + ' ' + found[0].lastName;
        console.log(found[0]);
        
    })
})

app.get('/sex', function(req, res) {
    var stmt = "select * " + 
               "from l9_quotes, l9_author " + 
               "where l9_author.sex='" + req.query.gender + "' and l9_quotes.authorId=l9_author.authorId;";
    connection.query(stmt, function(error, found) {
        if(error) throw error;
        if(found.length){
            //console.log(found);
            res.render('sex', {quotes: found});
        }else{
            res.render('error');
        }
        console.log("This is what I found...");
        //console.log(found);
        console.log(req.query.gender);
        //var name = found[0].firstName + ' ' + found[0].lastName;
        console.log(found);
        
    })
})

app.get('/authorfull', function(req, res) {
    var stmt = "select * " + 
               "from l9_quotes, l9_author " + 
               "where l9_author.firstName='" + req.query.firstname + "' and l9_author.lastName='" + req.query.lastname + "' and l9_quotes.authorId=l9_author.authorId;";
    connection.query(stmt, function(error, found) {
        if(error) throw error;
        if(found.length){
            //console.log(found);
            res.render('authorfull', {quotes: found});
        }else{
            res.render('error');
        }
        console.log("This is what I found...");
        //console.log(found);
        //var name = found[0].firstName + ' ' + found[0].lastName;
        console.log(found);
        
    })
})

app.get('/authorfirst', function(req, res) {
    var stmt = "select * " + 
               "from l9_quotes, l9_author " + 
               "where l9_author.firstName='" + req.query.firstname + "' and l9_quotes.authorId=l9_author.authorId;";
    connection.query(stmt, function(error, found) {
        if(error) throw error;
        if(found.length){
            res.render('authorfirst', {quotes: found});
        }else{
            res.render('error');
        }
        console.log("This is what I found...");
        //console.log(found);
        //var name = found[0].firstName + ' ' + found[0].lastName;
        console.log(found);
        
        
    })
})



/* The handler for undefined routes */
app.get('*', function(req, res){
   res.render('error'); 
});

/* Start the application server */
app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})