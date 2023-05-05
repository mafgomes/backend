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
- backend-iesb: a implementação da API pedida no enunciado
- backend-app: a implementação de **outra** API, não pedida no enunciado, e não contida nesse repositório
  - a versão do docker-compose desse repositório não contempla esse contêiner
- backend-mysqldb: o banco que armazena os dados necessários à aplicação
- backend-nginx: um servidor web, desempenhando duas funções:
  - servir páginas estáticas e outras partes de um site hospedado no mesmo host;
  - atuar como um frontend, implementando a criptografia HTTPS.

## Métodos implementados
Os métodos implementados incluem GET, POST, PATCH, e DELETE, sendo que há variantes para alguns deles, conforme documentado a seguir:
-    POST	/iesb/v1.0/
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
-    GET	/iesb/v1.0/
     - Lista todos os livros cadastrados
-    GET	/iesb/v1.0/publicados
     - Lista todos os livros publicados ("publicado": "true")
-    GET	/iesb/v1.0/:id
     - Retorna as informações do livro de id informado
-    PATCH	/iesb/v1.0/:id
     - Atualiza as informações do livro de id informado com as informações contidas no corpo da requisição.
     - Somente os campos informados serão atualizados; os demais campos manterão seus valores atuais.
     - Não é possível alterar os campos automaticamente criados (id e datas de cadastro e de alteração).
-    DELETE	/iesb/v1.0/:id
     - Remove o cadastro do livro de id informado.
-    DELETE	/iesb/v1.0/
     - Remove todos os cadastros de todos os livros cadastrados no banco.

## Acesso à implementação de referência
Os fontes aqui disponíveis foram implementados, e está disponíveis para execução pública no site da [Mozbra Soluções](https://mozbra.com.br/), na URL [https://mozbra.com.br/iesb/v1.0/](https://mozbra.com.br/iesb/v1.0/).

Por pura falta de tempo, não foi implementado controle de acesso, então qualquer um com os links e a documentação aqui descrita poderá testar, bastando introduzir a URL-base acima em algum software de teste de API, tal como o [Postman](https://www.postman.com/downloads/), e experimentar à vontade.

## Configuração do projeto
Certifique-se de ler esse README por inteiro. Em especial, não deixe de ler a seção **Observações Importantes**.

Para se rodar o projeto, é necessário que exista, em sua raiz de diretórios, um arquivo chamado ".env" (sem as aspas), no qual deverão estar declarados parâmetros como os do arquivo "exemplo.env":
| Variável		|Descrição|
|:----------------------|:--------|
| DB_HOST		| Nome da máquina que hospeda o banco |
| DB_ROOT_USER		| Nome do superusuário do banco |
| DB_ROOT_PASSWORD	| Senha do superusuário do banco |
| DB_LOCAL_PORT		| Número da porta do hospedeiro redirecionada para a do contêiner |
| DB_DOCKER_PORT	| Número da porta no contêiner onde o Mysql ouvirá conexões |
| | |
| DB_IESB_DATABASE	| Nome do banco usado nessa API (já que temos 2 APIs) |
| DB_IESB_USER		| Nome do usuário do banco|
| DB_IESB_PASSWORD	| Senha do usuário do banco |
| | |
| NODE_LOCAL_PORT	|Número da porta do hospedeiro a ser redirecionada para a do contêiner |
| NODE_DOCKER_PORT	|Número da porta onde o node.js ouvirá conexões |
| | |
| HTTP_LOCAL_PORT	|Número da porta do hospedeiro a ser redirecionada para a do contêiner |
| HTTP_DOCKER_PORT	|Número da porta onde o nginx ouvirá conexões HTTP (tipicamente 80) |
| HTTPS_LOCAL_PORT	|Número da porta do hospedeiro a ser redirecionada para a do contêiner |
| HTTPS_DOCKER_PORT	|Número da porta onde o nginx ouvirá conexões HTTPS (tipicamente 443) |

### Preparação para a execução
Antes de ser possível criar as imagens dos contêineres, temos que baixar os módulos de Node dos quais o projeto depende.
Isso pode ser feito com esses comandos:
```
cd iesb
npm install
```

## Execução do projeto
Uma vez baixadas as dependências, já podemos fazer o compose.
Mas antes, se você ainda estiver na pasta iesb, volte para a pasta principal do projeto:
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
2) Editar o arquivo mozbra.conf (talvez renomeando-o, se desejado) para refletir o seu domínio registrado; em particular, repare que há DUAS entradas apontando para contêineres em Node.js, uma para essa API do trabalho da matéria do IESB, e outra para a API da própria Mozbra, trabalho ainda em andamento; para rodar apenas essa API, remova a seção relativa à API da Mozbra.
3) Se for usado HTTPS, criar a pasta letsencrypt, sob a pasta nginx, contendo os certificados (com as respectivas chaves privadas) emitidos pela certificadora LetsEncrypt; alternativamente, para usar apenas HTTP, pode-se editar o docker-compose para usar a imagem padrão do nginx, mas mapeando os diretórios /etc/nginx/conf.d para apontar para uma pasta com arquivos de configuração que não usem HTTPS.

