<template>
        <v-container>
            <v-row align-content="center"  justify="center">
                <v-col>

                    <v-text-field 
                        type="text" 
                        v-model="name"
                        label="New list"
                        hide-details="true"
                    >
                    </v-text-field>
                </v-col>

                <v-col md="1" sm="2" cols="3" align-self="center">
                    <v-btn class="addBtn" block tile @click.native="addNew">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>

            </v-row>

            <transition-group name="lists" tag="div">
                <List v-for="l in lists" :key="l.id" :name="l.name" :id="l.id" v-on:removed="remove"/>
            </transition-group>
        </v-container>

</template>

<style scoped>
    .lists-enter,
    .lists-leave-to {
      opacity: 0;
    }

    .lists-enter {
      transform: translateY(30%);
    }

    .lists-leave-to {
      transform: translateX(300%);
    }

    .lists-leave-active {
      position: absolute;
    }

    .lists-transition-enter-active, .lists-transition-leave-active { transition: opacity .5s; }
    .lists-transition-enter, .lists-transition-leave-active { opacity: 0; }
</style>

<script>
    import storageUtils from '~/utils/storage.js';
    import { v4 as uuidv4} from 'uuid';

    export default {
        transition: 'lists-transition',

        data(){
            return {
                lists: [],
                name: "",
            }
        },

        mounted(){
            var lists = storageUtils.getAllLists();
            for(var i in lists){
                this.lists.push(lists[i]);
            }
        },
        
        methods: {
            addNew(){
                if (this.name != ""){
                    var list = {id: uuidv4(), name: this.name, tasks: []};
                    storageUtils.newList(list);
                    this.lists.push(list);
                    this.name="";
                }
            },
            remove(id){
                storageUtils.removeList(id);
                for(var i in this.lists){
                    if(this.lists[i].id == id){
                        this.lists.splice(i, 1);
                    }
                }
            },
            
        },
    }
</script>
