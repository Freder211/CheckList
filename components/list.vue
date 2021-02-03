<template>

    <div class="mt-4 list">
            <v-card>
                <v-container class="fluid">
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="12" md="8" lg="8">
                            <div>
                                <v-text-field  
                                    v-bind:class="{
                                        listTextField: this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
                                    }"
                                    class="font-weight-bold"
                                    ref="textField"
                                    v-model="name"
                                    v-bind:readonly="!this.editing"
                                    v-bind:outlined="this.editing"
                                    hide-details="true"
                                    solo
                                    flat
                                >
                                </v-text-field>
                            </div>
                        </v-col>

                        <v-col class="listAction" cols="6" sm="3" md="1">
                            <div class="utilityDiv">
                                <v-progress-circular :size="50" v-bind:value="this.percentage">
                                    <span class="counterSpan">{{this.completedTasks}} / {{this.totalTasks}}</span>
                                </v-progress-circular>
                            </div>
                        </v-col>

                        <v-col class="pa-0" cols="6" sm="3" md="1" lg="1" align-self="stretch">
                                <v-btn
                                    v-bind:color="(this.editing) ? 'green' : 'default' "
                                    height="100%"
                                    block
                                    tile
                                    class="cardElement"
                                    rounded
                                    text
                                    @click="edit"
                                >
                                    <v-icon v-if="!this.editing">mdi-pencil</v-icon>
                                    <v-icon v-if="this.editing">mdi-check-bold</v-icon>
                                </v-btn>
                        </v-col>

                        <v-col class="pa-0" cols="6" sm="3" md="1" lg="1" align-self="stretch">
                            <v-btn
                                min-height="70px"
                                text
                                tile
                                class="cardElement"
                                block
                                height="100%"
                                @click="remove"
                                color="red"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col class="pa-0" cols="6" sm="3" md="1" lg="1" align-self="stretch">

                            <v-btn
                                min-height="70px"
                                tile
                                color="primary"
                                block
                                height="100%"
                                class="cardElement"
                                @click="show"
                            >
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card>
    </div>
</template>

<style scoped>
    .utilityDiv{
        text-align: center;
        align-items: center;
    }
    .listTextField >>> input{
            text-align: center
    }
    .list{
        width: 100%;
        transition: all 1s;
        display: inline-block;
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
                percentage: 0,
            }
        },

        mounted(){
            this.totalTasks = storageUtils.getList(this.name).tasks.length;
            this.completedTasks = storageUtils.getComplitedTasks(this.name);
            this.percentage = this.completedTasks*100/this.totalTasks;
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
                    this.$refs.textField.focus();
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