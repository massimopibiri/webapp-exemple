export default function logout() {
  localStorage.removeItem('TrickyAppToken')
  localStorage.removeItem('TrickyAppId')
  localStorage.removeItem('TrickyAppRole')
  localStorage.removeItem('TrickyAppIdProgram')
  localStorage.removeItem('TrickyAppfirstConnection')
  localStorage.removeItem('TrickyAppRouter')
}
