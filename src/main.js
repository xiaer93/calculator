const core=require("./core");
const jQuery=require("jquery");
const errorMsg=require("./error.js").error;

const csum=core.csum;
const addConst=core.addConst;
const addMethod=core.addMethod;

jQuery(document).ready(function ($) {
    //初始化动画
    $("#csum>span").slideUp("fast");
    $(".msg").slideUp("fast");

    $(".cal")
        .on("click","input[name='calButton']",function () {
            $("#csum>span").slideUp("fast");

            let str=$("input[name='calStr']").val();
            let result=csum(str);

            if(typeof result ==="number"){
                $(".msg output").val(result);
                $(".msg").slideDown("slow");
            }else if(result instanceof Error){
                let msg,index,tmp;
                tmp=result.message.split(":");
                msg=errorMsg[tmp[0]];
                index=Number(tmp[1]);
                $(".msg output").val(msg);
                $(".msg").slideDown("slow");
                $("#csum>span").css("left",20+index*8.89189+"px").slideDown("slow");
            }
        })
        .on("click","input[name='addConst']",function () {
            let result=addConst($("#constantName").val(),$("#constantValue").val());
            if(result instanceof Error){
                let msg,tmp;
                tmp=result.message.split(":");
                msg=errorMsg[tmp[0]];
                //index=Number(tmp[1]);
                $(".msg output").val(msg);
                $(".msg").slideDown("slow");
            }
        })
        .on("click","input[name='addFunc']",function () {
            let result=addMethod($("#functionName").val(),$("#functionValue").val());
            if(result instanceof Error){
                let msg,tmp;
                tmp=result.message.split(":");
                msg=errorMsg[tmp[0]];
                $(".msg output").val(msg);
                $(".msg").slideDown("slow");
            }
        })
        .on("click",function (event) {
            event.stopPropagation();
        });
    $("input[name='calStr']").change(function () {
       if($(this).val().length===0){
           $(".msg").slideUp("fast");
       }
    });
    $(document).keyup(function (event) {
        if(event.keyCode===13){
            $("input[name='calButton']",".cal").trigger("click");
        }
    })
});