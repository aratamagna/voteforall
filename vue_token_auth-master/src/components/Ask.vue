<template>
  <div>
    <Header />
    <!--h2>Question</h2-->
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <!--form @submit.prevent="ask">
      <label><input v-model="question" placeholder="Cual es la pregunta?"></label>
      <label><input v-model="description" placeholder="Haz una breve descripción de tu pregunta si ayuda a tus "></label> <br>
      <button type="submit">Publicar Pregunta.</button>
      <p v-if="error" class="error">hay algo en tu pregunta que lanza error.</p>
    </form>

    <router-link to="dashboard">Volver al Dash</router-link-->

    <b-form @submit.prevent="ask" @submit="onSubmit" @reset="onReset">
      <b-form-group
        label="Haz la pregunta:"
        label-for=""
        description="Haz una pregunta, debe ser contestada solo con Si o No"
      >
        <b-form-input
          type="text"
          v-model="question"
          required
          placeholder="Cual es la pregunta?" />
      </b-form-group>

      <b-form-group
        label="Haz una descripción de la pregunta:"
        label-for=""
        description="Haz una breve descripción de tu pregunta si ayuda a tus "
      >
        <b-form-input
          type="text"
          v-model="description"
          required
          placeholder="Cual es la descripción?" />
      </b-form-group>


      <p v-if="error" class="error">hay algo en tu pregunta que lanza error.</p>

      <b-button type="submit" variant="primary">Publicar Pregunta.</b-button>
      <b-button type="reset" variant="danger">Limpiar</b-button>
    </b-form>

  </div>
</template>

<script>
import auth from '../router/auth'
import Header from './Header.vue'
const axios = require('axios');
let config = {
    headers: {
      'Authorization': 'Bearer ' + auth.getToken()
    }
  }

export default {
  data () {
    return {
      question: '¿Hola Mundo?',
      description: 'Hallo!',
      error: false
    }
  },components:{
    Header
  },
  methods: {
    ask () {
      console.log("pregunta:"+this.question+ ", description:"+this.description);
      axios.post('http://localhost:3000/question', {question: this.question, description: this.description}, config).then(function (r){
      if (r.status==200){
        console.log(r)
      } else {}
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
