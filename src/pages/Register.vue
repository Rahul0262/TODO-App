<template>
<div class="q-pa-md" style="max-width: 400px">
    <span v-if="error">
        Invalid credentials
    </span>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
    <q-input
        filled
        v-model="name"
        label="Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div class="text-center">
        <q-btn label="SignUp" type="submit" color="primary"/>
        <div class="q-pt-sm">Already registered?
        <q-btn label="Login" to="/login" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </div>
    </q-form>

  </div>
</template>

<script>
import axios from 'app/node_modules/axios'
export default {
    name: 'Register',
    data () {
    return {
        name: null,
      email: null,
      password: null,
      error: false,
    }
  },
    methods: {
    onSubmit () {
        this.error = false;
        axios.post(`http://localhost:3000/users`, {
            "name": this.name,
            "email": this.email,
            "password": this.password,
            "isAdmin": false
        }).then(res => {
            this.$router.push({
                path: '/login'
            })
        })
    },

  }, 
  created() {
    
  }
}
</script>

<style>

</style>