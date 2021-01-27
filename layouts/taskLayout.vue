<template>
  <div>
    <v-btn-toggle
      tile
      color="deep-purple accent-3"
      group
    >
      <v-btn @click.native="back" value="left">
        Back
      </v-btn>
    
    </v-btn-toggle>

    <v-divider></v-divider>

    <Nuxt />

  </div> 
</template>

<script>
  export default{
    layout: 'taskLayout',

    layout(context) {
     return 'taskLayout';
    },

    methods: {
      back(){
        this.$router.push({name: 'index'});
      }
    }
  }
</script>