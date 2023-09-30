class CoinService {
    async getCoinImage() {
        try {

            const response = await fetch(`https://api.coingecko.com/api/v3/coins/`);
            const coinImageUrl = await response.json();
            return coinImageUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
}

const coinsService = new CoinService();

const getImage = async (coinName) => {

    const data = await coinsService.getCoinImage();

    const coinImage = data.find((coin) => coin.id === coinName);

    return coinImage?.image.large;
}



fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true`).then(res => res.json()).then(async json => {
    const container = document.querySelector(".container")
    const coins = Object.getOwnPropertyNames(json)

    for (let coin of coins) {
        const coinInfo = json[`${coin}`]
        const price = coinInfo.usd
        const change = coinInfo.usd_24h_change.toFixed(5)

        container.innerHTML += `
        <div class="coin ${change < 0 ? 'falling' : 'rising'}" >
           <div class = "coin-logo">
           <img src="${await getImage(coin)}">
           </div>

           <div class="coin-name">
           <h3>${coin}</h3>
           <span>/USD</span>
           </div>

           <div class="coin-price">
           <span class = "price">${price}</span>
           <span class = "change">${change}</span>
           </div>
        </div>
        `

    }

})

