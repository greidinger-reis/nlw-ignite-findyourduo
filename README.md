# NextlevelWeek e-Sports FindYourDuo (Ignite)

## Projeto desenvolvido durante a Next Level Week e-Sports da Rocketseat

### Tecnologias utilizadas
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [TRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com/)
  
### Como rodar o projeto
- Clone o repositório e instale as dependências
```bash
$ git clone https://github.com/greidinger-reis/nlw-findyourduo-t3-turborepo.git
$ cd nlw-ignite-findyourduo
$ npm i
```
- Crie um arquivo `.env` na raiz do projeto adicione as variáveis de ambiente
```bash
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET
```

O banco de dados utilizado foi o [PostgreSQL](https://www.postgresql.org/), mas você pode utilizar qualquer outro banco de dados que o Prisma suporte, para isso basta alterar a variável `provider` no arquivo `schema.prisma`.

- Inicie o servidor de desenvolvimento
```bash
$ npm run dev
```

### Casos de uso

- [x] Login social com discord
- [x] Listagem de games com contagem de anúncios
- [x] Criação de novo anúncio
- [x] Listagem de anúncios por game
- [x] Página com lista de anúncios criados pelo usúario, com possibilidade de editar e excluir anúncios.
