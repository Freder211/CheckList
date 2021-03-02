<template>
    <div justify='center' align='center' height='100%'>
        <v-card class="mt-10" width="500">
            <v-card-title>
                {{singup ? 'Register' : 'Login'}}
            </v-card-title>

            <v-card-actions>
                <v-container>
                    <v-row col='12' class="mb-5">
                        <v-text-field
                            type="text" 
                            label="Username"
                            :rules="[
                                value => (value || '').length <= 20 || 'Max 20 characters',
                                value => (value || '').indexOf(' ') < 0 || 'No spaces are allowed',
                            ]"
                            v-model="username"
                        >
                        </v-text-field>
                    </v-row>

                    <v-row col='12' class="mb-5">
                        <v-text-field
                            type="password" 
                            label="Password"
                            v-model="password"
                        >
                        </v-text-field>
                    </v-row>

                    <v-row col='12' class="mb-5" v-if="singup">
                        <v-text-field
                            type="password" 
                            label="Repeat password"
                            v-model="repeatPassword"
                            :rules="[value => (value || '') == password || 'Max 20 characters', 

                            ]"
                        >
                        </v-text-field>
                    </v-row>

                    <v-row col='12' class="mb-5">
                        <v-btn
                            color="primary"
                            block
                            :disabled="this.disableButton"
                            @click.native="singup ? register() : login()"
                        >
                            {{singup ? 'Register' : 'Log in'}}
                        </v-btn>
                    </v-row>

                    <v-row col='12'>
                        <v-btn
                            block
                            text
                            @click.native="switchMode"
                        >
                            
                            {{singup ? 'Already registered?' : 'New user?'}}
                        </v-btn>

                        <v-dialog
                            v-model="loading"
                            hide-overlay
                            persistent
                            width="300"
                        >
                            <v-card
                                color="primary"
                            >
                                <v-card-text>
                                Please stand by
                                <v-progress-linear
                                    indeterminate
                                    color="white"
                                    class="mb-0"
                                ></v-progress-linear>
                                </v-card-text>
                            </v-card>
                        </v-dialog>

                        <v-dialog
                            max-width="400"
                            v-model="showDialog"
                        >
                            <v-card>
                                <v-toolbar
                                :color="successDialog ? 'success' : 'error' "
                                dark
                                >
                                    <div class="text-h5">
                                        {{successDialog ? 'Looking good!' : 'Something didn\'t go right'}}
                                    </div>

                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        @click="showDialog = false"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text class="mt-2">
                                    <div class="text-h6">
                                        {{textDialog}}
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-row>

                </v-container>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import apiUtils from '~/utils/api.js'
export default {

    data(){
        return {
            username: '',
            password: '',
            repeatPassword: '',
            singup: false,

            loading: false,

            showDialog: false,
            successDialog: true,
            textDialog: '',
        }
    },

    computed: {
        disableButton(){
            if(this.password=='' || this.username=='' || this.username.indexOf(' ')>=0){
                return true
            }
            else{
                if(this.singup){
                    return this.password != this.repeatPassword 
                }

                return false
            }
        }
    },

    methods: {
        switchMode(){
            this.singup=!this.singup
            this.resetInputs()
        },

        resetInputs(){
            this.username=''
            this.password=''
            this.repeatPassword = ''
        },

        buildDialog(message, success){
            this.successDialog=success
            this.textDialog=message
            this.showDialog=true
        },

        async login(){
            this.loading=true
            let credentials = {
                data: {
                    'username': this.username,
                    'password': this.password,
                }
            }

            try{
                let res = await this.$auth.loginWith("local", credentials);
                let token = res.data;

                apiUtils.setToken(this.$axios,token.access)
                localStorage.setItem("refresh", token.refresh)


                this.$router.push({name: 'index'});
            }
            catch(error){
                this.buildDialog('Credentials not valid.', false)
                this.resetInputs()
            }
            this.loading=false
        },

        async register(){
            let credentials = {
                'username': this.username,
                'password': this.password,
            }
            if (
                this.password == this.repeatPassword &&
                this.password!='' && this.username!=''
            ){
                this.loading=true
                try{
                    await apiUtils.register(this.$axios, credentials)
                    this.buildDialog('Registration complete!', true)
                    this.singup=false
                    this.resetInputs()
                }
                catch (error){
                    this.buildDialog('Credentials not valid.', false)
                }
                this.loading = false
            }
        }
    }
}
</script>