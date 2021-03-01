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
                        :rules="[value => (value || '').length <= 20 || 'Max 20 characters']"
                        order="text" 
                        v-model="task.name"
                        label="Name*"
                    >
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="7">
                    <v-text-field 
                        order="text" 
                        v-model="task.text"
                        label="Description"
                    >
                    </v-text-field>
                </v-col>

                
            </v-row>

            <v-row>
                <v-col cols="12" sm="6">
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

            <v-row justify="center" align="center" align-content="center">
                <v-col cols="12" sm="6" class="px-0" align-self="center">
                    <v-btn
                        class="addBtn"
                        :disabled="(!task.name || task.name.length>20) || createLoading"
                        :loading="createLoading"
                        block
                        tile
                        @click.native="addNew"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>

                <v-col  cols="8" sm="4" class="pr-0" align-self="right">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">


                            <v-btn
                                class="px-0"
                                block
                                v-bind="attrs"
                                v-on="on"
                                :loading="orderLoading"
                                :disabled="orderLoading"
                            >
                                <v-icon>mdi-order-bool-descending</v-icon>
                                Order by:
                                {{selectedOrder}}
                            </v-btn>

                        </template>

                        <v-list>
                            <v-list-item
                                class="pa-0"
                                v-for="o in orders"
                                :key="o"
                            >
                                <v-btn
                                    block
                                    tile
                                    text
                                    @click.native="order(o, ascOrder)"
                                >{{o}}</v-btn>
                            </v-list-item>
                        </v-list>

                    </v-menu>
                </v-col>

                <v-col>
                    <v-btn
                        block
                        :loading="orderLoading"
                        :disabled="orderLoading"
                        @click.native="order(selectedOrder, !ascOrder)"
                    >
                        <v-icon>
                            {{this.ascOrder ? 'mdi-sort-ascending' : 'mdi-sort-descending'}}
                        </v-icon>
                    </v-btn>
                    
                </v-col>
            </v-row>

            <div v-if="tasksLoading" class="text-center mt-10">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="200"
                    width="10"
                >
                </v-progress-circular>
            </div>

            <transition-group v-else name="list" tag="div">
                <Task v-for="t in tasks"
                    :key="t.id"
                    :task="t"
                    v-on:removed="remove"
                    class="mt-3 task"
                    :ref="t.id"
                />
            </transition-group>
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

    .list-enter,
    .list-leave-to {
      opacity: 0;
    }

    .list-enter {
      transform: translateY(30%);
    }

    .list-leave-to {
      transform: translateX(300%);
    }

    .list-leave-active {
      position: absolute;
    }


    .tasks-transition-enter-active, .tasks-transition-leave-active { transition: opacity .5s; }
    .tasks-transition-enter, .tasks-transition-leave-active { opacity: 0; }
</style>

<script>
    
    import apiUtils from '~/utils/api.js';

    export default {

        transition: 'tasks-transition',

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

                orders: [
                    'Name',
                    'Time'
                ],
                selectedOrder: 'Name',
                ascOrder: true,


                tasksLoading: true,
                createLoading: false,
                orderLoading: true,
            }
        },

        mounted(){
            let token = localStorage.getItem('token');
            if(token){
                this.$axios.setToken(token, 'Bearer');
            }

            this.updateList()
        },

        methods: {

            async updateList(){
                this.list = JSON.parse(localStorage.getItem('selectedList'));
                let res=await apiUtils.getTasks(this.$axios, this.list.id);
                this.tasks = res.tasks; 

                if(res.order.charAt(0)=='-'){
                    this.selectedOrder=res.order.substring(1)
                    this.ascOrder=false
                }
                else{
                    this.selectedOrder=res.order
                    this.ascOrder=true
                }


                this.tasksLoading = false;
                this.orderLoading = false;
            },

            addNew(){
                if (this.task.name != ""){
                    this.createLoading = true;

                    var newTask = {
                        ...this.task,
                        checked: false,
                        notified: false,
                    };

                    apiUtils.createTask(this.$axios, this.list.id, newTask)
                    .then(
                        res => {
                            this.updateList().then(
                                this.createLoading = false
                            )
                        }
                    )


                    this.task.title="";
                    this.task.name="";
                    this.task.text="";
                    this.task.date=null;
                    this.task.time=null
                }
            },


            remove(id){
                apiUtils.deleteTask(this.$axios, this.list.id, id).then(
                    res => {
                        for(var i in this.tasks){
                            if(this.tasks[i].id == id){
                                this.tasks.splice(i, 1);
                            }
                        }
                        Promise.resolve(true); 
                    }
                )
            },

            order(order, asc){
                let sortedOrder = order
                if(!asc){
                    sortedOrder = '-'+order
                }
                this.orderLoading=true;
                apiUtils.patchListOrder(this.$axios, this.list.id, sortedOrder).then(
                    _ => {
                        this.updateList()
                    }
                )
            },


            back(){
                this.$router.push({name: 'index'});
            }
        },
    }

</script>