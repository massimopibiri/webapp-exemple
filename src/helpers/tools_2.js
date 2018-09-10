import { challengeEnd } from './tools'

export const winners = (dataChallenge, callback) => {
  challengeEnd(dataChallenge, (challengeFinished) => {
    let challengerWon = false
    let opponentWon = false
    let bettorsToReward = 'none'

    // if challenge is not finished, nobody won
    if (challengeFinished === false) {
      callback(challengeFinished, challengerWon, opponentWon, bettorsToReward)

    // if challenge is finished, establish the winner
    } else {
      // the challenge finished because a freeze
      if (dataChallenge.won === true) {

        // opponent was freezed
        if (dataChallenge.opponent === dataChallenge.freezed) {
          bettorsToReward = 'againts'
          // is match
          if (dataChallenge.match === true) {
            challengerWon = true
            callback(challengeFinished, challengerWon, opponentWon, bettorsToReward)
          // is not a match
          } else {
            // if the challenger is againts the opponent
            if (dataChallenge.fielded !== 'for') {
              challengerWon = true
              callback(challengeFinished, challengerWon, opponentWon, bettorsToReward)
            }
          }

        // challenger was freezed
        } else {
          // is match (the only case possible)
          if (dataChallenge.match === true) {
            bettorsToReward = 'for'
            opponentWon = true
            callback(challengeFinished, challengerWon, opponentWon, bettorsToReward)
          }
        }

      // the challenge finished because the time expired
      } else {

        // is match (both win)
        if (dataChallenge.match === true) {
          bettorsToReward = 'both'
          challengerWon = true
          opponentWon = true
          callback(challengeFinished, challengerWon, opponentWon, bettorsToReward)
        // is not a match
        } else {
          bettorsToReward = 'for'
          opponentWon = true
          callback(challengeFinished, challengerWon, opponentWon, bettorsToReward)
        }
      }
      callback(challengeFinished, challengerWon, opponentWon, bettorsToReward)
    }
  })
}
