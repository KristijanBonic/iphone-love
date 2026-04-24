async function startCamera() {
  if (!cameraView || !cameraPreview || !navigator.mediaDevices?.getUserMedia) {
    if (cameraEmpty) cameraEmpty.hidden = false;
    return;
  }

  if (cameraStream) {
    cameraPreview.srcObject = cameraStream;
    if (cameraEmpty) cameraEmpty.hidden = true;
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    });
    cameraPreview.srcObject = cameraStream;
    if (cameraEmpty) cameraEmpty.hidden = true;
    cameraPreflightDone = true;
    localStorage.setItem(startupCameraAllowedKey, 'true');
  } catch (error) {
    if (cameraEmpty) cameraEmpty.hidden = false;
  }
}

async function requestStartupPermissions() {
  if (startupPermissionAsked) return;
  startupPermissionAsked = true;
  localStorage.setItem(startupPermissionsKey, 'true');

  try {
    await startCamera();
  } catch (error) {
    // ignore startup camera denial
  }

  spotifyAccessGranted = true;
  localStorage.setItem(startupSpotifyAllowedKey, 'true');
}

function stopCamera() {
  if (!cameraStream) return;
  cameraStream.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  if (cameraPreview) cameraPreview.srcObject = null;
}

function initCameraInteractions() {
  if (cameraShutter) {
    cameraShutter.addEventListener('click', () => {
      showLoveAlert('Du bist wunderschön. Deine braunen Augen haben so eine tiefe, beruhigende Magie, dein Haar ist einfach perfekt und deine Bäckchen machen dein Lächeln nur noch schöner. Und dieses Lächeln… es bringt alles zum Strahlen.');
    });
  }
}

initCameraInteractions();
