var app = angular.module('sistemaApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "../views/listarDisciplinas.html",
        controller: "ListarDisciplinasCtrl"
    })
    .when("/alterar/:id", { 
        templateUrl: "../views/alterarDisciplina.html",
        controller: "AlterarDisciplinaCtrl"
    })               
    .when("/inserir", {
        templateUrl: "../views/inserirDisciplina.html",
        controller: "InserirDisciplinaCtrl"
    }) 
    .when("/inserirAluno", {
        templateUrl: "../views/inserirAluno.html",
        controller: "InserirAlunoCtrl"
    })
    .when("/listarTurmas/:id", {
        templateUrl: "../views/listarTurmas.html",
        controller: "ListarTurmasCtrl"
    })
    .when("/novoTurma/:id", {
        templateUrl: "../views/inserirTurma.html",
        controller: "InserirTurmaCtrl"
    });
})
