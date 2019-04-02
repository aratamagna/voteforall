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

    <div>
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


        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">Publica</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Privada</label>
        <br>
        <span>Tu pregunta será: {{ picked }}</span>

        <b-form-group label="Button style radios with outline-primary variant and size lg">
          <b-form-radio-group
            id="btn-radios-2"
            v-model="selected"
            :options="options"
            buttons
            button-variant="outline-primary"
            size="lg"
            name="radio-btn-outline"
          ></b-form-radio-group>
        </b-form-group>
        <p v-if="error" class="error">hay algo en tu pregunta que lanza error.</p>

        <b-button type="submit" variant="primary">Publicar Pregunta.</b-button>
        <b-button type="reset" variant="danger">Limpiar</b-button>
      </b-form>
    </div>
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
      question: '',
      description: '',
      error: false,
      selected: '1r',
        options: [
          { text: 'Publica', value: '1r' },
          { text: 'Privada', value: '0r' }
        ]
    }
  },components:{
    Header
  },
  methods: {
    ask () {
      let self = this;
      console.log("pregunta:"+this.question+ ", description:"+this.description);
      var idQuestion = '';

      axios.post(process.env.HOST_URL+'/question', {question: this.question, description: this.description}, config).then(function (r){
      if (r.status==200){
        idQuestion = r.data._id;
        self.toQuestion(r.data._id)
      } else {}
      })
      console.log('datos=' + idQuestion)
      //alert(idQuestion)
      //this.toQuestion (idQuestion)
    },
    toQuestion (id) {
      console.log("funktionid= "+id)
      this.$router.replace(this.$route.query.redirect || '/question/'+id)
      this.$router.go()
    }
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
