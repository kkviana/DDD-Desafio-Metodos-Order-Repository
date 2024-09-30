import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-chenged.event";

export class SendMessageWhenAddressChangeHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData._id}, ${event.eventData._name} 
       alterado para: ${event.eventData._address.street} ${event.eventData._address.number},`,
    );
  }
}