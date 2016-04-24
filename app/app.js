(function () {
    'use strict';
    var
      dependencias = ['ngMaterial', 'firebase'],
      app = angular.module('app', [...dependencias]);
      
    app
      .constant('DBUrl', 'https://variaveisdb.firebaseio.com/')
      .constant('TiposVariaveis', {
        tipos: {
          0: {
            nome: 'Número',
            regex: '^[-+]?\\d*\\.?\\d*$'
          },
          1: {
            nome: 'Texto',
            regex: ''
          },
          2: {
            nome: 'Data',
            regex: ''
          },
          3: {
            nome: 'URL',
            regex: ''
          },
          4: {
            nome: 'Email',
            regex: ''
          },
          5: {
            nome: 'Query SQL',
            regex: ''
          },
          6: {
            nome: 'Função',
            regex: ''
          }
        }
      })
      .service('DBRef', ['DBUrl', Firebase]);
})();