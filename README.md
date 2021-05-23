# Programando uma solução

Este projeto tem como objetivo oferecer uma forma de acesso fácil e gratuito a informações jurídicas.

## Rodando o projeto

Neste repositório encontra-se a aplicação frontend do sistema, desenvolvido em React e Typescript.

Para rodar o projeto é necessário ter configurado o NodeJS no mínimo a versão 14.
Clone este repositório, navegue até o diretório do mesmo e execute:

```
npm install

ou

yarn install
```

Após a instalação dos pacotes, execute: `yarn start` _ou_ `npm run start`.

<br />

## Desenvolvendo neste projeto

Para desenvolver uma feature, inicie a partir da branch `develop` e crie uma nova branch seguindo o exemplo:

```
git checkout -b feature/<feature-name>
```

Ao finalizar o desenvolvimento realizar um _pull request_ para a branch `develop`.

Será usado o [GitFlow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow) como pardão.

<br />

### Instalação de pacotes

Para adicionar uma dependência a este projeto, estamos utilizando o [Yarn](https://yarnpkg.com/), **utilize apenas ele**.

<br />

## Code Style Guide

Está sendo utilizado o style guide da [AirBnb](https://github.com/airbnb/javascript/tree/master/react), em conjunto com o Eslint.

<br />

## Testes

No momento não será feito nem definida nenhuma cobertura de testes das páginas/componentes.

Porém será utilizado quando começar, o react-testing-library e react-testing-library-user-event.

<br />

## Dependências

- Chakra UI
- React Hook Form
- Axios
