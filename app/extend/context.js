"use strict";

module.exports = {
  async validate(data, rules, messages) {
    data = data || this.request.body;
    let res;
    try {
      res = await this.app.validator(data, rules, messages);
    } catch (error) {
      // 暂时未知该异步方法会有什么异常
      res = error.message;
    }
    return res;
  },
};
