// server.js
const express = require("express");
const cors = express("cors"); // Nota: o correto é app.use(cors()) separado, mantendo como estava:

const app = express();
app.use(express.json());
app.use(cors());

// rota que recebe os parâmetros e chama a API
app.post("/consulta", async (req, res) => {
  const body = {
    DATAINICIAL: req.body.DATAINICIAL || "",
    DATAFINAL: req.body.DATAFINAL || "",
    LOJAS: req.body.LOJAS || "",
    TIPODATA: req.body.TIPODATA || "VENDA",
    TIPOVENDA: req.body.TIPOVENDA || ""
  };

  // LOG para verificar o body que está indo
  console.log("Body enviado para nova API:", body);

  try {
    // ALTERAÇÃO DA URL DA API AQUI:
    const response = await fetch("https://api.savwinweb.com.br/api/APIDados/RetornaVendasPendentesCompletas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 4AE83C98E8315579579F297C8F8BDE2C6ACF269E57D85DD37EF2647DCA77733",
        "Identificador": "09983-0000"
      },
      body: JSON.stringify(body)
    });

    console.log("Status da resposta da API:", response.status);

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Erro ao chamar API:", err.message);
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
