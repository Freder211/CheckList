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
            <v-container style="max-width: 1000px">
                    <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import storageUtils from '~/utils/storage.js'; 

    export default{
        layout: 'listLayout',
        layout(context) {
            return 'listLayout';
        },

        data() {
            return {
                darkMode: false,
            }
        },

        mounted(){
            this.darkMode=storageUtils.isDark();
            this.$vuetify.theme.dark = this.darkMode;
            this.askNotificationsPerms();
        },

        methods: {
            switchMode(){
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                this.darkMode = this.$vuetify.theme.dark;
                storageUtils.setTheme(this.darkMode);
            },
            goGitHub(){
                window.open("https://github.com/Freder211/CheckList", "_blank");    
            },
            askNotificationsPerms(){

                if('Notification' in window){
                       Notification.requestPermission().then();
                }

            }
        }
    }
</script>