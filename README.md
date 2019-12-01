# 家家智能锁小程序接入指南1.0
## 使用指南
这是一个小程序的源代码包。把project.config.json中appid修改成你有权限修改的小程序id或者是测试id后就可以用微信开发工具打开测试了。如果你要把这个接入自己的小程序，就把utils/jjzns.js拷贝到你自己小程序里面的目录，再在要调用的页面导入对应的方法就可以了。你可以在index页面中找到每一个方法的调用示例。
## 注意事项
插件内内置了搜索打开蓝牙适配器等方法，对安卓和ios也有默认的适配，所以调用方可以只用关注自己的业务逻辑。另外因为微信小程序的限制，Android 6.0以上扫描蓝牙需要位置权限，如果没有位置权限会导致蓝牙功能不能正确使用。  
## 扫描搜索锁
 扫描周边的锁可以返回一个蓝牙锁，根据isBinded的值每找到一把锁就会调用一次方法。没有绑定的锁需要拍亮密码板才会被扫描到。
 
     /**
      * lock = {
      *   RSSI: 0 锁蓝牙信号强度
        advertiseData: ""
        binded: false 蓝牙是否已绑定，false才能绑定
        lockName: "" 蓝牙锁名字
        anyCode: ""随机数
        lockMac: "" 锁MAC地址
        initialTimeString：""
        randomString: ""随机库
      }
     *
     * isBinded默认为undefined；返回周围所有的锁
     * isBinded为true时每找到一把被绑定了的锁就调用方法
     * isBinded为false时每找到一把没有被绑定的锁就调用方法
     ** /
     handleSearchLock((lock)=>{
         
     },isBinded);
## 绑定锁
选择没有被绑定的锁,已经绑定过的锁不能重复绑定。绑定锁需要确保服务器和锁上数据一致，保存到服务器成功后需要调用handleInformLock(lock)通知锁绑定成功，绑定锁期间需要保持密码面板亮着。

    /**
    调用绑定锁接口，这里的lock为扫描绑定锁返回的对象。
    * lock = {
        advertiseData: ""
        binded: false 蓝牙是否已绑定，false才能绑定
        lockName: "" 蓝牙锁名字
        anyCode: ""随机数
        lockMac: "" 锁MAC地址
        initialTimeString：""
        randomString: ""随机库
      }
     *
    **/
    handleBindLock(lock, () => {
        // TODO:此处把lock存储到服务器，至少需要存储以下字段：lockName,lockAlias,lockMac,anyCode,randomString,initialTimeString,timezoneRawOffset,advertiseData
        /** 存储成功后通知锁绑定成功
        response={   
           succeed:为true时成功，false时失败 
           reason:失败时有值
        }
        **/
        handleInformLock(lock,(response)=>{
            
        });
    });
    
## 蓝牙开锁
提供保存时候的锁对象可以调用蓝牙开锁,，数据格式可以参考datas/lock.js 

    /**
    lock为服务器上保存的对象，直接调 用此方法可以开锁，开锁成功后需要自行上传服务器蓝牙的开锁记录。
    * response={
        succeed:为true时成功，false时失败 
        electricity:电量百分比
        reason:失败时有值
    }
    **/
    handleOpenLock(lock, (response) => {
      //TODO: 上传开锁记录
      
    })
## 解绑锁
提供绑定时候的锁数据可以调用蓝牙解绑锁，解绑前需要拍亮密码面板，lock数据格式可以参考datas/lock.js

    
    /**
    lock为服务器上保存的对象，需要先调用接口删除锁再去服务器上删除
    response={
        succeed:true为解绑成功，false时失败
        reason:succeed为false的时候这个有值
    }
    **/
    handleDeleteLock(lock,(response)=>{
        //TODO: response.succeed为true时去删除服务器上的锁。
    });

## 添加卡
添加卡必须在锁前操作，分为锁读卡和在锁上增加卡两步，操作的时候需要确保他们调用的顺序，卡在所有操作成功前不能移开。，lock数据格式可以参考datas/lock.js
   
    
    /** 
    response={
       succeed:true为成功
       identifier: 读到的卡的id号
    }
    addResponse={
       succeed::为true时成功，false时失败 
       reason:失败原因
    }
    **/
    handleReadCard(lock, (response) => {
      //TODO: 此处调用服务器新增卡的接口得到这张卡的密码
      var password = "";
      /** 将得到的密码写入锁 **/
      handleAddLockCardPassword(lock, response.identifier, password, (addResponse) => {
        

      });
    })
    
## 修改卡
修改卡必须在锁前操作。相当于修改保存在锁上卡id对应的密码。

    /** 
    先根据对应的条件在服务器生成卡对应的新密码，然后调用此方法将新密码写入锁
    * card.identifier: 卡的id
    * password为修改后新密码
    * response={
        succeed::为true时成功，false时失败 
        reason:失败原因
    }
    **/
    handleEditLockCardPassword(lock, card.identifier, password, (response) => {
        
        //TODO:response.succeed为false的时候需要调用服务器的回退修改卡把服务器修改回退了，具体参考服务器文档
    });
## 删除卡
删除卡也需要在锁旁操作。删除成功的话锁上也会有提醒。

    /** 
    card.identifier:卡的id
    response={
        succeed:为true时成功，false时失败 
        reason:失败原因
    }
    **/
    handleDeleteLockCardPassword(lock, card.identifier, (response) => {
      //TODO:操作成功后再删掉服务器上的锁

    });
## 同步时间
同步时间需要在锁旁操作

    /** 
    response={
        succeed:为true时成功，false时失败 
        reason:失败原因
    }
    **/
    handleSyncLockTime(lock, (response) => {
      
    })
## 同步开锁记录
锁上会有密码开门和卡开门的记录。
    
    /** 
    response={
        log:""记录内容
        logLength:记录数量
    }
    **/
    handleSyncLockData(lock, (response) => {
      //TODO:调用服务器接口将log同步到服务器上，调用对应的查询密码就可以看记录了
    })