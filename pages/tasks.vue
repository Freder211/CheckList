<template>
    <div>

        <v-container>
            <v-row>
                <v-col cols="3" sm="2" md="1">

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

                <v-col cols="9" sm="10" md="11" align-self="center">
                    <div class="text-h4 text-sm-h3 text-truncate">
                        {{this.list.name ? this.list.name : "Error"}}
                    </div>
                </v-col>
            </v-row>

        </v-container> 
        <v-divider></v-divider>
        

        <v-container class="spacing-playground" v-if="!this.error">
            <v-row align-content="center" justify="center">
                <v-col cols="12" sm="5">
                    <v-text-field 
                        class="mr-4"
                        type="text" 
                        v-model="task.name"
                        label="Name*"
                    >
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="7">
                    <v-text-field 
                        type="text" 
                        v-model="task.text"
                        label="Description"
                    >
                    </v-text-field>
                </v-col>

                
            </v-row>

            <v-row>
                <v-col cols="12" sm="6">
                    <!--Chiedere perché non serve il this, e tutta sta roba del v-slot--> 
                    <v-menu
                        ref="dateMenu"
                        transition="scale-transition"
                        min-width="auto"
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="task.date"
                        offset-y
                    >

                        <template v-slot:activator="{on, attrs}">
                            <v-text-field
                                label="Pick a dead line date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                v-model="task.date"
                            >
                            </v-text-field>
                        </template>

                        <v-date-picker
                            v-model="task.date"
                            no-title
                            scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn text v-on:click="$refs.dateMenu.save(task.date)">
                                Ok
                            </v-btn>

                            <v-btn text v-on:click="task.date = null">
                                Clear
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col>
                    <v-menu
                        ref="timeMenu"
                        v-model="timeMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="task.time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">

                            <v-text-field
                                v-model="task.time"
                                label="Pick a dead link time"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>

                        </template>

                        <v-time-picker
                            v-if="timeMenu"
                            v-model="task.time"
                            full-width
                            format="24hr"
                        >
                            <v-spacer></v-spacer>
                            <v-btn text v-on:click="$refs.timeMenu.save(task.time)">
                                Ok
                            </v-btn>

                            <v-btn text v-on:click="task.time = ''">
                                Clear
                            </v-btn>
                        </v-time-picker>

                    </v-menu>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="px-0" align-self="center">
                    <v-btn class="addBtn" block tile @click.native="addNew">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <Task v-for="t in tasks.slice().reverse()"
                :key="t.id"
                :task="t"
                v-on:removed="remove"
                class="mt-3"
            />
        </v-container>

        <v-container v-if="this.error">
            <v-row class="mt-8">
                <v-col class="pa-0" align-self="center">
                    <div class="text-h1 text-center errorText">Couldn't find the list you were looking for :(</div>
                </v-col>
                
            </v-row>
        </v-container> 

    </div>

</template>

<style scoped>
    .errorText{
        height: 100%;
    }
</style>

<script>
    
    import storageUtils from '~/utils/storage.js';
    import { v4 as uuidv4} from 'uuid';

    export default {
        data(){
            return {
                tasks: [],
                task: {
                    name: "",
                    text: "",
                    checked: false,
                    date: null,
                    time: null,
                },

                dateMenu: false,

                timeMenu: false,

                list: "",
                error: false,
            }
        },

        mounted(){
            this.updateList();
        },

        methods: {

            updateList(){
                this.list = storageUtils.getSelectedList();
                if(this.list == -1){ 
                    this.error=true;
                    return;
                }

                this.tasks  = this.list.tasks;
            },

            addNew(){
                if (this.task.name != ""){
                    var newTask = {
                        id: uuidv4(),
                        name: this.task.name,
                        text: this.task.text,
                        checked: false,
                        date: this.task.date,
                        time: this.task.time
                    };
                    this.tasks.push(newTask);
                    storageUtils.addTask(newTask);

                    this.task.title="";
                    this.task.text="";
                    this.task.name="";
                    this.task.text="";
                    this.task.date=null;
                    this.task.time=null
                }
            },


            remove(id){
                storageUtils.removeTask(id);
                this.updateList();
            },


            back(){
                this.$router.push({name: 'index'});
            }
        }
    }
</script>