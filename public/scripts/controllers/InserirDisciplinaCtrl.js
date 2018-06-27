
angular.module('sistemaApp').controller('InserirDisciplinaCtrl', 
                    function($scope, $http, $location, disciplinasService) {
                
    $scope.submitForm = function() {
        $http.post("/disciplinas", $scope.disciplina).
        then(function success(response) {
            disciplinasService.addDisciplina($scope.disciplina)
            $location.path("/")
        });
    }
});