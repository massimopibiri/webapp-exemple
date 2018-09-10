export const establishLimit = (forN, bothN, againtsN) => {
  const tot = forN + bothN + againtsN;
  if (tot <= 3) {
    return 1
  } else if (tot > 3 && tot < 16) {
    return Math.round(tot / 3)
  } else {
    return 5
  }
}
