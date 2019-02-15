/* globals localStorage */

const axios = require('axios');

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    loginToken(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}

function loginToken (email, pass, cb) {
  axios.post('http://52.15.68.96:3000/login', {username: email, password: pass}).then(function (response) {
    console.log(response);
    if (response.status == 200) {
      cb({
        authenticated: true,
        token: response.data.token
      })
    } else {
      cb({ authenticated: false })
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
