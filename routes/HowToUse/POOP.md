# /app/poop/的相關方法

**這是最新的**
## get /app/poop/  
```
* query: query={"scroll": TRUE/FALSE, "number_of_poop": NEMBER}  
* send : 
        無資料："-1"  
        有資料：  
        [{  
            "id":  
            "time":  
            "user_name":  
            "username":  
            "title":  
            "text":  
            "img":  
            "comment":  
          },
          {  
          }  
          ...
        ]  
```

## get /app/poop/byId  
```
* query: Id="Id"  
* send : 
        無資料："-1"  
        有資料：  
        {  
            "id":  
            "time":  
            "user_name":  
            "username":  
            "title":  
            "text":  
            "img":  
            "comment":  
        }  
```

## post /app/poop/  
```
* body : time:time, title:"title", text:"text", imgid:"imgid"  
* send : {"id":  }  
```
**發文**

## post /app/poop/comment  
```
* body : id;"id", time:time, text:"text"  
* send : (200)  
```
**在ID為id的文章留言**



