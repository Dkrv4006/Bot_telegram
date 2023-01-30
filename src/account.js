const Binance = require('binance-api-node').default
require('dotenv').config()
const axio = require('axios');

const binance = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

const account = async ( ) => {
 
  const account =  await binance.accountInfo()
    .then( async (data) => {
        let account =  data.balances;
        let accoun = []

        account.forEach(function(account) {
            if(Number(account.free) > 0 && account.asset !== 'BRL'){
                accoun.push(account)
            }
        });
        return accoun 
    }).catch((error) => {
        console.log(chatId, 'Error: ' + error.message);
    });
    return account
}


// Defina a URL da API do BCB
const url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

const brl = async () =>{
   const brl = await axio.get(url)
    .then(data => {
        // console.log(data.data.USDBRL);
         return Number(data.data.USDBRL.high);
    })

    return brl
}

const getPriceCoin = async (simblo) => {
    const a =  await binance.prices({ symbol: simblo })
      .then(price => price)
      // console.log(a);
      return a
}

const currency = (currency,coin,pais) => {
  let current =  new Intl.NumberFormat(pais,{
    style: 'currency',
    currency: coin
  }).format(currency)
  // console.log(po);
  return current
}



const wallets = async ()  => {

    let dateAccount = await account()
    let cotacionBrl = await brl()
  
  
      let message = ''
      let pris = []
    //    console.log(el.asset);
    //    console.log(el.free);
    message += `Essas são as criptomoedas da sua carteira.\n\n`
       for (let i = 0; i < dateAccount.length; i++) {
            let getpricecoin = await getPriceCoin(`${dateAccount[i].asset}USDT` )
            let pricecoin = Number(getpricecoin[`${dateAccount[i].asset}USDT`]).toFixed(2)
            pris.push((Number(pricecoin) * Number(dateAccount[i].free)))

            
            message += `🚀 __${dateAccount[i].asset}__ \n🪙 Moedas: ${Number(dateAccount[i].free).toFixed(2)} \n 📈 Preço: $${pricecoin}\n__________________\n`;
          }

          let coin = Number(pris.reduce((a,b) => a + b) * cotacionBrl).toFixed(2)
          let coins =  currency(coin,'BRL', 'pt-BR')
          message += `\n Tatal  de moedas: ${pris.length} \n Valor na carteira: ${coins}`
        
      //  bot.sendMessage(chatId,( el.asset, el.free));
      //  bot.sendMessage(chatId, message);
      //  console.log(brls);

    return {message}

    }


module.exports = {
    account,
    brl,
    wallets
}