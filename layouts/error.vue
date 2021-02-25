<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card elevation="8">
          <v-img
            align='center'
            class="mx-0"
            src="https://media2.giphy.com/media/xT5LMCLtKEadFydfRm/giphy.gif"
          >
          </v-img>

          <v-card-title>{{title}}</v-card-title>

          <v-card-text>
            Error details: {{error.message}}
          </v-card-text>

          <v-card-actions>

            <v-row>

              <v-col cols="6" align-self="center">
                <div style="text-align: center">
                  <NuxtLink to="/" text='align-center' style="text-align: center">
                    Home page
                  </NuxtLink>
                </div>
              </v-col>

              <v-col cols="6">
                <div style="text-align: center">
                  <NuxtLink to="/login" text='align-center' style="text-align: center">
                    Login page
                  </NuxtLink>
                </div>
              </v-col>
            </v-row>

          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
    
  </v-app>
</template>


<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      title: String
    }
  },
  head () {
    const code = this.error.statusCode
    return {
      title: code
    }
  },
  mounted(){
    const titles = {
      404: 'Page rot found :(',
      504: 'Looks like the server is down or is not reachable :(',
      otherError: `${this.error.statusCode} Damn, an error occured :(`,
    }
    const code = this.error.statusCode

    this.title = titles[code] ? titles[code] : titles.otherError
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
