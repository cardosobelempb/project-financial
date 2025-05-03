import { ConflictError, EmailVO, HashGenerator, IService, left, NameVO, PasswordVO, right } from '@shared/core';
import { IUser, User, UserRepository } from '@user/core';

export class RegisterUserService
  implements IService<IUser.ICreateRequest, IUser.ICreateResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}
  async execute(input: IUser.ICreateRequest): Promise<IUser.ICreateResponse> {
  const { email, password, name } = input;

  // Verifica se o email já existe
  const userWithEmail = await this.userRepository.findByEmail(email);

  if (userWithEmail) {
    return left(new ConflictError('User with this email already exists'));
  }

  // Cria as entidades para validação
  const nameVO = new NameVO(name, { minLength: 3, maxLength: 60 });
  const emailVO = new EmailVO(email);
  const passwordVO = new PasswordVO(password);

  // Agora, gera o hash da senha
  const hashedPassword = await this.hashGenerator.hash(passwordVO.getValue());

  // Criação da entidade do usuário com o password já com hash
  const entity = User.create({
    name: nameVO,
    email: emailVO,
    password: new PasswordVO(hashedPassword), // Aqui passamos o password com o hash
  });

  // Salva o usuário no banco de dados
  await this.userRepository.create(entity);

  return right({});
}

}
