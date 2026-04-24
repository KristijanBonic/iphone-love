const tiktokVideos = [
  {
    id: 1,
    src: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-video_1.mp4',
    user: '@bonic_k',
    avatar: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-bonic_k.jpg',
    text: 'She is my everything #foreverandalways',
    likes: 602,
    commentsCount: 14,
    liked: false,
    saved: false,
    comments: [
      { user: '@lovebug', text: 'Wie süß ist dieses Video bitte?', likes: 4, liked: false },
      { user: '@rosa.herz', text: 'Was für ein Traumpaar ihr seid.', likes: 7, liked: false },
      { user: '@babylove', text: 'Wie süß wir sind, ich kann nicht mehr.', likes: 3, liked: false }
    ]
  },
  {
    id: 2,
    src: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-video_2.mp4',
    user: '@bonic_k',
    avatar: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-bonic_k.jpg',
    text: 'She makes my world beautiful #mywife',
    likes: 489,
    commentsCount: 11,
    liked: false,
    saved: false,
    comments: [
      { user: '@bonicfan', text: 'Ihr zwei seid einfach zu süß.', likes: 6, liked: false },
      { user: '@traumpaar', text: 'Ganz ehrlich, was für ein schönes Video.', likes: 5, liked: false },
      { user: '@rosa.glow', text: 'Wie süß wir sind, das ist unfair.', likes: 2, liked: false }
    ]
  },
  {
    id: 3,
    src: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-video_3.mp4',
    user: '@bonic_k',
    avatar: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-bonic_k.jpg',
    text: 'She makes me happy #love',
    likes: 731,
    commentsCount: 19,
    liked: false,
    saved: false,
    comments: [
      { user: '@cutiepie', text: 'Wie süß das Video ist omg.', likes: 8, liked: false },
      { user: '@foreverpink', text: 'Was für ein Traumpaar wirklich.', likes: 9, liked: false },
      { user: '@herzchen', text: 'Diese Energie zwischen euch zwei ist alles.', likes: 4, liked: false }
    ]
  },
  {
    id: 4,
    src: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-video_4.mp4',
    user: '@bonic_k',
    avatar: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-bonic_k.jpg',
    text: 'My wife #lovelove',
    likes: 544,
    commentsCount: 16,
    liked: false,
    saved: false,
    comments: [
      { user: '@moonkiss', text: 'Wie süß wir sind, ich liebe das.', likes: 6, liked: false },
      { user: '@lovelens', text: 'Dieses Video ist so herzig.', likes: 5, liked: false },
      { user: '@dreampair', text: 'Ganz klar ein Traumpaar.', likes: 7, liked: false }
    ]
  },
  {
    id: 5,
    src: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-video_5.mp4',
    user: '@bonic_k',
    avatar: 'https://kristijanbonic.github.io/iphone-love/images/tiktok/tiktok-bonic_k.jpg',
    text: 'God she looks so pretty #wow',
    likes: 688,
    commentsCount: 21,
    liked: false,
    saved: false,
    comments: [
      { user: '@softpink', text: 'Wie süß dieses letzte Video ist.', likes: 4, liked: false },
      { user: '@couplegoals', text: 'Ihr seid wirklich ein Traumpaar.', likes: 8, liked: false },
      { user: '@butterfly', text: 'Ich liebe, wie süß wir in solchen Videos wirken.', likes: 5, liked: false }
    ]
  }
];

function formatTikTokCount(value) {
  return String(value);
}

function getTikTokVideoSources(videoPath) {
  const fileName = videoPath.split('/').pop() || videoPath;
  return [videoPath, './' + fileName];
}

