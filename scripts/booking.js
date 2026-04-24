function buildBookingPhotoCard(src, alt, fallbackText, fitMode = 'cover') {
  return `
    <div class="photo-card">
      <div class="photo-art" data-photo-shell>
        <img src="${src}" alt="${alt}" data-photo-full data-photo-fit="${fitMode}" data-gallery-image data-gallery-fallback="${fallbackText}">
      </div>
    </div>
  `;
}

function getBookingVideoSources(videoPath) {
  const fileName = videoPath.split('/').pop() || videoPath;
  const variants = [videoPath, './' + fileName];
  if (videoPath.endsWith('.mp4')) {
    variants.push(videoPath.replace(/\.mp4$/i, '.MP4'));
    variants.push(('./' + fileName).replace(/\.mp4$/i, '.MP4'));
  } else if (videoPath.endsWith('.MP4')) {
    variants.push(videoPath.replace(/\.MP4$/i, '.mp4'));
    variants.push(('./' + fileName).replace(/\.MP4$/i, '.mp4'));
  }

  return Array.from(new Set(variants.flatMap((path) => [
    getLocalAssetUrl(path),
    getDocumentAssetUrl(path),
    path
  ])));
}

function buildBookingVideoCard(src) {
  return `
    <div class="booking-video-card">
      <div class="booking-video-shell">
        <video webkit-playsinline playsinline preload="metadata" data-booking-video>
          ${getBookingVideoSources(src).map((source) => `<source src="${source}" type="video/mp4">`).join('')}
        </video>
        <div class="booking-video-play">${spotifyIcons.play}</div>
      </div>
    </div>
  `;
}

function attachGalleryFallbacks(root) {
  if (!root) return;
  root.querySelectorAll('[data-gallery-image]').forEach((img) => {
    img.addEventListener('error', () => {
      const shell = img.closest('[data-photo-shell]');
      if (!shell) return;
      shell.classList.add('placeholder');
      shell.setAttribute('data-photo-placeholder', img.dataset.galleryFallback || 'Platz für ein Foto');
      shell.textContent = img.dataset.galleryFallback || 'Platz für ein Foto';
    }, { once: true });
  });
}

function stopBookingVideos() {
  if (!bookingView) return;
  bookingView.querySelectorAll('[data-booking-video]').forEach((videoEl) => {
    videoEl.pause();
    videoEl.currentTime = 0;
    videoEl.closest('.booking-video-shell')?.classList.remove('is-playing');
  });
}

function showBookingPage(pageId) {
  if (!bookingView) return;
  const targetPage = bookingView.querySelector(`#bookingPage-${pageId}`);
  if (!targetPage) return;
  stopBookingVideos();
  bookingView.querySelectorAll('.booking-page').forEach((page) => {
    page.classList.remove('active', 'entering', 'leaving');
  });
  targetPage.classList.add('active');
}

