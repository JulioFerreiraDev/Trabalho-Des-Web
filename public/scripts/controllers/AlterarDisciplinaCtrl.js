
angular.module('sistemaApp').controller('AlterarDisciplinaCtrl', 
                function($scope, $http, $routeParams, $location, disciplinasService) {

    //CARREGA CLIENTE AO ENTRAR NO FORM
    $scope.disciplinas = disciplinasService.getDisciplina($routeParams.id);

    //FUNÇÃO DE SUBMETER FORM
    $scope.submitForm = function() {
        $http.put("/disciplinas/"+$scope.disciplina._id, $scope.disciplina).
        then(function success(response) {
            $location.path("/")
        });
    }
});