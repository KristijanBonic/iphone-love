const spotifyTracks = [
  { title: 'Ljubi grli me ti', artist: 'Ljuba Alicic, Zoran Starcevic', cover: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-ljubi_grli_me_ti.jpg', src: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-lied-ljubi_grli_me_ti.mp4' },
  { title: 'Ja Jos Spavam U Tvojoj Majici', artist: 'Ceca', cover: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-ja_jos_spavam_u_tvojoj_majici.jpg', src: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-lied-ja_jos_spavam_u_tvojoj_majici.mp4' },
  { title: 'Izgledala je malo cudno u kaputu žutom krojenom bez veze', artist: 'Bijelo Dugme', cover: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-izgledala_je_malo_cudno_u_kaputu_zutom_krojenom_bez_veze.jpg', src: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-lied-izgledala_je_malo_cudno_u_kaputu_zutom_krojenom_bez_veze.mp4' },
  { title: 'Pokreni me', artist: 'Laki pingvini', cover: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-pokreni_me.jpg', src: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-lied-pokreni_me.mp4' },
  { title: 'Naucit Cu Te Mala', artist: 'Darko Domijan', cover: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-naucit_cu_te_mala.jpg', src: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-lied-naucit_cu_te_mala.mp4' },
  { title: 'Ne spavaj mala moja muzika dok svira', artist: 'Bijelo Dugme', cover: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-ne_spavaj_mala_moja_muzika_dok_svira.jpg', src: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-lied-ne_spavaj_mala_moja_muzika_dok_svira.mp4' },
  { title: 'Ja Sam Za Ples', artist: 'Novi Fosili', cover: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-ja_sam_za_ples.jpg', src: 'https://kristijanbonic.github.io/iphone-love/images/spotify/spotify-lied-ja_sam_za_ples.mp4' }
];

let spotifyAudio = null;
let spotifyPlayer = null;
let spotifyBigPlayer = null;
let spotifyPlayerSurface = null;
let spotifyCurrentIndex = 0;
let spotifyPlayerCover = null;
let spotifyPlayerTitle = null;
let spotifyPlayerArtist = null;
let spotifyPlayerProgressFill = null;
let spotifySmallPlayPause = null;
let spotifyBigClose = null;
let spotifyBigCover = null;
let spotifyBigTitle = null;
let spotifyBigArtist = null;
let spotifySeek = null;
let spotifyCurrentTime = null;
let spotifyDuration = null;
let spotifyPlayPause = null;
let spotifyPrev = null;
let spotifyNext = null;

const spotifyIcons = {
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5.25a.75.75 0 0 1 1.5 0v13.5a.75.75 0 0 1-1.5 0V5.25Zm12.02.32a.75.75 0 0 1-.12 1.05L11.98 12l5.92 5.38a.75.75 0 1 1-1.01 1.1l-6.54-5.94a.75.75 0 0 1 0-1.1l6.54-5.94a.75.75 0 0 1 1.13.07Z"></path></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.7 6.22c0-1.2 1.31-1.93 2.33-1.3l8.2 5.08c.97.6.97 2 0 2.6l-8.2 5.08c-1.02.63-2.33-.1-2.33-1.3V6.22Z"></path></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 5.5A1.25 1.25 0 0 1 9 6.75v10.5A1.25 1.25 0 0 1 7.75 18.5h-.5A1.25 1.25 0 0 1 6 17.25V6.75A1.25 1.25 0 0 1 7.25 5.5h.5Zm9 0A1.25 1.25 0 0 1 18 6.75v10.5a1.25 1.25 0 0 1-1.25 1.25h-.5A1.25 1.25 0 0 1 15 17.25V6.75a1.25 1.25 0 0 1 1.25-1.25h.5Z"></path></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5.25a.75.75 0 0 1 1.5 0v13.5a.75.75 0 0 1-1.5 0V5.25ZM6.1 5.57a.75.75 0 0 1 1.05-.12l6.54 5.94a.75.75 0 0 1 0 1.1l-6.54 5.94a.75.75 0 1 1-1.01-1.1L12.06 12 6.14 6.62a.75.75 0 0 1-.04-1.05Z"></path></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.53 5.47a.75.75 0 0 1 0 1.06L10.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"></path></svg>',
  more: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.55 16.27 5.78 12.5a1 1 0 1 1 1.41-1.41l2.36 2.35 7.26-7.26a1 1 0 1 1 1.41 1.42l-7.97 7.96a1 1 0 0 1-1.41 0Z"></path></svg>'
};

function setSpotifyPlayerVisible(visible) {
  if (!spotifyPlayer) return;
  spotifyPlayer.classList.toggle('active', Boolean(visible));
}

function setSpotifyBigPlayerVisible(visible) {
  if (!spotifyBigPlayer) return;
  spotifyBigPlayer.classList.toggle('active', Boolean(visible));
}

function setSpotifyPlayPauseIcon(isPlaying) {
  if (!spotifyPlayPause) return;
  spotifyPlayPause.innerHTML = isPlaying ? spotifyIcons.pause : spotifyIcons.play;
}

function setSpotifySmallPlayPauseIcon(isPlaying) {
  if (!spotifySmallPlayPause) return;
  spotifySmallPlayPause.innerHTML = isPlaying ? spotifyIcons.pause : spotifyIcons.play;
}

function setTopSheetPlayPauseIcon(isPlaying) {
  if (!topSheetToggle) return;
  topSheetToggle.innerHTML = isPlaying ? spotifyIcons.pause : spotifyIcons.play;
}

function setMarqueeText(element, text) {
  if (!element) return;
  const span = element.querySelector('span');
  if (span) {
    span.textContent = text;
  } else {
    element.textContent = text;
  }
}

function refreshMarquee(element) {
  if (!element) return;
  const span = element.querySelector('span');
  if (!span) return;
  element.classList.remove('is-marquee');
  element.style.removeProperty('--marquee-shift');
  const overflow = span.scrollWidth - element.clientWidth;
  if (overflow > 10) {
    element.style.setProperty('--marquee-shift', `-${overflow}px`);
    element.classList.add('is-marquee');
  }
}

function isSpotifyPlaying() {
  return Boolean(spotifyAudio && spotifyAudio.src && !spotifyAudio.paused && !spotifyAudio.ended);
}

function updateTopSheetState() {
  const activeTrack = spotifyTracks[spotifyCurrentIndex];
  const hasTrack = Boolean(spotifyAudio && spotifyAudio.src && activeTrack);
  if (topSheetCover) topSheetCover.src = hasTrack ? activeTrack.cover : 'https://kristijanbonic.github.io/iphone-love/images/apps/app-spotify.jpg';
  if (topSheetTitle) topSheetTitle.textContent = hasTrack ? activeTrack.title : 'Kein Lied aktiv';
  if (topSheetArtist) topSheetArtist.textContent = hasTrack ? activeTrack.artist : 'Spotify wartet auf dich';
  if (topSheetSeek) topSheetSeek.value = spotifySeek ? spotifySeek.value : '0';
  if (topSheetCurrentTime) topSheetCurrentTime.textContent = spotifyCurrentTime ? spotifyCurrentTime.textContent : '0:00';
  if (topSheetDuration) topSheetDuration.textContent = spotifyDuration ? spotifyDuration.textContent : '-0:00';
  setSpotifySmallPlayPauseIcon(isSpotifyPlaying());
  setTopSheetPlayPauseIcon(isSpotifyPlaying());
  if (topSheetPrev) topSheetPrev.innerHTML = spotifyIcons.prev;
  if (topSheetNext) topSheetNext.innerHTML = spotifyIcons.next;
}

function getSpotifyAudioSources(audioPath) {
  const fileName = audioPath.split('/').pop() || audioPath;
  const baseName = fileName.replace(/\.mp4$/i, '');
  const withoutPrefix = baseName.replace(/^lied-/, '');
  const alternateBaseName = /2$/i.test(baseName) ? baseName.replace(/2$/i, '') : `${baseName}2`;
  const alternateWithoutPrefix = /2$/i.test(withoutPrefix) ? withoutPrefix.replace(/2$/i, '') : `${withoutPrefix}2`;
  const variants = Array.from(new Set([
    audioPath,
    '/' + audioPath.replace(/^\.\//, ''),
    baseName,
    withoutPrefix,
    alternateBaseName,
    alternateWithoutPrefix,
    baseName.replace(/_/g, '-'),
    withoutPrefix.replace(/_/g, '-'),
    alternateBaseName.replace(/_/g, '-'),
    alternateWithoutPrefix.replace(/_/g, '-')
  ]));

  const candidatePaths = [];
  variants.forEach((variant) => {
    if (/\.mp4$/i.test(variant) || variant.startsWith('/')) {
      candidatePaths.push(variant);
    } else {
      candidatePaths.push(`./spotify/${variant}.mp4`);
      candidatePaths.push(`https://kristijanbonic.github.io/iphone-love/images/spotify/${variant}.mp4`);
      candidatePaths.push(`https://kristijanbonic.github.io/iphone-love/images/${variant}.mp4`);
      candidatePaths.push(`./${variant}.mp4`);
    }
  });

  return Array.from(new Set(candidatePaths.flatMap((path) => [
    getLocalAssetUrl(path),
    getDocumentAssetUrl(path),
    path
  ])));
}

function buildSpotifyPlayer() {
  if (!appScreen || document.getElementById('spotifyAudio')) return;

  const player = document.createElement('div');
  player.className = 'spotify-player';
  player.innerHTML = `
    <div class="spotify-player-surface" id="spotifyPlayerSurface">
      <div class="spotify-player-top">
        <div class="spotify-player-cover"><img id="spotifyPlayerCover" src="${spotifyTracks[0].cover}" alt="Aktuelles Lied Cover"></div>
        <div class="spotify-player-meta">
          <div class="spotify-player-title" id="spotifyPlayerTitle">${spotifyTracks[0].title}</div>
          <div class="spotify-player-artist" id="spotifyPlayerArtist">${spotifyTracks[0].artist}</div>
        </div>
        <button class="spotify-player-toggle" id="spotifySmallPlayPause" type="button" aria-label="Wiedergabe">${spotifyIcons.play}</button>
      </div>
      <div class="spotify-player-progress"><div class="spotify-player-progress-fill" id="spotifyPlayerProgressFill"></div></div>
    </div>
    <video id="spotifyAudio" webkit-playsinline playsinline preload="auto" style="position:absolute; width:2px; height:2px; opacity:0.01; pointer-events:none; left:-9999px; top:-9999px; z-index:-5;"></video>
  `;
  appScreen.appendChild(player);

  const bigPlayer = document.createElement('div');
  bigPlayer.className = 'spotify-big-player';
  bigPlayer.id = 'spotifyBigPlayer';
  bigPlayer.innerHTML = `
    <div class="spotify-big-topbar">
      <button class="spotify-big-back" id="spotifyBigClose" type="button" aria-label="Zurück">${spotifyIcons.back}</button>
      <div class="spotify-big-top-title" aria-hidden="true"></div>
      <button class="spotify-big-more" type="button" aria-label="Mehr Optionen">${spotifyIcons.more}</button>
    </div>
    <div class="spotify-big-cover"><img id="spotifyBigCover" src="${spotifyTracks[0].cover}" alt="Aktuelles Lied groß"></div>
    <div class="spotify-big-song-row">
      <div class="spotify-big-song-meta">
        <div class="spotify-big-title spotify-marquee" id="spotifyBigTitle"><span>${spotifyTracks[0].title}</span></div>
        <div class="spotify-big-artist spotify-marquee" id="spotifyBigArtist"><span>${spotifyTracks[0].artist}</span></div>
      </div>
      <div class="spotify-big-like" aria-hidden="true">${spotifyIcons.check}</div>
    </div>
    <div class="spotify-big-progress">
      <input class="spotify-range" id="spotifySeek" type="range" min="0" max="100" value="0">
      <div class="spotify-time-row"><span id="spotifyCurrentTime">0:00</span><span id="spotifyDuration">-0:00</span></div>
    </div>
    <div class="spotify-big-controls">
      <button class="spotify-big-control secondary" id="spotifyPrev" type="button" aria-label="Vorheriges Lied">${spotifyIcons.prev}</button>
      <button class="spotify-big-control play" id="spotifyPlayPause" type="button" aria-label="Wiedergabe">${spotifyIcons.play}</button>
      <button class="spotify-big-control secondary" id="spotifyNext" type="button" aria-label="Nächstes Lied">${spotifyIcons.next}</button>
    </div>
  `;
  appScreen.appendChild(bigPlayer);

  spotifyPlayer = player;
  spotifyBigPlayer = bigPlayer;
  spotifyPlayerSurface = document.getElementById('spotifyPlayerSurface');
  spotifyAudio = document.getElementById('spotifyAudio');
  spotifyPlayerCover = document.getElementById('spotifyPlayerCover');
  spotifyPlayerTitle = document.getElementById('spotifyPlayerTitle');
  spotifyPlayerArtist = document.getElementById('spotifyPlayerArtist');
  spotifyPlayerProgressFill = document.getElementById('spotifyPlayerProgressFill');
  spotifySmallPlayPause = document.getElementById('spotifySmallPlayPause');
  spotifyBigClose = document.getElementById('spotifyBigClose');
  spotifyBigCover = document.getElementById('spotifyBigCover');
  spotifyBigTitle = document.getElementById('spotifyBigTitle');
  spotifyBigArtist = document.getElementById('spotifyBigArtist');
  spotifySeek = document.getElementById('spotifySeek');
  spotifyCurrentTime = document.getElementById('spotifyCurrentTime');
  spotifyDuration = document.getElementById('spotifyDuration');
  spotifyPlayPause = document.getElementById('spotifyPlayPause');
  spotifyPrev = document.getElementById('spotifyPrev');
  spotifyNext = document.getElementById('spotifyNext');

  spotifyAudio.addEventListener('timeupdate', () => {
    const progressPercent = spotifyAudio.duration ? (spotifyAudio.currentTime / spotifyAudio.duration) * 100 : 0;
    if (spotifyPlayerProgressFill) spotifyPlayerProgressFill.style.width = `${progressPercent}%`;
    if (spotifySeek && spotifyAudio.duration) spotifySeek.value = String(progressPercent);
    if (topSheetSeek && spotifyAudio.duration) topSheetSeek.value = String(progressPercent);
    if (spotifyCurrentTime) spotifyCurrentTime.textContent = formatSpotifyTime(spotifyAudio.currentTime);
    if (topSheetCurrentTime) topSheetCurrentTime.textContent = formatSpotifyTime(spotifyAudio.currentTime);
    if (spotifyDuration) {
      const remaining = Math.max(0, spotifyAudio.duration - spotifyAudio.currentTime);
      spotifyDuration.textContent = `-${formatSpotifyTime(remaining)}`;
      if (topSheetDuration) topSheetDuration.textContent = `-${formatSpotifyTime(remaining)}`;
    }
  });

  spotifyAudio.addEventListener('loadedmetadata', () => {
    if (spotifyDuration) spotifyDuration.textContent = `-${formatSpotifyTime(spotifyAudio.duration)}`;
    if (topSheetDuration) topSheetDuration.textContent = `-${formatSpotifyTime(spotifyAudio.duration)}`;
    updateTopSheetState();
  });

  spotifyAudio.addEventListener('ended', () => {
    updateTopSheetState();
    playSpotifyTrack((spotifyCurrentIndex + 1) % spotifyTracks.length, true);
  });

  spotifyAudio.addEventListener('play', updateTopSheetState);
  spotifyAudio.addEventListener('pause', updateTopSheetState);

  spotifySeek.addEventListener('input', () => {
    if (!spotifyAudio.duration) return;
    spotifyAudio.currentTime = (Number(spotifySeek.value) / 100) * spotifyAudio.duration;
  });

  if (topSheetSeek) {
    topSheetSeek.addEventListener('input', () => {
      if (!spotifyAudio.duration) return;
      spotifyAudio.currentTime = (Number(topSheetSeek.value) / 100) * spotifyAudio.duration;
    });
  }

  spotifyPlayPause.addEventListener('click', () => {
    if (!spotifyAudio.src) {
      playSpotifyTrack(spotifyCurrentIndex, true);
      return;
    }
    if (spotifyAudio.paused) {
      spotifyAudio.muted = mediaVolume === 0;
      spotifyAudio.play();
      setSpotifyPlayPauseIcon(true);
      setSpotifySmallPlayPauseIcon(true);
      setTopSheetPlayPauseIcon(true);
    } else {
      spotifyAudio.pause();
      setSpotifyPlayPauseIcon(false);
      setSpotifySmallPlayPauseIcon(false);
      setTopSheetPlayPauseIcon(false);
    }
    updateTopSheetState();
  });

  if (spotifySmallPlayPause) {
    spotifySmallPlayPause.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!spotifyAudio.src) {
        playSpotifyTrack(spotifyCurrentIndex, true);
        return;
      }
      if (spotifyAudio.paused) {
        spotifyAudio.muted = mediaVolume === 0;
        spotifyAudio.play();
        setSpotifySmallPlayPauseIcon(true);
        setSpotifyPlayPauseIcon(true);
        setTopSheetPlayPauseIcon(true);
      } else {
        spotifyAudio.pause();
        setSpotifySmallPlayPauseIcon(false);
        setSpotifyPlayPauseIcon(false);
        setTopSheetPlayPauseIcon(false);
      }
      updateTopSheetState();
    });
  }

  if (spotifyPlayerSurface) {
    spotifyPlayerSurface.addEventListener('click', () => {
      setSpotifyBigPlayerVisible(true);
    });
  }

  if (spotifyBigClose) {
    spotifyBigClose.addEventListener('click', () => {
      setSpotifyBigPlayerVisible(false);
    });
  }

  spotifyPrev.addEventListener('click', () => {
    playSpotifyTrack((spotifyCurrentIndex - 1 + spotifyTracks.length) % spotifyTracks.length, true);
  });

  spotifyNext.addEventListener('click', () => {
    playSpotifyTrack((spotifyCurrentIndex + 1) % spotifyTracks.length, true);
  });

  if (topSheetPrev) {
    topSheetPrev.addEventListener('click', () => {
      playSpotifyTrack((spotifyCurrentIndex - 1 + spotifyTracks.length) % spotifyTracks.length, true);
    });
  }

  if (topSheetNext) {
    topSheetNext.addEventListener('click', () => {
      playSpotifyTrack((spotifyCurrentIndex + 1) % spotifyTracks.length, true);
    });
  }
}

