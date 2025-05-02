export abstract class MapperConverter<E, P> {
  abstract toPresent(entity: E): P
  abstract toEntity(present: P): E
}
