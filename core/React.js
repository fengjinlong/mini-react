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
  console.log("hhhh");
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "string" ? createTextNode(child) : child
      ),
    },
  };
}

function render(el, container) {
  console.log("render");
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
  // const dom =
  //   el.type === "TEXT_ELEMENT"
  //     ? document.createTextNode("")
  //     : document.createElement(el.type);
  // Object.keys(el.props).forEach((key) => {
  //   if (key !== "children") {
  //     dom[key] = el.props[key];
  //   }
  // });
  // const children = el.props.children || [];
  // children.forEach((child) => render(child, dom));
  // container.append(dom);
}

let nextWorkOfUnit = null;
function workLoop(deadline) {
  console.log("workLoop");

  let shouldYield = false;
  console.log(nextWorkOfUnit);
  while (!shouldYield && nextWorkOfUnit) {
    console.log("workLoop while");
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);

    shouldYield = deadline.timeRemaining() < 1;
    if (!shouldYield) {
      requestIdleCallback(workLoop);
    }
  }
}

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}
function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}
/**
 *
 * @param {1111} work 最初是根容器 和 el
 */
function performUnitOfWork(work) {
  // 1 DOM
  if (!work.dom) {
    const dom = (work.dom = createDom(work.type));
    work.parent.dom.append(dom);

    // 2 props
    updateProps(dom, work.props);
  }
  // 3 链表
  let prevChild = null;
  const children = work.props.children || [];
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      child: null,
      sibling: null,
      parent: work,
      props: child.props,
      dom: null,
    };
    if (index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });
  // 4 返回下一个任务
  if (work.child) {
    return work.child;
  }
  if (work.sibling) {
    return work.sibling;
  }
  return work.parent.sibling;
}

console.log("react-----");
requestIdleCallback(workLoop);

const React = {
  createElement,
  render,
};
export default React;
