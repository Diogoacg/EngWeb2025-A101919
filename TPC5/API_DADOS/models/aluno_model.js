const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gitlink: { type: String, required: true },
    tpc1: { type: String },
    tpc2: { type: String },
    tpc3: { type: String },
    tpc4: { type: String },
    tpc5: { type: String },
    tpc6: { type: String }
}, { timestamps: true });

const Aluno = mongoose.model("Aluno", AlunoSchema);

module.exports = Aluno;