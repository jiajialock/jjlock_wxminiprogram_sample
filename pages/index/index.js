//index.js
//获取应用实例
const app = getApp()
const { handleOpenLock, handleDeleteLock, handleSearchLock, handleBindLock, handleInformLock, handleSyncLockTime, handleSyncLockData, handleReadCard, handleAddLockCardPassword, handleEditLockCardPassword, handleDeleteLockCardPassword }  = require("../../utils/jjzns.js");
var lock = require("../../datas/lock.js")
var card = require("../../datas/card.js")
Page({
  data: {
   
  },
  onShow: function () {
    
  },
  onLoad: function () {
    
  },
  
  openLock: function (e) {
    handleOpenLock(lock, () => {
      console.log("opened lock");
    })
  },
  deleteLock: function (e) {
    wx.showModal({
      title:"解绑",
      content:"解绑前请先拍亮锁面板！确认解绑吗？",
      showCancel:true,
      success: (res) => {
        if (res.confirm) {
          handleDeleteLock(lock);
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
            wx.showModal({
              title: "找到锁"+item.name,
              content: "确认绑定吗？",
              showCancel: true,
              success: (res) => {
                if (res.confirm) {
                  handleBindLock(item, () => {
                    handleInformLock(item);
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
    handleSyncLockTime(lock, () => {
      console.log("sync time");
    })
  },
  syncData: function () {
    handleSyncLockData(lock, (params) => {
      console.log(params);
    })
  },
  addCard: function () {
    handleReadCard(lock, (params) => {
      console.log(params);
      var password = "1836748";
      handleAddLockCardPassword(lock, params.identifier, password, (response) => {
        console.log(response);

      });
    })
  },
  editCard: function () {
    var password = card.password;
    handleEditLockCardPassword(lock, card.identifier, password, (data) => {
      console.log(data);

    });
  },
  deleteCard: function () {
    handleDeleteLockCardPassword(lock, card.identifier, (data) => {
      console.log(data);

    });
  },

})
