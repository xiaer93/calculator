const constants=require("./constants.js").constants;
const methods=require("./methods.js").methods;
const argCount=require("./methods.js").argCount;

const addConst=require("./constants").addConstant;
const addMethod=require("./methods").addMethod;

const Calculator=function () {
    //基础运算符
    let op={
        "+":(a,b)=>a+b,
        "-":(a,b)=>a-b,
        "*":(a,b)=>a*b,
        "/":(a,b)=>a/b,
        "%":(a,b)=>a%b,
        "^":(a,b)=>Math.pow(a,b)
    }
    //基础运算符等级
    let opLever={
        "+":1,
        "-":1,
        "*":2,
        "/":2,
        "%":2,
        "^":3,
        "(":0,
        ")":0
    };
    //检测数字（数字可能为小数）
    let isDigits=function (value) {
        return /[\d\.]{1}/.test(value);
    };
    //检测运算符
    let isOperation=function (value) {
        return /[\+\-\*\/\^\%]{1}/.test(value);
    };
    //检测字母，可能为常量或函数
    let isAbc=function (value) {
        return /[a-zA-Z]{1}/.test(value);
    };
    //获取常量值
    let getConstant=function (name) {
        return constants[name];
    };
    //获取函数值
    let getMethod=function (func,args) {
        return methods[func](...args);
    };
    //删除空白字符，返回第一个不为空白字符索引（有可能返回index）
    let deleteBlanks=function (str,index) {
        let pattern=/[\s]/;
        let len=str.length;
        while (index<len && pattern.test(str[index])){
            index++;
        }
        return index;
    };
    //比较运算符的等级
    let opCompar=function(opa,opb){
        return (opLever[opa] < opLever[opb]);
    };
    //合并多个连续加减符号，返回合并后的运算符。
    // 此函数会抛出错误，如“+*+”
    let mergeAdd=function (strtmp) {
      let ret="+",
          tmp;
      for(tmp of strtmp){
          if(tmp===" " || tmp==="+"){
              continue;
          } else if(ret==="+" && tmp==="-"){
              ret="-";
          } else if(ret==="-" && tmp==="-"){
              ret="+";
          } else{
              //如果包含其他字符则抛出错误！
              throw new Error(`31`);
          }
      }
      return ret;
    };

    function _innercsum(str) {
        let index=0,
            len=str.length,
            outStack=[],//储存转换后的后序表达式
            tmpStack=[];//储存运算符，临时中转！

        let firstFlag=true,//处理表达式头部加减符号！
            beg=index,
            end=index,
            negValue=1; //处理负数
        //字符串长度检查
        if(len===0){
            throw new Error(`42:${index}`);
        }
        while (index<len){
            //清除空白符
            index=deleteBlanks(str,index);
            //表达式头部不可以为 * / % ^ ），异常如:*1+1
            if(firstFlag && /[\*\/\%\^\)]/.test(str[index])){
                throw new Error(`32:${index}`);
            }
            //表达式头部为负数，则使negValue=-1，取负！
            else if(firstFlag && /[\+\-]/.test(str[index])){
                beg=index;
                end=beg+1;
                while (end<len && /[\+\- ]/.test(str[end])){
                    end++;
                }
                try{
                    if(mergeAdd(str.slice(beg,end))==="-"){
                        negValue=-1;
                    }
                }catch (e){
                    throw new Error(`${e.message}:${beg}`);
                }
                //移动index至下一位待处理字符！
                index=end;
            }
            //表达式头部检测完毕，设置为false
            firstFlag=false;

            //如果为数字，则提取数字加入outStack
            //数字后置位可以为空（表达式结束）、运算符、右括号。bug：“22 22”，“22abc”
            if(isDigits(str[index])){
                beg=index;
                end=index+1;
                while (end<len && isDigits(str[end])){
                    end++;
                }
                //提取数字，并判断小数点使用是否正确
                let value=str.slice(beg,end);
                if(!/^[\d]*[\.]?[\d]*$/.test(value)){
                    //小数点数量不正确，抛出错误
                    throw  new Error(`34:${beg}`)
                }
                //通过negValue取负
                outStack.push(Number(value)*negValue);
                //数字的后置位判断
                let tmp=deleteBlanks(str,end);
                if(tmp!==len){
                    if(!(isOperation(str[tmp]) || str[tmp]===")")){
                        throw new Error(`33:${beg}`);
                    }
                }
                //移动index至下一位待处理字符
                index=end;
            }
            //基础运算符，后置位必须为数值、或者常量、函数。bug：“1+”
            else if(isOperation(str[index])){
                let operation;
                //如果为+-运算符，则合并多个连续加减运算符
                if(/[\+\-]/.test(str[index])){
                    beg=index;
                    end=beg+1;
                    while (end<len && /[\+\- ]/.test(str[end])){
                        end++;
                    }
                    //合并失败，则抛出错误！try必须配合catch使用！
                    try{
                        operation=mergeAdd(str.slice(beg,end));
                    }catch (e){
                        throw new Error(`${e.message}:${beg}`);
                    }
                }else{
                    operation=str[index];
                    beg=index;
                    end=beg+1;
                }
                //基础运算符后置位检查！
                let tmp=deleteBlanks(str,end);
                if(tmp===len || isOperation(str[tmp]) ||str[tmp]===")"){
                    throw new Error(`33:${beg}`);
                }
                //运算符入栈规则
                //如果tmpstack栈为空、或者栈顶运算符等级小于Operation，或者栈顶元素为左括号，则直接入栈
                //如果tmpstack栈顶元素大于等于Operation，则将栈顶元素出栈加入outstack，直到小于Operation。将Operation加入tmpstack栈中！
                if(tmpStack.length===0 || opCompar(tmpStack[tmpStack.length-1],operation) || tmpStack[tmpStack.length-1]==="("){
                    tmpStack.push(operation);
                }else{
                    while (tmpStack.length>0 && !opCompar(tmpStack[tmpStack.length-1],operation)){
                        outStack.push(tmpStack.pop());
                    }
                    tmpStack.push(operation);
                }
                //移动index至下一位待处理字符
                index=end;
            }
            //如果为字母，则判断是常量还是函数！
            //常量和函数的名称要求：首位必须为字母，其他位可以为字母或者数字
            //后置位参照数字
            else if(isAbc(str[index])){
                let ret;//储存常量和函数计算后的值！
                beg=index;
                end=beg+1;
                while (end<len && (isAbc(str[end]) || isDigits(str[end]))){
                    end++;
                }
                //获取变量或函数名
                let name=str.slice(beg,end);
                //常量或函数判断？
                let tmp=deleteBlanks(str,end);
                //如果是函数，解析参数。并调用_innercsum计算每一项参数，将结果传入函数！
                if(str[tmp]==="("){
                    //如果没找到该函数，则抛出错误
                    if(!methods.hasOwnProperty(name))
                        throw new Error(`24:${beg}`);
                    beg=tmp+1;
                    end=beg;
                    let leftBracket=1;
                    //循环找到函数的调用括号，如pow(2,2)，找到（2，2）.
                    while (end < len){
                        if(str[end]==="("){
                            leftBracket+=1;
                        }else if(str[end]===")"){
                            if(leftBracket===1){
                                leftBracket-=1;
                                break;
                            }else{
                                leftBracket-=1;
                            }
                        }else{
                            //什么都不干
                        }
                        end++;
                    }
                    //如果leftBracket不为0，则函数的括号不对称！
                    if(leftBracket>0){
                        throw new Error(`35:${beg}`);
                    }
                    //从上一步结果那匹马test解析参数！
                    let i=beg,
                        j=beg,
                        args=[];
                    while (j<end){
                        leftBracket=0;
                        while (j<end){
                            if(str[j]==="("){
                                leftBracket+=1;
                            }else if(str[j]===")"){
                                leftBracket-=1;
                            }else if(str[j]===","){
                                if(leftBracket===0){
                                    break;
                                }
                            }else{
                                //其他字符不进行操作！
                            }
                            j++;
                        }
                        args.push(str.slice(i,j));
                        j=j+1;
                        i=j;
                    }
                    args=args.map((arg)=>_innercsum(arg));
                    try{
                        ret=getMethod(name,args);
                    }catch (e){
                        throw new Error(`${e.message}:${beg}`)
                    }
                    end+=1;//end此时指向右括号，需要提升指向下一位待处理字符！
                }
                //如果是常量，从constents中获取对应的值
                //后置位参考数字
                else {
                    if(constants.hasOwnProperty(name)){
                        ret=constants[name];
                    }else{
                        //变量名不存在抛出错误
                        throw new Error(`14:${beg}`);
                    }
                }
                //ret*negValue实现取负！
                outStack.push(ret*negValue);
                //函数常量的后置位判断
                tmp=deleteBlanks(str,end);
                if(tmp!==len){
                    if(!(isOperation(str[tmp]) || str[tmp]===")")){
                        throw new Error(`33:${beg}`);
                    }
                }
                //移动index至下一位待处理字符
                index=end;
            }
            //如果为左括号，则直接入栈
            else if(str[index]==="("){
                tmpStack.push(str[index]);
                firstFlag=true;
                index+=1;
            }
            //如果为右括号，这将圆括号之间所有基础运算符加入outStack！
            //如果左右圆括号数量不匹配，则抛出错误！
            else if(str[index]===")"){
                while (tmpStack.length>0 && tmpStack[tmpStack.length-1]!=="("){
                    outStack.push(tmpStack.pop());
                }
                if(tmpStack[tmpStack.length-1]==="(")
                    tmpStack.pop()
                else
                    throw new Error(`35:${index}`)
                index+=1;
            }
            //如果不为数字、字母、基础运算符、左右圆括号，则抛出错误！
            else{
                //未知字符！
                throw new Error(`36:${index}`);
            }
            //表达式头部检测后，将negFlag设置为1
            negValue=1;
        }
        //将tmpStack中所有运算符加入outStack中！
        while (tmpStack.length>0){
            outStack.push(tmpStack.pop());
        }
        //计算表达式！
        //从outStack头部取值。
        //如果为数值，则加入retStack栈中
        //如果为基础运算符，则从retStack栈顶取2个值执行运算，接着将计算结果压入retStack栈中！
        let retStack=[]
        while (outStack.length>0){
            if(typeof outStack[0] ==="number"){
                retStack.push(outStack.shift());
            }else{
                let a=retStack.pop();
                let b=retStack.pop();
                retStack.push(op[outStack.shift()](b,a));
            }
        }
        //返回计算结果，结果为number类型！
        let result=retStack.pop();
        if(typeof result !== "number")
            //表达式结果异常
            throw new Error("41:${index}");
        else
            return result;
    }
    return _innercsum;
};

//输出接口函数！
const cal=new Calculator();

const catchError=function (func) {
    let ret;
    try {
        ret=func.apply(null,Array.prototype.slice.call(arguments,1));
    }catch (e){
        ret=e;
    }
    return ret;
};

module.exports={
    csum:function (str) {
        return catchError(cal,str);
    },
    addMethod:function (name,body) {
        return catchError(addMethod,name,body);
    },
    addConst:function (name,value) {
        return catchError(addConst,name,value);
    }
};

