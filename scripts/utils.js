const correctPin = '0602';
let input = '';

const dots = Array.from(document.querySelectorAll('.dot'));
const hintEl = document.querySelector('.hint');
const lockCopy = document.getElementById('lockCopy');
const phoneScreen = document.getElementById('phoneScreen');
const screenOff = document.getElementById('screenOff');
const lockscreen = document.getElementById('lockscreen');
const homescreen = document.getElementById('homescreen');
const lockCard = document.getElementById('lockCard');
const dynamicIslands = document.querySelectorAll('.dynamic-island');

const apps = document.querySelectorAll('.app');
const appScreen = document.getElementById('appScreen');
const homeBar = document.getElementById('homeBar');
const liveTimes = document.querySelectorAll('.js-live-time');
const liveTimeLarge = document.querySelector('.js-live-time-large');
const liveDates = document.querySelectorAll('.js-live-date');

const photosView = document.getElementById('photosView');
const safariView = document.getElementById('safariView');
const spotifyView = document.getElementById('spotifyView');
const phoneView = document.getElementById('phoneView');
const messagesView = document.getElementById('messagesView');
const mapView = document.getElementById('mapView');
const mailView = document.getElementById('mailView');
const timerView = document.getElementById('timerView');
const weatherView = document.getElementById('weatherView');
const calculatorView = document.getElementById('calculatorView');
const tiktokView = document.getElementById('tiktokView');
const tiktokTopbar = tiktokView ? tiktokView.querySelector('.tiktok-topbar') : null;
const tiktokFeed = document.getElementById('tiktokFeed');
const tiktokFriendsPanel = document.getElementById('tiktokFriendsPanel');
const tiktokInboxPanel = document.getElementById('tiktokInboxPanel');
const tiktokProfilePanel = document.getElementById('tiktokProfilePanel');
const tiktokComments = document.getElementById('tiktokComments');
const tiktokCommentsList = document.getElementById('tiktokCommentsList');
const tiktokCommentsClose = document.getElementById('tiktokCommentsClose');
const tiktokShareToast = document.getElementById('tiktokShareToast');
const calcGrid = document.getElementById('calcGrid');
const calcExpression = document.getElementById('calcExpression');
const calcResult = document.getElementById('calcResult');
const cameraView = document.getElementById('cameraView');
const cameraPreview = document.getElementById('cameraPreview');
const cameraEmpty = document.getElementById('cameraEmpty');
const cameraShutter = document.getElementById('cameraShutter');
const bookingView = document.getElementById('bookingView');
const countDays = document.getElementById('countDays');
const countHours = document.getElementById('countHours');
const countMinutes = document.getElementById('countMinutes');
const countSeconds = document.getElementById('countSeconds');
const spotifyCards = document.querySelectorAll('.track-card');
const phoneTabs = document.querySelectorAll('.phone-tab');
const phoneContent = document.getElementById('phoneContent');
const callOverlay = document.getElementById('callOverlay');
const callStatus = document.getElementById('callStatus');
const callDuration = document.getElementById('callDuration');
const endCallButton = document.getElementById('endCallButton');
const callBeepAudio = document.getElementById('callBeepAudio');
const callAudio = document.getElementById('callAudio');
const loveModal = document.getElementById('loveModal');
const loveModalBox = document.querySelector('.love-modal-box');
const photoViewer = document.getElementById('photoViewer');
const photoViewerImage = document.getElementById('photoViewerImage');
const photoViewerPlaceholder = document.getElementById('photoViewerPlaceholder');
const photoViewerClose = document.getElementById('photoViewerClose');
const modalClose = document.getElementById('modalClose');
const lockButton = document.getElementById('lockButton');
const volumeUpButton = document.getElementById('volumeUpButton');
const volumeDownButton = document.getElementById('volumeDownButton');
const volumeHud = document.getElementById('volumeHud');
const volumeHudFill = document.getElementById('volumeHudFill');
const topSheet = document.getElementById('topSheet');
const topSheetCover = document.getElementById('topSheetCover');
const topSheetTitle = document.getElementById('topSheetTitle');
const topSheetArtist = document.getElementById('topSheetArtist');
const topSheetToggle = document.getElementById('topSheetToggle');
const topSheetPrev = document.getElementById('topSheetPrev');
const topSheetNext = document.getElementById('topSheetNext');
const topSheetSeek = document.getElementById('topSheetSeek');
const topSheetCurrentTime = document.getElementById('topSheetCurrentTime');
const topSheetDuration = document.getElementById('topSheetDuration');

const defaultModalText = 'HEY! du brauchst niemanden anrufen du hast deinen super tollen Freund Kristijan 💗';
const startupPermissionsKey = 'bk_startup_permissions_asked';
const startupCameraAllowedKey = 'bk_startup_camera_allowed';
const startupSpotifyAllowedKey = 'bk_startup_spotify_allowed';

let cameraStream = null;
let callTimeout = null;
let callDurationInterval = null;
let callStartTime = null;
let mediaVolume = 0.5;
let volumeHudTimeout = null;
let cameraPreflightDone = localStorage.getItem(startupCameraAllowedKey) === 'true';
let spotifyAccessGranted = localStorage.getItem(startupSpotifyAllowedKey) === 'true';
let startupPermissionAsked = localStorage.getItem(startupPermissionsKey) === 'true';
let calcCurrent = '0';
let calcStored = null;
let calcOperator = null;
let calcWaitingForNext = false;
let calcSpecialMessage = '';
let tiktokActiveTab = 'foryou';
let tiktokActiveNav = 'home';
let tiktokCommentVideoId = null;
let tiktokShareToastTimer = null;
const tiktokPausedVideos = new Set();

function formatSpotifyTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function syncVolumeHud() {
  if (volumeHudFill) volumeHudFill.style.height = `${Math.round(mediaVolume * 100)}%`;
}

function applyMediaVolume() {
  document.querySelectorAll('audio, video').forEach((mediaEl) => {
    if (mediaEl.id === 'cameraPreview') return;
    mediaEl.volume = mediaVolume;
    mediaEl.muted = mediaVolume === 0;
  });

  syncVolumeHud();
}

function showVolumeHud() {
  syncVolumeHud();
  if (!volumeHud) return;
  volumeHud.classList.add('active');
  if (volumeHudTimeout) clearTimeout(volumeHudTimeout);
  volumeHudTimeout = setTimeout(() => {
    volumeHud.classList.remove('active');
  }, 3000);
}

function adjustMediaVolume(delta) {
  if (phoneScreen?.classList.contains('is-off')) return;
  const nextVolume = Math.max(0, Math.min(1, Math.round((mediaVolume + delta) * 10) / 10));
  if (nextVolume === mediaVolume) {
    showVolumeHud();
    return;
  }
  mediaVolume = nextVolume;
  applyMediaVolume();
  showVolumeHud();
}

function getLocalAssetUrl(assetPath) {
  const normalized = assetPath.replace(/^\.\//, '');
  try {
    return new URL(normalized, window.location.href).href;
  } catch (error) {
    return assetPath;
  }
}

function getDocumentAssetUrl(assetPath) {
  const normalized = assetPath.replace(/^\.\//, '');
  try {
    return new URL(normalized, document.baseURI).href;
  } catch (error) {
    return assetPath;
  }
}
