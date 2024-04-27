const fileSizeConverter = (size) => {
    let res = size + ' байт';
    if(size >= 1024 && size < 1048576 ){
        res = Math.round(size / 1024) + ' кб';
    }else if(size > 1048576){
        res = (size / 1024 / 1024).toFixed(2) + ' мб';
    }
    return res;
}

export default fileSizeConverter;