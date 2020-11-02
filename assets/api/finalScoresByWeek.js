const axios = require('axios').default;

let week            = "/8";
let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32";

// endpoint returns NFL final scores by week ((also inludes stadium and forecast for GameKey))
let finalScoresByWeek = "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/" + "2020" + week + sportDataApiKey;


const getCompletedGames = async () => {
  try {
    // await keyword will await resolution of promise (axios.get())
    const {data} = await axios.get(finalScoresByWeek);
    return data.filter(gameEl => gameEl.Status === "Final");

  } catch (error) {
      // err handler
      console.error(error);
  }
};

getCompletedGames().then(dataArr => {
let completedArr = [];
dataArr.forEach(gameEl => {
  completedArr.push({
    gameKey:               gameEl.GameKey,
    scoreID:               gameEl.ScoreID,
    homeTeam:              gameEl.HomeTeam,
    awayTeam:              gameEl.AwayTeam,
    homeScore:             gameEl.HomeScore,
    awayScore:             gameEl.AwayScore,
    channel:               gameEl.Channel,
    forecastLow:           gameEl.ForecastTempLow,
    forecastHigh:          gameEl.ForecastTempHigh,
    forecastDesc:          gameEl.ForecastDescription,
    stadiumName:           gameEl.StadiumDetails.Name,
    stadiumCity:           gameEl.StadiumDetails.City,
    stadiumState:          gameEl.StadiumDetails.State
  });
});
console.log(completedArr);
});


// module.exports = ;