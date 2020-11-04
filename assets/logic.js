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
  try {
    return $.ajax({
        "url": "http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey,
        "method": "GET"
      });
  } catch (err) {
    console.log(err);
  }
};
// nfc futures odds call
const nfcOdds = () => {
  try {
    return $.ajax({
        "url": "http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey,
        "method": "GET"
      }); 
  } catch (err) {
    console.log(err);
  }
};

// sb futures odds call
const sbOdds = () => {
  try {
    return $.ajax({
        "url": "http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/" + "2020" + sportDataApiKey,
        "method": "GET"
      });
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================

// getNews() call
const getNews = async () => {
  try {
    return $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/News" + sportDataApiKey,
        "method": "GET"
      });
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================
  
// getTeamDetails() call
const getTeamDetails = () => {
  try {
    return $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/AllTeams" + sportDataApiKey,
        "method": "GET"
      });
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================
 
// getCompletedGames() call
const getCompletedGames = () => {
  try {
    return $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/" + "2020" + week + sportDataApiKey,
        "method": "GET"
      });
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================

// getScheduledGames and Details calls
const getScheduledGames = () => {
  try {
    return $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/" + "2020" +  "/9" + sportDataApiKey,
        "method": "GET"
      });
  } catch (err) {
    console.log(err);
  }
};

