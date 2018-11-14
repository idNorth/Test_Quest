const INITIAL_STATE = [];

export default function products(state = INITIAL_STATE, action){
    if( action.type === "SHOW_ALL" ){
        return action.products
    }
    return  state
}