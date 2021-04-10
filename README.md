---
title: 本組後端測試架構
lang: zh-tw
tags: uidd
---

# 本組後端測試架構

## 使用...

    - luffy
    - node js
    - Express
    - mongo db
    - passport

## fast setup

1. go to luffy
2. `vi backend_setup.sh`
3. paste these code

```bash=
#!/bin/bash
cd ~
mkdir backend_try
cd backend_try
npm install express
npm install express-generator
git clone https://github.com/andythebreaker/backend_pet.git
cd backend_pet
mkdir ../garbage
mv node_modules ../garbage
rm *.txt
rm package-lock.json
rsync -r . ..
cd ..
search='mongodb://localhost:27017/nodeauth'
replace='mongodb://140.116.132.223:27017/nodeauth'
filename='./models/user.js'
sed -i "s#${search}#${replace}#gi" $filename
# Ask the user for their name
echo enter a port you like:
read varname
search='30087'
filename='./bin/www'
sed -i "s#${search}#${varname}#gi" $filename
npm install
npm start
```
4. `sh backend_setup.sh`
5. it will ask for port, type something (e.g.:19812)
6. 如果你有放乖乖的話，他應該會跑...一直跑
7. 打開瀏覽器，輸入`luffy.ee.ncku.edu.tw:[port]`
you'll see this
![](https://i.imgur.com/PSQId9i.png)
8. you can input 
- username`nini`
- password`nini`
9. you will then see welcome
10. you can find a log out btn., press it, then logout
11. 可以任意測試註冊等等行為

##### 關閉後還要啟動

1. `cd ~/backend_try`
2. `npm start`

##### mongodb資料庫gui

參考本文件最末端:「附加文件」章節
可以照「附加文件」中描述的方法以gui查看此資料庫

###### 更多gui軟體

- Studio 3T
- MongoDBCompass

#### 更多測試(無前端的api測試)

##### 所需軟體(windows)

- postman
- wireshark

##### 使用postman完成無前端的api測試

1. `post` `luffy.ee.ncku.edu.tw:[port]/users/login`
body 設定 `X-www......`
![](https://i.imgur.com/3ZQHXyV.png)
2. 送出
3. `get` `luffy.ee.ncku.edu.tw:[port]/users/logout`
body設定可以空白
4. 可以再做更多測試...也沒幾個指令啦

## 教學與參考

這些程式碼在幹嘛請看以下url

https://ithelp.ithome.com.tw/articles/10189263

### 注意

這份教學文件因年代久遠，有諸多錯誤，使用上還需多加留意
可參考`https://github.com/andythebreaker/backend_pet.git`做出的實踐
適用日期在20210331測試可行

## 附加文件

請至本組共用雲端硬碟>全域資源>技術文件>資料庫>下載其中的`pptx`檔案
- 其中第1至5頁描述了在本次實作中所採與用的mongodb資料庫
- 第6至9頁描述了如何以gui查看此資料庫
- 剩下的部分描述了一些注意事項

###### 針對本次實作中所使用的資料庫

錯誤或待修正

- 存取權限未配置
- luffy以後會提供有配置好存取權限的帳號

---
{%hackmd B145hRQ2U %}