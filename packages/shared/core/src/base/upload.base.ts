import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Definindo um tipo de erro customizado
class UploadError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'UploadError';
  }
}

// Configurações do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Define o caminho de destino para os arquivos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext); // Define o nome único para o arquivo
  }
});

// Limites para os uploads
const upload = multer({
  storage,
  limits: { fileSize: 4500000 } // Tamanho máximo 4.5MB
}).single('file'); // Permite o upload de um único arquivo

class UploadHandler {
  private allowedMimeTypes: string[] = [];
  private error: string | null = null;
  private width: number = 1546;
  private height: number = 800;
  private file: Express.Multer.File | undefined;

  constructor() {}

  jpeg() {
    this.allowedMimeTypes.push('image/jpeg', 'image/jpg', 'image/pjpeg');
    return this;
  }

  png() {
    this.allowedMimeTypes.push('image/png', 'image/x-png');
    return this;
  }

  gif() {
    this.allowedMimeTypes.push('image/gif');
    return this;
  }

  pdf() {
    this.allowedMimeTypes.push('application/pdf');
    return this;
  }

  xml() {
    this.allowedMimeTypes.push('application/xml');
    return this;
  }

  // Define as dimensões permitidas para o arquivo
  dimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
    return this;
  }

  // Verifica o tipo MIME do arquivo
  private isValidMimeType() {
    if (!this.allowedMimeTypes.includes(this.file!.mimetype)) {
      this.error = `Arquivo não permitido. Permite-se apenas: ${this.allowedMimeTypes.join(', ')}`;
      return false;
    }
    return true;
  }

  // Valida as dimensões do arquivo (se for uma imagem)
  private validateDimensions() {
    if (this.file && this.file.mimetype.startsWith('image/')) {
      const img = fs.readFileSync(this.file.path);
      // Aqui, você pode usar uma biblioteca como 'sharp' para obter as dimensões da imagem
      const sharp = require('sharp');
      sharp(img)
        .metadata()
        .then(metadata => {
          if (metadata.width! > this.width || metadata.height! > this.height) {
            this.error = `A imagem deve ter no máximo ${this.width}x${this.height} pixels.`;
          }
        })
        .catch((err: Error) => {
          this.error = `Erro ao ler a imagem: ${err.message}`;
        });
    }
  }

  // Verifica o tamanho do arquivo
  private validateSize() {
    if (this.file && this.file.size > 4500000) {
      this.error = 'O arquivo não pode ser maior que 4.5MB.';
    }
  }

  // Movimenta o arquivo para o destino
  moveFile(req: any, res: any) {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        this.error = `Erro no upload: ${err.message}`;
      } else if (err) {
        this.error = `Erro desconhecido: ${err.message}`;
      } else {
        this.file = req.file;
        if (this.isValidMimeType() && this.error === null) {
          this.validateSize();
          this.validateDimensions();
          if (this.error) {
            res.status(400).send({ error: this.error });
          } else {
            res.send({
              message: 'Arquivo enviado com sucesso',
              file: this.file
            });
          }
        } else {
          res.status(400).send({ error: this.error });
        }
      }
    });
  }

  // Recupera o erro caso ocorra
  getError() {
    return this.error;
  }
}

// Exemplo de uso
const uploadHandler = new UploadHandler();
uploadHandler.jpeg().png().gif().pdf().dimensions(1920, 1080);

// Simulando o envio de um arquivo
const express = require('express');
const app = express();

app.post('/upload', (req: any, res: any) => {
  uploadHandler.moveFile(req, res);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

/**
  Explicação:

  1. Configuração do Multer:

  A configuração do Multer define o destino para os arquivos enviados (uploads/) e o nome do arquivo gerado (usando um timestamp e um valor aleatório).

  2. Validações e Permissões:

  O código permite o envio de vários tipos de arquivos como JPEG, PNG, GIF, PDF, entre outros.

  Verifica o tipo MIME do arquivo e valida se ele é permitido.

  Também faz a validação das dimensões e do tamanho máximo do arquivo (4.5 MB).

  3. Métodos de Validação:

  isValidMimeType(): Verifica se o tipo MIME do arquivo está na lista de tipos permitidos.

  validateDimensions(): Se for uma imagem, valida as dimensões com base nos valores definidos (largura e altura).

  validateSize(): Verifica se o tamanho do arquivo é menor que 4.5 MB.

  4. Rota de Upload:

  Uma rota POST foi criada para fazer o upload de um arquivo. Quando o arquivo é enviado, o Multer o processa, e o UploadHandler valida se ele está de acordo com as regras definidas.

  Observações:
  Usei a biblioteca sharp para validação das dimensões da imagem. Você pode instalar o pacote com npm install sharp.

  A validação de tipo de arquivo e dimensões é feita para garantir que o arquivo enviado atenda aos requisitos especificados.

  Você pode adicionar outros tipos de validação e customizações conforme necessário.

  Se precisar de mais detalhes ou ajustes, fique à vontade para perguntar!
*/
