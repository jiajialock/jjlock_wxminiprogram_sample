//index.js
//获取应用实例
const app = getApp()
const { handleOpenLock, handleDeleteLock, handleSearchLock, handleBindLock, handleInformLock, handleSyncLockTime, handleSyncLockData, handleReadCard, handleAddLockCardPassword, handleEditLockCardPassword, handleDeleteLockCardPassword }  = require("../../utils/jjzns.js");
var lock = require("../../datas/lock.js")
var card = require("../../datas/card.js")
Page({
  data: {
   
  },
  onLoad:function(){
  },
  openLock: function (e) {
    handleOpenLock(lock, (response) => {
      console.log(response);
    })
  },
  deleteLock: function (e) {
    wx.showModal({
      title:"解绑",
      content:"解绑前请先拍亮锁面板！确认解绑吗？",
      showCancel:true,
      success: (res) => {
        if (res.confirm) {
          handleDeleteLock(lock,(response)=>{
            console.log(response);
          });
        }
      }
    })
   
  },
  scanLocks: function () {
    wx.showModal({
      title: "搜索锁",
      content: "搜索前请先拍亮未绑定的锁面板！",
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          handleSearchLock((item) => {
            console.log(item);
            wx.showModal({
              title: "找到锁"+item.name,
              content: "确认绑定吗？",
              showCancel: true,
              success: (res) => {
                if (res.confirm) {
                  handleBindLock(item, () => {
                    console.log(item);
                    handleInformLock(item, (response)=>{
                      console.log(response);

                    });
                    item.binded = true;
                    lock = item;
                  });
                }
              }
            })
          
          }, false);
        }
      }
    })
  },
  syncTime: function () {
    handleSyncLockTime(lock, (response) => {
      console.log(response);
    })
  },
  syncData: function () {
    handleSyncLockData(lock, (response) => {
      console.log(response);
    })
  },
  addCard: function () {
    handleReadCard(lock, (response) => {
      console.log(response);
      var password = "1836748";
      handleAddLockCardPassword(lock, response.identifier, password, (addResponse) => {
        console.log(addResponse);

      });
    })
  },
  editCard: function () {
    var password = card.password;
    handleEditLockCardPassword(lock, card.identifier, password, (response) => {
      console.log(response);

    });
  },
  deleteCard: function () {
    handleDeleteLockCardPassword(lock, card.identifier, (response) => {
      console.log(response);

    });
  },

})
