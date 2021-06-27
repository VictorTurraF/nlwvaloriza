# NLW Valoriza
Projeto desenvolvido durante a 6ª edição do NLW da Rocketseat o NLW/Together seguindo a trilha de NodeJS.

## Estrutura do projeto
Aseguir está descrita a estrutura de pastas e uma breve descrição de cada uma.

### 📁 `src/database/`
Onde fica a conexão e o controle do histórico da base de dados mais conhecidas como as migrations.

### 📁 `src/entities/`
Onde estão todas as entidades. Também podem ser chamados de models. Uma entidade é uma representação de uma tabela dentro da nossa base de dados e também podem indicar seus respectivos relacionamentos.

### 📁 `src/repositories/`
Onde ficam os repositórios das nossas entidades. Cada entidade possui um repositório que provê todos os métodos necessários para realizar suas as operações dentro da base de dados.

### 📁 `src/use_cases/`
Onde ficam os casos de uso da nossa aplicação. Cada caso de uso descreve uma unica funcionalidade da aplicação, eles cuidam de toda as regras de negócio da aplicação e chamam os repectivos repositórios das respectivas entidades 

### 📁 `src/controllers/`
Onde ficam todos os controladores da aplicação, Os controllers são responsáveis por tratar cada requisição da nossa aplicação e direcionar para os casos de uso corretamente.

### 📁 `src/middlewares`
São os interceptadores das requisições. Pensando em um software em camadas, esta é a camada mais externa da aplicação, ou seja, manipula as requisição antes mesmo de chegar aos controllers, e também podem tratar a saída da nossa aplicação. Por exemplo, fazer autenticação de usuários, tratamento de excesões, e outras regras que não sejam específicas do domínio de negócios.

### 📁 `src/@types`
Por se tratar de um projeto escrito com TypeScript esta pasta contém todos as tipagens para serem adicionadas ou sobrescrever as definições de tipos padrão das bibliotecas que estamos utilizando.