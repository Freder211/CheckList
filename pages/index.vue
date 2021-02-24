<template>
        <v-container>
            <v-row align-content="center"  justify="center">
                <v-col>

                    <v-text-field 
                        type="text" 
                        v-model="name"
                        label="New list"
                        hide-details="true"
                    >
                    </v-text-field>
                </v-col>

                <v-col md="1" sm="2" cols="3" align-self="center">
                    <v-btn class="addBtn" block tile @click.native="addNew">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>

            </v-row>

            <transition-group name="lists" tag="div">
                <!--CHIEDERE PER LA DECOSTRUZIONE NEL V-FOR-->
                <List v-for="l in lists" :key="l.id" :name="l.name" :id="l.id" :list="l" v-on:removed="remove"/>
            </transition-group>
        </v-container>

</template>

<style scoped>
    .lists-enter,
    .lists-leave-to {
      opacity: 0;
    }

    .lists-enter {
      transform: translateY(30%);
    }

    .lists-leave-to {
      transform: translateX(300%);
    }

    .lists-leave-active {
      position: absolute;
    }

    .lists-transition-enter-active, .lists-transition-leave-active { transition: opacity .5s; }
    .lists-transition-enter, .lists-transition-leave-active { opacity: 0; }
</style>

<script>
    import storageUtils from '~/utils/storage.js';
    import { v4 as uuidv4} from 'uuid';
    import apiUtils from '~/utils/api.js'

    export default {
        transition: 'lists-transition',

        data(){
            return {
                lists: [],
                name: "",
            }
        },

        mounted(){
            let token = localStorage.getItem('token');
            if(token){
                this.$axios.setToken(token, 'Bearer');
            }
            this.getAllLists();
        },

        async asyncData({$axios}){
            let token = localStorage.getItem('token');
            if(token){
                $axios.setToken(token, 'Bearer');
            }
        },
        
        methods: {
            async addNew(){
                if (this.name != ""){
                    var newList = {name: this.name, order: 'Name'};
                    let res = await this.$axios.$post('/api/list/', newList); 
                    console.log(res);
                    this.lists.push(res);
                    this.name="";
                }
            },
            remove(id){
                storageUtils.removeList(id);
                for(var i in this.lists){
                    if(this.lists[i].id == id){
                        this.lists.splice(i, 1);
                    }
                }
            },
            async getAllLists(){
                let lists = await apiUtils.getLists(this.$axios)
                for(var i in lists){
                    console.log(lists[i]);
                    this.lists.push(lists[i]);
                }
            },
        },
    }
</script>
