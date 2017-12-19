function getStyle(oDiv, name){
    if(oDiv.style.styleFloat){
        return oDiv.style.styleFloat;   //ie下float处理
    }else if(oDiv.style.cssFloat){
        return oDiv.style.cssFloat;     //火狐等float处理
    }
    if (oDiv.currentStyle) {
        return oDiv.currentStyle[name];
    } else {
        return getComputedStyle(oDiv, false)[name];
    }
}