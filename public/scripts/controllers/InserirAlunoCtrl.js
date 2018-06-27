
angular.module('sistemaApp').controller('InserirAlunoCtrl',
    function ($scope, $http, $location, alunosService) {

        $scope.submitForm = function () {
            $http.post("/alunos", $scope.aluno).
                then(function success(response) {
                    alunosService.addAluno($scope.aluno)
                });
        }
    });