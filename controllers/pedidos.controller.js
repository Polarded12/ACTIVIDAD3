const PedidosRepository = require("../repositories/pedidos.repository");
const pedidosRepo = new PedidosRepository();

function getAll(req, res) {
    const pedidos = pedidosRepo.getAll();
    res.json(pedidos);
}

function getById(req, res) {
    const id = parseInt(req.params.id); 
    
    const pedido = pedidosRepo.getById(id);

    if (!pedido) {
        return res.status(404).json({ message: 'El artículo solicitado no existe' });
    }
    res.json(pedido);
}

function createPedido(req, res) {
    const { producto, cantidad } = req.body;

    // Validación de datos
    if (!producto || !cantidad) {
        return res.status(400).json({ message: "Faltan datos: producto y cantidad son obligatorios" });
    }

    // Cantidad mayor a 0
    if (cantidad <= 0) {
        return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
    }

    const nuevoPedido = pedidosRepo.create({ producto, cantidad });
    res.status(201).json(nuevoPedido);
}

function updatePedido(req, res) {
    const { id } = req.params;
    const { estado } = req.body;
    // Convertir ID a número
    const idNumerico = parseInt(id);

    // Verificar si existe
    const pedidoActual = pedidosRepo.getById(idNumerico);
    
    if (!pedidoActual) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }

    // Regla: Un pedido confirmado o cancelado NO puede modificarse
    if (pedidoActual.estado !== "pendiente") {
        return res.status(400).json({ 
            message: `No se puede modificar un pedido en estado '${pedidoActual.estado}'` 
        });
    }

    // Regla: Validar transiciones de estado permitidas
    if (estado && estado !== "confirmado" && estado !== "cancelado") {
        return res.status(400).json({ 
            message: "Estado inválido. Solo puede pasar a 'confirmado' o 'cancelado'" 
        });
    }
    const pedidoActualizado = pedidosRepo.update(idNumerico, req.body);
    res.json(pedidoActualizado);
}

function deletePedido(req, res) {
    const { id } = req.params;
    
    // Convertir ID a número
    const idNumerico = parseInt(id);

    // Verificar si existe
    const pedidoActual = pedidosRepo.getById(idNumerico);
    
    if (!pedidoActual) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }

    // Regla: Solo se pueden eliminar pedidos 'pendiente'
    if (pedidoActual.estado !== "pendiente") {
        return res.status(400).json({ 
            message: "No se puede eliminar un pedido que ya fue procesado" 
        });
    }

    pedidosRepo.delete(idNumerico);
    res.status(200).json({ message: "Pedido eliminado correctamente" });
}

module.exports = {
    getAll,
    getById,
    createPedido,
    updatePedido,
    deletePedido
};