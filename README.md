# Pacific ROM
[![NPM Version][npm-image]][npm-url]
[![node version][node-image]][node-url]

Xogo de guerra de bots

## Estrutura
```
./
├── src/
│   ├── class/
│   │   ├── board.class.ts
│   │   ├── bot.class.ts
│   │   ├── bullet.class.ts
│   │   └── field.class.ts
│   ├── interfaces/
│   │   └── fieldprinter.interface.ts
│   ├── app.ts
│   ├── game.ts
│   └── test.ts
├── web/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── .eslint.js
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Dependencias
### Node
- `cors` 2.8.5
- `express` 4.17.1
### TypeScript
- `@types/cors` 2.8.12
- `@types/express` 4.17.1
- `@typescript-eslint/eslint-plugin` 5.12.1
- `@typescript-eslint/parser` 5.12.1
- `eslint` 8.9.0
- `typescript` 4.5.5

## Isntalar dependencias
```
npm install
```

## Compilar e iniciar
```
npm start
```
Abrir no navegador http://localhost:3000/ para visualizar o mapa

[npm-image]: https://img.shields.io/badge/npm-6.14.11-critical
[npm-url]: https://www.npmjs.com/
[node-image]: https://img.shields.io/badge/node-14.16.0-success
[node-url]: https://nodejs.org/en/
[typescript-image]: https://img.shields.io/badge/node-14.16.0-success
[typescript-url]: https://nodejs.org/en/