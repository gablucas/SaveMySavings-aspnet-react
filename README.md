# SaveMySavings (Em desenvolvimento - Versão beta)
A versão atual não corresponde ao produto final, atualmente é possível criar, atualizar, conferir e deletar transações.

## Sobre
SaveMySavings é uma aplicação full stack utilizada para ter um controle financeiro, permitindo registrar receitas e despesas.

## Como utilizar
O projeto possui duas pastas principais (webapi para o backend) e (reactapp para o frontend)

### webapi
- Abrir esta pasta com Visual Studio e baixar todas dependências
- A connectionString se encontra no arquivo <b>appsettings.json</b>
- Criar as migrações via Entity Framework utilizando os comandos
  -   dotnet ef migrations add InitialCreation
  -   dotnet ef database update
- Executar a aplicação
  - dotnet run
 
### reactapp
- Abrir esta pasta com Visual Studio Code e baixar todas dependências
- Para alterar a URL da api basta editar a propriedade <b>baseURL</b> no arquivo <b>config.js</b> na pasta <b>Axios</b>
- Executar a aplicação
  - npm run dev 

## Planejamento
  - Visualização das transações por mês
  - Opção para despesas parceladas
  - Opção para receitas ou despesas fixas
  - Sistema de login e cadastro de usuário utilizando autenticação JWT
    
## Tecnologias utilizadas
- C#
- .NET
- ASP.NET
- Entity Framework
- SQL Server
- React
- Axios
