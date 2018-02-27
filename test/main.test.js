const expect=require("chai").expect;
const core=require("../src/core.js");
const csum=core.csum;

describe("基本运算检测",function () {
    it('1 + 1 = 2',function(){
        expect(csum("1+1")).to.be.equal(2);
    });
    it("1 - 1 = 0",function(){
        expect(csum("1-1")).to.be.equal(0);
    });
    it("1 * 2 = 2",function () {
        expect(csum("1*2")).to.be.equal(2);
    });
    it("2 / 2 = 1",function () {
        expect(csum("2/2")).to.be.equal(1);
    });
    it('3 % 2 = 1',function () {
        expect(csum("3%2")).to.be.equal(1);
    });
    it('2 ^ 2 =4',function () {
        expect(csum("2^2")).to.be.equal(4);
    });
    it("1+(1+1)*3^2",function () {
        expect(csum("1+(1+1)*3^2")).to.be.equal(19);
    });
    it("2^2^2",function () {
        expect(csum("2^2^2")).to.be.equal(16);
    });
    it('(-1+1++++1)',function () {
        expect(csum("(-1+1++++1)")).to.be.equal(1);
    })
});
describe("复杂加减检测",function () {
    it('-1 + 2 = 1',function () {
        expect(csum("-1+2")).to.be.equal(1);
    });
    it('1 +- 1 = 0',function () {
        expect(csum("1+-1")).to.be.equal(0);
    });
    it('2+++-1',function () {
        expect(csum("2+++-1")).to.be.equal(1);
    });
});
describe("空白符检测",function () {
    it('-1 + 1 = 0',function () {
        expect(csum(" -1 + 1")).to.be.equal(0);
    });
    it(' -  1 + + 2 = 1',function () {
        expect(csum(" -  1 + + 2 ")).to.be.equal(1);
    });
    it('- 1 * 2',function () {
        expect(csum("- 1 * 2 ")).to.be.equal(-2);
    })
});
describe("常量检测",function () {
    it('pi+1',function () {
        expect(csum("pi+1")).to.be.equal(Math.PI+1);
    })
});
describe("函数检测",function () {
    it('sin(30)',function () {
        expect(csum("sin(30)")).to.be.equal(Math.sin(30*Math.PI/180));
    });
    it('pow(2,pow(2,2))',function () {
        expect(csum("pow(2,pow(2,2))")).to.be.equal(16);
    });
    it('pow(pow(2,2),pow(2,2))',function () {
        expect(csum("pow(pow(2,2),pow(2,2))")).to.be.equal(256);
    });
});
describe("特殊检测",function () {
    it('-1',function () {
        expect(csum("-1")).to.be.equal(-1);
    });
    it('-1+(+1)',function () {
        expect(csum("-1+(+1)")).to.be.equal(0);
    });
    it('1+++2-+1',function () {
        expect(csum("1+++2-+1")).to.be.equal(2);
    });
});
describe("错误检测",function () {
    it('ssin(30)',function () {
        expect(csum("ssin(30)")).to.be.an.instanceOf(Error);
    });
    it('3sin(30)',function () {
        expect(csum("3din(30)")).to.be.an.instanceOf(Error);
    });
    it('1+2*(1+1))',function () {
        expect(csum("1+2*(1+1))")).to.be.an.instanceOf(Error);
    });
    it('1+po w(2,2)',function () {
        expect(csum("1+po w(2,2)")).to.be.an.instanceof(Error);
    });
    it('1+pow(2,2,2)',function () {
        expect(csum("1+pow(2,2,2)")).to.be.an.instanceof(Error);
    })
});


/*
* 空格检测，前后空格
* 多个加减检测 1+++2-+1
* 非法数字检测11 11+22
*
* 进制转换功能
* 添加常量功能
* 添加函数功能
*
* 多级嵌套pow(2,pow(2,2))
* 多级嵌套2^2^2
*
* 错误检测
* 1+ 操作符不匹配
* 1+(2*3))  括号不匹配
* 非法函数名检测2fun fun cc
* 非法常量名检测2pi pi ii
* 非法操作符检测
*
*/