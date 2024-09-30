import EventInterface from "../../@shared/event/event.interface";

/**
 * Todos os eventos devem implementar EventInterface
 */
export default class CustomerCreatedEvent implements EventInterface {
 dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}