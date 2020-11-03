const axios = require('axios').default;

let week            = "/9";
let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32";

// endpoint returns NFL final scores by week ((also inludes stadium and forecast for GameKey))
let finalScoresByWeek = "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/" + "2020" + "/9" + sportDataApiKey;

const getPreGameDetails = async () => {
  try {
    const {data} = await axios.get(finalScoresByWeek);
    return data.filter(gameEl => gameEl.Status === "Scheduled");

  } catch (error) {
      // err handler
      console.error(error);
  }
};

module.exports = getPreGameDetails();