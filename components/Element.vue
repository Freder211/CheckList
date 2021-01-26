<template>
    <v-card>
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>{{text}}</v-card-text>
        <v-card-actions>
            <v-btn
                outlined
                rounded
                text
                @click="remove"
            >
               Remove
               <v-icon>mdi-checkbox-marked-circle</v-icon> 
            </v-btn>

            <v-btn
                outlined
                rounded
                text

            >
                Edit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {

    data(){
        return {

        }
    },

    //eseguito al momento della creazione del componente
    mounted(){ 
        
    },

    props: {
        title: String,
        text: String,
    },

    //metodi con cache migliorata
    computed: {
    },
    
    methods: {
        remove(){
            this.$emit('removed', this.title);
        }

    }
}
</script>