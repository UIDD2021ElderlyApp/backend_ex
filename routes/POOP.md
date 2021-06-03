# /app/poop/的相關方法

**這是最新的**
> get /
>> req.query.query: JSON.stringify({"scroll": true/false, "number_of_poop": number})  
>> res.status(200).send(JSON.stringifyPoopget));  
>> res.status(200).send("-1");
**照時間取number個,若沒東西則回傳-1**

**這是新的功能**
> get /byId
>> req.query.Id: Id
>> res.status(200).send(JSON.stringify(poops));  
>> res.status(200).send("-1");
**照Id取1個,若沒東西則回傳-1**


**下面這個過時了**
> get /
>> req.query.scroll: JSON.stringify(true/false)  
>> res.status(200).send(JSON.stringify(poops));  
>> res.status(200).send("-1");
**取3個,若沒東西則回傳-1**

> post /
>> req.body.time, req.body.title, req.body.text, req.body.img  
>> res.status(200).send(JSON.stringify(id));
**新增，回傳ID**

> post /comment
>> req.body.id, req.body.time, req.body.text  
>> res.status(200).send(JSON.stringify(err));
**回應ID的文章**

# POOP get邏輯

  每次get時參考cookie中的'last_poop_time'時間變數，
  找到比last_poop_time舊的最新三篇，並將last_poop_time
  重設為第三篇的時間，如此一來滑動時讀到的poop應該
  是以時間新舊排序。
  
## 請前端注意
  
  **req.query.query: JSON.stringify({"scroll": true/false, "number_of_poop": number})**
  第一次進入頁面時，scroll為 false
  滑動時scroll為 true
  如此一來才可以正常運作


