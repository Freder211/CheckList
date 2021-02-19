<template>
    <div justify='center' align='center' height='100%'>
        <v-card class="mt-10" width="500">
            <v-card-title>
                Login
            </v-card-title>

            <v-card-actions>
                <v-container>
                    <v-row col='12' class="mb-5">
                        <v-text-field
                            type="text" 
                            label="Username"
                            hide-details="true"
                            v-model="username"
                        >
                        </v-text-field>
                    </v-row>

                    <v-row col='12' class="mb-5">
                        <v-text-field
                            type="password" 
                            label="Password"
                            hide-details="true"
                            v-model="password"
                        >
                        </v-text-field>
                    </v-row>

                    <v-row col='12' class="mb-5">
                        <v-btn
                            color="primary"
                            block
                            @click.native="login"
                        >
                            Log in
                        </v-btn>
                    </v-row>

                    <v-row col='12'>
                        <v-btn
                            block
                            text
                        >
                            New user?
                        </v-btn>
                    </v-row>

                </v-container>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            password: '',
        }
    },

    methods: {
        async login(){
            console.log('CIAOOOO');
            let credentials = {
                data: {
                    'username': this.username,
                    'password': this.password,
                }
            }

            try{
                let res = await this.$auth.loginWith("local", credentials);
                console.log(res)
            }
            catch(error){
                console.log(error.response)
            }
        }
    }
}
</script>