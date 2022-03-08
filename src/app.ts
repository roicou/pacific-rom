/**
 * @file main file with expressJS server
 * @author Roi C.
 */
import express from 'express';
import { start, print } from './game';
import cors from 'cors';
import { Command } from 'commander';
const program = new Command();
program
    .name('pacific-rom')
    .option('-p, --port <number>', 'port to listen', '3000')
    .option('-s, --size <number>', 'size of board', '30')
    .parse();
const opts = program.opts();

const port: number = parseInt(opts.port);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// add cors to express



let game = start(parseInt(opts.size));

app.use('/', express.static(__dirname + '/../web'));


app.get('/map', (req, res) => {
    // console.log("Sending map")
    return res.send(print(game));
});

app.get('/regenerate', (req, res) => {
    console.log("Recreating map");
    game.kill();
    game = start(opts.size);
    return res.redirect('/');
});

app.listen(port, () => {

    return console.log(`Express is listening at http://localhost:${port}`);
});
