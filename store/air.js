export const state = ()=>{
    return {
        //搜索记录
        searchHistory : [],
        //机票价格
        price : 0,
        //机票信息
        airInfo : {
            seat_infos : {}
        }

    }
}
export const mutations = {
    setSearchHistory(state,data){
        state.searchHistory.push(data)
    },
    setPrice(state,data){
        state.price = data
    },
    setAirInfo(state,data){
        state.airInfo = data
    }
}