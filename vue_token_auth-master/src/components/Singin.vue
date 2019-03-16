<template>
  <div>
    <Login />

    <b-container fluid class="mt-4 bv-example-row" >
      <b-row>
        <b-col md="6" offset-md="3">

          <b-card-group deck>
            <b-card border-variant="info" header="Regístrate" align="center">
              <b-card-text>Es una herramienta gratuita en tus manos, úsala!</b-card-text>

              <b-form @submit.prevent = "singin">
                <!-- El input login puede ser telefono igual a futuro -->
                <b-form-input
                  type = "email"
                  v-model = "email"
                  required
                  placeholder = "vote4@all.org" />
                <b-form-input
                  type = "password"
                  v-model = "password"
                  required
                  name = "clave"
                  placeholder = "Ingresa una contraseña"
                  class = "mt-1" />

                <p v-if="error" class="error"> Error en la creación del usuario</p>

                <b-button class = "mt-3" type="submit" variant="success">Registrarme</b-button>
              </b-form>

            </b-card>
          </b-card-group>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import auth from '../router/auth'
import Login from './Login.vue'

var SHA256 = require("crypto-js/sha256");
const axios = require('axios');

export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      error:false
    }
  }, components: {
    Login
  }, methods: {
    singin () {

      console.log("intenta registrarse el email:"+this.email);

      var passInSHA256 = SHA256(this.password).toString();
      console.log("y con el password hasheado:" + passInSHA256);

      var objUser = {
        email: this.email,
        username: this.email,
        password: passInSHA256,
        passwordConf: passInSHA256,
      }
      axios.post(process.env.HOST_URL+'/singin', objUser).then(function (r){
        if (r.status == 200) {
          console.log(r)
        }
      })
    }
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
