(function(){
    'use strict';
    var
      app = angular.module('app'),
      dependencias = ['$scope', 'Model', 'Validador'];
      
    app.controller('grupoController', [...dependencias, function($scope, Model, Validador){
      $scope.variaveis = [];
      
      //Obtém a lista de tipos de variáveis cadastrados
      $scope.tipos = Model.getTiposVariaveis();
      
      //Observa a variavel [nomeGrupo], referente ao atributo <nome> da diretiva <grupo>
      $scope.$watch('nomeGrupo', function(v){
        //Se ele for alterado o sistema irá fazer a requisição das variáveis deste grupo
        Model.setRaiz('variaveis');
        $scope.variaveis = Model.get(v);
      });
      
      //Função de escopo que invoca $save() do firebase
      $scope.salva = function(obj){
        $scope.variaveis.$save(obj);
      };
      
      $scope.validaESalva = function(obj){
        //Antes de inserir o registro, faz a validação
        if ($scope.validar(obj.valor, obj.tipo)) {
            $scope.salva(obj);
        }
      }
      
      //Função de escopo que retorna o padrão do tipo
      $scope.getPadrao = function(tipo){
        return (tipo) ? Validador.getPadrao(tipo) : '';
      }
      
      //Função de escopo que invoca serviço de validação
      $scope.validar = function(tipo, valor){
        return (tipo && valor) ? Validador.validar(tipo, valor) : false;
      }
      
      $scope.adicionarVariavel = function(){
        if ($scope.novaVariavel.nome && $scope.novaVariavel.tipo && $scope.novaVariavel.valor) {
          //Antes de inserir o registro, faz a validação da propriedade [valor]
          if ($scope.validar($scope.novaVariavel.valor, $scope.novaVariavel.tipo)) {
            var variavel = {};
            variavel[$scope.nomeGrupo] = {
              nome: $scope.novaVariavel.nome,
              tipo: $scope.novaVariavel.tipo,
              valor: $scope.novaVariavel.valor
            }
            
            $scope.novaVariavel.nome = null;
            $scope.novaVariavel.tipo = null;
            $scope.novaVariavel.valor = null;
            
            Model.setRaiz('variaveis/' + $scope.nomeGrupo);
            Model.put(variavel[$scope.nomeGrupo]);
          }
        }
      }
    }]);
}());