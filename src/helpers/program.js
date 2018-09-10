// limit the time range of the picker to avoid challenges lasting more then the end of the program
export const limitTimeRange = (array, limit) => {
  // format data to be readeable from picker
  const result = []
  for (let i = 0; i < array.length; i ++ ) {
    // authorize just the items with value lower then 'limit'
    if (array[i].val < Math.round(limit) && array[i].name) {
      result.push(array[i].name)
    }
  }
  return {last: result}
}

// limit the point range of the picker to avoid challenges costing more then the score of the user
export const limitPointRange = (array, limit) => {
  // format data to be readeable from picker
  let result = []
  for (let i = 0; i < array.length; i ++ ) {
    // authorize just the items with value lower then 'limit'
    if (array[i].val <= limit) {
      result.push(array[i].name)
    }
  }
  return {limit: result}
}

// limit the time range of the picker to avoid challenges lasting more then the end of the program
export const formatPosition = (nb) => {
  let card;
   if (nb === 1) {
    card = 'er'
  } else if (nb !== 0) {
    card = 'ème'
  }
  return {nb, card}
}

export const calcTime = (time) => {
  let minutes = 0
  let hours = 0
  let days = 0
  let seconds = 0
  if (time > 86399) {
    days = Math.floor(time / 86400)
  }
  if (time > 3599) {
    hours = Math.floor((time - (days * 86400)) / 3600)
  }
  if (time > 59) {
    minutes = Math.floor((time - (days * 86400) - (hours * 3600)) / 60)
  }
  seconds = Math.floor(time - (days * 86400) - (hours * 3600) - (minutes * 60))
  const result = {days, hours, minutes, seconds}
  return result
}

export const formatDate = (time) => {
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() <= 9 ? '0' + (new Date(time).getMonth() + 1) : (new Date(time).getMonth() + 1)
  const day = new Date(time).getDate() <= 9 ? '0' + new Date(time).getDate() : new Date(time).getDate()
  return day + '/' + month + '/' + year
}

export const filterUsers = (data) => {
  let result = [];
  for (let i = 0; i < data.length; i ++ ) {
    if (
      (data[i].firstActions && data[i].firstActions.map((item) => {return item;}).indexOf('challenge') >= 0)
      || (data[i].firstActions && data[i].firstActions.map((item) => {return item;}).indexOf('match') >= 0)
      || (data[i].firstActions && data[i].firstActions.map((item) => {return item;}).indexOf('bet') >= 0)
    ) {
      result.push(data[i])
    }
  }
  return result
}
