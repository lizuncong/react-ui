const startEvents = ['transitionstart', 'animationstart'];
const endEvents = ['transitionend', 'animationend'];

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

const test = {};
console.log('test.a...', test.a);
if (test.a) {
  test.a();
}
test.a = () => {
  console.log('test....');
};
const TransitionEvents = {
  // Start events
  startEvents,

  addStartEventListener: function addStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      window.setTimeout(eventListener, 0);
      return;
    }
    startEvents.forEach((startEvent) => {
      addEventListener(node, startEvent, eventListener);
    });
  },
  removeStartEventListener: function removeStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      return;
    }
    startEvents.forEach((startEvent) => {
      removeEventListener(node, startEvent, eventListener);
    });
  },

  // End events
  endEvents,

  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach((endEvent) => {
      addEventListener(node, endEvent, eventListener);
    });
  },
  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach((endEvent) => {
      removeEventListener(node, endEvent, eventListener);
    });
  },
};

export default TransitionEvents;
