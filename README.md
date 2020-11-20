# egg-indicative

## 捐赠(donate)

![捐赠](https://images.gitee.com/uploads/images/2020/1121/053137_62272659_576226.jpeg "38a12cd9e68965b77373cf918e6419c.jpg")

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

1. 验证器

```js
// egg Controller
"use strict";

  class index extends Controller {
    async index() {
    const { app, ctx } = this;
    const rules = {
      username: "required|alpha",
    };

    // or
    // const rules = {
    //   username: [
    //     app.validations.required()
    //   ]
    // }

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
    res = await ctx.validate(rules, messages, data); // data? 可选，default is this.request.body
    res = await ctx.validateAll(rules, messages);

    // or
    let config = removeAdditional: true,
    res = await app.validate(data, rules, messages, config)  // config? 可选
    res = await app.validateAll(data, rules, messages)
  }

```

```js
const rules = {
    // 正则
  username: [
    app.validations.regex(['^[a-z]+'])
  ],
  username: [
    app.validations.regex([new RegExp('^  [a-z]+')])
  ],
  url: 'url',
  url: [
    app.validations.url()
  ]
  // 字符串
  username: 'string',
  username: [
    app.validations.string()
  ],
   // 长度最大40
  username: 'max:40',
  username: [
    app.validations.max([40])
  ],

  // 长度最小6
  username: 'min:6',
  {
  username: [
    app.validations.min([6])
  ],
  // 枚举型
  sex: 'subset:man,woman',
  sex: [
    app.validations.subset(['man', 'woman'])
  ],
  // 数组
  blockList: 'array'，
  blockList: [
    app.validations.array()
  ],
  // 布尔
  // '0',0,'false' => false  // '1',1,'true' => true
  is_vip: 'boolean',
  is_vip: [
    app.validations.boolean()
  ],
  //--------datetime-----------日期时间相关------------
  confCall: `date|after:${new Date()}`,
  confCall: [
    app.validations.date(),
    app.validations.after([new Date()])
  ],
  meetup: 'date|after_offset_of:4,months',
  meetup: [
    app.validations.date(),
    app.validations.afterOffsetOf([4, 'months'])
  ],
  confCall: 'date|before:2019-11-20',
  confCall: [
    app.validations.date(),
    app.validations.before(['2019-11-20'])
  ],
  meetup: 'date|before_offset_of:4,months',
  meetup: [
    app.validations.date(),
    app.validations.beforeOffsetOf([4, 'months'])
  ],
  publish_at: [
    app.validations.dateFormat(['YYYY-MM-DD HH:mm:ss'])
  ],
  // [date] can use
  // 2015-03-25 (ISO Date)
  // 03/25/2015 (Short Date)
  // Mar 25 2015 (Long Date)
  // 25 Mar 2015 (Long Date)
  login_at: 'date',
  login_at: [
    app.validations.date()
  ]
  //-------------日期相关结束---------------
  // 必须包含
  username: 'required',
  username: [
    app.validations.required()
  ],
  // 如果字段存在，则强制needs_delivery存在
  address: 'required_if:needs_delivery',
  address: [
    app.validations.requiredIf(['needs_delivery'])
  ],
  address: 'required_when:checkout_type,deliver'
  address: [
    app.validations.requiredWhen(['checkout_type', 'deliver'])
  ],
  tax_id: 'required_with_all:car,house',
  tax_id: [
    app.validations.requiredWithAll(['car', 'house'])
  ],
  password: 'required_with_any:username,email',
  password: [
    app.validations.requiredWithAny(['username', 'email'])
  ],
  zipcode: 'required_without_all:address,state',
  zipcode: [
    app.validations.requiredWithoutAll(['address', 'state'])
  ],
  email: 'required_without_any:username,account_id',
  email: [
    app.validations.requiredWithoutAny(['username', 'account_id'])
  ],
  // ---------------数字---------------
  // above 大于
  age: 'number|above:20',
  age: [
    app.validations.number(),
    app.validations.above([20])
  ],
  // float 浮点型
  age: 'float',
  age: [
    app.validations.float()
  ],
  // integer 整型
  age: 'integer',
  age: [
    app.validations.integer()
  ],
  // number
  game_points: 'number',
  game_points: [
    app.validations.number()
  ],
  // range 范围
  age: 'integer|range:16,60',
  age: [
    app.validations.integer(),
    app.validations.range([16, 60])
  ],
  // under 强制小于
  age: 'integer|under:60',
  age: [
    app.validations.integer(),
    app.validations.under(60)
  ]
  // ---------------数字结束------------
  // object 对象
  user: 'object'
  user: [
    app.validations.object()
  ],
  // confirmed确认 ，当设置该属性后，【属性名_confirmation】必须存在，且值应该相等
  password: 'confirmed',
  password: [
    app.validations.confirmed()
  ],
  // different 不同的，secondary_email,primary_email 应该不相同
  secondary_email: 'different:primary_email'，
  secondary_email: [
    app.validations.different(['primary_email'])
  ],
  // equals 宽松相等
  coupon: 'equals:5050',
  coupon: [
    app.validations.equals([5050])
  ],
  // in 必须是允许的值
  post_status: 'in:draft,published',
  post_status: [
    app.validations.in(['draft', 'published'])
  ],
  // not_equals 不能等于
  username: 'not_equals:root',
  username: [
    app.validations.notEquals(['root'])
  ],
  // not_in 值不能等于
  username: 'not_in:root,admin,super',
  username: [
    app.validations.notIn(['root', 'admin', 'super'])
  ]
  // same 必须和其它属性的值一样
  password_confirmation: 'same:password',
  password_confirmation: [
    app.validations.same(['password'])
  ],
  // 这个没看懂
  terms: 'accepted',
  terms: [
    app.validations.accepted()
  ],
  //必须是字母
  username: 'alpha',
  username: [
    app.validations.alpha()
  ],
  // /^[a-z0-9]+$/i
  username: 'alpha_numeric',
  username: [
    app.validations.alphaNumeric()
  ],
  // 电子邮箱
  email: 'email'，
  email: [
    app.validations.email()
  ],
  // ends_with  强制验证下的字段的值以特定的子字符串结束。此验证还将在进行检查之前修剪空白。
  reg_no: 'ends_with:qaw', //starts_with 特定字符起始
  reg_no: [
    app.validations.endsWith(['qaw'])
  ],
  // 强制字段值包含给定的子字符串。
  url: 'includes:indicative',
  url: [
    app.validations.includes(['indicative'])
  ],
  // 强制字段值为有效ip地址
  ip_address: 'ip', //ipv4,ipv6
  ip_address: [
    app.validations.ip() //ipv4,ipv6
  ],
  payload: 'json',
  payload: [
    app.validations.json()
  ]
}

```

2. 过滤器

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

```js
// 过滤器的使用方法// 只能移除 &, ", ', < 和 > 字符
const sanitizationRules = {
  message: "escape",
};
// or
const sanitizationRules = {
  message: [app.sanitizations.escape()],
};

// 类似的有
const Example = {
  plural: "将值转换为其复数版本。如果value不是字符串，那么它将原样返回。",
  singular: "将值转换为它的单数版本。如果value不是字符串，那么它将原样返回。",
  slug:
    "将字符串转换为URL友好的字符。如果value不是字符串，它将原样返回。它还将处理ascii图表并将它们转换为utf-8计数器部分。",
  strip_links: "从给定字符串中去掉标记。",
  strip_tags: "从字符串中去除HTML标记。如果value不是字符串，它将原样返回。",
  trim: "从给定字符串的两边移除空格。",
};

// 其他的;
// normalizeEmail 通过删除不需要的字符来规范化电子邮件地址。例如foo+bar@gmail.com将会变成foobar@gmail.com，它还会对字符大小写进行规范化。
const sanitizationRules = {
  email: [app.sanitizations.normalizeEmail()],
};

// pass options
const sanitizationRules = {
  email: [
    app.sanitizations.normalizeEmail([
      {
        all_lowercase: true,
        icloud_remove_subaddress: true,
      },
    ]),
  ],
};

// lower_case  将字段值转换为小写。这个规则是区域有关的。
const sanitizationRules = {
  hexCode: "lower_case",
};
// or
const sanitizationRules = {
  hexCode: [app.sanitizations.lowerCase()],
};
// or
const sanitizationRules = {
  label: "lower_case:fr-CA",
};
// or
const sanitizationRules = {
  label: [app.sanitizations.lowerCase(["fr-CA"])],
};

// upper_case 将字段值转换为大写。这个规则是区域有关的。
const sanitizationRules = {
  hexCode: "upper_case",
};
// or
const sanitizationRules = {
  hexCode: [app.sanitizations.upperCase()],
};
const sanitizationRules = {
  label: "upper_case:fr-CA",
};
// or
const sanitizationRules = {
  label: [app.sanitizations.upperCase(["fr-CA"])],
};
```

### 查看更多的规则 (mroe rules)

[规则(mroe rules)](https://indicative.adonisjs.com/validations/master/array)

[过滤器规则(mroe rules)](https://indicative.adonisjs.com/sanitizations/master/escape)

## 疑难解答和建议 Questions & Suggestions

Please open an issue [here](https://github.com/gaoyia/egg-indicative/issues).

点击 [这里](https://github.com/gaoyia/egg-indicative/issues)进行提问

## 查看更多文档 More API & Doc

[API & DOC](https://indicative.adonisjs.com/guides/master/introduction)

## License

[MIT](LICENSE)
