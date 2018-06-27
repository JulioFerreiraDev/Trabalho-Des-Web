const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/disciplinas");

const alunoSchema = new Schema({
    nome: { type: String, required: true },
    grr: { type: Number, required: true, unique: true},
    disciplina: { type: Schema.ObjectId, ref: 'Disciplina', required: true }
})

const turmaSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    aluno: { type: Schema.ObjectId, ref: 'Aluno', required: true }
})

const disciplinaSchema = new Schema({
    nome: { type: String, required: true , unique: true},
    turmas: [turmaSchema]
});

const Aluno = mongoose.model('Aluno', alunoSchema)
// const Turma = mongoose.model('Turma', disciplinaSchema)
const Disciplina = mongoose.model('Disciplina', disciplinaSchema)

module.exports = { Aluno, Disciplina };
