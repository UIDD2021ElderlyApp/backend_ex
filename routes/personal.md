# 儲存自己的動物、起床、睡覺時間

  * user_name:同users裡的
  * name:同users裡的
  * animal:Number
  * getup_time:Date
  * sleep_time:Date

## 方法 ##


> get: /app/personal/

回傳所有東西(JSON)  



> post: /app/personal/create

**選完動物時使用**
建立一筆資料
傳給後端req.body.animal
回傳資料庫裡的id(JSON) 

> post: /app/personal/getup

傳給後端req.body.getup_time
回傳200


> post: /app/personal/sleep
 
傳給後端req.body.sleep_time
回傳200

  
  
  
  
   
