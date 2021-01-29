<template>
    <v-row>
        <v-col>
            <v-card>
                <v-container class="fluid">
                    <v-row>
                        <v-col cols="1">
                            <v-checkbox v-model="checkedReactive"></v-checkbox>
                        </v-col>

                        <v-col cols="4">
                            <div class="taskContent">
                                <v-card-title>{{name}}</v-card-title>
                            </div>
                        </v-col>

                        <v-col>
                            <v-card-text v-show="descriptionEmpty" >{{description}}</v-card-text>
                        </v-col>

                        <v-col cols="2" lg="1" md="2">
                            <div class="removeBtn">
                                <v-btn
                                    rounded
                                    text
                                    tile
                                    @click="remove"
                                >
                                    <v-icon>mdi-close</v-icon> 
                                </v-btn>
                            </div>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
    .removeBtn{
        margin-top: 10px;
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