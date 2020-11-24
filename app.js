const path = require("path");
const validator = require("indicative/validator")
const sanitizer = require("indicative/sanitizer")
class AppBootHook {
  constructor(app) {
    this.app = app;
    validator.configure(this.app.config.indicative); // 加载配置
    this.app.validateAll = validator.validateAll; //引入验证器ALL
    this.app.validate = validator.validate; //引入验证器
    this.app.validations = validator.validations;
    this.app.sanitize = sanitizer.sanitize; //引入过滤器
    this.app.sanitizations = sanitizer.sanitize; //引入净化器
  }
  async didLoad() {
    // 引入validate目录
    const validatePaths = this.app.loader.getLoadUnits().map(unit => path.join(unit.path, 'app/validate'));

    this.app.loader.loadToContext(validatePaths, '$v', {
      call: true,
      fieldClass: 'validateClasses',
    });
  }
}
module.exports = AppBootHook;
