import { Bot } from "../class/bot.class";
import { Bullet } from "../class/bullet.class";

/**
 * Defines a Field for print function
 */
export interface FieldPrinter {
    type: "water" | "earth";
    bot: Bot | null;
    bullet: Bullet | null;
    cracken: boolean
}