(function () {
    'use strict';

    app.factory('driverDataById', ['$http', '$q', 'data', function($http, $q, data) {

        function getDriverData(id) {
            return data.get('/drivers/' + id)
        }

        return {
            getDriverData: getDriverData
        }
    }]);
})();
