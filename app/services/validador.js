(function(){
  'use strict';
  var
    app = angular.module('app'),
    dependencias = ['TiposVariaveis'];
    
  app.service('Validador', [...dependencias, function (TiposVariaveis){
    return {
      validar: function(tipo, valor){
        var confere = valor.match(TiposVariaveis.tipos[tipo].regex);
        return confere;
      },
      
      getPadrao: function(tipo){
        return TiposVariaveis.tipos[tipo].regex;
      }
    }
  }]);
}());