# egg-indicative

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-indicative.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-indicative
[travis-image]: https://img.shields.io/travis/eggjs/egg-indicative.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-indicative
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-indicative.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-indicative?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-indicative.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-indicative
[snyk-image]: https://snyk.io/test/npm/egg-indicative/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-indicative
[download-image]: https://img.shields.io/npm/dm/egg-indicative.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-indicative

<!--
Description here.
-->

## 安装(Install)

```bash
$ npm i egg-indicative --save
```

## 用例(Usage)

```js
// {app_root}/config/plugin.js
exports.indicative = {
  enable: true,
  package: "egg-indicative",
};
```

## 配置项 (Configuration)

```js
// {app_root}/config/config.default.js
// or
module.exports = (appInfo) => {
  const config = {
    indicative: {
      existyStrict: false,
      removeAdditional: false,
    },
  };
  // ...or....
  config.indicative = {
    existyStrict: false,
    removeAdditional: false,
  };
  return {
    ...config,
  };
};
```

### ★existyStrict (false)

existyStrict 属性告诉验证器，哪些属性必须被认为不存在。当它被设置为 true 时，那么只有未定义的值被认为是不存在的，否则 null、空字符串、未定义的都被认为是不存在的。

The existyStrict property tells validator, which properties must be considered non-existing. When it's set to true, then only undefined values are considered non-existing, otherwise null, empty string, undefined all are considered non-existing.

### ★removeAdditional (false)

是否从原数据对象中删除未参与验证的数据。

Setting it true will make validator remove all non validated key/value pairs from the main data object.

#### 查看更多配置信息

see [config/config.default.js](config/config.default.js) for more detail.
see [https://indicative.adonisjs.com/guides/master/configure](https://indicative.adonisjs.com/guides/master/configure) for more detail.

## 使用案例 Example

```js
//

"use strict";

  class index extends Controller {
    async index() {
    const { app, ctx } = this;
    const rules = {
      username: "required|alpha",
    };
    const rulesName = {
      username: "用户名(your_name)",
    };
    const messages = {
      required: (field, validation, args) => {
        return `${rulesName[field]}不能为空`;
      },
      "username.alpha": "用户名必须是字母",
    };
    let data = this.app.request.query
    let res;
    res = await ctx.validate(rules, messages, data); // 可选，默认为this.request.body // data default = this.request.body
    res = await ctx.validateAll(rules, messages);

    // or
    let config = removeAdditional: true,
    res = app.validate(data, rules, messages, config)  // config可选 // config?
    res = app.validateAll(data, rules, messages)
  }

```

### 查看更多的规则 (mroe rules)

[规则(mroe rules)](https://indicative.adonisjs.com/validations/master/array)

```js
const schema = {
  email: "normalize_email",
  bio: "strip_tags",
};

const data = {
  email: "foo+bar@googlemail.com",
  bio: "<p> I am the <strong>best</strong> </p>",
};
app.sanitize(data, schema);
/**
  {
    email: 'foobar@gmail.com',
    bio: 'I am the best',
  }
*/
```

## 疑难解答和建议 Questions & Suggestions

Please open an issue [here](https://github.com/gaoyia/egg-indicative/issues).

点击 [这里](https://github.com/gaoyia/egg-indicative/issues)进行提问

## 查看更多文档 More API & Doc

[API & DOC](https://indicative.adonisjs.com/guides/master/introduction)

## License

[MIT](LICENSE)
