/** 统一处理 Cookie */

import CacheKey from "@/libs/enum/index"
import Cookies from "js-cookie"

export const getToken = () => {
    return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
    Cookies.set(CacheKey.TOKEN, token, { expires: new Date(Date.now() + 10 * 60 * 1000) })
}
export const removeToken = () => {
    Cookies.remove(CacheKey.TOKEN)
}

export const getUsernameToken = (): any => { //读取cookie
    return Cookies.get(CacheKey.USERNAME)
}
export const setUsernameToken = (token: string) => { //写入cookie 设置10分钟自动清除cookie
    Cookies.set(CacheKey.USERNAME, token, { expires: new Date(Date.now() + 10 * 60 * 1000) })
}
export const removeUsernameToken = () => { //移除cookie
    Cookies.remove(CacheKey.USERNAME)
}

//获取屏幕宽高
export const getClientSize = () => {
    const h = document.documentElement.clientHeight || document.body.clientHeight;
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    return {
        width: w,
        height: h
    }
}
//获取滚动条宽度
export const getScrollWidth = () => {
    const oDiv = document.createElement("DIV");
    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    const noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = "scroll";
    const scroll = oDiv.clientWidth;
    document.body.removeChild(oDiv);
    return noScroll - scroll;
}
//回到顶部
export const backToTop = () => {
    const scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
        window.requestAnimationFrame(backToTop);
        window.scrollTo(0, scrollTop - (scrollTop / 5));
    }
}


//Unicode转中文汉字
export const decode = (str: string) => {
    str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });

    return str;
}
