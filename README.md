# s-shop

O projeto consiste em um site de compras, que possui uma página administrativa simples para cadastro de produtos e listagem de compras.

## Requisitos da máquina

Para que o projeto funcione, você deve ter instaladas todas as dependências do Angular. Caso seja seu primeiro contato com o framework, dê uma olhada neste link: https://angular.io/guide/setup-local.

Em uma pasta local, você abrirá o promt de comando e fará o clone do projeto. Basta rodar o seguinte: `git clone https://github.com/tiffany-philippi/sshop.git`.
Feito isso, entre na pasta e rode `npm i` para instalar localmente as dependêncis deste projeto.

## Rodando o projeto

Após instaladas, o próximo passo é rodar o projeto. Para isso, rode o comando: `ng serve`.
Como há uma área de login para o administrador acessar uma área restrita, foi criado um arquivo para localizar o usuário e validar o acesso. Para isso, é necessário rodar um segundo comando em um outro prompt: 

`json-server --watch db.json` (se não funcionar, tente colocar `npx` na frente)

Você pode acessar o link que esse comando disponibilizará para escolher uma opção de login.



O projeto foi desenvolvido para visualização web. Tenha certeza de que você possui uma boa conexão com a internet.

É possível acompanhar o layout pré desenhado no link: https://www.figma.com/file/ltnIO8VJF61LN77mI80EXw/s-shop?node-id=0%3A1.
