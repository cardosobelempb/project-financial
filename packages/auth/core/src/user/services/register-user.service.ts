import { IService } from "@shared/core";
import { IUser } from '@user/core';

export default class RegisterUserService implements IService<IUser.ICreateRequest, void>{
  execute(input: IUser.ICreateRequest): Promise<void | null> {
    throw new Error("Method not implemented.");
  }

}
