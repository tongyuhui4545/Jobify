import axios from 'axios'

const customFetch = axios.create({
    baseUrl: '/api/v1'
})

export default customFetch