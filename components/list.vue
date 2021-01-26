<template>
    <v-card>
        <v-text-field  
            v-model="name"
            v-bind:readonly="this.editing"
            v-bind:filled="!this.editing"
        >
        </v-text-field>

            
        <v-btn
            outlined
            rounded
            text
            @click="edit"
        >
            Edit
        </v-btn>
        
        <v-btn
            outlined
            rounded
            text
            @click="remove"
        >
            Remove
        </v-btn>

        <NuxtLink to="tasks" v-bind:test=1>Show</NuxtLink>
    </v-card>

</template>

<script>
    export default {
        data() {
            return{
                editing: false
            }
        },

        mounted(){
            
        },

        props: {
            name: String
        },    
        methods: {
            remove(){
                this.$emit('removed', this.name);
            },
            edit(){
                this.editing = !this.editing;
            }
        }
    }
</script>