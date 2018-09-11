import {customProperty, getDefaultText, restoreDefaultText} from './util'
import Selector from './selector'

const fileApi = !!window.File



const getSelectedFiles = (input) => {
  if (input.hasAttribute('multiple') && fileApi) {
    const files = [].slice.call(input.files)
      .map((file) => file.name)

    return files.join(', ')
  } else {
    return input.value
  }
}

function handleInputChange(e) {
  const input = e.target
  if(input && input.matches(Selector.CUSTOMFILE)) {
    if (!input.hasOwnProperty(customProperty)) {
      Object.defineProperty(input, customProperty, {
        value: {
          defaultText: getDefaultText(input),
        },
        writable: true,
      })
    }
    const label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL)

    if (label) {
      label.innerHTML = getSelectedFiles(input)
    }
  }
}

function handleFormReset() {
  const customFileList = [].slice.call(this.querySelectorAll(Selector.CUSTOMFILE))

  for (let i = 0, len = customFileList.length; i < len; i++) {
    restoreDefaultText(customFileList[i])
  }
}

export {
  handleInputChange,
  handleFormReset,
}
