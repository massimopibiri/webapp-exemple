import { setNbNewNotifs } from '../reducer/notifications'

// functions to show the badge number of new notifications in the tabBar notif item
export function handleNewNotifs(dispatch, listNotifs = null, callback) {
  // localStorage.removeItem('receivedNotifs', (err, res) => {});
	// retrieve the list of notifs recorded in the device asyncStorage to check if some of the new notifications has not been received and read already
	const recordedItems = localStorage.getItem('receivedNotifs')
	const existingList = JSON.parse(recordedItems)
	let nbToSet = 0
	if (listNotifs && listNotifs.length > 0) {
		if (existingList && existingList.length > 0) {
			// check if the notifications retrieved from server are new for the device
			for (let i = 0; i < listNotifs.length; i ++) {
				// check if the notif is in the array and if it is newer then the oldest one in the device
				if (existingList.map((single) => {return single._id}).indexOf(listNotifs[i]._id) < 0 && new Date(listNotifs[i].date).getTime() > new Date(existingList[0].date).getTime()) {
					nbToSet ++
				}
			}
			dispatch(setNbNewNotifs(nbToSet))
		} else {
			dispatch(setNbNewNotifs(listNotifs.length))
		}
	} else {
		dispatch(setNbNewNotifs(0))
	}
}
// function to mark notifs as red to avoid the badge number
export function markNotifs(dispatch, listNotifs = null, callback) {
	// retrieve the list of old notifications
	const recordedItems = localStorage.getItem('receivedNotifs')
	const recordedTemp = JSON.parse(recordedItems)
  if (listNotifs && listNotifs.length > 0) {
  	if (recordedTemp && recordedTemp.length > 0) {
  		// get the last 20 items in local memory
  		const existingList = recordedTemp.slice(0, 20);
  		let listToSave = []
      for (let i = 0; i < listNotifs.length; i ++) {
				if (existingList.map((single) => {return single._id}).indexOf(listNotifs[i]._id) < 0 && new Date(listNotifs[i].date).getTime() > new Date(existingList[0].date).getTime()) {
					listToSave.push(listNotifs[i])
				}
      }
      const arrayToSave = listToSave.concat(existingList)
			dispatch(setNbNewNotifs(0))
      localStorage.setItem('receivedNotifs', JSON.stringify(arrayToSave))
      callback()
  	} else {
			dispatch(setNbNewNotifs(0))
			localStorage.setItem('receivedNotifs', JSON.stringify(listNotifs))
			callback()
  	}
  } else {
		dispatch(setNbNewNotifs(0))
    callback()
	}
}

// mark a single notif as red when clicked
export function markSingleNotif(id, date, callback) {
	// retrieve the list of old notifications
	const recordedItems = localStorage.getItem('receivedNotifs')
	let existingList = JSON.parse(recordedItems)
	if (existingList) {
		// get the position of the notif in the array
		const index = existingList.map((single) => {return single._id}).indexOf(id)
		// if the notification is already in the local storage
		if (index >= 0) {
			// mark the notification as read
			existingList[index].clicked = true
			// save the updated list
			localStorage.setItem('receivedNotifs', JSON.stringify(existingList))
		  callback()
		// if the notif does not exist in the local storage
		} else {
			existingList.push({_id: id, date: date, clicked: true})
			// save the updated list
			localStorage.setItem('receivedNotifs', JSON.stringify(existingList))
			callback()
		}
	}
}

export function formatTags(text) {
  if (text) {
    const regexForTags = RegExp('¨', 'g')
    // extract the player name tagged
    return text.replace(regexForTags, '@');
  } else {
    return ''
  }
}

// get the list of tags
export function getTaggedInInput (comment = []) {
  // extract the player name tagged
  let listTaggedInInput = []
  if (comment && comment.length > 0) {
    const splitted = comment.split(/ /)
    const regexForFilter = RegExp('@', 'i')
    for (let aa = 0; aa < splitted.length; aa ++) {
      const nameInt = splitted[aa].split(regexForFilter)
      if (
        splitted[aa].match(regexForFilter) // with '@' character
        && listTaggedInInput.map((player) => {return player}).indexOf(nameInt[1]) < 0 // avoid duplicated items
      ) {
        // remove '@'
        const withoutAt = splitted[aa].split(regexForFilter)
        listTaggedInInput.push(withoutAt[1])
      }
    }
  }
  return listTaggedInInput
}

