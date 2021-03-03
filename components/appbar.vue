<template>
    <v-app-bar app>

        <div
            v-if="showDetails"
            v-for="l in this.links"
            :key="l"
        >
            <v-icon v-if="l!=links[0]">
                mdi-chevron-right
            </v-icon>

            <v-btn
                :color="l == links[selectedLink] ? 'primary' : 'normal'"
                v-on:click="goTo(l)"
                text
            >
                {{l=='index' ? 'lists' : l}}
            </v-btn>

        </div>




        <v-spacer
            v-if="showDetails"
        ></v-spacer>

        <v-btn @click="switchMode"  text class="mr-2" fab>
            <v-icon v-if="!this.darkMode">mdi-brightness-5</v-icon>
            <v-icon v-if="this.darkMode">mdi-brightness-2</v-icon>
        </v-btn>

        <v-spacer
            v-if="!showDetails"
        ></v-spacer>

        <v-btn @click="goGitHub">
            GitHub
            <v-icon>mdi-github</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import storageUtils from '~/utils/storage.js'; 
export default {

    data(){
        return {
            darkMode: false,
            showLinks: true,
            links: [
                'login',
                'index',
                'tasks',
            ],
            selectedLink: Number 
        }
    },

    computed: {
        showDetails(){
            if(this.showLinks && this.$vuetify.breakpoint.smAndUp)
                return true
            
            return false
        }
    },

    mounted(){
        this.checkRoute()

        this.darkMode=storageUtils.isDark();
        this.$vuetify.theme.dark = this.darkMode;
    },

    watch: {
        $route(){
            this.checkRoute()
        }
    },

    methods: {
        checkRoute(){
            let root = $nuxt.$route.name
            this.showLinks = (this.selectedLink = this.links.indexOf(root)) > -1
        },

        switchMode(){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            this.darkMode = this.$vuetify.theme.dark;
            storageUtils.setTheme(this.darkMode);
        },
        goGitHub(){
            window.open("https://github.com/Freder211/CheckList", "_blank");    
        },
        goTo(root){
            this.$router.push({name: root});
        },
    }
}
</script>