import apiUtils from '~/utils/api.js'

export default function({$axios, store, redirect}){
    $axios.onError(error => {
    })

    /*
    $axios.interceptors.response.use(
        response => {
            if (response.status == 200){
                if(response.request.responseURL && response.request.responseURL.includes('login')){
                    store.dispatch("setUser", response);
                }
            }
            return response;
        }
    )
    */

    $axios.onRequest(
        request => {
            console.log(request)
        }
    )

    $axios.onResponseError(
        error => {
            console.log(error.response)
            if (error.response.data.code == 'token_not_valid'){ //entra se uno token non è valido
                let {token_class} = error.response.data.messages[0]
                if (token_class=='AccessToken'){ //entra se il token di accesso è scaduto
                    
                    //prova a ottenere il nuovo access token attraverso il refresh token
                    return apiUtils.refreshToken($axios).then(
                        (response) => {
                            apiUtils.setToken($axios, response.access)
                            console.log('Nuovo token aggiornato')
                            error.config.headers['Authorization'] = 'Bearer ' + response.access;
                            error.config.baseURL = undefined;
                            return $axios.request(error.config)
                        },
                        (error) => {
                            console.log('Ops, anche il refresh token è scaduto')
                            console.log(error)
                        }
                    )
                }
                else{ //entra se il token di refresh è scaduto
                    redirect('/login')
                }
            }
        },
    )
}

