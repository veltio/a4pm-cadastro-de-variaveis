(function(){
    'use strict';
    var app = angular.module('app');
    app.directive('grupos', function(){
        return {
            restrict: 'E',
            scope: true,
            controller: 'gruposController',
            bindToController: true,
            templateUrl: 'app/componentes/grupos/grupos-tmpl.html'
        }
    });
}());