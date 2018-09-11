import './polyfill'
import {customProperty, restoreDefaultText} from './util'
import {
  handleFormReset,
  handleInputChange,
} from './eventHandlers'
import Selector from './selector'

const Event = {
  FORMRESET     : 'reset',
  INPUTCHANGE   : 'change',
  INPUTFOCUSIN  : 'focusin',
  INPUTFOCUSOUT : 'focusout',
}

const bsCustomFileInput = {
  init(inputSelector = Selector.CUSTOMFILE, formSelector = Selector.FORM) {
    Selector.CUSTOMFILE = inputSelector
    Selector.FORM = formSelector
    document.addEventListener(Event.INPUTCHANGE,handleInputChange)

    const formList = [].slice.call(document.querySelectorAll(Selector.FORM))

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].addEventListener(Event.FORMRESET, handleFormReset)
    }
  },

  destroy() {
    const formList = [].slice.call(document.querySelectorAll(Selector.FORM))
    const customFileInputList = [].slice.call(document.querySelectorAll(Selector.CUSTOMFILE))
      .filter((input) => !!input.bsCustomFileInput)

    for (let i = 0, len = customFileInputList.length; i < len; i++) {
      const input = customFileInputList[i]

      restoreDefaultText(input)
      input[customProperty] = undefined

      document.removeEventListener(Event.INPUTCHANGE, handleInputChange)
    }

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].removeEventListener(Event.FORMRESET, handleFormReset)
    }
  },
}

export default bsCustomFileInput
