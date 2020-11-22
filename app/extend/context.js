"use strict";

module.exports = {
  async validate(rules, messages, data = null) {
    data = data || this.request.body;
    try {
      return await this.app.validate(data, rules, messages);
    } catch (error) {
      return error;
    }
  },
  async validateAll(rules, messages, data = null) {
    data = data || this.request.body;
    try {
      return await this.app.validateAll(data, rules, messages);
    } catch (error) {
      return error;
    }
  },
};
