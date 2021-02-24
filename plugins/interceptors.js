import apiUtils from '~/utils/api.js'

export default function({$axios, store, redirect}){
    $axios.onError(error => {
    })

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

    $axios.onRequest(
        request => {
            console.log(request)
        }
    )

    $axios.onResponseError(
        error => {
            console.log(error.response)
            if (error.response.data.code == 'token_not_valid'){ //enters if some kind of token is not valid
                //if the access token was used
                let {token_class} = error.response.data.messages[0]
                if (token_class=='AccessToken'){ //enters if access token is not valid
                    
                    apiUtils.refreshToken($axios).then(
                        (response) => {
                            console.log('ciau')
                            apiUtils.setToken($axios, response.access)
                        },
                        (error) => {
                            console.log('Ops, anche il refresh token è scaduto')
                            console.log(error)
                        }
                    )
                    return
                }
                else{ //enters if refresh token is not valid
                    redirect('/login')
                }
            }
        },
    )
}

