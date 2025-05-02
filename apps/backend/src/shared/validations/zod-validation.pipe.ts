import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

interface ZodValidationPipeOptions {
  schema: ZodSchema<any>;
  customMessage?: string;
  logErrors?: boolean;
}

@Injectable()
export class ZodValidationPipe<T = any> implements PipeTransform {
  constructor(private readonly options: ZodValidationPipeOptions) {}

  transform(value: unknown, metadata: ArgumentMetadata): T {
    const {
      schema,
      customMessage = 'Validation failed',
      logErrors = false,
    } = this.options;

    try {
      // Tenta fazer a validação com o schema Zod
      return schema.parse(value) as T;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = this.formatZodErrors(error);

        // Se logErrors estiver ativado, loga os erros no console
        if (logErrors) {
          console.error('[ZodValidationPipe]', formattedErrors);
        }

        // Lança uma exceção BadRequestException com a estrutura de erros formatada
        throw new BadRequestException({
          message: customMessage,
          statusCode: 400,
          errors: formattedErrors,
        });
      }

      // Em caso de erro inesperado
      throw new BadRequestException(customMessage);
    }
  }

  // Formata os erros do Zod para uma estrutura amigável
  private formatZodErrors(error: ZodError): any {
    return error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
      // Adicionando o código de erro específico, se necessário
      code: issue.code,
      // Detalhes adicionais podem ser passados aqui
      ...(issue.message && { message: issue.message }),
    }));
  }
}
