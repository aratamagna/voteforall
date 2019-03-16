/* globals localStorage */
//01 - TODO Revisar por que no se actualiza el token si en localstorage esta undefined

const axios = require('axios');

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    //01
    if (localStorage.token && localStorage.token != undefined) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    loginToken(email, pass, (r) => {
      console.log(r);
      if (r.response.status==200) {
        localStorage.token = r.response.data.token
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
  axios.post(process.env.HOST_URL+'/login', {username: email, password: pass}).then(function (response) {
    if (response.status == 200) {
      cb({response})
    } else {
      cb({ authenticated: false})
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
