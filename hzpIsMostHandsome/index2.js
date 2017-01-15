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
        scenes5_middle_upper = document.querySelector(".scenes5-middle-upper"), //显示下层,dom上层,dom弟
        scenes5_middle_bottom = document.querySelector(".scenes5-middle-lower"), //显示上层,dom下层,dom弟
        // scenes5_cont_pic_list_right=document.querySelector(".scenes5-cont-pic-list-right"),
        // s5_data_item=document.querySelectorAll(".scenes5-data-cont .scenes5-cont-big-pic-cont-item"),//数据
        // s5_data_tit=document.querySelectorAll(".scenes5-data-tit .scenes5-txt-big-tit-cont"),//数据
        skewBoxes = document.querySelectorAll(".scenes5-cont-pic-list-unit-box"), //单个倾斜单元
        big_txt_old = document.querySelector(".scenes5-txt-big-tit-old"), //头条dom兄 显示下
        big_txt_new = document.querySelector(".scenes5-txt-big-tit-new"), //
        s5_small_tit = document.querySelector(".scenes5-txt-big-tit-cont-small"),
        data = {
            "imgsrc": [],
            "channel": [],
            "tit": [],
            "subtit": [],
            "href": []
        },
        s5_ani = [
            "scenes5-toleft-ani", //0,-100%
            "scenes5-toleft-reverse-ani", //100%,0
            "scenes5-toright-ani", //0,100%
            "scenes5-toright-reverse-ani", //-100%,0
            "scenes5-opactity-1",
            "scenes5-opactity-0"
        ],
        bg_tit,
        small_tit,
        lastIndex = 0,
        ismove = false,
        s4_list_swiper;



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

    (function() {
        var box = document.querySelector(".scenes4-list-wrapper");

        // @St. 2017-01-13-21.25 添加没有内容的容错
        console.log(box);
        if (box !== null) {
            function stopScorll(event) {
                var e = event || window.event;
                e.stopPropagation();
                // e.preventDefault();
                if (e.cancelBubble) {
                    e.cancelBubble();
                }
                return false;
            }
            box.addEventListener("mousewheel", stopScorll, true)
        }
    })();

    s4_list_swiper = new Swiper(".scenes4-swiper", {
        loop: false,
        slidesPerView: 1,
        pagination: '.scenes4-pagination',
        paginationClickable: true
    });

    function scrollBar() {
        $(".scenes4-list-wrapper").slimScroll({
            height: "700px",
            size: '2px',
            opacity: .2
        });
    }
    /*scrollBar();*/
    function BigBoxSetData(obj, index) {
        // @St. 2017-01-13-21.25 添加没有内容的容错
        console.log(obj);
        if (obj !== null) {
            obj.querySelector("img").src = data["imgsrc"][index];
            obj.querySelector(".scenes5-cont-big-pic-cont-item-tit-big").innerHTML = data["channel"][index];
            obj.querySelector(".scenes5-cont-big-pic-cont-item-tit-main-wrapper").innerHTML = data["tit"][index];
            obj.querySelector(".scenes5-cont-big-pic-cont-item-tit-small-wrapper").innerHTML = data["subtit"][index];
            obj.setAttribute("data-href", data["href"][index]);
            big_txt_new.innerHTML = data["tit"][index];
            big_txt_new.setAttribute("href", data["href"][index]);
            s5_small_tit.innerHTML = data["channel"][index];
        }
    }

    function reChangeDom(upclassName, bottomclassName) {
        //更新upper/old dom，卸载 ani
        // scenes5_middle_bottom
        scenes5_middle_bottom.classList.remove(bottomclassName);
        scenes5_middle_upper.classList.remove(upclassName);
        scenes5_middle_bottom.innerHTML = scenes5_middle_upper.innerHTML;
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

        BigBoxSetData(scenes5_middle_upper, n_i);

        // scenes5_middle_upper.塞数据

        function _reChangeDom() {
            disMozWebkit(scenes5_middle_upper, "animationEnd", _reChangeDom);
            reChangeDom(class_up, class_bottom);
        }
        mozWebkit(scenes5_middle_upper, "animationEnd", _reChangeDom);
    }

    function changeData(o_i, n_i) {
        /*console.log(data["imgsrc"][o_i],
            data["channel"][o_i],
            data["tit"][o_i],
            data["subtit"][o_i],
            data["href"][o_i]);
        console.log(data["imgsrc"][n_i],
            data["channel"][n_i],
            data["tit"][n_i],
            data["subtit"][n_i],
            data["href"][n_i]);*/
    }

    function switchRotate(o_i, n_i) {
        if (o_i == n_i) return;

        // @St. 2017-01-13-21.25 添加没有内容的容错
        console.log(skewBoxes.length);
        if (skewBoxes.length !== 0) {
            skewBoxes[n_i].classList.add("scenes5-cont-pic-list-unit-box-nonerotate");
            skewBoxes[n_i].querySelector(".scenes5-cont-pic-list-unit-mask").classList.add("hide");
            if (o_i >= 0) {
                skewBoxes[o_i].classList.remove("scenes5-cont-pic-list-unit-box-nonerotate");
                skewBoxes[o_i].querySelector(".scenes5-cont-pic-list-unit-mask").classList.remove("hide");
            }
        }
    }

    function goSlide() {
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
        for (; i < skewBoxes_len; i++) {
            skewBoxes[i].index = i, skewBoxes[i].addEventListener("click", goSlide);
            data["imgsrc"].push(skewBoxes[i].getAttribute("data-img_src"));
            data["channel"].push(skewBoxes[i].getAttribute("data-channel"));
            data["tit"].push(skewBoxes[i].getAttribute("data-tit"));
            data["subtit"].push(skewBoxes[i].getAttribute("data-sub_tit"));
            data["href"].push(skewBoxes[i].getAttribute("data-href"));
            setBgImg(skewBoxes[i], data["imgsrc"][i], i);
        }
        console.log(data);

        BigBoxSetData(scenes5_middle_bottom, 0);
        switchRotate(-1, 0);
        // console.log(data);
    })(scenes5_cont)

}
