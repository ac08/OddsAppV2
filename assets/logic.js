console.log("FILE LOAD");
// MAYBE TRY TO WRITE THE ARRAYS LOCALLY TO A FILE THEN RENDER FROM THAT
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
    // generate afc odds
    afcOddsArr.forEach((afcOddsEl) => {
    let teamName   = afcOddsEl.teamName;
    let afcOdds    = afcOddsEl.payout;
    let listGroup = $("#AFCWinnerOdds");
    // create list-item for teamName
    let listItem  = $("<p>");
    // add classes to list-item
    listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
    // set text of list-item to teamName
    listItem.text(teamName);
    // create list-item-span for odds
    let listItemSpan = $("<span>");
    // add classes to list-item-spand
    listItemSpan.addClass("badge badge-dark");
    // set text of list-item-span to odds
    listItemSpan.text(afcOdds); 
    // append listItem to listGroup and listSpan to listItem
    listGroup.append(listItem.append(listItemSpan));
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
    // generate nfc odds
    nfcOddsArr.forEach((nfcOddsEl) => {
      let teamName   = nfcOddsEl.teamName;
      let nfcOdds    = nfcOddsEl.payout;
      let listGroup = $("#NFCWinnerOdds");
      // create list-item for teamName
      let listItem  = $("<p>");
      // add classes to list-item
      listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
      // set text of list-item to teamName
      listItem.text(teamName);
      // create list-item-span for odds
      let listItemSpan = $("<span>");
      // add classes to list-item-spand
      listItemSpan.addClass("badge badge-dark");
      // set text of list-item-span to odds
      listItemSpan.text(nfcOdds); 
      // append listItem to listGroup and listSpan to listItem
      listGroup.append(listItem.append(listItemSpan));
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
    // generate sb odds
    sbOddsArr.forEach((sbOddsEl) => {
      let teamName   = sbOddsEl.teamName;
      let sbOdds     = sbOddsEl.payout;
      let listGroup = $("#SuperBowlWinnerOdds");
      // create list-item for teamName
      let listItem  = $("<p>");
      // add classes to list-item
      listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
      // set text of list-item to teamName
      listItem.text(teamName);
      // create list-item-span for odds
      let listItemSpan = $("<span>");
      // add classes to list-item-spand
      listItemSpan.addClass("badge badge-dark");
      // set text of list-item-span to odds
      listItemSpan.text(sbOdds); 
      // append listItem to listGroup and listSpan to listItem
      listGroup.append(listItem.append(listItemSpan));
      });
  }); // end sbOdds handler


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

// ========================================================================================================================================================

// ========================================================================================================================================================

}); // end document.ready() function

