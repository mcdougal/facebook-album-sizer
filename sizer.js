const DIALOG_CONTAINER_SELECTOR = `.x1qjc9v5.x9f619.x78zum5.xdt5ytf.xl56j7k.x1c4vz4f.xg6iff7`;

const interval = setInterval(() => {
  const dialogContainer = document.querySelector(DIALOG_CONTAINER_SELECTOR);
  const dialogContainerInner = dialogContainer?.childNodes[0];
  const dialog = dialogContainerInner?.childNodes[0];
  const dialogContent = dialog?.childNodes[dialog.childNodes.length - 1];
  const dialogContentForm = dialogContent?.childNodes[0];
  const photosContainer = dialogContentForm?.childNodes[0];
  const photosContainerInner = photosContainer?.childNodes[0];

  if (!dialogContainer || !dialogContainerInner || !dialog || !dialogContent) {
    return;
  }

  dialogContainer.style.justifyContent = `stretch`;
  dialogContainerInner.style.flex = `1 1 auto`;
  dialogContainerInner.style.alignItems = `stretch`;
  dialog.style.flex = `1 1 auto`;
  dialog.style.maxHeight = `calc(100vh - 90px)`;
  dialogContent.style.width = `100%`;
  dialogContent.style.height = `100%`;
  dialogContentForm.style.height = `calc(100% - 80px)`;
  photosContainerInner.style.height = `100%`;
}, 1000);
