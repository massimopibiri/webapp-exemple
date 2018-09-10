export const timeTranslator = (time) => {
  let value = 0
  let mesure
  if (time > 86399000) {
    value = Math.floor(time / 86400000);
    mesure = 'jours'
  } else if (time > 3599000) {
    value = Math.floor(time / 3600000);
    mesure = 'heures'
  } else if (time > 59000) {
    value = Math.floor(time / 60000);
    mesure = 'minutes'
  }
  return {value, mesure}
}

export const formatDate = (date) => {
  const dd = new Date(date).getDate()
  const mm = new Date(date).getMonth() + 1
  const yy = new Date(date).getYear() + 1900
  const day = dd && dd > 9 ? dd : '0' + dd
  const month = mm && mm > 9 ? mm : '0' + mm
  return day + '.' + month + '.' + yy
}

export const percentage = (value1, value2) => {
  const fraction = Math.round(value1 / value2 * 100)
  return fraction + '%'
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
