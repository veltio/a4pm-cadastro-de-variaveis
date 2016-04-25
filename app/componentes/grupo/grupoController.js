(function(){
    'use strict';
    var
      app = angular.module('app'),
      dependencias = ['$scope', 'Model', 'Validador', '$mdDialog'];
      
    app.controller('grupoController', [...dependencias, function($scope, Model, Validador, $mdDialog){
      $scope.variaveis = [];
      var variavelAtual = null;
      
      //Obtém a lista de tipos de variáveis cadastrados
      $scope.tipos = Model.getTiposVariaveis();
      
      //Observa a variavel [nomeGrupo], referente ao atributo <nome> da diretiva <grupo>
      $scope.$watch('nomeGrupo', function(v){
        //Se ela for alterada o sistema irá fazer a requisição das variáveis deste grupo
        Model.setRaiz('variaveis');
        $scope.variaveis = Model.get(v);
      });
      
      //Função de escopo que retorna o padrão de expressão regular do tipo de variável
      $scope.getPadrao = function(tipo){
        return (tipo) ? Validador.getPadrao(tipo) : '';
      }
      
      //Função de escopo que invoca serviço de validação
      $scope.validar = function(tipo, valor){
        return (tipo && valor) ? Validador.validar(tipo, valor) : false;
      }
      
      //Função de escopo que cadastra uma nova variável
      $scope.adicionarVariavel = function(){
        if ($scope.novaVariavel.nome && $scope.novaVariavel.tipo && $scope.novaVariavel.valor) {
          //Antes de inserir o registro, faz a validação da propriedade [valor]
          if ($scope.validar($scope.novaVariavel.tipo, $scope.novaVariavel.valor)) {
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
      
      //Função de escopo que invoca $save() do firebase
      $scope.salva = function(obj){
        //Antes de atualizar o registro, faz a validação
        if ($scope.validar(obj.tipo, obj.valor)) {
            $scope.variaveis.$save(obj);
        }
      };
      
      //Função de escopo que invoca $remove() do firebase
      $scope.remove = function(evento, obj) {
        var confirm = $mdDialog.confirm()
          .title('Tem certeza que deseja excluir esta variável?')
          .textContent('Essa operação não poderá ser desfeita.')
          .ariaLabel('Excluir variável')
          .ok('Ok!')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(function() {
          $scope.variaveis.$remove(obj);
        });
      };
      
      $scope.ampliar = function(evento, obj) {
        variavelAtual = obj;
        
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/componentes/grupo/ampliar-tmpl.html',
          parent: angular.element(document.body),
          targetEvent: evento,
          clickOutsideToClose: true,
          fullscreen: true
        })
        .then(function(valor) {
          if (valor) {
            obj.valor = valor;
            $scope.salva(obj);
          }
        });
      };
      
      function DialogController($scope, $mdDialog) {
        $scope.variavel = variavelAtual;
        $scope.valorTemporario = $scope.variavel.valor;
        
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.retorno = function(valor) {
          $mdDialog.hide(valor);
        };
      }
    }]);
}());