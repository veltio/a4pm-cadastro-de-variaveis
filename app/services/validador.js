(function(){
  'use strict';
  var
    app = angular.module('app'),
    dependencias = ['TiposVariaveis'];
    
  app.service('Validador', [...dependencias, function (TiposVariaveis){
    return {
      //Valida o padrão de um determinado tipo de variável
      validar: function(tipo, valor){
        var confere = valor.match(TiposVariaveis.tipos[tipo].regex);
        return confere;
      },
      
      //Retorna o padrão de um determinado tipo de variável
      getPadrao: function(tipo){
        return TiposVariaveis.tipos[tipo].regex;
      }
    }
  }]);
}());