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


        <Task v-for="task in tasks" :key="task" :name="task.title" :description="task.text" v-on:removed="remove"/>
    </div>

</template>

<script>
    export default {
        layout: "default2",
        data(){
            return {
                tasks: [],
                title: "",
                text: ""
            }
        },

        props: {
            test: int
        },

        methods: {
            add(){
                if (this.title != ""){
                    this.tasks.push({
                        title: this.title,
                        text: this.text
                    })
                    this.title="";
                    this.text="";
                }
            },
            remove(checkedTitle){
                for (var i=0; i<this.tasks.length; i++){
                    if(this.tasks[i].title==checkedTitle)
                        this.tasks.splice(i, 1);
                }
            }
        }
    }
</script>