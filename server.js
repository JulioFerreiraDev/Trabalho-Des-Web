const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Schema = mongoose.Schema
const server = express()
const model= require("./config/model")
const Disciplina = model.Disciplina
const Aluno = model.Aluno

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// server.set('views', __dirname + '/views')
// server.set('view engine', 'jade')
server.use(express.static(__dirname + '/public'))

server.get('/disciplinas', function(req, res) {
    var Query = Disciplina.find();
    Query.select("-turmas");  //para excluir os turmas (desnecessário carregar turmas para todos os disciplinas)
    Query.exec(function(err, disciplinas) {
        res.send(disciplinas);
    })
})

server.get('/disciplinas/:id', function(req, res) {
    Disciplina.findOne({_id: req.params.id}, function(err, disciplina){
        res.send(disciplina)
    })
})

server.post('/disciplinas', function(req, res) {
    var disciplina = new Disciplina(req.body)
    disciplina.save(() => res.sendStatus(200))
    // Disciplina.create(req.body, function(err, disciplina) { //outro jeito
    //     res.sendStatus(200)
    //})
})

server.put('/disciplinas/:id', function(req, res) {
    var disciplina = req.body;
    Disciplina.update({_id: req.params.id}, disciplina, (err, raw) => {
        res.sendStatus(200)
    })
})

server.delete('/disciplinas/:id', function(req, res) {
    Disciplina.remove({_id: req.params.id}, () => {
        res.sendStatus(200)
    })
})


//Itens

server.get('/alunos', function(req, res) {
    console.log("chamou")
    Aluno.find(function(err, alunos){
        console.log(alunos)
        res.send(alunos)
    })
})

server.get('/alunos/:id', function(req, res) {
    // console.log(req.params._id)
    Aluno.findOne({_id: req.params.id}, function(err, aluno){
        res.send(aluno)
    })
})

server.post('/alunos', function(req, res) {
    var aluno = new Aluno(req.body)
    aluno.save(() => res.sendStatus(200))

})

server.put('/alunos/:id', function(req, res) {
    var aluno = req.body;
    Aluno.update({_id: req.params.id}, aluno, (err, raw) => {
        res.sendStatus(200)
    })
})

server.delete('/alunos/:id', function(req, res) {
    Aluno.remove({_id: req.params.id}, () => {
        res.sendStatus(200)
    })
})


//Turmas
server.get('/disciplinas/:idDisciplina/turmas', function(req, res) {
    Disciplina.findOne({_id: req.params.idDisciplina})
            .populate("turmas.aluno")
            .exec(function(err, disciplina){
        res.send(disciplina.turmas)
    })
})

server.get('/disciplinas/:idDisciplina/turmas/:idTurma', function(req, res) {
    Disciplina.findOne({_id: req.params.idDisciplina}, function(err, disciplina){
        var turma = disciplina.turmas.find((turma) => turma._id == req.params.idTurma);
        res.send(turma)
    })
})

server.post('/disciplinas/:idDisciplina/turmas', function(req, res) {
    Disciplina.update({_id: req.params.idDisciplina},
                    {$push: {turmas: req.body}},
                    (err, raw) => res.send(200));
})

server.put('/disciplinas/:idDisciplina/turmas/:idTurma', function(req, res) {
    Disciplina.update({_id: req.params.idDisciplina, "turma._id": req.params.idTurma},
                    {$set: {"turmas.$": req.body}},
                    (err, raw) => res.send(200));
})

server.delete('/disciplinas/:idDisciplina/turmas/:idTurma', function(req, res) {
    Disciplina.update({_id: req.params.idDisciplina},
                    {$pull: {turmas: {_id: req.params.idTurma}}},
                    (err, raw) => res.send(200));
})


server.listen(process.env.PORT || 8000, function() {
    console.log('Executando')
})