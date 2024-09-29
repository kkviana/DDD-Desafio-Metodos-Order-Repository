import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import orderItemModel from "./order-item.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        // include: [{ model: OrderItemModel }],
      }
    );
  }
  
  async update(entity: Order): Promise<void> {
    // Atualizar o pedido principal (Order)
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  
    // Atualizar os itens do pedido (OrderItems)
    for (const item of entity.items) {
      await OrderItemModel.upsert({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id, // associa o item ao pedido
      });
    }
  }
  

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id }, include: [OrderItemModel] });
    const orderItens = orderModel.items.map((orderItemModel) =>
      new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.product_id, orderItemModel.quantity));
    return new Order(orderModel.id, orderModel.customer_id, orderItens);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({include: [OrderItemModel]});
    return orderModels.map((orderModel) =>
      new Order(orderModel.id, orderModel.customer_id, 
        orderModel.items.map((orderItemModel) =>
          new OrderItem(orderItemModel.id, orderItemModel.name,orderItemModel.price,orderItemModel.product_id,orderItemModel.quantity)
        )
      )
    );
  }


}
