var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// ../../node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "../../node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// ../../node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "../../node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "../../node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate2(uuid2) {
      return typeof uuid2 === "string" && _regex.default.test(uuid2);
    }
    var _default = validate2;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify2(arr, offset = 0) {
      const uuid2 = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid2;
    }
    var _default = stringify2;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "../../node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v12(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v12;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "../../node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse2(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse2;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "../../node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL;
    function _default(name, version2, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version2;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL;
      return generateUUID;
    }
  }
});

// ../../node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "../../node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "../../node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v32 = (0, _v.default)("v3", 48, _md.default);
    var _default = v32;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "../../node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v42(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v42;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "../../node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "../../node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v52 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v52;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "../../node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "../../node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version2(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid2.substr(14, 1), 16);
    }
    var _default = version2;
    exports.default = _default;
  }
});

// ../../node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// ../../node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../../node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path2 = require("path");
    var os = require("os");
    function log(message) {
      console.log(`[dotenv][DEBUG] ${message}`);
    }
    var NEWLINE = "\n";
    var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*("[^"]*"|'[^']*'|.*?)(\s+#.*)?$/;
    var RE_NEWLINES = /\\n/g;
    var NEWLINES_MATCH = /\r\n|\n|\r/;
    function parse2(src, options) {
      const debug = Boolean(options && options.debug);
      const multiline = Boolean(options && options.multiline);
      const obj = {};
      const lines = src.toString().split(NEWLINES_MATCH);
      for (let idx = 0; idx < lines.length; idx++) {
        let line = lines[idx];
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        if (keyValueArr != null) {
          const key = keyValueArr[1];
          let val = keyValueArr[2] || "";
          let end = val.length - 1;
          const isDoubleQuoted = val[0] === '"' && val[end] === '"';
          const isSingleQuoted = val[0] === "'" && val[end] === "'";
          const isMultilineDoubleQuoted = val[0] === '"' && val[end] !== '"';
          const isMultilineSingleQuoted = val[0] === "'" && val[end] !== "'";
          if (multiline && (isMultilineDoubleQuoted || isMultilineSingleQuoted)) {
            const quoteChar = isMultilineDoubleQuoted ? '"' : "'";
            val = val.substring(1);
            while (idx++ < lines.length - 1) {
              line = lines[idx];
              end = line.length - 1;
              if (line[end] === quoteChar) {
                val += NEWLINE + line.substring(0, end);
                break;
              }
              val += NEWLINE + line;
            }
          } else if (isSingleQuoted || isDoubleQuoted) {
            val = val.substring(1, end);
            if (isDoubleQuoted) {
              val = val.replace(RE_NEWLINES, NEWLINE);
            }
          } else {
            val = val.trim();
          }
          obj[key] = val;
        } else if (debug) {
          const trimmedLine = line.trim();
          if (trimmedLine.length && trimmedLine[0] !== "#") {
            log(`Failed to match key and value when parsing line ${idx + 1}: ${line}`);
          }
        }
      }
      return obj;
    }
    function resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config2(options) {
      let dotenvPath = path2.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const multiline = Boolean(options && options.multiline);
      if (options) {
        if (options.path != null) {
          dotenvPath = resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }), { debug, multiline });
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config: config2,
      parse: parse2
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// src/App.ts
__export(exports, {
  App: () => App
});

// src/domain/gateways/ia/IAServiceTest.ts
var IAServiceTest = class {
  async generate(input) {
    return ["hello"];
  }
};

// src/domain/gateways/mail/MailServiceTest.ts
var MailServiceTest = class {
  async sendToken(to, url) {
  }
};

// src/domain/register/tests/LeadRepositoryTest.ts
var LeadRepositoryTest = class {
  constructor() {
    this._leads = new Map();
  }
  async getByEmail(email) {
    return this._leads.get(email);
  }
  async getByToken(token) {
    return Array.from(this._leads.values()).find((lead) => lead.token === token);
  }
  async upsertLead(lead) {
    this._leads.set(lead.email, lead);
  }
  async saveNewGeneration(lead) {
    this._leads.set(lead.email, __spreadProps(__spreadValues({}, lead), {
      lastGeneration: new Date().valueOf(),
      generationCount: lead.generationCount + 1
    }));
  }
  setCreatedDatetoYesterday(email, ask) {
    const lead = this._leads.get(email);
    if (lead) {
      lead.validTokenUntil = new Date().valueOf() - ask * 24 * 60 * 60 * 1e3;
    }
  }
  setLastGenerationBackTo(lead, back) {
    lead.lastGeneration = new Date().valueOf() - back;
  }
};

