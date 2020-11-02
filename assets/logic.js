// sportdata.io key
let sportDataApiKey = "?key=acf8068f55284fd4afd0b96f698b5b32"; 


// array
let sbOddsArr = [];
let afcOddsArr = [];
let nfcOddsArr = [];



// sportsdata.io ajax calls 
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }

};

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
  });

  nfcOdds().then(dataArr => {
    dataArr[0].BettingOutcomes.filter(sportsbook => {
      if (sportsbook.SportsBook.SportsbookID === 7) {
        nfcOddsArr.push({
          teamName: sportsbook.Participant,
          payout: sportsbook.PayoutAmerican
        });
      }
    });
  });

  sbOdds().then(dataArr => {
    dataArr[0].BettingOutcomes.filter(sportsbook => {
      if (sportsbook.SportsBook.SportsbookID === 7) {
        sbOddsArr.push({
          teamName: sportsbook.Participant,
          payout: sportsbook.PayoutAmerican
        });
      }
    });
  });
  console.log(afcOddsArr);
  console.log(nfcOddsArr);
  console.log(sbOddsArr);








});


// if (market.BettingBetType === "AFC Champion") {
//   tempArr.push(market.BettingOutcomes);
//   tempArr.filter(tempEl => {
//     if (tempEl.Sportsbook.SportsbookID === 7) {
//       afcOddsArr.push({
//         teamName: tempEl.Participant,
//         payout: tempEl.PayoutAmerican
//       });
//     }
//   });
// }
// let AFCWinnerOddsArr   = bettingMarkets.filter(market => market.BettingBetType === "AFC Champion");
// // array defined for all active NFL-AFC teams odds to win AFC Championship 
// let AFCWinnerOddsArrDK = AFCWinnerOddsArr[0].BettingOutcomes.filter(sportsbook => sportsbook.SportsBook.SportsbookID === 7);
// return AFCWinnerOddsArrDK;