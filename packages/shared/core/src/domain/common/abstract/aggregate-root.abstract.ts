import { Entity } from '../../entities/entity'
import { IDomainEvent } from '../events/domain-event.interface'
import { DomainEvents } from '../events/domain-events.event'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: IDomainEvent[] = []

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
