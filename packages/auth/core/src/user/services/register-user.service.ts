import { IService } from "@shared/core";

import { User } from "../entities/user.entity";

export default class RegisterUserService implements IService<User, void>{
  execute(input: User): Promise<void | null> {
    throw new Error("Method not implemented.");
  }

}