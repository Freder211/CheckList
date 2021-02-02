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

            <List v-for="list in lists" :key="list" :name="list" v-on:removed="remove"/>
        </v-container>

</template>

<style scoped>
</style>

<script>
    import storageUtils from '~/utils/storage.js';
    export default {
        data(){
            return {
                lists: [],
                name: "",
            }
        },

        mounted(){
            var lists = storageUtils.getAllLists();
            for(var i in lists){
                this.add(lists[i].name);
            }
        },
        
        methods: {
            addNew(){
                if (this.name != ""){
                    var list = {name: this.name, tasks: []};
                    storageUtils.newList(list);
                    this.add(list.name);
                    this.name="";
                }
            },
            add(listName){
                this.lists.push(listName);
            },
            remove(removedList){
                storageUtils.removeList(removedList);
                var index = this.lists.indexOf(removedList);
                this.lists.splice(index, 1);
            },
            
        },
    }
</script>
