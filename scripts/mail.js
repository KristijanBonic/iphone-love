function initMailInteractions() {
  if (!mailView) return;

  mailView.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-mail-tab]');
    if (!tab) return;

    const tabName = tab.dataset.mailTab;
    mailView.querySelectorAll('[data-mail-tab]').forEach((item) => item.classList.toggle('active', item === tab));
    mailView.querySelectorAll('[data-mail-panel]').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.mailPanel === tabName);
    });
  });
}

initMailInteractions();
