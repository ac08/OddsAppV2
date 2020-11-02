const axios = require('axios').default;

let getScheduledGames = require("./preGameOdds");
let getPreGameDetails = require("./preGameDetails");

let scheduledArr = [];
axios.all([getScheduledGames, getPreGameDetails]).then(axios.spread((...responsesArr) => {
  const preGameOdds    = responsesArr[0];
  const preGameDetails = responsesArr[1];
  preGameOdds.forEach(preGameOddsEL => {
    scheduledArr.push({
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
  preGameDetails.forEach(preGameDetailsEl => {
    let preGameDetailsScoreID = preGameDetailsEl.ScoreId;
    scheduledArr.forEach(gameEl => {
      if (gameEl.ScoreID === preGameDetailsScoreID) {
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
  
  console.log(scheduledArr);
}))
.catch(err => {
  console.log(err);
});