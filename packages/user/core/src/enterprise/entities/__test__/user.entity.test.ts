import { PersonName } from '@shared/core'
import { userFactory } from '../user.factory'
import { User } from '../user.entity'

describe('Must return a valid user', () => {
  let sut = userFactory()
  it('should create a user with valid data', () => {
    expect(sut).toBeInstanceOf(User)
  })

  it('should throw an error if the name is invalid', () => {
    expect(() => {
      userFactory({
        name: new PersonName(''),
      })
    }).toThrow('person-name.is-empty')
  })
})
