export const actions = {
    async register(){
        let res = await this.$axios.get('register/');
        return res;
    }
}