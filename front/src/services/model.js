import axios from 'axios'
const baseUrl = '/model'

const getSentiment = async (query) => {
    try{
        const request = await axios.get(`${baseUrl}/${query}`)
        return request.data
    } catch(err){
        return err
    }
}

export default { getSentiment }