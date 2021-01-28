<template>
    <div id="elements">
        <v-container>
            <v-row>
                <v-col>

                    <v-btn-toggle
                    tile
                    color="deep-purple accent-3"
                    group
                    >
                        <v-btn @click.native="back" value="left">
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                    </v-btn-toggle>

                </v-col>

                <v-col>
                    <h1>{{this.list.name}}</h1>
                </v-col>
            </v-row>

        </v-container> 
        <v-divider></v-divider>
        <v-container class="spacing-playground">
            <v-row>
                <v-col>
                    <v-text-field 
                        class="mr-4"
                        type="text" 
                        v-model="title"
                        label="Title"
                    >
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field 
                        type="text" 
                        v-model="text"
                        label="Text"
                    >
                    </v-text-field>
                </v-col>

                
                <v-btn @click.native="addNew">
                    Add
                </v-btn>
            </v-row>

            <Task v-for="task in tasks"
                :key="task"
                :name="task.title"
                :description="task.text"
                :checked="task.checked"
                v-on:removed="remove"
            />
        </v-container>
    </div>

</template>


<script>
    
    import storageUtils from '~/utils/storage.js';

    export default {
        data(){
            return {
                tasks: [],
                title: "",
                text: "",
                checked: false,
                list: "",
            }
        },

        mounted(){
            this.list = storageUtils.getSelectedList();
            if(this.list == -1) //TODO: mostrare errore in caso di -1 
                return;

            var tasks = this.list.tasks;
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
            },


            back(){
                this.$router.push({name: 'index'});
            }
        }
    }
</script>