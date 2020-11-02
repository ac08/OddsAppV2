const axios = require('axios').default;

let week            = "/8";
let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32";
let playerStatsByWeek = "https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/" + "2020" + week + sportDataApiKey;

const getPlayerStats = async () => {
  try {
    const {data} = await axios.get(playerStatsByWeek);
    return data;

  } catch (error) {
      // err handler
      console.error(error);
  }
};

getPlayerStats().then(dataArr => {
console.log(dataArr);
});


// module.exports = ;