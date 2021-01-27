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

        
        <v-btn @click.native="addNew">
            Add
        </v-btn>

        <div class="px-m-10">
            <Task v-for="task in tasks"
                :key="task"
                :name="task.title"
                :description="task.text"
                :checked="task.checked"
                v-on:removed="remove"
            />
        </div>
    </div>

</template>


<script>
    
    import storageUtils from '~/utils/storage.js';

    export default {
        layout: "taskLayout",
        data(){
            return {
                tasks: [],
                title: "",
                text: "",
                checked: false,
            }
        },

        mounted(){
            var list = storageUtils.getSelectedList();
            if(list == -1) //TODO: mostrare errore in caso di -1 
                return;

            var tasks = list.tasks;
            tasks.forEach(task => {
                this.add(task);
            });
        },

        methods: {
            addNew(){
                if (this.title != ""){
                    var newTask = {name: this.title, description: this.text, checked: false};
                    this.add(newTask);
                    storageUtils.addTask(newTask);
                    this.title="";
                    this.text="";
                }
            },

            add(task){
                this.tasks.push({
                    title: task.name,
                    text: task.description,
                    checked: task.checked
                });
            },

            remove(removedTask){
                storageUtils.removeTask(removedTask);
                for (var i=0; i<this.tasks.length; i++){
                    if(this.tasks[i].title==removedTask)
                        this.tasks.splice(i, 1);
                }
            }
        }
    }
</script>