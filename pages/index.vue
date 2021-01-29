<template>
        <v-container>
            <v-row>
                <v-col>

                    <v-text-field 
                        type="text" 
                        v-model="name"
                        label="New list"
                        class="ml-0"
                        hide-details="true"
                    >
                    </v-text-field>
                </v-col>

                <v-col md="1" sm="2" cols="3" class="pl-6">
                    <div class="addListBtn">
                        <v-btn class=" mb-2 justify-content-center" @click.native="addNew">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </v-col>

            </v-row>

            <List v-for="list in lists" :key="list" :name="list" v-on:removed="remove"/>
        </v-container>

</template>

<style scoped>
    .addListBtn {
        margin-top: 18px;
        align-content: center;
    }
</style>

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
