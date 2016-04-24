(function(){
    'use strict';
    var app = angular.module('app');
    app.directive('grupo', function(){
        return {
            restrict: 'E',
            bindToController: true,
            controllerAs: "$ctrl",
            controller: 'grupoController',
            scope: {
              nome: '@'
            },
            link: function(scope, elements, attrs){
              scope.nomeGrupo = attrs.nome;
            },
            templateUrl: 'app/componentes/grupo/grupo-tmpl.html'
        }
    });
}());