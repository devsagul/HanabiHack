var cast = require('lie-cast');
var Promise = require('lie');
function iter(list, func){
  func = func || function(a){return a};
  return cast(list).then(function(list){
    return new Promise(function(yes,no){
      var len = list.length;
      var results = [];
      function callback(result){
        var i = results.push(result);
        if(i===len){
          yes(results);
        }else{
          next(i);
        }
      }
      function next(i){
        cast(list[i]).then(function(value){
          return cast(func(value,i)).then(callback,no);
        }).then(null, no);
      }
      next(0);
    });
  });
}
module.exports = iter;