function initializeBookingContent() {
  if (!bookingView) return;

  const trainCards = [
    buildBookingPhotoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking-zug_hin_1.jpg', 'Zugticket Hin 1', 'Zugticket hin 1', 'contain'),
    buildBookingPhotoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking-zug_hin_2.jpg', 'Zugticket Hin 2', 'Zugticket hin 2', 'contain'),
    buildBookingPhotoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking-zug_retour_1.jpg', 'Zugticket Retour 1', 'Zugticket retour 1', 'contain'),
    buildBookingPhotoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking-zug_retour_2.jpg', 'Zugticket Retour 2', 'Zugticket retour 2', 'contain')
  ].join('');

  const hotelCards = buildBookingPhotoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking-hotel_1.jpg', 'Hotelbild 1', 'Hotelbild 1');

  const memoriesTrainCards = Array.from({ length: 7 }, (_, index) => (
    buildBookingPhotoCard(`https://kristijanbonic.github.io/iphone-love/images/booking/booking_foto-zug-${index + 1}.jpg`, `Hinfahrt Foto ${index + 1}`, `Hinfahrt Foto ${index + 1}`)
  )).concat([
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-34.mp4')
  ]).join('');

  const dayOneCards = [
    ...Array.from({ length: 3 }, (_, index) => buildBookingPhotoCard(`https://kristijanbonic.github.io/iphone-love/images/booking/booking_foto-tag1-${index + 1}.jpg`, `Erster Tag Foto ${index + 1}`, `Erster Tag Foto ${index + 1}`)),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-6.mp4'),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-30.mp4'),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-7.mp4'),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-8.mp4'),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-31.mp4'),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-32.mp4'),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-33.mp4')
  ].join('');

  const dayTwoImageOrder = [1, 2, 3, 4, 5, 6, 7, 8, 21, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const dayTwoCards = [
    ...dayTwoImageOrder.map((number) => buildBookingPhotoCard(`https://kristijanbonic.github.io/iphone-love/images/booking/booking_foto-tag2-${number}.jpg`, `Zweiter Tag Foto ${number}`, `Zweiter Tag Foto ${number}`)),
    ...[9, 10, 11, 12, 13, 16, 17, 18].map((number) => buildBookingVideoCard(`https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-${number}.mp4`))
  ].join('');

  const dayThreeCards = [
    ...Array.from({ length: 3 }, (_, index) => buildBookingPhotoCard(`https://kristijanbonic.github.io/iphone-love/images/booking/booking_foto-tag3-${index + 1}.jpg`, `Letzter Tag Foto ${index + 1}`, `Letzter Tag Foto ${index + 1}`)),
    buildBookingVideoCard('https://kristijanbonic.github.io/iphone-love/images/booking/booking_video-19.mp4')
  ].join('');

  bookingView.innerHTML = `
    <div class="booking-page active" id="bookingPage-home">
      <div class="love-card">
        <div class="booking-kicker">Tschechien</div>
        <div class="booking-city">Prag</div>
        <div class="booking-period">06.03.2026 - 08.03.2026</div>

        <div class="booking-actions">
          <button class="booking-button" type="button" data-booking-page="train">Die Zugfahrt</button>
          <button class="booking-button" type="button" data-booking-page="hotel">Das Hotel</button>
          <button class="booking-button" type="button" data-booking-page="photos">Die Errinerungen</button>
        </div>
      </div>

      <div class="love-note">Das war nur einer von vielen Urlauben, die wir noch machen werden, Ljubavi 🥹💗</div>
    </div>

    <div class="booking-page" id="bookingPage-train">
      <button class="booking-back" type="button" data-booking-page="home">Zurück</button>
      <div class="love-card">
        <div class="love-eyebrow">Die Zugfahrt 💗</div>
        <div class="love-title">Unsere Tickets nach Prag</div>
        <div class="booking-subtitle">Hin und zurück, damit diese erste Reise für immer festgehalten bleibt.</div>
        <div class="booking-gallery-list">${trainCards}</div>
      </div>
    </div>

    <div class="booking-page" id="bookingPage-hotel">
      <button class="booking-back" type="button" data-booking-page="home">Zurück</button>
      <div class="love-card">
        <div class="love-eyebrow">Das Hotel 💗</div>
        <div class="love-title">The Cloud One Prague</div>
        <div class="booking-subtitle">Unser Hotel in Prag und ein Teil dieser ersten gemeinsamen Reise.</div>
        <div class="booking-gallery-list">${hotelCards}</div>
      </div>
    </div>

    <div class="booking-page" id="bookingPage-photos">
      <button class="booking-back" type="button" data-booking-page="home">Zurück</button>
      <div class="love-card">
        <div class="love-eyebrow">Die Errinerungen 💗</div>
        <div class="love-title">Unsere Zeit in Prag</div>
        <div class="booking-subtitle">Errinerungen aus unserem ersten Urlaub</div>
        <div class="booking-category-grid">
          <button class="booking-button" type="button" data-booking-page="memories-train">Die Hinfahrt</button>
          <button class="booking-button" type="button" data-booking-page="memories-day1">Der Erste Tag</button>
          <button class="booking-button" type="button" data-booking-page="memories-day2">Der Zweite Tag</button>
          <button class="booking-button" type="button" data-booking-page="memories-day3">Der Letzte Tag</button>
        </div>
      </div>
    </div>

    <div class="booking-page" id="bookingPage-memories-train">
      <button class="booking-back" type="button" data-booking-page="photos">Zurück</button>
      <div class="love-card">
        <div class="love-eyebrow">Die Hinfahrt</div>
        <div class="booking-gallery-list">${memoriesTrainCards}</div>
        <button class="booking-button booking-top-button" type="button" data-booking-top>Ganz rauf</button>
      </div>
    </div>

    <div class="booking-page" id="bookingPage-memories-day1">
      <button class="booking-back" type="button" data-booking-page="photos">Zurück</button>
      <div class="love-card">
        <div class="love-eyebrow">Der Erste Tag</div>
        <div class="booking-gallery-list">${dayOneCards}</div>
        <button class="booking-button booking-top-button" type="button" data-booking-top>Ganz rauf</button>
      </div>
    </div>

    <div class="booking-page" id="bookingPage-memories-day2">
      <button class="booking-back" type="button" data-booking-page="photos">Zurück</button>
      <div class="love-card">
        <div class="love-eyebrow">Der Zweite Tag</div>
        <div class="booking-gallery-list">${dayTwoCards}</div>
        <button class="booking-button booking-top-button" type="button" data-booking-top>Ganz rauf</button>
      </div>
    </div>

    <div class="booking-page" id="bookingPage-memories-day3">
      <button class="booking-back" type="button" data-booking-page="photos">Zurück</button>
      <div class="love-card">
        <div class="love-eyebrow">Der Letzte Tag</div>
        <div class="booking-gallery-list">${dayThreeCards}</div>
        <button class="booking-button booking-top-button" type="button" data-booking-top>Ganz rauf</button>
      </div>
    </div>
  `;

  attachGalleryFallbacks(bookingView);
  applyMediaVolume();
}

function initBookingInteractions() {
  if (!bookingView) return;

  bookingView.addEventListener('click', (e) => {
    const bookingVideo = e.target.closest('[data-booking-video]');
    if (bookingVideo) {
      bookingView.querySelectorAll('[data-booking-video]').forEach((videoEl) => {
        if (videoEl !== bookingVideo) {
          videoEl.pause();
          videoEl.closest('.booking-video-shell')?.classList.remove('is-playing');
        }
      });
      if (bookingVideo.paused) {
        const playPromise = bookingVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
        bookingVideo.closest('.booking-video-shell')?.classList.add('is-playing');
      } else {
        bookingVideo.pause();
        bookingVideo.closest('.booking-video-shell')?.classList.remove('is-playing');
      }
      return;
    }

    const bookingNav = e.target.closest('[data-booking-page]');
    const bookingTop = e.target.closest('[data-booking-top]');

    if (bookingTop) {
      const activePage = bookingView.querySelector('.booking-page.active');
      activePage?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      appScreen?.querySelector('.app-content')?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!bookingNav) return;
    showBookingPage(bookingNav.dataset.bookingPage || 'home');
  });
}

initBookingInteractions();
