/**
 * 系统默认常量
 */

const __constants={
    "pi":Math.PI,
    "e":Math.E
};
//添加自定义常量，区分大小写
const __addConstant=function (name,value) {
    let matchs=/^[\s]*([a-zA-Z]+?[\w]*)[\s]*$/.exec(name);
    //常量只能为字母和数字组成，且首字符必须为字母！
    if(matchs===null)
        throw new Error(`11`);
    //存在同名常量？
    if(__constants.hasOwnProperty(matchs[1]))
        throw new Error(`13`);
    //值是否有效？
    let valueNum;
    try{
        valueNum=parseFloat(value);
    }catch(e) {
        throw new Error(`12`);
    }
    //添加常量
    __constants[matchs[1]]=valueNum;
    return true;
};

module.exports={
    constants:__constants,
    addConstant:__addConstant
};