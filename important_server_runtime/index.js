
$(function () {
    document.getElementById("get_info").addEventListener("click", function(){
        $.post("/git_version_info", {
            //empty
        }, (res) => {
            document.getElementById("get_infoV").innerText=res;
        });
    });
    document.getElementById("game_main_website_status").addEventListener("click", function(){
        $.post("/game_main_website_status", {
            //empty
        }, (res) => {
            document.getElementById("game_main_website_statusV").innerText=res;
        });
    });
    document.getElementById("Pull_the_remote_code_to_the_local_end_and_trigger_the_update").addEventListener("click", function(){
        $.post("/Pull_the_remote_code_to_the_local_end_and_trigger_the_update", {
            //empty
        }, (res) => {
            if (res == "success") {
                console.log("success");
            } else {
                console.error(res);
            }
            location.reload();
        });
    });
    document.getElementById("all_repo").addEventListener("click", function (e) {
        document.getElementById("all_commits").innerHTML = "";
        $.get("https://api.github.com/repos/UIDD2021ElderlyApp/backend_ex/commits", {
            //empty
        }, (res) => {
            console.log(res)
            for (let index = 0; index < res.length; index++) {
                /*console.log(index);
                console.log(res[index].sha);
                console.log(res[index].commit.author.name);console.log(res[index].commit.author.date);
                console.log(res[index].commit.committer.name);console.log(res[index].commit.committer.date);
                console.log(res[index].commit.message);
                console.log(res[index].html_url);*/
                document.getElementById("all_commits").innerHTML = document.getElementById("all_commits").innerHTML + `<tr>
<th scope="row">${index}</th>
<th scope="row">
<button type="button" class="btn btn-primary trigger_version_change" id="${res[index].sha}_trigger_version_change">Use this version and restart the server</button>
</th>
<th scope="col">${res[index].sha}</th>
<th scope="col">${res[index].commit.author.name}</th>
<th scope="col">${res[index].commit.author.date}</th>
<th scope="col">${res[index].commit.committer.name}</th>
<th scope="col">${res[index].commit.committer.date}</th>
<th scope="col">${res[index].commit.message}</th>
<th scope="col">${res[index].html_url}</th>
</tr>`;
            }
            $('.trigger_version_change').on('click', function (e) {
                console.log(`trigger_version_change-->${e.target.id}`);
                $.post("/trigger_version_change_git_reset_hard", {
                    trigger_version_change_git_reset_hard_sha: e.target.id.replace("_trigger_version_change", "")
                }, (res) => {
                    if (res == "success") {
                        console.log("success");
                    } else {
                        console.error(res);
                    }
                    location.reload();
                });
            });
        });
    });
    init();
});
function init(){
    document.getElementById("style_width_280px").style.width="33vw"
    document.getElementById("get_info").click();
    document.getElementById("all_repo").click();
    document.getElementById("game_main_website_status").click();
}