angular.module('database')
  .service('DatabaseService', DatabaseService);
DatabaseService.$inject = ['UserService', 'BusinessService', '$q'];
function DatabaseService(UserService, BusinessService, $q) {
  var service = this;
  service.$onInit = $onInit();

  function $onInit() {
    service.database = firebase.database();
  }

  service.setDatabase = function(database) {
    service.database = database;
  };

  service.getDatabase = function() {
    return service.database;
  };

  service.createUser = function(user) {
    service.database.ref('users/' + user.uid).set({
      displayName: user.displayName,
      email: user.email,
      business: 'n/a'
    });
    console.log('Created user...');
  };

  service.getUser = function(user) {
    return service.database.ref('/users/' + user.uid).once('value')
      .then(function(snapshot) {
        UserService.setData(snapshot.val());
        return UserService.getData();
      });
  };

  service.getBusiness = function(uid) {
    console.log('Business UID: ', uid);
    function getBusiness() {
      return $q(function(resolve, reject) {
        service.database.ref('/businesses/' + uid).once('value')
          .then(function(snapshot) {
            if (snapshot.val()) {
              BusinessService.setBusiness(snapshot.val());
              resolve(BusinessService.getBusiness());
            } else {
              BusinessService.setBusiness(null);
              reject(BusinessService.getBusiness());
            }
          });
      });
    }
    var promise = getBusiness();
    promise.then(function(response) {
      console.log(response);
    }, function(reason) {
      console.log(reason);
    });
  };

  service.createBusiness = function(business, user) {
    console.log(business, user);
    var newBusinessKey = service.database.ref().child('businesses').push().key;
    user.data.business = newBusinessKey;
    service.update('businesses', newBusinessKey, business);
    service.update('users', user.uid, user.data);
    return newBusinessKey;
  };

  service.update = function(collection, key, data) {
    var updates = {};
    updates['/' + collection + '/' + key] = data;
    return service.database.ref().update(updates);
  };
}
