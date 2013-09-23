function UsersHandler(usersDB, sitesDB){

    this.showSignUpPage = function(req, res){
        res.render('signUp');
    };
    
    this.showLoginPage = function(req, res){
        res.render('login');
    };


    this.logout = function (req, res) {
        req.session.user = null;
        res.statusCode = 302;
        res.setHeader('Location', '/index');
        //res.send("delete " + req.body.userx);
        res.end();
    }

    this.update = function (req, res) {

        console.log("\n site.SiteID: " + req.body.SiteID);

        sitesDB.onReady(function () {
            //   var promies = sitesDB.Sites.filter(' it.SiteID == r.body.SiteID', { r: req })
            var promies = sitesDB.Sites.first(function(Sites){ 

                //console.log("\n site.SiteID: " + this.SiteID);
                //console.log("\n SiteID: " + site.SiteID == this.r + "\n");
               // console.log("\n site.SiteID: " + site.SiteID);
             
                console.log("\n site.SiteID: " + this.username);

                return r.SiteName == this.username

            }, { username: req.body['sitename'], r: sitesDB.Sites });


            //    return site.SiteID == this.SiteID ;
                
            //},{SiteID :req.body.SiteID});


     /*       promies.then(function (site) {
                site = {
                    SiteID: req.body.SiteID,
                    SiteName: req.body.SiteName,
                    SiteUrl: req.body.SiteUrl,
                    Description: req.body.Description,
                    Picture: req.body.Picture,
                    User: req.session.user,
                    Tags: req.body.Tags
                }
                sitesDB.saveChanges();
                res.statusCode = 302;
                res.setHeader('Location', '/dashboard');
                res.end();
            });

            promies.fail(function (err) {

                console.log("\n\n err: \n" + err);
                res.statusCode = 302;
                res.setHeader('Location', '/dashboard');
                res.end();

            });*/
        }); 

        res.statusCode = 302;
        res.setHeader('Location', '/dashboard');
        res.end();
    };

    this.deleteSite = function (req, res) {
        
        sitesDB.onReady(function() {
            //'SitesModel.Sites.SiteID == req.body.SiteID'
            
          sitesDB.Sites.filter(' it.SiteID == r.body.SiteID', { r: req }).removeAll();

            console.log("\n deleted site ID " + req.body.SiteID);
            res.statusCode = 302;
            res.setHeader('Location', '/dashboard');
            //res.send("delete " + req.body.userx);
            res.end();

        });

           //res.send("delete " + req.body.userx);
    };

    this.showUserData = function (req, res) {

        sitesDB.onReady(function () {
            sitesDB.Sites.toArray(function (sites) {
                var rs = [];
                for (s in sites) {
                    if ((sites[s].initData)  && (s.User == req.session.UserName) && (s.UserPass == req.session.password)) {
                                rs.push(sites[s].initData);
                    }
                //    console.log(s.initData);
                }
              //  console.dir(sites);
                res.render('dashboard', { 'sites2': rs, 'username': req.session.UserName });
            });
        });
    };


            this.doSignUp = function (req, res) {
                usersDB.onReady(function () {

                    //TODO add more checks like if password is empty and password confirmatin.
                    var promise = usersDB.Users.first(function (user) {
                        return user.UserName == this.username;
                    }, { username: req.body['username'] })

                    promise.then(function () {
                        console.dir(arguments);
                        res.send('username exists');
                    });

                    promise.fail(function () {
                        usersDB.Users.add({ 'UserName': req.body['username'], 'UserPass': req.body['password'], 'Email': req.body['email'] });
                        usersDB.saveChanges();
                   //     res.send('OK!');
                        res.render('index');
                    });
                });
            };
    
            this.doLogin = function(req, res){
                usersDB.onReady(function(){
                    var promise = usersDB.Users.first(function (user) {

                        return user.UserName == this.username && user.UserPass == this.password;

                    },{ username: req.body['username'], password: req.body['password'] });
            
                    promise.then(function(user){
                        req.session.user = user.initData;

                        console.dir("\n user.initData " + user.initData + "\n");
                       res.statusCode = 302;
                       res.setHeader('Location', '/index');
                      // res.render( 'index', { 'user': req.body['username'], 'r': "lalla" });
                       res.end();

                        //this.showUserData(req, res);
                     //   res.render('login', { 'x1': user.UserPass, 'x2': "sssss" });
                    });
            
                    promise.fail(function(){
                      //  res.send('Failed');
                        res.statusCode = 302;
                        res.setHeader('Location', '/signUp');
                        res.end();
                    });
                });
            };

        }

module.exports = UsersHandler;
