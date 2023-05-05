# Trabalho final da disciplina de Backend
Pós-graduação em desenvolvimento para plataformas móveis

IESB, curso de 2023-1, Prof. Felipe Reimer

Aluno Marcelo Amarante Ferreira Gomes (Matrícula 2373171024)

## Introdução
O artigo que inspirou a implementação contida nesse trabalho, bem como link para o repositório original, está disponível no seguinte link:
- [Build Node.js Rest APIs with Express, Sequelize & MySQL](https://www.bezkoder.com/node-js-express-sequelize-mysql/)

## Arquitetura do projeto
Esse trabalho foi implementado-se utilizando as seguintes tecnologias:
- Node.js
- Express
- APIs REST
- MySQL (banco de dados relacional)
- Sequelize (para interagir com o banco)
- nginx (servidor web com HTTPS)
- Docker (contêineres, isolando módulos por funcionalidade)
- Docker-compose (orquestração dos contêineres)

O projeto está implementado em contêineres Docker, com a seguinte estrutura:
- backend-app: a implementação da API pedida no enunciado
- backend-mysqldb: o banco que armazena os dados necessários à aplicação
- backend-nginx: um servidor web, desempenhando duas funções:
  - servir páginas estáticas e outras partes de um site hospedado no mesmo host;
  - atuar como um frontend, implementando a criptografia HTTPS.

## Métodos implementados
Os métodos implementados incluem GET, POST, PUT, e DELETE, sendo que há variantes para alguns deles, conforme documentado a seguir:
-    POST	/api/v1.0/
     - Cadastra um livro, a partir de um JSON, no formato a seguir. O único campo obrigatório é "titulo". Mas repare que é sem acentuação: "titulo", ao invés de "título"!
```
        {
	    "titulo": "Nome do livro",
	    "autor":  "Fulano de Tal",
	    "publicado": "true"
	}
```
     - O único campo obrigatório é "titulo".
     - Repare que é sem acentuação: "titulo", ao invés de "título"!
     - Além dos campos que podem ser informados no JSON, o banco também armazena mais 3 campos:
       - id, um número sequencial com auto-incremento;
       - data de cadastro desse registro;
       - data da última alteração desse registro;
-    GET	/api/v1.0/
     - Lista todos os livros cadastrados
-    GET	/api/v1.0/published
     - Lista todos os livros cadastrados como publicados
-    GET	/api/v1.0/:id
     - Retorna as informações do livro de id informado
-    PUT	/api/v1.0/:id
     - Atualiza as informações do livro de id informado com as informações contidas no corpo da requisição.
     - Somente os campos informados serão atualizados; os demais campos manterão seus valores atuais.
     - Não é possível alterar os campos automaticamente criados (id e datas de cadastro e de alteração).
-    DELETE	/api/v1.0/:id
     - Remove o cadastro do livro de id informado.
-    DELETE	/api/v1.0/
     - Remove todos os cadastros de todos os livros cadastrados no banco.

## Acesso à implementação de referência
Os fontes aqui disponíveis foram implementados, e está disponíveis para execução pública no site da [Mozbra Soluções](https://mozbra.com.br/), na URL [https://mozbra.com.br/api/v1.0/](https://mozbra.com.br/api/v1.0/).

Por pura falta de tempo, não foi implementado controle de acesso, então qualquer um com os links e a documentação aqui descrita poderá testar, bastando introduzir a URL-base acima em algum software de teste de API, tal como o [Postman](https://www.postman.com/downloads/), e experimentar à vontade.

## Configuração do projeto
Certifique-se de ler esse README por inteiro. Em especial, não deixe de ler a seção **Observações Importantes**.

Para se rodar o projeto, é necessário que exista, em sua raiz de diretórios, um arquivo chamado ".env" (sem as aspas), no qual deverão estar declarados parâmetros como os do arquivo "exemplo.env":
| Variável		|Descrição|
|:----------------------|:--------|
| MYSQLDB_USER		|Nome do usuário do banco|
| MYSQLDB_ROOT_PASSWORD	|Senha do usuário do banco|
| MYSQLDB_HOST		|Nome da máquina que hospeda o banco|
| MYSQLDB_DATABASE	|Nome pelo qual o banco conhece a si mesmo|
| MYSQLDB_LOCAL_PORT	|Número da porta do hospedeiro redirecionada para a do contêiner|
| MYSQLDB_DOCKER_PORT	|Número da porta no contêiner onde o Mysql ouvirá conexões|
| | |
| NODE_LOCAL_PORT	|Número da porta do hospedeiro a ser redirecionada para a do contêiner|
| NODE_DOCKER_PORT	|Número da porta onde o node.js ouvirá conexões|
| | |
| HTTP_LOCAL_PORT	|Número da porta do hospedeiro a ser redirecionada para a do contêiner|
| HTTP_DOCKER_PORT	|Número da porta onde o nginx ouvirá conexões HTTP (tipicamente 80)|
| HTTPS_LOCAL_PORT	|Número da porta do hospedeiro a ser redirecionada para a do contêiner|
| HTTPS_DOCKER_PORT	|Número da porta onde o nginx ouvirá conexões HTTPS (tipicamente 443)|

### Preparação para a execução
Antes de ser possível criar as imagens dos contêineres, temos que baixar os módulos de Node dos quais o projeto depende.
Isso pode ser feito com esses comandos:
```
cd appNode
npm install
```

## Execução do projeto
Uma vez baixadas as dependências, já podemos fazer o compose.
Mas antes, se você ainda estiver na pasta appNode, volte para a pasta principal do projeto:
```
cd ..
```
Numa primeira execução, o docker-compose irá baixar, de Dockerhub.io, as imagens padrão de contêineres,
das quais dependem as imagens a serem criadas.
Para essa primeira execução, recomenda-se rodar a pilha de contêineres em _foreground_, de forma que
eventuais mensagens de erro sejam mostradas no terminal:
```
docker-compose up
```
Uma vez que tudo esteja corretamente funcionando e debugado, podemos interromper a execução da pilha de
contêineres, teclando Ctrl-C, e executar novamente, dessa vez em _background_:
```
^C
docker-compose up -d
```
Da forma como foi implementado o projeto, na primeira execução, o banco de dados será criado zerado (sem tabelas ou registros), e o usuário poderá populá-lo utilizando métodos POST.

## Observações importantes
Da forma como é distribuído no GitHub, esse projeto **NÃO** funciona!
Para que passe a funcionar, é necessário, como um mínimo, que se faça três coisas:
1) Copiar o arquivo exemplo.env com o nome de .env, e editá-lo para corresponder à sua configuração;
2) Editar o arquivo mozbra.conf (talvez renomeando-o, se desejado) para refletir o seu domínio registrado;
3) Criar a pasta letsencrypt, sob a pasta nginx, contendo os certificados (com as chaves privadas) emitidos pela certificadora LetsEncrypt.
