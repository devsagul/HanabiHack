var App = App || {};

(function () {
  'use strict';

  //--------------- Exported functions -----------------//
  var getCurrentCart = function () {
    return App.Utils.LocalStorage.getItem(App.Utils.LocalStorage.keys.currentCart);
  };

  var emptyCart = function () {
    App.Utils.LocalStorage.removeItem(App.Utils.LocalStorage.keys.currentCart);
  };

  App.Utils = App.Utils || {};
  App.Utils.Product = {
    getCurrentCart: getCurrentCart,
    emptyCart: emptyCart
  };
}());