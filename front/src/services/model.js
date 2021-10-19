import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getModel = async () =>{
    try{
        const request = await axios.get(baseUrl)
        return request.data
    } catch(err){
        return err
    }
}

const getSentiment = async (query) => {
    try{
        const request = await axios.get(`${baseUrl}/model/${query}`)
        return request.data
    } catch(err){
        return err
    }
}

export default { getModel, getSentiment }