// ../../node_modules/uuid/wrapper.mjs
var import_dist = __toModule(require_dist());
var v1 = import_dist.default.v1;
var v3 = import_dist.default.v3;
var v4 = import_dist.default.v4;
var v5 = import_dist.default.v5;
var NIL = import_dist.default.NIL;
var version = import_dist.default.version;
var validate = import_dist.default.validate;
var stringify = import_dist.default.stringify;
var parse = import_dist.default.parse;

// src/domain/register/models/Lead.ts
function makeNewLead(email, tokenDuration) {
  return {
    email,
    createdAt: new Date().valueOf(),
    validTokenUntil: new Date().valueOf() + tokenDuration,
    token: v4(),
    asksForToken: 1,
    generationCount: 0
  };
}
function newAsk(lead, tokenDuration) {
  return __spreadProps(__spreadValues({}, lead), {
    generationCount: 0,
    asksForToken: lead.asksForToken + 1,
    validTokenUntil: new Date().valueOf() + tokenDuration,
    token: v4()
  });
}
function isValidToken(lead) {
  return lead.validTokenUntil > new Date().valueOf();
}
function tooFrequentGeneration(lead, intervallInMs) {
  return lead.lastGeneration && lead.lastGeneration + intervallInMs > new Date().valueOf();
}
function tooManyGeneration(lead, nbMax) {
  return lead.generationCount && lead.generationCount >= nbMax;
}

// src/domain/register/services/addLeadAndsendToken.ts
async function addLeadAndsendToken(lead, mailService, leadRepository) {
  await leadRepository.upsertLead(lead);
  const url = process.env.URL_GENERATION_PAGE;
  if (!url)
    throw new Error("URL_GENERATION_PAGE is not set");
  await mailService.sendToken(lead.email, `${url}/${lead.token}`);
  return { status: "success", token: lead.token };
}

// src/domain/register/usecases/getAToken.ts
var TOKEN_DURATION = 1e3 * 60 * 60 * 24;
async function getAToken(params, dependencies2) {
  const lead = await dependencies2.leadRepository.getByEmail(params.email);
  if (lead) {
    if (isValidToken(lead)) {
      return addLeadAndsendToken(lead, dependencies2.mailService, dependencies2.leadRepository);
    }
    return addLeadAndsendToken(newAsk(lead, TOKEN_DURATION), dependencies2.mailService, dependencies2.leadRepository);
  } else {
    const newLead = makeNewLead(params.email, TOKEN_DURATION);
    return addLeadAndsendToken(newLead, dependencies2.mailService, dependencies2.leadRepository);
  }
}

// src/domain/textgen/models/postSentence.ts
var postSentences = {
  shop_name: "Ma boutique s'appelle : ",
  gift: "Le cadeau qui ferait plaisir serait "
};
function isValidContext(context) {
  return context in postSentences;
}
function getPostSentence(context) {
  if (isValidContext(context)) {
    return postSentences[context];
  }
  return "";
}

// src/domain/textgen/usecases/textGen.ts
var MIN_DELAY_BETWWEEN_EACH_GENERATION = parseInt(process.env.MIN_DELAY_BETWWEEN_EACH_GENERATION || "0") || 1e3 * 10;
var MAX_DAILY_NB_GENERATION = parseInt(process.env.MAX_DAILY_NB_GENERATION || "0") || 10;
async function textGen(params, dependencies2) {
  const lead = await dependencies2.leadRepository.getByToken(params.token);
  if (lead && isValidToken(lead) && isValidContext(params.context)) {
    if (tooFrequentGeneration(lead, MIN_DELAY_BETWWEEN_EACH_GENERATION)) {
      return {
        status: "error",
        message: `Wait ${MIN_DELAY_BETWWEEN_EACH_GENERATION / 1e3} seconds between each IA generation`
      };
    }
    if (tooManyGeneration(lead, MAX_DAILY_NB_GENERATION)) {
      return {
        status: "error",
        message: `No more than ${MAX_DAILY_NB_GENERATION} IA generation each day`
      };
    }
    const generatedText = await dependencies2.iaService.generate(params.input + ". " + getPostSentence(params.context));
    await dependencies2.leadRepository.saveNewGeneration(lead);
    if (generatedText.length > 0) {
      return { status: "success", results: generatedText };
    } else {
      return { status: "error", message: "IA model did not generate anything" };
    }
  }
  return { status: "error", message: "token not found" };
}

// src/App.ts
var dotenv = __toModule(require_main());
var path = require("path");
dotenv.config({
  debug: true,
  path: path.resolve(process.cwd(), ".env")
});
var dependencies = {
  mailService: new MailServiceTest(),
  leadRepository: new LeadRepositoryTest(),
  iaService: new IAServiceTest()
};
var App = {
  getAToken: async (params) => getAToken(params, dependencies),
  textGen: async (params) => textGen(params, dependencies)
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App
});
