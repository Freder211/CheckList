<template>
    <v-row>
        <v-col>
            <v-card>
                <v-container class="fluid">
                    <v-row>
                        <v-col class="listTextFieldCol">
                            <v-text-field  
                                class="listTextField"
                                v-model="name"
                                v-bind:readonly="!this.editing"
                                v-bind:filled="this.editing"
                                hide-details="true"
                                solo
                                flat
                            >
                            </v-text-field>
                        </v-col>

                        <v-col class="listAction" cols="1">
                            <div class="counter">
                                <span>{{this.completedTasks}} / {{this.totalTasks}}</span>
                            </div>
                        </v-col>

                        <v-col cols="1" class="listAction" xs="4" sm="1">
                            <v-btn
                                tile
                                class="cardElement"
                                rounded
                                text
                                @click="edit"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col cols="1" class="listAction" xs="4" sm="1">
                            <v-btn
                                tile
                                class="cardElement"
                                rounded
                                text
                                @click="remove"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col cols="1" class="listAction" xs="4" md="2" lg="1">
                            <v-btn
                                tile
                                class="cardElement"
                                rounded
                                text
                                @click="show"
                            >
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card>
        </v-col>
    </v-row>

</template>

<style scoped>
    .listTextField{
        margin-top: 5px;
    }
    .cardElement{
        margin-top: 8px;
    }
    .counter{
        vertical-align: middle;
        margin-top: 8px;
        padding-top: 6px;
    }
</style>

<script>
    import storageUtils from '~/utils/storage.js';
    export default {
        data() {
            return{
                editing: false,
                totalTasks: 0,
                completedTasks: 0,
            }
        },

        mounted(){
            this.totalTasks = storageUtils.getList(this.name).tasks.length;
            this.completedTasks = storageUtils.getComplitedTasks(this.name);
        },

        props: {
            name: String
        },    
        methods: {
            remove(){
                this.$emit('removed', this.name);
            },
            edit(){
                if(!this.editing){ //inizio editing
                    this.edit.oldName = this.name; // memorizzo il nome della lista in una variabile statica prima che venga modificato
                }
                else if(this.edit.oldName!=this.name){ //editing terminato
                    storageUtils.renameList(this.edit.oldName, this.name);
                }
                this.editing = !this.editing;
            },
            show(){
                storageUtils.setList(this.name); 
                this.$router.push({name: 'tasks'});
            }

        }
    }
</script>