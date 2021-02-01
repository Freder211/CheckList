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
                                        <v-card-title class="pa-0">{{name}}</v-card-title>
                                    </v-col>

                                    <v-col class="pa-0" cols="12" sm="7">
                                        <v-card-text class="pa-0" v-show="descriptionEmpty" >{{description}}</v-card-text>
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
        if(this.description == "" || this.description == null)
            this.descriptionEmpty=false;
    },

    props: {
        name: String,
        description: String,
        checked: Boolean,
    },

    computed: {
        checkedReactive: {
            get(){
                return this.checked;
            },
            set(val){
                storageUtils.checkTask(this.name, val);
            }
        }
    },
    
    methods: {
        remove(){
            this.$emit('removed', this.name);
        },
    }
}
</script>