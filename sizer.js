const DIALOG_CONTAINER_SELECTOR = `.x1qjc9v5.x9f619.x78zum5.xdt5ytf.xl56j7k.x1c4vz4f.xg6iff7`;

const resizeDialog = () => {
  const dialog = Array.from(document.querySelectorAll(`[role="dialog"]`)).find(
    (d) =>
      Array.from(d.querySelectorAll(`span`)).find(
        (s) => s.innerText.toLowerCase() === `add to album`
      )
  );

  if (!dialog) {
    return;
  }

  const dialogContent = Array.from(dialog.childNodes).find((n) =>
    n.querySelector(`form`)
  );

  const dialogForm = dialogContent?.querySelector(`form`);

  if (!dialogContent || !dialogForm) {
    return;
  }

  const scrollableArea = Array.from(dialogContent.querySelectorAll(`div`)).find(
    (d) => getComputedStyle(d).overflowY === `auto`
  );

  const actionsContainer = Array.from(dialogForm.childNodes).find(
    (n) =>
      n.querySelector(`[role="button"]`)?.innerText.toLowerCase() ===
      `add to album`
  );

  if (!scrollableArea || !actionsContainer) {
    return;
  }

  dialog.style.position = `fixed`;
  dialog.style.inset = 0;
  dialogContent.style.width = `unset`;
  dialogContent.style.height = `unset`;
  scrollableArea.style.position = `fixed`;
  scrollableArea.style.inset = `60px 8px 73px`;
  scrollableArea.style.height = `unset`;
  actionsContainer.style.position = `fixed`;
  actionsContainer.style.left = `0`;
  actionsContainer.style.right = `0`;
  actionsContainer.style.bottom = `0`;

  let parent = scrollableArea.parentElement;

  while (parent && parent !== dialogContent) {
    parent.style.position = `relative`;
    parent.style.overflow = `visible`;
    parent = parent.parentElement;
  }
};

const interval = setInterval(() => {
  try {
    resizeDialog();
  } catch (err) {
    // Do nothing
  }
}, 1000);
