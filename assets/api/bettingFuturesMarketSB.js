const axios = require('axios').default;

let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32";

const getSuperBowlOdds = async () => {
    try {
      const resp = await axios.get("https://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey);
      let data = resp.data[0];
      let bettingMarkets     = data.BettingMarkets;
      let SBWinnerOddsArr   = bettingMarkets.filter(market => market.BettingBetType === "NFL Championship Winner");
      // array defined for all active NFL-AFC teams odds to win AFC Championship 
      let SBWinnerOddsArrDK = SBWinnerOddsArr[0].BettingOutcomes.filter(sportsbook => sportsbook.SportsBook.SportsbookID === 7);
      return SBWinnerOddsArrDK;

    } catch (err) {
        // err handler
        console.error(err);
    }
};

getSuperBowlOdds();

module.exports = getSuperBowlOdds();