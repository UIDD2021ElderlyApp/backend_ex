# IMG model的內容

* user_name: 同users的
* time: Date, 建立時間
* title: String, username.toString() + Date.now().toString() + ".jpg";
* content: String, Base64的東西

## 注意:使用API'sharp'處理圖片
# /app/img的相關方法

> get /
>> query: ?title=abc123_tb_b.jpg  
>> res.status(200).send(jpg/png file or "-1") 
**參照Image.api.doc,目前圖片庫只支援jpg/png file，請見諒**

> get /gallery
>> query: 無
>> res.status(200).send(JSON.stringify(imgtitlearray)); 
**參照Image.api.doc,imgtitlearray=[title1,title2,...]**

> post /
>> body: 無, upload.single('img')
>> res.status(200).send(JSON.stringify(id));
**新增，id:{"img_title": title}**

