<template>
    <v-card>
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>{{text}}</v-card-text>
        <v-card-text>counter:{{counter}}</v-card-text>
        <v-card-actions>
            <v-btn
                outlined
                rounded
                text
                @click.native="increment"
            >
                Completato
               <v-icon>mdi-checkbox-marked-circle</v-icon> 
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
        checked: Boolean,

    },

    computed: {
        isChecked(){
            return this.checked || false;
        },
    },
    
    methods: {
        increment(){
            this.counter++;
        }

    }
}
</script>