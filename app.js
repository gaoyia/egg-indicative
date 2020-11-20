const path = require("path");
const indicative = class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  async didLoad() {
    require("indicative/validator").configure(app.config.indicative); // 加载配置
    this.app.validateAll = require("indicative/validator").validateAll; //引入验证器ALL
    this.app.validate = require("indicative/validator").validate; //引入验证器
    this.app.validations = require("indicative/validator").validations;
    this.app.sanitize = require("indicative/sanitizer").sanitize; //引入过滤器
    this.app.sanitizations.require("indicative/sanitizer").sanitize; //引入净化器
    // 引入validate目录，并注入app实例
    const directory = path.join(this.app.config.baseDir, "app/validate");
    this.app.loader.loadToApp(directory, "validate");
  }
};
module.exports = AppBootHook;
