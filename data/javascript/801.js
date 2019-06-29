angular.module('myApp.infoWindow')
  .controller('infoWindowCtrl', ['$element',function($element){
    var iw = this;
    iw.$onInit = function() {
      console.log('parent: ', $element.parent().parent())
      console.log("IW",iw);
      console.log("IW.name", iw.getOrg());
    }
  }]);

