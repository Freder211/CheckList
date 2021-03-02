import apiUtils from '~/utils/api.js'

export default function({$axios, store, redirect, error: nuxtError}){

    $axios.onResponseError(
        error => {
            let userNotValid = 'No active account found with the given credentials'
            if (error.response.data.code == 'token_not_valid'){ //entra se uno token non è valido
                let {token_class} = error.response.data.messages[0]
                if (token_class=='AccessToken'){ //entra se il token di accesso è scaduto
                    
                    return apiUtils.refreshToken($axios).then(
                        (response) => {
                            apiUtils.setToken($axios, response.access)
                            console.log('Nuovo token aggiornato')
                            error.config.headers['Authorization'] = 'Bearer ' + response.access; //alla configurazione della richiesta fallita, inserisco il nuovo token
                            error.config.baseURL = undefined;
                            return $axios.request(error.config) //reinvia la stessa richiesta col token nuovo
                        },
                        //in caso la richiesta di refresh fallisce, ritorno alla pagina di login
                        (error) => {
                            console.log('Ops, anche il refresh token è scaduto')
                            console.log(error)
                            redirect('/login')
                        }
                    )
                }
            }
            else if(error.response.data.detail==userNotValid){
                return error
            }
            else if(error.response.config.url=='/api/register/' && error.response.status==400){
            }
            else{
                console.log(error.response)
                nuxtError({
                    statusCode: error.response.status,
                    message: error.response.statusText,
                    error: error
                })
                
            }
        },
    )
}

