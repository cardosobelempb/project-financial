import { Entity, Optional, UUIDVO } from "@shared/core";

import { IUser } from "./user.interface";

export class User extends Entity<IUser.IProps> {
  public get name() {
    return this.props.name;
  }
  public get email() {
    return this.props.email;
  }
  public get password() {
    return this.props.password;
  }
  public get role() {
    return this.props.role;
  }
  public get emailVerified() {
    return this.props.emailVerified;
  }
  public get image() {
    return this.props.image;
  }
  public get address() {
    return this.props.address;
  }
  public get paymentMethod() {
    return this.props.paymentMethod;
  }
  public get createdAt() {
    return this.props.createdAt;
  }
  public get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<IUser.IProps, "createdAt">, id?: UUIDVO) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return user;
  }
}

/*
const user = User.create({
  name: new PersonName("John Doe"),
  email: new Email("john@email.com"),
  password: new HashPassword(
    "$2a$12$NENYP8wjCQiqplaziztZuenYH4yPM68J8Faid3frC5.1QurJZ0mJO"
  ),
  createdAt: new Date(),
  role: IUser.IRoles.CLIENT,
});

console.log(user);
console.log(user.name.value);
*/
