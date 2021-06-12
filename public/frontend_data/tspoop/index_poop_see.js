/*to do ，留言完refresh page)*/
var this_url_path_re = /\/main/gi;

var DEF_DEBUG = true;
var DEF_NO_HTML_DISP = true;
var DEF_field_battle = false;
var DEF_use_https = true;
var DEF_ts = true;//be true
var DEF_fuckthephotos = true;
//var DEF_domain_name = "luffy.ee.ncku.edu.tw";
//var DEF_port = "38443";
var DEF_path = window.location.href.replace(this_url_path_re, "/app/poop").split('#')[0];//"/app/poop";
var DEF_comment_path = DEF_path + "/comment";//"/comment";

var DEF_TEXT_UI_comment_btn = "發佈";
var DEF_GUI_TXT_addcomment = "新增留言";
var AMENDuser_idTOuser_name = false;//need false
var SET_ajex_full_json = false;//need false when pub.!
var SET_FillTest = false;//need false
var DEFAULT_RES_dummies_test = "[{\"id\":\"6092b210779ced6502375e01\",\"time\":\"1999-12-31T02:01:01.000Z\",\"title\":\"poop3\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\"]},{\"id\":\"6092b209779ced6502375e00\",\"time\":\"1999-12-31T01:01:01.000Z\",\"title\":\"poop2\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\",\"{\\\"user_id\\\":\\\"hatoriheiji\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\",\"{\\\"user_id\\\":\\\"amurotoru\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\"]},{\"id\":\"6092b1fe779ced6502375dff\",\"time\":\"1999-12-31T00:01:01.000Z\",\"title\":\"poop1\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[]}]";
var dummy_commit = "[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"dummy_commit\\\"}\"]";
var isscroll = true
GLOBAL_full_url = window.location.href.replace(this_url_path_re, "").split('#')[0];//"";
GLOBAL_browse_post_on_scroll = true;
GLOBAL_browse_post_on_scroll_delay_ms = 500;

function usr_inp_comment_fcn(e) {
    if (SET_ajex_full_json) {
        jQuery_3_6_0.post(/*GLOBAL_full_url + */DEF_comment_path, {
            comment: dummy_commit
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(String(objects_returned_by_the_server));
            }
            document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value = "";
        });
    } else {

        if (DEF_DEBUG) {
            console.log(document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value);
        }

        jQuery_3_6_0.post(/*GLOBAL_full_url + */DEF_comment_path, {
            id: String(e.target.id).replace(/_btn/g, ''),
            time: Date(),
            text: document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(String(objects_returned_by_the_server));
            }
            document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value = "";
        })
    }
}

