(function() {
  var Jamo, TypeWriter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeWriter = require('./TypeWriter').TypeWriter;

  Jamo = require('./Jamo').Jamo;


  /*
   *				Hangul TypeWriter
   */

  (exports || window).HangulTypeWriter = (function(_super) {
    __extends(HangulTypeWriter, _super);

    function HangulTypeWriter() {
      var Type;
      HangulTypeWriter.__super__.constructor.apply(this, arguments);
      this.string = Jamo.teardown(this.string);
      Type = {
        None: 0,
        Initial: 1,
        Midial: 2,
        Final: 3
      };
      this.flatten = this.string.reduce(function(pre, cur) {
        if (Array.isArray(cur)) {
          pre.push({
            char: cur[0],
            type: Type.Initial,
            origin: cur
          });
          pre.push({
            char: cur[1],
            type: Type.Midial,
            origin: cur
          });
          if (cur[2] !== 0) {
            pre.push({
              char: cur[2],
              type: Type.Final,
              origin: cur
            });
          }
        } else {
          if (cur.charCodeAt(0) === 10) {
            cur = '<br>';
          }
          pre.push({
            char: cur,
            type: Type.None
          });
        }
        return pre;
      }, []);
    }

    HangulTypeWriter.prototype._get = function(backward) {
      var str;
      if (backward == null) {
        backward = false;
      }
      str = HangulTypeWriter.__super__._get.call(this);
      if (backward) {
        str = str.substring(0, str.length - 1);
      }
      return str;
    };

    HangulTypeWriter.prototype._type = function() {
      var chars, morpheme, str;
      if (this._offset >= this.flatten.length) {
        return;
      }
      morpheme = this.flatten[this._offset++];
      if (morpheme.type > 1) {
        chars = morpheme.origin.slice(0, morpheme.type);
        chars.push(0);
        str = this._get(true) + Jamo.assembly([chars]);
      } else if (morpheme.type === 1) {
        str = this._get();
        str += Jamo.INITIAL[morpheme.char];
      } else {
        str = this._get();
        str += morpheme.char;
      }
      this._set(str);
      return this._runner = setTimeout(this._type, this.delayFn());
    };

    return HangulTypeWriter;

  })(TypeWriter);

}).call(this);
