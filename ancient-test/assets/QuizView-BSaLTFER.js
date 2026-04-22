import { d as defineComponent, c as createElementBlock, n as normalizeStyle, u as unref, a as createBaseVNode, t as toDisplayString, F as Fragment, r as renderList, o as openBlock, f as normalizeClass, g as createCommentVNode, h as ref, i as onMounted, j as createBlock, k as computed, e as useRouter } from "./index-dZW530NG.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { E as ELEMENT_MAP_REVERSE, l as loadData, g as getDataVersion } from "./dataLoader-Dc-FQg60.js";
const _hoisted_1$1 = { class: "flex justify-between items-center mb-4" };
const _hoisted_2$1 = { class: "text-sm text-gray-400 tracking-widest" };
const _hoisted_3$1 = { class: "text-lg font-medium text-[#2c3e50] mb-6 leading-relaxed tracking-widest" };
const _hoisted_4$1 = { class: "space-y-3" };
const _hoisted_5$1 = ["onClick"];
const _hoisted_6$1 = {
  key: 0,
  class: "w-5 h-5 text-white",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_7$1 = { class: "mt-6 pt-4 border-t border-gray-200/50" };
const _hoisted_8$1 = { class: "text-sm text-gray-500 text-center tracking-widest" };
const _hoisted_9$1 = { key: 0 };
const _hoisted_10$1 = { key: 1 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "QuestionCard",
  props: {
    question: {},
    currentIndex: {},
    selectedOption: {}
  },
  emits: ["select", "goto-question"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const baseUrl = "./";
    const emit = __emit;
    const handleSelect = (optionIndex) => {
      emit("select", optionIndex);
    };
    const chineseNumbers = ["壹", "贰", "叁", "肆"];
    const getOptionClass = (_option, optionIndex) => {
      if (props.selectedOption === optionIndex) {
        return "group flex items-center space-x-3 p-4 rounded-2xl cursor-pointer transition-all selected-option";
      } else {
        return "group flex items-center space-x-3 p-4 rounded-2xl cursor-pointer transition-all unselected-option";
      }
    };
    const getOptionLetter = (index) => {
      return chineseNumbers[index] || String(index + 1);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "card-with-texture rounded-3xl shadow-xuan-card p-6",
        style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/paper_texture_01.png')` })
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("span", _hoisted_2$1, "问题 " + toDisplayString(__props.currentIndex + 1), 1),
          _cache[0] || (_cache[0] = createBaseVNode("span", { class: "px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full tracking-widest" }, "单选", -1))
        ]),
        createBaseVNode("p", _hoisted_3$1, toDisplayString(__props.question.text), 1),
        createBaseVNode("div", _hoisted_4$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.question.options, (option, index) => {
            return openBlock(), createElementBlock("div", {
              key: option.id,
              onClick: ($event) => handleSelect(index),
              class: normalizeClass(getOptionClass(option, index))
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["option-circle w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-calligraphy", __props.selectedOption === index ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"])
              }, toDisplayString(getOptionLetter(index)), 3),
              createBaseVNode("span", {
                class: normalizeClass(["flex-1 text-sm tracking-widest", __props.selectedOption === index ? "text-white" : "text-gray-600"])
              }, toDisplayString(option.text), 3),
              __props.selectedOption === index ? (openBlock(), createElementBlock("svg", _hoisted_6$1, [..._cache[1] || (_cache[1] = [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                  "clip-rule": "evenodd"
                }, null, -1)
              ])])) : createCommentVNode("", true)
            ], 10, _hoisted_5$1);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_7$1, [
          createBaseVNode("p", _hoisted_8$1, [
            __props.selectedOption === void 0 || __props.selectedOption < 0 ? (openBlock(), createElementBlock("span", _hoisted_9$1, " 请选择一个最符合你的选项 ")) : (openBlock(), createElementBlock("span", _hoisted_10$1, " 已选择，请点击其他选项可更改 "))
          ])
        ])
      ], 4);
    };
  }
});
const QuestionCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-32e7d9bb"]]);
function parseFourDimensionText(text) {
  if (!text || typeof text !== "string") {
    return [0, 0, 0, 0];
  }
  const parts = text.split("+").map((part) => part.trim());
  if (parts.length !== 4) {
    console.warn(`Invalid four dimension text format: "${text}". Expected 4 parts separated by '+'.`);
    return [0, 0, 0, 0];
  }
  const result = [];
  const dimensionMaps = [
    // 维度0: 出世(0) vs 入世(1)
    { "出世": 0, "入世": 1 },
    // 维度1: 文(0) vs 武(1)
    { "文": 0, "武": 1 },
    // 维度2: 江湖(0) vs 庙堂(1)
    { "江湖": 0, "庙堂": 1 },
    // 维度3: 守正(0) vs 权变(1)
    { "守正": 0, "权变": 1 }
  ];
  for (let i = 0; i < 4; i++) {
    const part = parts[i];
    const map = dimensionMaps[i];
    if (part in map) {
      const value = map[part];
      if (value !== void 0) {
        result.push(value);
      } else {
        result.push(0);
      }
    } else {
      console.warn(`Unknown dimension value "${part}" at position ${i}. Using default 0.`);
      result.push(0);
    }
  }
  return result;
}
function calculateDimensionCode(questions, selectedOptions) {
  const dimensionCounts = Array(4).fill(0).map(() => ({ zero: 0, one: 0 }));
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const selectedIndex = selectedOptions[i];
    if (selectedIndex >= 0 && selectedIndex < question.options.length) {
      const option = question.options[selectedIndex];
      if (option.fourDimensionText) {
        const dimensionValues = parseFourDimensionText(option.fourDimensionText);
        for (let dim = 0; dim < 4; dim++) {
          if (dimensionValues[dim] === 0) {
            dimensionCounts[dim].zero++;
          } else if (dimensionValues[dim] === 1) {
            dimensionCounts[dim].one++;
          }
        }
      }
    }
  }
  let code = "";
  for (let dim = 0; dim < 4; dim++) {
    const counts = dimensionCounts[dim];
    if (counts.zero + counts.one === 0) {
      code += "0";
    } else if (counts.one > counts.zero) {
      code += "1";
    } else {
      code += "0";
    }
  }
  return code;
}
function determineIdentityV2(scores, dimensionCode, identities) {
  const dominantElement = getDominantElement(scores);
  const dominantElementCN = ELEMENT_MAP_REVERSE[dominantElement];
  const targetId = `${dimensionCode}-${dominantElementCN}`;
  for (const identity of identities) {
    if (identity.id === targetId) {
      return identity;
    }
  }
  const matchingByCode = identities.filter(
    (identity) => identity.code && identity.code === dimensionCode
  );
  if (matchingByCode.length > 0) {
    const matchingByElement = matchingByCode.filter(
      (identity) => identity.element === dominantElement
    );
    if (matchingByElement.length > 0) {
      return matchingByElement[0];
    }
    return matchingByCode[0];
  }
  console.warn(`No identity found for ID: ${targetId}. Falling back to v1.1 logic.`);
  return determineIdentityV1(scores, identities);
}
function calculateScores(questions, selectedOptions) {
  const scores = {
    metal: 0,
    wood: 0,
    water: 0,
    fire: 0,
    earth: 0
  };
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const selectedIndex = selectedOptions[i];
    if (selectedIndex >= 0 && selectedIndex < question.options.length) {
      const option = question.options[selectedIndex];
      const weights = option.weights;
      scores.metal += weights.metal || 0;
      scores.wood += weights.wood || 0;
      scores.water += weights.water || 0;
      scores.fire += weights.fire || 0;
      scores.earth += weights.earth || 0;
    }
  }
  return scores;
}
function getDominantElement(scores) {
  const elements = ["metal", "wood", "water", "fire", "earth"];
  let dominant = "metal";
  let maxScore = -1;
  for (const element of elements) {
    if (scores[element] > maxScore) {
      maxScore = scores[element];
      dominant = element;
    }
  }
  return dominant;
}
function determineIdentityV1(scores, identities) {
  const dominantElement = getDominantElement(scores);
  const matchingIdentities = identities.filter(
    (identity) => identity.element === dominantElement
  );
  if (matchingIdentities.length === 0) {
    return identities[0];
  }
  return matchingIdentities[0];
}
function determineIdentityAuto(questions, selectedOptions, identities) {
  const hasFourDimensionData = questions.some(
    (question) => question.options.some((option) => option.fourDimensionText)
  );
  if (hasFourDimensionData) {
    const scores = calculateScores(questions, selectedOptions);
    const dimensionCode = calculateDimensionCode(questions, selectedOptions);
    return determineIdentityV2(scores, dimensionCode, identities);
  } else {
    const scores = calculateScores(questions, selectedOptions);
    return determineIdentityV1(scores, identities);
  }
}
const _hoisted_1 = { class: "quiz-container min-h-screen flex flex-col items-center relative overflow-hidden" };
const _hoisted_2 = { class: "relative z-10 w-full max-w-[375px] min-h-screen flex flex-col px-4 py-4" };
const _hoisted_3 = { class: "mb-5" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-sm text-gray-400 tracking-widest" };
const _hoisted_6 = { class: "h-1.5 bg-gray-200 rounded-full overflow-hidden mt-4" };
const _hoisted_7 = { class: "flex-1 mt-10" };
const _hoisted_8 = { class: "mt-6" };
const _hoisted_9 = { class: "flex justify-between items-center gap-4" };
const _hoisted_10 = {
  key: 1,
  class: "flex-1"
};
const _hoisted_11 = { class: "mt-6" };
const _hoisted_12 = { class: "group" };
const _hoisted_13 = { class: "mt-4 pt-4 border-t border-gray-200/50" };
const _hoisted_14 = { class: "grid grid-cols-7 gap-2" };
const _hoisted_15 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizView",
  setup(__props) {
    const router = useRouter();
    const baseUrl = "./";
    const { questions: loadedQuestions, identities: loadedIdentities } = loadData();
    ref(getDataVersion());
    const questions = ref(loadedQuestions);
    const identities = ref(loadedIdentities);
    const currentIndex = ref(0);
    const selectedOptions = ref(Array(loadedQuestions.length).fill(-1));
    const isComplete = computed(() => currentIndex.value >= questions.value.length);
    const currentQuestion = computed(() => questions.value[currentIndex.value]);
    const handleSelect = (optionIndex) => {
      selectedOptions.value[currentIndex.value] = optionIndex;
      if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++;
      } else {
        const identity = determineIdentityAuto(questions.value, selectedOptions.value, identities.value);
        const scores = calculateScores(questions.value, selectedOptions.value);
        const scoresStr = `${scores.metal},${scores.wood},${scores.water},${scores.fire},${scores.earth}`;
        router.push({
          path: "/result",
          query: {
            id: identity.id || identity.code,
            // v2.0使用id，v1.1回退到code
            code: identity.code,
            name: identity.name,
            dimension: identity.dimension,
            description: identity.description,
            scores: scoresStr
          }
        });
      }
    };
    const handlePrevious = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };
    const handleRestart = () => {
      currentIndex.value = 0;
      selectedOptions.value = Array(loadedQuestions.length).fill(-1);
    };
    const handleGotoQuestion = (index) => {
      currentIndex.value = index;
    };
    onMounted(() => {
      console.log("古代身份测试H5原型 v2.9");
      console.log(`加载了 ${questions.value.length} 道题目`);
      console.log(`加载了 ${identities.value.length} 种身份类型`);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[5] || (_cache[5] = createBaseVNode("div", { class: "absolute inset-0 bg-[#f8f9fa]" }, null, -1)),
        createBaseVNode("div", {
          class: "absolute inset-0 bg-center bg-cover opacity-40",
          style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/optimized_bg_3.png')` })
        }, null, 4),
        createBaseVNode("div", {
          class: "absolute inset-0 bg-center bg-cover opacity-60",
          style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/light_bg_2.png')` })
        }, null, 4),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "w-14" }, null, -1)),
              _cache[2] || (_cache[2] = createBaseVNode("h1", { class: "text-xl font-medium text-[#2c3e50] font-calligraphy title-extra-spacing" }, "寻古问心·照见本真", -1)),
              createBaseVNode("span", _hoisted_5, toDisplayString(currentIndex.value + 1) + "/" + toDisplayString(questions.value.length), 1)
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", {
                class: "h-full bg-[#2c3e50] rounded-full transition-all duration-500 ease-out",
                style: normalizeStyle({ width: `${(currentIndex.value + 1) / questions.value.length * 100}%` })
              }, null, 4)
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            currentQuestion.value ? (openBlock(), createBlock(QuestionCard, {
              key: 0,
              question: currentQuestion.value,
              "current-index": currentIndex.value,
              "selected-option": selectedOptions.value[currentIndex.value],
              onSelect: handleSelect,
              onGotoQuestion: handleGotoQuestion
            }, null, 8, ["question", "current-index", "selected-option"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              currentIndex.value > 0 ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: handlePrevious,
                class: "flex-1 py-3 rounded-2xl text-base font-medium transition-all font-calligraphy tracking-widest btn-prev"
              }, " 上一题 ")) : (openBlock(), createElementBlock("div", _hoisted_10)),
              selectedOptions.value[currentIndex.value] >= 0 && currentIndex.value < questions.value.length - 1 ? (openBlock(), createElementBlock("button", {
                key: 2,
                onClick: _cache[0] || (_cache[0] = ($event) => handleSelect(selectedOptions.value[currentIndex.value])),
                class: "flex-1 py-3 rounded-2xl text-base font-medium transition-all shadow-md font-calligraphy tracking-widest btn-next"
              }, " 下一题 ")) : createCommentVNode("", true),
              isComplete.value ? (openBlock(), createElementBlock("button", {
                key: 3,
                onClick: handleRestart,
                class: "flex-1 py-3 rounded-2xl text-base font-medium transition-all shadow-md font-calligraphy tracking-widest btn-restart"
              }, " 重新开始 ")) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("details", _hoisted_12, [
              _cache[3] || (_cache[3] = createBaseVNode("summary", { class: "cursor-pointer list-none flex items-center justify-between text-sm text-gray-400 hover:text-gray-600 transition-colors tracking-widest" }, [
                createBaseVNode("span", null, "题目导航"),
                createBaseVNode("svg", {
                  class: "w-4 h-4 transition-transform group-open:rotate-180",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  })
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(questions.value, (_, index) => {
                    return openBlock(), createElementBlock("button", {
                      key: index,
                      onClick: ($event) => handleGotoQuestion(index),
                      class: normalizeClass(["w-8 h-8 rounded-xl flex items-center justify-center text-xs font-medium transition-all tracking-widest nav-btn", [
                        index === currentIndex.value ? "bg-[#2c3e50] text-white" : selectedOptions.value[index] >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"
                      ]])
                    }, toDisplayString(index + 1), 11, _hoisted_15);
                  }), 128))
                ])
              ])
            ])
          ]),
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "pt-6 pb-2 text-center" }, [
            createBaseVNode("p", { class: "text-xs text-gray-300" }, "寻古问心·照见本真 H5原型 v2.9")
          ], -1))
        ])
      ]);
    };
  }
});
const QuizView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d8d1842"]]);
export {
  QuizView as default
};
//# sourceMappingURL=QuizView-BSaLTFER.js.map
