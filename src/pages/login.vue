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
        <q-btn label="Submit" type="submit" color="primary"/>
        <div class="q-pt-sm">Not registered?
        <q-btn label="SignUp" to="/register" color="primary" flat class="q-ml-sm" />
        </div>
      </div>
    </q-form>

  </div>
</template>

<script>
import axios from 'app/node_modules/axios'
export default {
    name: 'Login',
    data () {
    return {
      email: null,
      password: null,
      users: null,
      error: false,
    }
  },
    methods: {
    onSubmit () {
        this.error = false;
        axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`).then(res => {
            if(res.data.length == 0) {
                this.error = true;
            } else {
                this.error = false;
                localStorage.setItem('user', JSON.stringify(res.data[0]))
                this.$router.push({
                    path: '/todos'
                })
            }
        })
    },

  }, 
  created() {
    
  }
}
</script>

<style>

</style>