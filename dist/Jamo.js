
/*
 *   Utility to teardown and assembly Ja/Mo
 *
 *   @see [Hangul Syllables(AC00–D7AF)](http://www.unicode.org/charts/PDF/UAC00.pdf)
 */

(function() {
  (exports || window).Jamo = {
    INITIAL: ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
    MIDIAL: ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"],
    FINIAL: ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
    teardown: function(string) {
      var char, code, head, mid, tail, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = string.length; _i < _len; _i++) {
        char = string[_i];
        if (!this.isHangul(char)) {
          _results.push(char);
        } else {
          code = char.charCodeAt(0) - 0xAC00;
          tail = code % 28;
          mid = (code - tail) / 28 % 21;
          head = (((code - tail) / 28) - mid) / 21;
          _results.push([head, mid, tail]);
        }
      }
      return _results;
    },
    assembly: function(array) {
      return array.map(function(jamo) {
        if (!Array.isArray(jamo)) {
          return jamo;
        }
        return String.fromCharCode(jamo[0] * 21 * 28 + jamo[1] * 28 + jamo[2] + 0xAC00);
      });
    },
    isHangul: function(char) {
      var code;
      code = char.charCodeAt(0);
      return 0xAC00 <= code && code <= 0xD7A3;
    }
  };

}).call(this);
