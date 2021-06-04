
import axios from 'axios' 
//인증이 안되었을 경우 리턴 로그인 url 로 라우팅 하기 위해 
import router from '../router' 
const DOMAIN = 'http://localhost:3000' 
const UNAUTHORIZED = 401 
//인증이 안되었을 경우 로그인 하도록 라우팅 하는 함수 
const onUnauthroized = () => { router.push('/login') } 
//api 호출 라이브러리에 의존적이지 않도록 공통으로 요청하는 부분을 구현 
const request = (method, url, data) => { 
    return axios ({ 
        method, 
        url: DOMAIN + url, 
        data 
    })
    .then(result => result.data) 
    .catch(result => { 
        const {status} = result.response 
        if (status === UNAUTHORIZED) 
        return onUnauthroized() 
        throw Error(result) 
    }) 
} 
//user 리스트를 요청 하는 함수 구현 
export const users = { 
    fetch() { 
    return request('get','/users') 
 },
 create(name){
     return request('post','/users',{name})
 }
}
//로그인 요청
export const auth = {
    login(email,password) {
        return request('post','/login',{email,password})
    }
}
//set header token
export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
    axios.defaults.baseURL = DOMAIN;

}

//example in vuejs

// import {user} from './api'

// export default {
//     data() {
//         loading: false,
//         users: '',
//         error: ''
//     },
//     created(){
//         this.fetchUserData()
//     },
//     methods: {
//         fetchUserData() {
//             this.loading = true
//             users.fetch()
//             .then(data => {
//                 this.users = data
//             })
//             .finally(_=>{
//                 this.loading = false
//             })
//         }
//     }
// }
 