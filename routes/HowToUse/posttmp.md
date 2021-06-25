# /app/posttmp的相關方法


> /pooptmmp  
Post(user->sever)  
內容裝載json{post_tmmp:”一個字串a”}  

> /poop_img_sel_tmmp  
Post(user->sever)  
內容裝載json{post_img_select_tmmp:”一個字串b”}  

> /pooptmmp  
get(sever ->user)  
內容裝載json{post_tmmp:”一個字串a”}  

> /poop_img_sel_tmmp  
get(sever ->user)  
內容裝載json{post_img_select_tmmp:”一個字串b”}  

> /poop _tmmp_clear  
get(user -> sever)  
內容無須任何裝載  
清空如下資料post_tmmp:”一個字串a”與post_img_select_tmmp:”一個字串b” 


需要清除快取的地方
按下關閉、發文、清除圖片快取->圖片關閉

取值->jade匯入


