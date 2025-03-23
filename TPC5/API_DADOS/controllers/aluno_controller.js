const Aluno = require("../models/aluno_model");

// Obter todos os alunos
exports.getAllAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter um aluno por ID
exports.getAlunoById = async (req, res) => {
    try {
        const aluno = await Aluno.findOne({ id: req.params.id });
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado" });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar um novo aluno
exports.createAluno = async (req, res) => {
    try {
        const newAluno = new Aluno(req.body);
        const savedAluno = await newAluno.save();
        res.status(201).json(savedAluno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Atualizar um aluno por ID
exports.updateAluno = async (req, res) => {
    try {
        console.log("Dados recebidos para atualização:", req.body);
        console.log("ID recebido:", req.params.id);
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Dados para atualização estão vazios" });
        }
        
        const updatedAluno = await Aluno.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedAluno) {
            console.log("Aluno não encontrado para atualização");
            return res.status(404).json({ message: "Aluno não encontrado" });
        }
        
        console.log("Aluno atualizado com sucesso:", updatedAluno);
        res.status(200).json(updatedAluno);
    } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        res.status(400).json({ message: error.message });
    }
};

// Apagar um aluno por ID
exports.deleteAluno = async (req, res) => {
    try {
        const deletedAluno = await Aluno.findOneAndDelete({ id: req.params.id });
        
        if (!deletedAluno) {
            return res.status(404).json({ message: "Aluno não encontrado" });
        }
        
        res.status(200).json({ message: "Aluno excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};