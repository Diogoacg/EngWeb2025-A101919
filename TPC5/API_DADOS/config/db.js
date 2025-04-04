const mongoose = require("mongoose");

// Configuração para usar o container Docker com MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/EWTPC6", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;