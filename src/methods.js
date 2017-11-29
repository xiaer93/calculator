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
for(let key in __methods){
    let oriFunc=__methods[key];
    let oriArgsCount=__argCount[key];
    __methods[key]=function (...args) {
        if(args.length>oriArgsCount){
            throw new Error(`25`);
        }else if(args.length<oriArgsCount){
            throw new Error(`26`);
        }else{
            //增加argCnt属性，储存函数的变量数目！
            /*__methods[key].argCnt=oriArgsCount;*/
            /*如果为三角函数，且输入为角度，则需要进行角度转弧度计算！*/
            let ret=oriFunc.apply(null,(__isTriangle.indexOf(key)>=0 && status.isAngle)?args.map(a=>__ang2rad(a)):args);
            if(typeof ret !== "number")
                throw new Error(`29:${ret}`);
            else
                return  ret;
        }
    }
}

//添加自定义函数功能,还是应该提供基础编辑器，通过编辑器编写自定义函数
const addMethod=function (name,body) {
    /*检查函数名是否正确，同时是否已经存在*/
    let matchs=/^[\s]*([a-zA-Z]+?[\w]*)[\s]*$/.exec(name);
    if(matchs===null)
        throw new Error(`21,{$name}`);
    if(!methods.hasOwnProperty(matchs[1]))
        throw new Error(`23,{$name}`);
    name=matchs[1];
    /*检查body是否为function(){}形式*/
    body=body.replace(/\s/g,'');
    matchs=/^[\s]*function[\s]*\(([\w]+([\,]{1}[\w]+)*)*\)[\s]*\{[\w\W]*\}$/gmi.exec(body);
    if(matchs===null){
        throw new Error(`22:{$body}`);
    }
    /*添加函数*/
    let argsLen=matchs[1].split(",").length;
    argCount[name]=argsLen;
    methods[name]=body;

};

module.exports={
    methods:__methods,
    argCount:__argCount
};


