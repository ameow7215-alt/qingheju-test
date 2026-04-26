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
(function() {
  "use strict";
  var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
  /**
  * @vue/shared v3.5.32
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
  }
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray$1 = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-\w/g;
  const camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
    }
  );
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction(
    (str) => {
      const s = str ? `on${capitalize(str)}` : ``;
      return s;
    }
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](...arg);
    }
  };
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle(value) {
    if (isArray$1(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray$1(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray$1(a);
    bValidType = isArray$1(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  const isRef$1 = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (isRef$1(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce(
          (entries, [key, val2], i) => {
            entries[stringifySymbol(key, i) + " =>"] = val2;
            return entries;
          },
          {}
        )
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject(val) && !isArray$1(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  const stringifySymbol = (v, i = "") => {
    var _a;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
    );
  };
  /**
  * @vue/reactivity v3.5.32
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let activeEffectScope;
  class EffectScope {
    // TODO isolatedDeclarations "__v_skip"
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this._on = 0;
      this.effects = [];
      this.cleanups = [];
      this._isPaused = false;
      this.__v_skip = true;
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].pause();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].pause();
        }
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active) {
        if (this._isPaused) {
          this._isPaused = false;
          let i, l;
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].resume();
            }
          }
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].resume();
          }
        }
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      if (++this._on === 1) {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      if (this._on > 0 && --this._on === 0) {
        activeEffectScope = this.prevScope;
        this.prevScope = void 0;
      }
    }
    stop(fromParent) {
      if (this._active) {
        this._active = false;
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        this.effects.length = 0;
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        this.cleanups.length = 0;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
      }
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  let activeSub;
  const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 1 | 4;
      this.next = void 0;
      this.cleanup = void 0;
      this.scheduler = void 0;
      if (activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= -65;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps; link; link = link.nextDep) {
          removeSub(link);
        }
        this.deps = this.depsTail = void 0;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= -2;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
    /**
     * @internal
     */
    runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  }
  let batchDepth = 0;
  let batchedSub;
  let batchedComputed;
  function batch(sub, isComputed = false) {
    sub.flags |= 8;
    if (isComputed) {
      sub.next = batchedComputed;
      batchedComputed = sub;
      return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e = batchedComputed;
      batchedComputed = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        e = next;
      }
    }
    let error;
    while (batchedSub) {
      let e = batchedSub;
      batchedSub = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        if (e.flags & 1) {
          try {
            ;
            e.trigger();
          } catch (err) {
            if (!error) error = err;
          }
        }
        e = next;
      }
    }
    if (error) throw error;
  }
  function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      link.version = -1;
      link.prevActiveLink = link.dep.activeLink;
      link.dep.activeLink = link;
    }
  }
  function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
      const prev = link.prevDep;
      if (link.version === -1) {
        if (link === tail) tail = prev;
        removeSub(link);
        removeDep(link);
      } else {
        head = link;
      }
      link.dep.activeLink = link.prevActiveLink;
      link.prevActiveLink = void 0;
      link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
  }
  function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
        return true;
      }
    }
    if (sub._dirty) {
      return true;
    }
    return false;
  }
  function refreshComputed(computed2) {
    if (computed2.flags & 4 && !(computed2.flags & 16)) {
      return;
    }
    computed2.flags &= -17;
    if (computed2.globalVersion === globalVersion) {
      return;
    }
    computed2.globalVersion = globalVersion;
    if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
      return;
    }
    computed2.flags |= 2;
    const dep = computed2.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed2;
    shouldTrack = true;
    try {
      prepareDeps(computed2);
      const value = computed2.fn(computed2._value);
      if (dep.version === 0 || hasChanged(value, computed2._value)) {
        computed2.flags |= 128;
        computed2._value = value;
        dep.version++;
      }
    } catch (err) {
      dep.version++;
      throw err;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed2);
      computed2.flags &= -3;
    }
  }
  function removeSub(link, soft = false) {
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link.prevSub = void 0;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link.nextSub = void 0;
    }
    if (dep.subs === link) {
      dep.subs = prevSub;
      if (!prevSub && dep.computed) {
        dep.computed.flags &= -5;
        for (let l = dep.computed.deps; l; l = l.nextDep) {
          removeSub(l, true);
        }
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  function removeDep(link) {
    const { prevDep, nextDep } = link;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link.prevDep = void 0;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link.nextDep = void 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function cleanupEffect(e) {
    const { cleanup } = e;
    e.cleanup = void 0;
    if (cleanup) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  let globalVersion = 0;
  class Link {
    constructor(sub, dep) {
      this.sub = sub;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Dep {
    // TODO isolatedDeclarations "__v_skip"
    constructor(computed2) {
      this.computed = computed2;
      this.version = 0;
      this.activeLink = void 0;
      this.subs = void 0;
      this.map = void 0;
      this.key = void 0;
      this.sc = 0;
      this.__v_skip = true;
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link = this.activeLink;
      if (link === void 0 || link.sub !== activeSub) {
        link = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link;
        } else {
          link.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
        }
        addSub(link);
      } else if (link.version === -1) {
        link.version = this.version;
        if (link.nextDep) {
          const next = link.nextDep;
          next.prevDep = link.prevDep;
          if (link.prevDep) {
            link.prevDep.nextDep = next;
          }
          link.prevDep = activeSub.depsTail;
          link.nextDep = void 0;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
          if (activeSub.deps === link) {
            activeSub.deps = next;
          }
        }
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (false) ;
        for (let link = this.subs; link; link = link.prevSub) {
          if (link.sub.notify()) {
            ;
            link.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4) {
      const computed2 = link.dep.computed;
      if (computed2 && !link.dep.subs) {
        computed2.flags |= 4 | 16;
        for (let l = computed2.deps; l; l = l.nextDep) {
          addSub(l);
        }
      }
      const currentTail = link.dep.subs;
      if (currentTail !== link) {
        link.prevSub = currentTail;
        if (currentTail) currentTail.nextSub = link;
      }
      link.dep.subs = link;
    }
  }
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  function track(target, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep());
        dep.map = depsMap;
        dep.key = key;
      }
      {
        dep.track();
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = (dep) => {
      if (dep) {
        {
          dep.trigger();
        }
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray$1(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== void 0 || depsMap.has(void 0)) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function reactiveReadArray(array) {
    const raw = /* @__PURE__ */ toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
  }
  function shallowReadArray(arr) {
    track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  function toWrapped(target, item) {
    if (/* @__PURE__ */ isReadonly(target)) {
      return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
    }
    return toReactive(item);
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
      );
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toWrapped(this, value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply(
        this,
        "filter",
        fn,
        thisArg,
        (v) => v.map((item) => toWrapped(this, item)),
        arguments
      );
    },
    find(fn, thisArg) {
      return apply(
        this,
        "find",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply(
        this,
        "findLast",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
      return apply(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
      return apply(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", (item) => toWrapped(this, item));
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (!result.done) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  const arrayProto = Array.prototype;
  function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = function(item, index) {
          return fn.call(this, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index) {
          return fn.call(this, item, index, self2);
        };
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
    let wrappedFn = fn;
    let wrapInitialAccumulator = false;
    if (arr !== self2) {
      if (needsWrap) {
        wrapInitialAccumulator = args.length === 0;
        wrappedFn = function(acc, item, index) {
          if (wrapInitialAccumulator) {
            wrapInitialAccumulator = false;
            acc = toWrapped(self2, acc);
          }
          return fn.call(this, acc, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, item, index, self2);
        };
      }
    }
    const result = arr[method](wrappedFn, ...args);
    return wrapInitialAccumulator ? toWrapped(self2, result) : result;
  }
  function searchProxy(self2, method, args) {
    const arr = /* @__PURE__ */ toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
      args[0] = /* @__PURE__ */ toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  function hasOwnProperty(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = /* @__PURE__ */ toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      if (key === "__v_skip") return target["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray$1(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(
        target,
        key,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ isRef(target) ? target : receiver
      );
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (/* @__PURE__ */ isRef(res)) {
        const value = targetIsArray && isIntegerKey(key) ? res : res.value;
        return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
      }
      if (isObject(res)) {
        return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
      if (!this._isShallow) {
        const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
        if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          oldValue = /* @__PURE__ */ toRaw(oldValue);
          value = /* @__PURE__ */ toRaw(value);
        }
        if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
          if (isOldValueReadonly) {
            return true;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(
        target,
        key,
        value,
        /* @__PURE__ */ isRef(target) ? target : receiver
      );
      if (target === /* @__PURE__ */ toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray$1(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      return true;
    }
    deleteProperty(target, key) {
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return extend(
        // inheriting all iterator properties
        Object.create(innerIterator),
        {
          // iterator protocol
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          }
        }
      );
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
      get(key) {
        const target = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const rawKey = /* @__PURE__ */ toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "get", key);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
          target.get(key);
        }
      },
      get size() {
        const target = this["__v_raw"];
        !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
        return target.size;
      },
      has(key) {
        const target = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const rawKey = /* @__PURE__ */ toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "has", key);
          }
          track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      }
    };
    extend(
      instrumentations,
      readonly2 ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
      } : {
        add(value) {
          const target = /* @__PURE__ */ toRaw(this);
          const proto = getProto(target);
          const rawValue = /* @__PURE__ */ toRaw(value);
          const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
          const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
          if (!hadKey) {
            target.add(valueToAdd);
            trigger(target, "add", valueToAdd, valueToAdd);
          }
          return this;
        },
        set(key, value) {
          if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
            value = /* @__PURE__ */ toRaw(value);
          }
          const target = /* @__PURE__ */ toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = /* @__PURE__ */ toRaw(key);
            hadKey = has.call(target, key);
          }
          const oldValue = get.call(target, key);
          target.set(key, value);
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value);
          }
          return this;
        },
        delete(key) {
          const target = /* @__PURE__ */ toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = /* @__PURE__ */ toRaw(key);
            hadKey = has.call(target, key);
          }
          get ? get.call(target, key) : void 0;
          const result = target.delete(key);
          if (hadKey) {
            trigger(target, "delete", key, void 0);
          }
          return result;
        },
        clear() {
          const target = /* @__PURE__ */ toRaw(this);
          const hadItems = target.size !== 0;
          const result = target.clear();
          if (hadItems) {
            trigger(
              target,
              "clear",
              void 0,
              void 0
            );
          }
          return result;
        }
      }
    );
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  // @__NO_SIDE_EFFECTS__
  function reactive(target) {
    if (/* @__PURE__ */ isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  // @__NO_SIDE_EFFECTS__
  function isReactive(value) {
    if (/* @__PURE__ */ isReadonly(value)) {
      return /* @__PURE__ */ isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  // @__NO_SIDE_EFFECTS__
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? /* @__PURE__ */ toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
  // @__NO_SIDE_EFFECTS__
  function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
  }
  // @__NO_SIDE_EFFECTS__
  function ref(value) {
    return createRef(value, false);
  }
  // @__NO_SIDE_EFFECTS__
  function shallowRef(value) {
    return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
    if (/* @__PURE__ */ isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep();
      this["__v_isRef"] = true;
      this["__v_isShallow"] = false;
      this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
      this._value = isShallow2 ? value : toReactive(value);
      this["__v_isShallow"] = isShallow2;
    }
    get value() {
      {
        this.dep.track();
      }
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
      newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this._rawValue = newValue;
        this._value = useDirectValue ? newValue : toReactive(newValue);
        {
          this.dep.trigger();
        }
      }
    }
  }
  function unref(ref2) {
    return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn;
      this.setter = setter;
      this._value = void 0;
      this.dep = new Dep(this);
      this.__v_isRef = true;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 16;
      this.globalVersion = globalVersion - 1;
      this.next = void 0;
      this.effect = this;
      this["__v_isReadonly"] = !setter;
      this.isSSR = isSSR;
    }
    /**
     * @internal
     */
    notify() {
      this.flags |= 16;
      if (!(this.flags & 8) && // avoid infinite self recursion
      activeSub !== this) {
        batch(this, true);
        return true;
      }
    }
    get value() {
      const link = this.dep.track();
      refreshComputed(this);
      if (link) {
        link.version = this.dep.version;
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      }
    }
  }
  // @__NO_SIDE_EFFECTS__
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    return cRef;
  }
  const INITIAL_WATCHER_VALUE = {};
  const cleanupMap = /* @__PURE__ */ new WeakMap();
  let activeWatcher = void 0;
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      if (!cleanups) cleanupMap.set(owner, cleanups = []);
      cleanups.push(cleanupFn);
    }
  }
  function watch$1(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call } = options;
    const reactiveGetter = (source2) => {
      if (deep) return source2;
      if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
        return traverse(source2, 1);
      return traverse(source2);
    };
    let effect2;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (/* @__PURE__ */ isRef(source)) {
      getter = () => source.value;
      forceTrigger = /* @__PURE__ */ isShallow(source);
    } else if (/* @__PURE__ */ isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray$1(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
      getter = () => source.map((s) => {
        if (/* @__PURE__ */ isRef(s)) {
          return s.value;
        } else if (/* @__PURE__ */ isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return call ? call(s, 2) : s();
        } else ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = call ? () => call(source, 2) : source;
      } else {
        getter = () => {
          if (cleanup) {
            pauseTracking();
            try {
              cleanup();
            } finally {
              resetTracking();
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = effect2;
          try {
            return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
      effect2.stop();
      if (scope && scope.active) {
        remove(scope.effects, effect2);
      }
    };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        watchHandle();
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
      if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
          if (cleanup) {
            cleanup();
          }
          const currentWatcher = activeWatcher;
          activeWatcher = effect2;
          try {
            const args = [
              newValue,
              // pass undefined as the old value when it's changed for the first time
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              boundCleanup
            ];
            oldValue = newValue;
            call ? call(cb, 3, args) : (
              // @ts-expect-error
              cb(...args)
            );
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else {
        effect2.run();
      }
    };
    if (augmentJob) {
      augmentJob(job);
    }
    effect2 = new ReactiveEffect(getter);
    effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
    cleanup = effect2.onStop = () => {
      const cleanups = cleanupMap.get(effect2);
      if (cleanups) {
        if (call) {
          call(cleanups, 4);
        } else {
          for (const cleanup2 of cleanups) cleanup2();
        }
        cleanupMap.delete(effect2);
      }
    };
    if (cb) {
      if (immediate) {
        job(true);
      } else {
        oldValue = effect2.run();
      }
    } else if (scheduler) {
      scheduler(job.bind(null, true), true);
    } else {
      effect2.run();
    }
    watchHandle.pause = effect2.pause.bind(effect2);
    watchHandle.resume = effect2.resume.bind(effect2);
    watchHandle.stop = watchHandle;
    return watchHandle;
  }
  function traverse(value, depth = Infinity, seen2) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen2 = seen2 || /* @__PURE__ */ new Map();
    if ((seen2.get(value) || 0) >= depth) {
      return value;
    }
    seen2.set(value, depth);
    depth--;
    if (/* @__PURE__ */ isRef(value)) {
      traverse(value.value, depth, seen2);
    } else if (isArray$1(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], depth, seen2);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen2);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen2);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen2);
        }
      }
    }
    return value;
  }
  /**
  * @vue/runtime-core v3.5.32
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const stack = [];
  let isWarning = false;
  function warn$1(msg, ...args) {
    if (isWarning) return;
    isWarning = true;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance,
        11,
        [
          // eslint-disable-next-line no-restricted-syntax
          msg + args.map((a) => {
            var _a, _b;
            return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
          }).join(""),
          instance && instance.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(
      vnode.component,
      vnode.type,
      isRoot
    )}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (/* @__PURE__ */ isRef(value)) {
      value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = /* @__PURE__ */ toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    if (isArray$1(fn)) {
      const values = [];
      for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    }
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking();
        callWithErrorHandling(errorHandler, null, 10, [
          err,
          exposedInstance,
          errorInfo
        ]);
        resetTracking();
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
    if (throwInProd) {
      throw err;
    } else {
      console.error(err);
    }
  }
  const queue = [];
  let flushIndex = -1;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex$1(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId(job);
      const lastJob = queue[queue.length - 1];
      if (!lastJob || // fast path when the job id is larger than the tail
      !(job.flags & 2) && jobId >= getId(lastJob)) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex$1(jobId), 0, job);
      }
      job.flags |= 1;
      queueFlush();
    }
  }
  function queueFlush() {
    if (!currentFlushPromise) {
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray$1(cb)) {
      if (activePostFlushCbs && cb.id === -1) {
        activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
      } else if (!(cb.flags & 1)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= 1;
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen2, i = flushIndex + 1) {
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.flags & 2) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        cb();
        if (!(cb.flags & 4)) {
          cb.flags &= -2;
        }
      }
    }
  }
  function flushPostFlushCbs(seen2) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a, b) => getId(a) - getId(b)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        if (!(cb.flags & 8)) cb();
        cb.flags &= -2;
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
  function flushJobs(seen2) {
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && !(job.flags & 8)) {
          if (false) ;
          if (job.flags & 4) {
            job.flags &= ~1;
          }
          callWithErrorHandling(
            job,
            job.i,
            job.i ? 15 : 14
          );
          if (!(job.flags & 4)) {
            job.flags &= ~1;
          }
        }
      }
    } finally {
      for (; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job) {
          job.flags &= -2;
        }
      }
      flushIndex = -1;
      queue.length = 0;
      flushPostFlushCbs();
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs();
      }
    }
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx) return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function provide(key, value) {
    if (currentInstance) {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = getCurrentInstance();
    if (instance || currentApp) {
      let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else ;
    }
  }
  const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      return ctx;
    }
  };
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    const baseWatchOptions = extend({}, options);
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {
        };
        watchStopHandle.stop = NOOP;
        watchStopHandle.resume = NOOP;
        watchStopHandle.pause = NOOP;
        return watchStopHandle;
      }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = false;
    if (flush === "post") {
      baseWatchOptions.scheduler = (job) => {
        queuePostRenderEffect(job, instance && instance.suspense);
      };
    } else if (flush !== "sync") {
      isPre = true;
      baseWatchOptions.scheduler = (job, isFirstRun) => {
        if (isFirstRun) {
          job();
        } else {
          queueJob(job);
        }
      };
    }
    baseWatchOptions.augmentJob = (job) => {
      if (cb) {
        job.flags |= 4;
      }
      if (isPre) {
        job.flags |= 2;
        if (instance) {
          job.id = instance.uid;
          job.i = instance;
        }
      }
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
      if (ssrCleanup) {
        ssrCleanup.push(watchHandle);
      } else if (runsImmediately) {
        watchHandle();
      }
    }
    return watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
  const isTeleport = (type) => type.__isTeleport;
  const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      vnode.transition = hooks;
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function defineComponent(options, extraOptions) {
    return isFunction(options) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
    ) : options;
  }
  function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
  }
  function isTemplateRefKey(refs, key) {
    let desc;
    return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
  }
  const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray$1(rawRef)) {
      rawRef.forEach(
        (r, i) => setRef(
          r,
          oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
        setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      }
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = /* @__PURE__ */ toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
      if (isTemplateRefKey(refs, key)) {
        return false;
      }
      return hasOwn(rawSetupState, key);
    };
    const canSetRef = (ref22, key) => {
      if (key && isTemplateRefKey(refs, key)) {
        return false;
      }
      return true;
    };
    if (oldRef != null && oldRef !== ref3) {
      invalidatePendingSetRef(oldRawRef);
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (canSetSetupRef(oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (/* @__PURE__ */ isRef(oldRef)) {
        const oldRawRefAtom = oldRawRef;
        if (canSetRef(oldRef, oldRawRefAtom.k)) {
          oldRef.value = null;
        }
        if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
      }
    }
    if (isFunction(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref3);
      const _isRef = /* @__PURE__ */ isRef(ref3);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
            if (isUnmount) {
              isArray$1(existing) && remove(existing, refValue);
            } else {
              if (!isArray$1(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (canSetSetupRef(ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  const newVal = [refValue];
                  if (canSetRef(ref3, rawRef.k)) {
                    ref3.value = newVal;
                  }
                  if (rawRef.k) refs[rawRef.k] = newVal;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (canSetSetupRef(ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            if (canSetRef(ref3, rawRef.k)) {
              ref3.value = value;
            }
            if (rawRef.k) refs[rawRef.k] = value;
          } else ;
        };
        if (value) {
          const job = () => {
            doSet();
            pendingSetRefMap.delete(rawRef);
          };
          job.id = -1;
          pendingSetRefMap.set(rawRef, job);
          queuePostRenderEffect(job, parentSuspense);
        } else {
          invalidatePendingSetRef(rawRef);
          doSet();
        }
      }
    }
  }
  function invalidatePendingSetRef(rawRef) {
    const pendingSetRef = pendingSetRefMap.get(rawRef);
    if (pendingSetRef) {
      pendingSetRef.flags |= 8;
      pendingSetRefMap.delete(rawRef);
    }
  }
  getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
  getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  };
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook(
    "bu"
  );
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook(
    "bum"
  );
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook(
    "sp"
  );
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache;
    const sourceIsArray = isArray$1(source);
    if (sourceIsArray || isString(source)) {
      const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
      let needsWrap = false;
      let isReadonlySource = false;
      if (sourceIsReactiveArray) {
        needsWrap = !/* @__PURE__ */ isShallow(source);
        isReadonlySource = /* @__PURE__ */ isReadonly(source);
        source = shallowReadArray(source);
      }
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(
          needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
          i,
          void 0,
          cached
        );
      }
    } else if (typeof source === "number") {
      {
        ret = new Array(source);
        for (let i = 0; i < source; i++) {
          ret[i] = renderItem(i + 1, i, void 0, cached);
        }
      }
    } else if (isObject(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(
          source,
          (item, i) => renderItem(item, i, void 0, cached)
        );
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached);
        }
      }
    } else {
      ret = [];
    }
    return ret;
  }
  const getPublicInstance = (i) => {
    if (!i) return null;
    if (isStatefulComponent(i)) return getComponentPublicInstance(i);
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => i.props,
      $attrs: (i) => i.attrs,
      $slots: (i) => i.slots,
      $refs: (i) => i.refs,
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $host: (i) => i.ce,
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => {
        queueJob(i.update);
      }),
      $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    })
  );
  const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      if (key === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (hasOwn(props, key)) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance.attrs, "get", "");
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else ;
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, props, type }
    }, key) {
      let cssModules;
      return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  function normalizePropsOrEmits(props) {
    return isArray$1(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(options.beforeCreate, instance, "bc");
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          {
            ctx[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data = dataOptions.call(publicThis, publicThis);
      if (!isObject(data)) ;
      else {
        instance.data = /* @__PURE__ */ reactive(data);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c = computed({
          get,
          set
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray$1(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$1(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val,
            enumerable: true
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
    if (serverPrefetch) {
      markAsyncBoundary(instance);
    }
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray$1(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (/* @__PURE__ */ isRef(injected)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(
      isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
      instance,
      type
    );
  }
  function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        {
          watch(getter, handler);
        }
      }
    } else if (isFunction(raw)) {
      {
        watch(getter, raw.bind(publicThis));
      }
    } else if (isObject(raw)) {
      if (isArray$1(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else ;
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
        );
      }
      mergeOptions$1(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions$1(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions$1(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m) => mergeOptions$1(to, m, strats, true)
      );
    }
    for (const key in from) {
      if (asMixin && key === "expose") ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(
        isFunction(to) ? to.call(this, this) : to,
        isFunction(from) ? from.call(this, this) : from
      );
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray$1(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray$1(to) && isArray$1(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend(
        /* @__PURE__ */ Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from != null ? from : {})
      );
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet();
      const pluginCleanupFns = [];
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version: version$1,
        get config() {
          return context.config;
        },
        set config(v) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) ;
          else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else ;
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            {
              render(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            return getComponentPublicInstance(vnode.component);
          }
        },
        onUnmount(cleanupFn) {
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          if (isMounted) {
            callWithAsyncErrorHandling(
              pluginCleanupFns,
              app._instance,
              16
            );
            render(null, app._container);
            delete app._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  let currentApp = null;
  const getModelModifiers = (props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  };
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (modifiers.number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance,
        6,
        args
      );
    }
  }
  const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray$1(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render,
      renderCache,
      props,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    const prev = setCurrentRenderingInstance(instance);
    let result;
    let fallthroughAttrs;
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = false ? new Proxy(proxyToUse, {
          get(target, key, receiver) {
            warn$1(
              `Property '${String(
                key
              )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(
          render.call(
            thisProxy,
            proxyToUse,
            renderCache,
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            setupState,
            data,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if (false) ;
        result = normalizeVNode(
          render2.length > 1 ? render2(
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            false ? {
              get attrs() {
                markAttrsAccessed();
                return /* @__PURE__ */ shallowReadonly(attrs);
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render2(
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            null
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root = cloneVNode(root, fallthroughAttrs, false, true);
        }
      }
    }
    if (vnode.dirs) {
      root = cloneVNode(root, null, false, true);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      setTransitionHooks(root, vnode.transition);
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function hasPropValueChanged(nextProps, prevProps, key) {
    const nextProp = nextProps[key];
    const prevProp = prevProps[key];
    if (key === "style" && isObject(nextProp) && isObject(prevProp)) {
      return !looseEqual(nextProp, prevProp);
    }
    return nextProp !== prevProp;
  }
  function updateHOCHostEl({ vnode, parent, suspense }, el) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.suspense.vnode.el = root.el = el;
        vnode = root;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
    if (suspense && suspense.activeBranch === vnode) {
      suspense.vnode.el = el;
    }
  }
  const internalObjectProto = {};
  const createInternalObject = () => Object.create(internalObjectProto);
  const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance.attrs, "set", "");
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = /* @__PURE__ */ toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(
          options,
          rawCurrentProps,
          key,
          castValues[key],
          instance,
          !hasOwn(castValues, key)
        );
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
        if (instance.ce) {
          instance.ce._setProp(key, value);
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  const mixinPropsCache = /* @__PURE__ */ new WeakMap();
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys) needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray$1(raw)) {
      for (let i = 0; i < raw.length; i++) {
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
          const propType = prop.type;
          let shouldCast = false;
          let shouldCastTrue = true;
          if (isArray$1(propType)) {
            for (let index = 0; index < propType.length; ++index) {
              const type = propType[index];
              const typeName = isFunction(type) && type.name;
              if (typeName === "Boolean") {
                shouldCast = true;
                break;
              } else if (typeName === "String") {
                shouldCastTrue = false;
              }
            }
          } else {
            shouldCast = isFunction(propType) && propType.name === "Boolean";
          }
          prop[
            0
            /* shouldCast */
          ] = shouldCast;
          prop[
            1
            /* shouldCastTrue */
          ] = shouldCastTrue;
          if (shouldCast || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$" && !isReservedProp(key)) {
      return true;
    }
    return false;
  }
  const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
  const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot$1 = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (false) ;
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key)) continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot$1(key, value, ctx);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const assignSlots = (slots, children, optimized) => {
    for (const key in children) {
      if (optimized || !isInternalKey(key)) {
        slots[key] = children[key];
      }
    }
  };
  const initSlots = (instance, children, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance, children);
    }
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  };
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis();
    target.__VUE__ = true;
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else ;
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      } else if (ref3 == null && n1 && n1.ref != null) {
        setRef(n1.ref, null, parentSuspense, n1, true);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
        try {
          if (customElement) {
            customElement._beginPatch();
          }
          patchElement(
            n1,
            n2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } finally {
          if (customElement) {
            customElement._endPatch();
          }
        }
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          try {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          } finally {
          }
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    };
    const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(
                el,
                key,
                oldProps[key],
                null,
                namespace,
                parentComponent
              );
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key)) continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance, false, optimized);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
          initialVNode.placeholder = placeholder.el;
        }
      } else {
        setupRenderEffect(
          instance,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent, root, type } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          {
            if (root.ce && root.ce._hasShadowRoot()) {
              root.ce._injectChildStyle(
                type,
                instance.parent ? instance.parent.type : void 0
              );
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            patch(
              null,
              subTree,
              container,
              anchor,
              instance,
              parentSuspense,
              namespace
            );
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                queuePostRenderEffect(() => {
                  if (!instance.isUnmounted) update();
                }, parentSuspense);
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          const nextTree = renderComponentRoot(instance);
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next, vnode),
              parentSuspense
            );
          }
        }
      };
      instance.scope.on();
      const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
      instance.scope.off();
      const update = instance.update = effect2.run.bind(effect2);
      const job = instance.job = effect2.runIfDirty.bind(effect2);
      job.i = instance;
      job.id = instance.uid;
      effect2.scheduler = () => queueJob(job);
      toggleRecurse(instance, true);
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(
          c1[i],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(
              null,
              c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchorVNode = c2[nextIndex + 1];
          const anchor = nextIndex + 1 < l2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
          ) : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => {
            if (vnode.ctx.isUnmounted) {
              hostRemove(el);
            } else {
              hostInsert(el, container, anchor);
            }
          };
          const performLeave = () => {
            if (el._isLeaving) {
              el[leaveCbKey](
                true
                /* cancelled */
              );
            }
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex,
        memo
      } = vnode;
      if (patchFlag === -2) {
        optimized = false;
      }
      if (ref3 != null) {
        pauseTracking();
        setRef(ref3, null, parentSuspense, vnode, true);
        resetTracking();
      }
      if (cacheIndex != null) {
        parentComponent.renderCache[cacheIndex] = void 0;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            internals,
            doRemove
          );
        } else if (dynamicChildren && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      const shouldInvalidateMemo = memo != null && cacheIndex == null;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          if (shouldInvalidateMemo) {
            vnode.el = null;
          }
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      const { bum, scope, job, subTree, um, m, a } = instance;
      invalidateMount(m);
      invalidateMount(a);
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (job) {
        job.flags |= 8;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el && el[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el;
    };
    let isFlushing = false;
    const render = (vnode, container, namespace) => {
      let instance;
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
          instance = container._vnode.component;
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      container._vnode = vnode;
      if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs(instance);
        flushPostFlushCbs();
        isFlushing = false;
      }
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    return {
      render,
      hydrate,
      createApp: createAppAPI(render)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, job }, allowed) {
    if (allowed) {
      effect2.flags |= 32;
      job.flags |= 4;
    } else {
      effect2.flags &= -33;
      job.flags &= -5;
    }
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray$1(ch1) && isArray$1(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          if (c2.patchFlag === -1) {
            c2 = ch2[i] = cloneIfMounted(c2);
          }
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i = 0; i < hooks.length; i++)
        hooks[i].flags |= 8;
    }
  }
  function resolveAsyncComponentPlaceholder(anchorVnode) {
    if (anchorVnode.placeholder) {
      return anchorVnode.placeholder;
    }
    const instance = anchorVnode.component;
    if (instance) {
      return resolveAsyncComponentPlaceholder(instance.subTree);
    }
    return null;
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray$1(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
  const Text = /* @__PURE__ */ Symbol.for("v-txt");
  const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
  const Static = /* @__PURE__ */ Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = false) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock && inVOnce) {
      currentBlock.hasOnce = true;
    }
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(
      createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
      )
    );
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (/* @__PURE__ */ isProxy(style) && !isArray$1(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  function guardReactiveProps(props) {
    if (!props) return null;
    return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref3, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      placeholder: vnode.placeholder,
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    if (transition && cloneTransition) {
      setTransitionHooks(
        cloned,
        transition.clone(cloned)
      );
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createStaticVNode(content, numberOfNodes) {
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray$1(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (isVNode(child)) {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray$1(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          } else if (incoming == null && existing == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
          // the model listener.
          !isModelListener(key)) {
            ret[key] = incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      job: null,
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      ids: parent ? parent.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g = getGlobalThis();
    const registerGlobalSetter = (key, setter) => {
      let setters;
      if (!(setters = g[key])) setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1) setters.forEach((set) => set(v));
        else setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v) => currentInstance = v
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v) => isInSSRComponentSetup = v
    );
  }
  const setCurrentInstance = (instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        0,
        [
          instance.props,
          setupContext
        ]
      );
      const isAsyncSetup = isPromise(setupResult);
      resetTracking();
      reset();
      if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
        markAsyncBoundary(instance);
      }
      if (isAsyncSetup) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult);
      }
    } else {
      finishComponentSetup(instance);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else ;
    finishComponentSetup(instance);
  }
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      instance.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
  }
  const attrsProxyHandlers = {
    get(target, key) {
      track(target, "get", "");
      return target[key];
    }
  };
  function createSetupContext(instance) {
    const expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    {
      return {
        attrs: new Proxy(instance.attrs, attrsProxyHandlers),
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getComponentPublicInstance(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    } else {
      return instance.proxy;
    }
  }
  const classifyRE = /(?:^|[-_])\w/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
        instance.parent.type.components
      ) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    return c;
  };
  function h(type, propsOrChildren, children) {
    try {
      setBlockTracking(-1);
      const l = arguments.length;
      if (l === 2) {
        if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type, null, [propsOrChildren]);
          }
          return createVNode(type, propsOrChildren);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      } else {
        if (l > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type, propsOrChildren, children);
      }
    } finally {
      setBlockTracking(1);
    }
  }
  const version$1 = "3.5.32";
  /**
  * @vue/runtime-dom v3.5.32
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let policy = void 0;
  const tt = typeof window !== "undefined" && window.trustedTypes;
  if (tt) {
    try {
      policy = /* @__PURE__ */ tt.createPolicy("vue", {
        createHTML: (val) => val
      });
    } catch (e) {
    }
  }
  const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        templateContainer.innerHTML = unsafeToTrustedHTML(
          namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
        );
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const vtcKey = /* @__PURE__ */ Symbol("_vtc");
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
  const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
  const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
  const displayRE = /(?:^|;)\s*display\s*:/;
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    let hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        } else {
          for (const prevStyle of prev.split(";")) {
            const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
      }
      for (const key in next) {
        if (key === "display") {
          hasControlledDisplay = true;
        }
        setStyle(style, key, next[key]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray$1(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null) val = "";
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (value == null || isBoolean && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(
          key,
          isBoolean ? "" : isSymbol(value) ? String(value) : value
        );
      }
    }
  }
  function patchDOMProp(el, key, value, parentComponent, attrName) {
    if (key === "innerHTML" || key === "textContent") {
      if (value != null) {
        el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
      }
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      const newValue = value == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        el.type === "checkbox" ? "on" : ""
      ) : String(value);
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      el._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
    needRemove && el.removeAttribute(attrName || key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  const veiKey = /* @__PURE__ */ Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(
          nextValue,
          instance
        );
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, invoker.value),
        instance,
        5,
        [e]
      );
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray$1(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map(
        (fn) => (e2) => !e2._stopped && fn && fn(e2)
      );
    } else {
      return value;
    }
  }
  const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
  key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
  const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue);
      if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
        patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
      }
    } else if (
      // #11081 force set props for possible async custom element
      el._isVueCE && // #12408 check if it's declared prop or it's async custom element
      (shouldSetAsPropForVueCE(el, key) || // @ts-expect-error _def is private
      el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))
    ) {
      patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && isNativeOn(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
      return false;
    }
    if (key === "sandbox" && el.tagName === "IFRAME") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  function shouldSetAsPropForVueCE(el, key) {
    const props = (
      // @ts-expect-error _def is private
      el._def.props
    );
    if (!props) {
      return false;
    }
    const camelKey = camelize(key);
    return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
  }
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);
    const { mount } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container) return;
      const component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      if (container.nodeType === 1) {
        container.textContent = "";
      }
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  };
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  /*!
   * vue-router v4.6.4
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */
  const isBrowser = typeof document !== "undefined";
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function isESModule(obj) {
    return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
  }
  const assign = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = isArray(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop = () => {
  };
  const isArray = Array.isArray;
  function mergeOptions(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    return options;
  }
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    if (text == null) return null;
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery$1, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const hashPos = location2.indexOf("#");
    let searchPos = location2.indexOf("?");
    searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
    if (searchPos >= 0) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos, hashPos > 0 ? hashPos : location2.length);
      query = parseQuery$1(searchString.slice(1));
    }
    if (hashPos >= 0) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + searchString + hash,
      path,
      query,
      hash: decode(hash)
    };
  }
  function stringifyURL(stringifyQuery$1, location2) {
    const query = location2.query ? stringifyQuery$1(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery$1, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery$1(a.query) === stringifyQuery$1(b.query) && a.hash === b.hash;
  }
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a == null ? void 0 : a.valueOf()) === (b == null ? void 0 : b.valueOf());
  }
  function isEquivalentArray(a, b) {
    return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/")) return to;
    if (!to) return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    const lastToSegment = toSegments[toSegments.length - 1];
    if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (segment === ".") continue;
      if (segment === "..") {
        if (position > 1) position--;
      } else break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  let NavigationType = /* @__PURE__ */ function(NavigationType$1) {
    NavigationType$1["pop"] = "pop";
    NavigationType$1["push"] = "push";
    return NavigationType$1;
  }({});
  let NavigationDirection = /* @__PURE__ */ function(NavigationDirection$1) {
    NavigationDirection$1["back"] = "back";
    NavigationDirection$1["forward"] = "forward";
    NavigationDirection$1["unknown"] = "";
    return NavigationDirection$1;
  }({});
  function normalizeBase(base) {
    if (!base) if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else base = "/";
    if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  function getElementPosition(el, offset) {
    const docRect = document.documentElement.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      behavior: offset.behavior,
      left: elRect.left - docRect.left - (offset.left || 0),
      top: elRect.top - docRect.top - (offset.top || 0)
    };
  }
  const computeScrollPosition = () => ({
    left: window.scrollX,
    top: window.scrollY
  });
  function scrollToPosition(position) {
    let scrollToOptions;
    if ("el" in position) {
      const positionEl = position.el;
      const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
      const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
      if (!el) {
        return;
      }
      scrollToOptions = getElementPosition(el, position);
    } else scrollToOptions = position;
    if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
    else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
  }
  function getScrollKey(path, delta) {
    return (history.state ? history.state.position - delta : -1) + path;
  }
  const scrollPositions = /* @__PURE__ */ new Map();
  function saveScrollPosition(key, scrollPosition) {
    scrollPositions.set(key, scrollPosition);
  }
  function getSavedScrollPosition(key) {
    const scroll = scrollPositions.get(key);
    scrollPositions.delete(key);
    return scroll;
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  let ErrorTypes = /* @__PURE__ */ function(ErrorTypes$1) {
    ErrorTypes$1[ErrorTypes$1["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
    ErrorTypes$1[ErrorTypes$1["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
    ErrorTypes$1[ErrorTypes$1["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
    ErrorTypes$1[ErrorTypes$1["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
    ErrorTypes$1[ErrorTypes$1["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
    return ErrorTypes$1;
  }({});
  const NavigationFailureSymbol = Symbol("");
  ({
    [ErrorTypes.MATCHER_NOT_FOUND]({ location: location2, currentLocation }) {
      return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
    },
    [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
      return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
    },
    [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
      return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
    },
    [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
      return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
    },
    [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
      return `Avoided redundant navigation to current location: "${from.fullPath}".`;
    }
  });
  function createRouterError(type, params) {
    return assign(/* @__PURE__ */ new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const propertiesToLog = [
    "params",
    "query",
    "hash"
  ];
  function stringifyRoute(to) {
    if (typeof to === "string") return to;
    if (to.path != null) return to.path;
    const location2 = {};
    for (const key of propertiesToLog) if (key in to) location2[key] = to[key];
    return JSON.stringify(location2, null, 2);
  }
  function parseQuery(search) {
    const query = {};
    if (search === "" || search === "?") return query;
    const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
    for (let i = 0; i < searchParams.length; ++i) {
      const searchParam = searchParams[i].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
        currentValue.push(value);
      } else query[key] = value;
    }
    return query;
  }
  function stringifyQuery(query) {
    let search = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) search += (search.length ? "&" : "") + key;
        continue;
      }
      (isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value$1) => {
        if (value$1 !== void 0) {
          search += (search.length ? "&" : "") + key;
          if (value$1 != null) search += "=" + value$1;
        }
      });
    }
    return search;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
    return normalizedQuery;
  }
  const matchedRouteKey = Symbol("");
  const viewDepthKey = Symbol("");
  const routerKey = Symbol("");
  const routeLocationKey = Symbol("");
  const routerViewLocationKey = Symbol("");
  function useCallbacks() {
    let handlers = [];
    function add(handler) {
      handlers.push(handler);
      return () => {
        const i = handlers.indexOf(handler);
        if (i > -1) handlers.splice(i, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add,
      list: () => handlers.slice(),
      reset
    };
  }
  function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
    const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
      const next = (valid) => {
        if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
          from,
          to
        }));
        else if (valid instanceof Error) reject(valid);
        else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
          from: to,
          to: valid
        }));
        else {
          if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
          resolve();
        }
      };
      const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3) guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
        if (isRouteComponent(rawComponent)) {
          const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.mods[name] = resolved;
            record.components[name] = resolvedComponent;
            const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
          }));
        }
      }
    }
    return guards;
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i];
      if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
      else leavingRecords.push(recordFrom);
      const recordTo = to.matched[i];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
      }
    }
    return [
      leavingRecords,
      updatingRecords,
      enteringRecords
    ];
  }
  /*!
   * vue-router v4.6.4
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location$1) {
    const { pathname, search, hash } = location$1;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    return stripBase(pathname, base) + search + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else replace(to);
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      if (document.visibilityState === "hidden") {
        const { history: history$1 } = window;
        if (!history$1.state) return;
        history$1.replaceState(assign({}, history$1.state, { scroll: computeScrollPosition() }), "");
      }
    }
    function destroy() {
      for (const teardown of teardowns) teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("pagehide", beforeUnloadListener);
      document.removeEventListener("visibilitychange", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("pagehide", beforeUnloadListener);
    document.addEventListener("visibilitychange", beforeUnloadListener);
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history$1, location: location$1 } = window;
    const currentLocation = { value: createCurrentLocation(base, location$1) };
    const historyState = { value: history$1.state };
    if (!historyState.value) changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history$1.length - 1,
      replaced: true,
      scroll: null
    }, true);
    function changeLocation(to, state, replace$1) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location$1.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history$1[replace$1 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        console.error(err);
        location$1[replace$1 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data) {
      changeLocation(to, assign({}, history$1.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
      currentLocation.value = to;
    }
    function push(to, data) {
      const currentState = assign({}, historyState.value, history$1.state, {
        forward: to,
        scroll: computeScrollPosition()
      });
      changeLocation(currentState.current, currentState, true);
      changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners) historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign({
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function createWebHashHistory(base) {
    base = location.host ? base || location.pathname + location.search : "";
    if (!base.includes("#")) base += "#";
    return createWebHistory(base);
  }
  let TokenType = /* @__PURE__ */ function(TokenType$1) {
    TokenType$1[TokenType$1["Static"] = 0] = "Static";
    TokenType$1[TokenType$1["Param"] = 1] = "Param";
    TokenType$1[TokenType$1["Group"] = 2] = "Group";
    return TokenType$1;
  }({});
  var TokenizerState = /* @__PURE__ */ function(TokenizerState$1) {
    TokenizerState$1[TokenizerState$1["Static"] = 0] = "Static";
    TokenizerState$1[TokenizerState$1["Param"] = 1] = "Param";
    TokenizerState$1[TokenizerState$1["ParamRegExp"] = 2] = "ParamRegExp";
    TokenizerState$1[TokenizerState$1["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
    TokenizerState$1[TokenizerState$1["EscapeNext"] = 4] = "EscapeNext";
    return TokenizerState$1;
  }(TokenizerState || {});
  const ROOT_TOKEN = {
    type: TokenType.Static,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path) return [[]];
    if (path === "/") return [[ROOT_TOKEN]];
    if (!path.startsWith("/")) throw new Error(`Invalid path "${path}"`);
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = TokenizerState.Static;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment) tokens.push(segment);
      segment = [];
    }
    let i = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer) return;
      if (state === TokenizerState.Static) segment.push({
        type: TokenType.Static,
        value: buffer
      });
      else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
        if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: TokenType.Param,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else crash("Invalid state to consume buffer");
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i < path.length) {
      char = path[i++];
      if (char === "\\" && state !== TokenizerState.ParamRegExp) {
        previousState = state;
        state = TokenizerState.EscapeNext;
        continue;
      }
      switch (state) {
        case TokenizerState.Static:
          if (char === "/") {
            if (buffer) consumeBuffer();
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = TokenizerState.Param;
          } else addCharToBuffer();
          break;
        case TokenizerState.EscapeNext:
          addCharToBuffer();
          state = previousState;
          break;
        case TokenizerState.Param:
          if (char === "(") state = TokenizerState.ParamRegExp;
          else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
          else {
            consumeBuffer();
            state = TokenizerState.Static;
            if (char !== "*" && char !== "?" && char !== "+") i--;
          }
          break;
        case TokenizerState.ParamRegExp:
          if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
          else state = TokenizerState.ParamRegExpEnd;
          else customRe += char;
          break;
        case TokenizerState.ParamRegExpEnd:
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  var PathScore = /* @__PURE__ */ function(PathScore$1) {
    PathScore$1[PathScore$1["_multiplier"] = 10] = "_multiplier";
    PathScore$1[PathScore$1["Root"] = 90] = "Root";
    PathScore$1[PathScore$1["Segment"] = 40] = "Segment";
    PathScore$1[PathScore$1["SubSegment"] = 30] = "SubSegment";
    PathScore$1[PathScore$1["Static"] = 40] = "Static";
    PathScore$1[PathScore$1["Dynamic"] = 20] = "Dynamic";
    PathScore$1[PathScore$1["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
    PathScore$1[PathScore$1["BonusWildcard"] = -50] = "BonusWildcard";
    PathScore$1[PathScore$1["BonusRepeatable"] = -20] = "BonusRepeatable";
    PathScore$1[PathScore$1["BonusOptional"] = -8] = "BonusOptional";
    PathScore$1[PathScore$1["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
    PathScore$1[PathScore$1["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
    return PathScore$1;
  }(PathScore || {});
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [PathScore.Root];
      if (options.strict && !segment.length) pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
        if (token.type === TokenType.Static) {
          if (!tokenIndex) pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += PathScore.Static;
        } else if (token.type === TokenType.Param) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re$1 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re$1 !== BASE_PARAM_PATTERN) {
            subSegmentScore += PathScore.BonusCustomRegExp;
            try {
              `${re$1}`;
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re$1}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re$1})(?:/(?:${re$1}))*)` : `(${re$1})`;
          if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional) subPattern += "?";
          pattern += subPattern;
          subSegmentScore += PathScore.Dynamic;
          if (optional) subSegmentScore += PathScore.BonusOptional;
          if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
          if (re$1 === ".*") subSegmentScore += PathScore.BonusWildcard;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i = score.length - 1;
      score[i][score[i].length - 1] += PathScore.BonusStrict;
    }
    if (!options.strict) pattern += "/?";
    if (options.end) pattern += "$";
    else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
    const re = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse(path) {
      const match = path.match(re);
      const params = {};
      if (!match) return null;
      for (let i = 1; i < match.length; i++) {
        const value = match[i] || "";
        const key = keys[i - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) if (token.type === TokenType.Static) path += token.value;
        else if (token.type === TokenType.Param) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          const text = isArray(param) ? param.join("/") : param;
          if (!text) if (optional) {
            if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
            else avoidDuplicatedSlash = true;
          } else throw new Error(`Missing required param "${value}"`);
          path += text;
        }
      }
      return path || "/";
    }
    return {
      re,
      score,
      keys,
      parse,
      stringify
    };
  }
  function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
      const diff = b[i] - a[i];
      if (diff) return diff;
      i++;
    }
    if (a.length < b.length) return a.length === 1 && a[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
    else if (a.length > b.length) return b.length === 1 && b[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
    return 0;
  }
  function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      const comp = compareScoreArray(aScore[i], bScore[i]);
      if (comp) return comp;
      i++;
    }
    if (Math.abs(bScore.length - aScore.length) === 1) {
      if (isLastScoreNegative(aScore)) return 1;
      if (isLastScoreNegative(bScore)) return -1;
    }
    return bScore.length - aScore.length;
  }
  function isLastScoreNegative(score) {
    const last = score[score.length - 1];
    return score.length > 0 && last[last.length - 1] < 0;
  }
  const PATH_PARSER_OPTIONS_DEFAULTS = {
    strict: false,
    end: true,
    sensitive: false
  };
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign(parser, {
      record,
      parent,
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes2, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions(globalOptions, record);
      const normalizedRecords = [mainNormalizedRecord];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
        for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        })));
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher)) {
            removeRoute(record.name);
          }
        }
        if (isMatchable(matcher)) insertMatcher(matcher);
        if (mainNormalizedRecord.children) {
          const children = mainNormalizedRecord.children;
          for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
        originalRecord = originalRecord || matcher;
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index = matchers.indexOf(matcherRef);
        if (index > -1) {
          matchers.splice(index, 1);
          if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      const index = findInsertionIndex(matcher, matchers);
      matchers.splice(index, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location$1, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location$1 && location$1.name) {
        matcher = matcherMap.get(location$1.name);
        if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location$1 });
        name = matcher.record.name;
        params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location$1.params && pickParams(location$1.params, matcher.keys.map((k) => k.name)));
        path = matcher.stringify(params);
      } else if (location$1.path != null) {
        path = location$1.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
          location: location$1,
          currentLocation
        });
        name = matcher.record.name;
        params = assign({}, currentLocation.params, location$1.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes2.forEach((route) => addRoute(route));
    function clearRoutes() {
      matchers.length = 0;
      matcherMap.clear();
    }
    return {
      addRoute,
      resolve,
      removeRoute,
      clearRoutes,
      getRoutes,
      getRecordMatcher
    };
  }
  function pickParams(params, keys) {
    const newParams = {};
    for (const key of keys) if (key in params) newParams[key] = params[key];
    return newParams;
  }
  function normalizeRouteRecord(record) {
    const normalized = {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: record.aliasOf,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in record ? record.components || null : record.component && { default: record.component }
    };
    Object.defineProperty(normalized, "mods", { value: {} });
    return normalized;
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) propsObject.default = props;
    else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf) return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta, record) => assign(meta, record.meta), {});
  }
  function findInsertionIndex(matcher, matchers) {
    let lower = 0;
    let upper = matchers.length;
    while (lower !== upper) {
      const mid = lower + upper >> 1;
      if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
      else lower = mid + 1;
    }
    const insertionAncestor = getInsertionAncestor(matcher);
    if (insertionAncestor) {
      upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    }
    return upper;
  }
  function getInsertionAncestor(matcher) {
    let ancestor = matcher;
    while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
  }
  function isMatchable({ record }) {
    return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
  }
  function useLink(props) {
    const router2 = inject(routerKey);
    const currentRoute = inject(routeLocationKey);
    const route = computed(() => {
      const to = unref(props.to);
      return router2.resolve(to);
    });
    const activeRecordIndex = computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length) return -1;
      const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index > -1) return index;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
    });
    const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        const p2 = router2[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
        if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p2);
        return p2;
      }
      return Promise.resolve();
    }
    return {
      route,
      href: computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  function preferSingleVNode(vnodes) {
    return vnodes.length === 1 ? vnodes[0] : vnodes;
  }
  const RouterLinkImpl = /* @__PURE__ */ defineComponent({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      },
      viewTransition: Boolean
    },
    useLink,
    setup(props, { slots }) {
      const link = /* @__PURE__ */ reactive(useLink(props));
      const { options } = inject(routerKey);
      const elClass = computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && preferSingleVNode(slots.default(link));
        return props.custom ? children : h("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;
    if (e.button !== void 0 && e.button !== 0) return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target)) return;
    }
    if (e.preventDefault) e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue) return false;
      } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = /* @__PURE__ */ defineComponent({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: { MODE: 3 },
    setup(props, { attrs, slots }) {
      const injectedRoute = inject(routerViewLocationKey);
      const routeToDisplay = computed(() => props.route || injectedRoute.value);
      const injectedDepth = inject(viewDepthKey, 0);
      const depth = computed(() => {
        let initialDepth = unref(injectedDepth);
        const { matched } = routeToDisplay.value;
        let matchedRoute;
        while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
        return initialDepth;
      });
      const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
      provide(viewDepthKey, computed(() => depth.value + 1));
      provide(matchedRouteKey, matchedRouteRef);
      provide(routerViewLocationKey, routeToDisplay);
      const viewRef = /* @__PURE__ */ ref();
      watch(() => [
        viewRef.value,
        matchedRouteRef.value,
        props.name
      ], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
            if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
          }
        }
        if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }, { flush: "post" });
      return () => {
        const route = routeToDisplay.value;
        const currentName = props.name;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[currentName];
        if (!ViewComponent) return normalizeSlot(slots.default, {
          Component: ViewComponent,
          route
        });
        const routePropsOption = matchedRoute.props[currentName];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
        };
        const component = h(ViewComponent, assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return normalizeSlot(slots.default, {
          Component: component,
          route
        }) || component;
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot) return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = /* @__PURE__ */ shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else record = parentOrRoute;
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) matcher.removeRoute(recordMatcher);
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
      currentLocation = assign({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute$1 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
        const href$1 = routerHistory.createHref(locationNormalized.fullPath);
        return assign(locationNormalized, matchedRoute$1, {
          params: decodeParams(matchedRoute$1.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href$1
        });
      }
      let matcherLocation;
      if (rawLocation.path != null) {
        matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
      } else {
        const targetParams = assign({}, rawLocation.params);
        for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
        matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign({
        fullPath,
        hash,
        query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
        from,
        to
      });
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to, from) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
          newTargetLocation.params = {};
        }
        return assign({
          query: to.query,
          hash: to.hash,
          params: newTargetLocation.path != null ? {} : to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve(to);
      const from = currentRoute.value;
      const data = to.state;
      const force = to.force;
      const replace$1 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation, from);
      if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
        state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
        force,
        replace: replace$1
      }), redirectedFrom || targetLocation);
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
          to: toLocation,
          from
        });
        handleScroll(from, from, true, false);
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure$1) => {
        if (failure$1) {
          if (isNavigationFailure(failure$1, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
            return pushWithRedirect(assign({ replace: replace$1 }, locationAsObject(failure$1.to), {
              state: typeof failure$1.to === "object" ? assign({}, data, failure$1.to.state) : data,
              force
            }), redirectedFrom || toLocation);
          }
        } else failure$1 = finalizeNavigation(toLocation, from, true, replace$1, data);
        triggerAfterEach(toLocation, from, failure$1);
        return failure$1;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function runWithContext(fn) {
      const app = installedApps.values().next().value;
      return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
        else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
    }
    function finalizeNavigation(toLocation, from, isPush, replace$1, data) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error) return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = !isBrowser ? {} : history.state;
      if (isPush) if (replace$1 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
      else routerHistory.push(toLocation.fullPath, data);
      currentRoute.value = toLocation;
      handleScroll(toLocation, from, isPush, isFirstNavigation);
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      if (removeHistoryListener) return;
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        if (!router2.listening) return;
        const toLocation = resolve(to);
        const shouldRedirect = handleRedirectRecord(toLocation, router2.currentRoute.value);
        if (shouldRedirect) {
          pushWithRedirect(assign(shouldRedirect, {
            replace: true,
            force: true
          }), toLocation).catch(noop);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(error, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error;
          if (isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
            pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
              if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info.delta && info.type === NavigationType.pop) routerHistory.go(-1, false);
            }).catch(noop);
            return Promise.reject();
          }
          if (info.delta) routerHistory.go(-info.delta, false);
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(toLocation, from, false);
          if (failure) {
            if (info.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info.delta, false);
            else if (info.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop);
      });
    }
    let readyHandlers = useCallbacks();
    let errorListeners = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorListeners.list();
      if (list.length) list.forEach((handler) => handler(error, to, from));
      else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
      return new Promise((resolve$1, reject) => {
        readyHandlers.add([resolve$1, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve$1, reject]) => err ? reject(err) : resolve$1());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      const { scrollBehavior } = options;
      if (!isBrowser || !scrollBehavior) return Promise.resolve();
      const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
      return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
    }
    const go = (delta) => routerHistory.go(delta);
    let started;
    const installedApps = /* @__PURE__ */ new Set();
    const router2 = {
      currentRoute,
      listening: true,
      addRoute,
      removeRoute,
      clearRoutes: matcher.clearRoutes,
      hasRoute,
      getRoutes,
      resolve,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorListeners.add,
      isReady,
      install(app) {
        app.component("RouterLink", RouterLink);
        app.component("RouterView", RouterView);
        app.config.globalProperties.$router = router2;
        Object.defineProperty(app.config.globalProperties, "$route", {
          enumerable: true,
          get: () => unref(currentRoute)
        });
        if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
          started = true;
          push(routerHistory.location).catch((err) => {
          });
        }
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true
        });
        app.provide(routerKey, router2);
        app.provide(routeLocationKey, /* @__PURE__ */ shallowReactive(reactiveRoute));
        app.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app.unmount;
        installedApps.add(app);
        app.unmount = function() {
          installedApps.delete(app);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            started = false;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    function runGuardQueue(guards) {
      return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
    }
    return router2;
  }
  function useRouter() {
    return inject(routerKey);
  }
  function useRoute(_name) {
    return inject(routeLocationKey);
  }
  const _hoisted_1$5 = { class: "min-h-screen bg-gradient-to-b from-amber-50 to-orange-100" };
  const _sfc_main$5 = /* @__PURE__ */ defineComponent({
    __name: "App",
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$5, [
          createVNode(unref(RouterView))
        ]);
      };
    }
  });
  const scriptRel = function detectScriptRel() {
    const relList = typeof document !== "undefined" && document.createElement("link").relList;
    return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
  }();
  const assetsURL = function(dep, importerUrl) {
    return new URL(dep, importerUrl).href;
  };
  const seen = {};
  const __vitePreload = function preload(baseModule, deps, importerUrl) {
    let promise = Promise.resolve();
    if (false) {
      const links = document.getElementsByTagName("link");
      const cspNonceMeta = document.querySelector(
        "meta[property=csp-nonce]"
      );
      const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
      promise = Promise.allSettled(
        deps.map((dep) => {
          dep = assetsURL(dep, importerUrl);
          if (dep in seen) return;
          seen[dep] = true;
          const isCss = dep.endsWith(".css");
          const cssSelector = isCss ? '[rel="stylesheet"]' : "";
          const isBaseRelative = !!importerUrl;
          if (isBaseRelative) {
            for (let i = links.length - 1; i >= 0; i--) {
              const link2 = links[i];
              if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
                return;
              }
            }
          } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
          }
          const link = document.createElement("link");
          link.rel = isCss ? "stylesheet" : scriptRel;
          if (!isCss) {
            link.as = "script";
          }
          link.crossOrigin = "";
          link.href = dep;
          if (cspNonce) {
            link.setAttribute("nonce", cspNonce);
          }
          document.head.appendChild(link);
          if (isCss) {
            return new Promise((res, rej) => {
              link.addEventListener("load", res);
              link.addEventListener(
                "error",
                () => rej(new Error(`Unable to preload CSS for ${dep}`))
              );
            });
          }
        })
      );
    }
    function handlePreloadError(err) {
      const e = new Event("vite:preloadError", {
        cancelable: true
      });
      e.payload = err;
      window.dispatchEvent(e);
      if (!e.defaultPrevented) {
        throw err;
      }
    }
    return promise.then((res) => {
      for (const item of res || []) {
        if (item.status !== "rejected") continue;
        handlePreloadError(item.reason);
      }
      return baseModule().catch(handlePreloadError);
    });
  };
  const routes = [
    {
      path: "/",
      name: "Home",
      component: () => __vitePreload(() => Promise.resolve().then(() => HomeView$1), false ? __VITE_PRELOAD__ : void 0, _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("assets/index-Cpy6u-vS.js", document.baseURI).href)
    },
    {
      path: "/quiz",
      name: "Quiz",
      component: () => __vitePreload(() => Promise.resolve().then(() => QuizView$1), false ? __VITE_PRELOAD__ : void 0, _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("assets/index-Cpy6u-vS.js", document.baseURI).href)
    },
    {
      path: "/result",
      name: "Result",
      component: () => __vitePreload(() => Promise.resolve().then(() => ResultView$1), false ? __VITE_PRELOAD__ : void 0, _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("assets/index-Cpy6u-vS.js", document.baseURI).href)
    }
  ];
  const router = createRouter({
    // 使用hash模式 - web-view对HTML5 History API支持不完善
    // hash模式在所有环境下都能正常工作，且在静态托管部署时不需要服务端路由配置
    history: createWebHashHistory(),
    routes
  });
  createApp(_sfc_main$5).use(router).mount("#app");
  const _hoisted_1$4 = { class: "home-container min-h-screen flex flex-col items-center justify-center relative overflow-hidden" };
  const _hoisted_2$4 = ["src"];
  const _hoisted_3$4 = { class: "absolute top-[100px] left-1/2 -translate-x-1/2 w-[135px] h-[135px] z-10" };
  const _hoisted_4$4 = ["src"];
  const _hoisted_5$4 = { class: "relative z-10 flex flex-col items-center px-4 pt-[110px]" };
  const _sfc_main$4 = /* @__PURE__ */ defineComponent({
    __name: "HomeView",
    setup(__props) {
      const router2 = useRouter();
      const baseUrl = "./";
      const handleStartTest = () => {
        router2.push("/quiz");
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$4, [
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
          }, null, 8, _hoisted_2$4),
          createBaseVNode("div", _hoisted_3$4, [
            createBaseVNode("img", {
              src: unref(baseUrl) + "images/silhouette_masked.png",
              alt: "剪影装饰",
              class: "w-full h-full object-contain opacity-85"
            }, null, 8, _hoisted_4$4)
          ]),
          createBaseVNode("div", _hoisted_5$4, [
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
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b62ca704"]]);
  const HomeView$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: HomeView
  }, Symbol.toStringTag, { value: "Module" }));
  const _hoisted_1$3 = { class: "flex justify-between items-center mb-4" };
  const _hoisted_2$3 = { class: "text-sm text-gray-400 tracking-widest" };
  const _hoisted_3$3 = { class: "text-lg font-medium text-[#2c3e50] mb-6 leading-relaxed tracking-widest" };
  const _hoisted_4$3 = { class: "space-y-3" };
  const _hoisted_5$3 = ["onClick"];
  const _hoisted_6$3 = {
    key: 0,
    class: "w-5 h-5 text-white",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  };
  const _hoisted_7$2 = { class: "mt-6 pt-4 border-t border-gray-200/50" };
  const _hoisted_8$2 = { class: "text-sm text-gray-500 text-center tracking-widest" };
  const _hoisted_9$2 = { key: 0 };
  const _hoisted_10$2 = { key: 1 };
  const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      const emit2 = __emit;
      const handleSelect = (optionIndex) => {
        emit2("select", optionIndex);
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
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("span", _hoisted_2$3, "问题 " + toDisplayString(__props.currentIndex + 1), 1),
            _cache[0] || (_cache[0] = createBaseVNode("span", { class: "px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full tracking-widest" }, "单选", -1))
          ]),
          createBaseVNode("p", _hoisted_3$3, toDisplayString(__props.question.text), 1),
          createBaseVNode("div", _hoisted_4$3, [
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
                __props.selectedOption === index ? (openBlock(), createElementBlock("svg", _hoisted_6$3, [..._cache[1] || (_cache[1] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  }, null, -1)
                ])])) : createCommentVNode("", true)
              ], 10, _hoisted_5$3);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_7$2, [
            createBaseVNode("p", _hoisted_8$2, [
              __props.selectedOption === void 0 || __props.selectedOption < 0 ? (openBlock(), createElementBlock("span", _hoisted_9$2, " 请选择一个最符合你的选项 ")) : (openBlock(), createElementBlock("span", _hoisted_10$2, " 已选择，请点击其他选项可更改 "))
            ])
          ])
        ], 4);
      };
    }
  });
  const QuestionCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-758b8acb"]]);
  const ELEMENT_MAP = {
    "金": "metal",
    "木": "wood",
    "水": "water",
    "火": "fire",
    "土": "earth"
  };
  const ELEMENT_MAP_REVERSE = {
    "metal": "金",
    "wood": "木",
    "water": "水",
    "fire": "火",
    "earth": "土"
  };
  const identityTypes = [
    {
      code: "0000",
      name: "隐逸诗人",
      dimension: "出世+文+江湖+守正",
      description: "以诗文寄托情怀，远离尘嚣的隐士，坚守内心原则",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "0001",
      name: "逍遥散人",
      dimension: "出世+文+江湖+权变",
      description: "自由不羁的江湖文人，随性而活，善于变通",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "0010",
      name: "清流隐官",
      dimension: "出世+文+庙堂+守正",
      description: "身在朝堂心在野的清官，坚守气节，不随波逐流",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "0011",
      name: "韬晦谋士",
      dimension: "出世+文+庙堂+权变",
      description: "深藏不露的谋士，隐于朝堂，待机而动",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "0100",
      name: "游侠剑客",
      dimension: "出世+武+江湖+守正",
      description: "行侠仗义、快意恩仇的江湖剑客，坚守侠义之道",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "0101",
      name: "江湖浪子",
      dimension: "出世+武+江湖+权变",
      description: "漂泊江湖的浪子，不拘一格，随遇而安",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "0110",
      name: "戍边隐将",
      dimension: "出世+武+庙堂+守正",
      description: "隐于边关的将领，忠诚戍守，不慕荣华",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "0111",
      name: "韬光将军",
      dimension: "出世+武+庙堂+权变",
      description: "韬光养晦的将军，隐忍待时，深谋远虑",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1000",
      name: "布衣学者",
      dimension: "入世+文+江湖+守正",
      description: "民间学者，治学严谨，传道授业，坚守本心",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1001",
      name: "幕僚策士",
      dimension: "入世+文+江湖+权变",
      description: "辅佐他人的策士，机智多变，善于谋划",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1010",
      name: "翰林学士",
      dimension: "入世+文+庙堂+守正",
      description: "翰林院学士，文采斐然，忠于职守，清正廉洁",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1011",
      name: "宰相权臣",
      dimension: "入世+文+庙堂+权变",
      description: "权倾朝野的宰相，精明强干，善于权术",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1100",
      name: "侠义豪杰",
      dimension: "入世+武+江湖+守正",
      description: "扶危济困的豪杰，重义轻利，坚守道义",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1101",
      name: "绿林枭雄",
      dimension: "入世+武+江湖+权变",
      description: "草莽枭雄，雄才大略，不拘常理",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1110",
      name: "戍边大将",
      dimension: "入世+武+庙堂+守正",
      description: "镇守边疆的大将，勇猛果敢，忠君爱国",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    },
    {
      code: "1111",
      name: "权谋将帅",
      dimension: "入世+武+庙堂+权变",
      description: "运筹帷幄的将帅，智勇双全，善于谋略",
      historical_figures: "待补充",
      personality_traits: [
        "待补充"
      ],
      daily_practice: "待补充",
      self_cultivation: "待补充"
    }
  ];
  const questions$1 = [
    {
      text: "在乱世中，你更倾向于...",
      options: [
        {
          text: "隐居山林，保全自身",
          weights: {
            "金": 1,
            "木": 3,
            "水": 1,
            "火": 0,
            "土": 0
          }
        },
        {
          text: "投身军旅，建功立业",
          weights: {
            "金": 2,
            "木": 0,
            "水": 0,
            "火": 3,
            "土": 1
          }
        },
        {
          text: "游说诸侯，合纵连横",
          weights: {
            "金": 1,
            "木": 1,
            "水": 2,
            "火": 1,
            "土": 0
          }
        },
        {
          text: "钻研技艺，传之后世",
          weights: {
            "金": 0,
            "木": 2,
            "水": 1,
            "火": 0,
            "土": 2
          }
        }
      ]
    },
    {
      text: "面对困境，你的第一反应是...",
      options: [
        {
          text: "冷静分析，制定策略",
          weights: {
            "金": 2,
            "木": 1,
            "水": 2,
            "火": 0,
            "土": 0
          }
        },
        {
          text: "寻求帮助，团结众人",
          weights: {
            "金": 0,
            "木": 2,
            "水": 3,
            "火": 0,
            "土": 0
          }
        },
        {
          text: "直面挑战，勇往直前",
          weights: {
            "金": 1,
            "木": 0,
            "水": 0,
            "火": 3,
            "土": 1
          }
        },
        {
          text: "观察等待，伺机而动",
          weights: {
            "金": 0,
            "木": 1,
            "水": 1,
            "火": 0,
            "土": 3
          }
        }
      ]
    },
    {
      text: "你更欣赏哪种人生境界？",
      options: [
        {
          text: "功成名就，位极人臣",
          weights: {
            "金": 3,
            "木": 0,
            "水": 0,
            "火": 2,
            "土": 0
          }
        },
        {
          text: "闲云野鹤，逍遥自在",
          weights: {
            "金": 0,
            "木": 3,
            "水": 1,
            "火": 0,
            "土": 1
          }
        },
        {
          text: "著书立说，传道授业",
          weights: {
            "金": 1,
            "木": 2,
            "水": 1,
            "火": 1,
            "土": 0
          }
        },
        {
          text: "扶危济困，行侠仗义",
          weights: {
            "金": 0,
            "木": 1,
            "水": 0,
            "火": 3,
            "土": 1
          }
        }
      ]
    },
    {
      text: "你更喜欢哪种学习或提升自我的方式？",
      options: [
        {
          text: "读书写字，钻研经典",
          weights: {
            "金": 1,
            "木": 3,
            "水": 2,
            "火": 0,
            "土": 1
          }
        },
        {
          text: "习武练功，强身健体",
          weights: {
            "金": 3,
            "木": 0,
            "水": 0,
            "火": 2,
            "土": 1
          }
        },
        {
          text: "游历四方，实践探索",
          weights: {
            "金": 0,
            "木": 2,
            "水": 3,
            "火": 1,
            "土": 0
          }
        },
        {
          text: "静坐沉思，内观自省",
          weights: {
            "金": 0,
            "木": 1,
            "水": 1,
            "火": 0,
            "土": 3
          }
        }
      ]
    },
    {
      text: "你向往的生活环境是？",
      options: [
        {
          text: "山林江湖，自由自在",
          weights: {
            "金": 0,
            "木": 3,
            "水": 2,
            "火": 0,
            "土": 0
          }
        },
        {
          text: "朝堂庙堂，建功立业",
          weights: {
            "金": 3,
            "木": 0,
            "水": 0,
            "火": 2,
            "土": 2
          }
        },
        {
          text: "市井民间，烟火人间",
          weights: {
            "金": 0,
            "木": 2,
            "水": 1,
            "火": 1,
            "土": 2
          }
        },
        {
          text: "边塞关隘，戍守边疆",
          weights: {
            "金": 2,
            "木": 1,
            "水": 0,
            "火": 1,
            "土": 3
          }
        }
      ]
    },
    {
      text: "面对道德困境，你的第一选择是？",
      options: [
        {
          text: "坚守原则，宁折不弯",
          weights: {
            "金": 3,
            "木": 0,
            "水": 0,
            "火": 0,
            "土": 2
          }
        },
        {
          text: "灵活变通，权衡利弊",
          weights: {
            "金": 0,
            "木": 1,
            "水": 3,
            "火": 1,
            "土": 0
          }
        },
        {
          text: "寻求中庸之道，平衡各方",
          weights: {
            "金": 1,
            "木": 2,
            "水": 1,
            "火": 0,
            "土": 2
          }
        },
        {
          text: "暂时回避，等待时机",
          weights: {
            "金": 0,
            "木": 1,
            "水": 2,
            "火": 0,
            "土": 2
          }
        }
      ]
    },
    {
      text: "在社交中，你更接近哪种风格？",
      options: [
        {
          text: "独来独往，享受孤独",
          weights: {
            "金": 1,
            "木": 0,
            "水": 1,
            "火": 0,
            "土": 3
          }
        },
        {
          text: "广交朋友，豪爽仗义",
          weights: {
            "金": 2,
            "木": 1,
            "水": 0,
            "火": 3,
            "土": 0
          }
        },
        {
          text: "谨慎择友，深交几人",
          weights: {
            "金": 1,
            "木": 2,
            "水": 2,
            "火": 0,
            "土": 1
          }
        },
        {
          text: "随缘而遇，不强求",
          weights: {
            "金": 0,
            "木": 3,
            "水": 2,
            "火": 0,
            "土": 1
          }
        }
      ]
    }
  ];
  const metadata = {
    version: "v1.1",
    description: "古代身份测试简化版数据 - 16基础类初版",
    created_at: "2026-04-14",
    note: "第一版功能测试用，包含16个基础类和7道测试题。五行权重为初版，后续可优化。"
  };
  const rawDataV1 = {
    identityTypes,
    questions: questions$1,
    metadata
  };
  const version = "v2.1_updated_with_v2.6_questions";
  const description = "古代身份测试优化版 - 80五行变体 + 29题优化版（权重统一修复） (题目数据已更新至v2.6定版)";
  const created_at = "2026-04-18";
  const created_by = "元贞 · 常明院运营元灵";
  const optimized_by = "墨玄 · 玄明神系文案创作分神";
  const note = "基于v2.0版本，统一所有选项五行权重总和为6，修复运行时权重问题";
  const statistics = {
    total_identities: 80,
    total_questions: 29,
    total_options: 116,
    elements_distribution: {
      "金": 16,
      "木": 16,
      "水": 16,
      "火": 16,
      "土": 16
    },
    identity_completeness: "100%",
    question_completeness: "100%",
    element_balance: "完美平衡",
    weight_sum_unified: true,
    target_weight_sum: 6
  };
  const identities = [
    {
      id: "0000-金",
      code: "0000",
      name: "孤松隐者",
      category: "隐逸诗人",
      category_desc: "出世+文+江湖+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "魏征",
      core_description: "如孤松立于绝壁，以冷峻诗文映照浮华。坚守原则如金石，宁“犯颜直谏”也要保持原则，此为“以退为进”的智慧。隐逸是主动的“心隐”——身处江湖，心如明镜。诗风刚健清冽，字里行间是不容玷污的孤傲与道心。魏征的精神如松针刺破虚伪，留下清白印记。",
      personality_traits: [
        "心如金石，志不可夺",
        "清操自守，孤高不群",
        "以松为镜，观照本心",
        "冷眼观世，热肠护道",
        "隐中求真，静中得慧"
      ],
      daily_practice: "望着窗外笔直的树木，心里的纷乱会慢慢沉淀下来。整理空间时，会不自觉地物归其位，如同梳理内心的原则。偶尔翻看过去的记录，字迹或许模糊，但当时的心境依然清晰。月末静坐片刻，回想这个月说过的话、做过的事，检视是否背离了内心的准则。",
      self_cultivation: "修身进德之道，在于学习孤松风大时稍弯，风过后复原的智慧，在坚守中懂得灵活；在消费时代选择简朴生活，保持如魏征般的清白；平衡冷眼看清世事与热肠关怀他人；每月检视初心与原则，如松树年轮记录成长。"
    },
    {
      id: "0000-木",
      code: "0000",
      name: "东篱居士",
      category: "隐逸诗人",
      category_desc: "出世+文+江湖+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "陶渊明",
      core_description: "如春日新木般温和包容，隐逸是回归自然本真的智慧选择。“采菊东篱下，悠然见南山”并非逃避，而是“道法自然”的践行。其诗文如春风化雨，字里行间是对平凡生活的深情凝视，透着仁爱与生机。陶渊明的精神在于发现日常中的道韵，在简朴中体会“道在日用”的真谛，如木之生长，自然而然地伸展枝叶，拥抱阳光雨露。",
      personality_traits: [
        "仁如春风，润物无声",
        "悲天悯人，草木同春",
        "超然物外，心随自然",
        "诗意栖居，道法天真",
        "内心宁静，如木深根"
      ],
      daily_practice: "看到植物静静生长，那小小的金黄花朵，不争不抢。给植物浇水时，水滴落在叶子上，像清晨的露珠。午后散步，路边的野草顶着阳光，倔强又温柔。听到孩子的笑声清脆，忍不住也跟着笑起来。夜晚灯下读陶渊明的诗，那些关于菊花和南山的句子，忽然懂了那份自在。",
      self_cultivation: "修身进德之道，在于学习树木向下扎根，向上生长的智慧，在温和中保持坚韧；培养悲天悯人的情怀，如草木关怀大地般体察他人；在快节奏中保持悠然见南山的心境，体会道法自然的从容；定期反思个人成长，如树木年轮般记录岁月的馈赠。"
    },
    {
      id: "0000-水",
      code: "0000",
      name: "云水散人",
      category: "隐逸诗人",
      category_desc: "出世+文+江湖+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "王维",
      core_description: "以流动的智慧看待世事变迁，“一蓑烟雨任平生”是“上善若水”的践行。隐逸不是固守，而是“随物赋形”的流动智慧。其诗文如云水般通透豁达，“行到水穷处，坐看云起时”正是随遇而安的玄明心境。王维的精神在于“水善利万物而不争”，在流动中保持深沉，在变通中保持本真。",
      personality_traits: [
        "智慧如流，随物赋形",
        "深谋远虑，静观其变",
        "超然物外，云水心境",
        "诗意栖居，道法自然",
        "内心宁静，静水深流"
      ],
      daily_practice: "看云慢慢飘过，形状变换着，从东到西。泡茶时，茶叶在热水中舒展，沉下去又浮上来。原定的计划临时取消，倒也不急，翻出想读的书，安静地看。水流不争先，争的是滔滔不绝。",
      self_cultivation: "修身进德之道，在于学习水上善若水，水善利万物而不争的品格，培养润物无声的智慧；修炼静水深流的深沉，在喧嚣中保持内心的宁静；在变化中保持以不变应万变的定力，体会道法自然的从容；定期反思个人成长是否流水不腐，保持精神的新鲜与活力。"
    },
    {
      id: "0000-火",
      code: "0000",
      name: "醉吟狂客",
      category: "隐逸诗人",
      category_desc: "出世+文+江湖+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "李白",
      core_description: "以火热的诗情反抗平庸，“安能摧眉折腰事权贵”是“如火热情”的生命宣言。隐逸不是熄灭火焰，而是以另一种方式燃烧——如烛火照亮黑暗，如燎原之火传递光明。其诗文豪放不羁，“天生我材必有用”正是创造生发的自信。李白的精神在于“光明正大”的热情，在束缚中寻求自由，在平庸中创造不凡。",
      personality_traits: [
        "热情如火，照亮四方",
        "古道热肠，侠义心肠",
        "超然物外，心向光明",
        "诗意栖居，创造为乐",
        "内心宁静，火焰内敛"
      ],
      daily_practice: "突然想写点什么，纸笔摊开，墨水洇开，像心里的念头。念李白的诗，天生我材必有用，念完自己先笑起来。下午把旧吉他拿出来，弦音有些走调，弹着弹着就顺畅了。朋友来喝茶，聊起最近的困惑，忍不住多说了几句，希望那些话能像小小的火苗，在他心里亮一下。",
      self_cultivation: "修身进德之道，在于学习火光明正大的品格，让热情如烛火般照亮而不灼伤；培养热情与节制的平衡，体会过犹不及的中道智慧；在创造中感悟道生一，一生二，二生三，三生万物的玄明理念；定期反思个人热情是否照亮他人而非炫耀自我，保持精神的纯粹与光明。"
    },
    {
      id: "0000-土",
      code: "0000",
      name: "山居诗人",
      category: "隐逸诗人",
      category_desc: "出世+文+江湖+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "杜甫",
      core_description: "如大地般沉稳包容，“明月松间照，清泉石上流”是“厚德载物”的具体呈现。隐逸是扎根于生活实景，在山水间找到精神的根基。其诗文踏实稳重，“安得广厦千万间”正是责任担当的胸怀。杜甫的精神在于“稳如泰山”的务实，在动荡中保持沉稳，在平凡中体现伟大。",
      personality_traits: [
        "沉稳如山，根基深厚",
        "稳重持成，责任在肩",
        "超然物外，心系苍生",
        "诗意栖居，道在平常",
        "内心宁静，厚土载物"
      ],
      daily_practice: "醒来不急着起床，先想想今天要做的事。煮粥时，看米粒在水里翻滚。下午整理账本，一笔一笔对清楚，心里也跟着踏实。邻居老人提着菜篮子上楼，顺手接过来，送到家门口。晚上在台历上打个勾，这一天没虚度，像山上的石头，稳稳当当。",
      self_cultivation: "修身进德之道，在于学习大地厚德载物的品格，培养包容万物的胸怀；在沉稳中保持灵活性，体会刚柔并济的智慧；在务实生活中发现道在平常的玄明真谛；定期反思个人根基是否深厚稳固，如树木检查根系般关注精神与生活的健康基础。"
    },
    {
      id: "0001-金",
      code: "0001",
      name: "野鹤闲云",
      category: "逍遥散人",
      category_desc: "出世+文+江湖+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "庄子",
      core_description: "表面随性如云，内心却有金石般的风骨，此乃“逍遥中的原则”。庄子“吾将曳尾于涂中”不是逃避，而是“道法自然”的智慧选择——宁可做泥中自在的龟，也不做庙堂被束缚的神龟。其逍遥是“乘天地之正，而御六气之辩”的精神自由，在看似随性中保持内心的刚毅与清明，如野鹤闲云般自在，却有松柏般的风骨。",
      personality_traits: [
        "外如闲云，内如金石",
        "逍遥自在，原则在心",
        "不拘礼法，道法自然",
        "乐观豁达，心向光明",
        "自由探索，精神独立"
      ],
      daily_practice: "看云在天空飘过，一团一团的，像棉花又像山峦。风来了，云就慢慢走，风停了，云也停。想起庄子说的曳尾于涂中，做泥里的龟也挺好。泡茶时，水沸时咕嘟咕嘟响，茶叶在杯子里转圈。摊开本子写几行字，不讲究章法，想到哪写到哪。月底翻看这些记录，发现有些话反复出现，大概那就是心里真正在意的东西吧。",
      self_cultivation: "修身进德之道，在于学习庄子逍遥游的智慧，在自由中保持道心稳固；培养外柔内刚的品格，表面随和内心坚定；在世俗束缚中寻找精神飞翔的空间，体会独与天地精神往来的境界；定期反思个人是否既自在又有根，如野鹤虽闲云野鹤，却知归处。"
    },
    {
      id: "0001-木",
      code: "0001",
      name: "和风闲客",
      category: "逍遥散人",
      category_desc: "出世+文+江湖+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "白居易",
      core_description: "如和风般温和包容，践行“御风而行”的轻盈智慧。白居易的逍遥不是逃避，而是“与物为春”的自然生长——在世俗中保持精神的超然，如春木般生机盎然却不为风雨所动。其智慧在于“随风潜入夜，润物细无声”，在温和中蕴含力量，在包容中保持本真，如木之生长，自然而然地向上伸展。",
      personality_traits: [
        "温和如风，包容万物",
        "仁厚宽和，生机盎然",
        "自由自在，御风而行",
        "不拘礼法，道法自然",
        "乐观豁达，心向阳光"
      ],
      daily_practice: "推窗，风轻轻吹进来，带着点青草的味道。植物又长出新叶，嫩嫩的，卷着边。给它浇点水，水珠在叶面上滚来滚去。下午朋友来诉苦，倒了杯茶，安静听着，偶尔说一两句。傍晚散步，看到孩子玩耍，笑声一串一串的。回家翻开白居易的诗集，读到野火烧不尽，春风吹又生，心里忽然软软的。",
      self_cultivation: "修身进德之道，在于学习白居易御风而行的智慧，在温和中保持精神的超然；培养与物为春的包容心，如春风般滋养万物而不求回报；在快节奏中修炼轻盈生长的心态，体会道法自然的从容；定期反思个人是否温和有度、包容有节，如树木般既伸展枝叶又扎根大地。"
    },
    {
      id: "0001-水",
      code: "0001",
      name: "随波行者",
      category: "逍遥散人",
      category_desc: "出世+文+江湖+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "张衡",
      core_description: "深谙“上善若水”的哲学，随波但不逐流，顺应但不盲从。张衡的“科学探秘”实则是“水之智慧”的体现——在看似随性的探索中保持内心的澄明。其逍遥是动态的平衡艺术，如水流般适应万物而不失本真，在变化中寻找“道”的不变，在流动中沉淀“心”的定力。",
      personality_traits: [
        "灵活如水，随物赋形",
        "通权达变，智慧深沉",
        "自由自在，随波而行",
        "不拘礼法，道法自然",
        "乐观豁达，静水流深"
      ],
      daily_practice: "看小溪里的落叶，随着水流打转，不抗拒也不着急。雨下大了，水流顺着玻璃淌，一道一道的。原定要出门，雨太大，索性在家翻出张衡的地动仪图册看。晚上雨停了，月亮出来，积水映着月光，亮晶晶的。计划总是赶不上变化，但变化里也有好看的时候。",
      self_cultivation: "修身进德之道，在于学习水上善若水，水善利万物而不争的品格，培养润物无声的智慧；修炼静水流深的深沉，在喧嚣中保持内心的宁静；在变化中保持以不变应万变的定力，体会道法自然的从容；定期反思个人是否流水不腐，保持精神的新鲜与活力。"
    },
    {
      id: "0001-火",
      code: "0001",
      name: "狂歌浪子",
      category: "逍遥散人",
      category_desc: "出世+文+江湖+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "辛弃疾",
      core_description: "以火热的诗情挑战平庸与虚伪，辛弃疾的“狂歌”是内心火焰的外显。其逍遥是燃烧式的生命表达——用才华的火光照亮黑暗，用激情的火焰点燃生命。看似不羁的狂歌浪迹，实则是“如火热情”对世俗束缚的反抗，在压抑中爆发，在黑暗中燃烧，追求精神的绝对自由与光明。",
      personality_traits: [
        "热情如火，照亮四方",
        "热血丹心，侠义心肠",
        "自由自在，狂歌不羁",
        "不拘礼法，心向光明",
        "乐观豁达，火焰内敛"
      ],
      daily_practice: "忽然很想大声念辛弃疾的词，醉里挑灯看剑，梦回吹角连营。念到激烈处，自己都觉得热血上涌。下午阳光刺眼，把画具翻出来，颜料挤得乱七八糟，在纸上涂了大片大片的红。朋友打电话来，声音低低的，说了很多鼓励的话，挂断时感觉他语气轻快了些。夜里睡不着，爬起来写了几句诗，不押韵也不要紧，痛快就行。",
      self_cultivation: "修身进德之道，在于学习火光明正大的品格，让热情如烛火般照亮而不灼伤；培养热情与节制的平衡，体会过犹不及的中道智慧；在创造中感悟道生一，一生二，二生三，三生万物的玄明理念；定期反思个人热情是否照亮他人而非炫耀自我，保持精神的纯粹与光明。"
    },
    {
      id: "0001-土",
      code: "0001",
      name: "稳居闲客",
      category: "逍遥散人",
      category_desc: "出世+文+江湖+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "陆游",
      core_description: "如大地般沉稳厚重，却向往精神的无垠天空，陆游的“稳居”是“厚德载物”的践行。其逍遥是接地气的诗意——不脱离生活的土壤，但在日常中开辟出精神的飞翔空间。在现实的稳定中寻求精神的超越，如土之包容万物，又如山岳般坚定不移，在沉稳中蕴含内在的生机与力量。",
      personality_traits: [
        "沉稳如山，根基深厚",
        "脚踏实地，务实负责",
        "自由自在，心向天空",
        "不拘礼法，道在平常",
        "乐观豁达，厚土载物"
      ],
      daily_practice: "醒来不急着起床，先在床上躺一会儿，感受身体慢慢苏醒，一切安好。检查食物，够吃三天。记账本摊开，上月开销有点大，这个月得紧些。下午把书重新整理，按高低排好，看着整齐。母亲打电话来，絮絮叨叨说些家常，耐心听了半小时。晚上临睡前，想想今天做了什么，明天要做什么，心里有数才能睡得踏实。",
      self_cultivation: "修身进德之道，在于学习大地厚德载物的品格，培养包容万物的胸怀；在沉稳中保持灵活性，体会刚柔并济的智慧；在务实生活中发现道在平常的玄明真谛；定期反思个人根基是否深厚稳固，如树木检查根系般关注精神与生活的健康基础。"
    },
    {
      id: "0010-金",
      code: "0010",
      name: "冰心清臣",
      category: "清流隐官",
      category_desc: "出世+文+庙堂+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "屈原",
      core_description: "庙堂中的“清正隐官”，以清廉刚正如金玉般坚贞。屈原的“清如玉壶冰”是“金石之志”的写照——在复杂环境中坚守道德底线，宁可“宁折不弯”也不妥协。其隐逸是在权力中心守护一片清白天地，行事光明磊落，敢于“逆龙鳞”直谏，在庙堂中保持精神的独立与高洁，如寒冰般清澈，又如金石般坚定。",
      personality_traits: [
        "行事果断，雷厉风行",
        "刚正不阿，宁折不弯",
        "清正廉洁，冰心玉壶",
        "坚守原则，金石之志",
        "不慕荣利，心向清白"
      ],
      daily_practice: "桌面擦得干干净净，文具摆放整齐，像一片无尘的雪地。工作中遇到不公的事，没犹豫就说了出来，说完心里反倒松快。午间读几段离骚，那些关于香草美人的句子，字字都是不肯弯腰的倔强。路过花店，买一束白菊，插在清水瓶里，看着花瓣慢慢舒展。夜里回想这一天，有没有哪句话违了心，有没有哪件事失了分寸。",
      self_cultivation: "修身进德之道，在于学习屈原冰心玉壶的品格，培养高洁不染的精神；修炼宁折不弯的风骨，在压力下保持原则的坚定；在复杂环境中保持清白天地的内心，体会道在正直的玄明真谛；定期反思个人是否初心如冰，确保精神的纯粹与高洁。"
    },
    {
      id: "0010-木",
      code: "0010",
      name: "望鹤雅士",
      category: "清流隐官",
      category_desc: "出世+文+庙堂+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "范仲淹",
      core_description: "仁德如春，身在庙堂心向山林，此乃“望鹤”之雅志。范仲淹的“先忧后乐”是“仁木之心”的体现——在权力中心保持隐逸心态，以仁德教化同僚，春风化雨般影响朝政。其隐逸是精神上的超脱，虽处高位却心怀山林之志，在务实政务中保持文人雅趣与道心澄明。",
      personality_traits: [
        "仁德如春，润泽万物",
        "悲天悯人，先忧后乐",
        "清正廉洁，雅士风范",
        "坚守原则，心向山林",
        "不慕荣利，志在苍生"
      ],
      daily_practice: "看新闻时，某个地方受灾了，心里沉了一下。见到新同事紧张，主动聊了几句，带他熟悉环境。午休时读岳阳楼记，先天下之忧而忧，后天下之乐而乐，念了几遍。下午给山区助学项目转了笔小钱，不多，但心意在。散步时，看到社区公告栏贴了旧衣捐赠通知，回家收拾了几件干净的。夜里想，明天还能做点什么让周围好一点呢。",
      self_cultivation: "修身进德之道，在于学习范仲淹先忧后乐的胸怀，培养悲天悯人的仁德；修炼望鹤高远的志向，在世俗中保持精神的超脱；在务实中体会道在仁心的玄明真谛，以仁德润泽万物；定期反思个人是否志存高远而行在实处，确保精神的雅正与务实。"
    },
    {
      id: "0010-水",
      code: "0010",
      name: "镜湖静臣",
      category: "清流隐官",
      category_desc: "出世+文+庙堂+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "苏轼",
      core_description: "智慧如水，深谙“和光同尘”之道，此乃“水之智慧”的圆融。苏轼的“在朝能隐”是“镜湖静臣”的体现——心如明镜洞察世事，形如静湖不露锋芒。在复杂关系中游刃有余，既能保持清白又能保全自身，如水般灵活适应却坚守本心，在体制内寻找智慧的生存空间。",
      personality_traits: [
        "智慧如水，洞察世事",
        "通权达变，和光同尘",
        "清正廉洁，心若明镜",
        "坚守原则，灵活周旋",
        "不慕荣利，志在澄明"
      ],
      daily_practice: "泡茶，看茶叶在杯子里一芽一芽立起来，又慢慢沉下去。工作会议上意见不合，没急着争，先听完所有人的话，再慢慢说自己的想法。午后读苏轼的定风波，莫听穿林打叶声，何妨吟啸且徐行，心里也跟着开阔。路上堵车，不急，打开广播听戏曲，跟着哼两句。晚上写日记，想想今天有没有哪句话说得太硬，有没有哪件事处理得太软。",
      self_cultivation: "修身进德之道，在于学习苏轼在朝能隐的智慧，培养镜湖心境的澄明；修炼和光同尘的圆融，在复杂中保持清白与适应；在灵活中体会道在圆融的玄明真谛，寻找智慧生存的空间；定期反思个人是否澄明与适应并重，确保精神的通透与处世的智慧。"
    },
    {
      id: "0010-火",
      code: "0010",
      name: "清谏直臣",
      category: "清流隐官",
      category_desc: "出世+文+庙堂+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "海瑞",
      core_description: "热情如火的“赤旃清谏”，以改革涤荡浊流，此乃“如火热情”在庙堂的燃烧。海瑞的刚正不阿是“赤焰风骨”的体现——赤色旗帜象征改革热情，清谏代表正直敢言。其隐逸不是逃避，而是以另一种方式燃烧，在体制内推动变革，以火德涤荡积弊，虽风险重重仍勇往直前，如烈火燎原般不可阻挡。",
      personality_traits: [
        "富有激情，如火燃烧",
        "热血丹心，赤胆忠心",
        "清正廉洁，风骨铮铮",
        "坚守原则，宁折不弯",
        "不慕荣利，志在革新"
      ],
      daily_practice: "看新闻里某个官员被查，心里叫了声好。流程明显不合理，写了封建议邮件发出去，不管有没有回应。中午读海瑞传，他抬着棺材骂皇帝，真是不要命的热血。下午见同事受了委屈，帮着说了几句话，虽然有点得罪人。散步时，看到路灯坏了，记下位置明天报修。改革未必是大事，身边这些小事先做起来。",
      self_cultivation: "修身进德之道，在于学习海瑞刚正不阿的风骨，培养宁折不弯的品格；修炼赤焰热情的节制，让改革之火照亮而不灼伤；在变革中体会道在革新的玄明理念，推动积极变化；定期反思个人是否热情与理性并重，确保改革的有效与可持续。"
    },
    {
      id: "0010-土",
      code: "0010",
      name: "砥柱重臣",
      category: "清流隐官",
      category_desc: "出世+文+庙堂+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "包拯",
      core_description: "稳重如土的“砥柱中流”，在动荡朝局中稳守正道，此乃“厚土之德”的担当。包拯的刚正清廉是“如山沉稳”的体现——如中流砥柱般坚定，在党争倾轧中保持中立清醒。其隐逸是扎根于具体政务，在踏实工作中找到精神寄托，不慕虚名只求实效，如大地般包容厚重，守护朝廷根基。",
      personality_traits: [
        "务实负责，脚踏实地",
        "沉稳如山，砥柱中流",
        "清正廉洁，刚正不阿",
        "坚守原则，中立清醒",
        "不慕荣利，志在根基"
      ],
      daily_practice: "把今天要处理的文件一份份排好，不急，按顺序来。同事间有争执，没偏袒谁，先把事实弄清楚。午间看包公案，铡美案那段，铡刀落下时心里跟着一紧。下午审核报表，数字不对就是不对，打回去重做。家里水管坏了，联系了维修师傅，叮嘱价格要公道。夜里想想，今天有没有哪个决定做得轻率，有没有哪件事推卸了责任。",
      self_cultivation: "修身进德之道，在于学习包拯刚正不阿的品格，培养如山沉稳的定力；修炼砥柱中流的担当，在动荡中保持清醒中立；在务实中体会道在根基的玄明真谛，守护个人与环境的稳定；定期反思个人是否根基深厚，确保精神的坚实与责任的履行。"
    },
    {
      id: "0011-金",
      code: "0011",
      name: "龙剑藏锋",
      category: "韬晦谋士",
      category_desc: "出世+文+庙堂+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "范蠡",
      core_description: "隐忍锐利，待时而出，如龙剑藏于匣中，此乃“金石之智”的深藏。范蠡的“隐忍待时”是“龙剑藏锋”的智慧——平时不露锋芒，关键时刻一击必中。其谋略是隐蔽而精准的，以张良“运筹帷幄”为境界，在等待中积蓄力量，在时机成熟时锋芒毕露，如金石般坚忍而锐利。",
      personality_traits: [
        "原则性强，金石之志",
        "忠诚守信，隐忍待时",
        "深藏不露，龙剑藏锋",
        "谋略深远，运筹帷幄",
        "耐心等待，时机把握"
      ],
      daily_practice: "摆开棋局，黑白子落得慢，一局能下整个下午。看财经新闻时，不急着判断，先记住几个关键数字。记着些零碎想法，有些已经放了几个月。周末复盘一周的事，哪些话该说没说，哪些事该做没做。隐忍不是不作为，是等到最好的那个点。",
      self_cultivation: "修身进德之道，在于学习范蠡隐忍待时的智慧，培养隐忍待时的品格；修炼深藏不露的定力，在浮躁中保持内心的沉稳；在等待中体会道在时机的玄明真谛，把握恰到好处的出击时刻；定期反思个人是否藏锋以待时，确保智慧与力量的恰当运用。"
    },
    {
      id: "0011-木",
      code: "0011",
      name: "卧雪隐客",
      category: "韬晦谋士",
      category_desc: "出世+文+庙堂+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "张良",
      core_description: "隐忍坚韧，暗中生长，如青松卧于雪下，此乃“仁木之隐”的智慧。张良的“功成身退”是“卧雪隐客”的境界——表面平静地下却在积蓄力量，不急于一时的得失。其谋略是长期布局，以范蠡“隐忍待时”为智慧，等待“风起雪融”的时机，如春木般在暗中生长，待时而发。",
      personality_traits: [
        "温和包容，仁厚宽和",
        "深藏不露，卧雪隐忍",
        "谋略深远，长期布局",
        "耐心等待，风起雪融",
        "功成身退，境界超然"
      ],
      daily_practice: "书架上那本《史记》翻得很旧了，张良传那几页尤其皱。报了个线上课程，不急着赶进度，每天学一点。植物从一根藤长成一片，用了大半年。写五年计划时，列的不是具体目标，而是想成为什么样的人。有时候最有力的行动，是什么都不做，只是等。",
      self_cultivation: "修身进德之道，在于学习张良功成身退的智慧，培养卧雪隐忍的品格；修炼暗中生长的耐心，在等待中积蓄力量；在隐忍中体会道在时机的玄明真谛，把握恰到好处的行动时刻；定期反思个人是否隐忍而有为，确保智慧的积累与恰当的展现。"
    },
    {
      id: "0011-水",
      code: "0011",
      name: "潜蛟伏士",
      category: "韬晦谋士",
      category_desc: "出世+文+庙堂+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "诸葛亮",
      core_description: "“深潭潜蛟”，深藏不露，伺机而动，此乃“水之智慧”的深潜。诸葛亮的“卧龙”正是“潜蛟伏士”的写照——如蛟龙潜伏深潭，平时不见踪影，风云际会时便化龙飞天。其谋略是彻底的隐藏，不露痕迹，在暗处洞悉一切，以道家“知雄守雌”为哲学，在低调中掌控全局，如水般深沉而有力。",
      personality_traits: [
        "灵活变通，如水随形",
        "深谋远虑，洞悉全局",
        "深藏不露，潜蛟伏士",
        "谋略深远，知雄守雌",
        "耐心等待，伺机而动"
      ],
      daily_practice: "读《三国志》到隆中对那段，停了好久。诸葛亮那时也就二十多岁，怎么就能看清天下三分。整理资料，分门别类，像在布一个看不见的局。看国际新闻时，试着分析背后的利益关系，不一定对，但锻炼思维。真正的力量有时不在于显露多少，而在于隐藏多少。",
      self_cultivation: "修身进德之道，在于学习诸葛亮深谋远虑的智慧，培养深潜智慧的品格；修炼知雄守雌的哲学，在强大中保持低调；在潜伏中体会道在深潜的玄明真谛，把握恰到好处的展现时机；定期反思个人是否深藏而有为，确保智慧的深沉与行动的精准。"
    },
    {
      id: "0011-火",
      code: "0011",
      name: "明烛智主",
      category: "韬晦谋士",
      category_desc: "出世+文+庙堂+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "司马懿",
      core_description: "“暗室明烛”，暗中谋划，洞烛先机，此乃“火之智慧”的洞察。司马懿的“隐忍待时”是“明烛智主”的体现——在黑暗环境中点燃智慧明烛，虽处暗处却能照亮前路。其谋略是预判与布局，以道家“将欲歙之，必固张之”为策略，在众人未觉时已看清局势，如火般在暗中燃烧，待时而发，洞悉先机。",
      personality_traits: [
        "智慧如火，暗室明烛",
        "洞烛先机，明察秋毫",
        "深藏不露，隐忍待时",
        "谋略深远，预判布局",
        "耐心等待，伺机而动"
      ],
      daily_practice: "看影视剧时，特意注意人物的微表情。开会前，把可能的问题和应对都想一遍。遇到突发状况，先深呼吸，数到十再开口。晚上复盘，今天哪句话说对了，哪句话说早了。智慧有时候是知道什么时候该亮，什么时候该藏。",
      self_cultivation: "修身进德之道，在于学习司马懿隐忍待时的智慧，培养洞烛先机的品格；修炼洞烛先机的洞察力，在复杂中看清本质；在暗中体会道在预判的玄明真谛，把握恰到好处的行动时机；定期反思个人是否明察秋毫，确保智慧的精准与行动的恰当。"
    },
    {
      id: "0011-土",
      code: "0011",
      name: "待风稳客",
      category: "韬晦谋士",
      category_desc: "出世+文+庙堂+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "鲁智深",
      core_description: "“磐石待风”，沉稳待时，根基深厚，此乃“厚土之德”的等待。鲁智深的“粗中有细”是“待风稳客”的智慧——如磐石般坚定稳重，根基扎实，等待合适的风向。其谋略是耐心等待，不妄动不躁进，以道家“无为而无不为”为哲学，在沉稳中把握时机，如大地般包容而坚定。",
      personality_traits: [
        "沉稳如山，磐石待风",
        "稳重持成，根基深厚",
        "深藏不露，待风稳客",
        "谋略深远，无为有为",
        "耐心等待，时机把握"
      ],
      daily_practice: "看天气预报，明天有雨，提前把花盆挪进来。朋友说要创业，没急着给建议，先听他讲完整个计划。锻炼时，不追求最大重量，注重动作标准不受伤。小吃店老板孩子上学缺钱，悄悄转了点，不留名。有时候等待不是被动，是在积蓄能帮到别人的力量。",
      self_cultivation: "修身进德之道，在于学习鲁智深沉稳待时的智慧，培养磐石待风的品格；修炼无为而有为的哲学，在等待中完成布局；在沉稳中体会道在根基的玄明真谛，把握恰到好处的行动时机；定期反思个人是否根基深厚，确保精神的坚定与等待的价值。"
    },
    {
      id: "0100-金",
      code: "0100",
      name: "听潮剑隐",
      category: "游侠剑客",
      category_desc: "出世+武+江湖+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "荆轲",
      core_description: "“听潮剑隐”，剑如霜刃，静听江湖潮起潮落，此乃“金石之志”的坚守。荆轲的“风萧萧兮易水寒”是“剑出无悔”的决绝——以刚毅之心行侠，原则如金石不容动摇。其侠义之道在于坚守原则，宁折不弯，以剑证道，在关键时刻敢于舍生取义，如金般坚毅而锐利，在静听中洞察，在决断中行动。",
      personality_traits: [
        "行事果断，雷厉风行",
        "忠诚守信，一诺千金",
        "行侠仗义，剑斩不公",
        "勇敢无畏，舍生取义",
        "重诺守信，言出必行"
      ],
      daily_practice: "存了一段海浪声，戴上耳机听，潮来潮去，一波一波。看到有人插队，犹豫了一下，还是开口提醒。记着前几天新闻里那个见义勇为的人，名字旁边画了把小剑。周末整理书架，把《史记》放在最容易拿到的地方，荆轲传那页折了个角。有些事不需要犹豫，该说就说，该做就做。",
      self_cultivation: "修身进德之道，在于学习荆轲剑出无悔的精神，培养金石之志的坚定；修炼以剑护道的武德，让剑为正义服务而非伤害；在关键时刻体会道在正义的玄明真谛，挺身守护公平；定期反思个人是否侠义初心不改，确保精神的纯粹与担当。"
    },
    {
      id: "0100-木",
      code: "0100",
      name: "润雨剑客",
      category: "游侠剑客",
      category_desc: "出世+武+江湖+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "林冲",
      core_description: "“润雨剑客”，如青萍剑客在夜雨中行侠，仁德润物无声，此乃“仁木之心”的体现。林冲的侠义是“春风化雨”的温和——重教化轻惩戒，以德服人而非以力压人。其行事讲究“润物细无声”，在潜移默化中改变世道，如木之生长，自然而然地滋养善念，渗透人心，在夜雨中绽放仁德的光芒。",
      personality_traits: [
        "仁德如春，润泽万物",
        "仁厚宽和，春风化雨",
        "行侠仗义，润物无声",
        "勇敢无畏，守护善意",
        "重诺守信，一言九鼎"
      ],
      daily_practice: "给植物喷水，水雾细细的，叶子慢慢变亮。同事工作出错，没急着批评，先问是不是有什么困难。路上看到孩子哭，蹲下来问怎么了，摸出颗糖。读水浒读到林冲那段，八十万禁军教头，最后那么憋屈，叹了口气。行侠不一定要动刀剑，一句温和的话可能更暖人。",
      self_cultivation: "修身进德之道，在于学习林冲仁德润物的精神，培养仁木之心的温暖；修炼春风化雨的温和，让侠义如细雨般滋养人心；在行善中体会道在仁德的玄明真谛，以德服人而非以力压人；定期反思个人是否仁心常在，确保精神的温暖与善意的持续。"
    },
    {
      id: "0100-水",
      code: "0100",
      name: "流云剑者",
      category: "游侠剑客",
      category_desc: "出世+武+江湖+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "武松",
      core_description: "“流云剑者”，剑法如流云般灵动不可捉摸，此乃“水之智慧”的变通。武松的侠义是“上善若水”的体现——智慧如水随机应变，深谙“无招胜有招”的剑道至理。其行事灵活，善于以智慧化解冲突，以柔克刚，以智取胜，如流云般飘忽莫测，在灵动中蕴含深沉的力量，在变通中坚守侠义之本。",
      personality_traits: [
        "智慧如水，随机应变",
        "深谋远虑，洞察先机",
        "行侠仗义，以智取胜",
        "勇敢无畏，柔中带刚",
        "重诺守信，流云不移"
      ],
      daily_practice: "遇到路口红灯，不急，等它变绿。原计划出门，临时有事，改在家里看书。遇到技术问题，试了三种方法都不行，不着急，泡杯茶再想。读水浒武松打虎那段，他也没硬拼，先躲再打。计划是死的，人是活的，变通不是放弃，是换条路到达。",
      self_cultivation: "修身进德之道，在于学习武松上善若水的智慧，培养流云剑心的灵动；修炼随机应变的变通，在复杂情境中以智取胜；在灵活中体会道在变通的玄明真谛，以柔克刚而非硬碰硬；定期反思个人是否智慧与原则并重，确保精神的深邃与行动的恰当。"
    },
    {
      id: "0100-火",
      code: "0100",
      name: "赤焰剑侠",
      category: "游侠剑客",
      category_desc: "出世+武+江湖+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "孙悟空",
      core_description: "“赤焰剑侠”，如烈焰般炽热的侠客行迹，此乃“如火热情”的燃烧。孙悟空的侠义是“赤焰侠踪”的体现——行事狂放不羁，热情如火，以强烈情感驱动剑招。其侠义之道在于“真情实感”，以热烈情感感染他人，主动出击扫除不平，如火般燃烧自己照亮他人，在激情中蕴含深沉的力量，在行动中展现侠义之光。",
      personality_traits: [
        "富有激情，赤焰燃烧",
        "古道热肠，真情实感",
        "行侠仗义，主动出击",
        "勇敢无畏，气势如虹",
        "重诺守信，一诺千金"
      ],
      daily_practice: "突然想跑步，换上鞋就出门，跑得满头大汗才回来。听到一首老歌，音量开到最大，跟着吼了两句。下午画了张画，颜色涂得特别艳，红黄蓝撞在一起。群里有人抱怨，噼里啪啦打了一堆鼓励的话发过去。热情有时候就是一股劲儿，不憋着，也不乱发，找到对的地方释放。",
      self_cultivation: "修身进德之道，在于学习孙悟空真情实感的侠义，培养赤焰燃烧的品格；修炼如火热情的节制，让激情照亮而不灼伤；在行动中体会道在热情的玄明真谛，以热烈情感感染他人；定期反思个人是否热情与理性并重，确保侠义精神的健康与持久。"
    },
    {
      id: "0100-土",
      code: "0100",
      name: "守心剑士",
      category: "游侠剑客",
      category_desc: "出世+武+江湖+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "郭靖",
      core_description: "“守心剑士”，侠义之心坚如磐石，此乃“厚土之德”的担当。郭靖的侠义是“如山沉稳”的体现——沉稳务实责任担当，不求虚名但求实效。其侠义之道在于“厚德载物”，在现实中稳步推进正义，以责任为重，如大地般包容而坚定，在持久中展现力量，在坚守中体现忠诚。",
      personality_traits: [
        "务实负责，脚踏实地",
        "稳重持成，坚如磐石",
        "行侠仗义，厚德载物",
        "勇敢无畏，持久坚守",
        "重诺守信，一言九鼎"
      ],
      daily_practice: "出门走了五分钟，又折回去确认门锁好了没有。车上摸口袋，钥匙在，钱包在，手机在，心里才踏实。朋友借钱，问了用途，确认是真的急用才转。看射雕英雄传，郭靖学降龙十八掌，一掌一掌扎实练。晚上睡前想，今天有没有哪件事做得毛躁，明天要更稳一点。",
      self_cultivation: "修身进德之道，在于学习郭靖厚德载物的品格，培养如山沉稳的担当；修炼坚如磐石的定力，在动荡中保持清醒；在坚守中体会道在根基的玄明真谛，稳步推进正义；定期反思个人是否根基深厚，确保精神的坚实与责任的履行。"
    },
    {
      id: "0101-金",
      code: "0101",
      name: "连环谋士",
      category: "江湖浪子",
      category_desc: "出世+武+江湖+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "令狐冲",
      core_description: "“连环谋士”，计策如铁索般坚固环环相扣，此乃“金石之智”的周密。令狐冲的智慧是“连环布局”的体现——刚毅而不失灵活，原则性强但懂得权变。善于构建“连环局”，让对手陷入层层困境，如金般坚毅而锐利，在隐忍中布局，在关键时刻果断出手，以谋略影响大局。",
      personality_traits: [
        "原则性强，金石之志",
        "刚正不阿，连环布局",
        "随性自由，隐忍待时",
        "适应力强，权变智慧",
        "阅历丰富，洞察先机"
      ],
      daily_practice: "下棋时，对手吃了我一个马，不急着反击，先看三步后的局面。工作上遇到难题，把相关的人和信息列出来，像在布一个看不见的网。读笑傲江湖，令狐冲在思过崖那段时间，表面是惩罚，实际是成长。有些优势不必马上显露，留到最关键的时候用。",
      self_cultivation: "修身进德之道，在于学习令狐冲连环布局的智慧，培养金石之志的坚定；修炼隐忍待时的定力，在浮躁中保持内心的沉稳；在等待中体会道在时机的玄明真谛，把握恰到好处的出击时刻；定期反思个人是否谋略与原则并重，确保智慧的深沉与行动的精准。"
    },
    {
      id: "0101-木",
      code: "0101",
      name: "化局策士",
      category: "江湖浪子",
      category_desc: "出世+武+江湖+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "韦小宝",
      core_description: "“化局策士”，以春风般的温和智慧化解困局，此乃“仁木之心”的渗透。韦小宝的智慧是“春风化局”的体现——温和而不失锋芒，以德服人为主，以力压人为辅。善于“化局”而非“破局”，在不知不觉中改变局势走向，如木之生长，自然而然地化解矛盾，在温和中蕴含力量。",
      personality_traits: [
        "温和包容，春风化局",
        "悲天悯人，仁德渗透",
        "随性自由，灵活应变",
        "适应力强，融入环境",
        "阅历丰富，洞察人心"
      ],
      daily_practice: "朋友吵架，没急着站队，先听两边说完。同事工作有误会，帮忙传话时把尖锐的词换成温和的。读鹿鼎记，韦小宝那些看似胡闹的办法，其实都解决了问题。有时候化解矛盾不需要大道理，一个玩笑，一个台阶，就够了。",
      self_cultivation: "修身进德之道，在于学习韦小宝春风化局的智慧，培养仁木之心的温暖；修炼温和渗透的品格，在不知不觉中改变局势；在化解中体会道在仁德的玄明真谛，以德服人而非以力压人；定期反思个人是否仁心常在，确保精神的温暖与智慧的柔和。"
    },
    {
      id: "0101-水",
      code: "0101",
      name: "隐策智者",
      category: "江湖浪子",
      category_desc: "出世+武+江湖+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "楚留香",
      core_description: "“隐策智者”，策略随形势而变隐于无形，此乃“水之智慧”的顺势。楚留香的智慧是“随势而动”的体现——如水般流动，不固守一法，善于“借势”而非“造势”。行事隐蔽，不露锋芒，深谙“功成身退”之道，在流动中掌控全局，在隐退中保持自由，如水流般顺势而为，智慧深沉。",
      personality_traits: [
        "灵活变通，随势而动",
        "通权达变，借势而为",
        "随性自由，隐于无形",
        "适应力强，融入环境",
        "阅历丰富，洞察时机"
      ],
      daily_practice: "看别人运动，借了下坡的力，转弯特别顺。开会时，不急着发言，等气氛到了再说。读楚留香传奇，他那些看似偶然的发现，其实都借了环境的势。聪明不是硬扛，是知道什么时候该借力，什么时候该退一步。",
      self_cultivation: "修身进德之道，在于学习楚留香随势而动的智慧，培养水之智慧的流动；修炼功成身退的品格，在成功后保持低调；在顺势中体会道在流动的玄明真谛，借势而为而非强行造势；定期反思个人是否智慧与自由并重，确保精神的深邃与行动的恰当。"
    },
    {
      id: "0101-火",
      code: "0101",
      name: "燎原智主",
      category: "江湖浪子",
      category_desc: "出世+武+江湖+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "李寻欢",
      core_description: "“燎原智主”，小计策可成燎原之势，此乃“如火热情”的扩散。李寻欢的智慧是“星火燎原”的体现——热情主动，善于创造机会而非等待机会。其策略具有燎原之势，感染力强，能迅速聚集同道，如火般燃烧自己照亮他人，在热情中蕴含深沉的力量，在扩散中展现影响力。",
      personality_traits: [
        "热情洋溢，星火燎原",
        "热血丹心，感染力强",
        "随性自由，创造机会",
        "适应力强，扩散效应",
        "阅历丰富，洞察趋势"
      ],
      daily_practice: "想到个好点子，忍不住在群里分享，没想到好几个人都说有用。朋友情绪低落，说了几句打气的话，他转头又去鼓励了别人。读小李飞刀，李寻欢那种不要命的义气，真能点燃一帮人。有时候一点小热情，传着传着就成了一片火。",
      self_cultivation: "修身进德之道，在于学习李寻欢星火燎原的智慧，培养如火热情的品格；修炼热情与节制的平衡，让影响力扩散而不失控；在扩散中体会道在传播的玄明真谛，以热情感染他人；定期反思个人是否热情与理性并重，确保影响力的健康与持久。"
    },
    {
      id: "0101-土",
      code: "0101",
      name: "弈局谋者",
      category: "江湖浪子",
      category_desc: "出世+武+江湖+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "陆小凤",
      core_description: "“弈局谋者”，如云台对弈般稳控全局，此乃“厚土之德”的全局。陆小凤的智慧是“弈局掌控”的体现——沉稳务实，注重“全局观”而非“局部胜”。善于构建“弈局”，让各方势力在不知不觉中按自己的设计行动，如大地般包容而坚定，在沉稳中蕴含力量，在全局中展现掌控。",
      personality_traits: [
        "沉稳踏实，弈局掌控",
        "脚踏实地，全局在胸",
        "随性自由，沉稳布局",
        "适应力强，包容万物",
        "阅历丰富，洞察全局"
      ],
      daily_practice: "组织聚餐时，先把每个人的口味和忌口问清楚，再定餐厅。做计划，不只看眼前任务，把后续可能的问题也想一遍。读陆小凤传奇，他破案时那些看似无关的线索，最后都连成一张网。真正的掌控不是控制一切，是让一切都在该在的位置上。",
      self_cultivation: "修身进德之道，在于学习陆小凤弈局掌控的智慧，培养厚土之德的品格；修炼全局在胸的视野，在细节中把握大局；在沉稳中体会道在全局的玄明真谛，掌控而不强行控制；定期反思个人是否沉稳与灵活并重，确保精神的包容与行动的恰当。"
    },
    {
      id: "0110-金",
      code: "0110",
      name: "铁衣戍尉",
      category: "戍边隐将",
      category_desc: "出世+武+庙堂+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "李广",
      core_description: "“铁衣戍尉”，以铁壁般的防御戍守边疆，此乃“金石之志”的坚守。李广的军事精神是“铁壁防御”的体现——如金石般坚贞的原则不容亵渎，在复杂的边关环境中坚守防御底线，宁可“宁折不弯”也不妥协。其隐逸是在边关中保持军事独立，不随波逐流，在权力边缘守护一片防御净土，如金般坚毅而锐利，在坚守中展现军人的风骨。",
      personality_traits: [
        "行事果断，雷厉风行",
        "刚正不阿，铁壁防御",
        "忠诚卫国，金石之志",
        "沉着冷静，临危不乱",
        "军事才能，运筹帷幄"
      ],
      daily_practice: "一天的事务，从确认安排都在轨道上开始。遇到责任模糊的情况，明确边界，不让自己或他人陷入推诿。看军事纪录片时，李广守边关那些看似固执的坚持，让人反复思量。睡前常会回顾，检视自己是否在某个时刻为了回避冲突而模糊了原则。",
      self_cultivation: "修身进德之道，在于学习李广铁壁防御的精神，培养金石之志的品格；修炼临危不乱的定力，在复杂环境中保持清醒；在坚守中体会道在防御的玄明真谛，守护重要的原则与边界；定期反思个人是否初心如铁，确保精神的坚定与担当的可靠。"
    },
    {
      id: "0110-木",
      code: "0110",
      name: "青松镇守",
      category: "戍边隐将",
      category_desc: "出世+武+庙堂+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "卫青",
      core_description: "“青松镇守”，仁心如春，身在边关心向士卒，此乃“仁木之心”的体现。卫青的军事理想是“仁心守边”——如春日新木般温和包容，以仁德关爱士卒，春风化雨般影响军心。其隐逸是精神上的奉献，虽处边关却心怀士卒之志，在务实防御中保持将领风骨，如松之坚韧，如木之生机，在镇守中展现仁德的力量。",
      personality_traits: [
        "富有仁德，春风化雨",
        "悲天悯人，仁心守边",
        "忠诚卫国，青松镇守",
        "沉着冷静，临危不乱",
        "军事才能，运筹帷幄"
      ],
      daily_practice: "在团队中，自然而然地关注他人的状态，需要时默默提供支持。与新成员相处时，主动创造轻松的氛围，消除对方的拘谨感。读卫青传，他对待士卒那些细节，像冬天送暖衣夏天备凉水。渐渐体会到，真正的领导力往往不是显性的命令，而是让人感受到背后的支撑。",
      self_cultivation: "修身进德之道，在于学习卫青仁心守边的精神，培养仁木之心的品格；修炼春风化雨的温和，让领导如松之坚韧、如木之生机；在镇守中体会道在仁德的玄明真谛，以仁德凝聚人心；定期反思个人是否仁德与坚韧并重，确保精神的温暖与担当的可靠。"
    },
    {
      id: "0110-水",
      code: "0110",
      name: "冰河隐卫",
      category: "戍边隐将",
      category_desc: "出世+武+庙堂+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "霍去病",
      core_description: "“冰河隐卫”，智慧如水，深谙“和光同尘”之道，此乃“水之智慧”的灵活。霍去病的军事智慧是“冰河隐卫”的体现——心如明镜洞察敌情，形如静湖不露锋芒。在边关复杂关系中游刃有余，既能保持军事独立又能保全自身，如水般灵活适应却坚守本心，在冰封中蕴含流动，在隐卫中展现智慧。",
      personality_traits: [
        "智慧通达，和光同尘",
        "深谋远虑，洞察敌情",
        "忠诚卫国，冰河隐卫",
        "沉着冷静，静湖不露",
        "军事才能，运筹帷幄"
      ],
      daily_practice: "遇到观点分歧时，不急于表态，而是先充分理解各方的立场与诉求。计划出现变动时，快速思考多个可能的应对方案，而非固守原定路线。读霍去病传，他那些长途奔袭的战术，看似冒险实则计算精准。逐渐明白，灵活并非没有原则，而是在原则的框架内寻找到最优的路径。",
      self_cultivation: "修身进德之道，在于学习霍去病和光同尘的智慧，培养水之智慧的品格；修炼静湖不露的沉稳，在复杂环境中保持清醒；在灵活中体会道在适应的玄明真谛，巧妙周旋而非硬碰硬；定期反思个人是否智慧与忠诚并重，确保精神的深邃与担当的可靠。"
    },
    {
      id: "0110-火",
      code: "0110",
      name: "烽火忠尉",
      category: "戍边隐将",
      category_desc: "出世+武+庙堂+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "班超",
      core_description: "“烽火忠尉”，热情如火的“热血隐将”，以热血守护边疆，此乃“如火热情”的燃烧。班超的军事精神是“烽火忠尉”的体现——如火焰般燃烧的军事热情，在边关点燃防御之光。其隐逸不是消极避世，而是以另一种方式燃烧，在边关推动防御改革，以火德照亮黑暗，如火般燃烧自己照亮边疆，在激情中蕴含深沉的力量，在忠尉中展现军人的热血。",
      personality_traits: [
        "富有激情，烽火燃烧",
        "古道热肠，热血报国",
        "忠诚卫国，烽火忠尉",
        "沉着冷静，临危不乱",
        "军事才能，运筹帷幄"
      ],
      daily_practice: "对于认可的社会活动或公益项目，是积极的参与者甚至发起者。当身边的人遇到困境时，不自觉地开始构思各种可能的帮助方式，有时甚至比对方更早行动。读班超传，他投笔从戎那段，真是说干就干的火爆脾气。渐渐懂得，热情不是停留在口头的表态，而是要转化为立即的行动。",
      self_cultivation: "修身进德之道，在于学习班超热血报国的精神，培养如火热情的品格；修炼热情与节制的平衡，让激情照亮而不灼伤；在守护中体会道在热血的玄明真谛，以热血守护边疆；定期反思个人是否热情与理性并重，确保侠义精神的健康与持久。"
    },
    {
      id: "0110-土",
      code: "0110",
      name: "磐石戍卫",
      category: "戍边隐将",
      category_desc: "出世+武+庙堂+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "岳飞",
      core_description: "“磐石戍卫”，稳重如土的“沉稳隐将”，在动荡边关中稳守防御正道，此乃“厚土之德”的担当。岳飞的军事精神是“磐石戍卫”的体现——如大地般坚定厚重，在战乱纷扰中保持清醒。其隐逸是扎根于具体防御，在踏实工作中找到精神寄托，如磐石般稳固，如大地般包容，在戍卫中展现军人的沉稳与担当。",
      personality_traits: [
        "务实负责，脚踏实地",
        "稳重持成，磐石戍卫",
        "忠诚卫国，厚土之德",
        "沉着冷静，临危不乱",
        "军事才能，运筹帷幄"
      ],
      daily_practice: "对于自己设定的计划或目标，有较强的执行力和完成度，不轻易中断或放弃。生活中积累的待办事项，逐一处理，不习惯拖延堆积。读岳飞传，他练兵那些严格到刻板的规定。慢慢领悟到，稳定并非一成不变，而是日复一日地坚持做那些正确的事。",
      self_cultivation: "修身进德之道，在于学习岳飞厚土之德的精神，培养厚土之德的品格；修炼稳如磐石的定力，在动荡中保持清醒；在戍卫中体会道在根基的玄明真谛，稳固边疆防御；定期反思个人是否沉稳与担当并重，确保精神的坚实与责任的履行。"
    },
    {
      id: "0111-金",
      code: "0111",
      name: "潜鳞隐将",
      category: "韬光将军",
      category_desc: "出世+武+庙堂+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "白起",
      core_description: "“潜鳞隐将”，以深藏不露的谋略待时，此乃“金石之智”的隐忍。白起的军事智慧是“深藏将军”的体现——平时隐藏实力，等待最佳时机，关键时刻一击必中。其谋略是隐蔽而果断的，如金般坚毅而锐利，在隐忍中待时，在深藏中蕴含力量，在关键时刻展现军人的决断。",
      personality_traits: [
        "原则性强，金石之智",
        "忠诚守信，深藏将军",
        "隐藏锋芒，伺机而动",
        "伺机而动，决断如金",
        "战略眼光，洞察先机"
      ],
      daily_practice: "面对明显适合自己的机会或优势时，不急于显露，而是先观察环境与他人的反应。掌握新的能力或知识后，在实际应用中自然展现，而非刻意炫耀。读白起传，他那些战前长时间的准备，最后一战定胜负。逐渐体会到，有时候最强大的力量，恰恰在于能够克制住立即使用的冲动。",
      self_cultivation: "修身进德之道，在于学习白起深藏待时的智慧，培养金石之智的品格；修炼伺机而动的定力，在浮躁中保持内心的沉稳；在等待中体会道在时机的玄明真谛，把握恰到好处的出击时刻；定期反思个人是否隐忍与决断并重，确保智慧的深沉与行动的精准。"
    },
    {
      id: "0111-木",
      code: "0111",
      name: "隐林伏将",
      category: "韬光将军",
      category_desc: "出世+武+庙堂+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "韩信",
      core_description: "“隐林伏将”，以仁和待时的智慧隐忍，此乃“仁木之心”的温和。韩信的军事智慧是“仁待将军”的体现——表面顺从平和，实则深谋远虑，等待“风起雪融”的时机。其谋略是长期布局，不急于一时的得失，如木之生长，自然而然地完成布局，在隐忍中蕴含力量，在温和中展现智慧。",
      personality_traits: [
        "温和包容，春风隐忍",
        "仁厚宽和，仁待将军",
        "隐藏锋芒，伺机而动",
        "伺机而动，深谋远虑",
        "战略眼光，洞察时机"
      ],
      daily_practice: "面对人际冲突或紧张局面时，选择暂不介入，给予双方冷静的空间。观察植物缓慢生长的过程，能带来一种不急不躁的耐心。读韩信传，他受胯下之辱那段，不是怕，是在等更好的时机。开始理解，温和并非软弱的表现，而是一种选择更有效、更长远应对方式的智慧。",
      self_cultivation: "修身进德之道，在于学习韩信仁和待时的智慧，培养仁木之心的品格；修炼春风隐忍的温和，在等待中保持内心的平静；在布局中体会道在生长的玄明真谛，自然而然地完成计划；定期反思个人是否温和与谋略并重，确保智慧的深沉与行动的恰当。"
    },
    {
      id: "0111-水",
      code: "0111",
      name: "暗流移军",
      category: "韬光将军",
      category_desc: "出世+武+庙堂+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "周瑜",
      core_description: "“暗流移军”，潜谋如水随机应变，此乃“水之智慧”的流动。周瑜的军事智慧是“潜谋将军”的体现——在变化中寻找机会，其谋略是彻底的隐藏，不露任何痕迹。道家“知雄守雌”是其哲学，明知强大却安于柔弱，在低调中掌控全局，如水般流动而深沉，在暗处洞悉一切。",
      personality_traits: [
        "灵活变通，随机应变",
        "通权达变，潜谋如水",
        "隐藏锋芒，伺机而动",
        "伺机而动，洞察先机",
        "战略眼光，掌控全局"
      ],
      daily_practice: "当事情的发展方向突然改变时，能够较快地调整自己的重心与策略。在交流中，顺应对方的话题脉络展开对话，而非强行引导至自己的预设轨道。读三国周瑜那段，火烧赤壁借东风，真是借势的高手。慢慢体悟到，智慧往往不在于强行创造局势，而在于敏锐地识别并善用既有的情势。",
      self_cultivation: "修身进德之道，在于学习周瑜潜谋如水的智慧，培养水之智慧的品格；修炼知雄守雌的哲学，在强大时保持低调；在流动中体会道在变通的玄明真谛，随机应变而非固执己见；定期反思个人是否灵活与掌控并重，确保智慧的深邃与行动的恰当。"
    },
    {
      id: "0111-火",
      code: "0111",
      name: "灰烬复将",
      category: "韬光将军",
      category_desc: "出世+武+庙堂+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "陆逊",
      core_description: "“灰烬复将”，以待发而动的谋略推动变革，此乃“如火热情”的燃烧。陆逊的军事智慧是“待发将军”的体现——热情如火，富有感染力，在关键时刻点燃希望。其谋略是燃烧式的，不隐藏准备，用谋略之火照亮前路，如火般燃烧自己照亮变革，在等待中实现理想。",
      personality_traits: [
        "热情洋溢，待发燃烧",
        "热血丹心，富有感染力",
        "隐藏锋芒，伺机而动",
        "伺机而动，推动变革",
        "战略眼光，点燃希望"
      ],
      daily_practice: "脑中一旦浮现出可行的集体活动或有趣的想法，便会积极推动其成真。在工作中，主动发现潜在问题并思考对策，不一定等待指令。读陆逊传，他夷陵之战那些反击，真是憋着一股劲爆发。逐渐感受到，热情有时就是一种内在的驱动力，让人忍不住要去实践、去创造。",
      self_cultivation: "修身进德之道，在于学习陆逊待发而动的智慧，培养如火热情的品格；修炼热情与节制的平衡，让激情照亮而不灼伤；在变革中体会道在燃烧的玄明真谛，以谋略之火照亮前路；定期反思个人是否热情与理性并重，确保影响力的健康与持久。"
    },
    {
      id: "0111-土",
      code: "0111",
      name: "蛰土伺守",
      category: "韬光将军",
      category_desc: "出世+武+庙堂+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "李靖",
      core_description: "“蛰土伺守”，以沉稳持重的智慧待时，此乃“厚土之德”的等待。李靖的军事智慧是“沉稳将军”的体现——务实如土，不求奇谋只求实效。其谋略是耐心等待，不妄动不躁进，道家“无为而无不为”是其哲学，看似无为实则有为，在等待中完成布局，如大地般沉稳而包容。",
      personality_traits: [
        "沉稳踏实，蛰土伺守",
        "脚踏实地，务实如土",
        "隐藏锋芒，伺机而动",
        "伺机而动，把握时机",
        "战略眼光，沉稳布局"
      ],
      daily_practice: "对于长期的财务或生活规划，制定清晰、可执行的步骤并稳步推进。在学习新事物时，不追求立竿见影的效果，而是相信日积月累的力量。读李靖传，他那些看似保守的防守战术，实则在积蓄力量。开始懂得，等待有时并非被动的停滞，而是在为未来的行动积累必要的资本与底气。",
      self_cultivation: "修身进德之道，在于学习李靖沉稳待时的智慧，培养厚土之德的品格；修炼无为而有为的哲学，在等待中完成布局；在沉稳中体会道在根基的玄明真谛，耐心等待而非急躁冒进；定期反思个人是否沉稳与行动并重，确保精神的坚实与行动的恰当。"
    },
    {
      id: "1000-金",
      code: "1000",
      name: "金声先生",
      category: "布衣学者",
      category_desc: "入世+文+江湖+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "孔子",
      core_description: "“金声先生”，以刚正学识明道于江湖，此乃“金石之志”的坚守。孔子的学术精神是“刚正不阿”的体现——如金石般坚贞的原则不容亵渎，在复杂的民间环境中坚守学术底线，宁可“宁折不弯”也不妥协。其学术是在民间中保持精神独立，不随波逐流，在世俗中守护一片学术净土，如金般坚毅而锐利，在教化中展现学者的风骨。",
      personality_traits: [
        "原则性强，金石之志",
        "行事果断，雷厉风行",
        "学识渊博，博古通今",
        "教化育人，有教无类",
        "关注民生，心系苍生"
      ],
      daily_practice: "一天开始时段，常会阅读经典或进行有深度的学习，体会原则的坚定。学习思考时，留意那些涉及根本立场与价值观的时刻。通过写作、交流或分享，将理解的知识传递给需要的人。时常反思自己的学问与行为是否保持一致，确保精神追求与日常实践不相背离。",
      self_cultivation: "修身进德之道，在于学习孔子刚正不阿的精神，培养金石之志的品格；修炼有教无类的胸怀，让学问如清泉润泽他人；在教化中体会道在学问的玄明真谛，传播智慧促进共同成长；定期反思个人是否学问与仁德并重，确保学术的纯粹与教化的温暖。"
    },
    {
      id: "1000-木",
      code: "1000",
      name: "桃李夫子",
      category: "布衣学者",
      category_desc: "入世+文+江湖+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "孟子",
      core_description: "“桃李夫子”，仁德如春身在民间心向教化，此乃“仁木之心”的温暖。孟子的教育理想是“有教无类”的体现——如春日新木般温和包容，以仁德教化百姓，春风化雨般影响世风。其学术是精神上的奉献，虽处草野却心怀教化之志，在务实教学中保持文人风骨，如木之生长，自然而然地滋养人心。",
      personality_traits: [
        "温和包容，仁木之心",
        "富有仁德，春风化雨",
        "学识渊博，博古通今",
        "教化育人，有教无类",
        "关注民生，心系百姓"
      ],
      daily_practice: "观察植物静静生长，感受到一种温暖的、如春木般舒展的能量。日常生活中，留意那些体现善意与关怀的细微时刻，体会其春风化雨般的滋养力量。以温和的方式分享知识或提供引导，相信仁德的影响力在于润物无声。周末时常反思，内心是否保持着那份天然的善意，并努力让其持续流动。",
      self_cultivation: "修身进德之道，在于学习孟子有教无类的精神，培养仁木之心的品格；修炼春风化雨的温和，让教化如木之生长自然而然地滋养人心；在教学中体会道在教化的玄明真谛，以仁德影响世风；定期反思个人是否仁德与学识并重，确保教化的温暖与学术的深度。"
    },
    {
      id: "1000-水",
      code: "1000",
      name: "墨池文士",
      category: "布衣学者",
      category_desc: "入世+文+江湖+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "荀子",
      core_description: "“墨池文士”，智慧如水深谙“和光同尘”之道，此乃“水之智慧”的灵活。荀子的学术智慧是“通达学者”的体现——心如明镜洞察世事，形如静湖不露锋芒。在民间复杂关系中游刃有余，既能保持学术独立又能保全自身，如水般灵活适应却坚守本心，在墨池中蕴含智慧，在文士中展现通达。",
      personality_traits: [
        "灵活变通，随机应变",
        "智慧通达，和光同尘",
        "学识渊博，博古通今",
        "教化育人，传播智慧",
        "关注民生，心系百姓"
      ],
      daily_practice: "从日常生活的流动与变化中，体悟智慧如水般自然流淌的意味。留意那些展现通达与适应性的时刻，感受其中“和光同尘”的圆融智慧。尝试以不同的方式分享知识与见解，以适应多样的情境与受众。时常反思，自己的智慧是否如水一般，既有足够的深度，又保持着必要的灵活性。",
      self_cultivation: "修身进德之道，在于学习荀子和光同尘的智慧，培养水之智慧的品格；修炼心如明镜的洞察力，在复杂关系中保持清醒；在传播中体会道在适应的玄明真谛，灵活适应而非硬碰硬；定期反思个人是否智慧与仁德并重，确保学术的深度与教化的温暖。"
    },
    {
      id: "1000-火",
      code: "1000",
      name: "青灯传师",
      category: "布衣学者",
      category_desc: "入世+文+江湖+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "朱熹",
      core_description: "“青灯传师”，热情如火的“激情学者”以激情传播真理，此乃“如火热情”的燃烧。朱熹的学术精神是“激情传播”的体现——如火焰般燃烧的学术热情，在民间点燃智慧之光。其学术不是消极避世，而是以另一种方式燃烧，在民间推动思想启蒙，以火德照亮黑暗，如火般燃烧自己照亮真理，在传道中展现学者的激情。",
      personality_traits: [
        "热情洋溢，如火燃烧",
        "富有激情，激情传播",
        "学识渊博，博古通今",
        "教化育人，传播真理",
        "关注民生，心系百姓"
      ],
      daily_practice: "内心常怀一股推动自己传播与分享的热情，如灯火般持续。对于认可的理念或知识，积极通过各种形式与人交流，希望能点燃思考的火花。当这种热情高涨时，注意疏导与平衡，避免过度消耗。时常反思，自己的热情是否如灯火般，既能照亮真理，又能保持适度与健康。",
      self_cultivation: "修身进德之道，在于学习朱熹激情传播的精神，培养如火热情的品格；修炼热情与节制的平衡，让激情照亮而不灼伤；在传道中体会道在燃烧的玄明真谛，以火德照亮黑暗；定期反思个人是否热情与理性并重，确保学术的深度与教化的温暖。"
    },
    {
      id: "1000-土",
      code: "1000",
      name: "茅庐研士",
      category: "布衣学者",
      category_desc: "入世+文+江湖+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "王阳明",
      core_description: "“茅庐研士”，稳重如土的“务实学者”在动荡世道中稳守学术正道，此乃“厚土之德”的担当。王阳明的学术精神是“务实学者”的体现——如大地般坚定厚重，在功利浮躁中保持清醒。其学术是扎根于具体教学，在踏实工作中找到精神寄托，不慕虚名只求真理，如大地般包容厚重，在研习中展现学者的务实。",
      personality_traits: [
        "沉稳踏实，厚土之德",
        "务实负责，脚踏实地",
        "学识渊博，博古通今",
        "教化育人，传播真理",
        "关注民生，心系百姓"
      ],
      daily_practice: "从日常的扎实积累与实践中，感受沉稳如厚土般的根基感。留意那些体现务实与踏实作风的时刻，体会脚踏实地的安心。通过辅导、分享等方式，将所学扎根于实际应用，相信知识需要在实践中生长。时常反思，自己是否在安定中稳步成长，保持着一种稳中有进的状态。",
      self_cultivation: "修身进德之道，在于学习王阳明务实学者的精神，培养厚土之德的品格；修炼稳如磐石的定力，在浮躁中保持清醒；在研习中体会道在根基的玄明真谛，务实守护文化根基；定期反思个人是否沉稳与担当并重，确保学术的深度与教化的温暖。"
    },
    {
      id: "1001-金",
      code: "1001",
      name: "断局军师",
      category: "幕僚策士",
      category_desc: "入世+文+江湖+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "苏秦",
      core_description: "“断局军师”，以铁腕策略辅佐主君决断如金，此乃“金石之智”的果断。苏秦的谋略智慧是“铁腕策士”的体现——如张良运筹帷幄般精准，关键时刻一击必中。其谋略是隐蔽而果断的，平时隐藏实力，等待最佳时机，如金般坚毅而锐利，在复杂局势中开辟道路，在断局中展现军师的决断。",
      personality_traits: [
        "刚正不阿，金石之智",
        "忠诚守信，铁腕策士",
        "智谋过人，运筹帷幄",
        "善于分析，洞察时局",
        "洞察时局，把握时机"
      ],
      daily_practice: "对所处环境与局势保持敏锐的洞察与分析。留意那些需要果断决策与谋略的时刻，体会其中决断的力量。通过策略思考与全局分析来锻炼自己的谋略思维，相信智慧在于审时度势。时常反思，自己的决断是否做到了果断而不失谨慎，确保策略的精准与恰当。",
      self_cultivation: "修身进德之道，在于学习苏秦铁腕策士的智慧，培养金石之智的品格；修炼关键时刻一击必中的决断力，在复杂局势中保持清醒；在辅佐中体会道在决断的玄明真谛，以智慧开辟道路；定期反思个人是否智谋与忠诚并重，确保策略的精准与辅佐的可靠。"
    },
    {
      id: "1001-木",
      code: "1001",
      name: "妙策参谋",
      category: "幕僚策士",
      category_desc: "入世+文+江湖+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "张仪",
      core_description: "“妙策参谋”，以仁和智慧辅佐主君温和如木，此乃“仁木之心”的渗透。张仪的谋略智慧是“仁和策士”的体现——表面顺从平和，实则深谋远虑，等待“风起雪融”的时机。其谋略是长期布局，不急于一时的得失，以“仁和”为表，以“智谋”为里，如木之生长，自然而然地完成布局。",
      personality_traits: [
        "仁厚宽和，仁木之心",
        "悲天悯人，悲天悯人",
        "智谋过人，深谋远虑",
        "善于分析，洞察时机",
        "洞察时局，把握机会"
      ],
      daily_practice: "从观察自然生长的过程中，感受到仁和如春木般的温暖力量。留意那些以温和、渗透方式解决问题的时刻，体会其中仁和的智慧。进行长远的规划与布局思考，相信温和的方式往往能达成更深、更持久的影响。时常反思，自己的策略是否做到了温和而不失谋略，保持着必要的渗透性与深度。",
      self_cultivation: "修身进德之道，在于学习张仪仁和策士的智慧，培养仁木之心的品格；修炼表面顺从实则深谋的隐忍，在温和中完成布局；在辅佐中体会道在渗透的玄明真谛，以仁和智慧影响局势；定期反思个人是否仁德与智谋并重，确保策略的深度与辅佐的温暖。"
    },
    {
      id: "1001-水",
      code: "1001",
      name: "映谋智囊",
      category: "幕僚策士",
      category_desc: "入世+文+江湖+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "陈平",
      core_description: "“映谋智囊”，智谋如水随机应变，此乃“水之智慧”的流动。陈平的谋略智慧是“智谋策士”的体现——如张良智谋深远般灵活，在变化中寻找机会。其谋略是彻底的适应，如水适应万形容器，道家“上善若水”是其哲学，以柔克刚，以智取胜，在流动中保持策略的准确性。",
      personality_traits: [
        "深谋远虑，水之智慧",
        "通权达变，随机应变",
        "智谋过人，映谋智囊",
        "善于分析，洞察变化",
        "洞察时局，把握机会"
      ],
      daily_practice: "从变化的形势中体悟智慧如水般流动与适应的特性。留意那些展现灵活应变与顺势而为的时刻，感受其中“上善若水”的智慧。通过准备多种方案与快速调整来锻炼自己的适应能力，相信变通是应对复杂局面的关键。时常反思，自己的策略是否如水般流动而不失方向，保持着必要的准确性与灵活性。",
      self_cultivation: "修身进德之道，在于学习陈平智谋如水的智慧，培养水之智慧的品格；修炼以柔克刚的哲学，在变化中寻找机会；在辅佐中体会道在流动的玄明真谛，随机应变而非固执己见；定期反思个人是否灵活与谋略并重，确保策略的深度与适应性。"
    },
    {
      id: "1001-火",
      code: "1001",
      name: "燎原谋星",
      category: "幕僚策士",
      category_desc: "入世+文+江湖+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "郭嘉",
      core_description: "“燎原谋星”，以激情谋略推动变革热情如火，此乃“如火热情”的燃烧。郭嘉的谋略智慧是“激策策士”的体现——如张良激情献策般富有感染力，在关键时刻点燃希望。其谋略是燃烧式的，不隐藏热情，用智谋之火照亮前路，如火般燃烧自己照亮变革，在谋星中展现策士的激情。",
      personality_traits: [
        "古道热肠，如火热情",
        "热血丹心，激情献策",
        "智谋过人，燃烧谋略",
        "善于分析，洞察变革",
        "洞察时局，把握机会"
      ],
      daily_practice: "内心常有一种推动变革与创新的热情，如火焰般跃动。对于新的想法与改进方案，积极地分享与推动，希望点燃变革的火花。当这种激情高涨时，注意疏导与平衡，避免过度消耗。时常反思，自己的热情是否如火焰般，既能照亮前路，又能保持健康与适度。",
      self_cultivation: "修身进德之道，在于学习郭嘉激策策士的智慧，培养如火热情的品格；修炼热情与节制的平衡，让激情照亮而不灼伤；在变革中体会道在燃烧的玄明真谛，以谋略之火照亮前路；定期反思个人是否热情与理性并重，确保策略的深度与辅佐的温暖。"
    },
    {
      id: "1001-土",
      code: "1001",
      name: "稳局参事",
      category: "幕僚策士",
      category_desc: "入世+文+江湖+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "庞统",
      core_description: "“稳局参事”，以稳重建议稳固根基务实如土，此乃“厚土之德”的沉稳。庞统的谋略智慧是“稳重建士”的体现——如张良稳重建议般扎实，不求奇谋只求实效。其谋略是耐心等待，不妄动不躁进，道家“无为而无不为”是其哲学，看似无为实则有为，在等待中完成布局，如大地般沉稳而包容。",
      personality_traits: [
        "稳重持成，厚土之德",
        "脚踏实地，务实如土",
        "智谋过人，稳重建士",
        "善于分析，洞察时机",
        "洞察时局，把握机会"
      ],
      daily_practice: "从沉稳的积累与等待中，体会厚土般扎实的根基感。留意那些展现沉稳建议与“无为而有为”智慧的时刻。通过长远规划与策略思考来培养耐心与沉稳思维，相信时机需要等待。时常反思，自己是否在等待中保持成长，维持着一种稳中有进的状态。",
      self_cultivation: "修身进德之道，在于学习庞统稳重建士的智慧，培养厚土之德的品格；修炼无为而有为的哲学，在等待中完成布局；在辅佐中体会道在根基的玄明真谛，稳重建议稳固根基；定期反思个人是否沉稳与谋略并重，确保策略的深度与辅佐的可靠。"
    },
    {
      id: "1010-金",
      code: "1010",
      name: "金马文宗",
      category: "翰林学士",
      category_desc: "入世+文+庙堂+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "欧阳修",
      core_description: '"金马文宗"，身处翰林院才学冠绝，此乃"金石之志"的清正。欧阳修的学术风骨是"清正学士"的体现——文章华美，气节清高，虽居侍从之职，却怀匡时济世之志。如苏轼任翰林学士，文章千古，风骨凛然，不因身处权力中枢而阿谀逢迎，保持"玉壶冰心"的纯净与"金马玉堂"的尊严，以文章载道，以风骨立身。',
      personality_traits: [
        "行事果断，金石之志",
        "忠诚守信，清正学士",
        "学问深厚，博古通今",
        "气节高尚，风骨凛然",
        "文采斐然，文章载道"
      ],
      daily_practice: "清晨阅读经典，体会其中原则的坚定感。学习思考时，留意那些体现清正立场的时刻。通过写作、评论或分析来表达思想，相信文字能承载道义。周末时常反思，自己的学问追求与气节坚守是否走在同一条道路上。",
      self_cultivation: "修身进德之道，在于学习欧阳修清正学士的精神，培养金石之志的品格；修炼文章载道的使命，以文字传承道统；在翰林中体会道在风骨的玄明真谛，不因权力而阿谀逢迎；定期反思个人是否学问与气节并重，确保学术的深度与文人的尊严。"
    },
    {
      id: "1010-木",
      code: "1010",
      name: "春华侍读",
      category: "翰林学士",
      category_desc: "入世+文+庙堂+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "王安石",
      core_description: '"春华侍读"，其文采如春日繁花在翰林院中绽放生机，此乃"仁木之心"的温暖。王安石的文学精神是"仁和学士"的体现——文章清新自然，如春风拂面，善于以文学温暖人心，教化世风。不追求艰深晦涩，但求"文章合为时而著，歌诗合为事而作"，以文字滋养人心，如春木般促进文化繁荣，在侍读中展现学士的仁德。',
      personality_traits: [
        "仁厚宽和，仁木之心",
        "悲天悯人，关怀民生",
        "学问深厚，博古通今",
        "气节高尚，文风平易",
        "文采斐然，文章合时"
      ],
      daily_practice: "观察植物静静生长，感受到如春木般的温暖力量。留意那些文字温暖人心的时刻，体会其春风化雨般的滋养。通过通俗写作来分享知识与见解，相信文字能滋养人心。时常反思，自己的文字是否真的温暖了人心。",
      self_cultivation: "修身进德之道，在于学习王安石仁和学士的精神，培养仁木之心的品格；修炼文章合为时而著的使命感，以文字滋养世风；在侍读中体会道在温暖的玄明真谛，以文学促进文化繁荣；定期反思个人是否仁德与学问并重，确保文学的深度与温暖。"
    },
    {
      id: "1010-水",
      code: "1010",
      name: "润政笔相",
      category: "翰林学士",
      category_desc: "入世+文+庙堂+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "韩愈",
      core_description: '"润政笔相"，以笔墨文章润泽朝政如水之润物，此乃"水之智慧"的渗透。韩愈的文学政治智慧是"通达学士"的体现——擅长以文论政，通过奏疏、策论将儒家理想注入现实政治。如韩愈谏迎佛骨，以文章捍卫道统，文章不仅是艺术表达，更是政治理想的载体，当如水般渗透权力结构，引导政治走向清明，以笔墨为犁耕耘政治土壤。',
      personality_traits: [
        "深谋远虑，水之智慧",
        "通权达变，文以贯道",
        "学问深厚，博古通今",
        "气节高尚，风骨凛然",
        "文采斐然，笔墨为犁"
      ],
      daily_practice: "从观察水的流动中，体会智慧如水般渗透的意味。留意那些通过文字分析政治的时刻，感受其中'文以贯道'的智慧。通过策略写作来表达观点，相信文字能影响决策。时常反思，自己的文章是否如水流般润泽了思考。",
      self_cultivation: "修身进德之道，在于学习韩愈文以贯道的精神，培养水之智慧的品格；修炼笔墨为犁的使命感，以文章耕耘政治土壤；在笔相中体会道在渗透的玄明真谛，潜移默化影响朝政；定期反思个人是否学问与气节并重，确保学术的深度与政治的理想。"
    },
    {
      id: "1010-火",
      code: "1010",
      name: "焚心净臣",
      category: "翰林学士",
      category_desc: "入世+文+庙堂+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "柳宗元",
      core_description: '"焚心净臣"，心怀赤诚如火焰般燃烧敢于直言进谏，此乃"如火热情"的忠诚。柳宗元的谏官精神是"风骨学士"的体现——以谏书为武器，以忠诚为动力，将个人安危置之度外，以文章为镜照见政治得失。如火焰般照亮黑暗，驱散蒙昧，真正的忠诚不是顺从，而是敢于指出错误，在净臣中展现学士的赤诚。',
      personality_traits: [
        "古道热肠，如火热情",
        "热血丹心，焚心净臣",
        "学问深厚，博古通今",
        "气节高尚，风骨学士",
        "文采斐然，文章为镜"
      ],
      daily_practice: "内心常怀一股直言不讳的热情，如火焰般跃动。通过建设性的批评或建议来表达忠诚，相信真诚的谏言能照亮前路。当情绪激动时，注意冷静表达，避免热情过载。时常反思，自己的赤诚是否如火焰般，既能照亮黑暗，又能保持适度。",
      self_cultivation: "修身进德之道，在于学习柳宗元风骨学士的精神，培养如火热情的品格；修炼文死谏的忠诚，将个人安危置之度外；在净臣中体会道在赤诚的玄明真谛，以文章为镜照见政治得失；定期反思个人是否忠诚与智慧并重，确保谏言的恰当与勇气。"
    },
    {
      id: "1010-土",
      code: "1010",
      name: "稳砚史官",
      category: "翰林学士",
      category_desc: "入世+文+庙堂+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "曾巩",
      core_description: '"稳砚史官"，其学问如石渠阁中沉稳的砚台厚重扎实，此乃"厚土之德"的沉稳。曾巩的学术精神是"持重学士"的体现——长于典籍整理、历史编纂，以扎实的学识服务朝廷。不急功近利，不哗众取宠，如土般沉稳积累，为后世留下可靠的文献基础，真正的学问当如磐石，历经风雨而不改其质，在史官中展现学士的持重。',
      personality_traits: [
        "稳重持成，厚土之德",
        "脚踏实地，稳砚史官",
        "学问深厚，博古通今",
        "气节高尚，持重学士",
        "文采斐然，典籍为基"
      ],
      daily_practice: "从扎实的学问积累中，感受厚土般沉稳的根基感。研究中，留意那些体现不急功近利智慧的时刻。通过文献整理或长期项目来培养持重思维，相信学问需要时间沉淀。时常反思，自己的学术是否如磐石般可靠与持久。",
      self_cultivation: "修身进德之道，在于学习曾巩持重学士的精神，培养厚土之德的品格；修炼沉稳积累的耐心，为后世留下可靠文献；在史官中体会道在根基的玄明真谛，如土般积累学问；定期反思个人是否沉稳与学问并重，确保学术的深度与可靠性。"
    },
    {
      id: "1011-金",
      code: "1011",
      name: "丹心铁相",
      category: "宰相权臣",
      category_desc: "入世+文+庙堂+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "管仲",
      core_description: '"丹心铁相"，执政刚毅手腕强硬心怀赤诚，此乃"金石之志"的刚毅。管仲的政治智慧是"铁腕宰相"的体现——以铁血手段推行改革，稳定朝局。善用权力清除弊政，必要时以强硬手段推行善政，以"霸道"行"王道"，真正的政治家当有钢铁般的意志与赤子般的忠心，在复杂局势中开辟新路。',
      personality_traits: [
        "原则性强，金石之志",
        "刚正不阿，铁腕宰相",
        "政治智慧，运筹帷幄",
        "治理才能，清除弊政",
        "大局观念，开辟新路"
      ],
      daily_practice: "从分析决策中，体会原则的坚定感。留意那些需要铁腕推动的时刻，感受其中'霸道行王道'的智慧。通过推动必要改革来锻炼决断思维，相信刚毅的手段能达成善政。时常反思，自己的意志与忠心是否保持平衡。",
      self_cultivation: "修身进德之道，在于学习管仲铁腕宰相的精神，培养金石之志的品格；修炼钢铁意志与赤子忠心的平衡，以强硬手段推行善政；在权相中体会道在刚毅的玄明真谛，在复杂局势中开辟新路；定期反思个人是否刚毅与智慧并重，确保政治的深度与决断。"
    },
    {
      id: "1011-木",
      code: "1011",
      name: "柔枢宰辅",
      category: "宰相权臣",
      category_desc: "入世+文+庙堂+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "商鞅",
      core_description: '"柔枢宰辅"，其执政如柔韧枝条善于以柔克刚，此乃"仁木之心"的柔韧。商鞅的政治智慧是"仁政宰相"的体现——长于协调各方利益，平衡各种力量，不靠强硬压制，而以智慧疏导。其权变体现在"柔能克刚"的运用，如树木枝条般柔韧适应，最终达到政治稳定，真正的治国之道在于平衡与协调，而非简单的命令与服从。',
      personality_traits: [
        "温和包容，仁木之心",
        "富有仁德，柔枢宰辅",
        "政治智慧，以柔克刚",
        "治理才能，协调各方",
        "大局观念，平衡稳定"
      ],
      daily_practice: "观察植物枝条的柔韧生长，感受到如春木般温和的力量。留意那些通过协调达成平衡的时刻，体会其中'柔能克刚'的智慧。通过调解矛盾来锻炼柔韧思维，相信温和的方式能达成深远的改变。时常反思，自己是否做到了柔中有刚。",
      self_cultivation: "修身进德之道，在于学习商鞅仁政宰相的精神，培养仁木之心的品格；修炼以柔克刚的智慧，不靠强硬压制而以智慧疏导；在宰辅中体会道在柔韧的玄明真谛，如树木枝条般柔韧适应；定期反思个人是否柔韧与治理并重，确保政治的深度与协调性。"
    },
    {
      id: "1011-水",
      code: "1011",
      name: "变法权相",
      category: "宰相权臣",
      category_desc: "入世+文+庙堂+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "萧何",
      core_description: '"变法权相"，善于顺应时势潮流推行变法改革，此乃"水之智慧"的流动。萧何的政治智慧是"智谋宰相"的体现——洞察社会矛盾，抓住历史机遇，不固守旧制，勇于创新。其权变体现在对"时势造英雄"的把握，根据实际情况调整政策，如水般适应容器形状，真正的改革者当如水流，既能顺应大势，又能改变河道。',
      personality_traits: [
        "灵活变通，水之智慧",
        "智慧通达，顺应时势",
        "政治智慧，变法权相",
        "治理才能，改革河道",
        "大局观念，改变大势"
      ],
      daily_practice: "从观察水的流动中，体会智慧如水般顺势而为的特性。留意那些变革中顺应时势的时刻，感受其中'因势利导'的智慧。通过多方案准备来锻炼灵活调整能力，如水般适应变化。时常反思，自己是否在流动中保持方向。",
      self_cultivation: "修身进德之道，在于学习萧何智谋宰相的精神，培养水之智慧的品格；修炼因势利导的灵活性，根据实际情况调整政策；在权相中体会道在流动的玄明真谛，如水般适应容器形状；定期反思个人是否灵活与治理并重，确保政治的深度与适应性。"
    },
    {
      id: "1011-火",
      code: "1011",
      name: "燎原首辅",
      category: "宰相权臣",
      category_desc: "入世+文+庙堂+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "房玄龄",
      core_description: '"燎原首辅"，推行改革如烈火燎原热情澎湃，此乃"如火热情"的燃烧。房玄龄的政治智慧是"改革宰相"的体现——怀有宏大政治理想，敢于挑战既得利益集团，不满足于小修小补，而是寻求根本性突破。其权变体现在对革命性变革的追求，如火焰般燃烧旧秩序，照亮新道路，真正的变革需要烈火般的勇气与决心。',
      personality_traits: [
        "热情洋溢，如火热情",
        "富有激情，燎原首辅",
        "政治智慧，革命变革",
        "治理才能，燃烧旧秩序",
        "大局观念，照亮新路"
      ],
      daily_practice: "内心常怀一股推动变革的热情，如火焰般跃动。通过推动必要改革来表达热情，相信热情之火能照亮新路。当情绪高涨时，注意能量疏导，避免热情过载。时常反思，自己的热情是否如火焰般，既能燃烧旧秩序，又能保持健康。",
      self_cultivation: "修身进德之道，在于学习房玄龄改革宰相的精神，培养如火热情的品格；修炼烈火勇气的决心，敢于挑战既得利益集团；在首辅中体会道在燃烧的玄明真谛，如火焰般燃烧旧秩序照亮新道路；定期反思个人是否热情与智慧并重，确保政治的深度与勇气。"
    },
    {
      id: "1011-土",
      code: "1011",
      name: "盘根阁老",
      category: "宰相权臣",
      category_desc: "入世+文+庙堂+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "张居正",
      core_description: '"盘根阁老"，其执政重在巩固政权根基确保统治稳固，此乃"厚土之德"的沉稳。张居正的政治智慧是"务实宰相"的体现——长于权力运作，巩固个人或集团地位，通过人事安排、制度设计确保权力基础牢不可破。如树木盘根深扎土壤，真正的政治智慧在于确保稳定，在此基础上才能推行政策。',
      personality_traits: [
        "沉稳踏实，厚土之德",
        "务实负责，盘根阁老",
        "政治智慧，权力运作",
        "治理才能，巩固根基",
        "大局观念，确保稳定"
      ],
      daily_practice: "从检查生活根基中，感受厚土般沉稳的安定感。留意那些权力运作中体现稳固智慧的时刻。通过建立支持网络来培养沉稳思维，相信根基的牢固是长远发展的保障。时常反思，自己是否在安定中稳步成长。",
      self_cultivation: "修身进德之道，在于学习张居正务实宰相的精神，培养厚土之德的品格；修炼权力巩固的智慧，确保统治稳固；在阁老中体会道在根基的玄明真谛，如树木盘根深扎土壤；定期反思个人是否沉稳与权力并重，确保政治的深度与稳定性。"
    },
    {
      id: "1100-金",
      code: "1100",
      name: "卫道豪客",
      category: "侠义豪杰",
      category_desc: "入世+武+江湖+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "关羽",
      core_description: '"卫道豪客"者，身怀利器而不欺弱小，侠骨铮铮而正气凛然，此乃"金石之志"的坚守。关羽的"过五关斩六将"是"以剑护道"的决绝——原则如金石般刚毅，不容动摇。其侠义之道在于"剑隐品格"的修养，以刚正之心行走江湖，如剑锋般锐利不容妥协。行事果决，面对不公义愤填膺，以铁血手段匡扶正义，在践行中体会"道在正义"的玄明真谛。',
      personality_traits: [
        "心如金石，志不可夺",
        "刚正不阿，正气凛然",
        "行事果断，雷厉风行",
        "重情重义，一诺千金",
        "以剑护道，守护正义"
      ],
      daily_practice: "内心常怀一份原则清单，明确哪些底线绝不妥协。留意日常中那些需要挺身而出的时刻，体会其中'剑斩不公'的担当。遇到不公时勇敢发声，以此巩固内心的原则。周末时常反思，自己的言行是否一致，确保侠义精神的持续践行。",
      self_cultivation: '修身进德之道，在于学习关羽"金石之志"的精神，培养"剑隐品格"的修养；修炼"以剑护道"的武德，让剑为正义服务而非伤害；在关键时刻体会"道在正义"的玄明真谛，挺身守护公平；定期反思个人是否"侠义初心不改"，确保精神的纯粹与担当。'
    },
    {
      id: "1100-木",
      code: "1100",
      name: "扶世仁者",
      category: "侠义豪杰",
      category_desc: "入世+武+江湖+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "张飞",
      core_description: '"扶世仁者"者，如参天大树般以仁德滋养江湖，以扶助弱小为侠之本义，此乃"仁木之心"的自然流露。张飞的"长坂坡喝退曹军"是"仁者之勇"的展现——看似粗豪，实则有"春风化雨"的仁心。其侠义之道在于"以德服人"的智慧，不以武力强压，而以德行服人，注重感化与救助。如木之生长般包容万物，以柔克刚，在扶助中体会"道在仁德"的玄明真谛。',
      personality_traits: [
        "心如仁木，包容万物",
        "温和宽厚，春风化雨",
        "重情重义，肝胆相照",
        "扶危济困，侠骨仁心",
        "以德服人，润物无声"
      ],
      daily_practice: "观察植物静静生长，感受到如春木般温和的力量。留意那些展现仁善的时刻，体会其中'润物无声'的滋养。通过温和沟通来化解矛盾，相信春风化雨的方式更能深入人心。时常反思，内心的仁德是否常在流动。",
      self_cultivation: '修身进德之道，在于学习张飞"仁者之勇"的精神，培养"仁木之心"的品格；修炼"春风化雨"的温和，让侠义如木之生长般自然滋养；在扶助中体会"道在仁德"的玄明真谛，以仁德感化而非强制；定期反思个人是否"仁心不改"，确保侠义精神的纯粹与温暖。'
    },
    {
      id: "1100-水",
      code: "1100",
      name: "纳川义士",
      category: "侠义豪杰",
      category_desc: "入世+武+江湖+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "赵云",
      core_description: '"纳川义士"者，如江河湖海般容纳百川，以广阔胸怀承载江湖道义，此乃"水之智慧"的深远。赵云的"七进七出救阿斗"是"流动勇武"的典范——如水般灵动变通，却始终坚守"道义为舟"的初心。其侠义之道在于"智慧通达"的修为，善于变通而不失原则，灵活处世而坚守本心。如令狐冲般洒脱不羁，却始终不忘师门恩义，在流动江湖中体会"道在变通"的玄明真谛。',
      personality_traits: [
        "智慧如水，容纳百川",
        "灵活变通，随势而动",
        "重情重义，忠肝义胆",
        "勇武果决，深藏不露",
        "以智取胜，道义为舟"
      ],
      daily_practice: "观察水的流动，体会智慧如水般自然流动的特性。留意那些需要变通的时刻，感受其中'随机应变'的智慧。通过多角度思考来锻炼灵活思维，发展适应能力。时常反思，自己是否在灵动中保持原则。",
      self_cultivation: '修身进德之道，在于学习赵云"水之智慧"的精神，培养"智慧通达"的品格；修炼"流动勇武"的变通，让侠义如水流般灵动不滞；在行动中体会"道在变通"的玄明真谛，以智取胜而非硬碰硬；定期反思个人是否"智慧与道义并重"，确保侠义精神的深邃与恰当。'
    },
    {
      id: "1100-火",
      code: "1100",
      name: "燃光豪士",
      category: "侠义豪杰",
      category_desc: "入世+武+江湖+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "秦琼",
      core_description: '"燃光豪士"者，如熊熊烈火般燃烧激情，以赤诚之心点燃江湖正义，此乃"如火热情"的炽热。秦琼的"为朋友两肋插刀"是"赤诚肝胆"的展现——如火焰般光明磊落，不藏私心，不搞阴谋。其侠义之道在于"热情感染"的力量，热血豪迈，爱憎分明，以炽热情感感染他人。如杨过般狂放不羁，却始终坚守深情与侠义，在燃烧中体会"道在光明"的玄明真谛。',
      personality_traits: [
        "热情如火，光明磊落",
        "赤诚肝胆，义薄云天",
        "重情重义，生死相托",
        "豪迈果决，雷厉风行",
        "以情动人，以义服众"
      ],
      daily_practice: "内心常怀一股如火焰般跃动的热情。通过运动、创作或支持他人来释放热情，让热情健康流淌。当情绪高涨时，注意能量疏导，避免热情过载。时常反思，自己的热情是否如火焰般照亮了他人。",
      self_cultivation: '修身进德之道，在于学习秦琼"赤诚肝胆"的精神，培养"如火热情"的品格；修炼"热情与节制"的平衡，让激情照亮而不灼伤；在行动中体会"道在光明"的玄明真谛，以热情感染而非强迫；定期反思个人是否"热情与理性并重"，确保侠义精神的健康与持久。'
    },
    {
      id: "1100-土",
      code: "1100",
      name: "筑基信侠",
      category: "侠义豪杰",
      category_desc: "入世+武+江湖+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "尉迟恭",
      core_description: '"筑基信侠"者，如大地般厚重可靠，以坚实信誉承载江湖信任，此乃"厚土之德"的坚实。尉迟恭的"忠勇护主"是"根基稳固"的典范——如厚土般根基稳固，不急不躁，稳扎稳打。其侠义之道在于"诚信为基"的品格，言出必行，一诺千金，以稳重品格赢得尊重。如胡斐般坚守承诺，即使面临生命危险也不改初衷，在稳重中体会"道在根基"的玄明真谛。',
      personality_traits: [
        "沉稳如土，根基稳固",
        "言出必行，一诺千金",
        "务实负责，厚德载物",
        "重情重义，忠勇护道",
        "以诚立身，以信服众"
      ],
      daily_practice: "从检查生活根基中，感受厚土般沉稳的安定感。制定务实的计划，体会脚踏实地的踏实感。压力下进行深呼吸等练习，巩固内心的坚定。时常反思，自己是否在安定中稳步成长。",
      self_cultivation: '修身进德之道，在于学习尉迟恭"厚土之德"的精神，培养"诚信为基"的品格；修炼"稳重踏实"的定力，在浮躁中保持清醒；在坚守中体会"道在根基"的玄明真谛，稳步推进正义；定期反思个人是否"根基深厚"，确保侠义精神的坚实与可靠。'
    },
    {
      id: "1101-金",
      code: "1101",
      name: "算局隐师",
      category: "绿林枭雄",
      category_desc: "入世+武+江湖+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "曹操",
      core_description: '"算局隐师"者，智谋如金匮般严密珍藏，布局如棋局般深远精密，此乃"金石之智"的深邃。曹操的"挟天子以令诸侯"是"谋略深远"的展现——如金石般刚毅决断，谋定而后动。其枭雄之道在于"藏锋敛锐"的智慧，善于不露声色，却将计谋层层布局于无形。如朱剑秋般以智谋辅助，运筹帷幄，在谋略中体会"道在智谋"的玄明真谛。',
      personality_traits: [
        "智谋如金，深邃严密",
        "刚毅决断，谋定后动",
        "忠诚守信，原则性强",
        "掌控全局，审时度势",
        "藏锋敛锐，不露声色"
      ],
      daily_practice: "分析日常局势，体会其中原则的洞察力。记录决策中的谋略时刻，感受'深谋远虑'的智慧。通过棋类游戏或案例分析来锻炼全局思维。时常反思，自己的智谋是否与原则保持平衡。",
      self_cultivation: '修身进德之道，在于学习曹操"金石之智"的精神，培养"谋略深远"的品格；修炼"藏锋敛锐"的定力，在复杂局势中保持清醒；在布局中体会"道在智谋"的玄明真谛，谋定而后动而非急躁冒进；定期反思个人是否"智谋与道义并重"，确保智慧的深沉与行动的精准。'
    },
    {
      id: "1101-木",
      code: "1101",
      name: "借风棋手",
      category: "绿林枭雄",
      category_desc: "入世+武+江湖+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "刘备",
      core_description: '"借风棋手"者，谋略如林木般隐蔽生长，棋局如枝叶般层层展开，此乃"仁木之心"的渗透。刘备的"三顾茅庐"是"借势成局"的智慧——如木之生长般看似温和无害，实则渗透深远。其枭雄之道在于"柔和手段"的修为，善于隐于幕后，借他人之力成自己之事。如黄龙士般以棋局操纵天下大势，在布局中体会"道在生长"的玄明真谛。',
      personality_traits: [
        "仁厚宽和，悲天悯人",
        "谋略如木，渗透深远",
        "善于借势，柔和成局",
        "掌控全局，审时度势",
        "隐于幕后，棋手风范"
      ],
      daily_practice: "观察植物静静生长，感受到如春木般温和的力量。留意那些借势成局的时刻，体会其中'顺势而为'的智慧。通过长远规划来锻炼温和布局的能力。时常反思，自己是否在温和中不失谋略。",
      self_cultivation: '修身进德之道，在于学习刘备"仁木之心"的精神，培养"借势成局"的品格；修炼"柔和渗透"的智慧，让谋略如木之生长般自然深入；在布局中体会"道在生长"的玄明真谛，以柔克刚而非强行控制；定期反思个人是否"仁德与智谋并重"，确保谋略的深度与温和。'
    },
    {
      id: "1101-水",
      code: "1101",
      name: "镜照智者",
      category: "绿林枭雄",
      category_desc: "入世+武+江湖+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "孙权",
      core_description: '"镜照智者"者，谋略如水镜般映照真相，行动如倒影般虚实难辨，此乃"水之智慧"的深邃。孙权的"联刘抗曹"是"镜照智慧"的展现——如水镜般映照局势本质，虚实难辨。其枭雄之道在于"洞察人心"的修为，善于以水之流动性适应变化，以镜之映照性看透本质。如徐北枳般以阳谋布局，光明正大中暗藏玄机，在谋略中体会"道在智慧"的玄明真谛。',
      personality_traits: [
        "智慧如水，镜照真相",
        "深谋远虑，通权达变",
        "掌控全局，审时度势",
        "虚实难辨，阳谋布局",
        "洞察人心，映照本质"
      ],
      daily_practice: "观察水面倒影，体会智慧如水般流动的特性。留意那些洞察真相的时刻，感受其中'镜照真相'的澄明。通过多角度思考来发展洞察能力。时常反思，自己的智慧是否与变通保持平衡。",
      self_cultivation: '修身进德之道，在于学习孙权"水之智慧"的精神，培养"镜照智慧"的品格；修炼"虚实难辨"的谋略，在复杂局势中保持清醒洞察；在布局中体会"道在智慧"的玄明真谛，以智取胜而非硬碰硬；定期反思个人是否"智慧与道义并重"，确保谋略的深邃与恰当。'
    },
    {
      id: "1101-火",
      code: "1101",
      name: "燎原炎策",
      category: "绿林枭雄",
      category_desc: "入世+武+江湖+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "朱元璋",
      core_description: '"燎原炎策"者，计谋如火焰般迅猛激烈，攻势如燎原般势不可挡，此乃"如火热情"的炽烈。朱元璋的"高筑墙、广积粮、缓称王"是"燎原智慧"的展现——如火焰般平时隐忍积蓄，一旦发动便雷霆万钧。其枭雄之道在于"迅猛攻击"的谋略，善于抓住时机，以火之迅猛发动攻击，以燎原之势扩大战果。如诸葛亮火烧博望坡，以火攻之计体现火谋之威，在燃烧中体会"道在炽烈"的玄明真谛。',
      personality_traits: [
        "热情如火，迅猛激烈",
        "热血丹心，古道热肠",
        "谋略深远，掌控全局",
        "隐忍积蓄，雷霆万钧",
        "审时度势，燎原席卷"
      ],
      daily_practice: "内心常怀一股如火焰般跃动的激情。通过制定激动人心的计划来释放热情，让智慧之火健康燃烧。情绪高涨时注意能量疏导，避免热情过载。时常反思，自己的热情是否照亮了前路。",
      self_cultivation: '修身进德之道，在于学习朱元璋"燎原智慧"的精神，培养"如火热情"的品格；修炼"热情与节制"的平衡，让激情照亮而不灼伤；在谋略中体会"道在炽烈"的玄明真谛，以火攻之计智取而非蛮干；定期反思个人是否"热情与理性并重"，确保谋略的深度与行动的恰当。'
    },
    {
      id: "1101-土",
      code: "1101",
      name: "伺机潜龙",
      category: "绿林枭雄",
      category_desc: "入世+武+江湖+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "刘邦",
      core_description: '"伺机潜龙"者，如大地般沉稳潜伏，暗藏机遇，待机而发，此乃"厚土之德"的深沉。刘邦的"鸿门宴脱险"是"潜龙智慧"的展现——如大地般沉稳潜伏，以土之厚重积累实力。其枭雄之道在于"隐忍等待"的修为，善于以遁之隐蔽保存实力，看似被动沉寂，实则暗中观察。如司马懿般深藏不露，在隐忍中体会"道在潜伏"的玄明真谛，等待最佳时机一举而动。',
      personality_traits: [
        "沉稳如土，暗藏机遇",
        "隐忍等待，待机而发",
        "谋略深远，掌控全局",
        "脚踏实地，务实积累",
        "审时度势，潜龙在渊"
      ],
      daily_practice: "从检查生活根基中，感受厚土般沉稳的安定感。留意那些隐忍等待的时刻，体会其中'待时而动'的智慧。通过长远规划来锻炼耐心，发展沉稳思维。时常反思，自己是否在等待中保持成长。",
      self_cultivation: '修身进德之道，在于学习刘邦"潜龙智慧"的精神，培养"厚土之德"的品格；修炼"隐忍等待"的定力，在浮躁中保持清醒观察；在潜伏中体会"道在时机"的玄明真谛，待机而发而非急躁冒进；定期反思个人是否"沉稳与谋略并重"，确保智慧的深沉与行动的精准。'
    },
    {
      id: "1110-金",
      code: "1110",
      name: "铁血都护",
      category: "戍边大将",
      category_desc: "入世+武+庙堂+守正",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "蒙恬",
      core_description: '"铁血都护"者，如霍去病之身，以"匈奴未灭，何以家为"的铁血誓言，将全部生命奉献于戍边卫国，此乃"金石之志"的坚守。蒙恬的"修筑长城"是"铁壁防御"的展现——如金之刚毅，忠诚如铁，热血如沸，守卫边疆寸土不让。其戍边之道在于"以身许国"的担当，在烽火狼烟中其心不摇，在刀光剑影里其志弥坚，在守卫中体会"道在忠诚"的玄明真谛。',
      personality_traits: [
        "心如金石，志不可夺",
        "忠诚如铁，热血如沸",
        "刚正不阿，铁血誓言",
        "军事统帅，戍边卫国",
        "沉着稳重，坚如磐石"
      ],
      daily_practice: "内心常怀一份原则清单，体会其中金石般的坚定。留意日常中那些体现忠诚的时刻，感受'铁血誓言'的担当。通过坚守立场来巩固内心的原则。时常反思，自己的忠诚是否如一，确保戍边精神的持续践行。",
      self_cultivation: '修身进德之道，在于学习蒙恬"铁血誓言"的精神，培养"金石之志"的品格；修炼"忠诚如铁"的担当，在考验中保持清醒坚定；在戍守中体会"道在忠诚"的玄明真谛，以身许国而非私心；定期反思个人是否"初心如铁"，确保精神的纯粹与担当。'
    },
    {
      id: "1110-木",
      code: "1110",
      name: "苍松都统",
      category: "戍边大将",
      category_desc: "入世+武+庙堂+守正",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "李牧",
      core_description: '"苍松都统"者，如李广将军一生戍边，如青松般坚韧不拔，在边关月夜中默默坚守，此乃"仁木之心"的温暖。李牧的"以守代攻"是"仁守智慧"的展现——如木之生长，扎根边疆，虽经风霜雨雪，仍郁郁葱葱。其戍边之道在于"青松坚韧"的品格，月华如水映照孤独身影，松涛如诉诉说忠诚之心，在坚守中体会"道在仁守"的玄明真谛。',
      personality_traits: [
        "心如仁木，扎根边疆",
        "仁厚宽和，春风化雨",
        "军事统帅，忠诚卫国",
        "青松坚韧，默默坚守",
        "沉着稳重，岁月为证"
      ],
      daily_practice: "观察松树的生长，感受其如松般坚韧的沉稳。留意日常中那些仁守的时刻，体会其中'松涛如诉'的忠诚。通过温和坚守来守护原则。时常反思，内心的仁心是否常在流动。",
      self_cultivation: '修身进德之道，在于学习李牧"仁守大将"的精神，培养"仁木之心"的品格；修炼"青松坚韧"的定力，在孤独中保持生机；在戍守中体会"道在仁守"的玄明真谛，以仁德凝聚人心而非强制；定期反思个人是否"仁德与坚韧并重"，确保精神的温暖与担当。'
    },
    {
      id: "1110-水",
      code: "1110",
      name: "寒河都督",
      category: "戍边大将",
      category_desc: "入世+武+庙堂+守正",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "廉颇",
      core_description: '"寒河都督"者，如李靖用兵，似水般流动，似冰般冷静，似刃般锋利，此乃"水之智慧"的深邃。廉颇的"负荆请罪"是"智慧流动"的展现——表面平静如水，内里锋利如刃，看似柔弱可欺，实则坚韧难摧。其戍边之道在于"似水流动"的谋略，善用智慧守卫，非一味强攻，而是如冰河般柔韧适应，在守卫中体会"道在智慧"的玄明真谛。',
      personality_traits: [
        "智慧如水，流动变通",
        "深谋远虑，通权达变",
        "军事统帅，忠诚卫国",
        "似冰冷静，似刃锋利",
        "沉着稳重，藏锋待发"
      ],
      daily_practice: "观察水的流动，体会智慧如水般自然流动的特性。留意那些需要灵活适应的时刻，感受其中'似水流动'的智慧。通过多方案准备来锻炼变通思维。时常反思，自己是否在流动中保持方向。",
      self_cultivation: '修身进德之道，在于学习廉颇"水之智慧"的精神，培养"智慧流动"的品格；修炼"似冰冷静"的定力，在变化中保持清醒；在戍守中体会"道在智慧"的玄明真谛，以智取胜而非蛮干；定期反思个人是否"智慧与忠诚并重"，确保谋略的深邃与担当。'
    },
    {
      id: "1110-火",
      code: "1110",
      name: "烽火总兵",
      category: "戍边大将",
      category_desc: "入世+武+庙堂+守正",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "戚继光",
      core_description: '"烽火总兵"者，如岳飞之身，以"精忠报国"四字铭刻于心，如烽火般赤诚，如阳光般光明，此乃"如火热情"的炽热。戚继光的"戚家军"是"热血守护"的典范——烽火燃起照亮边关，赤心燃烧温暖家国。其戍边之道在于"光明磊落"的品格，行事光明不搞阴谋，忠诚如烽火永不熄灭，在守护中体会"道在光明"的玄明真谛。',
      personality_traits: [
        "热情如火，光明磊落",
        "热血丹心，精忠报国",
        "军事统帅，忠诚卫国",
        "赤诚肝胆，烽火不息",
        "沉着稳重，温暖家国"
      ],
      daily_practice: "内心常怀一股如火焰般跃动的热情。通过志愿服务或支持他人来释放热情，让热情健康流淌。情绪高涨时注意能量疏导，避免热情过载。时常反思，自己的热情是否照亮了边疆。",
      self_cultivation: '修身进德之道，在于学习戚继光"热血大将"的精神，培养"如火热情"的品格；修炼"热情与节制"的平衡，让激情照亮而不灼伤；在戍守中体会"道在光明"的玄明真谛，以热血守护边疆；定期反思个人是否"热情与理性并重"，确保侠义精神的健康与持久。'
    },
    {
      id: "1110-土",
      code: "1110",
      name: "铁石节度",
      category: "戍边大将",
      category_desc: "入世+武+庙堂+守正",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "袁崇焕",
      core_description: '"铁石节度"者，如戚继光创建戚家军，军纪严明如磐石，守卫边关坚不可摧，此乃"厚土之德"的沉稳。袁崇焕的"宁远之战"是"沉稳守卫"的典范——如土之厚重沉稳可靠，如石之坚固坚定不移。其戍边之道在于"以稳为基"的智慧，不追求奇功但求稳守，不羡慕虚名但求实效，在守卫中体会"道在沉稳"的玄明真谛。',
      personality_traits: [
        "沉稳如土，厚重可靠",
        "脚踏实地，务实求效",
        "军事统帅，忠诚卫国",
        "如石坚固，坚定不移",
        "沉着稳重，岿然不动"
      ],
      daily_practice: "从审视生活根基中，感受厚土般沉稳的安定感。制定切实可行的计划，体会脚踏实地的踏实感。在压力下进行深呼吸等练习，巩固内心的坚定。时常反思，自己是否在安定中稳步前行。",
      self_cultivation: '修身进德之道，在于学习袁崇焕"铁石节度"的精神，培养"厚土之德"的品格；修炼"沉稳如石"的定力，在浮躁中保持清醒坚定；在守卫中体会"道在沉稳"的玄明真谛，稳步推进正义；定期反思个人是否"根基深厚"，确保精神的坚实与可靠。'
    },
    {
      id: "1111-金",
      code: "1111",
      name: "铁腕督帅",
      category: "权谋将帅",
      category_desc: "入世+武+庙堂+权变",
      element: "金",
      element_desc: "刚毅、决断、原则、秩序",
      historical_figures: "孙武",
      core_description: '"铁腕督帅"者，以铁腕掌控局势，以棋手布局天下，此乃"金石之智"的深邃。孙武的"兵法十三篇"是"战略智慧"的典范——如金之刚毅决断果敢，如棋之谋略步步为营。其权谋之道在于"弈棋思维"的修为，视天下为棋局而运筹帷幄，在谋略中体会"道在决断"的玄明真谛。',
      personality_traits: [
        "心如金石，刚毅决断",
        "行事果断，战略眼光",
        "善于用兵，棋手思维",
        "冷酷无情，精于算计",
        "冷静果断，步步为营"
      ],
      daily_practice: "内心常怀一份原则清单，体会其中金石般的坚定。留意日常中那些决断的时刻，感受'棋手思维'的智慧。通过棋类游戏或案例分析来锻炼战略思考。时常反思，自己的智谋是否与原则保持平衡。",
      self_cultivation: '修身进德之道，在于学习孙武"兵法智慧"的精神，培养"金石之智"的品格；修炼"决断果敢"的定力，在复杂局势中保持清醒；在谋略中体会"道在决断"的玄明真谛，谋定而后动而非急躁冒进；定期反思个人是否"智谋与道义并重"，确保智慧的深沉与行动的精准。'
    },
    {
      id: "1111-木",
      code: "1111",
      name: "隐林军谋",
      category: "权谋将帅",
      category_desc: "入世+武+庙堂+权变",
      element: "木",
      element_desc: "仁和、生长、包容、生机",
      historical_figures: "吴起",
      core_description: '"隐林军谋"者，如司马懿之谋隐于林中，伏于暗处伺机而动，此乃"仁木之心"的渗透。吴起的"变法强兵"是"隐忍智慧"的展现——如木之柔韧能屈能伸，如林之隐蔽藏而不露。其权谋之道在于"伺机待发"的修为，表面顺从如草内心坚韧如木，在谋略中体会"道在隐蔽"的玄明真谛。',
      personality_traits: [
        "心如仁木，柔韧能伸",
        "温和包容，富有仁德",
        "战略眼光，隐忍待发",
        "善于用兵，伺机而动",
        "冷静果断，一击必杀"
      ],
      daily_practice: "观察植物静静生长，感受到如春木般温和的力量。留意那些隐忍等待的时刻，体会其中'伺机待发'的智慧。通过长远规划来锻炼温和布局的能力。时常反思，自己是否在温和中不失谋略。",
      self_cultivation: '修身进德之道，在于学习吴起"仁德将帅"的精神，培养"仁木之心"的品格；修炼"隐忍待发"的智慧，让谋略如木之生长般自然深入；在布局中体会"道在隐蔽"的玄明真谛，以柔克刚而非强行控制；定期反思个人是否"仁德与智谋并重"，确保谋略的深度与温和。'
    },
    {
      id: "1111-水",
      code: "1111",
      name: "诡道参军",
      category: "权谋将帅",
      category_desc: "入世+武+庙堂+权变",
      element: "水",
      element_desc: "智慧、流动、变通、深沉",
      historical_figures: "孙膑",
      core_description: '"诡道参军"者，如韩信用兵似水般流动，似波般变幻似诡道般难测，此乃"水之智慧"的深远。孙膑的"围魏救赵"是"诡道智慧"的展现——如水之流动随形势变化而调整，如波之起伏依敌情变动而应对。其权谋之道在于"以变应变"的修为，背水一战置之死地而后生，在谋略中体会"道在变通"的玄明真谛。',
      personality_traits: [
        "智慧如水，流动变通",
        "灵活变通，诡道难测",
        "战略眼光，善于用兵",
        "冷静果断，背水一战",
        "以变应变，以诡制正"
      ],
      daily_practice: "观察水的流动，体会智慧如水般自然流动的特性。留意那些需要变通的时刻，感受其中'随机应变'的智慧。通过多角度思考来锻炼灵活思维。时常反思，自己是否在灵动中保持原则。",
      self_cultivation: '修身进德之道，在于学习孙膑"兵法智慧"的精神，培养"水之智慧"的品格；修炼"灵活变通"的定力，在变化中保持清醒；在谋略中体会"道在变通"的玄明真谛，以智取胜而非硬碰硬；定期反思个人是否"智慧与道义并重"，确保谋略的深邃与恰当。'
    },
    {
      id: "1111-火",
      code: "1111",
      name: "燎原军魂",
      category: "权谋将帅",
      category_desc: "入世+武+庙堂+权变",
      element: "火",
      element_desc: "热情、创造、行动、感染力",
      historical_figures: "郭子仪",
      core_description: '"燎原军魂"者，如白起用兵似烈火燎原迅猛难挡，如奇兵突袭出其不意，此乃"如火热情"的炽烈。郭子仪的"平定安史之乱"是"热血守护"的展现——如火之迅猛行动如风，如燎原之势一旦发动便不可收拾。其权谋之道在于"迅猛制敌"的修为，长平之战虽残忍却有效，在谋略中体会"道在迅猛"的玄明真谛。',
      personality_traits: [
        "热情如火，迅猛难挡",
        "富有激情，行动如风",
        "战略眼光，善于用兵",
        "冷静果断，奇兵突袭",
        "燎原之势，动则必成"
      ],
      daily_practice: "内心常怀一股如火焰般跃动的热情。通过运动、创作或支持他人来释放热情，让热情健康流淌。情绪高涨时注意能量疏导，避免热情过载。时常反思，自己的热情是否照亮了他人。",
      self_cultivation: '修身进德之道，在于学习郭子仪"热血将帅"的精神，培养"如火热情"的品格；修炼"热情与节制"的平衡，让激情照亮而不灼伤；在谋略中体会"道在迅猛"的玄明真谛，以火攻之计智取而非蛮干；定期反思个人是否"热情与理性并重"，确保谋略的深度与行动的恰当。'
    },
    {
      id: "1111-土",
      code: "1111",
      name: "盘根枢辅",
      category: "权谋将帅",
      category_desc: "入世+武+庙堂+权变",
      element: "土",
      element_desc: "沉稳、包容、务实、责任",
      historical_figures: "姜子牙",
      core_description: '"盘根枢辅"者，如王翦之谋根基稳固如盘根错节，权术深沉如大地厚重，此乃"厚土之德"的深沉。姜子牙的"渭水垂钓"是"沉稳智慧"的展现——如土之稳固根基深厚，如根之盘结关系复杂。其权谋之道在于"深沉权术"的修为，不追求一时之功但求长久之安，在谋略中体会"道在根基"的玄明真谛。',
      personality_traits: [
        "沉稳如土，根基深厚",
        "务实负责，深沉权术",
        "战略眼光，善于用兵",
        "冷静果断，盘根错节",
        "功高不震，位极不忌"
      ],
      daily_practice: "从检视生活根基中，感受厚土般沉稳的安定感。制定可行的计划，体会脚踏实地的踏实感。面对压力时进行深呼吸等练习，巩固内心的坚定。时常反思，自己是否在安定中持续成长。",
      self_cultivation: "修身进德之道，在于学习姜子牙沉稳将帅的精神，培养厚土之德的品格；修炼沉稳如根的定力，在浮躁中保持清醒坚定；在谋略中体会道在根基的玄明真谛，稳步推进正义；定期反思个人是否根基深厚，确保精神的坚实与可靠。"
    }
  ];
  const questions = [
    {
      number: 1,
      title: "乱世中的生存抉择",
      question: "若逢乱世，烽烟四起，你会选择怎样的存身之道？",
      options: [
        {
          letter: "A",
          text: "隐遁山林，保全性命，静待天时",
          "五行权重": [
            1,
            1,
            1,
            2,
            0
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "隐居山林，保全自身，静待时机"
        },
        {
          letter: "B",
          text: "投身行伍，建功沙场，守护家邦",
          "五行权重": [
            1,
            0,
            0,
            1,
            4
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "投身军旅，建功立业，保卫家园"
        },
        {
          letter: "C",
          text: "游说诸侯，纵横捭阖，谋求出路",
          "五行权重": [
            1,
            1,
            2,
            1,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "游说诸侯，合纵连横，谋求出路"
        },
        {
          letter: "D",
          text: "精研技艺，传之后世，不问纷争",
          "五行权重": [
            0,
            2,
            1,
            0,
            2
          ],
          "四维倾向文本": "出世+武+江湖+守正",
          "原选项文本": "苦练技艺，传之后世，不问世事"
        }
      ]
    },
    {
      number: 2,
      title: "面对不公时的反应",
      question: "若见不平之事，你的初心会如何？",
      options: [
        {
          letter: "A",
          text: "挺身而出，匡扶正义",
          "五行权重": [
            3,
            1,
            0,
            2,
            0
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "立即站出来抗争，维护正义"
        },
        {
          letter: "B",
          text: "冷眼旁观，待机而动",
          "五行权重": [
            1,
            0,
            1,
            0,
            4
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "冷静观察，寻找最佳时机和方式介入"
        },
        {
          letter: "C",
          text: "暗集凭证，循途而告",
          "五行权重": [
            1,
            1,
            2,
            0,
            2
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "暗中收集证据，通过合适渠道举报"
        },
        {
          letter: "D",
          text: "暂保己身，信天理昭彰",
          "五行权重": [
            2,
            2,
            1,
            0,
            1
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "先保全自己，相信善恶终有报"
        }
      ]
    },
    {
      number: 3,
      title: "同门分歧处理方式",
      question: "若同门之中生出重大分歧，你更倾向于如何化解？",
      options: [
        {
          letter: "A",
          text: "召集双方调和，求取共识之法",
          "五行权重": [
            0,
            1,
            1,
            0,
            4
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "召集双方调解，寻求共识方案"
        },
        {
          letter: "B",
          text: "明定规矩，依制公正裁断",
          "五行权重": [
            3,
            1,
            0,
            0,
            2
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "明确规则，按制度公正裁决"
        },
        {
          letter: "C",
          text: "支持有理一方，果决推行",
          "五行权重": [
            3,
            0,
            0,
            2,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "支持有理一方，果断执行"
        },
        {
          letter: "D",
          text: "暂且回避，待双方冷静后再议",
          "五行权重": [
            0,
            2,
            1,
            2,
            1
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "暂时回避，让双方冷静后再议"
        }
      ]
    },
    {
      number: 4,
      title: "个人利益与原则冲突",
      question: "若遇晋升良机却需违背本心道义，你将如何抉择？",
      options: [
        {
          letter: "A",
          text: "坚守道义良心，宁舍晋升之机",
          "五行权重": [
            3,
            1,
            0,
            1,
            1
          ],
          "四维倾向文本": "出世+武+江湖+守正",
          "原选项文本": "坚守原则，哪怕牺牲利益"
        },
        {
          letter: "B",
          text: "寻求两全之策，既得晋升亦不违道义",
          "五行权重": [
            1,
            1,
            1,
            2,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "寻找折中方案，平衡两者"
        },
        {
          letter: "C",
          text: "暂且应承，待他日有机会再行弥补",
          "五行权重": [
            0,
            2,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+文+庙堂+权变",
          "原选项文本": "暂时妥协，等待更好的时机"
        },
        {
          letter: "D",
          text: "重新审视道义标准，观其是否过于理想",
          "五行权重": [
            1,
            2,
            1,
            1,
            1
          ],
          "四维倾向文本": "入世+文+江湖+守正",
          "原选项文本": "重新审视原则的合理性"
        }
      ]
    },
    {
      number: 5,
      title: "学习成长的主要方式",
      question: "你更倾向于以何种方式精进自身？",
      options: [
        {
          letter: "A",
          text: "勤修武艺，以武入道",
          "五行权重": [
            1,
            1,
            2,
            2,
            0
          ],
          "四维倾向文本": "出世+武+江湖+守正",
          "原选项文本": "练武实践，深入行动"
        },
        {
          letter: "B",
          text: "游历四方，于实践中悟道",
          "五行权重": [
            2,
            1,
            1,
            2,
            0
          ],
          "四维倾向文本": "入世+武+江湖+权变",
          "原选项文本": "实践历练，从经验中学习"
        },
        {
          letter: "C",
          text: "拜师学艺，承袭正统",
          "五行权重": [
            0,
            2,
            1,
            0,
            3
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "向高人请教，师徒传承"
        },
        {
          letter: "D",
          text: "观摩百家，自成一格",
          "五行权重": [
            2,
            1,
            2,
            0,
            1
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "观察模仿，自我领悟"
        }
      ]
    },
    {
      number: 6,
      title: "社交场合的表现偏好",
      question: "若逢英雄盛会，群雄齐聚，你会如何自处？",
      options: [
        {
          letter: "A",
          text: "主动结交各路豪杰，畅论武学心得",
          "五行权重": [
            0,
            1,
            0,
            1,
            4
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "主动结识新朋友，热情交谈"
        },
        {
          letter: "B",
          text: "先观各派武功路数，谨慎择友而交",
          "五行权重": [
            1,
            0,
            1,
            2,
            2
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "保持距离，观察后再决定是否接触"
        },
        {
          letter: "C",
          text: "专心本门事务，随缘结识有缘之人",
          "五行权重": [
            2,
            2,
            1,
            0,
            1
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "专注于自己的事情，随缘交往"
        },
        {
          letter: "D",
          text: "寻觅志同道合之士，深入切磋交流",
          "五行权重": [
            1,
            2,
            1,
            1,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "寻找有共同话题的人深入交流"
        }
      ]
    },
    {
      number: 7,
      title: "危机应对策略",
      question: "若遇突发危难，你的本能反应会是？",
      options: [
        {
          letter: "A",
          text: "冷静部署，制定周详应对之策",
          "五行权重": [
            2,
            0,
            1,
            0,
            3
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "冷静执行，制定应对计划"
        },
        {
          letter: "B",
          text: "立即行动，先解燃眉之急",
          "五行权重": [
            3,
            0,
            0,
            0,
            3
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "立即行动，解决最紧迫的问题"
        },
        {
          letter: "C",
          text: "寻求助力，汇聚众人之智",
          "五行权重": [
            0,
            1,
            2,
            0,
            3
          ],
          "四维倾向文本": "入世+文+江湖+权变",
          "原选项文本": "寻求帮助，团结众人力量"
        },
        {
          letter: "D",
          text: "暂避锋芒，静观根本缘由",
          "五行权重": [
            0,
            1,
            1,
            2,
            2
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "暂时回避，行动根本原因"
        }
      ]
    },
    {
      number: 8,
      title: "资源分配决策",
      question: "若遇灾荒之年，你身为地方父母官，当如何应对？",
      options: [
        {
          letter: "A",
          text: "按人口均分赈灾粮草",
          "五行权重": [
            1,
            1,
            1,
            1,
            2
          ],
          "四维倾向文本": "出世+文+庙堂+守正",
          "原选项文本": "按公平原则平均分配"
        },
        {
          letter: "B",
          text: "优先救济老弱病残等急困之人",
          "五行权重": [
            1,
            2,
            1,
            1,
            1
          ],
          "四维倾向文本": "出世+武+庙堂+权变",
          "原选项文本": "按实际需要和贡献分配"
        },
        {
          letter: "C",
          text: "集中资源兴农自救",
          "五行权重": [
            3,
            0,
            1,
            2,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "重点投入最有潜力的方向"
        },
        {
          letter: "D",
          text: "召集乡绅百姓共商分配之策",
          "五行权重": [
            0,
            1,
            2,
            2,
            1
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "让大家协商决定分配方案"
        }
      ]
    },
    {
      number: 9,
      title: "长期目标设定偏好",
      question: "若得一年逍遥光阴，不受世俗羁绊，你将如何安排？",
      options: [
        {
          letter: "A",
          text: "投身宏大功业，立不世之功，影响当世",
          "五行权重": [
            3,
            1,
            0,
            2,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "功成名就，影响社会"
        },
        {
          letter: "B",
          text: "潜心修行，遍访名山大川，提升精神境界",
          "五行权重": [
            0,
            1,
            2,
            2,
            1
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "精神修养，境界提升"
        },
        {
          letter: "C",
          text: "陪伴家人，经营温馨家园，享受平静生活",
          "五行权重": [
            2,
            2,
            1,
            0,
            1
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "家庭幸福，生活安稳"
        },
        {
          letter: "D",
          text: "随心所欲，探索未知之境，随缘体验人生",
          "五行权重": [
            0,
            1,
            1,
            2,
            2
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "自由探索，随缘发展"
        }
      ]
    },
    {
      number: 10,
      title: "道德困境抉择",
      question: "若遇马车失控冲向五人，转向则必撞向另一人，你将如何抉择？",
      options: [
        {
          letter: "A",
          text: "绝不转向，每个生命皆不可衡量牺牲",
          "五行权重": [
            3,
            2,
            0,
            1,
            0
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "坚决拒绝，生命不可衡量"
        },
        {
          letter: "B",
          text: "痛苦而理性地转向，舍一人而救五人",
          "五行权重": [
            2,
            0,
            2,
            2,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "痛苦选择牺牲少数，拯救多数"
        },
        {
          letter: "C",
          text: "紧急另寻他法，图免任何牺牲",
          "五行权重": [
            1,
            1,
            1,
            3,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "寻找第三条路，避免牺牲"
        },
        {
          letter: "D",
          text: "不自作决断，交由天命或更高裁决",
          "五行权重": [
            0,
            2,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "交由更高权威或抽签决定"
        }
      ]
    },
    {
      number: 11,
      title: "人生最关键的价值",
      question: "若只能传一种核心品质予子孙后代，你会选择什么？",
      options: [
        {
          letter: "A",
          text: "勇毅刚强，不畏艰险，成就非凡功业",
          "五行权重": [
            3,
            0,
            0,
            2,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "功成名就，留下印记"
        },
        {
          letter: "B",
          text: "智慧明理，内心平和，保持精神自在",
          "五行权重": [
            0,
            1,
            2,
            2,
            1
          ],
          "四维倾向文本": "出世+文+庙堂+权变",
          "原选项文本": "精神自由，内心宁静"
        },
        {
          letter: "C",
          text: "仁爱孝悌，重视家庭，担当责任义务",
          "五行权重": [
            0,
            2,
            1,
            0,
            3
          ],
          "四维倾向文本": "入世+文+江湖+守正",
          "原选项文本": "家庭责任，生活安稳"
        },
        {
          letter: "D",
          text: "好奇探索，勇于尝试，体验生命丰盈",
          "五行权重": [
            0,
            1,
            1,
            1,
            3
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "探索未知，体验生命"
        }
      ]
    },
    {
      number: 12,
      title: "友谊的核心价值",
      question: "你期望至交知己具备怎样的品格？",
      options: [
        {
          letter: "A",
          text: "忠诚可靠，可以生死相托",
          "五行权重": [
            2,
            2,
            0,
            1,
            1
          ],
          "四维倾向文本": "入世+武+江湖+权变",
          "原选项文本": "忠诚可靠，患难与共"
        },
        {
          letter: "B",
          text: "志趣相投，可以畅谈武学心法",
          "五行权重": [
            1,
            1,
            1,
            2,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "勇武共鸣，互相启发"
        },
        {
          letter: "C",
          text: "利益互助，可以共同成长发展",
          "五行权重": [
            2,
            0,
            2,
            1,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "利益互助，共同成长"
        },
        {
          letter: "D",
          text: "轻松愉快，可以随意相处不拘束",
          "五行权重": [
            0,
            1,
            1,
            3,
            1
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "轻松愉快，相处自然"
        }
      ]
    },
    {
      number: 13,
      title: "成功的定义",
      question: "回首一生，你认为怎样的人生方算圆满无憾？",
      options: [
        {
          letter: "A",
          text: "实现了毕生追求的理想和目标，心满意足",
          "五行权重": [
            2,
            2,
            0,
            1,
            1
          ],
          "四维倾向文本": "出世+武+庙堂+守正",
          "原选项文本": "实现理想，达成目标"
        },
        {
          letter: "B",
          text: "为他人和社会做出了实质贡献，留下影响",
          "五行权重": [
            2,
            2,
            1,
            1,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "影响他人，造福社会"
        },
        {
          letter: "C",
          text: "内心始终保持平和安宁，精神境界不断提升",
          "五行权重": [
            0,
            1,
            2,
            2,
            1
          ],
          "四维倾向文本": "出世+武+江湖+守正",
          "原选项文本": "内心平和，境界提升"
        },
        {
          letter: "D",
          text: "积累了丰厚财富，享受了优越舒适的生活",
          "五行权重": [
            2,
            0,
            1,
            1,
            2
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "积累财富，生活优越"
        }
      ]
    },
    {
      number: 14,
      title: "对权力的态度",
      question: "你对权柄与地位的根本态度是？",
      options: [
        {
          letter: "A",
          text: "追求权柄，实现抱负",
          "五行权重": [
            2,
            0,
            1,
            2,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "追求权力，实现抱负"
        },
        {
          letter: "B",
          text: "善用权柄，服务大众",
          "五行权重": [
            2,
            2,
            1,
            1,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "善用权力，服务大众"
        },
        {
          letter: "C",
          text: "避让权柄，保持自在",
          "五行权重": [
            0,
            2,
            1,
            2,
            1
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "避免权力，保持自由"
        },
        {
          letter: "D",
          text: "视情形而定，灵活应对",
          "五行权重": [
            1,
            1,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+文+庙堂+权变",
          "原选项文本": "视情况而定，灵活应对"
        }
      ]
    },
    {
      number: 15,
      title: "知识的价值取向",
      question: "若在古代，你更乐于从事以下哪种文化活动？",
      options: [
        {
          letter: "A",
          text: "钻研典籍，探究天地至理",
          "五行权重": [
            1,
            1,
            2,
            2,
            0
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "提升勇武，认识世界"
        },
        {
          letter: "B",
          text: "编修礼乐，规范典章制度",
          "五行权重": [
            2,
            1,
            1,
            2,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "解决问题，创造价值"
        },
        {
          letter: "C",
          text: "著书立说，教化世人",
          "五行权重": [
            1,
            2,
            2,
            1,
            0
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "传承文明，教化他人"
        },
        {
          letter: "D",
          text: "修身养性，追求天人合一之境",
          "五行权重": [
            0,
            1,
            1,
            2,
            2
          ],
          "四维倾向文本": "出世+武+江湖+守正",
          "原选项文本": "自我完善，精神成长"
        }
      ]
    },
    {
      number: 16,
      title: "自由与责任的平衡",
      question: "你如何看待个人自在与社会责任的关系？",
      options: [
        {
          letter: "A",
          text: "自在为先，在不伤他人的前提下追求自我",
          "五行权重": [
            0,
            2,
            1,
            3,
            0
          ],
          "四维倾向文本": "出世+武+江湖+权变",
          "原选项文本": "自由优先，在不伤害他人的前提下追求自我"
        },
        {
          letter: "B",
          text: "责任为先，在履行义务中实现自在",
          "五行权重": [
            2,
            2,
            1,
            0,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "责任优先，在履行义务中实现自由"
        },
        {
          letter: "C",
          text: "动态平衡，视具体情况而定",
          "五行权重": [
            1,
            1,
            2,
            0,
            2
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "动态平衡，视具体情况而定"
        },
        {
          letter: "D",
          text: "两者本为一体，无需刻意区分",
          "五行权重": [
            0,
            1,
            1,
            2,
            2
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "两者本质统一，不需刻意区分"
        }
      ]
    },
    {
      number: 17,
      title: "传统与革新的态度",
      question: "你更倾向于承袭传统还是勇于革新？",
      options: [
        {
          letter: "A",
          text: "尊重传统，承其精华",
          "五行权重": [
            2,
            2,
            1,
            0,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "尊重传统，继承精华"
        },
        {
          letter: "B",
          text: "勇于革新，推动进步",
          "五行权重": [
            3,
            0,
            1,
            2,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "勇于革新，推动进步"
        },
        {
          letter: "C",
          text: "辩证看待，取其精华去其糟粕",
          "五行权重": [
            1,
            1,
            1,
            2,
            1
          ],
          "四维倾向文本": "出世+文+庙堂+权变",
          "原选项文本": "辩证看待，取其精华去其糟粕"
        },
        {
          letter: "D",
          text: "随遇而安，交由时光检验",
          "五行权重": [
            0,
            2,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "顺其自然，让时间检验"
        }
      ]
    },
    {
      number: 18,
      title: "偏好的学习方式",
      question: "你更偏好哪种文化学习提升方式？",
      options: [
        {
          letter: "A",
          text: "独自钻研，深入文学经典诗词经文",
          "五行权重": [
            1,
            1,
            1,
            1,
            2
          ],
          "四维倾向文本": "出世+文+庙堂+守正",
          "原选项文本": "独自阅读思考，深入钻研"
        },
        {
          letter: "B",
          text: "游历四方，实地考察，感悟自然",
          "五行权重": [
            2,
            1,
            1,
            2,
            0
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "实践操作，从做中学"
        },
        {
          letter: "C",
          text: "参与诗文雅集，交流学问心得",
          "五行权重": [
            0,
            2,
            1,
            3,
            0
          ],
          "四维倾向文本": "入世+文+江湖+权变",
          "原选项文本": "与他人讨论交流，互相启发"
        },
        {
          letter: "D",
          text: "临摹名家作品，于模仿中求创新",
          "五行权重": [
            0,
            1,
            2,
            0,
            3
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "观察模仿，潜移默化"
        }
      ]
    },
    {
      number: 19,
      title: "解决问题的方法偏好",
      question: "若遇十分紧急棘手之事，你会如何应对？",
      options: [
        {
          letter: "A",
          text: "冷静分析，制定周密应对之策",
          "五行权重": [
            2,
            0,
            1,
            3,
            0
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "分析研究，制定详细方案"
        },
        {
          letter: "B",
          text: "立即采取行动，边做边调整",
          "五行权重": [
            3,
            0,
            0,
            3,
            0
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "立即行动，边做边调整"
        },
        {
          letter: "C",
          text: "寻求帮助，集思广益",
          "五行权重": [
            0,
            1,
            2,
            3,
            0
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "请教他人，集思广益"
        },
        {
          letter: "D",
          text: "暂时搁置，等待转机",
          "五行权重": [
            0,
            1,
            1,
            2,
            2
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "暂时放下，等待灵感"
        }
      ]
    },
    {
      number: 20,
      title: "社交风格偏好",
      question: "若在古代，你的社交风范可能会是？",
      options: [
        {
          letter: "A",
          text: "广结善缘，豪爽热情结交天下英雄",
          "五行权重": [
            0,
            1,
            0,
            3,
            2
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "广泛结交，热情主动"
        },
        {
          letter: "B",
          text: "深交数人，建立生死之交的知己情谊",
          "五行权重": [
            1,
            2,
            1,
            1,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "深入少数，建立深厚关系"
        },
        {
          letter: "C",
          text: "保持距离，谨慎选择交往之对象",
          "五行权重": [
            1,
            0,
            1,
            2,
            2
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "保持距离，有选择性交往"
        },
        {
          letter: "D",
          text: "随缘而交，不强求亦不刻意回避缘分",
          "五行权重": [
            0,
            2,
            1,
            0,
            3
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "随缘而交，不强求也不回避"
        }
      ]
    },
    {
      number: 21,
      title: "压力应对方式",
      question: "面对巨大压力，你通常会？",
      options: [
        {
          letter: "A",
          text: "独自静处，反思调整",
          "五行权重": [
            0,
            2,
            1,
            2,
            1
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "独自静处，反思调整"
        },
        {
          letter: "B",
          text: "寻信任之人倾诉",
          "五行权重": [
            0,
            1,
            2,
            3,
            0
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "找信任的人倾诉"
        },
        {
          letter: "C",
          text: "通过行动转移注意",
          "五行权重": [
            2,
            0,
            1,
            2,
            1
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "通过行动转移注意力"
        },
        {
          letter: "D",
          text: "分析压力来源，系统解决",
          "五行权重": [
            2,
            1,
            2,
            0,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "分析压力来源，系统解决"
        }
      ]
    },
    {
      number: 22,
      title: "时间管理偏好",
      question: "对于日常行程安排，你会如何规划？",
      options: [
        {
          letter: "A",
          text: "详定日程，严格执行",
          "五行权重": [
            3,
            1,
            1,
            0,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "详细计划，严格执行"
        },
        {
          letter: "B",
          text: "大致规划，灵活调整",
          "五行权重": [
            1,
            1,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+文+庙堂+权变",
          "原选项文本": "大致规划，灵活调整"
        },
        {
          letter: "C",
          text: "优先处理要事，其余随性",
          "五行权重": [
            2,
            0,
            1,
            1,
            2
          ],
          "四维倾向文本": "入世+武+庙堂+权变",
          "原选项文本": "重要事项优先，其他随性"
        },
        {
          letter: "D",
          text: "随遇而安，不刻意安排",
          "五行权重": [
            0,
            2,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "顺其自然，不刻意规划"
        }
      ]
    },
    {
      number: 23,
      title: "人性本质观点",
      question: "你认为人的本性更接近于？",
      options: [
        {
          letter: "A",
          text: "性本善，需引导发扬",
          "五行权重": [
            1,
            3,
            1,
            1,
            0
          ],
          "四维倾向文本": "出世+文+庙堂+守正",
          "原选项文本": "性本善，需引导发扬"
        },
        {
          letter: "B",
          text: "性本恶，需约束教化",
          "五行权重": [
            2,
            1,
            1,
            0,
            2
          ],
          "四维倾向文本": "出世+武+庙堂+守正",
          "原选项文本": "性本恶，需约束教化"
        },
        {
          letter: "C",
          text: "可塑性强，受环境影响",
          "五行权重": [
            0,
            2,
            1,
            2,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "可塑性强，受环境影响"
        },
        {
          letter: "D",
          text: "复杂多元，难以简单概括",
          "五行权重": [
            1,
            1,
            2,
            1,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "复杂多元，难以简单概括"
        }
      ]
    },
    {
      number: 24,
      title: "命运观念",
      question: "你如何看待天命与个人努力的关系？",
      options: [
        {
          letter: "A",
          text: "天命注定，努力改变有限",
          "五行权重": [
            0,
            1,
            3,
            0,
            2
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "命运注定，努力改变有限"
        },
        {
          letter: "B",
          text: "人定胜天，努力决定一切",
          "五行权重": [
            3,
            1,
            0,
            2,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "人定胜天，努力决定一切"
        },
        {
          letter: "C",
          text: "天命提供机缘，努力把握",
          "五行权重": [
            2,
            2,
            1,
            1,
            0
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "命运提供机会，努力把握"
        },
        {
          letter: "D",
          text: "随缘努力，结果随遇而安",
          "五行权重": [
            0,
            2,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "随缘努力，结果顺其自然"
        }
      ]
    },
    {
      number: 25,
      title: "人生意义观点",
      question: "你希望给百年之后的人们留下怎样的印象？",
      options: [
        {
          letter: "A",
          text: "他奉献一生，为社会创造了永恒价值",
          "五行权重": [
            2,
            2,
            1,
            1,
            0
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "奉献社会，创造价值"
        },
        {
          letter: "B",
          text: "他实现了毕生理想，成就了非凡自我",
          "五行权重": [
            3,
            1,
            0,
            2,
            0
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "成就自我，实现理想"
        },
        {
          letter: "C",
          text: "他尽情体验了生命的丰富，感受了过程之美",
          "五行权重": [
            0,
            2,
            2,
            1,
            1
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "体验过程，感受生命"
        },
        {
          letter: "D",
          text: "他超越世俗羁绊，始终追寻真理之光",
          "五行权重": [
            1,
            1,
            2,
            0,
            2
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "超越世俗，追求真理"
        }
      ]
    },
    {
      number: 26,
      title: "矛盾情境反应验证",
      question: "至亲好友因过失违法，私下求你帮忙隐瞒，你会？",
      options: [
        {
          letter: "A",
          text: "坚持原则，劝好友自首或向官府举报",
          "五行权重": [
            3,
            0,
            1,
            1,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "坚持原则，大义灭亲"
        },
        {
          letter: "B",
          text: "帮助好友度过难关，但同时严肃引导其改正错误",
          "五行权重": [
            1,
            3,
            1,
            1,
            0
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "帮助亲友，但引导其改正"
        },
        {
          letter: "C",
          text: "巧妙周旋，既不完全包庇也不直接举报，寻找两全之法",
          "五行权重": [
            0,
            1,
            3,
            1,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "巧妙周旋，寻求两全之策"
        },
        {
          letter: "D",
          text: "明确表示无法帮忙，置身事外避免卷入是非",
          "五行权重": [
            0,
            2,
            1,
            0,
            3
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "置身事外，避免卷入"
        }
      ]
    },
    {
      number: 27,
      title: "特质偏好确认验证",
      question: "你认为以下哪种描述最能体现你的为人处世之道？",
      options: [
        {
          letter: "A",
          text: "坚定果断，目标明确",
          "五行权重": [
            2,
            2,
            0,
            1,
            1
          ],
          "四维倾向文本": "出世+武+庙堂+守正",
          "原选项文本": "坚定果断，目标明确"
        },
        {
          letter: "B",
          text: "温和包容，善于协调",
          "五行权重": [
            1,
            3,
            1,
            1,
            0
          ],
          "四维倾向文本": "出世+文+江湖+守正",
          "原选项文本": "温和包容，善于协调"
        },
        {
          letter: "C",
          text: "灵活变通，适应力强",
          "五行权重": [
            0,
            1,
            3,
            1,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "灵活变通，适应力强"
        },
        {
          letter: "D",
          text: "沉稳务实，脚踏实地",
          "五行权重": [
            1,
            1,
            1,
            1,
            2
          ],
          "四维倾向文本": "入世+文+庙堂+守正",
          "原选项文本": "沉稳务实，脚踏实地"
        }
      ]
    },
    {
      number: 28,
      title: "情感表达方式",
      question: "当你内心有强烈情感（如喜悦或愤怒）时，你更偏好于如何表达？",
      options: [
        {
          letter: "A",
          text: "直接坦率地表达，不掩饰真情",
          "五行权重": [
            1,
            0,
            0,
            3,
            1
          ],
          "四维倾向文本": "入世+武+江湖+守正",
          "原选项文本": "直接坦率地表达，不掩饰真情"
        },
        {
          letter: "B",
          text: "委婉含蓄地表达，顾及他人感受",
          "五行权重": [
            0,
            1,
            3,
            0,
            1
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "委婉含蓄地表达，考虑他人感受"
        },
        {
          letter: "C",
          text: "通过实际行动展现，而非言语",
          "五行权重": [
            2,
            0,
            2,
            0,
            1
          ],
          "四维倾向文本": "出世+武+庙堂+守正",
          "原选项文本": "通过实际行动展现，而非言语"
        },
        {
          letter: "D",
          text: "自我消化，保持外在平静",
          "五行权重": [
            0,
            2,
            0,
            1,
            2
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "自我消化，保持外在平静"
        }
      ]
    },
    {
      number: 29,
      title: "面对变革的态度",
      question: "当周围环境发生重大变革时，你的第一反应是？",
      options: [
        {
          letter: "A",
          text: "积极适应，主动寻找新机会",
          "五行权重": [
            0,
            3,
            1,
            1,
            0
          ],
          "四维倾向文本": "入世+文+庙堂+权变",
          "原选项文本": "积极适应，主动寻找新机会"
        },
        {
          letter: "B",
          text: "坚守原则，以不变应万变",
          "五行权重": [
            3,
            0,
            0,
            1,
            1
          ],
          "四维倾向文本": "出世+武+江湖+守正",
          "原选项文本": "坚守原则，以不变应万变"
        },
        {
          letter: "C",
          text: "冷静观察，谨慎评估后再行动",
          "五行权重": [
            0,
            1,
            3,
            0,
            1
          ],
          "四维倾向文本": "出世+文+江湖+权变",
          "原选项文本": "冷静观察，谨慎评估后再行动"
        },
        {
          letter: "D",
          text: "引导变革，使其向好的方向发展",
          "五行权重": [
            1,
            0,
            0,
            3,
            1
          ],
          "四维倾向文本": "入世+武+庙堂+守正",
          "原选项文本": "引导变革，使其向好的方向发展"
        }
      ]
    }
  ];
  const updated_at = "2026-04-21";
  const update_note = "题目数据更新至v2.6定版，解决第1、28、29题五行权重差异";
  const rawDataV2 = {
    version,
    description,
    created_at,
    created_by,
    optimized_by,
    note,
    statistics,
    identities,
    questions,
    updated_at,
    update_note
  };
  function detectDataSource(data) {
    if (data.version && data.version.startsWith("v2")) {
      return {
        version: data.version || "v2.x",
        data
      };
    }
    if (data.identityTypes && Array.isArray(data.identityTypes)) {
      return {
        version: "v1.1",
        data
      };
    }
    return {
      version: "v1.1",
      data
    };
  }
  function convertWeightsCNtoEN(cnWeights) {
    return {
      metal: cnWeights.金 || 0,
      wood: cnWeights.木 || 0,
      water: cnWeights.水 || 0,
      fire: cnWeights.火 || 0,
      earth: cnWeights.土 || 0
    };
  }
  function convertWeightsArrayToEN(weightsArray) {
    return {
      metal: weightsArray[0] || 0,
      wood: weightsArray[1] || 0,
      water: weightsArray[2] || 0,
      fire: weightsArray[3] || 0,
      earth: weightsArray[4] || 0
    };
  }
  function normalizeWeights(weights) {
    if (!weights || weights.length !== 5) {
      return [0, 0, 0, 0, 0];
    }
    const sum = weights.reduce((total, weight) => total + weight, 0);
    if (sum === 0) {
      return weights;
    }
    if (sum === 5) {
      return weights;
    }
    if (sum === 6) {
      return weights;
    }
    const normalized = weights.map((weight) => weight / sum * 5);
    const rounded = normalized.map((val) => Math.round(val * 10) / 10);
    const roundedSum = rounded.reduce((total, weight) => total + weight, 0);
    const diff = 5 - roundedSum;
    if (Math.abs(diff) > 0.01) {
      let maxIndex = 0;
      let maxValue = 0;
      for (let i = 0; i < rounded.length; i++) {
        if (rounded[i] > maxValue) {
          maxValue = rounded[i];
          maxIndex = i;
        }
      }
      rounded[maxIndex] = Math.round((rounded[maxIndex] + diff) * 10) / 10;
    }
    return rounded;
  }
  function getDominantElementFromWeights(weights) {
    const elements = ["金", "木", "水", "火", "土"];
    let maxElement = "金";
    let maxWeight = 0;
    for (const element of elements) {
      if (weights[element] > maxWeight) {
        maxWeight = weights[element];
        maxElement = element;
      }
    }
    return ELEMENT_MAP[maxElement];
  }
  function getDominantElementFromArray(weights) {
    const elements = ["金", "木", "水", "火", "土"];
    let maxIndex = 0;
    let maxWeight = 0;
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] > maxWeight) {
        maxWeight = weights[i];
        maxIndex = i;
      }
    }
    return ELEMENT_MAP[elements[maxIndex]];
  }
  function convertOptionV1(dataOption, questionId, optionIndex) {
    return {
      id: `${questionId}-${optionIndex}`,
      text: dataOption.text,
      element: getDominantElementFromWeights(dataOption.weights),
      weights: convertWeightsCNtoEN(dataOption.weights)
    };
  }
  function convertOptionV2(dataOption, questionId, optionIndex) {
    const normalizedWeights = normalizeWeights(dataOption.五行权重);
    return {
      id: `${questionId}-${optionIndex}`,
      text: dataOption.text,
      element: getDominantElementFromArray(normalizedWeights),
      weights: convertWeightsArrayToEN(normalizedWeights),
      letter: dataOption.letter,
      fourDimensionText: dataOption.四维倾向文本,
      originalText: dataOption.原选项文本
    };
  }
  function convertIdentityV1(dataIdentity) {
    const code = dataIdentity.code;
    let element = "metal";
    if (code.startsWith("00")) {
      element = "metal";
    } else if (code.startsWith("01")) {
      element = "wood";
    } else if (code.startsWith("10")) {
      element = "water";
    } else if (code.startsWith("11")) {
      element = code[2] === "0" ? "fire" : "earth";
    }
    return {
      code: dataIdentity.code,
      name: dataIdentity.name,
      dimension: dataIdentity.dimension,
      description: dataIdentity.description,
      element,
      traits: dataIdentity.personality_traits || []
    };
  }
  function convertIdentityV2(dataIdentity) {
    return {
      id: dataIdentity.id,
      code: dataIdentity.code,
      name: dataIdentity.name,
      dimension: dataIdentity.category,
      // v2.0 中 category 对应 v1.1 的 dimension
      description: dataIdentity.core_description,
      element: ELEMENT_MAP[dataIdentity.element],
      traits: dataIdentity.personality_traits || [],
      category: dataIdentity.category,
      category_desc: dataIdentity.category_desc,
      element_desc: dataIdentity.element_desc,
      historical_figures: dataIdentity.historical_figures,
      core_description: dataIdentity.core_description,
      daily_practice: dataIdentity.daily_practice,
      self_cultivation: dataIdentity.self_cultivation,
      image_url: dataIdentity.image_url
    };
  }
  function loadDataV1(data) {
    const questions2 = data.questions.map((dataQuestion, index) => ({
      id: index + 1,
      text: dataQuestion.text,
      options: dataQuestion.options.map(
        (option, optionIndex) => convertOptionV1(option, index + 1, optionIndex)
      )
    }));
    const identities2 = data.identityTypes.map(
      (identity) => convertIdentityV1(identity)
    );
    return {
      questions: questions2,
      identities: identities2,
      metadata: data.metadata
    };
  }
  function loadDataV2(data) {
    const questions2 = data.questions.map((dataQuestion) => ({
      id: dataQuestion.number,
      text: dataQuestion.question,
      title: dataQuestion.title,
      number: dataQuestion.number,
      options: dataQuestion.options.map(
        (option, optionIndex) => convertOptionV2(option, dataQuestion.number, optionIndex)
      )
    }));
    const identities2 = data.identities.map(
      (identity) => convertIdentityV2(identity)
    );
    const metadata2 = {
      version: data.version,
      description: data.description,
      created_at: data.created_at,
      note: data.note
    };
    return {
      questions: questions2,
      identities: identities2,
      metadata: metadata2
    };
  }
  function loadData() {
    try {
      const v2Detection = detectDataSource(rawDataV2);
      if (v2Detection.version.startsWith("v2")) {
        console.log(`加载 ${v2Detection.version} 数据`);
        return loadDataV2(v2Detection.data);
      }
    } catch (error) {
      console.warn("v2.x 数据加载失败，回退到 v1.1", error);
    }
    const v1Detection = detectDataSource(rawDataV1);
    console.log("加载 v1.1 数据");
    return loadDataV1(v1Detection.data);
  }
  function getDataVersion() {
    var _a;
    try {
      const v2Detection = detectDataSource(rawDataV2);
      if (v2Detection.version.startsWith("v2")) {
        return rawDataV2.version || v2Detection.version;
      }
    } catch (error) {
    }
    return ((_a = rawDataV1.metadata) == null ? void 0 : _a.version) || "v1.1";
  }
  function getElementNameCN(element) {
    return ELEMENT_MAP_REVERSE[element];
  }
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
  function calculateDimensionCode(questions2, selectedOptions) {
    const dimensionCounts = Array(4).fill(0).map(() => ({ zero: 0, one: 0 }));
    for (let i = 0; i < questions2.length; i++) {
      const question = questions2[i];
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
  function determineIdentityV2(scores, dimensionCode, identities2) {
    const dominantElement = getDominantElement(scores);
    const dominantElementCN = ELEMENT_MAP_REVERSE[dominantElement];
    const targetId = `${dimensionCode}-${dominantElementCN}`;
    for (const identity of identities2) {
      if (identity.id === targetId) {
        return identity;
      }
    }
    const matchingByCode = identities2.filter(
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
    return determineIdentityV1(scores, identities2);
  }
  function calculateScores(questions2, selectedOptions) {
    const scores = {
      metal: 0,
      wood: 0,
      water: 0,
      fire: 0,
      earth: 0
    };
    for (let i = 0; i < questions2.length; i++) {
      const question = questions2[i];
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
  function determineIdentityV1(scores, identities2) {
    const dominantElement = getDominantElement(scores);
    const matchingIdentities = identities2.filter(
      (identity) => identity.element === dominantElement
    );
    if (matchingIdentities.length === 0) {
      return identities2[0];
    }
    return matchingIdentities[0];
  }
  function determineIdentityAuto(questions2, selectedOptions, identities2) {
    const hasFourDimensionData = questions2.some(
      (question) => question.options.some((option) => option.fourDimensionText)
    );
    if (hasFourDimensionData) {
      const scores = calculateScores(questions2, selectedOptions);
      const dimensionCode = calculateDimensionCode(questions2, selectedOptions);
      return determineIdentityV2(scores, dimensionCode, identities2);
    } else {
      const scores = calculateScores(questions2, selectedOptions);
      return determineIdentityV1(scores, identities2);
    }
  }
  const _hoisted_1$2 = { class: "quiz-container min-h-screen flex flex-col items-center relative overflow-hidden" };
  const _hoisted_2$2 = { class: "relative z-10 w-full max-w-[375px] min-h-screen flex flex-col px-4 py-4" };
  const _hoisted_3$2 = { class: "mb-5" };
  const _hoisted_4$2 = { class: "flex items-center justify-between" };
  const _hoisted_5$2 = { class: "text-sm text-gray-400 tracking-widest" };
  const _hoisted_6$2 = { class: "h-1.5 bg-gray-200 rounded-full overflow-hidden mt-4" };
  const _hoisted_7$1 = { class: "flex-1 mt-10" };
  const _hoisted_8$1 = { class: "mt-6" };
  const _hoisted_9$1 = { class: "flex justify-between items-center gap-4" };
  const _hoisted_10$1 = {
    key: 1,
    class: "flex-1"
  };
  const _hoisted_11$1 = { class: "mt-6" };
  const _hoisted_12$1 = { class: "group" };
  const _hoisted_13$1 = { class: "mt-4 pt-4 border-t border-gray-200/50" };
  const _hoisted_14$1 = { class: "grid grid-cols-7 gap-2" };
  const _hoisted_15$1 = ["onClick"];
  const _sfc_main$2 = /* @__PURE__ */ defineComponent({
    __name: "QuizView",
    setup(__props) {
      const router2 = useRouter();
      const baseUrl = "./";
      const { questions: loadedQuestions, identities: loadedIdentities } = loadData();
      /* @__PURE__ */ ref(getDataVersion());
      const questions2 = /* @__PURE__ */ ref(loadedQuestions);
      const identities2 = /* @__PURE__ */ ref(loadedIdentities);
      const currentIndex = /* @__PURE__ */ ref(0);
      const selectedOptions = /* @__PURE__ */ ref(Array(loadedQuestions.length).fill(-1));
      const isComplete = computed(() => currentIndex.value >= questions2.value.length);
      const currentQuestion = computed(() => questions2.value[currentIndex.value]);
      const handleSelect = (optionIndex) => {
        selectedOptions.value[currentIndex.value] = optionIndex;
        if (currentIndex.value < questions2.value.length - 1) {
          currentIndex.value++;
        } else {
          const identity = determineIdentityAuto(questions2.value, selectedOptions.value, identities2.value);
          const scores = calculateScores(questions2.value, selectedOptions.value);
          const scoresStr = `${scores.metal},${scores.wood},${scores.water},${scores.fire},${scores.earth}`;
          router2.push({
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
        console.log(`加载了 ${questions2.value.length} 道题目`);
        console.log(`加载了 ${identities2.value.length} 种身份类型`);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$2, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "absolute inset-0 bg-[#f8f9fa]" }, null, -1)),
          createBaseVNode("div", {
            class: "absolute inset-0 bg-center bg-cover opacity-40",
            style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/optimized_bg_3.png')` })
          }, null, 4),
          createBaseVNode("div", {
            class: "absolute inset-0 bg-center bg-cover opacity-60",
            style: normalizeStyle({ backgroundImage: `url('${unref(baseUrl)}images/light_bg_2.png')` })
          }, null, 4),
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("div", _hoisted_4$2, [
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "w-14" }, null, -1)),
                _cache[2] || (_cache[2] = createBaseVNode("h1", { class: "text-xl font-medium text-[#2c3e50] font-calligraphy title-extra-spacing" }, "寻古问心·照见本真", -1)),
                createBaseVNode("span", _hoisted_5$2, toDisplayString(currentIndex.value + 1) + "/" + toDisplayString(questions2.value.length), 1)
              ]),
              createBaseVNode("div", _hoisted_6$2, [
                createBaseVNode("div", {
                  class: "h-full bg-[#2c3e50] rounded-full transition-all duration-500 ease-out",
                  style: normalizeStyle({ width: `${(currentIndex.value + 1) / questions2.value.length * 100}%` })
                }, null, 4)
              ])
            ]),
            createBaseVNode("div", _hoisted_7$1, [
              currentQuestion.value ? (openBlock(), createBlock(QuestionCard, {
                key: 0,
                question: currentQuestion.value,
                "current-index": currentIndex.value,
                "selected-option": selectedOptions.value[currentIndex.value],
                onSelect: handleSelect,
                onGotoQuestion: handleGotoQuestion
              }, null, 8, ["question", "current-index", "selected-option"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_8$1, [
              createBaseVNode("div", _hoisted_9$1, [
                currentIndex.value > 0 ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: handlePrevious,
                  class: "flex-1 py-3 rounded-2xl text-base font-medium transition-all font-calligraphy tracking-widest btn-prev"
                }, " 上一题 ")) : (openBlock(), createElementBlock("div", _hoisted_10$1)),
                selectedOptions.value[currentIndex.value] >= 0 && currentIndex.value < questions2.value.length - 1 ? (openBlock(), createElementBlock("button", {
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
            createBaseVNode("div", _hoisted_11$1, [
              createBaseVNode("details", _hoisted_12$1, [
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
                createBaseVNode("div", _hoisted_13$1, [
                  createBaseVNode("div", _hoisted_14$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(questions2.value, (_, index) => {
                      return openBlock(), createElementBlock("button", {
                        key: index,
                        onClick: ($event) => handleGotoQuestion(index),
                        class: normalizeClass(["w-8 h-8 rounded-xl flex items-center justify-center text-xs font-medium transition-all tracking-widest nav-btn", [
                          index === currentIndex.value ? "bg-[#2c3e50] text-white" : selectedOptions.value[index] >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"
                        ]])
                      }, toDisplayString(index + 1), 11, _hoisted_15$1);
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
  const QuizView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e0bf6a3d"]]);
  const QuizView$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: QuizView
  }, Symbol.toStringTag, { value: "Module" }));
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
      const emit2 = __emit;
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
      const imageLoaded = /* @__PURE__ */ ref(false);
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
                    onClick: _cache[0] || (_cache[0] = ($event) => emit2("restart")),
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
                    onClick: _cache[1] || (_cache[1] = ($event) => emit2("share")),
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
                    onClick: _cache[2] || (_cache[2] = ($event) => emit2("view-analysis")),
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
                    onClick: _cache[3] || (_cache[3] = ($event) => emit2("jump-to-miniprogram")),
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
      const router2 = useRouter();
      const { identities: loadedIdentities } = loadData();
      const dataVersion = /* @__PURE__ */ ref(getDataVersion());
      const identity = /* @__PURE__ */ ref(null);
      const elementScores = /* @__PURE__ */ ref(null);
      const isJumping = /* @__PURE__ */ ref(false);
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
          router2.push("/quiz");
        }
      });
      const handleRestart = () => {
        router2.push("/quiz");
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
  const ResultView$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: ResultView
  }, Symbol.toStringTag, { value: "Module" }));
})();
//# sourceMappingURL=index-Cpy6u-vS.js.map
