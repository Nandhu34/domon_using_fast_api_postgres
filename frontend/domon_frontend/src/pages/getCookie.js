import Cookies from 'js-cookie'
import config from '../config_file'
let  cookieData = Cookies.get(config.COOKIENAME)
cookieData = cookieData ? JSON.parse(cookieData) : null



export default cookieData