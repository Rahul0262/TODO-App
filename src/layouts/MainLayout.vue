<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Todo App
        </q-toolbar-title>
        
        <div>
          <q-btn @click="logout()" color="white" text-color="primary" size="sm" round push icon="logout" class="q-mr-sm" />
          </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push({
        path: '/login'
      })
    }
  },
  computed: {
    username() {
      if(localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))['name'];
      } return ''
    }
  }
}
</script>
