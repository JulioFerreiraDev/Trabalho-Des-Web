angular.module('sistemaApp').controller('ListarTurmasCtrl', 
                function($scope, $http, $routeParams, disciplinasService) {
            
    $scope.disciplina = disciplinasService.getDisciplina($routeParams.id)
    
    //FUNCAO QUE ATUALIZA LISTA
    $scope.refresh = function() {
        $http.get("/disciplinas/"+$scope.disciplina._id+"/turmas")
        .then(function success(response) {
            $scope.turmas = response.data; 
            // $scope.disciplina.turmas
        }, function error(response) {
            $scope.turmas = [{nome: "Erro"}];
        });                   
    }
                    
    $scope.delete = function(id) {
        $http.delete("/disciplinas/"+$scope.disciplina._id+"/turmas/"+id)
        .then(function success(response) {
            $scope.turmas = $scope.turmas.filter(
                (turma) => turma._id != id
            )
        });
    }

    $scope.refresh()
    
});