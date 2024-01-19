function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [el],
    },
  };
  nextWorkOfUnit = wipRoot;
}
let wipRoot = null;
let currentRoot = null;
let deletions = [];

function update(el, container) {
  wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
  };
  nextWorkOfUnit = wipRoot;
  console.log(wipRoot);
}

let nextWorkOfUnit = null;
function workLoop(deadline) {
  console.log("workLoop");
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);

    shouldYield = deadline.timeRemaining() < 1;

    if (!nextWorkOfUnit && wipRoot) {
      commitRoot();
    }
  }
  requestIdleCallback(workLoop);
}

// 统一提交
function commitRoot() {
  deletions.forEach(commitDeletion);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

const commitDeletion = (fiber) => {
  if (fiber.dom) {
    let fiberParent = fiber.parent;
    while (!fiberParent.dom) {
      fiberParent = fiberParent.parent;
    }
    fiber.parent.dom.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child);
  }
};

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.effectTag === "PLACEMENT") {
    if (fiber.dom) {
      fiberParent.dom.append(fiber.dom);
    }
  } else if (fiber.effectTag === "UPDATE") {
    console.log("UPDATE");
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}
function updateProps(dom, nextProps, prevProps = {}) {
  // Object.keys(nextProps).forEach((key) => {
  //   if (key !== "children") {
  //     // 事件
  //     if (key.startsWith("on")) {
  //       const eventType = key.toLowerCase().substring(2);
  //       dom.addEventListener(eventType, nextProps[key]);
  //     } else {
  //       dom[key] = nextProps[key];
  //     }
  //   }
  // });
  // 1 old 有 new 没有
  Object.keys(prevProps)
    .filter((key) => key !== "children")
    .forEach((key) => {
      if (!(key in nextProps)) {
        // dom[key] = "";
        dom.removeAttribute(key);
      }
    });
  // 2 new 有 old 没有 .filter((key) => key !== "children")
  Object.keys(nextProps).forEach((key) => {
    if (key !== "children") {
      if (prevProps[key] !== nextProps[key]) {
        if (key.startsWith("on")) {
          const eventType = key.toLowerCase().substring(2);

          dom.removeEventListener(eventType, prevProps[key]);
          dom.addEventListener(eventType, nextProps[key]);
        } else {
          dom[key] = nextProps[key];
        }
      }
    }
  });
}
function reconcileChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child;
  let prevChild = null;
  children.forEach((child, index) => {
    const isSameType = oldFiber && child.type === oldFiber.type;
    let newWork = null;
    if (isSameType) {
      newWork = {
        type: child.type,
        child: null,
        sibling: null,
        parent: fiber,
        props: child.props,
        dom: oldFiber.dom,
        effectTag: "UPDATE",
        alternate: oldFiber,
      };
    } else {
      newWork = {
        type: child.type,
        child: null,
        sibling: null,
        parent: fiber,
        props: child.props,
        dom: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber) {
      deletions.push(oldFiber);
      // oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      fiber.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });
}

// fc
function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

// host
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber.type);
  }
  updateProps(fiber.dom, fiber.props);
  reconcileChildren(fiber, fiber.props.children);
}
function performUnitOfWork(fiber) {
  // is function
  const isFunctionCommponent = typeof fiber.type === "function";
  // 1 DOM
  if (isFunctionCommponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 4 返回下一个任务
  if (fiber.child) {
    return fiber.child;
  }
  // if (work.sibling) {
  //   return work.sibling;
  // }
  // return work.parent.sibling;
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    } else {
      nextFiber = nextFiber.parent;
    }
  }
}

requestIdleCallback(workLoop);
const React = {
  createElement,
  render,
  update,
};
export default React;
