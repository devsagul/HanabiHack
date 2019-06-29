'use strict';
exports.register = function(server,options,next){
    var db = options.db;
    var service = options.service;
    var routes = options.routes;
    var daos = options.dao;

    // var userDao = new daos.UserDao(db);
    // var userService = new service.UserService(userDao);
    // var route = new routes.UserLogin(userService);
    var dao = new daos.ProductTypeDao(db);
    var service = new service.ProductTypeService(dao);
    var route = new routes.ProductTypeUpdate(service);
    server.route(route.getRoute());

    next();
}

exports.register.attributes = {
    pkg: require('./package.json')
};
