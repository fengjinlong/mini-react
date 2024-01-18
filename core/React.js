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
        console.log("hhhh", child);
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
  root = nextWorkOfUnit;
}
let root = null;

let nextWorkOfUnit = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    // console.log("workLoop while");
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);

    shouldYield = deadline.timeRemaining() < 1;

    if (!nextWorkOfUnit && root) {
      commitRoot();
    }
    if (!shouldYield) {
      requestIdleCallback(workLoop);
    }
  }
}

// 统一提交
function commitRoot() {
  console.log("commitRoot");
  commitWork(root.child);
}
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.dom) {
    console.log("commitWork", fiber.dom);
    fiberParent.dom.append(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}
function updateProps(dom, props) {
  // console.log("updateProps", props);
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}
function initChildren(fiber, children) {
  let prevChild = null;
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      child: null,
      sibling: null,
      parent: fiber,
      props: child.props,
      dom: null,
    };
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
  initChildren(fiber, children);
}

// host
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber.type);
  }
  updateProps(fiber.dom, fiber.props);
  initChildren(fiber, fiber.props.children);
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
};
export default React;
