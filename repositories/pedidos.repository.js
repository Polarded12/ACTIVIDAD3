class pedidosRepository {
    constructor() {
        this.pedidos = [];
        this.nextId = 1;
    }
    getAll() {
        return this.pedidos;
    }
    getById(id) {
        return this.pedidos.find(pedido => pedido.id === id);
    }
    create(data) {
        const nuevoPedido = {
            id: this.currentId++,
            producto: data.producto,
            cantidad: data.cantidad,
            estado: "pendiente" //el objeto siempre va a iniciar en pendiente
        };
        this.pedidos.push(nuevoPedido);
        return nuevoPedido;
    }

    update(id, newData) {
        const index = this.pedidos.findIndex(p => p.id === parseInt(id));
        // el update cambia los datos, pero mantiene el id y los valores no afectados
        if (index !== -1) {
            this.pedidos[index] = { ...this.pedidos[index], ...newData };
            return this.pedidos[index];
        }
        return null;
    }

    delete(id) {
        const index = this.pedidos.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            this.pedidos.splice(index, 1);
            return true;
        }
        return false;
    }
}
    
module.exports = pedidosRepository;


