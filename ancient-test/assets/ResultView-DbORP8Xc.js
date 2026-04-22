var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { d as defineComponent, w as watch, c as createElementBlock, a as createBaseVNode, n as normalizeStyle, u as unref, t as toDisplayString, f as normalizeClass, g as createCommentVNode, l as createTextVNode, F as Fragment, r as renderList, k as computed, o as openBlock, h as ref, i as onMounted, j as createBlock, m as useRoute, e as useRouter } from "./index-dZW530NG.js";
import { a as getElementNameCN, l as loadData, g as getDataVersion } from "./dataLoader-Dc-FQg60.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1$1 = { class: "max-w-[375px] mx-auto min-h-screen flex flex-col px-4 py-4 relative" };
const _hoisted_2$1 = { class: "fixed-bg-layer" };
const _hoisted_3$1 = { class: "mb-4 flex-shrink-0 relative z-10" };
const _hoisted_4$1 = { class: "flex items-center justify-between" };
const _hoisted_5$1 = ["src"];
const _hoisted_6$1 = { class: "scroll-container relative z-10 flex-1 min-h-0" };
const _hoisted_7 = { class: "flex flex-col gap-4 p-1" };
const _hoisted_8 = { class: "large-image-container relative" };
const _hoisted_9 = ["src", "alt"];
const _hoisted_10 = { class: "text-center mb-6 mx-4" };
const _hoisted_11 = { class: "text-4xl font-calligraphy text-xuanming-dai-blue title-extra-spacing mb-3 tracking-widest" };
const _hoisted_12 = { class: "flex flex-wrap items-center justify-center gap-3 mb-2" };
const _hoisted_13 = {
  key: 0,
  class: "flex flex-wrap items-center justify-center gap-3 mb-4"
};
const _hoisted_14 = { class: "text-sm font-medium" };
const _hoisted_15 = { class: "mb-8 mx-4" };
const _hoisted_16 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_17 = {
  key: 0,
  class: "mt-3 mb-6"
};
const _hoisted_18 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_19 = { class: "mb-3" };
const _hoisted_20 = { class: "dimension-grid" };
const _hoisted_21 = { class: "flex justify-between items-center mb-1" };
const _hoisted_22 = { class: "h-1.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_23 = { class: "mt-3 space-y-3" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ResultDisplay",
  props: {
    identity: {},
    scores: {},
    distribution: {},
    balance: {},
    elementInfo: {}
  },
  emits: ["restart", "view-analysis", "share", "jump-to-miniprogram"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const baseUrl = "./";
    const IDENTITY_IMAGE_MAP = {
      "0000-金": "01_孤松隐者.png",
      "0000-木": "02_东篱居士.png",
      "0000-水": "03_云水散人.png",
      "0000-火": "04_醉吟狂客.png",
      "0000-土": "05_山居诗人.png",
      "0001-金": "06_野鹤闲云.png",
      "0001-木": "07_和风闲客.png",
      "0001-水": "08_随波行者.png",
      "0001-火": "09_狂歌浪子.png",
      "0001-土": "10_稳居闲客.png",
      "0010-金": "11_冰心清臣.png",
      "0010-木": "12_望鹤雅士.png",
      "0010-水": "13_镜湖静臣.png",
      "0010-火": "14_清谏直臣.png",
      "0010-土": "15_砥柱重臣.png",
      "0011-金": "16_龙剑藏锋.png",
      "0011-木": "17_卧雪隐客.png",
      "0011-水": "18_潜蛟伏士.png",
      "0011-火": "19_明烛智主.png",
      "0011-土": "20_待风稳客.png",
      "0100-金": "21_听潮剑隐.png",
      "0100-木": "22_润雨剑客.png",
      "0100-水": "23_流云剑者.png",
      "0100-火": "24_赤焰剑侠.png",
      "0100-土": "25_守心剑士.png",
      "0101-金": "26_连环谋士.png",
      "0101-木": "27_化局策士.png",
      "0101-水": "28_隐策智者.png",
      "0101-火": "29_燎原智主.png",
      "0101-土": "30_弈局谋者.png",
      "0110-金": "31_铁衣戍尉.png",
      "0110-木": "32_青松镇守.png",
      "0110-水": "33_冰河隐卫.png",
      "0110-火": "34_烽火忠尉.png",
      "0110-土": "35_磐石戍卫.png",
      "0111-金": "36_潜鳞隐将.png",
      "0111-木": "37_隐林伏将.png",
      "0111-水": "38_暗流移军.png",
      "0111-火": "39_灰烬复将.png",
      "0111-土": "40_蛰土伺守.png",
      "1000-金": "41_金声先生.png",
      "1000-木": "42_桃李夫子.png",
      "1000-水": "43_墨池文士.png",
      "1000-火": "44_青灯传师.png",
      "1000-土": "45_茅庐研士.png",
      "1001-金": "46_断局军师.png",
      "1001-木": "47_妙策参谋.png",
      "1001-水": "48_映谋智囊.png",
      "1001-火": "49_燎原谋星.png",
      "1001-土": "50_稳局参事.png",
      "1010-金": "51_金马文宗.png",
      "1010-木": "52_春华侍读.png",
      "1010-水": "53_润政笔相.png",
      "1010-火": "54_焚心净臣.png",
      "1010-土": "55_稳砚史官.png",
      "1011-金": "56_丹心铁相.png",
      "1011-木": "57_柔枢宰辅.png",
      "1011-水": "58_变法权相.png",
      "1011-火": "59_燎原首辅.png",
      "1011-土": "60_盘根阁老.png",
      "1100-金": "61_卫道豪客.png",
      "1100-木": "62_扶世仁者.png",
      "1100-水": "63_纳川义士.png",
      "1100-火": "64_燃光豪士.png",
      "1100-土": "65_筑基信侠.png",
      "1101-金": "66_算局隐师.png",
      "1101-木": "67_借风棋手.png",
      "1101-水": "68_镜照智者.png",
      "1101-火": "69_燎原炎策.png",
      "1101-土": "70_伺机潜龙.png",
      "1110-金": "71_铁血都护.png",
      "1110-木": "72_苍松都统.png",
      "1110-水": "73_寒河都督.png",
      "1110-火": "74_烽火总兵.png",
      "1110-土": "75_铁石节度.png",
      "1111-金": "76_铁腕督帅.png",
      "1111-木": "77_隐林军谋.png",
      "1111-水": "78_诡道参军.png",
      "1111-火": "79_燎原军魂.png",
      "1111-土": "80_盘根枢辅.png"
    };
    const WUXING_COLORS = {
      metal: {
        bg: "bg-amber-50/60",
        bgLight: "bg-amber-50/30",
        bgGradientEnd: "to-amber-100/40",
        text: "text-amber-700",
        textLight: "text-amber-600",
        border: "border-amber-200",
        dot: "bg-amber-500",
        progress: "bg-amber-500"
      },
      wood: {
        bg: "bg-emerald-50/60",
        bgLight: "bg-emerald-50/30",
        bgGradientEnd: "to-emerald-100/40",
        text: "text-emerald-700",
        textLight: "text-emerald-600",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        progress: "bg-emerald-500"
      },
      water: {
        bg: "bg-blue-50/60",
        bgLight: "bg-blue-50/30",
        bgGradientEnd: "to-blue-100/40",
        text: "text-blue-700",
        textLight: "text-blue-600",
        border: "border-blue-200",
        dot: "bg-blue-500",
        progress: "bg-blue-500"
      },
      fire: {
        bg: "bg-red-50/60",
        bgLight: "bg-red-50/30",
        bgGradientEnd: "to-red-100/40",
        text: "text-red-700",
        textLight: "text-red-600",
        border: "border-red-200",
        dot: "bg-red-500",
        progress: "bg-red-500"
      },
      earth: {
        bg: "bg-yellow-50/60",
        bgLight: "bg-yellow-50/30",
        bgGradientEnd: "to-yellow-100/40",
        text: "text-yellow-700",
        textLight: "text-yellow-600",
        border: "border-yellow-200",
        dot: "bg-yellow-500",
        progress: "bg-yellow-500"
      }
    };
    const currentElement = computed(() => {
      const element = props.identity.element || "wood";
      const elementStr = element;
      if (elementStr === "金" || elementStr === "木" || elementStr === "水" || elementStr === "火" || elementStr === "土") {
        const elementMap = {
          "金": "metal",
          "木": "wood",
          "水": "water",
          "火": "fire",
          "土": "earth"
        };
        const result2 = elementMap[elementStr];
        console.log(`[五行颜色调试] 中文五行转换: identity.element="${elementStr}" -> "${result2}"`);
        return result2;
      }
      const validElements = ["metal", "wood", "water", "fire", "earth"];
      const result = validElements.includes(elementStr) ? elementStr : "wood";
      console.log(`[五行颜色调试] 英文五行: identity.element="${elementStr}" -> "${result}"`);
      return result;
    });
    const elementColors = computed(() => {
      const colors = WUXING_COLORS[currentElement.value] || WUXING_COLORS.wood;
      console.log(`[五行颜色调试] currentElement="${currentElement.value}", colors=`, colors);
      return colors;
    });
    const identityImageUrl = computed(() => {
      if (props.identity.image_url) {
        console.log(`[图片映射] 使用image_url: ${props.identity.image_url}`);
        return props.identity.image_url;
      }
      const identityId = props.identity.id || props.identity.code;
      const identityName = props.identity.name;
      if (identityId && IDENTITY_IMAGE_MAP[identityId]) {
        const filename = IDENTITY_IMAGE_MAP[identityId];
        console.log(`[图片映射] ${identityId} -> ${filename}`);
        return `${baseUrl}images/identities/${filename}`;
      }
      if (identityName) {
        for (const [key, filename] of Object.entries(IDENTITY_IMAGE_MAP)) {
          if (filename.includes(identityName)) {
            console.log(`[图片映射] 使用名称回退匹配: ${identityName} -> ${filename}`);
            return `${baseUrl}images/identities/${filename}`;
          }
        }
      }
      console.warn(`[图片映射] 未找到图片: id=${identityId}, name=${identityName}`);
      return `${baseUrl}images/identities/default.png`;
    });
    const identityElementName = computed(() => {
      return getElementNameCN(props.identity.element);
    });
    const displayDescription = computed(() => {
      return props.identity.core_description || props.identity.description || "";
    });
    const displayTraits = computed(() => {
      return props.identity.traits || [];
    });
    const hasValidTraits = computed(() => {
      const traits = displayTraits.value;
      if (!traits || traits.length === 0) return false;
      return traits.some((trait) => trait && trait.trim() !== "" && trait !== "待补充");
    });
    const displayDailyPractice = computed(() => {
      return props.identity.daily_practice || "";
    });
    const hasValidContent = (text) => {
      if (!text) return false;
      return text.trim() !== "" && text !== "待补充";
    };
    const displaySelfCultivation = computed(() => {
      return props.identity.self_cultivation || "";
    });
    const displayHistoricalFigures = computed(() => {
      return props.identity.historical_figures || "";
    });
    const displayCategory = computed(() => {
      return props.identity.category || "";
    });
    const dimensionScores = computed(() => {
      const result = [];
      if (props.scores) {
        const secularScore = Math.round((props.scores.wood + props.scores.water) / 2);
        const literaryScore = Math.round((props.scores.metal + props.scores.earth) / 2);
        const folkScore = Math.round((props.scores.fire + props.scores.water) / 2);
        const integrityScore = Math.round((props.scores.wood + props.scores.earth) / 2);
        result.push({ name: "出世", score: secularScore, desc: "超然物外" });
        result.push({ name: "文治", score: literaryScore, desc: "诗书传家" });
        result.push({ name: "江湖", score: folkScore, desc: "隐逸民间" });
        result.push({ name: "守正", score: integrityScore, desc: "持守本心" });
      } else if (props.distribution && Object.keys(props.distribution).length > 0) {
        const dist = props.distribution;
        result.push({ name: "出世", score: dist["出世"] || dist["secular"] || 65, desc: "超然物外" });
        result.push({ name: "文治", score: dist["文治"] || dist["literary"] || 50, desc: "诗书传家" });
        result.push({ name: "江湖", score: dist["江湖"] || dist["folk"] || 55, desc: "隐逸民间" });
        result.push({ name: "守正", score: dist["守正"] || dist["integrity"] || 80, desc: "持守本心" });
      } else {
        result.push({ name: "出世", score: 65, desc: "超然物外" });
        result.push({ name: "文治", score: 50, desc: "诗书传家" });
        result.push({ name: "江湖", score: 55, desc: "隐逸民间" });
        result.push({ name: "守正", score: 80, desc: "持守本心" });
      }
      return result;
    });
    const dimensionGridItems = computed(() => {
      return dimensionScores.value.map((dim) => {
        const name = dim.name;
        const labelMap = {
          "出世": "出世文智",
          "文治": "文治武功",
          "江湖": "江湖守正",
          "守正": "守正之心"
        };
        return __spreadProps(__spreadValues({}, dim), {
          displayName: name,
          displayLabel: labelMap[name] || name
        });
      });
    });
    const imageLoaded = ref(false);
    const onImageLoad = () => {
      imageLoaded.value = true;
    };
    const onImageError = () => {
      imageLoaded.value = false;
    };
    watch(() => props.identity.id, () => {
      imageLoaded.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "absolute inset-0 bg-[#f8f9fa]" }, null, -1)),
          createBaseVNode("div", {
            class: "absolute inset-0 bg-center bg-cover",
            style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/optimized_bg_3.png')`, opacity: 0.4 })
          }, null, 4),
          createBaseVNode("div", {
            class: "absolute inset-0 bg-center bg-cover",
            style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/light_bg_2.png')`, opacity: 0.6 })
          }, null, 4)
        ]),
        createBaseVNode("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("img", {
              src: `${unref(baseUrl)}images/清和居_logo_64x64.png`,
              alt: "清和居",
              class: "w-10 h-10"
            }, null, 8, _hoisted_5$1),
            _cache[5] || (_cache[5] = createBaseVNode("h1", { class: "text-lg font-medium text-xuanming-dai-blue font-calligraphy title-extra-spacing" }, "心镜照见·测试结果", -1)),
            _cache[6] || (_cache[6] = createBaseVNode("div", { class: "w-10" }, null, -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_6$1, [
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("div", {
              class: "auto-height-card card-with-texture rounded-2xl shadow-xuan-window p-0 overflow-hidden",
              style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/paper_texture_01.png')` })
            }, [
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("img", {
                  src: identityImageUrl.value,
                  alt: __props.identity.name,
                  class: "w-full h-full object-contain opacity-90 rounded-t-2xl",
                  onLoad: onImageLoad,
                  onError: onImageError
                }, null, 40, _hoisted_9)
              ]),
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("h2", _hoisted_11, toDisplayString(__props.identity.name), 1),
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("span", {
                    class: normalizeClass([
                      "px-4 py-2 rounded-full text-base font-semibold shadow-sm font-calligraphy tracking-wider",
                      elementColors.value.bg,
                      elementColors.value.text
                    ])
                  }, " 五行属" + toDisplayString(identityElementName.value), 3),
                  __props.identity.element_desc ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(["text-sm font-medium px-3 py-1.5 rounded-lg", elementColors.value.bg, elementColors.value.text])
                  }, toDisplayString(__props.identity.element_desc), 3)) : createCommentVNode("", true)
                ]),
                displayHistoricalFigures.value || displayCategory.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
                  displayHistoricalFigures.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["flex items-center gap-2 px-4 py-2 rounded-xl border", elementColors.value.bgLight, elementColors.value.border, elementColors.value.text])
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["w-2 h-2 rounded-full", elementColors.value.dot])
                    }, null, 2),
                    createBaseVNode("span", _hoisted_14, "代表人物: " + toDisplayString(displayHistoricalFigures.value), 1)
                  ], 2)) : createCommentVNode("", true),
                  displayCategory.value ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: normalizeClass([
                      "px-4 py-2 text-base font-semibold rounded-xl border shadow-sm font-calligraphy tracking-wider",
                      elementColors.value.bgLight,
                      elementColors.value.border,
                      elementColors.value.text
                    ])
                  }, toDisplayString(displayCategory.value), 3)) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ]),
              displayDescription.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["mb-6 p-4 rounded-xl mx-4", elementColors.value.bg, elementColors.value.border])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-base font-medium mb-2 flex items-center font-calligraphy tracking-wider", elementColors.value.text])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-2 h-2 rounded-full mr-2", elementColors.value.dot])
                  }, null, 2),
                  _cache[7] || (_cache[7] = createTextVNode(" 核心描述 ", -1))
                ], 2),
                createBaseVNode("p", {
                  class: normalizeClass(["leading-relaxed text-sm tracking-widest", elementColors.value.text])
                }, toDisplayString(displayDescription.value), 3)
              ], 2)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-base font-medium mb-3 flex items-center font-calligraphy tracking-wider", elementColors.value.text])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-2 h-2 rounded-full mr-2", elementColors.value.dot])
                  }, null, 2),
                  _cache[8] || (_cache[8] = createTextVNode(" 四维分析概览 ", -1))
                ], 2),
                createBaseVNode("div", _hoisted_16, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(dimensionGridItems.value, (dim) => {
                    return openBlock(), createElementBlock("div", {
                      key: dim.name,
                      class: normalizeClass(["text-center p-3 rounded-xl border", elementColors.value.bg, elementColors.value.border])
                    }, [
                      createBaseVNode("div", {
                        class: normalizeClass(["text-lg font-calligraphy mb-1", elementColors.value.text])
                      }, toDisplayString(dim.displayLabel), 3),
                      createBaseVNode("div", {
                        class: normalizeClass(["text-xs", elementColors.value.textLight || elementColors.value.text])
                      }, toDisplayString(dim.desc), 3)
                    ], 2);
                  }), 128))
                ])
              ])
            ], 4),
            createBaseVNode("div", {
              class: "auto-height-card card-with-texture rounded-2xl shadow-xuan-window p-5",
              style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/paper_texture_01.png')` })
            }, [
              hasValidTraits.value ? (openBlock(), createElementBlock("div", _hoisted_17, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium mb-3 flex items-center font-calligraphy tracking-wider", elementColors.value.text])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-1.5 h-1.5 rounded-full mr-2", elementColors.value.dot])
                  }, null, 2),
                  _cache[9] || (_cache[9] = createTextVNode(" 性格特质 ", -1))
                ], 2),
                createBaseVNode("div", _hoisted_18, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(displayTraits.value.slice(0, 4), (trait, index) => {
                    return openBlock(), createElementBlock("span", {
                      key: index,
                      class: normalizeClass([
                        "px-2 py-1.5 rounded-xl border text-xs font-medium shadow-sm text-center tracking-wider",
                        elementColors.value.bg,
                        elementColors.value.border,
                        elementColors.value.text
                      ]),
                      style: { wordBreak: "keep-all", lineHeight: "1.2" }
                    }, toDisplayString(trait), 3);
                  }), 128)),
                  displayTraits.value.length > 4 ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass([
                      "px-2 py-1.5 rounded-xl border text-xs font-medium shadow-sm text-center tracking-wider col-span-2",
                      elementColors.value.bg,
                      elementColors.value.border,
                      elementColors.value.text
                    ])
                  }, toDisplayString(displayTraits.value[4]), 3)) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              hasValidContent(displayDailyPractice.value) ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["mb-4 p-3 rounded-xl", elementColors.value.bg])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium mb-2 flex items-center font-calligraphy tracking-wider", elementColors.value.text])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-1.5 h-1.5 rounded-full mr-2", elementColors.value.dot])
                  }, null, 2),
                  _cache[10] || (_cache[10] = createTextVNode(" 日用常行 ", -1))
                ], 2),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs tracking-widest leading-relaxed", elementColors.value.textLight || elementColors.value.text])
                }, toDisplayString(displayDailyPractice.value), 3)
              ], 2)) : createCommentVNode("", true),
              hasValidContent(displaySelfCultivation.value) ? (openBlock(), createElementBlock("div", {
                key: 2,
                class: normalizeClass(["mb-4 p-3 rounded-xl", elementColors.value.bg])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium mb-2 flex items-center font-calligraphy tracking-wider", elementColors.value.text])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-1.5 h-1.5 rounded-full mr-2", elementColors.value.dot])
                  }, null, 2),
                  _cache[11] || (_cache[11] = createTextVNode(" 修身进德 ", -1))
                ], 2),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs tracking-widest leading-relaxed", elementColors.value.textLight || elementColors.value.text])
                }, toDisplayString(displaySelfCultivation.value), 3)
              ], 2)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium mb-3 flex items-center font-calligraphy tracking-wider", elementColors.value.text])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-1.5 h-1.5 rounded-full mr-2", elementColors.value.dot])
                  }, null, 2),
                  _cache[12] || (_cache[12] = createTextVNode(" 四维分析 ", -1))
                ], 2),
                createBaseVNode("div", _hoisted_20, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(dimensionScores.value, (dim) => {
                    return openBlock(), createElementBlock("div", {
                      key: dim.name,
                      class: normalizeClass(["p-3 rounded-xl", elementColors.value.bg])
                    }, [
                      createBaseVNode("div", _hoisted_21, [
                        createBaseVNode("span", {
                          class: normalizeClass(["text-xs", elementColors.value.textLight || elementColors.value.text])
                        }, toDisplayString(dim.name === "出世" ? "入世智慧" : dim.name === "文治" ? "文治武功" : dim.name === "江湖" ? "江湖守正" : "守正之心"), 3)
                      ]),
                      createBaseVNode("div", _hoisted_22, [
                        createBaseVNode("div", {
                          class: normalizeClass(["h-full rounded-full", elementColors.value.progress]),
                          style: normalizeStyle({ width: dim.score + "%" })
                        }, null, 6)
                      ])
                    ], 2);
                  }), 128))
                ])
              ])
            ], 4),
            createBaseVNode("div", {
              class: "auto-height-card card-with-texture rounded-2xl shadow-xuan-window p-5",
              style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/paper_texture_01.png')` })
            }, [
              createBaseVNode("div", _hoisted_23, [
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = ($event) => emit("restart")),
                  class: "w-full py-3 rounded-xl text-base font-medium font-calligraphy tracking-wider transition-all flex items-center justify-center gap-2",
                  style: { "background-color": "rgba(255,255,255,0.8)", "color": "#6b7280", "border": "1px solid #e5e7eb" }
                }, [..._cache[13] || (_cache[13] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    })
                  ], -1),
                  createTextVNode(" 重新测试 ", -1)
                ])]),
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = ($event) => emit("share")),
                  class: "w-full py-3 rounded-xl text-base font-medium font-calligraphy tracking-wider transition-all shadow-md flex items-center justify-center gap-2",
                  style: { "background-color": "#27ae60", "color": "white", "box-shadow": "0 4px 12px rgba(39,174,96,0.3)" }
                }, [..._cache[14] || (_cache[14] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    })
                  ], -1),
                  createTextVNode(" 分享结果 ", -1)
                ])]),
                createBaseVNode("button", {
                  onClick: _cache[2] || (_cache[2] = ($event) => emit("view-analysis")),
                  class: "w-full py-3 rounded-xl text-base font-medium font-calligraphy tracking-wider transition-all flex items-center justify-center gap-2",
                  style: { "background-color": "#1e90ff", "color": "white", "border": "1px solid rgba(30, 144, 255, 0.3)", "box-shadow": "0 4px 12px rgba(30, 144, 255, 0.3)" }
                }, [..._cache[15] || (_cache[15] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    })
                  ], -1),
                  createTextVNode(" 详细分析 ", -1)
                ])]),
                createBaseVNode("button", {
                  onClick: _cache[3] || (_cache[3] = ($event) => emit("jump-to-miniprogram")),
                  class: "w-full py-3 rounded-xl text-base font-medium font-calligraphy tracking-wider transition-all shadow-md flex items-center justify-center gap-2",
                  style: { "background": "linear-gradient(135deg, #f8f4e5 0%, #e6d3a6 100%)", "color": "#8b4513", "box-shadow": "0 4px 12px rgba(230, 211, 166, 0.2)", "border": "1px solid rgba(230, 211, 166, 0.4)" }
                }, [..._cache[16] || (_cache[16] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    })
                  ], -1),
                  createTextVNode(" 保存到小程序 ", -1)
                ])])
              ])
            ], 4)
          ])
        ]),
        _cache[17] || (_cache[17] = createBaseVNode("div", { class: "pt-4 pb-2 text-center flex-shrink-0 relative z-10" }, [
          createBaseVNode("p", { class: "text-xs text-gray-300" }, "寻古问心·照见本真 H5原型 v1.0")
        ], -1))
      ]);
    };
  }
});
const ResultDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-dc02099d"]]);
const CLOUD_ENV = "cloud1-d1gvjeokac1ac406d";
function calculateElementRatios(scores) {
  const total = scores.metal + scores.wood + scores.water + scores.fire + scores.earth;
  if (total === 0) {
    return [0.2, 0.2, 0.2, 0.2, 0.2];
  }
  const ratios = [
    Math.round(scores.metal / total * 100) / 100,
    Math.round(scores.wood / total * 100) / 100,
    Math.round(scores.water / total * 100) / 100,
    Math.round(scores.fire / total * 100) / 100,
    Math.round(scores.earth / total * 100) / 100
  ];
  const sum = ratios.reduce((a, b) => a + b, 0);
  if (sum !== 1) {
    const maxIndex = ratios.indexOf(Math.max(...ratios));
    ratios[maxIndex] += Math.round((1 - sum) * 100) / 100;
  }
  return ratios;
}
function getDominantElementCN(scores) {
  const elements = [
    { key: "metal", name: "金" },
    { key: "wood", name: "木" },
    { key: "water", name: "水" },
    { key: "fire", name: "火" },
    { key: "earth", name: "土" }
  ];
  let maxScore = -1;
  let dominant = elements[0];
  for (const el of elements) {
    if (scores[el.key] > maxScore) {
      maxScore = scores[el.key];
      dominant = el;
    }
  }
  return dominant.name;
}
function isWeixinBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") !== -1;
}
function saveResultAndGetUrls(identity, scores) {
  return __async(this, null, function* () {
    try {
      const cloudFunctionUrl = `https://${CLOUD_ENV}.service.tcloudbas.com.cn/saveIdentityResult`;
      const elementRatios = calculateElementRatios(scores);
      const requestData = {
        nickname: identity.name || "H5测试用户",
        identityCode: identity.code,
        identityName: identity.name,
        dimension: identity.category_desc || identity.dimension || "",
        elementRatios,
        elementScores: scores,
        dominantElement: getDominantElementCN(scores),
        source: "h5"
      };
      const response = yield fetch(cloudFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const result = yield response.json();
      if (result.success && result.schemeUrl) {
        return {
          schemeUrl: result.schemeUrl,
          jumpUrl: result.jumpUrl || result.schemeUrl
        };
      }
      console.error("云函数返回错误:", result.error);
      return null;
    } catch (error) {
      console.error("保存结果失败:", error);
      return null;
    }
  });
}
function jumpToMiniProgramWithIdentity(identity, scores) {
  return __async(this, null, function* () {
    const elementScores = scores || {
      metal: 0,
      wood: 0,
      water: 0,
      fire: 0,
      earth: 0
    };
    const result = yield saveResultAndGetUrls(identity, elementScores);
    if (result) {
      if (isWeixinBrowser()) {
        window.location.href = result.schemeUrl;
      } else {
        window.location.href = result.schemeUrl;
      }
    } else {
      console.warn("云函数调用失败，使用降级方案");
      const queryParams = new URLSearchParams({
        identityCode: identity.code,
        identityId: identity.id || identity.code,
        identityName: identity.name,
        from: "h5"
      });
      const fallbackScheme = `weixin://dl/business/?path=pages/index/index%3F${encodeURIComponent(queryParams.toString())}`;
      if (isWeixinBrowser()) {
        alert("即将跳转到小程序，请点击确定继续");
      }
      window.location.href = fallbackScheme;
    }
  });
}
const _hoisted_1 = { class: "min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-50 to-orange-100" };
const _hoisted_2 = { class: "w-full max-w-2xl" };
const _hoisted_3 = {
  key: 1,
  class: "mt-4 text-center"
};
const _hoisted_4 = { class: "w-full max-w-2xl mt-12 pt-6 border-t border-gray-200" };
const _hoisted_5 = { class: "text-center text-gray-500 text-sm" };
const _hoisted_6 = { class: "mb-2" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResultView",
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { identities: loadedIdentities } = loadData();
    const dataVersion = ref(getDataVersion());
    const identity = ref(null);
    const elementScores = ref(null);
    const isJumping = ref(false);
    onMounted(() => {
      const query = route.query;
      if (query.id || query.code) {
        let foundIdentity = null;
        if (query.id) {
          foundIdentity = loadedIdentities.find((item) => item.id === query.id);
        }
        if (!foundIdentity && query.code) {
          foundIdentity = loadedIdentities.find((item) => item.code === query.code);
        }
        if (foundIdentity) {
          identity.value = foundIdentity;
        } else {
          identity.value = {
            id: query.id || query.code,
            code: query.code,
            name: query.name || "未知身份",
            dimension: query.dimension || "",
            description: query.description || "无法获取描述信息",
            element: "metal",
            // 默认值
            traits: []
          };
        }
        if (query.scores) {
          const scoresArr = query.scores.split(",").map(Number);
          if (scoresArr.length === 5 && scoresArr.every((n) => !isNaN(n))) {
            elementScores.value = {
              metal: scoresArr[0],
              wood: scoresArr[1],
              water: scoresArr[2],
              fire: scoresArr[3],
              earth: scoresArr[4]
            };
          }
        }
      } else {
        router.push("/quiz");
      }
    });
    const handleRestart = () => {
      router.push("/quiz");
    };
    const handleViewAnalysis = () => {
      alert("详细分析功能将在后续版本中提供");
    };
    const handleShare = () => {
      if (!identity.value) return;
      const shareText = `我测出古代身份是【${identity.value.name}】！快来测试你的古代身份吧！`;
      const shareUrl = window.location.origin + window.location.pathname;
      if (navigator.share) {
        navigator.share({
          title: "古代身份测试结果",
          text: shareText,
          url: shareUrl
        }).catch((err) => {
          console.log("分享取消:", err);
        });
      } else {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
          alert("结果已复制到剪贴板！");
        }).catch((err) => {
          console.error("复制失败:", err);
          alert("请手动复制结果");
        });
      }
    };
    const handleJumpToMiniProgram = () => __async(this, null, function* () {
      if (!identity.value) return;
      isJumping.value = true;
      try {
        yield jumpToMiniProgramWithIdentity(identity.value, elementScores.value);
      } catch (error) {
        console.error("跳转失败:", error);
        alert("跳转失败，请稍后重试");
      } finally {
        setTimeout(() => {
          isJumping.value = false;
        }, 3e3);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[3] || (_cache[3] = createBaseVNode("header", { class: "w-full max-w-2xl mb-8 text-center" }, [
          createBaseVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-2" }, "测试结果"),
          createBaseVNode("p", { class: "text-gray-600" }, "探寻你隐藏的古代人格")
        ], -1)),
        createBaseVNode("div", _hoisted_2, [
          identity.value ? (openBlock(), createBlock(ResultDisplay, {
            key: 0,
            identity: identity.value,
            scores: elementScores.value,
            onRestart: handleRestart,
            onViewAnalysis: handleViewAnalysis,
            onShare: handleShare,
            onJumpToMiniprogram: handleJumpToMiniProgram
          }, null, 8, ["identity", "scores"])) : createCommentVNode("", true),
          isJumping.value ? (openBlock(), createElementBlock("div", _hoisted_3, [..._cache[0] || (_cache[0] = [
            createBaseVNode("div", { class: "inline-flex items-center px-6 py-3 bg-amber-100 border border-amber-200 rounded-lg text-amber-700" }, [
              createBaseVNode("svg", {
                class: "animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500",
                fill: "none",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("circle", {
                  class: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  "stroke-width": "4"
                }),
                createBaseVNode("path", {
                  class: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                })
              ]),
              createTextVNode(" 正在保存并跳转... ")
            ], -1)
          ])])) : createCommentVNode("", true)
        ]),
        createBaseVNode("footer", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, "古代身份测试 H5原型 v1.1 • 数据版本: " + toDisplayString(dataVersion.value), 1),
            _cache[1] || (_cache[1] = createBaseVNode("p", { class: "text-gray-400 text-xs" }, " 本测试基于五行理论和四维二元框架，结果仅供参考 ", -1)),
            _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-gray-400 text-xs mt-1" }, " 测试数据持续优化中，欢迎提供反馈 ", -1))
          ])
        ])
      ]);
    };
  }
});
const ResultView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a9e15631"]]);
export {
  ResultView as default
};
//# sourceMappingURL=ResultView-DbORP8Xc.js.map
