<template>
        <v-container>
            <v-row>
                <v-col col="11">

                    <v-text-field 
                        type="text" 
                        v-model="name"
                        label="New list"
                        class="ml-15"
                        hide-details="true"
                    >
                    </v-text-field>
                </v-col>

                <v-col cols="1">
                    <v-btn class="addListBtn mb-2 justify-content-center" @click.native="addNew">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>

            </v-row>

            <List v-for="list in lists" :key="list" :name="list" v-on:removed="remove"/>
        </v-container>

</template>

<script>
    import storageUtils from '~/utils/storage.js';
    export default {
        //layout: "listLayout",
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
                    var list = {name: this.name, tasks: []}
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
