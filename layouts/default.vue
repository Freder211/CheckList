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
    import apiUtils from '~/utils/api.js'
    import notify from '~/utils/notifications.js'

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
            apiUtils.getDeadlines(this.$axios).then(
                deadlines => {
                    console.log(deadlines)
                    notify.updateDeadlines(deadlines)
                }
            )
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