<h1>POOP get邏輯</h1>

  每次get時參考cookie中的'last_poop_time'時間變數，
  找到比last_poop_time舊的最新三篇，並將last_poop_time
  重設為第三篇的時間，如此一來滑動時讀到的poop應該
  是以時間新舊排序。
  
<h2>請前端幫忙</h2>
  
  在頁面**跳轉至poop先清掉last_poop_time**，
  如此一來才可以正常運作

