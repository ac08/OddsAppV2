// sportdata.io key
let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32"; 
let week            = "/8";


// array
let sbOddsArr          = [];
let afcOddsArr         = [];
let nfcOddsArr         = [];
let completedGamesArr  = [];
let inProgressGamesArr = [];
let scheduledGamesArr  = [];




// sportsdata.io ajax calls 
// ======================================================================================================================================================== 

  // afc futures odds call
const afcOdds = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey,
        "method": "GET"
      });
      return resultArr[0].BettingMarkets.filter(market => market.BettingBetType === "AFC Champion");
  } catch (err) {
    console.log(err);
  }

};
  // nfc futures odds call
const nfcOdds = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey,
        "method": "GET"
      });
      return resultArr[0].BettingMarkets.filter(market => market.BettingBetType === "NFC Champion");
  } catch (err) {
    console.log(err);
  }

};

  // sb futures odds call
const sbOdds = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey,
        "method": "GET"
      });
      return resultArr[0].BettingMarkets.filter(market => market.BettingBetType === "NFL Championship Winner");
  } catch (err) {
    console.log(err);
  }

};

// ========================================================================================================================================================
  
// sb futures odds call

const getCompletedGames = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/" + "2020" + week + sportDataApiKey,
        "method": "GET"
      });
      return resultArr;
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================

const getScheduledGames = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/" + "2020" + week + sportDataApiKey,
        "method": "GET"
      });
      return resultArr;
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================


$(document).ready(function() {
  afcOdds().then(dataArr => {
    dataArr[0].BettingOutcomes.filter(sportsbook => {
      if (sportsbook.SportsBook.SportsbookID === 7) {
        afcOddsArr.push({
          teamName: sportsbook.Participant,
          payout: sportsbook.PayoutAmerican
        });
      }
    });
  });

  nfcOdds().then(dataArr => {
    dataArr[0].BettingOutcomes.filter(sportsbook => {
      if (sportsbook.SportsBook.SportsbookID === 7) {
        nfcOddsArr.push({
          teamName: sportsbook.Participant,
          payout: sportsbook.PayoutAmerican
        });
      }
    });
  });

  sbOdds().then(dataArr => {
    dataArr[0].BettingOutcomes.filter(sportsbook => {
      if (sportsbook.SportsBook.SportsbookID === 7) {
        sbOddsArr.push({
          teamName: sportsbook.Participant,
          payout: sportsbook.PayoutAmerican
        });
      }
    });
  });
  console.log(afcOddsArr);
  console.log(nfcOddsArr);
  console.log(sbOddsArr);

  getCompletedGames().then(dataArr => {
    dataArr.forEach(completedGameEl => {
      completedGamesArr.push({
        gameKey:               completedGameEl.GameKey,
        scoreID:               completedGameEl.ScoreID,
        homeTeam:              completedGameEl.HomeTeam,
        awayTeam:              completedGameEl.AwayTeam,
        homeScore:             completedGameEl.HomeScore,
        awayScore:             completedGameEl.AwayScore,
        channel:               completedGameEl.Channel,
        forecastLow:           completedGameEl.ForecastTempLow,
        forecastHigh:          completedGameEl.ForecastTempHigh,
        forecastDesc:          completedGameEl.ForecastDescription,
        stadiumName:           completedGameEl.StadiumDetails.Name,
        stadiumCity:           completedGameEl.StadiumDetails.City,
        stadiumState:          completedGameEl.StadiumDetails.State
      });
    });
  });
  console.log(completedGamesArr);
  
});
