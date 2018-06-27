
angular.module('sistemaApp').controller('ListarDisciplinasCtrl', 
                function($scope, $http, $interval, disciplinasService) {
                
    //FUNCAO QUE ATUALIZA LISTA
    $scope.refresh = function() {
        disciplinasService.loadDisciplinas(function(disciplinas) {
            $scope.disciplinas = disciplinas;
            console.log($scope.disciplinas);
        });                 
    }

    $scope.delete = function(id) {
        $http.delete("/disciplinas/"+id)
        .then(function success(response) {
            $scope.disciplinas = disciplinasService.deleteDisciplina(id);                     
        });
    }

    $scope.refresh()

    // //ATUALIZA A CADA 2 SEGUNDOS
    // $interval(function () {
    //     $scope.refresh()
    // }, 2000);
    
});