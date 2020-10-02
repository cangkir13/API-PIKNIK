const sukses = (code, data) => {
    // return {code, status:true, response:data}
    return { success:true, response:data}
}

const failed = (code, data) => {
    // return {code, status:false, response:{msg:data}}
    return { success:false, response:{msg:data}}
}
const glob = (code, data) => {
    if (code >= 200 && code < 300) {
        return sukses(code, data)
    } else {
        return failed(code, data)
    }   
}


module.exports = glob