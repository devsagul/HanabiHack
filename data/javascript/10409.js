'use strict';

angular.module('myApp.messageAnalyzer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messageAnalyzer', {
    templateUrl: 'messageAnalyzer/messageAnalyzer.html',
    controller: 'messageAnalyzerCtrl'
  });
}])

.controller('messageAnalyzerCtrl', function($scope, $http) {
    $scope.init = function(){
      $http.get("http://localhost:8888/home_teaching_sms/get_home_teachers.php")
      .then(function (response) {
        $scope.names = response.data;
      });
    }
    $scope.member = {
          "member_id": ""
    }

    $scope.setMember = function(member_id) {
      $scope.member = {
        "member_id" : member_id
      }
      $scope.formData.member_id = member_id;
    }
    $scope.getMemberMessages = function(member_id) {
        $scope.setMember(member_id);
        console.log($scope.member);
        $http({
             method:'POST',
             url: "http://localhost:8888/home_teaching_sms/get_user_msgs.php",
             data: $scope.member
        })
        .then(
            function(response) {
              //console.log(response.data.records);
                $scope.msgs = response.data.records;
            }
        );
    }
    $scope.formData = {
        "member_id" : "0",
        "ToCountry": "US",
        "ToState": "MO",
        "SmsMessageSid": "SM7d496f20c005a60cc18852672c93a3dd",
        "ToCity": "KANSAS CITY",
        "FromZip": "",
        "SmsSid": "SM7d496f20c005a60cc18852672c93a3dd",
        "FromState": "MO",
        "SmsStatus": "recieved",
        "FromCity": "",
        "Body": "",
        "FromCountry": "US",
        "To": "+18162264924",
        "MessagingServiceSid": "MGf7b07d675acc6d4220496dc011d80d66",
        "ToZip": "64106",
        "NumSegments": "1",
        "MessageSid": "SM7d496f20c005a60cc18852672c93a3dd",
        "AccountSid": "ACaa57e6db2b8e23ccb5e3e63070df6a9e",
        "From": "+18165416862",
        "ApiVersion": "2010-04-01"

    }
    $scope.sendMemberResponse = function(formData) {

        $http({
             method:'POST',
             url: "http://localhost:8888/home_teaching_sms/post_member_response.php",
             data: formData
        })
        .then(
            function(response) {
              /*console.log(response.data.records);*/
                $scope.getMemberMessages(formData.member_id);
            }
        );
    }

})
;
