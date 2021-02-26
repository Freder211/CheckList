<template>
    <v-app>

        <Appbar />

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
                darkMode: false,
            }
        },

        mounted(){
            this.askNotificationsPerms();
        },

        methods: {
            askNotificationsPerms(){

                if('Notification' in window){
                       Notification.requestPermission().then();
                }

            }
        }
    }
</script>