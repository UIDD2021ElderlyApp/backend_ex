# POOP get邏輯

  每次get時參考cookie中的'last_poop_time'時間變數，
  找到比last_poop_time舊的最新三篇，並將last_poop_time
  重設為第三篇的時間，如此一來滑動時讀到的poop應該
  是以時間新舊排序。
  
## 請前端注意
  
  **get 新增一個 query 為 "scroll"**
  第一次進入頁面時，scroll為 0
  滑動時scroll為 1
  如此一來才可以正常運作

