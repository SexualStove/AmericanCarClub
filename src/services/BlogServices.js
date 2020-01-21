import Api from '@/services/api'

export default {
    createBlog (data) {
        return Api().post('/create', data)
    },
    getBlog (blogId) {
        return Api().get('/blog/'+blogId)
    },
    getAll (){
        return Api().get('/blog')
    },
    CreateGallery (data) {
        return Api().post('/createGallery', data)
    }
    // uploadThumbnail (file){
    //     return Api().post('/create', file)
    // }
}

// AuthenticationService.register({
//     email: 'test@gmail.com',
//     password:'1234'
// });