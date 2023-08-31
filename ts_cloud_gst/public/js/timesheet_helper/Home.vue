<template>
    <v-app class="container1">
      <v-main>
        <Navbar @changePage="setPage($event)"></Navbar>
        <component v-bind:is="page" class="mx-4 md-4"></component>
      </v-main>
    </v-app>
  </template>
  
  <script>
  
  import Navbar from './components/Navbar.vue';
  import Table from './components/main/Table.vue';
  
  export default {
    data: function () {
      return {
        page: 'Table',
      };
    },

    components: {
      Navbar,
      Table
    },

    methods: {
      setPage(page) {
        this.page = page;
      },
    },

  };
  </script>
  
  <style scoped>
  .container1 {
    margin-top: 0vh;
  }
  </style>
  