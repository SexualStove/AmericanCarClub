import Api from '@/services/api'

export default {
    sendMail () {
        return Api().post('/')
    }
}