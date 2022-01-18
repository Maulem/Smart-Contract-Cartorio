# Smart Contract Cartorio

## Objetivo
O objetivo desse repositório é substituir serviços caros, desnecessários e burocráticos por versões alternativas utilizando Smart Contracts.

## Funcionamento
Este contrato é feito em Solidity e tem algumas dependencias:
- Truffle
- Ganache
- truffle-assertions(tests)
- chai(tests)

## Como iniciar o contrato
1. Abra o Ganache
2. Abra o prompt de comando e execute:
```
truffle init
```
3. Antes de iniciar o contrato é importante ir no arquivo "2_signSimple_migration.js" e alterar o endereço de quem vai assinar o contrato (esse endereço pode ser qualquer um que tenha no ganache) e o nome do contrato.
4. Faça o deploy do contrato:
```
truffle deploy
```

## Como interagir com o contrato
Para interagir com o contrato primeiro é necessário o endereço de criação dele, é possivel encontrar esse endereço na aba "Transactions" do Ganache.

Se deu tudo certo até aqui e o espaço de trabalho da ganache é novo deve ter apenas 4 transações na aba "Transactions", duas delas devem estar marcadas como criação de contratos, sendo a primeira o contrato de migrations (que ajuda a dar deploy no nosso contrato) e o segundo (em ordem de mais antigo pra mais novo) o nosso contrato. Clique nessa aba e copie o endereço de criação do contrato:

Markup : ![picture alt]https://github.com/Maulem/Smart-Contract-Cartorio/blob/main/img/contractCreation.png "Where to find the contract address")
