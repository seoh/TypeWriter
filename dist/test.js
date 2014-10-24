(function() {
  var HangulTypeWriter, TypeWriter, log, str, type;

  TypeWriter = require('./TypeWriter');

  HangulTypeWriter = require('./HangulTypeWriter').HangulTypeWriter;

  str = "";

  log = function() {
    if (arguments.length > 0) {
      str = arguments[0];
      return console.log(str);
    } else {
      return str;
    }
  };

  type = new HangulTypeWriter("삼 겹살a b", log);

  type.start();

}).call(this);