function updateSpotifyActiveCard() {
  spotifyCards.forEach((card, index) => {
    card.classList.toggle('active', index === spotifyCurrentIndex);
  });
}

function playSpotifyTrack(index, autoplay = false) {
  buildSpotifyPlayer();
  if (!spotifyAudio) return;
  spotifyCurrentIndex = index;
  const track = spotifyTracks[index];
  setSpotifyPlayerVisible(spotifyView && spotifyView.classList.contains('active'));
  if (spotifyPlayerCover) spotifyPlayerCover.src = track.cover;
  if (spotifyPlayerTitle) spotifyPlayerTitle.textContent = track.title;
  if (spotifyPlayerArtist) spotifyPlayerArtist.textContent = track.artist;
  if (spotifyBigCover) spotifyBigCover.src = track.cover;
  setMarqueeText(spotifyBigTitle, track.title);
  setMarqueeText(spotifyBigArtist, track.artist);
  if (spotifyCurrentTime) spotifyCurrentTime.textContent = '0:00';
  if (spotifyDuration) spotifyDuration.textContent = '-0:00';
  if (spotifySeek) spotifySeek.value = '0';
  if (spotifyPlayerProgressFill) spotifyPlayerProgressFill.style.width = '0%';
  requestAnimationFrame(() => {
    refreshMarquee(spotifyBigTitle);
    refreshMarquee(spotifyBigArtist);
  });
  updateSpotifyActiveCard();
  spotifyAudio.pause();
  spotifyAudio.removeAttribute('src');
  spotifyAudio.load();
  const candidates = getSpotifyAudioSources(track.src);
  let candidateIndex = 0;

  const tryCandidate = () => {
    if (candidateIndex >= candidates.length) {
      if (spotifyPlayerTitle) spotifyPlayerTitle.textContent = 'Datei nicht gefunden / nicht abspielbar';
      if (spotifyPlayerArtist) spotifyPlayerArtist.textContent = track.title;
      setMarqueeText(spotifyBigTitle, 'Datei nicht gefunden / nicht abspielbar');
      setMarqueeText(spotifyBigArtist, track.title);
      requestAnimationFrame(() => {
        refreshMarquee(spotifyBigTitle);
        refreshMarquee(spotifyBigArtist);
      });
      setSpotifyPlayPauseIcon(false);
      setSpotifySmallPlayPauseIcon(false);
      setTopSheetPlayPauseIcon(false);
      updateTopSheetState();
      return;
    }

    const source = candidates[candidateIndex++];
    let resolved = false;
    let fallbackTimeout = null;

    const cleanupCandidateListeners = () => {
      if (fallbackTimeout) window.clearTimeout(fallbackTimeout);
      spotifyAudio.removeEventListener('error', onError);
      spotifyAudio.removeEventListener('canplay', onReady);
      spotifyAudio.removeEventListener('loadedmetadata', onReady);
      spotifyAudio.removeEventListener('loadeddata', onReady);
    };

    const onError = () => {
      if (resolved) return;
      cleanupCandidateListeners();
      tryCandidate();
    };

    const onReady = () => {
      if (resolved) return;
      resolved = true;
      cleanupCandidateListeners();
      spotifyAudio.muted = mediaVolume === 0;
      spotifyAudio.volume = mediaVolume;
      if (autoplay) {
        const playPromise = spotifyAudio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.then(() => {
            setSpotifyPlayPauseIcon(true);
            setSpotifySmallPlayPauseIcon(true);
            setTopSheetPlayPauseIcon(true);
            updateTopSheetState();
          }).catch(() => {
            setSpotifyPlayPauseIcon(false);
            setSpotifySmallPlayPauseIcon(false);
            setTopSheetPlayPauseIcon(false);
            updateTopSheetState();
          });
        } else {
          setSpotifyPlayPauseIcon(true);
          setSpotifySmallPlayPauseIcon(true);
          setTopSheetPlayPauseIcon(true);
          updateTopSheetState();
        }
      } else {
        setSpotifyPlayPauseIcon(false);
        setSpotifySmallPlayPauseIcon(false);
        setTopSheetPlayPauseIcon(false);
        updateTopSheetState();
      }
    };

    spotifyAudio.addEventListener('error', onError, { once: true });
    spotifyAudio.addEventListener('canplay', onReady, { once: true });
    spotifyAudio.addEventListener('loadedmetadata', onReady, { once: true });
    spotifyAudio.addEventListener('loadeddata', onReady, { once: true });
    spotifyAudio.src = source;
    spotifyAudio.load();
    fallbackTimeout = window.setTimeout(onError, 8000);
  };

  tryCandidate();
}

