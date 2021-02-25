<template>
        <v-container>
            <v-row align-content="center"  justify="center">
                <v-col>

                    <v-text-field 
                        type="text" 
                        v-model="name"
                        label="New list"
                        hide-details="true"
                        :rules="[value => (value || '').length <= 20 || 'Max 20 characters']"
                    >
                    </v-text-field>
                </v-col>

                <v-col md="1" sm="2" cols="3" align-self="center">
                    <v-btn 
                        class="addBtn"
                        block
                        tile
                        v-bind:loading="createLoading"
                        v-bind:disabled="createLoading"
                        @click.native="addNew"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>

            </v-row>

            <div v-if="listsLoading" class="text-center mt-10">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="200"
                    width="10"
                >
                </v-progress-circular>
            </div>

            <transition-group v-else name="lists" tag="div">
                <List v-for="l in lists" :key="l.id" :list="l" v-on:removed="remove"/>
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
    import apiUtils from '~/utils/api.js'

    export default {
        transition: 'lists-transition',

        data(){
            return {
                lists: [],
                name: "",

                createLoading: false,
                listsLoading: true,
            }
        },

        mounted(){
            let token = localStorage.getItem('token');
            if(token){
                this.$axios.setToken(token, 'Bearer');
            }
            this.getAllLists();
        },

        methods: {
            addNew(){
                if (this.name != "" && this.name.length <= 20){
                    this.createLoading = true;

                    var newList = {name: this.name, order: 'Name'};
                    apiUtils.createList(this.$axios, newList).then(
                        res => {
                            this.lists.push(res);
                            this.createLoading = false;
                        },
                    )
                    this.name="";
                }
            },
            remove(id){
                apiUtils.deleteList(this.$axios, id).then(
                    res => {
                        for(var i in this.lists){
                            if(this.lists[i].id == id){
                                this.lists.splice(i, 1);
                            }
                        }
                    },
                ) 
            },
            getAllLists(){
                apiUtils.getLists(this.$axios).then(
                    lists => {
                        for(var i in lists){
                            console.log(lists[i]);
                            this.lists.push(lists[i]);
                        }
                        this.listsLoading=false;
                    }
                )
            },
        },
    }
</script>
