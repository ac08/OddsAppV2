const axios = require('axios').default;

let week            = "/8";
let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32";

// endpoint returns NFL live-game odds by week
let liveGameOddsURL = "https://api.sportsdata.io/v3/nfl/odds/json/LiveGameOddsByWeek/" + "2020" + week + sportDataApiKey;


const getInProgressGames = async () => {
  try {
    const {data} = await axios.get(liveGameOddsURL);
    return data.filter(gameEl => gameEl.Status === "InProgress");

  } catch (error) {
      // err handler
      console.error(error);
  }
};
// handle succesfuly resolution of getInProgressGame (Promise)
getInProgressGames()
.then(dataArr => {
let inProgressArr = [];

dataArr.forEach(gameEl => {
=  inProgressArr.push({
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
}); console.log(inProgressArr);
})
// contains value passed to reject function 
.catch(err => console.log(err))
.finally(() => console.log("done"));


// module.exports = ;
