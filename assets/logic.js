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

// getNews() call

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
  
// getTeamDetails() call

const getTeamDetails = async () => {
  let resultArr;
  try {
    resultArr = await $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/AllTeams" + sportDataApiKey,
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

  // console.log(afcOddsArr);
  // console.log(nfcOddsArr);
  // console.log(sbOddsArr);

  getCompletedGames().then(dataArr => {
    dataArr.forEach(completedGameEl => {
      completedGamesArr.push({
        gameKey:               completedGameEl.GameKey,
        scoreID:               completedGameEl.ScoreID,
        homeTeam:              completedGameEl.HomeTeam,
        homeTeamID:            completedGameEl.HomeTeamID,
        awayTeam:              completedGameEl.AwayTeam,
        awayTeamID:            completedGameEl.AwayTeamID,
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

  $.when(getScheduledGames(), getScheduledGamesDetails(), getTeamDetails()).then((dataArrOdds, dataArrDetails, dataArrTeamDetails) => {
    dataArrOdds.forEach(preGameOddsEL => {
      scheduledGamesArr.push({
        scoreID:               preGameOddsEL.ScoreId,
        dateTime:              preGameOddsEL.DateTime,
        homeTeam:              preGameOddsEL.HomeTeamName,
        homeTeamID:            preGameOddsEL.HomeTeamId,
        awayTeam:              preGameOddsEL.AwayTeamName,
        awayTeamID:            preGameOddsEL.AwayTeamId,
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
    dataArrTeamDetails.forEach(teamDetailEl => {
      let teamID = teamDetailEl.TeamID;
      scheduledGamesArr.forEach(gameEl => {
        if (teamID === gameEl.homeTeamID) {
          gameEl.homeTeamFullName = teamDetailEl.FullName;
          gameEl.homeTeamLogo     = teamDetailEl.WikipediaLogoUrl;
          gameEl.homeHeadCoach    = teamDetailEl.HeadCoach;
        } else if (teamID === gameEl.awayTeamID) {
          gameEl.awayTeamFullName = teamDetailEl.FullName;
          gameEl.awayTeamLogo     = teamDetailEl.WikipediaLogoUrl;
          gameEl.awayHeadCoach    = teamDetailEl.HeadCoach;
        }
      });
    });

  }); // end getScheduledGames handler

  getInProgressGames().then(dataArr => {
    dataArr.forEach(inProgressGameEl => {
      inProgressGamesArr.push({
        scoreID:               inProgressGameEl.ScoreId,
        homeTeam:              inProgressGameEl.HomeTeamName,
        homeTeamID:            inProgressGameEl.HomeTeamId,
        awayTeam:              inProgressGameEl.AwayTeamName,
        awayTeamID:            inProgressGameEl.AwayTeamId,
        homeTeamML:            inProgressGameEl.LiveOdds[0].HomeMoneyLine,
        awayTeamML:            inProgressGameEl.LiveOdds[0].AwayMoneyLine,
        homePointSpread:       inProgressGameEl.LiveOdds[0].HomePointSpread,
        awayPointSpread:       inProgressGameEl.LiveOdds[0].AwayPointSpread,
        homePointSpreadPayout: inProgressGameEl.LiveOdds[0].HomePointSpreadPayout,
        awayPointSpreadPayout: inProgressGameEl.LiveOdds[0].AwayPointSpreadPayout,
        overUnderTotal:        inProgressGameEl.LiveOdds[0].OverUnder,
        overPayout:            inProgressGameEl.LiveOdds[0].OverPayout,
        underPayout:           inProgressGameEl.LiveOdds[0].UnderPayout    
      });
    });
  }); // end getInProgressGames handler

  getNews().then(dataArr => {
    // push news articles from last three days to newsArr
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

  getTeamDetails().then(dataArr => {
    dataArr.forEach(teamDetailEl => {
      let teamID = teamDetailEl.TeamID;
      inProgressGamesArr.forEach(gameEl => {
        if (teamID === gameEl.homeTeamID) {
          gameEl.homeTeamFullName = teamDetailEl.FullName;
          gameEl.homeTeamLogo     = teamDetailEl.WikipediaLogoUrl;
          gameEl.homeHeadCoach    = teamDetailEl.HeadCoach;
        } else if (teamID === gameEl.awayTeamID) {
          gameEl.awayTeamFullName = teamDetailEl.FullName;
          gameEl.awayTeamLogo     = teamDetailEl.WikipediaLogoUrl;
          gameEl.awayHeadCoach    = teamDetailEl.HeadCoach;

        }
      });
      completedGamesArr.forEach(gameEl => {
        if (teamID === gameEl.homeTeamID) {
          gameEl.homeTeamFullName = teamDetailEl.FullName;
          gameEl.homeTeamLogo     = teamDetailEl.WikipediaLogoUrl;
          gameEl.homeHeadCoach    = teamDetailEl.HeadCoach;
        } else if (teamID === gameEl.awayTeamID) {
          gameEl.awayTeamFullName = teamDetailEl.FullName;
          gameEl.awayTeamLogo     = teamDetailEl.WikipediaLogoUrl;
          gameEl.awayHeadCoach    = teamDetailEl.HeadCoach;
        }
      });
    });
  });
  console.log(scheduledGamesArr);
  console.log(inProgressGamesArr);
  console.log(completedGamesArr);

// ========================================================================================================================================================

function loadPreGameCards() {
  scheduledGamesArr.forEach((gameEl) => {
      let futuresMarketDiv  = $("#futuresMarket");
      let preGameCard       = $("<div>");                                              // begin pre-game score card
      preGameCard.addClass("container-fluid text-center card preGameCard mb-3");
      preGameCard.attr("id", gameEl.gameID);
      
      
      let preGameAwayRow    = $("<div>");                                              // begin pre-game away row
      preGameAwayRow.addClass("row card-body");
      preGameCard.append(preGameAwayRow);
      let awayTeamLogo      = $("<img>")
      awayTeamLogo.addClass("col-1 card-img");
      awayTeamLogo.attr("src", gameEl.awayTeamLogo)
                  .attr("id", "awayTeamLogoPre");
      let awayTeamName      = $("<div>");
      awayTeamName.addClass("col-4 font-weight-bold");
      awayTeamName.text(gameEl.awayFullName);

      let location          = $("<div>");
      location.addClass("col-6");
      location.text(gameEl.stadiumName + " - " + gameEl.stadiumCity + ", " + gameEl.stadiumState);
      let channel           = $("<div>");

      channel.addClass("col-1");
      channel.text(gameEl.channel);
      
      preGameCard.insertAfter(futuresMarketDiv);
      preGameAwayRow.append(awayTeamLogo, awayTeamName, location, channel);

      
      let preGameHomeRow    = $("<div>");                                                 // begin pre-game home row
      preGameHomeRow.addClass("row card-body");
      preGameCard.append(preGameHomeRow);
      let homeTeamLogo      = $("<img>")
      homeTeamLogo.addClass("col-1 card-img");
      homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                  .attr("id", "homeTeamLogoPre");
      let homeTeamName      = $("<div>");
      homeTeamName.addClass("col-4 font-weight-bold");
      homeTeamName.text(gameEl.homeFullName);
      let gameTime          = $("<div>");
      gameTime.addClass("col-6");
      gameTime.text(moment(gameEl.dateTime).format('MMMM Do YYYY, h:mm a'));

      let preGameBtn        = $("<i>");
      preGameBtn.addClass("col-1 preGameModalBtn fas fa-football-ball my-auto")           // add preGameModalBtn class for on-click function
                .attr("data-toggle", "modal")
                .attr("data-target", "#pre-game-modal")
                .attr("id", gameEl.gameID);
      
      preGameCard.insertAfter(futuresMarketDiv);
      preGameHomeRow.append(homeTeamLogo, homeTeamName, gameTime, preGameBtn);


  });
}

loadPreGameCards();

}); // end document.ready() function