const getScheduledGamesDetails = () => {
  try {
    return $.ajax({
        "url": "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/" + "2020" + "/9" + sportDataApiKey,
        "method": "GET"
      });
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================
  
// getInProgressGames() call

const getInProgressGames = async () => {
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


$(document).ready(async () => {
  let afcResArr  = await afcOdds();
  let afcDataArr = afcResArr[0].BettingMarkets.filter(market => market.BettingBetType === "AFC Champion");
  afcDataArr[0].BettingOutcomes.filter(sportsbook => {
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
  }); // end afcOdds handler


  let nfcResArr  = await nfcOdds();
  let nfcDataArr = nfcResArr[0].BettingMarkets.filter(market => market.BettingBetType === "NFC Champion");
  nfcDataArr[0].BettingOutcomes.filter(sportsbook => {
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
    }); // end nfcOdds handler

    let sbResArr  = await afcOdds();
    let sbDataArr = sbResArr[0].BettingMarkets.filter(market => market.BettingBetType === "NFL Championship Winner");
    sbDataArr[0].BettingOutcomes.filter(sportsbook => {
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
    }); // end sbOdds handler


  let completedGamesDataArr = await getCompletedGames();
  completedGamesDataArr.forEach(completedGameEl => {
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
  }); // end getCompletedGames handler

  let scheduledGamesResArr  = await getScheduledGames();
  let scheduledGamesDataArr = scheduledGamesResArr.filter(gameEl => gameEl.Status === "Scheduled");
    scheduledGamesDataArr.forEach(preGameOddsEL => {
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
    }); // end getScheduledGamesDetails handler

  let scheduledGamesResDetailsArr  = await getScheduledGamesDetails();
  let scheduledGamesDataDetailsArr = scheduledGamesResDetailsArr.filter(gameEl => gameEl.Status === "Scheduled");
    scheduledGamesDataDetailsArr.forEach(preGameDetailsEl => {
      console.log(scheduledGamesDataDetailsArr);
      let preGameDetailsScoreID = preGameDetailsEl.ScoreID;
      scheduledGamesArr.forEach(gameEl => {
        if (gameEl.scoreID === preGameDetailsScoreID) {
          console.log('HERE');

            gameEl.channel       =  preGameDetailsEl.Channel,
            gameEl.forecastLow   =  preGameDetailsEl.ForecastTempLow,
            gameEl.forecastHigh  =  preGameDetailsEl.ForecastTempHigh,
            gameEl.forecastDesc  =  preGameDetailsEl.ForecastDescription,
            gameEl.stadiumName   =  preGameDetailsEl.StadiumDetails.Name,
            gameEl.stadiumCity   =  preGameDetailsEl.StadiumDetails.City,
            gameEl.stadiumState  =  preGameDetailsEl.StadiumDetails.State;
        }
      });
    }); // end getScheduledGamesDetails handler

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

  let newsDataArr = await getNews();

  // push news articles from last three days to newsArr
  for (i = 0; i < 3; i++) {
      newsArr.push({
        timeAgo:  newsDataArr[i].TimeAgo,
        headline: newsDataArr[i].Title,
        story:    newsDataArr[i].Content,
        link:     newsDataArr[i].Url
      });
  }
  // render news elements
  newsArr.forEach((newsEl, i) => {
    // generate ID to be used as a selector
    let contentID  = "#" + "content-" + [i];
    // select correct scrollspy item
    let contentEl  = $(contentID);
    // generate h5 tag
    let headlineEl = $("<h5>");
    // add classes to h5 tag
    headlineEl.addClass("text-bold text-body mb-1");
    // set h5 tag text to headline property in looping newsElement
    headlineEl.text(newsEl.headline);
    // insert h5 after contentEl 
    headlineEl.insertAfter(contentEl);
    // generate p tag
    let storyEl    = $("<p>");
    // set p tag text to story property in looping newsElement
    storyEl.text(newsEl.story);
    // insert p tag after headlineEl
    storyEl.insertAfter(headlineEl);
    // generate a tag
    let buttonEl   = $("<a>");
    // add classes to a tag
    buttonEl.addClass("btn btn-outline-dark btn-sm mb-3");
    // set a tag text 
    buttonEl.text("Continue");
    // set href attr of a tag to link property in looping newsElement
    buttonEl.attr("href", newsEl.link);
    // set role attr of a tag to "button" in looping newsElement
    buttonEl.attr("role", "button");
    // insert a tag after storyEl
    buttonEl.insertAfter(storyEl);
  }); // end getNews handler

  let teamDetailsDataArr = await getTeamDetails();
  teamDetailsDataArr.forEach(teamDetailEl => {
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

  console.log(scheduledGamesArr);
  console.log(inProgressGamesArr);
  console.log(completedGamesArr);

// ========================================================================================================================================================
function loadPreGameCards() {
  scheduledGamesArr.forEach((gameEl) => {
      let futuresMarketDiv  = $("#futuresMarket");
      let preGameCard       = $("<div>");                                              // begin pre-game score card
      preGameCard.addClass("container-fluid text-center card preGameCard mb-3");
      preGameCard.attr("id", gameEl.scoreID);
      
      
      let preGameAwayRow    = $("<div>");                                              // begin pre-game away row
      preGameAwayRow.addClass("row card-body");
      preGameCard.append(preGameAwayRow);
      let awayTeamLogo      = $("<img>")
      awayTeamLogo.addClass("col-1 card-img");
      awayTeamLogo.attr("src", gameEl.awayTeamLogo)
                  .attr("id", "awayTeamLogoPre");
      let awayTeamFullName      = $("<div>");
      awayTeamFullName.addClass("col-4 font-weight-bold");
      awayTeamFullName.text(gameEl.awayTeamFullName);

      let location          = $("<div>");
      location.addClass("col-6");
      location.text(gameEl.stadiumName + " - " + gameEl.stadiumCity + ", " + gameEl.stadiumState);
      let channel           = $("<div>");

      channel.addClass("col-1");
      channel.text(gameEl.channel);
      
      preGameCard.insertAfter(futuresMarketDiv);
      preGameAwayRow.append(awayTeamLogo, awayTeamFullName, location, channel);

      
      let preGameHomeRow    = $("<div>");                                                 // begin pre-game home row
      preGameHomeRow.addClass("row card-body");
      preGameCard.append(preGameHomeRow);
      let homeTeamLogo      = $("<img>")
      homeTeamLogo.addClass("col-1 card-img");
      homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                  .attr("id", "homeTeamLogoPre");
      let homeTeamFullName      = $("<div>");
      homeTeamFullName.addClass("col-4 font-weight-bold");
      homeTeamFullName.text(gameEl.homeTeamFullName);
      let gameTime          = $("<div>");
      gameTime.addClass("col-6");
      gameTime.text(moment(gameEl.dateTime).format('MMMM Do YYYY, h:mm a'));

      let preGameBtn        = $("<i>");
      preGameBtn.addClass("col-1 preGameModalBtn fas fa-baseball-ball my-auto")           // add preGameModalBtn class for on-click function
                .attr("data-toggle", "modal")
                .attr("data-target", "#pre-game-modal")
                .attr("id", gameEl.scoreID);
      
      preGameCard.insertAfter(futuresMarketDiv);
      preGameHomeRow.append(homeTeamLogo, homeTeamFullName, gameTime, preGameBtn);


  });
}

loadPreGameCards();

// ========================================================================================================================================================

function loadCompleteGameCards() {
  completedGamesArr.forEach((gameEl) => {
      let futuresMarketDiv     = $("#futuresMarket");
      let completeGameCard     = $("<div>");
      completeGameCard.addClass("container-fluid text-center card my-3 border completeGameCard");
      completeGameCard.attr("id", gameEl.scoreID);
      completeGameCard.insertAfter(futuresMarketDiv);

      let completeGameAwayRow  = $("<div>");
      completeGameAwayRow.addClass("row card-body");
      let awayTeamLogo         = $("<img>");
      awayTeamLogo.addClass("col-1 card-img");
      awayTeamLogo.attr("src", gameEl.awayTeamLogo)
                  .attr("id", "awayTeamLogoComplete");
      let awayTeamFullName         = $("<div>");
      awayTeamFullName.addClass("col-4 font-weight-bold");
      awayTeamFullName.text(gameEl.awayTeamFullName);
      let awayScore          = $("<div>");
      awayScore.addClass("col-2");
      awayScore.text(gameEl.awayScore);
      let awayHeadCoach         = $("<div>");
      awayHeadCoach.addClass("col-5");
      awayHeadCoach.attr("id", "awayHeadCoach");

      completeGameCard.append(completeGameAwayRow.append(awayTeamLogo, awayTeamFullName, awayScore, awayHeadCoach));


      let completeGameHomeRow = $("<div>");
      completeGameHomeRow.addClass("row card-body");
      let homeTeamLogo        = $("<img>");
      homeTeamLogo.addClass("col-1 card-img");
      homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                  .attr("id", "homeTeamLogoComplete");
      let homeTeamFullName        = $("<div>");
      homeTeamFullName.addClass("col-4 font-weight-bold");
      homeTeamFullName.text(gameEl.homeTeamFullName);
      let homeScore         = $("<div>");
      homeScore.addClass("col-2");
      homeScore.text(gameEl.homeScore);
      let homeHeadCoach          = $("<div>");
      homeHeadCoach.addClass("col-5");
      homeHeadCoach.attr("id", "pitcherTwo");

      completeGameCard.append(completeGameHomeRow.append(homeTeamLogo, homeTeamFullName, homeScore, homeHeadCoach));

  });
}

loadCompleteGameCards();
// ========================================================================================================================================================

// ========================================================================================================================================================

}); // end document.ready() function

