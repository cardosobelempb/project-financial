# ✅ Estrutura Geral do Gerador de CRUD em Node.js (TypeScript)

### 1. Pré-requisitos

- Instale os pacotes necessários:

```
npm install mysql2 fs path
npm install -D typescript @types/node

```

### Você pode adaptar facilmente para PostgreSQL com pg ou para SQLite também.

- 1. Arquivo: CrudGenerator.ts

```
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export class CrudGenerator {
    private connection: mysql.Connection;
    private database: string;
    private namespace: string = '';
    private outputDir: string = './generated';

    constructor(connectionConfig: mysql.ConnectionOptions, database: string) {
        this.database = database;
        mysql.createConnection(connectionConfig).then(conn => this.connection = conn);
    }

    setNamespace(namespace: string) {
        this.namespace = namespace;
    }

    setOutputDir(directory: string) {
        this.outputDir = directory;
    }

    async getAllTables(): Promise<string[]> {
        const [rows] = await this.connection.query(
            `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?`, [this.database]
        );
        return (rows as any[]).map(row => row.TABLE_NAME);
    }

    async getColumnsForTable(tableName: string): Promise<string[]> {
        const [columns] = await this.connection.query(
            `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`, [this.database, tableName]
        );
        return (columns as any[]).map(col => col.COLUMN_NAME);
    }

    async generateCrudForTable(tableName: string) {
        const className = this.capitalize(tableName);
        const columns = await this.getColumnsForTable(tableName);
        const idField = columns[0]; // Assumindo que o primeiro campo é o ID

        const content = `
${this.namespace ? `// namespace ${this.namespace}` : ''}
import { Connection } from 'mysql2/promise';

export class ${className} {
    private db: Connection;
    private table = "${tableName}";

    constructor(db: Connection) {
        this.db = db;
    }

    async create(data: any) {
        const sql = \`INSERT INTO \${this.table} (${columns.slice(1).join(', ')}) VALUES (${columns.slice(1).map(c => '?').join(', ')})\`;
        const [result] = await this.db.execute(sql, [${columns.slice(1).map(c => `data.${c}`).join(', ')}]);
        return result;
    }

    async readAll() {
        const sql = \`SELECT * FROM \${this.table}\`;
        const [rows] = await this.db.query(sql);
        return rows;
    }

    async readById(id: number) {
        const sql = \`SELECT * FROM \${this.table} WHERE ${idField} = ?\`;
        const [rows] = await this.db.query(sql, [id]);
        return rows[0];
    }

    async update(id: number, data: any) {
        const sql = \`UPDATE \${this.table} SET ${columns.slice(1).map(c => `${c} = ?`).join(', ')} WHERE ${idField} = ?\`;
        const [result] = await this.db.execute(sql, [${columns.slice(1).map(c => `data.${c}`).join(', ')}, id]);
        return result;
    }

    async delete(id: number) {
        const sql = \`DELETE FROM \${this.table} WHERE ${idField} = ?\`;
        const [result] = await this.db.execute(sql, [id]);
        return result;
    }
}
        `.trim();

        const dir = path.resolve(this.outputDir);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(path.join(dir, `${className}.ts`), content);
        console.log(`CRUD class created for table: ${tableName}`);
    }

    async generateAllTables() {
        const tables = await this.getAllTables();
        for (const table of tables) {
            await this.generateCrudForTable(table);
        }
    }

    private capitalize(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}
```

### 1. Exemplo de Uso

```
import { CrudGenerator } from './CrudGenerator';

(async () => {
    const generator = new CrudGenerator({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sua_base'
    }, 'sua_base');

    generator.setNamespace('App.Models');
    generator.setOutputDir('./models');

    // Para gerar uma tabela específica:
    await generator.generateCrudForTable('usuarios');

    // Ou para gerar todas as tabelas:
    // await generator.generateAllTables();
})();

```

### ✅ Resultado

Será criado um arquivo .ts para cada tabela com:

Métodos create, readAll, readById, update, delete

Campos mapeados automaticamente
Totalmente orientado a objetos e compatível com Express, NestJS, ou qualquer outro framework.
