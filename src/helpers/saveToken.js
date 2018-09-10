export default function saveToken(player) {
  const fcd = player.firstConnectionDone && player.firstConnectionDone === true ? 'main' : 'intro'
  const router = player.program && player.program.finished && player.program.finished === true ? 'matchOff' : 'matchOn'
  // if there is a token (login and rnwpsw cases) save the token in the local storage
  if (player.token) {localStorage.setItem('TrickyAppToken', player.token)}
  if (player.userId) {localStorage.setItem('TrickyAppId', player.userId)}
  if (player.role) {localStorage.setItem('TrickyAppRole', player.role)}
  if (player.idProgram) {localStorage.setItem('TrickyAppIdProgram', player.idProgram)}
  localStorage.setItem('TrickyAppfirstConnection', fcd)
  localStorage.setItem('TrickyAppRouter', router)
}
