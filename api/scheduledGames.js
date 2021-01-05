const getScheduledGames = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/' + '2020' +  week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

export.modules = getScheduledGames;