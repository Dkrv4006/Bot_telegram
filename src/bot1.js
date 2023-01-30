const TelegramBot = require('node-telegram-bot-api');
const { price } = require('.');
const { wallets } = require('./account');
const { Alert, checkAlerts } = require('./alert');
const Binance = require('binance-api-node').default;
require('dotenv').config()

// console.log(time.toLocaleDateString());

const token = process.env.TOKEN;
const binance = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});
const bot = new TelegramBot(token, {polling: true});

const keyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'carteira', }, { text: '/a BTCUSDT 22.32442' }],
            [{ text: 'Opção 3' }, { text: 'Opção 4' }],
            [{ text: 'Opção 3' }, { text: 'Opção 4' }],
            [{ text: 'Opção 3' }, { text: 'Opção 4' }],
        ],
        // one_time_keyboard: true,
    },
};

bot.on


bot.onText(/\/start/,(msg) => {
 
    const chatId = msg.chat.id;
    keyboard
    bot.sendMessage(chatId, 'daniel', keyboard)
    
})

bot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const action = callbackQuery.data;
    const da = await aw()
    if (action === 'opcao_1') {
      bot.editMessageText(`Opção ${da} `, {
        chat_id: message.chat.id,
        message_id: message.message_id
        
      });
    } else if (action === 'opcao_2') {
      bot.editMessageText(`Opção 2 escolhida!`, {
        chat_id: message.chat.id,
        message_id: message.message_id
      });
    }
  });
  
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const wallet = "carteira"
  if(msg.text.toLowerCase().toString().includes(wallet)){
    bot.sendMessage(chatId, 'Buscando imformações...')
    let message = await wallets()
    // let as = await wallets()

    bot.sendMessage(chatId, message.message);
    // bot.sendMessage(chatId, as.as);
  }
})
// Defina o preço desejado como null

// Comando para configurar o preço desejado


let alerts = []
bot.onText(/\/a (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  let command = match[1].split(' ')
  console.log(command);

  if(command[0].length < 6){
    bot.sendMessage(chatId, 'Valor invalido digite "/alert BTCUSDT 23.44444" ')
  }else{
    const currency = command[0];
    const price = command[1];

      alerts[chatId] = alerts[chatId] || [];
      alerts[chatId].push({
        currency: currency,
        price: price
      });
      bot.sendMessage(chatId, `Alerta criado para ${currency} com preço ${price}.`);
  
      checkAlerts();

    }
    alerts.map((item) => {
      console.log(item);

    })
  
    // // bot.sendMessage(chatId,alerts)
    // // bot.sendMessage(chatId,c)
    // bot.sendMessage(chatId, `Preço desejado configurado para ${alerts}`);


    function checkAlerts() {
      binance.prices().then(price => {

        for (let chatId in alerts) {
          alerts[chatId].forEach((alert,indix) => {
            const currentPrice = Number(price[alert.currency]).toFixed(3)
            const currency = alert.currency;
            const priceSave = alert.price;
            console.log(currentPrice);


            // if (currentPrice >= (priceSave -10) && currentPrice <= (priceSave +10) ) {
              if (Math.abs(currentPrice - priceSave) < 0.01) {
              bot.sendMessage(chatId, `Atenção! O preço atual de ${currency} está perto do seu preço de alerta de ${priceSave}.`);
                alerts.pop()
            }
          });
        }
      })
      setTimeout(checkAlerts, 100000);
    }
    
  })
  


  // Inicie o loop para verificar o preço
  // let setinterval = setInterval(alerte, 5000)
  
  // async function alerte(){
    
  //   let desiredPrice = 1625.30000000;
  //   // const ticker =  binance.ws.ticker('ETHBTC', ticker => {
  //   //   console.log(ticker.curDayClose);
  //   // });
  //   // const currentPrice = ticker.lastPrice;

  //   await binance.prices()
  //   .then(price => {
  //     const currentPrice = price['ETHUSDT'];
  //   //  let sd = Math.abs(currentPrice - desiredPrice) 
  //   //  console.log(currentPrice , desiredPrice);
  //   console.log(currentPrice);
  //   console.log(currentPrice >= desiredPrice - 10);
  //     console.log(currentPrice <= desiredPrice + 10 );
  //       if (currentPrice >= desiredPrice -10 && currentPrice <= desiredPrice + 10) {
  //          bot.sendMessage(msg.chat.id, `O preço atingiu ${desiredPrice}!`);
  //           desiredPrice = null
  //           clearInterval(setinterval)
  //         }
  //       });
      
  //   }
        
    

    //   console.log(data.balances);
//     let account =  data.balances;
//     let accoun = []
//     account.forEach(function(account) {

//         if(Number(account.free) > 0){
//             console.log(account.asset);
//             console.log(Number(account.free));
//             console.log(account.locked);
           

//             accoun.push(account)
//         }
        
//         // bot.sendMessage(chatId, accoun);
//     });
//     console.log(accoun);
      
//     //  console.log(account);
//     let message = '';
//     // for(let i = 0; i < account.length; i++){
//     //     message += `${account[i].asset}: ${account[i].free} ${account[i].locked}\n`;
//     // }
//     var myArr = JSON.parse(account);
//     // bot.sendMessage(chatId, account);
//   }).catch((error) => {
//     bot.sendMessage(chatId, 'Error: ' + error.message);
//   });

//   bot.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var myArr = JSON.parse(this.responseText);
//         myFunction(myArr);
//         }}
// // };



