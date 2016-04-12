//通用接口
(function (root,factory){
    "use strict";
    if(typeof define==="function"&&define.amd){
        //AMD
        define('popupBox',[],function(){return factory;});
    }
    else if(typeof exports==="object"){
        //nodejs
        module.exports.popupBox=factory;
    }
    else{
        //Browsers global
        root.popupBox=factory;
    }
}(typeof window!=="undefined"?window:this,function (opt){
    var newDiv=document.createElement("div"),
        newClass=document.createAttribute("class"),
        dlgDiv="",
        h3Div="",
        dlgcntDiv="",
/*        quesDiv="",*/
        cntTitleDiv="",
        cntBodyDiv="",
        btnDiv="",
        closeDiv="",
        _self=this;

        //函数结构
        this.width=opt.width||"270px";
        this.minWidth=opt.minWidth||"0";
        this.maxWidth=opt.maxWidth||"100%";
        this.height=opt.height||"";

        this.title=opt.title||"";
/*        this.quesTitle=opt.quesTitle||[];
        this.quesBody=opt.quesBody||[];*/
        this.cntTitle=opt.cntTitle||"";
        this.cntBody=opt.cntBody||"";
        this.btnChoose=opt.btnChoose||[];

        this.visible=typeof opt.visible==="boolean"?opt.visible:true;
        this.isTitle=typeof opt.isTitle==="boolean"?opt.isTitle:true;
 /*       this.isQuestion=typeof opt.isQuestion==="boolean"?opt.isQuesTitle:true;*/
        this.isCntTitle=typeof opt.isCntTitle==="boolean"?opt.isCntTitle:true;
        this.isCntBody=typeof opt.isCntBody==="boolean"?opt.isCntBody:true;
        this.isBtnChoose=typeof opt.isBtnChoose==="boolean"?opt.isBtnChoose:true;
        this.isClose=typeof opt.isClose==="boolean"?opt.isClose:true;

        this.openDlg=function(){
            newDiv.setAttribute("class","popupBox show");
        };
        this.closeDlg=function(){
            document.body.removeChild(newDiv);
        };
        this.callback=opt.callback||function(){};
        this.firstCallback=opt.firstCallback||function(){
            //一开始只出现第一题，点击按钮之后出现第二题，第一题消失的功能
        };
        this.secondCallback=opt.secondCallback||function(){_self.closeDlg();};

        if(this.width){
            dlgDiv='style="width:'+this.width+';min-width:'+this.minWidth+';max-width:'+this.maxWidth+'"';
            if(this.height){
                dlgDiv='style="width:'+this.width+';min-width:'+this.minWidth+';max-width:'+this.maxWidth+';height:'+this.height+'"';
            }
        }
        else if(this.height){
            dlgDiv='style="height:'+this.height+'"';
        }
        if(this.isTitle){
            h3Div='<h3>'+this.title+'</h3>';
        }
        if(this.isClose){
            closeDiv='<span class="popup-close" onFocus="this.blur()">';
        }
        /*if(this.isQuestion){
            if(Object.prototype.toString.call(this.quesTitle)==="[object Array]"&&Object.prototype.toString.call(this.quesBody)==="[object Array]"){
                if(this.quesTitle.length===1&&this.quesBody.length===1){
                    quesDiv='<ul class="question">'+'<li class="qt qn">'+'<div class="contTitle">'+this.quesTitle+'</div>'+
                    '<div class="content">'+this.quesBody+'</div>'+'</li>';
                }
                else if(this.quesTitle.length===2&&this.quesBody.length===2){
                    quesDiv='<ul class="question">'+'<li class="qt qn">'+'<div class="contTitle">'+this.quesTitle[0]+'</div>'+
                    '<div class="content">'+this.quesBody[0]+'</div>'+'</li>'+
                    '<li class="qt">'+'<div class="contTitle">'+this.quesTitle[1]+'</div>'+
                    '<div class="content">'+this.quesBody[1]+'</div>'+'</li>';
                }
                else if(this.quesTitle.length>2&&this.quesBody.length>2){
                    quesDiv='<ul class="question">'+'<li class="qt qn">'+'<div class="contTitle">'+this.quesTitle[0]+'</div>'+
                    '<div class="content">'+this.quesBody[0]+'</div>'+'</li>'+
                    '<li class="qt">'+'<div class="contTitle">'+this.quesTitle[1]+'</div>'+
                    '<div class="content">'+this.quesBody[1]+'</div>'+'</li>'+
                    '<li class="qt">'+'<div class="contTitle">'+this.quesTitle[2]+'</div>'+
                    '<div class="content">'+this.quesBody[2]+'</div>'+'</li>';
                }
            }
        }*/
        if(this.isCntTitle){
            cntTitleDiv='<div class="contTitle">'+this.cntTitle+'</div>';
        }
        if(this.isCntBody){
            cntBodyDiv='<div class="content">'+this.cntBody+'</div>';
        }
        if(this.isBtnChoose){
            if(Object.prototype.toString.call(this.btnChoose)==="[object Array]"){
                if(this.btnChoose.length===1){
                    btnDiv='<button class="btn btn-info save alone" onFocus="this.blur()">'+this.btnChoose+'</button>';
                }else if(this.btnChoose.length>1){
                    btnDiv='<button class="btn btn-info save" onFocus="this.blur()">'+this.btnChoose[0]+'</button>'
                            +'<button class="btn btn-danger cancel" onFocus="this.blur()">'+this.btnChoose[1]+'</button>';
                }
            }
        }
        if(this.visible){
            newClass.value='popupBox show';
        }else{
            newClass.value='popupBox';
        }
        newDiv.setAttributeNode(newClass);
        newDiv.innerHTML='<div class="dialog" '+dlgDiv+'>'+
                '<div class="dialogTitle">'+h3Div+closeDiv+'</div>'+
                '<div class="dialogContent">'+cntTitleDiv+cntBodyDiv+'</div>'+
                '<div class="dialogChoose">'+btnDiv+'</div>'+
                '</div>';

        //在首字节处插入newdiv
        //document.body.appendChild(在末字节处)
        document.body.insertBefore(newDiv,document.body.firstChild);
        //双!!表示将后面的表达式强制转换成boolean类型数据
        //获取弹窗高度
        if(!!newDiv.firstChild.getAttribute('style')){
            newDiv.firstChild.setAttribute('style',newDiv.firstChild.getAttribute('style')+';margin-top:-'+newDiv.firstChild.offsetHeight/2+'px');
        }else{
            newDiv.firstChild.setAttribute('style','margin-top:-'+newDiv.firstChild.offsetHeight/2+'px'); 
        }
        //判断弹窗是否处于关闭状态
        setTimeout(this.callback,0);
        setTimeout(function(){
            if(_self.isClose){
                newDiv.firstChild.firstChild.lastChild.addEventListener('click',function(){
                    _self.closeDlg();
                },false);
            }
            if(_self.btnChoose.length===1){
                newDiv.firstChild.childNodes[2].firstChild.addEventListener('click',_self.callback,false);
            }else if(_self.btnChoose.length>1){
                newDiv.firstChild.childNodes[2].firstChild.addEventListener('click',_self.firstCallback,false);
                newDiv.firstChild.childNodes[2].lastChild.addEventListener('click',_self.secondCallback,false);
            }
        },0);
}));