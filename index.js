const express = require("express");
const pedidosRoutes = require("./routes/pedidos.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/pedidos", pedidosRoutes);

app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
    
});
app.get('/', (req, res) => {
    res.send('API OK');
});

