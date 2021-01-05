// sportdata.io key
let sportDataApiKey = '?key=acf8068f55284fd4afd0b96f698b5b32'; 
let week            = '/9';


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
const afcOdds = () => {
  try {
    return $.ajax({
        'url': 'http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/' + '2020' + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};
// nfc futures odds call
const nfcOdds = () => {
  try {
    return $.ajax({
        'url': 'http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/' + '2020' + sportDataApiKey,
        'method': 'GET'
      }); 
  } catch (err) {
    console.log(err);
  }
};

// sb futures odds call
const sbOdds = () => {
  try {
    return $.ajax({
        'url': 'http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/' + '2020' + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================

// getNews() call
const getNews = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/News' + sportDataApiKey,
        'method': 'GET'
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
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/AllTeams' + sportDataApiKey,
        'method': 'GET'
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
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/' + '2020' + week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ========================================================================================================================================================

// getScheduledGames and getGameDetails calls
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

const getGameDetails = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/' + '2020' + week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ===========================================================================
  
// getInProgressGames() call

const getInProgressGames = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/odds/json/LiveGameOddsByWeek/' + '2020' + week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ===========================================================================


$(document).ready(async () => {
  const afcResArr  = await afcOdds();
  const afcDataArr = afcResArr[0].BettingMarkets.filter((market) => market.BettingBetType === 'AFC Champion');
  afcDataArr[0].BettingOutcomes.filter(sportsbook => {
    if (sportsbook.SportsBook.SportsbookID === 7) {
      afcOddsArr.push({
        teamName: sportsbook.Participant,
        payout: sportsbook.PayoutAmerican
      });
    }
  });

  const nfcResArr  = await nfcOdds();
  const nfcDataArr = nfcResArr[0].BettingMarkets.filter((market) => market.BettingBetType === 'NFC Champion');
  nfcDataArr[0].BettingOutcomes.filter(sportsbook => {
    if (sportsbook.SportsBook.SportsbookID === 7) {
      nfcOddsArr.push({
        teamName: sportsbook.Participant,
        payout: sportsbook.PayoutAmerican
      });
    }
  });

  const sbResArr  = await afcOdds();
  const sbDataArr = sbResArr[0].BettingMarkets.filter((market) => market.BettingBetType === 'NFL Championship Winner');
  sbDataArr[0].BettingOutcomes.filter(sportsbook => {
    if (sportsbook.SportsBook.SportsbookID === 7) {
      sbOddsArr.push({
        teamName: sportsbook.Participant,
        payout: sportsbook.PayoutAmerican
      });
    }
  });

  const completedGamesResArr = await getCompletedGames();
  const completedGamesDataArr = completedGamesResArr.filter((gameEl) => gameEl.Status === 'Final');
  completedGamesDataArr.forEach((completedGameEl) => {
    let scoreCheck = (completedGameEl.HomeScore > completedGameEl.AwayScore);
    completedGamesArr.push({
      homeWon:               scoreCheck,
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
  }); //end getCompletedGames handler

  const scheduledGamesResArr  = await getScheduledGames();
  const scheduledGamesDataArr = scheduledGamesResArr.filter((gameEl) => gameEl.Status === 'Scheduled');
    scheduledGamesDataArr.forEach((preGameOddsEL) => {
      scheduledGamesArr.push({
        scoreID:               preGameOddsEL.ScoreId,
        dateTime:              moment(preGameOddsEL.DateTime).format('MMMM Do YYYY, h:mm a'),
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

  const gameDetailsResArr  = await getGameDetails();
  const gameDetailsDataArr = gameDetailsResArr.filter((gameEl) => gameEl.Status === 'Scheduled');
  gameDetailsDataArr.forEach((gameDetailsEl) => {
    let gameDetailsElScoreID = gameDetailsEl.ScoreID;
    scheduledGamesArr.forEach((gameEl) => {
      if (gameEl.scoreID === gameDetailsElScoreID) {
          gameEl.channel       =  gameDetailsEl.Channel,
          gameEl.forecastLow   =  gameDetailsEl.ForecastTempLow,
          gameEl.forecastHigh  =  gameDetailsEl.ForecastTempHigh,
          gameEl.forecastDesc  =  gameDetailsEl.ForecastDescription,
          gameEl.stadiumName   =  gameDetailsEl.StadiumDetails.Name,
          gameEl.stadiumCity   =  gameDetailsEl.StadiumDetails.City,
          gameEl.stadiumState  =  gameDetailsEl.StadiumDetails.State;
      }
    });
  }); // end getGameDetails for stadium and channel information for pre-games handler

  const inProgressGamesResArr = await getInProgressGames();
  const inProgressGamesDataArr = inProgressGamesResArr.filter((gameEl) => gameEl.Status === 'InProgress');
  inProgressGamesDataArr.forEach(inProgressGameEl => {
    inProgressGamesArr.push({
      scoreID:               inProgressGameEl.ScoreId,
      homeTeam:              inProgressGameEl.HomeTeamName,
      homeTeamID:            inProgressGameEl.HomeTeamId,
      awayTeam:              inProgressGameEl.AwayTeamName,
      awayTeamID:            inProgressGameEl.AwayTeamId,
      homePointSpread:       inProgressGameEl.LiveOdds[0].HomePointSpread,
      awayPointSpread:       inProgressGameEl.LiveOdds[0].AwayPointSpread,
      homePointSpreadPayout: inProgressGameEl.LiveOdds[0].HomePointSpreadPayout,
      awayPointSpreadPayout: inProgressGameEl.LiveOdds[0].AwayPointSpreadPayout,
      overUnderTotal:        inProgressGameEl.LiveOdds[0].OverUnder,
      overPayout:            inProgressGameEl.LiveOdds[0].OverPayout,
      underPayout:           inProgressGameEl.LiveOdds[0].UnderPayout    
    });
  }); 
  // end getInProgressGames handler

  const gameDetailsResArr2  = await getGameDetails();
  const gameDetailsDataArr2 = gameDetailsResArr2.filter(gameEl => gameEl.Status === 'InProgress');
  gameDetailsDataArr2.forEach((detailsEl) => {
    const detailsElScoreID = detailsEl.ScoreID;
    inProgressGamesArr.forEach(gameEl => {
      if (gameEl.scoreID === detailsElScoreID) {
        gameEl.homeTeamML    = detailsEl.HomeTeamMoneyLine,
        gameEl.awayTeamML    = detailsEl.AwayTeamMoneyLine,
        gameEl.homeTeamScore = detailsEl.HomeScore,
        gameEl.awayTeamScore = detailsEl.AwayScore,
        gameEl.channel       = detailsEl.Channel,
        gameEl.quarter       = detailsEl.QuarterDescription,
        gameEl.timeRemaining = detailsEl.TimeRemaining
      }
    });
  }); // end getGameDetails for added details inProgress games handler


  const newsDataArr = await getNews();

  // push news articles from last three days to newsArr
  for (let i = 0; i < 3; i++) {
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
    let contentID  = '#' + 'content-' + [i];
    // select correct scrollspy item
    let contentEl  = $(contentID);
    // generate h5 tag
    let headlineEl = $('<h5>');
    // add classes to h5 tag
    headlineEl.addClass('text-bold text-body mb-1');
    // set h5 tag text to headline property in looping newsElement
    headlineEl.text(newsEl.headline);
    // insert h5 after contentEl 
    headlineEl.insertAfter(contentEl);
    // generate p tag
    let storyEl    = $('<p>');
    // set p tag text to story property in looping newsElement
    storyEl.text(newsEl.story);
    // insert p tag after headlineEl
    storyEl.insertAfter(headlineEl);
    // generate a tag
    let buttonEl   = $('<a>');
    // add classes to a tag
    buttonEl.addClass('btn btn-outline-dark btn-sm mb-3');
    // set a tag text 
    buttonEl.text('Continue');
    // set href attr of a tag to link property in looping newsElement
    buttonEl.attr('href', newsEl.link);
    // set role attr of a tag to 'button' in looping newsElement
    buttonEl.attr('role', 'button');
    // insert a tag after storyEl
    buttonEl.insertAfter(storyEl);
  }); // end getNews handler

  const teamDetailsDataArr = await getTeamDetails();
  teamDetailsDataArr.forEach(teamDetailEl => {
    const teamID = teamDetailEl.TeamID;
    inProgressGamesArr.forEach((gameEl) => {
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
    completedGamesArr.forEach((gameEl) => {
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
    scheduledGamesArr.forEach((gameEl) => {
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

// ===========================================================================
const sbOddsTemplate = $('#odds-template').html();
const compilesbOdds = Handlebars.compile(sbOddsTemplate);
$('#SuperBowlWinnerOdds').html(compilesbOdds(sbOddsArr));

const afcOddsTemplate = $('#odds-template').html();
const compileafcOdds = Handlebars.compile(afcOddsTemplate);
$('#AFCWinnerOdds').html(compileafcOdds(afcOddsArr));

const nfcOddsTemplate = $('#odds-template').html();
const compilenfcOdds = Handlebars.compile(nfcOddsTemplate);
$('#NFCWinnerOdds').html(compilenfcOdds(nfcOddsArr));

const preGameTemplate = $('#preGame-template').html();
const compilePreGame = Handlebars.compile(preGameTemplate);
$('#preGameDiv').html(compilePreGame(scheduledGamesArr));

$('.preGameModalBtn').on('click', function() {
  const scoreID = $(this).attr('id');
  scheduledGamesArr.forEach((gameEl) => {
    if (parseInt(scoreID) === gameEl.scoreID) {
      $('#homeTeamLogoPreModal').attr('src', gameEl.homeTeamLogo);
      $('#homeTeamSpreadPre').text(gameEl.homePointSpread);
      $('#homeTeamSpreadOddsPre').text(gameEl.homePointSpreadPayout);

      $('#homeTeamMLPre').text(gameEl.homeTeamML);
      $('#overTotalPre').text('O' + gameEl.overUnderTotal);
      $('#overMLPre').text(gameEl.overPayout);

      $('#awayTeamLogoPreModal').attr('src', gameEl.awayTeamLogo);
      $('#awayTeamSpreadPre').text(gameEl.awayPointSpread);
      $('#awayTeamSpreadOddsPre').text(gameEl.awayPointSpreadPayout);

      $('#awayTeamMLPre').text(gameEl.awayTeamML);
      $('#underTotalPre').text('U' + gameEl.overUnderTotal);
      $('#underMLPre').text(gameEl.underPayout);
    } else return;
  });
});

const liveGameTemplate = $('#liveGame-template').html();
const comppileLiveGame = Handlebars.compile(liveGameTemplate);
$('#liveGameDiv').html(comppileLiveGame(inProgressGamesArr));


$('.liveGameModalBtn').on('click', function() {
  const scoreID = $(this).attr('id');
  inProgressGamesArr.forEach((gameEl) => {
    if (parseInt(scoreID) === gameEl.scoreID) {
      console.log('match');
      $('#homeTeamLogoLiveModal').attr('src', gameEl.homeTeamLogo);
      $('#homeTeamSpreadLive').text(gameEl.homePointSpread);
      $('#homeTeamSpreadOddsLive').text(gameEl.homePointSpreadPayout);
      $('#homeTeamMLLive').text(gameEl.homeTeamML);
      $('#awayTeamLogoLiveModal').attr('src', gameEl.awayTeamLogo);
      $('#awayTeamSpreadLive').text(gameEl.awayPointSpread);
      $('#awayTeamSpreadOddsLive').text(gameEl.awayPointSpreadPayout);
      $('#awayTeamMLLive').text(gameEl.awayTeamML);
        
    } else return;
  });
});

const completeGameTemplate = $('#completedGame-template').html();
const compileCompleteGame = Handlebars.compile(completeGameTemplate);
$('#completedGameDiv').html(compileCompleteGame(completedGamesArr));




// ===========================================================================

}); // end document.ready() function

