var c = require('./../constants.js')

let modalReducer = (modal = false, action) => {
  switch (action.type) {
    case c.OPEN_MODAL:
      return { modal: true };
    case c.CLOSE_MODAL:
      return { modal: false };
    default:
      return false;
  }
}

export default modalReducer
