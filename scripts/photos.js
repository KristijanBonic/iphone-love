function initializePhotosContent() {
  if (!photosView) return;

  const photos = Array.from({ length: 35 }, (_, index) => {
    const number = index + 1;
    return `
      <div class="photo-card">
        <div class="photo-art">
          <img src="https://kristijanbonic.github.io/iphone-love/images/fotos/fotos_bild-${number}.jpg" alt="Foto ${number} von euch">
        </div>
      </div>
    `;
  }).join('');

  photosView.innerHTML = `
    <div class="photos-grid">${photos}</div>
    <button class="booking-button booking-top-button" type="button" data-photos-top>Ganz rauf</button>
  `;
}

function openPhotoViewerPanel() {
  if (!photoViewer) return;
  photoViewer.classList.remove('closing');
  photoViewer.classList.add('active');
}

function closePhotoViewerPanel() {
  if (!photoViewer || !photoViewer.classList.contains('active')) return;
  photoViewer.classList.add('closing');
  window.setTimeout(() => {
    photoViewer.classList.remove('active', 'closing', 'show-placeholder', 'contain-image');
  }, 240);
}

function initPhotoInteractions() {
  if (photosView) {
    photosView.addEventListener('click', (e) => {
      const topButton = e.target.closest('[data-photos-top]');
      if (topButton) {
        photosView.scrollIntoView({ behavior: 'smooth', block: 'start' });
        appScreen?.querySelector('.app-content')?.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const photo = e.target.closest('[data-photo-full]');
      const placeholder = e.target.closest('[data-photo-placeholder]');
      if (!photoViewer || !photoViewerImage) return;

      if (photo) {
        photoViewer.classList.remove('show-placeholder');
        photoViewer.classList.remove('contain-image');
        photoViewerImage.src = photo.getAttribute('src') || '';
        photoViewerImage.alt = photo.getAttribute('alt') || 'Vollbild Foto';
        if (photoViewerPlaceholder) photoViewerPlaceholder.textContent = '';
        openPhotoViewerPanel();
        return;
      }

      if (placeholder) {
        photoViewer.classList.add('show-placeholder');
        photoViewerImage.src = '';
        photoViewerImage.alt = 'Platzhalter Foto';
        if (photoViewerPlaceholder) {
          photoViewerPlaceholder.textContent = placeholder.getAttribute('data-photo-placeholder') || 'Platz für ein Foto';
        }
        openPhotoViewerPanel();
      }
    });
  }

  if (photoViewerClose) {
    photoViewerClose.addEventListener('click', () => {
      closePhotoViewerPanel();
    });
  }

  if (photoViewer) {
    photoViewer.addEventListener('click', (e) => {
      if (e.target !== photoViewer) return;
      closePhotoViewerPanel();
    });
  }
}

initPhotoInteractions();
