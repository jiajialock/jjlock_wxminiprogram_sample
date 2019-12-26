//index.js
//获取应用实例
var plugin = requirePlugin("jjzns");
var lock = require("../../datas/lock.js");
var card = require("../../datas/card.js");
Page({
  data: {
  },

  openLock: function (e) {
    plugin.handleOpenLock(lock, (response) => {
      console.log(response);

    })
  },
  deleteLock: function (e) {
    wx.showModal({
      title: "解绑",
      content: "解绑前请先拍亮锁面板！确认解绑吗？",
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          plugin.handleDeleteLock(lock, (response) => {
            console.log(response);

          });
        }
      }
    })

  },
  syncTime: function () {
    plugin.handleSyncLockTime(lock, (response) => {

      console.log(response);


    })
  },
  syncData: function () {
    plugin.handleSyncLockData(lock, (response) => {
      console.log(response);

    })
  },
  scanLocks: function () {
    wx.showModal({
      title: "搜索锁",
      content: "搜索前请先拍亮未绑定的锁面板！",
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          plugin.handleSearchLock((item) => {
            console.log(item);
            if (item.succeed === false) {
              console.log(item);

            }
            console.log('searched lock:' + item);
            wx.showModal({
              title: "找到锁" + item.name,
              content: "确认绑定吗？",
              showCancel: true,
              success: (res) => {
                if (res.confirm) {
                  plugin.handleBindLock(item, (response) => {
                    plugin.handleInformLockBinded(item);
                    item.binded = true;
                    lock = item;
                    console.log(response);
                  });
                }
              }
            })

          }, false);
        }
      }
    })
  },
  addCard: function () {
    plugin.handleReadCard(lock, (params) => {
      console.log(params);
      var password = "12466734";
      plugin.handleAddLockCardPassword(lock, params.identifier, password, (response) => {
        console.log(response);
      });
    })
  },
  editCard: function () {
    console.log(lock);
    plugin.handleEditLockCardPassword(lock, card.identifier, card.password, (response) => {
      console.log(response);

    })
  },
  deleteCard: function () {
    plugin.handleDeleteLockCardPassword(lock, card.identifier, (response) => {
      console.log(response);

    });
  }
})
