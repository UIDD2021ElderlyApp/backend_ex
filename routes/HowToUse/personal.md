# Personal model的內容

```
     name         |   type      |           |
     user_name    |   String    |           |
     name         |   String    |           |
     animal       |   Number    |           |
     getup_time   |   Array     |[hr , min] 24|
     getup_time   |   Array     |[hr , min] 24|
```

# /app/personal/的相關方法  

## get /app/personal/  
```
* send : 
        無資料："-1"  
        有資料：  
        {  
          "user_name":  
          "name":  
          "animal":  
          "getup_time":  
          "getup_time":  
        }  
```

## post /app/personal/create
```
* body : animal:NUMBER  
* send : {"id":  }    
```
**選完動物時使用，建立一筆資料，回傳ID**  

## post /app/personal/getup  
```
* body : getup_time:[hh,mm]  
* send : (200)  
```

## post /app/personal/sleep  
```
* body : sleep_time:[hh,mm]  
* send : (200)  
```

  
