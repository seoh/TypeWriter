(function() {
  (exports || window).TypeWriter = (function() {
    function TypeWriter(string, target, delayFn) {
      this.string = string;
      this.target = target;
      this.delayFn = delayFn;
      if (this.delayFn == null) {
        this.delayFn = function() {
          return Math.random() * (500 - 250) + 250;
        };
      }
    }

    TypeWriter.prototype._get = function() {
      var str;
      if (typeof window !== "undefined" && window !== null ? window.Framer : void 0) {
        return str = this.target.html;
      } else if ((typeof HTMLElement !== "undefined" && HTMLElement !== null) && this.target instanceof HTMLElement) {
        return str = this.target.innerHTML;
      } else if (typeof this.target === "function") {
        return str = this.target();
      } else {
        return str = this.target;
      }
    };

    TypeWriter.prototype._set = function(string) {
      if (typeof window !== "undefined" && window !== null ? window.Framer : void 0) {
        return this.target.html = string;
      } else if (this.target instanceof HTMLElement) {
        return this.target.innerHTML = string;
      } else if (typeof this.target === "function") {
        return this.target(string);
      } else {
        return this.target = string;
      }
    };

    TypeWriter.prototype._type = function() {
      var morpheme;
      if (this._offset >= this.string.length) {
        return;
      }
      morpheme = this.string[this._offset++];
      this._set(this._get() + morpheme);
      return this._runner = setTimeout(this._type, this.delayFn());
    };

    TypeWriter.prototype.start = function() {
      this._offset = 0;
      this._type = this._type.bind(this);
      return this.resume();
    };

    TypeWriter.prototype.stop = function() {
      return clearTimeout(this._runner);
    };

    TypeWriter.prototype.resume = function() {
      return this._runner = setTimeout(this._type, this.delayFn());
    };

    return TypeWriter;

  })();

  exports.TypeWriter.prototype.pause = exports.TypeWriter.prototype.stop;

}).call(this);
