(function(){
    'use strict';
    var
      app = angular.module('app'),
      dependencias = ['$scope', 'Model', '$mdDialog'];
      
    app.controller('gruposController', [...dependencias, function($scope, Model, $mdDialog){
      Model.setRaiz('grupos');
      $scope.grupos = Model.getAll();
      $scope.indiceGrupoAtual = null;
      $scope.grupoAtual = null;
      
      $scope.$watch('indiceGrupoAtual', function(i){
        $scope.grupoAtual = $scope.grupos[i];
      });

      //Função de escopo que cadastra um novo grupo
      $scope.adicionarGrupo = function(){
        var
          data = new Date(),
          d = data.getDate(),
          m = data.getMonth() + 1,
          a = data.getFullYear();
        d = (d < 10) ? '0' + d : d;
        m = (m < 10) ? '0' + m : m;
        data = d + '/' + m + '/' + a;
        
        var grupo = {
          nome: $scope.novoGrupo,
          dataDeCriacao: data
        };
        
        Model.setRaiz('grupos');
        Model.put(grupo);
        
        $scope.novoGrupo = null;
      }
      
      //Função de escopo que invoca $remove() do firebase
      $scope.remove = function(evento) {
        var confirm = $mdDialog.confirm()
          .title('Tem certeza que deseja excluir este grupo?')
          .textContent('Todas as variáveis cadastradas neste grupo serão excluídas! \n Essa operação não poderá ser desfeita.')
          .ariaLabel('Excluir grupo')
          .ok('Ok!')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(function() {
          //Quando o grupo não foi selecionado ele permanece 'undefined', por isso preciso fazer essa validação
          if ((!$scope.grupoAtual) && ($scope.grupos.length > 0)) {
            $scope.indiceGrupoAtual = 0;
            $scope.grupoAtual = $scope.grupos[0];
          }

          //Armazena o [id] do grupo atual para identificar as variáveis deste
          var idGrupo = $scope.grupoAtual.$id;
          $scope.grupos.$remove($scope.grupoAtual);
          
          //Exclui também as variáveis relacionadas ao grupo
          Model.removeItem('variaveis', idGrupo);
          
          if ((!$scope.grupoAtual) && ($scope.grupos.length > 0)) {
            $scope.indiceGrupoAtual = 0;
            $scope.grupoAtual = $scope.grupos[0];
          }
        });
      };
    }]);
}());