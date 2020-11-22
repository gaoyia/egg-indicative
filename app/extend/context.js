"use strict";

module.exports = {
  async validate(rules, messages, data = null) {
    data = data || this.request.body;
    return await this.app.validate(data, rules, messages);
  },
  async validateAll(rules, messages, data = null) {
    data = data || this.request.body;
    return await this.app.validateAll(data, rules, messages);
  },
};
