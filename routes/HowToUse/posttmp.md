# /app/posttmp的相關方法

## post /app/posttmp/pooptmmp  
* body : {"post_tmmp":"一個字串a"}  
* send : (200)  

## post /app/posttmp/poop_img_sel_tmmp  
* body : {"post_img_select_tmmp":"一個字串b"}  
* send : (200)  

## get /app/posttmp/pooptmmp  
* send : {"post_tmmp":"一個字串a"}  

## get /app/posttmp/poop_img_sel_tmmp  
* send : {"post_img_select_tmmp":"一個字串b"}  

## get /app/posttmp/poop _tmmp_clear  
**清空如下資料post_tmmp:"一個字串a"與post_img_select_tmmp:"一個字串b"**  

```
需要清除快取的地方  
按下關閉、發文、清除圖片快取->圖片關閉  
取值->jade匯入  
```

