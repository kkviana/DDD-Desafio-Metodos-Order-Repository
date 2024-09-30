import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export class SendMessageWhenAddressChangeHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData._id}, ${event.eventData._name} 
       alterado para: ${event.eventData._address.street} ${event.eventData._address.number},`,
    );
  }
}