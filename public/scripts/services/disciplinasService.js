
angular.module('sistemaApp').service('disciplinasService', function($http) {
    var disciplinas = [];

    var loadDisciplinas = function(callback) {
        $http.get("/disciplinas")
        .then(function success(response) {
            disciplinas = response.data;
            callback(disciplinas);
        }, function error(response) {
            disciplinas = [{nome: "Erro"}];
        });                   
    };

    var getDisciplinas = function(){
        return disciplinas;
    };

    var deleteDisciplina = function(id){
        disciplinas = disciplinas.filter((disciplina) => disciplina._id != id);
        return disciplinas;
    }

    var getDisciplina = function(id) {
        return disciplinas.find((disciplina) => disciplina._id == id);
    }

    var addDisciplina = function(disciplina) {
        disciplinas.push(disciplina);
    }

    return {
        loadDisciplinas: loadDisciplinas,
        getDisciplinas: getDisciplinas,
        deleteDisciplina: deleteDisciplina,
        getDisciplina: getDisciplina,
        addDisciplina: addDisciplina
    };
 
});