import { d as defineComponent, c as createElementBlock, a as createBaseVNode, n as normalizeStyle, u as unref, b as createStaticVNode, e as useRouter, o as openBlock } from "./index-BTq9drXa.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = { class: "home-container min-h-screen flex flex-col items-center justify-center relative overflow-hidden" };
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "absolute top-[100px] left-1/2 -translate-x-1/2 w-[135px] h-[135px] z-10" };
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "relative z-10 flex flex-col items-center px-4 pt-[110px]" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HomeView",
  setup(__props) {
    const router = useRouter();
    const baseUrl = "./";
    const handleStartTest = () => {
      router.push("/quiz");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "absolute inset-0 bg-[#f8f9fa]" }, null, -1)),
        createBaseVNode("div", {
          class: "absolute inset-0 bg-center bg-cover opacity-40",
          style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/optimized_bg_3.png')` })
        }, null, 4),
        createBaseVNode("div", {
          class: "absolute inset-0 bg-center bg-cover opacity-60",
          style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/light_bg_2.png')` })
        }, null, 4),
        createBaseVNode("img", {
          src: unref(baseUrl) + "images/清和居_logo_64x64.png",
          alt: "清和居Logo",
          class: "absolute top-4 left-4 w-16 h-16 z-10"
        }, null, 8, _hoisted_2),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("img", {
            src: unref(baseUrl) + "images/silhouette_masked.png",
            alt: "剪影装饰",
            class: "w-full h-full object-contain opacity-85"
          }, null, 8, _hoisted_4)
        ]),
        createBaseVNode("div", _hoisted_5, [
          _cache[1] || (_cache[1] = createStaticVNode('<h1 class="text-3xl font-medium text-[#2c3e50] text-center mb-6 font-calligraphy" data-v-b62ca704> 寻古问心·照见本真 </h1><p class="text-base text-[#2c3e50] text-center opacity-80 mb-8 subtitle-font" data-v-b62ca704> 一次基于道家五行智慧的深度自我探索 </p><div class="flex flex-col gap-5 mb-10 w-full max-w-sm" data-v-b62ca704><div class="flex flex-col" data-v-b62ca704><p class="text-sm font-medium text-[#2c3e50]" data-v-b62ca704> · 在快节奏中，给自己一次&quot;向内观照&quot;的机会 </p><p class="text-xs text-[#2c3e50] opacity-60 ml-3 mt-1" data-v-b62ca704> 30道精选题目，约3-5分钟完成 </p></div><div class="flex flex-col" data-v-b62ca704><p class="text-sm font-medium text-[#2c3e50]" data-v-b62ca704> · 探寻出世入世间的平衡之道 </p><p class="text-xs text-[#2c3e50] opacity-60 ml-3 mt-1" data-v-b62ca704> 融合道家五行智慧，发现你的心性特质 </p></div><div class="flex flex-col" data-v-b62ca704><p class="text-sm font-medium text-[#2c3e50]" data-v-b62ca704> · 获得专属&quot;心镜&quot;，照见内在的五行平衡 </p><p class="text-xs text-[#2c3e50] opacity-60 ml-3 mt-1" data-v-b62ca704> 生成详细古代身份卡，内含性格分析与成长指引 </p></div></div>', 3)),
          createBaseVNode("button", {
            onClick: handleStartTest,
            class: "relative px-10 py-3 bg-[#27ae60] text-white rounded-2xl shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 btn-font",
            style: { "box-shadow": "0 4px 12px rgba(39, 174, 96, 0.3)" }
          }, [
            createBaseVNode("div", {
              class: "absolute inset-0 bg-center bg-cover opacity-40 rounded-2xl pointer-events-none",
              style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/button_texture_5.png')` })
            }, null, 4),
            _cache[0] || (_cache[0] = createBaseVNode("span", { class: "relative z-10 font-medium" }, "开始测试", -1))
          ])
        ])
      ]);
    };
  }
});
const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b62ca704"]]);
export {
  HomeView as default
};
//# sourceMappingURL=HomeView-CuTl76Tj.js.map
