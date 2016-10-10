var ieDetector = {
  ieVersion: null,
  getVersion: function() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    return false;
  },
  addClasses: function() {
    var addClass = function(className) {
      if (document.documentElement.classList) {
        document.documentElement.classList.add(className);
      }
      else {
        document.documentElement.className += ' ' + className;
      }
    };
    addClass('ie-' + this.ieVersion);
    addClass('lte-ie-' + this.ieVersion);
    for(var i = this.ieVersion+1; i <= 11; i++) {
      addClass('lt-ie-' + i);
    }
  },
  init: function() {
    this.ieVersion = this.getVersion();
    if(this.ieVersion) {
      this.addClasses();
    }
  }
};
ieDetector.init();