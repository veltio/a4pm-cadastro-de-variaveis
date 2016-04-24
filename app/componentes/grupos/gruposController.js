(function(){
    'use strict';
    var
      app = angular.module('app'),
      dependencias = ['$scope', 'Model'];
      
    app.controller('gruposController', [...dependencias, function($scope, Model){
      Model.setRaiz('grupos');
      $scope.grupos = Model.getAll();
      
      $scope.adicionarGrupo = function(){
        var grupo = {
          nome: $scope.novoGrupo,
          dataDeCriacao: 'agora'
        };
        
        Model.setRaiz('grupos');
        Model.put(grupo);
        
        $scope.novoGrupo = null;
      }
    }]);
}());