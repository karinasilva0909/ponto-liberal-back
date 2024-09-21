# PONTO LIBERAL (BACKEND)

## Token Authentication

Este projeto utiliza **JWT (JSON Web Token)** para autenticação. O token é gerado e validado para todas as requisições protegidas. Aqui está a descrição da regra de renovação do token JWT:

### Regra de Renovação do Token

- O JWT possui um **tempo de expiração de 1 hora** após ser gerado.
- Para melhorar a experiência do usuário e evitar que ele seja deslogado inesperadamente, o token será automaticamente **renovado** nas seguintes condições:
  - O token foi emitido há mais de **5 minutos**.
  - O tempo restante para a expiração é **inferior a 1 hora**.
- Quando essas condições forem atendidas:
  - Um **novo token** será gerado com um novo tempo de expiração de **1 hora**.
  - O novo token será enviado no cabeçalho de resposta como `x-new-token`.
  - O cliente (frontend) deve capturar e armazenar este novo token para continuar fazendo requisições autenticadas.

### Fluxo de Autenticação

1. Quando um usuário faz login, um token JWT é gerado e enviado ao cliente.
2. O cliente deve incluir este token no cabeçalho `Authorization` de todas as requisições subsequentes:
   - Exemplo: `Authorization: Bearer <token>`.
3. Durante a validação do token no backend:
   - Se o token tiver mais de 5 minutos e menos de 1 hora para expirar, ele será renovado.
   - O cliente deve monitorar o cabeçalho `x-new-token` para atualizar o token armazenado.
4. Se o token for inválido ou expirado, o backend retorna um status `401 Unauthorized`.

### Exemplo de Requisição com Renovação de Token

```http
GET /api/protected-route HTTP/1.1
Host: example.com
Authorization: Bearer <current_token>

HTTP/1.1 200 OK
x-new-token: <new_token>
