const {price, account} = require("./index")
const { Keyboard, Key } = require('telegram-keyboard')
const {Telegraf, Markup } = require('telegraf')

// Defina o preço desejado como null
let desiredPrice = null;

// Comando para configurar o preço desejado
bot.onText(/\/setprice (.+)/, (msg, match) => {
  desiredPrice = match[1];
  bot.sendMessage(msg.chat.id, `Preço desejado configurado para ${desiredPrice}`);
});

// Inicie o loop para verificar o preço
setInterval(() => {
  binance.prices('BTCUSDT', (error, ticker) => {
    const currentPrice = ticker.BTCUSDT;
    if (desiredPrice && currentPrice >= desiredPrice) {
      bot.sendMessage(msg.chat.id, `O preço atingiu ${desiredPrice}!`);
      desiredPrice = null;
    }
  });
}, 60000);

// bot.on('text',async (ctx, next) => {
//     await ctx.telegram.sendMessage(ctx.message.chat.id, `${ctx.message.text}`)
//     const text = await ctx.message.text
//     const a = await price(text)
//     let cotacion = Number(a[text])
//     await ctx.reply(`Price $${cotacion.toFixed(0)}`)
//     await ctx.reply(`Price R$${cotacion.toFixed(0) * 5}`);

// })
//   bot.command('tes', async (ctx) => {
//     const count = await account()
//     console.log(count);
//   })

// bot.onText(/\/buy (.+)/, (msg, match) => {
//     const chatId = msg.chat.id;
//     const symbol = match[1];
//     binance.order({
//       symbol: symbol,
//       side: 'BUY',
//       type: 'MARKET',
//       quantity: '1'
//     }).then((data) => {
//       bot.sendMessage(chatId, 'Successfully bought 1 ' + symbol + ' at market price.');
//     }).catch((error) => {
//       bot.sendMessage(chatId, 'Error: ' + error.message);
//     });
//   });
  
//   bot.onText(/\/sell (.+)/, (msg, match) => {
//     const chatId = msg.chat.id;
//     const symbol = match[1];
//     binance.order({
//       symbol: symbol,
//       side: 'SELL',
//       type: 'MARKET',
//       quantity: '1'
//     }).then((data) => {
//       bot.sendMessage(chatId, 'Successfully sold 1 ' + symbol + ' at market price.');
//     }).catch((error) => {
//       bot.sendMessage(chatId, 'Error: ' + error.message);
//     });
//   });

bot.launch();