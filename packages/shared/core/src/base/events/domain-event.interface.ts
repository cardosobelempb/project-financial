import { UniqueUUID } from '../../model'

export interface IDomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueUUID
}
