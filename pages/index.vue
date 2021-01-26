<template>
    <div id="elements">
        <v-text-field 
            type="text" 
            v-model="name"
            label="Name"
        >
        </v-text-field>



        
        <v-btn @click.native="add">
            Add
        </v-btn>


        <List v-for="list in lists" :key="list" :name="list" v-on:removed="remove"/>
    </div>

</template>

<script>
    export default {
        layout: "default2",
        data(){
            return {
                lists: [],
                name: "",
            }
        },
        methods: {
            add(){
                if (this.name != ""){
                    this.lists.push(this.name);
                    this.name="";
                }
            },
            remove(removedList){
              var index = this.lists.indexOf(removedList);
              this.lists.splice(index, 1);
            }
        }
    }
</script>
