🔧 Métodos:
isValidEmail – Validação simples de e-mails.

isValidURL – Validação básica de URLs.

isValidCPF – Validação completa de CPF.

isValidCNPJ – Validação completa de CNPJ.

toCamelCase, toSnakeCase, toKebabCase – Conversões entre padrões de nomenclatura.

generateRandomString – Gera uma string aleatória (ideal para códigos ou tokens).

# Exemplos rápidos:

```
console.log(StringUtils.isValidEmail("test@domain.com")); // true
console.log(StringUtils.isValidCPF("123.456.789-09"));    // false ou true, se for válido
console.log(StringUtils.toSnakeCase("myVariableName"));   // my_variable_name
console.log(StringUtils.generateRandomString(8));         // Ex: "A8kG9LmP"

```
