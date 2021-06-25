# IMG model的內容

```
     name         |   type      |           |
     user_name    |   String    |           |
     time         |   Date      |router產生 |
     title        |   String    |router產生 |
     content      |   String    |base64     |
```

# /app/img的相關方法

## get /
* query: title=abc123_tb_b.jpg  
* send : file or "-1"

## get /gallery
* query: 無
* send : imgtitlearray 
**imgtitlearray=[title1,title2,...]**

## post /
* body : 單張圖片
* send : id
**id:{"img_title": title}**

