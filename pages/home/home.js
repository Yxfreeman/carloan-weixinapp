// pages/home/home.js
import {createApiRequest} from '../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else {
      this.fetchStsInfo();
      this.fetchDictData();
    }
  },
  fetchStsInfo: function() {
    createApiRequest({
      url: '/sulian/otherChannel/querySTSInfo'
    }).then((data) => {
      wx.setStorageSync('stsInfo', JSON.stringify(data));
    });
  },
  fetchDictData: function () {
    createApiRequest({
      url: '/credit/confDict/queryForList',
      data: {constantConfType: '2'}
    }).then((data) => {
      wx.setStorageSync('dictionary', JSON.stringify(this.formatDictionary(data)));
    });
  },
  formatDictionary: function(data = []) {
    let dictionary = {};
    for (const dict of data) {
      const { paramKey: code, paramValue: value, paramType } = dict;
      if (!dictionary[paramType]) {
        dictionary[paramType] = [{code, value}];
      } else {
        dictionary[paramType].push({code, value});
      }
    }
    return dictionary;
  }
});