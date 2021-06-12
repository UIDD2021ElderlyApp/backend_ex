## user.js 新增 getanotheruser方法

## 注意:使用API'sharp'處理圖片
# /app/profileimage的相關方法

> get /
>> query: ?username=123.jpg  
>> res.status(200).send(jpg file or "-1") 
**回傳一個dataurl或網址**

## 以下是時代的產物

> get /
>> query: 無  
>> res.status(200).send(jpg/png file or "-1") 
**參照大頭照api.doc,目前圖片庫只支援jpg/png file，請見諒**

> get /anotherperson
>> query: ?username=123.jpg    
>> res.status(200).send(jpg/png file or "-1")  
**參照大頭照api.doc,目前圖片庫只支援jpg/png file，請見諒**