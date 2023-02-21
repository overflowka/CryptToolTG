import { createCipheriv, createDecipheriv } from "crypto";
import { token, key, iv, users } from "./config";
import { Telegraf } from "telegraf";
import { Buffer } from "buffer";

function encrypt(text: string) {
    // create cipher
    const cipher = createCipheriv(
        "aes-256-cbc",
        Buffer.from(key, "base64"),
        Buffer.from(iv, "base64")
    );

    // encrypt text
    let encrypted = cipher.update(text);

    // add padding
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // return base64 string
    return encrypted.toString("base64");
}

function decrypt(text: string) {
    // create decipher
    const decipher = createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key, "base64"),
        Buffer.from(iv, "base64")
    );

    // decrypt text
    let decrypted = decipher.update(Buffer.from(text, "base64"));

    // remove padding
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // return string
    return decrypted.toString();
}

const bot = new Telegraf(token);

// handle inline queries
bot.on("inline_query", async (ctx) => {
    const { query } = ctx.inlineQuery;
    const { id } = ctx.inlineQuery.from;

    // check if user is allowed to use the bot
    if (!users.includes(id)) {
        return;
    }

    // check if query is empty
    if (!query) {
        return;
    }

    let result: any;
    try {
        // try to decrypt message
        result = [
            {
                type: "article", // type of result
                id: "1", // unique id
                title: "Decrypt", // title of result
                description: decrypt(query), // description of result
                input_message_content: {
                    // content of result
                    message_text: decrypt(query), // text of result
                },
            },
        ];
    } catch (error) {
        // if decryption fails, encrypt message
        result = [
            {
                type: "article", // type of result
                id: "1", // unique id
                title: "Encrypt", // title of result
                description: encrypt(query), // description of result
                input_message_content: {
                    // content of result
                    message_text: encrypt(query), // text of result
                },
            },
        ];
    }

    // send result to user
    return ctx.answerInlineQuery(result, {
        is_personal: true, // show results only to the user who sent the query
        cache_time: 0, // do not cache results on the server
    });
});

bot.launch();
console.log("Bot started");

process.once("SIGINT", () => bot.stop("SIGINT")); // stop bot on Ctrl + C
process.once("SIGTERM", () => bot.stop("SIGTERM")); // stop bot on kill
