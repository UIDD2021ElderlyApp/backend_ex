document.getElementById('social').click();
function checkFlag() {
    if (document.getElementById('social_page_stat').innerText !== '1') {
        setTimeout(() => {
            checkFlag();
        }, 5);
    } else {
        document.getElementById('new_post_text').focus();
    }
}
checkFlag();