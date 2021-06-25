# IMG model的內容

```
     name         |   type      |           |
     user_name    |   String    |           |
     time         |   Date      |router產生 |
     title        |   String    |router產生 |
     content      |   String    |base64     |
```

# /app/img的相關方法  

## get /app/img?title=abc123_tb_b.jpg  
* send : 無資料："-1"  
         有資料：file  

## get /app/img/gallery  
* send : ["title1","title2",...]  

## post /app/img  
* body : 單張圖片  
* send : {"img_title":  }  

