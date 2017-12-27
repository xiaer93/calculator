//系统默认常量
const __constants={
    "pi":Math.PI,
    "e":Math.E
};
//添加自定义常量，区分大小写
const __addConstant=function (name,value) {
    let matchs=/^[\s]*([a-zA-Z]+?[\w]*)[\s]*$/.exec(name);
    //name命名是否符合要求
    if(matchs===null)
        throw new Error(`11`);
    //是否已经存在该常量
    if(__constants.hasOwnProperty(matchs[1]))
        throw new Error(`13`);
    //value是否能转为有效数值
    var valueNum;
    try{
        valueNum=parseFloat(value);
    }catch(e) {
        throw new Error(`12`);
    }
    //添加常量
    name=matchs[1];
    __constants[name]=valueNum;
    return true;
};

module.exports={
    constants:__constants,
    addConstant:__addConstant
}