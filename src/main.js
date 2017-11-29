const csum=require("./core").csum;
const jQuery=require("jquery");
const errorMsg=require("./error.js").error;

jQuery(document).ready(function ($) {

    $(".cal").click(function (event) {
        //清除动画
        $(".msg").slideUp("fast");
        $("#csum>span").slideUp("fast");

        let name,
            value,
            str,
            result;
        switch (event.target.name){
            case "calButton":
                str=$("input[name='calStr']").val();
                result=csum(str);
                break;
        }

        if(typeof result ==="number"){
            $(".msg output").val(result);
            $(".msg").css("visibility","visible").slideDown("slow");
        }else if(result instanceof Error){
            let msg,index,tmp;
            tmp=result.message.split(":");
            msg=errorMsg[tmp[0]];
            index=Number(tmp[1]);
            $(".msg output").val(msg);
            $(".msg").css("visibility","visible").slideDown("slow");
            $("#csum>span").css("visibility","visible").css("left",20+index*8.89189+"px").slideDown("slow");
        }
    });
    $(document).keyup(function (event) {
        if(event.keyCode===13){
            $("input[name='calButton']",".cal").trigger("click");
        }
    })
});