const textEquals = (el, text) =>
  el?.innerText?.trim().toLowerCase() === text.toLowerCase();

const setStyle = (el, styles) => {
  if (!el) return;

  for (const [key, value] of Object.entries(styles)) {
    el.style.setProperty(key, value, "important");
  }
};

const getAncestorsUntil = (node, stopNode) => {
  const ancestors = [];
  let current = node?.parentElement;

  while (current && current !== stopNode) {
    ancestors.push(current);
    current = current.parentElement;
  }

  return ancestors;
};

const findTopChildContaining = (node, stopNode) => {
  let current = node;

  while (current?.parentElement && current.parentElement !== stopNode) {
    current = current.parentElement;
  }

  return current;
};

const findExistingScrollContainer = (node, stopNode) => {
  const ancestors = getAncestorsUntil(node, stopNode);

  return ancestors.find((el) => {
    const style = getComputedStyle(el);
    return (
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflow === "auto" ||
      style.overflow === "scroll"
    );
  });
};

const resizeDialog = () => {
  const dialog = Array.from(document.querySelectorAll(`[role="dialog"]`)).find(
    (d) =>
      Array.from(d.querySelectorAll(`h2 span, span`)).some((s) =>
        textEquals(s, `add to album`),
      ),
  );

  if (!dialog) return;

  const dialogContent = Array.from(dialog.children).find((n) =>
    n.querySelector(`form`),
  );

  const dialogForm = dialogContent?.querySelector(`form`);

  if (!dialogContent || !dialogForm) return;

  const imageList = dialog.querySelector(`[role="list"]`);
  const addButton = dialog.querySelector(
    `[role="button"][aria-label="Add to Album"]`,
  );

  if (!imageList || !addButton) return;

  const existingScrollContainer = findExistingScrollContainer(
    imageList,
    dialogContent,
  );

  const fallbackScrollContainer =
    findTopChildContaining(imageList, dialogForm) || imageList.parentElement;

  const scrollableArea = existingScrollContainer || fallbackScrollContainer;

  const actionsContainer =
    addButton.closest(`[class]`)?.parentElement?.parentElement ||
    addButton.parentElement ||
    addButton;

  setStyle(document.documentElement, {
    overflow: `hidden`,
  });

  setStyle(document.body, {
    overflow: `hidden`,
  });

  setStyle(dialog, {
    position: `fixed`,
    inset: `0`,
    width: `100vw`,
    height: `100vh`,
    maxWidth: `none`,
    maxHeight: `none`,
    overflow: `hidden`,
  });

  setStyle(dialogContent, {
    position: `fixed`,
    inset: `0`,
    width: `100vw`,
    height: `100vh`,
    maxWidth: `none`,
    maxHeight: `none`,
    overflow: `hidden`,
  });

  setStyle(dialogForm, {
    height: `100%`,
    minHeight: `0`,
    maxHeight: `none`,
    overflow: `visible`,
  });

  // Expand only the wrappers INSIDE the scroll container.
  // Do not overwrite the scroll container's own overflow behavior.
  let parent = imageList.parentElement;

  while (parent && parent !== scrollableArea && parent !== dialogContent) {
    setStyle(parent, {
      position: `relative`,
      height: `auto`,
      minHeight: `0`,
      maxHeight: `none`,
      width: `100%`,
      maxWidth: `none`,
      overflow: `visible`,
    });

    parent = parent.parentElement;
  }

  setStyle(imageList, {
    height: `auto`,
    minHeight: `0`,
    maxHeight: `none`,
    alignContent: `flex-start`,
  });

  // Resize Facebook's actual scroll container, not a guessed wrapper.
  setStyle(scrollableArea, {
    position: `fixed`,
    top: `60px`,
    left: `8px`,
    right: `8px`,
    bottom: `73px`,
    height: `auto`,
    minHeight: `0`,
    maxHeight: `none`,
    width: `auto`,
    maxWidth: `none`,
    overflowY: `scroll`,
    overflowX: `hidden`,
    overscrollBehavior: `contain`,
    pointerEvents: `auto`,
    zIndex: `999998`,
  });

  setStyle(actionsContainer, {
    position: `fixed`,
    left: `0`,
    right: `0`,
    bottom: `0`,
    zIndex: `999999`,
  });
};

setInterval(() => {
  try {
    resizeDialog();
  } catch (err) {
    console.error(`[Facebook Album Arranger] resize failed`, err);
  }
}, 1000);
