/**
 * This mock is to fix the issue with the app element not being
 * available in Jest. Solution taken from closed github issue.
 * See -> https://github.com/reactjs/react-modal/issues/632#issuecomment-552919388
 */
const Modal = require('react-modal');

const oldFn = Modal.setAppElement;
Modal.setAppElement = (element) => {
  if (element === '#__next') {
    // otherwise it will throw aria warnings.
    return oldFn(document.createElement('div'));
  }
  oldFn(element);
};
module.exports = Modal;
