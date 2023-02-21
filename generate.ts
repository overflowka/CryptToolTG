import * as crypto from "crypto";
import { Buffer } from "buffer";

function encrypt(text: string, key: string, iv: string) {
    // create cipher
    const cipher = crypto.createCipheriv(
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

function decrypt(text: string, key: string, iv: string) {
    // create decipher
    const decipher = crypto.createDecipheriv(
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

// generate key & iv
const key = crypto.randomBytes(32).toString("base64");
const iv = crypto.randomBytes(16).toString("base64");
console.log(`key: ${key}\niv: ${iv}\n`);

// encrypt text
const text = "Hello World!";
const encrypted = encrypt(text, key, iv);
console.log(`encrypted: ${encrypted}`);

// decrypt text
const decrypted = decrypt(encrypted, key, iv);
console.log(`decrypted: ${decrypted}`);