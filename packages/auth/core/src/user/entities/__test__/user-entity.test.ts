import { Email, HashPassword, PersonName } from "@shared/core"

import { User } from "../user.entity"
import { IUser } from "../user.interface"

describe('Deve retornar um usuario valido...', () => {
  it('Deve retornar um usuario valido...', () => {
    const user = User.create({
    name: new PersonName("Claudio Cardoso"),
    email: new Email("claudio.c.lima@hotmail.com"),
    password: new HashPassword("$2a$12$e6TM3pgVB2NUztxOV/eaCeQfwMlPCfJlmvvaZeGMJY8TlDoa.0iuq"),
    createdAt: new Date(),
    role: IUser.IRoles.CLIENT,

  })

  expect(user).toBeInstanceOf(User)
  })
})