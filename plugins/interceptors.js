export default function({$axios, store, redirect}){
    $axios.onError(error => {
        console.log(error.response)
        redirect('/login')
    })

    $axios.interceptors.response.use(
        response => {
            console.log(response)
            if (response.status == 200){
                console.log('wow')
                if(response.request.responseURL && response.request.responseURL.includes('login')){
                    console.log('wow')
                    store.dispatch("setUser", response);
                }
            }
            return response;
        }
    )
}