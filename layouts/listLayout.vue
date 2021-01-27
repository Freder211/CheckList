<template>
  <div>
    
    <h1 class="mt-10">Your lists</h1>

    <v-divider></v-divider>

    <Nuxt />

  </div> 
</template>

<script>
  export default{
    layout: 'listLayout',
    layout(context) {
     return 'listLayout';
    }
  }
</script>