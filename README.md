# Pacific ROM
[![NPM Version][npm-image]][npm-url]
[![node version][node-image]][node-url]

War game with bots

## Structure
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

## Dependencies
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

## Install dependencies
```
npm install
```

## Compile and starts
```
npm start
```
Open in web browser http://localhost:3000/ for map display

[npm-image]: https://img.shields.io/badge/npm-6.14.11-critical
[npm-url]: https://www.npmjs.com/
[node-image]: https://img.shields.io/badge/node-14.16.0-success
[node-url]: https://nodejs.org/en/
[typescript-image]: https://img.shields.io/badge/node-14.16.0-success
[typescript-url]: https://nodejs.org/en/