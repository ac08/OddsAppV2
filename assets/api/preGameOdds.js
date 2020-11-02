const axios = require('axios').default;

let week            = "/9";
let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32";

// endpoint returns NFL pre-game odds by week 
let gamesOddsByWeekURL = "https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/" + "2020" + week + sportDataApiKey;

const getScheduledGames = async () => {
    try {
      const {data} = await axios.get(gamesOddsByWeekURL);
      return data.filter(gameEl => gameEl.Status === "Scheduled");

    } catch (error) {
        // err handler
        console.error(error);
    }
};


module.exports = getScheduledGames();