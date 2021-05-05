<template>
  <div id='edit'>
      <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="todo"
        label="Todo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div class="text-center">
        <q-btn label="Update" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'edit',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.init();
      },
    },
  },
  data() {
    return {
      rules: {
        required: (value) => {
          if (value) {
            return true;
          }
          return 'This is a required field';
        },
      },
      todo: null,
    };
  },
  methods: {
    onSubmit() {
      
    },
    init() {
      this.todo = this.value;
    },
  },
  computed: {
  },
  created() {
    this.init();
  },
};
</script>

<style>

</style>
