<template>
    <div id="elements">
        <v-text-field 
            type="text" 
            v-model="name"
            label="Name"
        >
        </v-text-field>



        
        <v-btn @click.native="addNew">
            Add
        </v-btn>


        <List v-for="list in lists" :key="list" :name="list" v-on:removed="remove"/>
    </div>

</template>

<script>
    import storageUtils from '~/utils/storage.js';
    export default {
        layout: "listLayout",
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
