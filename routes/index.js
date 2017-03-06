var registerRoutes = require("./users");
//var dashboardRoutes= require("./dashboard");



var constructorMethod = function(app){
        app.use("/",registerRoutes);
        app.use("/index", registerRoutes);

         app.use("/register",registerRoutes);
        app.use("/login",registerRoutes);
        
         app.use("/dashboardAdmin",registerRoutes);
        app.use("/dashboardUser",registerRoutes);
                app.use("/userData",registerRoutes);


}

module.exports = constructorMethod;