## Critérios de pontuação do trabalho
### Requisitos mínimos para aprovação (nota 5.0):
- API preferencialmente usando Node.js com Express.js funcionando sem erros (ou outra linguagem/framework com instruções de execução no Readme.md);
  - Implementado conforme pedido;
- Instruções de criação de um banco PostgreSQL (criação de usuário, banco e tabelas) precisas de forma a subir um banco que pode ser acessado a partir da sua API de acordo com o projeto;
  - O banco implementado foi o MySQL, não PostgreSQL;
  - Não há necessidade de criação do banco, já que é utilizada a biblioteca Sequelize, que, da forma como implementada aqui, inicializa o banco;
- Requisições usando métodos HTTP GET e POST obtendo e inserindo dados em um banco de dados (preferencialmente PostgreSQL, podendo ser outro do domínio do aluno);
  - Implementado conforme pedido, exceto pelo fato de ter sido empregado o MySQL, ao invés do PostgreSQL;
- Projeto deve rodar sem erros na execução normal (enviando os dados esperados e recebendo os dados esperados de retorno);
  - Até onde consegui testar, o projeto executa a contento, apresentando erros apenas quando se informa parâmetros incorretos.
  - Ainda que com parâmetros errados, ele reporta os erros de forma apropriada, com os códigos de erro HTTP corretos.

### Implementação _extra-petita_
Além da implementação básica pedida no enunciado, no sentido de obter uma nota superior a 5.0, foram implementadas também as seguintes funcionalidades:
- Try/Catch para prevenção de erros (+1 ponto);
  - Na verdade, foi usado "coisa().then().catch()", ao invés de try/catch;
- Adicionar Middleware em uma ou mais rotas (+1 ponto);
  - O middleware implementa o versionamento de endpoints;
  - A parte do path /v1.0 é devida à chamada ```app.use('/v1.0', router);```
- Usar módulos na aplicação - outros arquivos além de um index.js com funções sendo chamadas (+1 ponto);
- Subir e configurar um banco de dados na AWS RDS ou serviço similar (Oracle Cloud, GCP, Azure, etc) (+1 ponto);
  - Na verdade, o banco foi configurado na Oracle Cloud, mas num contêiner à parte, na mesma VM;
- Usar rotas adicionais com PUT, PATCH e DELETE para alterar informações do banco (+2 ponto);
  - Apenas PATCH e DELETE foram implementadas a mais, não PUT;
  - Mas também foi implementada funcionalidade não especificada (procura por livros publicados);

### Implementações adicionais não previstas como pontuação adicional
- Servidor web nginx como frontend, isolando as páginas web propriamente ditas dos endpoints web (? pontos)
  - Esse frontend nginx também serviu para isolar a API apresentada como trabalho do IESB da API sendo implementada no ambiente de testes da empresa hospedeira, Mozbra Soluções;
- Isolamento dos serviços em contêineres Docker, inclusive com o orquestrador docker-compose (? pontos)
- Registro de nomes de domínio (mozbra.com.br e www.mozbra.com.br) no registro.br (? pontos)
- Uso de HTTPS, com certificado emitido por uma autoridade certificadora gratuita, LetsEncrypt (? pontos)

### Implementações futuras
#### De curto prazo:
- Monitoramento (rudimentar, em console.log: +0,5 pontos);
  - A ideia é implementar em middleware, evitando repetição de código que depois teria mesmo de ser removido dos fontes, quando da implantação de um Prometheus da vida.
- Usar o bcrypt para criptografar senhas com salt (+1 ponto);
- Usar token JWT no middleware para validar acesso (+1 ponto);

#### De médio prazo:
- Usar testes unitários (+1 ponto);
- Monitoramento (recomendado, usando Prometheus: +2 pontos);
- Adicionar ESLint para padronizar code style no projeto (+1 ponto);

#### Sem previsão de implementação:
- Monitoramento (simples, jogando para um arquivo: +1 ponto);