function renderTikTokCard(video) {
  return `
    <article class="tiktok-card" data-tiktok-video="${video.id}">
      <video class="tiktok-media" playsinline loop preload="metadata">
        ${getTikTokVideoSources(video.src).map((source) => `<source src="${source}" type="video/mp4">`).join('')}
      </video>
      <div class="tiktok-pause-indicator">
        <div class="tiktok-pause-bars"><span></span><span></span></div>
      </div>
      <div class="tiktok-card-content">
        <div class="tiktok-caption">
          <div class="tiktok-user-row">
            <div class="tiktok-avatar"><img src="${video.avatar}" alt="${video.user} Profilbild"></div>
            <div>
              <div class="tiktok-user">${video.user}</div>
              <div class="tiktok-meta">gepostet für dich</div>
            </div>
          </div>
          <div class="tiktok-text">${video.text}</div>
        </div>

        <div class="tiktok-actions">
          <div class="tiktok-action-wrap">
            <div class="tiktok-action ${video.liked ? 'is-liked' : ''}" data-tiktok-action="like" data-video-id="${video.id}" aria-label="Liken">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"></path>
              </svg>
            </div>
            <div class="tiktok-action-label" data-tiktok-like-count="${video.id}">${formatTikTokCount(video.likes)}</div>
          </div>
          <div class="tiktok-action-wrap">
            <div class="tiktok-action" data-tiktok-action="comment" data-video-id="${video.id}" aria-label="Kommentare">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.25 4h13.5A2.25 2.25 0 0 1 21 6.25v8.5A2.25 2.25 0 0 1 18.75 17H9.62l-4.34 3.48c-.73.58-1.78.07-1.78-.87V6.25A2.25 2.25 0 0 1 5.75 4h-.5Zm0 1.5a.75.75 0 0 0-.75.75v10.24l3.56-2.85A.75.75 0 0 1 8.53 13h10.22a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75H5.25Z"></path>
              </svg>
            </div>
            <div class="tiktok-action-label">${formatTikTokCount(video.commentsCount)}</div>
          </div>
          <div class="tiktok-action-wrap">
            <div class="tiktok-action ${video.saved ? 'is-saved' : ''}" data-tiktok-action="save" data-video-id="${video.id}" aria-label="Speichern">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3.5h10a1 1 0 0 1 1 1V21l-6-3.8L6 21V4.5a1 1 0 0 1 1-1Z"></path>
              </svg>
            </div>
            <div class="tiktok-action-label">Speichern</div>
          </div>
          <div class="tiktok-action-wrap">
            <div class="tiktok-action" data-tiktok-action="share" data-video-id="${video.id}">↗</div>
            <div class="tiktok-action-label">Teilen</div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderTikTokFeed() {
  if (!tiktokFeed) return;
  tiktokFeed.innerHTML = tiktokVideos.map(renderTikTokCard).join('');
  if (tiktokFriendsPanel) {
    tiktokFriendsPanel.innerHTML = `
      <div class="tiktok-topbar" style="position:sticky;top:0;padding:0 0 18px;justify-content:center;">
        <div class="tiktok-tab active">Freundinnen</div>
      </div>
      ${tiktokVideos.map(renderTikTokCard).join('')}
    `;
  }
  syncTikTokButtons();
  playVisibleTikTokVideo();
}

function syncTikTokButtons() {
  document.querySelectorAll('[data-tiktok-action="like"]').forEach((button) => {
    const video = tiktokVideos.find((item) => item.id === Number(button.dataset.videoId));
    if (!video) return;
    button.classList.toggle('is-liked', video.liked);
  });

  document.querySelectorAll('[data-tiktok-action="save"]').forEach((button) => {
    const video = tiktokVideos.find((item) => item.id === Number(button.dataset.videoId));
    if (!video) return;
    button.classList.toggle('is-saved', video.saved);
  });

  document.querySelectorAll('[data-tiktok-like-count]').forEach((label) => {
    const video = tiktokVideos.find((item) => item.id === Number(label.dataset.tiktokLikeCount));
    if (!video) return;
    label.textContent = formatTikTokCount(video.likes);
  });
}

function playVisibleTikTokVideo() {
  const scope = tiktokActiveNav === 'friends' ? tiktokFriendsPanel : tiktokFeed;
  if (!scope) return;

  const cards = Array.from(scope.querySelectorAll('.tiktok-card'));
  if (!cards.length) return;

  let activeCard = cards[0];
  let bestVisibility = -1;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibilityRatio = visibleHeight / Math.max(rect.height, 1);

    if (visibilityRatio > bestVisibility) {
      bestVisibility = visibilityRatio;
      activeCard = card;
    }
  });

  scope.querySelectorAll('.tiktok-media').forEach((videoEl) => {
    const parentCard = videoEl.closest('.tiktok-card');
    const videoId = Number(parentCard?.dataset.tiktokVideo);
    if (parentCard === activeCard) {
      if (!tiktokPausedVideos.has(videoId)) {
        parentCard?.classList.remove('is-paused');
        if (videoEl.paused) {
          videoEl.currentTime = 0;
        }
        videoEl.muted = mediaVolume === 0;
        videoEl.volume = mediaVolume;
        const playPromise = videoEl.play();
        if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
      } else {
        parentCard?.classList.add('is-paused');
        videoEl.pause();
      }
    } else {
      parentCard?.classList.remove('is-paused');
      videoEl.pause();
    }
  });
}

function toggleTikTokVideoPlayback(videoElement) {
  if (!videoElement) return;
  const parentCard = videoElement.closest('.tiktok-card');
  const videoId = Number(parentCard?.dataset.tiktokVideo);
  if (!videoId) return;

  if (tiktokPausedVideos.has(videoId)) {
    tiktokPausedVideos.delete(videoId);
    parentCard?.classList.remove('is-paused');
    videoElement.muted = mediaVolume === 0;
    videoElement.volume = mediaVolume;
    const playPromise = videoElement.play();
    if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
    return;
  }

  tiktokPausedVideos.add(videoId);
  parentCard?.classList.add('is-paused');
  videoElement.pause();
}

function openTikTokComments(videoId) {
  const video = tiktokVideos.find((item) => item.id === videoId);
  if (!video || !tiktokComments || !tiktokCommentsList) return;
  tiktokCommentVideoId = videoId;
  tiktokCommentsList.innerHTML = video.comments.map((comment) => `
    <div class="tiktok-comment">
      <div class="tiktok-comment-main">
        <div class="tiktok-comment-user">${comment.user}</div>
        <div class="tiktok-comment-text">${comment.text}</div>
      </div>
      <div class="tiktok-comment-like ${comment.liked ? 'is-liked' : ''}" data-comment-user="${comment.user}">
        <div class="tiktok-comment-like-icon">♥</div>
        <div class="tiktok-comment-like-count">${comment.likes}</div>
      </div>
    </div>
  `).join('');
  tiktokComments.classList.add('active');
}

function closeTikTokComments() {
  if (!tiktokComments) return;
  tiktokComments.classList.remove('active');
  tiktokCommentVideoId = null;
}

function showTikTokShareToast() {
  if (!tiktokShareToast) return;
  tiktokShareToast.classList.add('active');
  if (tiktokShareToastTimer) clearTimeout(tiktokShareToastTimer);
  tiktokShareToastTimer = setTimeout(() => {
    tiktokShareToast.classList.remove('active');
  }, 1200);
}

function setTikTokTopTab(tab) {
  tiktokActiveTab = tab;
  document.querySelectorAll('[data-tiktok-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tiktokTab === tab);
  });
  if (tiktokActiveNav === 'home') {
    tiktokFeed?.scrollTo({ top: 0, behavior: 'smooth' });
    playVisibleTikTokVideo();
  }
}

function setTikTokNav(nav) {
  tiktokActiveNav = nav;
  document.querySelectorAll('[data-tiktok-nav]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tiktokNav === nav);
  });
  if (tiktokTopbar) tiktokTopbar.style.display = nav === 'home' ? 'flex' : 'none';
  if (tiktokFeed) tiktokFeed.style.display = nav === 'home' ? 'block' : 'none';
  if (tiktokFriendsPanel) tiktokFriendsPanel.classList.toggle('active', nav === 'friends');
  if (tiktokInboxPanel) tiktokInboxPanel.classList.toggle('active', nav === 'inbox');
  if (tiktokProfilePanel) tiktokProfilePanel.classList.toggle('active', nav === 'profile');

  document.querySelectorAll('.tiktok-media').forEach((videoEl) => videoEl.pause());

  if (nav === 'home' || nav === 'friends') {
    window.setTimeout(playVisibleTikTokVideo, 120);
  }
}

function initTikTokInteractions() {
  if (tiktokFeed) {
    tiktokFeed.addEventListener('scroll', playVisibleTikTokVideo, { passive: true });
    tiktokFeed.addEventListener('click', (e) => {
      const action = e.target.closest('[data-tiktok-action]');
      if (!action) {
        const videoElement = e.target.closest('.tiktok-media');
        if (videoElement) toggleTikTokVideoPlayback(videoElement);
        return;
      }

      const videoId = Number(action.dataset.videoId);
      const video = tiktokVideos.find((item) => item.id === videoId);
      if (!video) return;

      const actionName = action.dataset.tiktokAction;

      if (actionName === 'like') {
        video.liked = !video.liked;
        video.likes += video.liked ? 1 : -1;
        syncTikTokButtons();
        return;
      }

      if (actionName === 'comment') {
        openTikTokComments(videoId);
        return;
      }

      if (actionName === 'save') {
        video.saved = !video.saved;
        syncTikTokButtons();
        return;
      }

      if (actionName === 'share') {
        showTikTokShareToast();
      }
    });
  }

  if (tiktokFriendsPanel) {
    tiktokFriendsPanel.addEventListener('scroll', playVisibleTikTokVideo, { passive: true });
    tiktokFriendsPanel.addEventListener('click', (e) => {
      const mirroredAction = e.target.closest('[data-tiktok-action]');
      if (!mirroredAction) {
        const videoElement = e.target.closest('.tiktok-media');
        if (videoElement) toggleTikTokVideoPlayback(videoElement);
        return;
      }
      if (!tiktokFeed) return;
      const twin = tiktokFeed.querySelector(`[data-tiktok-action="${mirroredAction.dataset.tiktokAction}"][data-video-id="${mirroredAction.dataset.videoId}"]`);
      if (twin) twin.click();
    });
  }

  document.querySelectorAll('[data-tiktok-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      setTikTokTopTab(button.dataset.tiktokTab);
      setTikTokNav('home');
    });
  });

  document.querySelectorAll('[data-tiktok-nav]').forEach((button) => {
    button.addEventListener('click', () => {
      const nav = button.dataset.tiktokNav;

      if (nav === 'friends') {
        setTikTokTopTab('following');
        setTikTokNav('home');
        return;
      }

      if (nav === 'create') return;

      if (nav === 'home') setTikTokTopTab('foryou');

      setTikTokNav(nav);
    });
  });

  if (tiktokCommentsClose) {
    tiktokCommentsClose.addEventListener('click', closeTikTokComments);
  }

  if (tiktokCommentsList) {
    tiktokCommentsList.addEventListener('click', (e) => {
      const likeButton = e.target.closest('.tiktok-comment-like');
      if (!likeButton || tiktokCommentVideoId === null) return;

      const video = tiktokVideos.find((item) => item.id === tiktokCommentVideoId);
      if (!video) return;

      const comment = video.comments.find((item) => item.user === likeButton.dataset.commentUser);
      if (!comment) return;

      comment.liked = !comment.liked;
      comment.likes += comment.liked ? 1 : -1;
      openTikTokComments(tiktokCommentVideoId);
    });
  }
}

initTikTokInteractions();
