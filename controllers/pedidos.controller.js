const pedidosRepository = require('../repositories/pedidos.repository');
const pedidosRepo = new pedidosRepository();

function getAll(req,res) {
    const pedidos = pedidosRepo.getAll();
    res.json(pedidos);
}
function getById(req,res){
    const id =Number(req.params.id)
    const producto = repo.getById(id)

    if(!producto){
        return res.status(404).json('El artiulo solicitado no existe')
    }
}
function createPedido(req, res) {
        const { producto, cantidad } = req.body;

        // Validación de datos
        if (!producto || !cantidad) {
            return res.status(400).json("Faltan datos: producto y cantidad son obligatorios");
        }

        //Cantidad mayor a 0
        if (cantidad <= 0) {
            return res.status(400).json("La cantidad debe ser mayor a 0");
        }

        const nuevoPedido = pedidosRepo.create({ producto, cantidad });
        res.status(201).json(nuevoPedido);
}

function updatePedido(req, res) {
        const { id } = req.params;
        const { estado } = req.body;
        
        // Verificar si existe
        const pedidoActual = pedidosRepo.findById(id);
        if (!pedidoActual) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        //Un pedido confirmado o cancelado NO puede modificarse
        if (pedidoActual.estado !== "pendiente") {
            return res.status(400).json({ 
                message: `No se puede modificar un pedido en estado '${pedidoActual.estado}'` 
            });
        }

        //Validar transiciones de estado permitidas
        // Si intentan enviar un estado, solo puede ser 'confirmado' o 'cancelado'
        if (estado && estado !== "confirmado" && estado !== "cancelado") {
            return res.status(400).json({ 
                message: "Estado inválido. Solo puede pasar a 'confirmado' o 'cancelado'" 
            });
        }

        // Si pasa las validaciones, actualizamos
        const pedidoActualizado = pedidosRepo.update(id, req.body);
        res.json(pedidoActualizado);
    }
function deletePedido(req, res) {
        const { id } = req.params;

        // 1. Verificar si existe
        const pedidoActual = pedidoRepository.findById(id);
        if (!pedidoActual) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        // Regla 3: Solo se pueden eliminar pedidos 'pendiente'
        if (pedidoActual.estado !== "pendiente") {
            return res.status(400).json({ 
                message: "No se puede eliminar un pedido que ya fue procesado (confirmado o cancelado)" 
            });
        }

        pedidoRepository.delete(id);
        res.status(200).json({ message: "Pedido eliminado correctamente" });
}


module.exports = {
    getAll,
    getById,
    createPedido,
    updatePedido,
    deletePedido
};