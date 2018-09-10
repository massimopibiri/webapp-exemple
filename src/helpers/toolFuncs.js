export const reformatGoods = (obj = []) => {
  const final = []
  if (obj && obj.players && obj.players.length > 0) {
    for (let ii = 0; ii < obj.players.length; ii ++) {
      if (obj.players && obj.players[ii] && obj.players[ii].products && obj.players[ii].products.length > 0) {
        for (let jj = 0; jj < obj.players[ii].products.length; jj ++) {
          const temp = {
            _id: obj.players[ii]._id,
            key: ((ii + 1) * 10) + jj,
            firstName: obj.players[ii].firstName,
            familyName: obj.players[ii].familyName,
            email: obj.players[ii].email,
            date: obj.players[ii].products[jj].date,
            price: obj.players[ii].products[jj].price,
            product: obj.players[ii].products[jj].title,
            paid: obj.players[ii].products[jj].paid
          }
          // store the products still not paid
          if (obj.players[ii].products[jj].paid === false) {
            final.unshift(temp) // first to be displayed in the list
          // store the products already paid after checking they are not older then 2 weeks
          } else if (obj.players[ii].products[jj].paid === true && obj.refTime < obj.players[ii].products[jj].date) {
            final.push(temp) // last to be displayed in the list
          }
        }
      }
    }
  }
  return final
}

// limit the time range of the picker to avoid challenges lasting more then the end of the program
export const formatPosition = (nb) => {
  let card
  if (nb === 1) {
    card = 'er'
  } else if (nb !== 0) {
    card = 'ème'
  }
  return {nb, card}
}

export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1])
  let n = bstr.length, u8arr = new Uint8Array(n)
  while(n--){
      u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type:mime})
}