function get3post(isscroll) {
    if (DEF_DEBUG) {
        console.log("get3post !");
    }

    jQuery_3_6_0.get(DEF_path/*GLOBAL_full_url*/, {
        query: JSON.stringify({ "scroll": isscroll, "number_of_poop": 3 })
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(objects_returned_by_the_server);
        }
        if (!objects_returned_by_the_server) {
            // is emtpy
            document.getElementById("browse_post").classList.add("no_articles_here_or_stolen_by_aliens");
            if (document.getElementById("STAT_no_articles_here_or_stolen_by_aliens").innerText === "no_articles_here_or_stolen_by_aliens?undefine") {
                document.getElementById("STAT_no_articles_here_or_stolen_by_aliens").innerText = "no_articles_here_or_stolen_by_aliens?yes";
            } else {
                //no move!
            }
        } else {
            document.getElementById("browse_post").className = "";
            document.getElementById("STAT_no_articles_here_or_stolen_by_aliens").innerText = "no_articles_here_or_stolen_by_aliens?no";
            for (let forloopindexofOBJRETURNBYSV = 0; forloopindexofOBJRETURNBYSV < JSON.parse(objects_returned_by_the_server).length; forloopindexofOBJRETURNBYSV++) {
                const element_returned_by_the_server = JSON.parse(objects_returned_by_the_server)[forloopindexofOBJRETURNBYSV];

                if (DEF_DEBUG) { console.log(element_returned_by_the_server); }
                var post_poop = document.createElement("div");
                post_poop.classList.add("post_poop"); post_poop.classList.add("remove_at_exit_post_page");
                var original = document.createElement("div");
                original.classList.add("original"); original.classList.add("remove_at_exit_post_page");
                var comment_group = document.createElement("div");
                comment_group.classList.add("comment_group"); comment_group.classList.add("remove_at_exit_post_page");
                var poster_block = document.createElement("div");
                poster_block.classList.add("poster_block"); poster_block.classList.add("remove_at_exit_post_page");
                var ppt_frame = document.createElement("div");
                ppt_frame.classList.add("ppt_frame"); ppt_frame.classList.add("remove_at_exit_post_page");
                var poster_photo = document.createElement("div");
                poster_photo.classList.add("poster_photo"); poster_photo.classList.add("remove_at_exit_post_page");
                var poster_name = document.createElement("div");
                poster_name.classList.add("poster_name"); poster_name.classList.add("remove_at_exit_post_page");
                if (AMENDuser_idTOuser_name) {
                    poster_name.innerText = element_returned_by_the_server.user_id;
                } else {
                    poster_name.innerText = element_returned_by_the_server.user_name;
                }
                var post_time = document.createElement("div");
                post_time.classList.add("post_time"); post_time.classList.add("remove_at_exit_post_page");
                //convert given date into readable format
                var tmp_date = new Date(element_returned_by_the_server.time);
                post_time.innerText = tmp_date.toDateString();
                var post_text = document.createElement("div");
                post_text.classList.add("post_text"); post_text.classList.add("remove_at_exit_post_page");
                post_text.innerText = element_returned_by_the_server.text;
                var post_photo = document.createElement("div");
                post_photo.classList.add("post_photo"); post_photo.classList.add("remove_at_exit_post_page");

                /////////////////////////////////////////////////
                var more_comment = document.createElement("div");
                more_comment.classList.add("more_comment"); more_comment.classList.add("remove_at_exit_post_page");
                more_comment.id = String(element_returned_by_the_server.id) + "_more_comment_btn";
                more_comment.innerText = String(element_returned_by_the_server.comment.length) + '則留言';
                comment_group.appendChild(more_comment);

                for (let forloopcommentindex = 0; forloopcommentindex < element_returned_by_the_server.comment.length; forloopcommentindex++) {
                    const comment_element = JSON.parse(element_returned_by_the_server.comment[forloopcommentindex]);
                    if (DEF_DEBUG) { console.log(comment_element); }


                    var comment = document.createElement("div");
                    comment.classList.add("comment"); comment.classList.add("remove_at_exit_post_page");
                    //var commenter_block = document.createElement("div");
                    //commenter_block.classList.add("commenter_block");
                    var comment_text = document.createElement("div");
                    comment_text.classList.add("comment_text"); comment_text.classList.add("remove_at_exit_post_page");
                    comment_text.innerText = comment_element.text;
                    //var commenter_photo = document.createElement("div");
                    //commenter_photo.classList.add("commenter_photo");


                    var commenter_name = document.createElement("div");
                    commenter_name.classList.add("commenter_name"); commenter_name.classList.add("remove_at_exit_post_page");
                    if (AMENDuser_idTOuser_name) {
                        commenter_name.innerText = comment_element.user_id;
                    } else {
                        commenter_name.innerText = comment_element.user_name;
                    }
                    //var comment_time = document.createElement("div");
                    //comment_time.classList.add("comment_time");
                    //convert given date into readable format
                    //var tmp_date = new Date(comment_element.time);
                    //comment_time.innerText = tmp_date.toDateString();

                    //var commenter_detail = document.createElement("div");
                    //commenter_detail.classList.add("commenter_detail");

                    //commenter_block.appendChild(commenter_photo);
                    comment.appendChild(commenter_name);
                    //commenter_detail.appendChild(comment_time);
                    //commenter_block.appendChild(commenter_detail);
                    //comment.appendChild(commenter_block);

                    comment.classList.add(String(element_returned_by_the_server.id) + "_comment_css_show_disp");
                    comment.style.display = "none";

                    comment.appendChild(comment_text);
                    comment_group.appendChild(comment);
                }

                ppt_frame.appendChild(post_text);
                ppt_frame.appendChild(post_photo);
                poster_block.appendChild(poster_photo);

                var poster_detail = document.createElement("div");
                poster_detail.classList.add("poster_detail"); poster_detail.classList.add("remove_at_exit_post_page");

                poster_detail.appendChild(poster_name);
                poster_detail.appendChild(post_time);
                poster_block.appendChild(poster_detail);
                original.appendChild(poster_block);
                original.appendChild(ppt_frame);
                post_poop.appendChild(original);
                //--------------------bton
                var new_comment_block = document.createElement("div");
                new_comment_block.classList.add("new_comment_block"); new_comment_block.classList.add("remove_at_exit_post_page");
                var new_comment = document.createElement("div");
                new_comment.classList.add("new_comment"); new_comment.classList.add("new_comment");
                var usr_inp_comment_txt = document.createElement("input");
                usr_inp_comment_txt.classList.add("usr_inp_comment_txt"); usr_inp_comment_txt.classList.add("remove_at_exit_post_page");
                usr_inp_comment_txt.name = "new_comment_text";
                usr_inp_comment_txt.type = "text"; usr_inp_comment_txt.placeholder = "留言...";
                usr_inp_comment_txt.id = String(element_returned_by_the_server.id) + "_input_txt";
                var post_comment_button = document.createElement("div");
                post_comment_button.classList.add("post_comment_button"); post_comment_button.classList.add("remove_at_exit_post_page");
                post_comment_button.innerText = DEF_TEXT_UI_comment_btn;
                post_comment_button.id = String(element_returned_by_the_server.id) + "_btn";

                var your_name = document.createElement("div");
                your_name.classList.add("your_name"); your_name.classList.add("remove_at_exit_post_page");
                your_name.innerText = document.getElementById("jade_user_info_name").innerText;

                new_comment.appendChild(your_name);
                new_comment.appendChild(usr_inp_comment_txt);
                new_comment.appendChild(post_comment_button);
                new_comment_block.appendChild(new_comment);
                post_poop.appendChild(comment_group);
                //--------------------
                post_poop.appendChild(new_comment_block);
                document.getElementById("browse_post").appendChild(post_poop);

                document.getElementById(post_comment_button.id).addEventListener("click", usr_inp_comment_fcn);

                $(`#${more_comment.id}`).click(function () {
                    $(`#${more_comment.id}`).css("display", "none");
                    $(`.${String(element_returned_by_the_server.id) + "_comment_css_show_disp"}`).show();
                });
            }
            if (DEF_fuckthephotos) {
                for (let index_fuckthephotos = 0; index_fuckthephotos < document.getElementsByClassName("poster_photo").length; index_fuckthephotos++) {
                    const element = document.getElementsByClassName("poster_photo")[index_fuckthephotos];
                    element.innerHTML = `<img src=\"${document.getElementById('jade_user_info_profileimage').innerText}\">`;
                } for (let index_fuckthephotos = 0; index_fuckthephotos < document.getElementsByClassName("post_photo").length; index_fuckthephotos++) {
                    const element = document.getElementsByClassName("post_photo")[index_fuckthephotos];
                    element.innerHTML = "<img src=\"../modular_folder/tspoop/image/test2.svg\">";
                } for (let index_fuckthephotos = 0; index_fuckthephotos < document.getElementsByClassName("commenter_photo").length; index_fuckthephotos++) {
                    const element = document.getElementsByClassName("commenter_photo")[index_fuckthephotos];
                    element.innerHTML = "<img src=\"../modular_folder/tspoop/image/test.svg\">";
                }

            }
        }
    })


}

