(function(){
  'use strict';
  var
    app = angular.module('app'),
    dependencias = ['$firebaseArray', '$firebaseObject', 'DBRef', 'TiposVariaveis'];
    
  app.service('Model', [...dependencias, function ($firebaseArray, $firebaseObject, DBRef, TiposVariaveis){
    var
      ref = DBRef;
    
    return {
      getTiposVariaveis: function(){
        return TiposVariaveis.tipos;
      },
      
      setRaiz: function(raiz){
        ref = DBRef.child(raiz);
      },
      
      get: function(id){
        return $firebaseArray(ref.child(id));
      },
      
      getAll: function(){
        return $firebaseArray(ref);
      },
      
      put: function(dados){
        ref.push(dados);
      }
    }
  }]);
}());