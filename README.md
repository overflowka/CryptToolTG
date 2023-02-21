# CryptToolTG
Inline query bot for encrypt &amp; decrypt messages.

How to setup?

`First of all, create a bot in the Telegram bot @BotFather`

`Then, get your userid. this can be done in the bot @useridinfobot`
```php
1. Clone the repository (git clone https://github.com/overflowka/CryptoToolTG.git)
2. Install packages (npm install)
2.1 Compile generate.ts with the command (tsc .\generate.js)
2.2 Run generate.ts with (node .\generate.js)
2.3 Save the received key & iv

3. Enter in config.ts the bot token you received in the bot @BotFather
4. Enter in config.ts your userid that you got in the bot @useridinfobot
5. Enter in config.ts the key & iv that you got in the generate.js

6. Compile all (tsc)
```

How to use?
```ruby
Start the index.js (node .\index.js) or (pm2 start .\index.js)
Now find your bot in Telegram, and simply click on /start

Now you can go to any chat room where you can use inline bots (most of the time they are enabled everywhere)
and write `@yourbot_bot message`. You have a window above the message with the inscription "Encrypt" 
and the content that will be sent, just click on this window and that's it.

To decrypt a message, simply copy the contents of an encrypted message and paste, example:
`@yourbot_bot ZRJivEUfDIk/TpuSsq46aQ==`
```
