import { winners } from './tools_2'

export const challengeEnd = (dataChallenge, callback) => {
  let challengeFinished = false;
  if (
    (dataChallenge && dataChallenge.won && dataChallenge.won === true)
    || (dataChallenge.currentTime && dataChallenge.finishing && new Date(dataChallenge.currentTime).getTime() > new Date(dataChallenge.finishing).getTime())
  ) {
    challengeFinished = true;
    callback(challengeFinished)
  } else {
    callback(challengeFinished)
  }
}

export const totalGain = (dataChallenge, callback) => {
  // calculate the total bet of the challenge
  let totalGain = 0
  if (dataChallenge && dataChallenge.for && dataChallenge.for.length > 0) {
    for (let i = 0; i < dataChallenge.for.length; i++) {
      totalGain += dataChallenge.for[i].amount
    }
  }
  if (dataChallenge && dataChallenge.both && dataChallenge.both.length > 0) {
    for (let j = 0; j < dataChallenge.both.length; j++) {
      totalGain += dataChallenge.both[j].amount
    }
  }
  if (dataChallenge && dataChallenge.againts && dataChallenge.againts.length > 0) {
    for (let k = 0; k < dataChallenge.againts.length; k++) {
      totalGain += dataChallenge.againts[k].amount
    }
  }
  // add the value betted by the challenger and the opponent
  if (dataChallenge.match === true && dataChallenge.amount) {
    totalGain += dataChallenge.amount * 2
  } else if (dataChallenge.match !== true && dataChallenge.amount) {
    totalGain += dataChallenge.amount
  }
  callback(totalGain)
}

