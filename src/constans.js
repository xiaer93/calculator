//系统默认常量
const __constants={
    "pi":Math.PI,
    "e":Math.e
};
//添加自定义常量
const __addConstant=function (name,value) {
    let matchs=/^[\s]*([a-zA-Z]+?[\w]*)[\s]*$/.exec(name);
    //name命名是否符合要求
    if(matchs===null)
        throw new Error(`11,{$name}`);
    //是否已经存在该常量
    if(!constants.hasOwnProperty(matchs[1]))
        throw new Error(`13,{$name}`);
    //value是否为有效数值
    if(typeof value !== "number")
        throw new Error(`12,{$value}`);

    //添加常量
    name=matchs[1];
    __constants[name]=value;
};

module.exports={
    constants:__constants,
    addConstant:__addConstant
}