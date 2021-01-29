<template>
    <v-app>


        <v-app-bar app>
            <v-btn @click="switchMode" tile text>
                <v-icon v-if="!this.darkMode">mdi-brightness-5</v-icon>
                <v-icon v-if="this.darkMode">mdi-brightness-2</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="goGitHub">
                GitHub
                <v-icon>mdi-github</v-icon>
            </v-btn>
        </v-app-bar>


        <v-main>
            <v-container fluid>
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
  export default{
    layout: 'listLayout',
    layout(context) {
     return 'listLayout';
    },

    data() {
        return {
            darkMode: false
        }
    },

    methods: {
        switchMode(){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            this.darkMode = this.$vuetify.theme.dark;
        },
        goGitHub(){
            window.open("https://github.com/Freder211/CheckList", "_blank");    
        }
    }
  }
</script>