function stopSpotifyPlayback() {
  if (!spotifyAudio) return;
  spotifyAudio.pause();
  spotifyAudio.currentTime = 0;
  if (spotifySeek) spotifySeek.value = '0';
  if (spotifyCurrentTime) spotifyCurrentTime.textContent = '0:00';
  setSpotifyPlayPauseIcon(false);
  setSpotifySmallPlayPauseIcon(false);
  setTopSheetPlayPauseIcon(false);
  if (spotifyPlayerProgressFill) spotifyPlayerProgressFill.style.width = '0%';
  setSpotifyBigPlayerVisible(false);
  setSpotifyPlayerVisible(false);
  updateTopSheetState();
}

function initSpotifyInteractions() {
  spotifyCards.forEach((card, index) => {
    card.dataset.trackIndex = String(index);
    card.addEventListener('click', (e) => {
      e.preventDefault();
      playSpotifyTrack(index, true);
    });
  });

  if (topSheetToggle) {
    topSheetToggle.addEventListener('click', () => {
      if (!spotifyAudio) return;
      if (!spotifyAudio.src) {
        playSpotifyTrack(spotifyCurrentIndex, true);
        return;
      }
      if (spotifyAudio.paused) {
        spotifyAudio.muted = mediaVolume === 0;
        const playPromise = spotifyAudio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
        setSpotifyPlayPauseIcon(true);
        setSpotifySmallPlayPauseIcon(true);
        setTopSheetPlayPauseIcon(true);
      } else {
        spotifyAudio.pause();
        setSpotifyPlayPauseIcon(false);
        setSpotifySmallPlayPauseIcon(false);
        setTopSheetPlayPauseIcon(false);
      }
      updateTopSheetState();
    });
  }
}

initSpotifyInteractions();
