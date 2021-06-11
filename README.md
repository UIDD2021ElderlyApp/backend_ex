---
title: 本組後端測試架構
lang: zh-tw
tags: uidd
---

# 本組後端測試架構

[![hackmd-github-sync-badge](https://hackmd.io/MljZQswSSpWniVF3iMY_cQ/badge)](https://hackmd.io/MljZQswSSpWniVF3iMY_cQ)

---

## 各url代表的jade檔案所在位置

主頁面+發文:/view/main
選角:/view/layout

其中所有的html發送router需使用
```javascript=
router.get('/', ensureAuthenticated, function (req, res, next) {
    Person.getPersonal(req.user.username, function (err, Personget) {
        if (err) throw err;
        res.render('main', {
            title: 'old_friend',
            var_jade_user_info_name: `${req.user.name}`,
            var_jade_user_info_username: `${req.user.username}`,
            var_jade_user_info_profileimage: `${req.user.profileimage}`,
            var_jade_user_info_choosedanimal: `${(!Personget)?'-1':Personget.animal}`
        });
    });
});
```
方可正常作動

---

## 以下的東西是之前的...留著給大家參考

---

## 密碼與私鑰保護

請至雲端硬碟「密碼與私鑰」資料夾下載裡面的Variouskeys資料夾，整個放到本REPO中方可運作

## 下載完REPO的初始化

請先`npm i`再做其他動作

## Facebook登入，跟老師說的都不一樣
原本做的是前端的登入，但是問題是:怎麼確定前端登入完的資訊傳到後端不會被修改

修正方式
https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow?locale=zh_HK

參考資料
https://ithelp.ithome.com.tw/articles/10197391

使用套件
http://www.passportjs.org/
https://github.com/jaredhanson/passport-facebook

套件參數
['id', 'name', 'displayName', 'gender', 'emails', 'photos', 'hometown', 'profileUrl', 'friends']


---

## TODO list

- [ ] keep刪除時的作動，會造成後端程式碼crash
> 錯誤如下
![](https://i.imgur.com/iCcPiYc.png)

- [ ] 捲動更新，當內容物太少，無法捲動時，無法更新
> 錯誤如下
![](https://i.imgur.com/rQqLVCr.png)

- [ ] 把發文時間記在硬碟中，看是要把那個記錄檔變成隱藏檔，還是要用其他方法去紀錄<<<這是一個次級的錯誤，不用改只要會動也沒關係>>>
> code:
```javascript=
fs.writeFile(`${__dirname}/poops.json`, newpooptime, (err) => {
                if (err) throw err
                var id = {};
                id["id"] = newPoop._id;
                res.status(200).send(JSON.stringify(id));
            })
```

- [ ] 前端的css、js請一律放在resources資料夾 (與html分開)
> img放在`resources/img`

- [ ] 主程式清理，請地圖合成進主程式；刪除在後端repo中FBlogin資料夾

- [ ] FB登入還沒合併進入主程式...待做

- [ ] 各個router要加上使用這驗證(看line群組)

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

#### 诶那個帳密請帶入自己的帳密ㄋㄟ，不要傻傻的

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
replace='mongodb://帳:密@140.116.132.223:27017/petdatabase_dev'
filename='./models/user.js'
sed -i "s#${search}#${replace}#gi" $filename
# Ask the user for their name
echo enter a port you like:
read varname
search='3000'
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

## 常見錯誤

![](https://i.imgur.com/4BBXCxO.png)

![](https://i.imgur.com/hy1EnR1.png)

![](https://i.imgur.com/gq9nw3S.png)

### 解法

請查看專案根目錄中如下檔案

![](https://i.imgur.com/Rf9OqvK.png)

並將該檔案中資料庫路徑更正(參考上方`.sh`程式碼)

須更正的東東如下

![](https://i.imgur.com/YxSFzbf.png)


---
{%hackmd B145hRQ2U %}