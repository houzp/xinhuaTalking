function scense_one_video_mask() {
    $('.scenes1-btn-1').append('<div class="scenes1-pic"></div>');

    /* scense 01 视频弹出层 */
    $(".scenes1-pic").on("click", function() {
        var curUrl = $.trim($(this).find(".scenes1-pic-btn").find("span").html());
        $(".scenes1-mask").removeClass("hide");
        $(".scenes1-mask").find("iframe").attr("src", curUrl);
    });
    $(".scenes1-mask-close").on("click", function() {
        $(".scenes1-mask").addClass("hide");
        $(".scenes1-mask").find("iframe").attr("src", "");
    });
}

function scense_four_stop_scroll() {
    var box = document.querySelector(".scenes4-list-wrapper"),
        _userAgent=window.navigator.userAgent.toLowerCase()
        ;
    if(!box) return;

    function boxMover(event){
        var e = event || window.event;
        if (e.cancelBubble) {
            e.cancelBubble();
        }else{
            e.stopPropagation();
        }
        return false;
    }

    function boxMmove(event){
        var e = event || window.event;
        if (e.cancelBubble) {
            e.cancelBubble();
        }else{
            e.stopPropagation();
        }
        return false;
    }

    function boxMck(event){
        var e = event || window.event;
        if (e.cancelBubble) {
            e.cancelBubble();
        }else{
            e.stopPropagation();
        }
        return false;
    }

    function boxMup(event){
        var e = event || window.event;
        if (e.cancelBubble) {
            e.cancelBubble();
        }else{
            e.stopPropagation();
        }
        return false;
        box.removeEventListener("mousedown",boxMdown,true);
        box.removeEventListener("mouseup",boxMup,true);
    }
    function boxMdown(event){
        var e = event || window.event;
        if (e.cancelBubble) {
            e.cancelBubble();
        }else{
            e.stopPropagation();
        }
        return false;
    }
    function stopScorll(event) {
        var e = event || window.event;
        console.log("stop scroll");
        if (e.cancelBubble) {
            e.cancelBubble();
        }else{
            e.stopPropagation();
        }
        return false;
    }

    if(_userAgent.indexOf("firefox")!==-1||_userAgent.indexOf("fire fox")!==-1){
        window.addEventListener("DOMMouseScroll", stopScorll);
    }else{
        box.addEventListener("mousewheel", stopScorll,true);
    }
    box.addEventListener("mousedown",boxMdown,true);
    box.addEventListener("mouseup",boxMup,true);
    box.addEventListener("click",boxMck,true);
    box.addEventListener("mousemove",boxMmove,true);
    box.addEventListener("mouseover",boxMover,true);
};

// scense_four_stop_scroll();

