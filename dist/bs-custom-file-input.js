/*!
 * bsCustomFileInput v1.1.1 (https://github.com/Johann-S/bs-custom-file-input)
 * Copyright 2018 Johann-S <johann.servoire@gmail.com>
 * Licensed under MIT (https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.bsCustomFileInput = factory());
}(this, (function () { 'use strict';

  (function () {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector;
    }
  })();

  var Selector = {
    CUSTOMFILE: '.custom-file input[type="file"]',
    CUSTOMFILELABEL: '.custom-file-label',
    FORM: 'form'
  };

  var getDefaultText = function getDefaultText(input) {
    var defaultText = '';
    var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

    if (label) {
      defaultText = label.innerHTML;
    }

    return defaultText;
  };

  var restoreDefaultText = function restoreDefaultText(input) {
    var defaultText = input.bsCustomFileInput.defaultText;
    var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

    if (label) {
      label.innerHTML = defaultText;
    }
  };

  var customProperty = 'bsCustomFileInput';

  var fileApi = !!window.File;

  var getSelectedFiles = function getSelectedFiles(input) {
    if (input.hasAttribute('multiple') && fileApi) {
      var files = [].slice.call(input.files).map(function (file) {
        return file.name;
      });
      return files.join(', ');
    } else {
      return input.value;
    }
  };

  function handleInputChange(e) {
    var input = e.target;

    if (input && input.matches(Selector.CUSTOMFILE)) {
      if (!input.hasOwnProperty(customProperty)) {
        Object.defineProperty(input, customProperty, {
          value: {
            defaultText: getDefaultText(input)
          },
          writable: true
        });
      }

      var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

      if (label) {
        label.innerHTML = getSelectedFiles(input);
      }
    }
  }

  function handleFormReset() {
    var customFileList = [].slice.call(this.querySelectorAll(Selector.CUSTOMFILE));

    for (var i = 0, len = customFileList.length; i < len; i++) {
      restoreDefaultText(customFileList[i]);
    }
  }

  var Event = {
    FORMRESET: 'reset',
    INPUTCHANGE: 'change',
    INPUTFOCUSIN: 'focusin',
    INPUTFOCUSOUT: 'focusout'
  };
  var bsCustomFileInput = {
    init: function init(inputSelector, formSelector) {
      if (inputSelector === void 0) {
        inputSelector = Selector.CUSTOMFILE;
      }

      if (formSelector === void 0) {
        formSelector = Selector.FORM;
      }

      Selector.CUSTOMFILE = inputSelector;
      Selector.FORM = formSelector;
      document.addEventListener(Event.INPUTCHANGE, handleInputChange);
      var formList = [].slice.call(document.querySelectorAll(Selector.FORM));

      for (var i = 0, len = formList.length; i < len; i++) {
        formList[i].addEventListener(Event.FORMRESET, handleFormReset);
      }
    },
    destroy: function destroy() {
      var formList = [].slice.call(document.querySelectorAll(Selector.FORM));
      var customFileInputList = [].slice.call(document.querySelectorAll(Selector.CUSTOMFILE)).filter(function (input) {
        return !!input.bsCustomFileInput;
      });

      for (var i = 0, len = customFileInputList.length; i < len; i++) {
        var input = customFileInputList[i];
        restoreDefaultText(input);
        input[customProperty] = undefined;
        document.removeEventListener(Event.INPUTCHANGE, handleInputChange);
      }

      for (var _i = 0, _len = formList.length; _i < _len; _i++) {
        formList[_i].removeEventListener(Event.FORMRESET, handleFormReset);
      }
    }
  };

  return bsCustomFileInput;

})));
//# sourceMappingURL=bs-custom-file-input.js.map
