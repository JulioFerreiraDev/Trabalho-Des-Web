
angular.module('sistemaApp').service('alunosService', function($http) {
    var alunos = [];

    var loadAlunos = function(callback) {
        $http.get("/alunos")
        .then(function success(response) {
            alunos = response.data;
            callback(alunos);
        }, function error(response) {
            alunos = [{nome: "Erro"}];
        });                   
    };

    var getAlunos = function(){
        return alunos;
    };

    var deleteAluno = function(id){
        alunos = alunos.filter((aluno) => aluno._id != id);
        return alunos;
    }

    var getAluno = function(id) {
        return alunos.find((aluno) => aluno._id == id);
    }

    var addAluno = function(aluno) {
        alunos.push(aluno);
    }

    return {
        loadAlunos: loadAlunos,
        getAlunos: getAlunos,
        deleteAluno: deleteAluno,
        getAluno: getAluno,
        addAluno: addAluno
    };

});