/**
 * 系统默认方法
 */

const status=require("./status").status;

const __methods={
    sin:Math.sin,
    cos:Math.cos,
    tan:Math.tan,
    abs:Math.abs,
    sqrt:Math.sqrt,
    pow:Math.pow,
    log10:Math.log10,
    ln:Math.log,
    max:(x,y)=>x>y?x:y
};
const __argCount={
    sin:1,
    cos:1,
    tan:1,
    abs:1,
    sqrt:1,
    pow:2,
    log10:1,
    ln:1,
    max:2
};
const __isTriangle=[
    "sin",
    "cos",
    "tan"
];

const __ang2rad=a=>a/180*Math.PI;
const __rad2ang=r=>r/Math.PI*180;

/*改造函数，增加函数参数检查功能，增加角度弧度检测*/
for(let name in __methods){
    //局部变量
    let oriFunc=__methods[name];
    let oriArgsCount=__argCount[name];
    __methods[name]=function (...args) {
        if(args.length>oriArgsCount){
            throw new Error(`25`);
        }else if(args.length<oriArgsCount){
            throw new Error(`26`);
        }else{
            //增加argCnt属性，储存函数的变量数目！
            /*__methods[key].argCnt=oriArgsCount;*/
            /*如果为三角函数，且输入为角度，则需要进行角度转弧度计算！*/
            let ret=oriFunc.apply(null,(__isTriangle.indexOf(name)>=0 && status.isAngle)?args.map(a=>__ang2rad(a)):args);
            if(typeof ret !== "number")
                throw new Error(`29`);
            else
                return  ret;
        }
    }
}

//添加自定义函数功能，（在现有的计算功能上拓展）
const __addMethod=function (name,oriArg,fn) {
    __argCount[name]=oriArg.length;
    __methods[name]=function (...args) {
        let oriArgsCount=__argCount[name];
        if(args.length>oriArgsCount){
            throw new Error(`25`);
        }else if(args.length<oriArgsCount){
            throw new Error(`26`);
        }else{
            let ret=fn.apply(null,(__isTriangle.indexOf(name)>=0 && status.isAngle)?args.map(a=>__ang2rad(a)):args);
            if(typeof ret !== "number")
                throw new Error(`29`);
            else
                return  ret;
        }
    };
    return true;
};


module.exports={
    methods:__methods,
    argCount:__argCount,
    addMethod:__addMethod
};


