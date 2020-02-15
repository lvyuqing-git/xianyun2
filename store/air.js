export const state = ()=>{
    return {
        searchHistory : []
    }
}


export const mutations = {
    setSearchHistory(state,data){
        state.searchHistory.push(data)
    }
}