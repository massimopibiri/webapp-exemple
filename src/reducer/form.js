const WRITE_EMAIL = 'redux/form/WRITE_EMAIL'
const VALID_EMAIL = 'redux/form/VALID_EMAIL'
const WRITE_NEWPSW = 'redux/form/WRITE_NEWPSW'
const WRITE_FIRSTNAME = 'redux/form/WRITE_FIRSTNAME'
const WRITE_FAMILYNAME = 'redux/form/WRITE_FAMILYNAME'
const INPUT_POSITION = 'redux/form/INPUT_POSITION'
const DEFAULT_FIRSTNAME = 'redux/form/DEFAULT_FIRSTNAME'
const DEFAULT_FAMILYNAME = 'redux/form/DEFAULT_FAMILYNAME'

const defaultState = {
  email: '',
  psw: '',
  surname: '',
  name: '',
  sugg: '',
  txt: '',
  valid: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case WRITE_EMAIL:
      return {
        ...state,
        email: action.email,
        // psw: action.data.psw,
        // valid: action.data.valid
      }
    case VALID_EMAIL:
      return {
        ...state,
        valid: action.status
      }
    case WRITE_NEWPSW:
      return {
        ...state,
        newpsw: action.newpsw
      }
    /*
    case WRITE_COMMENT:
      return {
        ...state,
        comment: action.txt
      }
    */
    case WRITE_FIRSTNAME:
      return {
        ...state,
        name: action.name
      }
    case WRITE_FAMILYNAME:
      return {
        ...state,
        surname: action.surname
      }
    case INPUT_POSITION:
      return {
        ...state,
        position: action.position
      }
    case DEFAULT_FIRSTNAME:
      return {
        ...state,
        defaultName: action.name
      }
    case DEFAULT_FAMILYNAME:
      return {
        ...state,
        defaultSurname: action.surname
      }
    default:
      return state
  }
}

export function writeEmail(email) {
  return {
    type: WRITE_EMAIL,
    email
  }
}

export function validEmail(status) {
  return {
    type: VALID_EMAIL,
    status
  }
}

export function writeNewPsw(newpsw) {
  return {
    type: WRITE_NEWPSW,
    newpsw
  }
}

export function writeFirstName(name) {
  return {
    type: WRITE_FIRSTNAME,
    name
  }
}

export function writeFamilyName(surname) {
  return {
    type: WRITE_FAMILYNAME,
    surname
  }
}
/*
export function writeComment(txt) {
  return {
    type: WRITE_COMMENT,
    txt
  }
}
*/

export function inputPosition(position) {
  return {
    type: INPUT_POSITION,
    position
  }
}

export function defaultFirstName(name) {
  return {
    type: DEFAULT_FIRSTNAME,
    name
  }
}

export function defaultFamilyName(surname) {
  return {
    type: DEFAULT_FAMILYNAME,
    surname
  }
}
