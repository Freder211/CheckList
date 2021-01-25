<template>
    <div id="elements">
        <v-text-field 
            type="text" 
            v-model="title"
            label="Title"
        >
        </v-text-field>


        <v-text-field 
            type="text" 
            v-model="text"
            label="Text"
        >
        </v-text-field>

        
        <v-btn @click.native="add">
            Add
        </v-btn>


        <Element v-for="element in lists" :key="element" :title="element.title" :text="element.text"/>
    </div>

</template>

<script>
    export default {
        layout: "default2",
        data(){
            return {
                lists: [],
                title: "",
                text: ""
            }
        },
        methods: {
            add(){
                if (this.title != ""){
                    this.lists.push({
                        title: this.title,
                        text: this.text
                    })
                    this.title="";
                    this.text="";
                }
            },
            remove(){

            }
        }
    }

    

</script>