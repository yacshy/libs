/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue"
  ],
  plugins: ["stylelint-order"],
  rules: {
    "no-empty-source": null,
    "scss/dollar-variable-pattern": null,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "property-no-vendor-prefix": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "rule-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-comment"]
      }
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["use", "apply", "tailwind"]
      }
    ],

    "order/properties-order": [
      // 位置属性
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "float",
      // 大小
      "width",
      "height",
      "padding",
      "margin",
      // 文字系列
      "font",
      "line-height",
      "letter-spacing",
      "color",
      "text-align",
      // 背景边框
      "background",
      "border",
      "border-radius",
      // 其他
      "animation",
      "transform",
      "transition"
    ]
  }
};
