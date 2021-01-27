<template>
    <v-card>
        <v-card-title>{{name}}</v-card-title>
        <v-card-text v-show="descriptionEmpty">{{description}}</v-card-text>
        <v-card-actions>
            <v-checkbox v-model="checkedReactive"></v-checkbox>

            <v-btn
                outlined
                rounded
                text
                @click="remove"
            >
               Remove
               <v-icon>mdi-checkbox-marked-circle</v-icon> 
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import storageUtils from '~/utils/storage.js';
export default {

    data(){
        return {
            descriptionEmpty: true
        }
    },

    //eseguito al momento della creazione del componente
    mounted(){ 
        if(this.description == "" || this.description == null)
            this.descriptionEmpty=false;
    },

    props: {
        name: String,
        description: String,
        checked: Boolean,
    },

    computed: {
        checkedReactive: {
            get(){
                return this.checked;
            },
            set(val){
                storageUtils.checkTask(this.name, val);
            }
        }
    },
    
    methods: {
        remove(){
            this.$emit('removed', this.name);
        },
    }
}
</script>