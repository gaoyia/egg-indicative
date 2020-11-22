"use strict";

module.exports = {
  async validate(rules, messages, data = null) {
    data = data || this.request.body;
    try {
      return await this.app.validate(data, rules, messages);
    } catch (errors) {
      if (this.app.config.indicative.throwError) {
        this.throw(
          this.app.config.indicative.throwStatus,
          this.app.config.indicative.throwMessage,
          { data: errors }
        );
      } else {
        return {
          status: this.app.config.indicative.throwStatus,
          data: errors,
          message: this.app.config.indicative.throwMessage,
        };
      }
    }
  },
  async validateAll(rules, messages, data = null) {
    data = data || this.request.body;
    try {
      return await this.app.validateAll(data, rules, messages);
    } catch (errors) {
      if (this.app.config.indicative.throwError) {
        this.throw(
          this.app.config.indicative.throwStatus,
          this.app.config.indicative.throwMessage,
          { data: errors }
        );
      } else {
        return {
          status: this.app.config.indicative.throwStatus,
          data: errors,
          message: this.app.config.indicative.throwMessage,
        };
      }
    }
  },
};
