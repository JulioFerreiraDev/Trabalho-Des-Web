
angular.module('sistemaApp').controller('InserirTurmaCtrl', 
                function($scope, $routeParams, $http, $location, disciplinasService) {
      
    $scope.disciplina = disciplinasService.getDisciplina($routeParams.id);
    $scope.turma = {};

    $scope.loadAlunos = function () {
        $http.get("/alunos").
        then(function success(response) {
            console.log(response.data);
            $scope.alunos = response.data;
        });
    }
    
    $scope.loadAlunos();

    $scope.adicionaAluno = function(id) {
        $scope.turma.aluno = id
        $http.post("/disciplinas/"+$scope.disciplina._id+"/turmas", $scope.turma)
        .then(function success(response) {
            $location.path("/listarTurmas/"+$scope.disciplina._id);
        });
    }
});