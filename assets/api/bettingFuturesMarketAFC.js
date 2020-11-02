const axios = require('axios').default;

let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32";

const getAFCOdds = async () => {
    try {
      const resp = await axios.get("https://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey);
      let data = resp.data[0];
      let bettingMarkets     = data.BettingMarkets;
      let AFCWinnerOddsArr   = bettingMarkets.filter(market => market.BettingBetType === "AFC Champion");
      // array defined for all active NFL-AFC teams odds to win AFC Championship 
      let AFCWinnerOddsArrDK = AFCWinnerOddsArr[0].BettingOutcomes.filter(sportsbook => sportsbook.SportsBook.SportsbookID === 7);
      return AFCWinnerOddsArrDK;

    } catch (err) {
        // err handler
        console.error(err);
    }
};

getAFCOdds();

module.exports = getAFCOdds();