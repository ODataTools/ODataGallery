function SitesHandler(usersDB, sitesDB){
	var fs = null;
	
    this.showAddform = function(req, res){
        if(req.session.user){
            res.render('addSite');
            return;
        }
        res.send('You Not Logedin');
        return;
    };

    this.doAddSite = function (req, res) {

         if(!req.session.user){
            res.send('You Not Logedin');
            return;
        }

        fs = require('fs');
        var filename = Math.floor(Math.random() * 100000) + req.files.image.name;
        var publicPath = 'imgs\\sites\\' + filename;
        var newPath = '.\\public\\imgs\\sites\\' + filename;
               fs.renameSync(req.files.image.path, newPath);

        var tags = req.body['tags'].split(',');
        for (t in tags) {
            tags[t] = tags[t].trim();
        }

         console.log("\n\n add data \n");

         sitesDB.onReady(function () {
            // sitesDB.Sites.add({
            //     SiteUrl: req.body['siteurl']
            //     //User: req.session.user.UserName,
            //     //Description: req.body['Description'],
            //     //Tags: ["d","c"], //tags
            //     //SiteName: req.body['sitename'],
            //     //Picture: "\f" , //publicPath,
            //} );
            

             //sitesDB.saveChanges();
             console.log(req.body.siteurl + "siteurl\n");

             sitesDB.Sites.add({
                 SiteName: req.body['sitename'], SiteUrl: req.body.siteurl, User: req.session.user.UserName, Description: req.body['Description'],
                 Tags: tags, Picture: publicPath
                 //   User: "haytahm" //req.session.user.UserName
             });

             sitesDB.saveChanges();

           // console.dir(sitesDB.Sites);
        });
         console.log("\n\n end data");
         res.statusCode = 302;
         res.setHeader('Location', 'index');
         res.end(); 
      //  res.render('index');
    };

    this.showAll = function (req, res) {

        console.log('req.session.user' + req.body.username);

        var user = (req.session.user) ? req.session.user : null;

        sitesDB.onReady(function () {
            sitesDB.Sites.toArray(function (sites) {
                var rs = [];
                for (s in sites) {
                    if (sites[s].initData) {
                        rs.push(sites[s].initData);
                    }
                }

                console.log('User Name:' + req.session);
                if (req.session.user) 
                    res.render('index', { 'sites': rs, 'user': req.session.user });
                else 
                    res.render('index', { 'sites': rs, 'user': null});
           //     console.dir(rs);
               

            });
        });
    };
}

module.exports = SitesHandler;
