import { UUIDV4 as UUID } from "../utils";

export class UUIDV4 {
  private _value: string;

  constructor(value?: string) {
    this._value = value ?? UUID.generate();
  }

  getString() {
    return this._value;
  }

  getValue() {
    return this._value;
  }

  public equals(id: UUID) {
    return id === this._value;
  }
}

