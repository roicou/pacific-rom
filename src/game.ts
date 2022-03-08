/**
 * @file manages the game
 */
import { Board } from './class/board.class';
import { Bot } from './class/bot.class';
import { FieldPrinter } from './interfaces/fieldprinter.interface';

/**
 * starts the game
 * @param size board _size
 * @returns 
 */
export function start(size: number): Board {
    const board: Board = new Board(size);
    const bot: Bot = new Bot("Roi");
    board.addBot(bot);
    return board;
}

/**
 * "beautiful" terminal print of the board
 * @param game game board class
 * @returns 
 */
export function print(game: Board): FieldPrinter[][] {
    let board: FieldPrinter[][] = [];
    for (let lat: number = 0; lat < game.size; lat++) {
        board.push([]);
        for (let lng: number = 0; lng < game.size; lng++) {
            board[lat].push({
                type: game.field(lat, lng).type,
                bot: game.field(lat, lng).bot,
                bullet: game.field(lat, lng).bullet,
                cracken: game.field(lat, lng).cracken
            });
        }
    }
    return board;
}