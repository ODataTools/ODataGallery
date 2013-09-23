var express = require('express'),
    cons = require('consolidate'),
    routes = require('./routes'),
    app = new express(),
    server = require('odata-server'),
    SitesModel = require('./contexts/sites.js'),
    usersModel = require('./contexts/users.js');
	consolidate = require('consolidate');


	var sitesDB = new SitesModel({
	    provider: "mongoDB", databaseName: "yz3uQezi", address: "mongo.onmodulus.net", port: 27017,
	    username: 'root', password: 'root@pass'
	 });

	//console.dir(sitesDB.storageProvider.providerConfiguration.name);

	var usersDB = new usersModel({
	    provider: "mongoDB", databaseName: "d7ageQog", address: "mongo.onmodulus.net", port: 27017,
	    username: 'root', password: 'root'
      });


      //$data.createODataServer({
      //    type: SitesModel,
      //    provider:'mongoDB',
      //      basicAuth: {
      //          username: 'root',
      //          password: 'root@pass'
      //      }
      //  }, '/yz3uQezi', 27017, 'mongo.onmodulus.net');


  
      //  $data.createODataServer({
      //      type:usersModel,               //  type:NorthwindModel,
      //      basicAuth: {
      //          username: 'root',
      //          password: 'root'
      //      }
      //  }, '/d7ageQog', 27017, 'mongo.onmodulus.net');



var conn = {
    type: SitesModel,
    basicAuth: function(username, password){
        if (username == 'admin'){
            return password == 'admin';
        }else return true;
    },
    checkPermission: function(access, user, entitySets, callback){
        if (access & $data.Access.Read){
            callback.success();
        }else if (user == 'admin') callback.success();
        else callback.error('auth fail');
    }
};
    
app.configure(function(){
    app.set('port', process.env.PORT );
    app.engine('html', consolidate.handlebars);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    
    app.use(express.cookieParser());
    app.use(express.session({secret:"session secret"}));
    app.use(express.bodyParser());
    app.use(app.router);
    app.use('/Sites.svc', $data.ODataServer(conn));
    app.use(express.static(__dirname + '/public'));
    
});

routes(app, usersDB, sitesDB);

app.listen(app.get('port'), 'localhost');

console.log('Tsofen OData server listening on http://localhost:3001');

