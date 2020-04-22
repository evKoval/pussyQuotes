import * as axios from "axios";

const instance = axios.create({
    baseURL:'https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts'
})

export const quotesAPI = {
    getQuotes(){
        return instance.get().then(response => response.data.all)
    }
}