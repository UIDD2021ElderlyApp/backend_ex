# 儲存自己的動物、起床、睡覺時間

  * user_name:同users裡的
  * name:同users裡的
  * animal:Number
  * getup_time: [hr , min] 24時制 ,預設[6, 00]
  * sleep_time: [hr , min] 24時制 ,預設[22, 00]

# /app/personal/的相關方法

> get /
>>   
>> res.status(200).send(JSON.stringify(Personget));
**回傳所有東西(JSON)**

> post /create
>> req.body.animal  
>> res.status(200).send(JSON.stringify(id));
**選完動物時使用，建立一筆資料，回傳ID**

> post /create
>> req.body.animal  
>> res.status(200).send(JSON.stringify(id));
**選完動物時使用，建立一筆資料，回傳ID**

> post /getup
>> req.body.getup_time  
>> res.send(200)
**設定起床時間，回傳200**

> post /sleep
>> req.body.sleep_time  
>> res.send(200)
**設定睡覺時間，回傳200**

  
