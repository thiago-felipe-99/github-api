# Github API

Site com intuito de consumir a api do Github. Para acessar o site precisa fornecer um login do github, essa autenticaçãoe e autorização é feito com o Oauth2
fornecido pelo prórpio [github](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow). No site é possível
procura por usuário, ver informações sobre o usuário, ver repositórios do usuário e repositórios que ele salvou(deu estrela/starred).

## Ferramentas utilizadas no projeto
- [X] [React](https://reactjs.org/)
- [X] [NextJS](https://nextjs.org/)
- [X] [NextAuthJS](https://next-auth.js.org/)
- [X] [Vercel](https://vercel.com/)
- [X] [Github API](https://docs.github.com/en/rest)
- [X] [SASS/SCSS](https://sass-lang.com/)
- [X] [Octokit.js](https://octokit.github.io/rest.js/v18)
- [X] [Typescript](https://www.typescriptlang.org/)

## Funcionalidades
- [x] Autenticação via api do github
- [X] Autorização, não é mostrado páginas, sem ser a de login, para usuários não logados
- [X] Visualização das informçãoes sobre usuário logado
- [X] Procurar por usuário
- [X] Ver repositórios dos usuários
- [X] Ver repositórios favoritados pelos os usuários
- [X] Fazer logout da aplicação
- [X] Rolagem Infinita
- [X] Cache dos requests pedidos para API
- [ ] Estilização
- [ ] Responsividade
- [X] Deploy na vercel
- [X] Domínio customizado

## Rodar localmente
Para rodar localmente esse projeto deve ser criado, na raiz do projeto, um arquivo `.env.local` onde deve ter as seguintes variáveis de ambiente, 
CLIENT_ID, CLIENT_SECRET e NEXTAUTH_URL. Exemplo:
```
CLIENT_ID=00000000000000000000 //o client id que o github te forneceu quando criou o aplicativo com Oauth0
CLIENT_SECRET=0000000000000000000000000000000000000000 //o client secret que você gerou no aplicativo do github
NEXTAUTH_URL=http://localhost:3000 //o link do calback que você cadastrou no aplicativo do github
```
Depois é só instalar os pacotes com `npm install` e roda com o comando `npm run dev`. 
Agora só abrir o navegador e acessar `http://localhost:3000` que o site estará rodando localmente.
