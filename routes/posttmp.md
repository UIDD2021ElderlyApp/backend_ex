# /app/posttmp的相關方法


> /pooptmp  
Post(user->sever)  
內容裝載json{post_tmp:”一個字串a”}  

> /poop_img_sel_tmp  
Post(user->sever)  
內容裝載json{post_img_select_tmp:”一個字串b”}  

> /pooptmp  
get(sever ->user)  
內容裝載json{post_tmp:”一個字串a”}  

> /poop_img_sel_tmp  
get(sever ->user)  
內容裝載json{post_img_select_tmp:”一個字串b”}  

> /poop _tmp_clear  
get(user -> sever)  
內容無須任何裝載  
清空如下資料post_tmp:”一個字串a”與post_img_select_tmp:”一個字串b”  




