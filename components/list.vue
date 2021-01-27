<template>
    <v-card>
        <v-text-field  
            v-model="name"
            v-bind:readonly="!this.editing"
            v-bind:filled="this.editing"
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

        <v-btn
            outlined
            rounded
            text
            @click="show"
        >
            Show
        </v-btn>
    </v-card>

</template>

<script>
    import storageUtils from '~/utils/storage.js';
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
                if(!this.editing){ //inizio editing
                    this.edit.oldName = this.name; // memorizzo il nome della lista in una variabile statica prima che venga modificato
                }
                else if(this.edit.oldName!=this.name){ //editing terminato
                    storageUtils.renameList(this.edit.oldName, this.name);
                }
                this.editing = !this.editing;
            },
            show(){
                storageUtils.setList(this.name); 
                this.$router.push({name: 'tasks'});
            }
        }
    }
</script>