export const challengeCondition = (totalGain, dataChallenge, callback) => {
  winners(dataChallenge, (challengeFinished, challengerWon, opponentWon, bettorsToReward) => {
    const allPlayersCondition = [];

    // ----------------------------------------> BETTORS AGAINTS

    if (dataChallenge && dataChallenge.againts && dataChallenge.againts.length > 0) {
      for (let i = 0; i < dataChallenge.againts.length; i++) {
        let temp;
        if (
          challengeFinished === false // in case the challenge is still opened
          || bettorsToReward === 'againts'
        ) {
          temp = {
            _id: dataChallenge.againts[i].id,
            firstName: dataChallenge.againts[i].firstName,
            familyName: dataChallenge.againts[i].familyName,
            image: dataChallenge.againts[i].image,
            amount: dataChallenge.againts[i].amount,
            score: dataChallenge.againts[i].amount * 2,
            fielded: 'againts'
          }
        } else {
          temp = {
            _id: dataChallenge.againts[i].id,
            firstName: dataChallenge.againts[i].firstName,
            familyName: dataChallenge.againts[i].familyName,
            image: dataChallenge.againts[i].image,
            amount: dataChallenge.againts[i].amount,
            score: - dataChallenge.againts[i].amount,
            fielded: 'againts'
          }
        }
        if (temp) {
          allPlayersCondition.push(temp);
        }
      }
    }

    // ----------------------------------------> BETTORS BOTH

    if (dataChallenge && dataChallenge.both && dataChallenge.both.length > 0) {
      for (let i = 0; i < dataChallenge.both.length; i++) {
        let temp2
        if (
          challengeFinished === false // in case the challenge is still opened
          || bettorsToReward === 'both'
        ) {
          temp2 = {
            _id: dataChallenge.both[i].id,
            firstName: dataChallenge.both[i].firstName,
            familyName: dataChallenge.both[i].familyName,
            image: dataChallenge.both[i].image,
            amount: dataChallenge.both[i].amount,
            score: dataChallenge.both[i].amount * 2,
            fielded: 'both'
          }
        } else {
          temp2 = {
            _id: dataChallenge.both[i].id,
            firstName: dataChallenge.both[i].firstName,
            familyName: dataChallenge.both[i].familyName,
            image: dataChallenge.both[i].image,
            amount: dataChallenge.both[i].amount,
            score: - dataChallenge.both[i].amount,
            fielded: 'both'

          }
        }
        if (temp2) {
          allPlayersCondition.push(temp2);
        }
      }
    }

    // ----------------------------------------> BETTORS FOR

    if (dataChallenge && dataChallenge.for && dataChallenge.for.length > 0) {
      for (let i = 0; i < dataChallenge.for.length; i++) {
        let temp3
        if (
          challengeFinished === false // in case the challenge is still opened
          || bettorsToReward === 'for'
        ) {
          temp3 = {
            _id: dataChallenge.for[i].id,
            firstName: dataChallenge.for[i].firstName,
            familyName: dataChallenge.for[i].familyName,
            image: dataChallenge.for[i].image,
            amount: dataChallenge.for[i].amount,
            score: dataChallenge.for[i].amount * 2,
            fielded: 'for'
          }
        } else {
          temp3 = {
            _id: dataChallenge.for[i].id,
            firstName: dataChallenge.for[i].firstName,
            familyName: dataChallenge.for[i].familyName,
            image: dataChallenge.for[i].image,
            amount: dataChallenge.for[i].amount,
            score: - dataChallenge.for[i].amount,
            fielded: 'for'
          }
        }
        if (temp3) {
          allPlayersCondition.push(temp3)
        }
      }
    }

    // ----------------------------> CHALLENGER

    let tempChallenger
    if (
      (challengeFinished === false && dataChallenge.match === true)
      || (challengeFinished === true && dataChallenge.match === true && challengerWon === true)
    ) {
      tempChallenger = {
        _id: dataChallenge.challenger,
        firstName: dataChallenge.challengerDett && dataChallenge.challengerDett.firstName ? dataChallenge.challengerDett.firstName : null,
        familyName: dataChallenge.challengerDett && dataChallenge.challengerDett.familyName ? dataChallenge.challengerDett.familyName : null,
        image: dataChallenge.challengerDett && dataChallenge.challengerDett.image ? dataChallenge.challengerDett.image : null,
        amount: dataChallenge.amount,
        score: totalGain,
        fielded: 'challenger'
      };
    } else if (
      (challengeFinished === false && dataChallenge.match === false)
      || (challengeFinished === true && dataChallenge.match === false && challengerWon === true)
    ) {
      tempChallenger = {
        _id: dataChallenge.challenger,
        firstName: dataChallenge.challengerDett && dataChallenge.challengerDett.firstName ? dataChallenge.challengerDett.firstName : null,
        familyName: dataChallenge.challengerDett && dataChallenge.challengerDett.familyName ? dataChallenge.challengerDett.familyName : null,
        image: dataChallenge.challengerDett && dataChallenge.challengerDett.image ? dataChallenge.challengerDett.image : null,
        amount: dataChallenge.amount,
        score: dataChallenge.amount * 2,
        fielded: dataChallenge.fielded
      }
    } else {
      tempChallenger = {
        _id: dataChallenge.challenger,
        firstName: dataChallenge.challengerDett && dataChallenge.challengerDett.firstName ? dataChallenge.challengerDett.firstName : null,
        familyName: dataChallenge.challengerDett && dataChallenge.challengerDett.familyName ? dataChallenge.challengerDett.familyName : null,
        image: dataChallenge.challengerDett && dataChallenge.challengerDett.image ? dataChallenge.challengerDett.image : null,
        amount: dataChallenge.amount,
        score: - dataChallenge.amount,
        fielded: dataChallenge.match === true ? 'challenger' : dataChallenge.fielded
      }
    }
    if (tempChallenger) {
      allPlayersCondition.push(tempChallenger)
    }

    // ----------------------------> OPPONENT

    let tempOpponent
    if (
      (challengeFinished === false && dataChallenge.match === true)
      || (challengeFinished === true && dataChallenge.match === true && opponentWon === true)
    ) {
      tempOpponent = {
        _id: dataChallenge.opponent,
        firstName: dataChallenge.opponentDett && dataChallenge.opponentDett.firstName ? dataChallenge.opponentDett.firstName : null,
        familyName: dataChallenge.opponentDett && dataChallenge.opponentDett.familyName ? dataChallenge.opponentDett.familyName : null,
        image: dataChallenge.opponentDett && dataChallenge.opponentDett.image ? dataChallenge.opponentDett.image : null,
        amount: dataChallenge.amount,
        score: totalGain * 2,
        fielded: 'opponent'
      }
    } else if (
      (challengeFinished === false && dataChallenge.match === false)
      || (challengeFinished === true && dataChallenge.match === false && opponentWon === true)
    ) {
      tempOpponent = {
        _id: dataChallenge.opponent,
        firstName: dataChallenge.opponentDett && dataChallenge.opponentDett.firstName ? dataChallenge.opponentDett.firstName : null,
        familyName: dataChallenge.opponentDett && dataChallenge.opponentDett.familyName ? dataChallenge.opponentDett.familyName : null,
        image: dataChallenge.opponentDett && dataChallenge.opponentDett.image ? dataChallenge.opponentDett.image : null,
        amount: 0,
        score: totalGain,
        fielded: 'opponent'
      }
    } else {
      tempOpponent = {
        _id: dataChallenge.opponent,
        firstName: dataChallenge.opponentDett && dataChallenge.opponentDett.firstName ? dataChallenge.opponentDett.firstName : null,
        familyName: dataChallenge.opponentDett && dataChallenge.opponentDett.familyName ? dataChallenge.opponentDett.familyName : null,
        image: dataChallenge.opponentDett && dataChallenge.opponentDett.image ? dataChallenge.opponentDett.image : null,
        amount: dataChallenge.match === true ? dataChallenge.amount : 0,
        score: dataChallenge.match === true ? - dataChallenge.amount : 0,
        fielded: 'opponent'
      }
    }
    if (tempOpponent) {
      allPlayersCondition.push(tempOpponent)
    }
    callback(challengeFinished, allPlayersCondition)
  })
}

export const isEmptyObject = (obj) => {
  for(const key in obj) {
    if(obj.hasOwnProperty(key))
      return false
  }
  return true
}
