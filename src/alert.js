const { sdd } = require('./bot1');

const Binance = require('binance-api-node').default

require('dotenv').config()


const binance = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

let alerts = [];

const Alert = (price) => {
    // const command = price.split(' ');
    console.log(command[0])
    if (command[0].length < 6) {
        return 'Formato inválido. Utilize /alert [moeda] [preço]';
    } else {
        const currency = command[0];
        const price = command[1];
        
        alerts = alerts || [];
        alerts.push({
            currency: currency,
            price: price
        });
        
    console.log(alerts)
    checkAlerts();
      return `Alerta criado para ${currency} com preço ${price}.`;
  
    }
  }



;

function checkAlerts() {
    binance.prices().then(prece => {
        for (let chatId in alerts) {
            alerts.forEach((alert) => {
                const currentPrice = prece[alert.currency]
               
                
                const currency = alert.currency;
                const price = alert.price;
                // const currentPrice = ticker[currency + 'BTC'];
                console.log(currentPrice);
                if (currentPrice >= price -10 && currentPrice <= price + 10) {

                    let a = `Atenção! O preço atual de ${currency} está perto do seu preço de alerta de ${price}.`;
                    sdd(null,null,a )
                }
            });
        }
    })
    setTimeout(checkAlerts, 6000);
  };
// }

module.exports = {
    Alert
} 