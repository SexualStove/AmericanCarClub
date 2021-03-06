import Api from '@/services/api'

export default {
    deleteGallery(data) {
      return Api().post('/removeGallery', data)
    },

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
    getImageTables (id){
        return Api().get('/ImageTable'+id)
    },
    Upload(formdata) {
        Api().post('/Upload', formdata)
    },
    UploadThumbnail(formdata) {
        Api().post('/UploadThumbnail', formdata)
    },
    downloadGallery(id) {
        return Api().get('/DownloadGallery'+id)
    },
    sendMail () {
        return Api().post('/')
    }
    // uploadThumbnail (file){
    //     return Api().post('/create', file)
    // }
}

// AuthenticationService.register({
//     email: 'test@gmail.com',
//     password:'1234'
// });