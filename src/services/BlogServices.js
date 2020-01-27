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

    createGallery (data) {
        console.log("what");
        return Api().post('/createGallery', data)
    },
    createImageTable (data) {
      return Api().post('/createImage', data)
    },
    getAllGallery (){
        return Api().get('/Gallery')
    },
    getImageTables (){
        return Api().get('/ImageTable')
    },
    // uploadThumbnail (file){
    //     return Api().post('/create', file)
    // }
}

// AuthenticationService.register({
//     email: 'test@gmail.com',
//     password:'1234'
// });