function init() {
    if (DEF_DEBUG) {
        console.log("dummiesTest success");
    } else {
        DEF_NO_HTML_DISP = true;
        DEF_field_battle = false;
        AMENDuser_idTOuser_name = false;
        SET_ajex_full_json = false;
    }
    if (DEF_NO_HTML_DISP) {
        for (let dont_show_this_in_published_client_index = 0; dont_show_this_in_published_client_index < document.getElementsByClassName("dont_show_this_in_published_client").length; dont_show_this_in_published_client_index++) {
            const element = document.getElementsByClassName("dont_show_this_in_published_client")[dont_show_this_in_published_client_index];
            element.style.display = "none";
        }
    }
    if (DEF_field_battle) {
        document.getElementById("browse_post").style.height = "400px";
    }
    //GLOBAL_full_url = ((DEF_use_https) ? "https" : "http") + "://" + DEF_domain_name + ":" + DEF_port + DEF_path;
    if (DEF_DEBUG) {
        console.log(DEF_path/*GLOBAL_full_url*/);
    }
    if (DEF_ts) {
        document.getElementById("browse_post").innerHTML = "";
    }
    get3post(!isscroll);

    if (SET_FillTest) {
        document.getElementById("browse_post").innerText = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n"
    }
}

function scrolledToBottom() {
    jQuery(function (jQuery_3_6_0) {
        jQuery_3_6_0('#browse_post').on('scroll', function () {
            console.log(GLOBAL_browse_post_on_scroll);
            console.log(jQuery_3_6_0(this).scrollTop() + jQuery_3_6_0(this).innerHeight());
            console.log(jQuery_3_6_0(this)[0].scrollHeight); console.log(Math.abs(((jQuery_3_6_0(this).scrollTop() + jQuery_3_6_0(this).innerHeight()))) / jQuery_3_6_0(this)[0].scrollHeight);
            if (GLOBAL_browse_post_on_scroll) {
                if (Math.abs(((jQuery_3_6_0(this).scrollTop() + jQuery_3_6_0(this).innerHeight()))) / jQuery_3_6_0(this)[0].scrollHeight >= 0.7) {
                    GLOBAL_browse_post_on_scroll = false;
                    console.log('end reached');
                    get3post(isscroll);
                    setTimeout(function () {
                        GLOBAL_browse_post_on_scroll = true;
                    }, GLOBAL_browse_post_on_scroll_delay_ms);
                }
            }

        });
    });
}


document.getElementById('social').addEventListener("click", function () {
    document.getElementById('snap_shoot_social_page_clean_html').innerText = document.getElementById('social').innerHTML;
    document.getElementById('snap_shoot_social_page_clean_html_stat').innerText = '1';
    function checkFlag() {
        if (document.getElementById('social_page_stat').innerText !== '1') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            init();
            scrolledToBottom();
        }
    }
    checkFlag();
});

document.getElementById('new_post_button').addEventListener("click", function () {
    function checkFlag() {
        if (document.getElementById('usr_inp_send_success').innerText !== 'post_success?yes') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            document.querySelectorAll('.remove_at_exit_post_page').forEach(e => e.remove());
            init();
            scrolledToBottom();
        }
    }
    checkFlag();
});


document.getElementById('exit_button').addEventListener("click", function () {

    document.querySelectorAll('.remove_at_exit_post_page').forEach(e => e.remove());

});