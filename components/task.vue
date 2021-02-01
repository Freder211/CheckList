<template>
    <v-row>
        <v-col>
            <v-card>
                <v-container>
                    <v-row align="center">
                        <v-col>
                            <v-container class="fluid">
                                <v-row align="center" justify="center">
                                    <v-col class="pa-0" cols="2" sm="1">
                                        <div class="action">
                                            <v-checkbox  v-model="checkedReactive"></v-checkbox>
                                        </div>
                                    </v-col>

                                    <v-col class="pa-0" cols="10" sm="4">
                                        <v-card-title class="pa-0">{{task.name}}</v-card-title>
                                    </v-col>

                                    <v-col class="pa-0" cols="12" sm="7">
                                        <v-card-text class="pa-0" v-show="descriptionEmpty" >{{task.text}}</v-card-text>
                                    </v-col>


                                </v-row>
                            </v-container>
                        </v-col>

                        <v-col cols="12" sm="3" md="2" lg="1">
                            <v-container>

                                <v-row v-if="!!this.task.date">
                                    <v-col class="pa-0" align-self="center">
                                        <div class="text-subtitle-1 text-center">
                                            <v-icon>mdi-calendar</v-icon>
                                            {{this.task.date}}
                                        </div>
                                    </v-col>
                                </v-row>

                                <v-row v-if="!!this.task.time">
                                    <v-col class="pa-0">
                                        <div class="text-subtitle-1 text-center">
                                            <v-icon>mdi-clock</v-icon>
                                            {{this.task.time}}
                                        </div>
                                    </v-col>
                                </v-row>

                            </v-container>
                        </v-col>


                        <v-col cols="12" sm="2" md="1" align-self="stretch" class="pa-0">
                                <v-btn
                                    color="red"
                                    block
                                    min-height="50"
                                    height="100%"
                                    rounded
                                    tile
                                    @click="remove"
                                >
                                    <v-icon>mdi-close</v-icon> 
                                </v-btn>
                        </v-col>


                    </v-row>
                </v-container>
                
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
    .action{
        text-align: center;
        align-items: center;
        align-self: stretch;
    }
</style>

<script>
import storageUtils from '~/utils/storage.js';
export default {

    data(){
        return {
            descriptionEmpty: true
        }
    },

    //eseguito al momento della creazione del componente
    mounted(){ 
        if(this.task.text == "" || this.task.text == null)
            this.descriptionEmpty=false;
    },

    props: {
        task: {}
    },

    computed: {
        checkedReactive: {
            get(){
                return this.task.checked;
            },
            set(val){
                storageUtils.checkTask(this.task.name, val);
            }
        }
    },
    
    methods: {
        remove(){
            this.$emit('removed', this.task.name);
        },
    }
}
</script>