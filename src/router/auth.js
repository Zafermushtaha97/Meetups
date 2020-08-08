import {store} from "../store";

export default (to , from , next) =>{
    if(store.getters.users){
        next()
    } else {
        next('Signin')
    }
}