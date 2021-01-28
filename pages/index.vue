<template>
        <v-container>
            <v-row>
                <v-col class="pl-15">

                    <v-text-field 
                        type="text" 
                        v-model="name"
                        label="Name"
                        class="ml-15"
                    >
                    </v-text-field>
                </v-col>

                <v-col class="ml-2">

                    <v-btn @click.native="addNew">
                        Add
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
            
        }
    }
</script>
