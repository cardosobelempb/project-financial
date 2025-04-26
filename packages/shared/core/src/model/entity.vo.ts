import { UniqueUUID } from "./unique-uuid.vo";

export abstract class Entity<Props> {
  private _id: UniqueUUID;
  protected props: Props;

  protected constructor(props: Props, id?: UniqueUUID) {
    this.props = props;
    this._id = id ?? new UniqueUUID(id);
  }

  get id() {
    return this._id;
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
