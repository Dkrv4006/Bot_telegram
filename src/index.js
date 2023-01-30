const Binance = require('binance-api-node').default

const bot = Binance({
    apiKey: 'Cobu6pTM2xk4YD7GzFLY5nkLn3twtqb6W99xTL0lozZ37WpW0eqGxzdbiPLFGsfv',
    apiSecret: '3AREAW1phHXUWibVYCfD6vbsFHmFx5tJx4Lr8SxO0fQVnJMZiQ33Ba1sxH64FL5O',
    getTime: 3000

})

// setInterval(
//  price = async () => {
//    await bot.prices({ symbol: 'ETHBTC' })
//    .then(price => console.log(price))
   
// },5000)

// price()
bot.time().then(time => console.log(time))


// console.log(price('ETHBTC'))