# IMG model的內容

* user_name: 同users的
* time: Date, 建立時間
* title: String, 標題(非必要)
* content: String, Base64的東西

# /app/img/的相關方法

> get /
>> req.query.Id  
>> res.status(200).send(JSON.stringify(Imgget)) 
**用ID取一個**

> get /gllery
>> req.query.query: {"scroll": 0 or 1 ,"number_of_img": number }  
>> res.status(200).send(JSON.stringify(imgarray)); 
**取number_of_img個，邏輯和poop的get相同**

> post /
>> req.body.time, req.body.title, req.body.content,  
>> res.status(200).send(JSON.stringify(id));
**新增，回傳ID**


# get app/img/gellery邏輯

**請參考POOP.md的get**
