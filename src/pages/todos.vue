<template>
  <div class="q-pa-md" style="max-width: 400px">
      <h6>
          Hi, {{userName}}!!
      </h6>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="todo"
        label="Add something todo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn v-if="!updateMode" label="Add" type="submit" color="primary"/>
        <q-btn v-else label="Update" type="submit" color="primary"/>
      </div>
    </q-form>
    <h6> Your Todos</h6>
    <div class="column">
    <span v-for="i in todosList" :key="i.id">
        {{i.val}}
        
        <q-btn size="sm" @click="editTodo(i)" label="Edit" color="primary" flat />
        <q-btn size="sm" @click="deleteTodo(i.id)" label="Delete" color="primary" flat />
    </span> 
    </div>
    <h6 v-if="isAdmin"> Users Todos</h6>
    <div v-if="isAdmin" class="column">
    <span v-for="i in adminList" :key="i.id">
        {{i.val}}
        <q-btn size="sm" @click="editTodo(i)" label="Edit" color="primary" flat />
        <q-btn size="sm" @click="deleteTodo(i.id)" label="Delete" color="primary" flat />
    </span> 
    </div>
  </div>
</template>

<script>
import axios from 'app/node_modules/axios'
// import edit from 'app/src/components/edit'

export default {
    name: 'Todos',
    data () {
    return {
        userid: null,
        userName: null,
      todo: null,
      updateMode: false,
      updateTodoId: null,
      originalUserId: null,
      todosList: [],
      adminList: [],
      updateTodo: null,
    }
  },
  computed: {
      isAdmin() {
          return JSON.parse(localStorage.getItem('user'))['isAdmin'];
      }
  },
  methods: {
    
    onSubmit() {
        if(this.updateMode) {
            axios.put(`http://localhost:3000/todos/${this.updateTodoId}`, {
                val: this.todo,
                userid: this.originalUserId
            }).then(res => {
                console.log(res);
                this.updateMode = false;
                this.update_screen();
                this.todo = '';
            })
        } else {
            axios.post(`http://localhost:3000/todos/`, {
                val: this.todo,
                userid: this.userid
            }).then(res => {
                console.log(res);
                this.todosList.push(res.data);
                this.todo = '';
            })
        }
        
    },
    update_screen() {
        axios.get(`http://localhost:3000/todos?userid_like=${this.userid}`).then(res => {
          this.todosList = res.data;
      })
      if(this.isAdmin) {
        axios.get(`http://localhost:3000/todos?userid_ne=${this.userid}&_sort=userid&_order=asc`).then(res => {
            this.adminList = res.data;
        })  
      }
    },
    editTodo(obj) {
        this.updateMode = true;
        this.todo = obj.val;
        this.updateTodoId = obj.id;
        this.originalUserId = obj.userid;
    },
    deleteTodo(id) {
        axios.delete(`http://localhost:3000/todos/`+id)
        axios.get(`http://localhost:3000/todos?userid_like=${this.userid}`).then(res => {
          this.todosList = res.data;
      })
      if(this.isAdmin) {
        axios.get(`http://localhost:3000/todos?userid_ne=${this.userid}&_sort=userid&_order=asc`).then(res => {
            this.adminList = res.data;
        })  
      }
    }
  },
    mounted() {
    
  },
  
  created() {
      if (JSON.parse(localStorage.getItem('user'))['id']) {
        this.userid = JSON.parse(localStorage.getItem('user'))['id'];
        this.userName = JSON.parse(localStorage.getItem('user'))['name'];
    }
      axios.get(`http://localhost:3000/todos?userid_like=${this.userid}`).then(res => {
          this.todosList = res.data;
        console.log(res.data)
      })

      if(this.isAdmin) {
        axios.get(`http://localhost:3000/todos?userid_ne=${this.userid}&_sort=userid&_order=asc`).then(res => {
        this.adminList = res.data;
        console.log(res.data)
      })  
      }
  }
}
</script>

<style>

</style>