export function detectNewTag (allPlayers = [], listTaggedInInput = []) {
  // check if one of the users is not one of the players (partial name)
  let authorizeTag = false
  let wordInWriting
  // iterate over players to check if a tag is not part of the list
  for (let bb = 0; bb < listTaggedInInput.length; bb ++) {
    if (allPlayers && allPlayers.map((player) => {return player.firstName.toLowerCase()}).indexOf(listTaggedInInput[bb].toLowerCase()) < 0) {
      authorizeTag = true
      wordInWriting = listTaggedInInput[bb].toLowerCase()
    }
  }
  return {authorizeTag, wordInWriting}
}

export function filterListTag (wordInWriting = '', allPlayers = []) {
  if (wordInWriting) {
    // extract the player name tagged
    const regexForFilter = RegExp(wordInWriting, 'i')

    // filter the list of players by the tagged familyName or firstName
    const namesToDisplay = [];
    for (let ii = 0; ii < allPlayers.length; ii ++) {
      if (
        allPlayers[ii].firstName.match(regexForFilter)
        || allPlayers[ii].familyName.match(regexForFilter)
      ) {
        namesToDisplay.push(allPlayers[ii])
      }
    }
    return namesToDisplay 
  } else {
    return allPlayers
  }
}

export function editComment (comment = '', allPlayers = [], userToTag = '', wordInWriting = '') {
  // get the name of the tagged player
  const index = allPlayers.map((player) => {return player._id}).indexOf(userToTag)
  const replacingName = ' @' + allPlayers[index].firstName + ' ' + allPlayers[index].familyName + ' '
  // extract the pattern to replace
  const wordRef = wordInWriting && wordInWriting.length > 0 ? '@' + wordInWriting : '@'
  const regexForReplace = RegExp('(^|[^a-zA-Z])(' + wordRef + ')(?![a-zA-Z])', 'g')
  // replace the name tagged in the comment
  const newComment = comment.replace(regexForReplace, replacingName)
  return {newComment: newComment.trim(), wordLength: replacingName.length}
}

export function removeHashKey (txt) {
  return txt.replace(/#/g , '')
} 

const calcTime = (date) => {
	const hours = new Date(date).getHours() <= 9 ? '0' + new Date(date).getHours() : new Date(date).getHours()
	const minutes = new Date(date).getMinutes() <= 9 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()
	return hours + 'h' + minutes
}

export function timerNotifs (current, date) {
  const remaining = current - new Date(date).getTime()
  if (remaining < 60000) { return 'Il y a 1 minute' }
  else if (remaining < 120000) { return 'Il y a 2 minute' }
  else if (remaining < 180000) { return 'Il y a 3 minute' }
  else if (remaining < 240000) { return 'Il y a 4 minute' }
  else if (remaining < 300000) { return 'Il y a 5 minutes' }
  else if (remaining < 600000) { return 'Il y a 10 minutes' }
  else if (remaining < 900000) { return 'Il y a 15 minutes' }
  else if (remaining < 1200000) { return 'Il y a 20 minutes' }
  else if (remaining < 1500000) { return 'Il y a 25 minutes' }
  else if (remaining < 1800000) { return 'Il y a 30 minutes' }
  else if (remaining < 2100000) { return 'Il y a 35 minutes' }
  else if (remaining < 2400000) { return 'Il y a 40 minutes' }
  else if (remaining < 2700000) { return 'Il y a 45 minutes' }
  else if (remaining < 3000000) { return 'Il y a 50 minutes' }
  else if (remaining < 3300000) { return 'Il y a 55 minutes' }
  else if (remaining < 3600000) { return 'Il y a 1 heure' }
  else if (remaining < 7200000) { return 'Il y a 2 heures' }
  else if (remaining < 10800000) { return 'Il y a 3 heures' }
  else if (remaining < 14400000) { return 'Il y a 4 heures' }
  else if (remaining < 18000000) { return 'Il y a 5 heures' }
  else if (remaining < 21600000) { return 'Il y a 6 heures' }
  else if (remaining < 25200000) { return 'Il y a 7 heures' }
  else if (remaining < 86400000) { return 'Hier à ' + calcTime(date) }
  else if (remaining < 172800000) { return 'Il y a 2 jours à ' + calcTime(date) }
  else if (remaining < 259200000) { return 'Il y a 3 jours à ' + calcTime(date) }
  else if (remaining < 345600000) { return 'Il y a 4 jours à ' + calcTime(date) }
  else if (remaining < 432000000) { return 'Il y a 5 jours à ' + calcTime(date) }
  else if (remaining > 432000001) { return 'Il y a plus de 6 jours' }
}

