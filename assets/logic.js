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
let newsArr            = [];




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

const getNews = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/News" + sportDataApiKey,
        "method": "GET"
      });
      return resultArr;
  } catch (err) {
    console.log(err);
  }

};


// ========================================================================================================================================================
  
// getCompletedGames() call

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

// getScheduledGames and Details calls

const getScheduledGames = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/" + "2020" +  "/9" + sportDataApiKey,
        "method": "GET"
      });
      return resultArr.filter(gameEl => gameEl.Status === "Scheduled");
  } catch (err) {
    console.log(err);
  }
};

const getScheduledGamesDetails = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/" + "2020" + "/9" + sportDataApiKey,
        "method": "GET"
      });
      return resultArr.filter(gameEl => gameEl.Status === "Scheduled");
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================
  
// getInProgressGames() call

const getInProgressGames = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/odds/json/LiveGameOddsByWeek/" + "2020" + week + sportDataApiKey,
        "method": "GET"
      });
      return resultArr.filter(gameEl => gameEl.Status === "InProgress");
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
  }); // end afcOdds handler

  nfcOdds().then(dataArr => {
    dataArr[0].BettingOutcomes.filter(sportsbook => {
      if (sportsbook.SportsBook.SportsbookID === 7) {
        nfcOddsArr.push({
          teamName: sportsbook.Participant,
          payout: sportsbook.PayoutAmerican
        });
      }
    });
  }); // end nfcOdds handler

  sbOdds().then(dataArr => {
    dataArr[0].BettingOutcomes.filter(sportsbook => {
      if (sportsbook.SportsBook.SportsbookID === 7) {
        sbOddsArr.push({
          teamName: sportsbook.Participant,
          payout: sportsbook.PayoutAmerican
        });
      }
    });
  }); // end sbOdds handler

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
  }); // end getCompletedGames handler

  console.log(completedGamesArr);

  $.when(getScheduledGames(), getScheduledGamesDetails()).then((dataArrOdds, dataArrDetails) => {
    dataArrOdds.forEach(preGameOddsEL => {
      scheduledGamesArr.push({
        scoreID:               preGameOddsEL.ScoreId,
        homeTeam:              preGameOddsEL.HomeTeamName,
        awayTeam:              preGameOddsEL.AwayTeamName,
        homeTeamML:            preGameOddsEL.PregameOdds[0].HomeMoneyLine,
        awayTeamML:            preGameOddsEL.PregameOdds[0].AwayMoneyLine,
        homePointSpread:       preGameOddsEL.PregameOdds[0].HomePointSpread,
        homePointSpreadPayout: preGameOddsEL.PregameOdds[0].HomePointSpreadPayout,
        awayPointSpread:       preGameOddsEL.PregameOdds[0].AwayPointSpread,
        awayPointSpreadPayout: preGameOddsEL.PregameOdds[0].AwayPointSpreadPayout,
        overUnderTotal:        preGameOddsEL.PregameOdds[0].OverUnder,
        overPayout:            preGameOddsEL.PregameOdds[0].OverPayout,
        underPayout:           preGameOddsEL.PregameOdds[0].UnderPayout
      });
    });
    dataArrDetails.forEach(preGameDetailsEl => {
      let preGameDetailsScoreID = preGameDetailsEl.ScoreId;
      scheduledGamesArr.forEach(gameEl => {
        if (gameEl.scoreID === preGameDetailsScoreID) {
            gameEl.channel       =  preGameDetailsEl.Channel,
            gameEl.forecastLow   =  preGameDetailsEl.ForecastTempLow,
            gameEl.forecastHigh  =  preGameDetailsEl.ForecastTempHigh,
            gameEl.forecastDesc  =  preGameDetailsEl.ForecastDescription,
            gameEl.stadiumName   =  preGameDetailsEl.StadiumDetails.Name,
            gameEl.stadiumCity   =  preGameDetailsEl.StadiumDetails.City,
            gameEl.stadiumState  =  preGameDetailsEl.StadiumDetails.State;
        }
      });
    });
  }); // end getScheduledGames handler

  console.log(scheduledGamesArr);

  getInProgressGames().then(dataArr => {
    dataArr.forEach(gameEl => {
      inProgressGamesArr.push({
        scoreID:               gameEl.ScoreId,
        homeTeam:              gameEl.HomeTeamName,
        awayTeam:              gameEl.AwayTeamName,
        homeTeamML:            gameEl.LiveOdds[0].HomeMoneyLine,
        awayTeamML:            gameEl.LiveOdds[0].AwayMoneyLine,
        homePointSpread:       gameEl.LiveOdds[0].HomePointSpread,
        awayPointSpread:       gameEl.LiveOdds[0].AwayPointSpread,
        homePointSpreadPayout: gameEl.LiveOdds[0].HomePointSpreadPayout,
        awayPointSpreadPayout: gameEl.LiveOdds[0].AwayPointSpreadPayout,
        overUnderTotal:        gameEl.LiveOdds[0].OverUnder,
        overPayout:            gameEl.LiveOdds[0].OverPayout,
        underPayout:           gameEl.LiveOdds[0].UnderPayout    
      });
    });
  }); // end getInProgressGames handler

  console.log(inProgressGamesArr);

  getNews().then(dataArr => {
    // loop to push news objects to newsArr for the last three days
    for (i = 0; i < 3; i++) {
        newsArr.push({
          timeAgo:  dataArr[i].TimeAgo,
          headline: dataArr[i].Title,
          story:    dataArr[i].Content,
          link:     dataArr[i].Url
        });
    }
  }); // end getNews handler

  console.log(newsArr);

// ========================================================================================================================================================


}); // end document.ready() function