function scense_five() {
    /*
    1.小片失旋动画：transition+.scenes5-cont-pic-list-unit-box-nonerotate
    2.大图左右入场出场动画+标题入场出场动画：
        .scenes5-toleft-ani  //0,-100%
        .scenes5-toleft-reverse-ani   //100%,0
        .scenes5-toright-ani    //0,100%
        .scenes5-toright-reverse-ani    //-100%,0
        .scenes5-opactity-1         //opacity 1
        .scenes5-opactity-0         //opacity 0
        .scenes5-opactity-1-ani    //0-1
        .scenes5-opactity-0-ani    //1-0
    */
    var scenes5_cont = document.querySelector(".scenes5-cont"),
        scenes5_middle_upper = scenes5_cont.querySelector(".scenes5-middle-upper"), //显示下层,dom上层,dom弟
        scenes5_middle_bottom = scenes5_cont.querySelector(".scenes5-middle-lower"), //显示上层,dom下层,dom弟
        skewBoxes = scenes5_cont.querySelectorAll(".scenes5-cont-pic-list-unit-box"), //单个倾斜单元
        big_txt_old = scenes5_cont.querySelector(".scenes5-txt-big-tit-old"), //头条dom兄 显示下
        big_txt_new = scenes5_cont.querySelector(".scenes5-txt-big-tit-new"), //
        s5_small_tit = scenes5_cont.querySelector(".scenes5-txt-big-tit-cont-small"),
        data = {
            "imgsrc": [],
            "channel": [],
            "tit": [],
            "subtit": [],
            "href": []
        },
        s5_ani=[
            "scenes5-toleft-ani",//0,-100%
            "scenes5-toleft-reverse-ani", //100%,0
            "scenes5-toright-ani",//0,100%
            "scenes5-toright-reverse-ani",//-100%,0
            "scenes5-opactity-1-ani",//0-->1
            "scenes5-opactity-0-ani"
        ],
        bg_tit,
        small_tit,
        lastIndex = 0,
        ismove = false,
        s4_list_swiper
        ;

    

    function mozWebkit(obj, evName, cb) {
        var eName = evName.substr(0, 1).toUpperCase() + evName.substr(1);
        obj.addEventListener("moz" + eName, cb);
        obj.addEventListener("webkit" + eName, cb);
        // obj.addEventListener("webkit"+eName,cb);
    }

    function disMozWebkit(obj, evName, cb) {
        var eName = evName.substr(0, 1).toUpperCase() + evName.substr(1);
        obj.removeEventListener("moz" + eName, cb);
        obj.removeEventListener("webkit" + eName, cb);
        obj.removeEventListener(evName, cb);
    }

    function prefix(obj, cssName, value) {
        var cName = cssName.substr(0, 1).toUpperCase() + cssName.substr(1);
        obj.style["webkit" + cssName] = value;
        obj.style["moz" + cssName] = value;
        obj.style["ms" + cssName] = value;
        obj.style[cssName] = value;
    }


    function BigBoxSetData(obj, index) {
        obj.querySelector("img").src = data["imgsrc"][index];
        obj.querySelector(".scenes5-cont-big-pic-cont-item-tit-big").innerHTML = data["channel"][index];
        obj.querySelector(".scenes5-cont-big-pic-cont-item-tit-main-wrapper").innerHTML = data["tit"][index];
        obj.querySelector(".scenes5-cont-big-pic-cont-item-tit-small-wrapper").innerHTML = data["subtit"][index];
        obj.setAttribute("data-href", data["href"][index]);

        big_txt_old.innerHTML=data["tit"][index];
        big_txt_new.setAttribute("href",data["href"][index]);
        s5_small_tit.innerHTML = data["channel"][index];
    }

    function reChangeDom(upclassName, bottomclassName) {
        //更新upper/old dom，卸载 ani
       
        scenes5_middle_bottom.classList.remove(bottomclassName);
        scenes5_middle_upper.classList.remove(upclassName);
        scenes5_middle_bottom.innerHTML = scenes5_middle_upper.innerHTML;

        big_txt_old.classList.remove(s5_ani[4]);
        big_txt_new.classList.remove(s5_ani[5]);
        big_txt_new.innerHTML=big_txt_old.innerHTML;
        big_txt_new.href=big_txt_old.href;
    }

    function changeDom(o_i, n_i) {
        var class_up = "",
            class_bottom = "";
        if (n_i <= 1) {
            class_up = s5_ani[3];
            class_bottom = s5_ani[2];
        } else {
            class_up = s5_ani[1];
            class_bottom = s5_ani[0];
        }
        scenes5_middle_upper.classList.add(class_up);
        scenes5_middle_bottom.classList.add(class_bottom);

        big_txt_old.classList.add(s5_ani[4]);
        big_txt_new.classList.add(s5_ani[5]);

        BigBoxSetData(scenes5_middle_upper, n_i);

        
        function _reChangeDom(event) {
            var e = event || window.event;
        
            if (e.cancelBubble) {
                e.cancelBubble();
            }else{
                e.stopPropagation();
            }
        
            disMozWebkit(scenes5_middle_bottom, "animationEnd", _reChangeDom);
            reChangeDom(class_up, class_bottom);

            return false;
        }
        mozWebkit(scenes5_middle_bottom, "animationEnd", _reChangeDom);
    }


    function switchRotate(o_i, n_i) {
        if (o_i == n_i) return;
        skewBoxes[n_i].classList.add("scenes5-cont-pic-list-unit-box-nonerotate");
        skewBoxes[n_i].querySelector(".scenes5-cont-pic-list-unit-mask").classList.add("hide");
        if (o_i >= 0) {
            skewBoxes[o_i].classList.remove("scenes5-cont-pic-list-unit-box-nonerotate");
            skewBoxes[o_i].querySelector(".scenes5-cont-pic-list-unit-mask").classList.remove("hide");
        }
    }

    function goSlide() {
        if(lastIndex==this.index) return;
        switchRotate(lastIndex, this.index);
        changeDom(lastIndex, this.index);
        lastIndex = this.index;
    }

    function setBgImg(obj, url, i) {
        obj.querySelector(".scenes5-cont-bg-img").style.backgroundImage = "url(" + url + ")";
    }
    (function(obj) {
        var skewBoxes_len = skewBoxes.length,
            i = 0;
        if(!obj||!(obj.length!=0)) return;
        for (; i < skewBoxes_len; i++) {
            // 获取数据
            skewBoxes[i].index=i;
            skewBoxes[i].parentNode.index=i;
            skewBoxes[i].parentNode.addEventListener("click",goSlide);
            data["imgsrc"].push(skewBoxes[i].getAttribute("data-img_src")||"");
            data["channel"].push(skewBoxes[i].getAttribute("data-channel")||"");
            data["tit"].push(skewBoxes[i].getAttribute("data-tit")||"");
            data["subtit"].push(skewBoxes[i].getAttribute("data-sub_tit")||"");
            data["href"].push(skewBoxes[i].getAttribute("data-href")||"");
            setBgImg(skewBoxes[i], data["imgsrc"][i], i);
        }

        BigBoxSetData(scenes5_middle_bottom, 0);
        switchRotate(-1, 0);
        // console.log(data);
    })(scenes5_cont)

}