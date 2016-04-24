(function(){
  'use strict';
  var
    app = angular.module('app'),
    dependencias = ['TiposVariaveis'];
    
  app.service('Validador', [...dependencias, function (TiposVariaveis){
    return {
      validar: function(valor, tipo){
        return true;
      },
      
      getPadrao: function(tipo){
        return TiposVariaveis.tipos[tipo].regex;
      }
    }
  }]);
}());