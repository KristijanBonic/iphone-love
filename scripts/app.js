function closeTopSheet() {
    if (!topSheet) return;
    topSheet.classList.remove('active');
    topSheet.style.display = 'none';
    topSheet.style.opacity = '0';
    topSheet.style.pointerEvents = 'none';
    topSheet.style.transform = 'translateY(-100%)';
    if (phoneScreen) phoneScreen.classList.remove('top-sheet-open');
  }

  function switchAnimatedPanel(container, selector, targetPanel) {
    if (!container || !targetPanel) return;
    const currentPanel = container.querySelector(`${selector}.active`);
    if (currentPanel === targetPanel) return;

    if (currentPanel) {
      currentPanel.classList.remove('entering');
      currentPanel.classList.add('leaving');
      window.setTimeout(() => {
        currentPanel.classList.remove('active', 'leaving');
      }, 220);
    }

    targetPanel.classList.remove('leaving');
    targetPanel.classList.add('active', 'entering');
    window.setTimeout(() => {
      targetPanel.classList.remove('entering');
    }, 300);
  }

  function openAppScreenAnimated() {
    if (!appScreen) return;
    phoneScreen?.classList.add('app-opening');
    appScreen.classList.remove('closing');
    appScreen.classList.add('active');
    window.setTimeout(() => {
      phoneScreen?.classList.remove('app-opening');
    }, 360);
  }

  function closeAppScreenAnimated() {
    if (!appScreen) return;
    appScreen.classList.remove('active');
    appScreen.classList.add('closing');
    phoneScreen?.classList.remove('app-opening');
    window.setTimeout(() => {
      resetAppViews();
      appScreen.classList.remove('closing');
    }, 320);
  }

  function canOpenTopSheet() {
    return Boolean(
      topSheet &&
      phoneScreen &&
      !phoneScreen.classList.contains('is-off') &&
      lockscreen &&
      lockscreen.classList.contains('hidden')
    );
  }

  function toggleTopSheet() {
    if (!canOpenTopSheet()) return;
    updateTopSheetState();
    const shouldOpen = !topSheet.classList.contains('active');
    if (shouldOpen) {
      topSheet.style.display = 'block';
      topSheet.style.opacity = '1';
      topSheet.style.pointerEvents = 'auto';
      topSheet.style.transform = 'translateY(0)';
      topSheet.classList.add('active');
      if (phoneScreen) phoneScreen.classList.add('top-sheet-open');
      return;
    }
    closeTopSheet();
  }
  if (photoViewer && appScreen) {
    appScreen.appendChild(photoViewer);
  }

  let modalActions = document.getElementById('modalActions');
  let modalAgree = document.getElementById('modalAgree');
  let modalDecline = document.getElementById('modalDecline');
  let declineStep = 0;
  const declineSizes = ['100%', '82%', '64%', '46%', '28%', '0%'];

  function resetModalChoices() {
    declineStep = 0;
    if (!modalDecline) return;

    modalDecline.classList.remove('is-hidden');
    modalDecline.style.width = declineSizes[0];
    modalDecline.style.minWidth = declineSizes[0];
    modalDecline.style.flex = '0 0 ' + declineSizes[0];
  }

  function closeLoveModal() {
    if (loveModal) loveModal.classList.remove('active');
    const textBox = document.getElementById('modalText');
    if (textBox) textBox.textContent = defaultModalText;
    resetModalChoices();
  }

  if (!modalActions && loveModalBox) {
    modalActions = document.createElement('div');
    modalActions.className = 'modal-actions';
    modalActions.id = 'modalActions';

    modalAgree = document.createElement('button');
    modalAgree.className = 'modal-action';
    modalAgree.id = 'modalAgree';
    modalAgree.type = 'button';
    modalAgree.textContent = 'Zustimmen';

    modalDecline = document.createElement('button');
    modalDecline.className = 'modal-action secondary';
    modalDecline.id = 'modalDecline';
    modalDecline.type = 'button';
    modalDecline.textContent = 'Nicht zustimmen';

    modalActions.appendChild(modalAgree);
    modalActions.appendChild(modalDecline);
    loveModalBox.appendChild(modalActions);
  }

  if (modalAgree) {
    modalAgree.addEventListener('click', closeLoveModal);
  }

  if (modalDecline) {
    modalDecline.addEventListener('click', () => {
      declineStep = Math.min(declineStep + 1, declineSizes.length - 1);
      const nextSize = declineSizes[declineStep];

      if (nextSize === '0%') {
        modalDecline.classList.add('is-hidden');
        modalDecline.style.width = '';
        modalDecline.style.minWidth = '';
        modalDecline.style.flex = '';
        return;
      }

      modalDecline.style.width = nextSize;
      modalDecline.style.minWidth = nextSize;
      modalDecline.style.flex = '0 0 ' + nextSize;
    });
  }

  resetModalChoices();
  function updateRelationshipTimer() {
    const startDate = new Date('2026-02-06T00:00:00');
    const now = new Date();
    const diff = Math.max(0, now - startDate);
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalDays = Math.floor(totalSeconds / 86400);

    let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    if (now.getDate() < startDate.getDate()) totalMonths -= 1;
    totalMonths = Math.max(0, totalMonths);
    const totalYears = Math.floor(totalMonths / 12);

    const formatWholeNumber = (value) => value.toLocaleString('de-DE');

    if (countYears) countYears.textContent = formatWholeNumber(totalYears);
    if (countMonths) countMonths.textContent = formatWholeNumber(totalMonths);
    if (countDays) countDays.textContent = formatWholeNumber(totalDays);
    if (countHours) countHours.textContent = formatWholeNumber(totalHours);
    if (countMinutes) countMinutes.textContent = formatWholeNumber(totalMinutes);
    if (countSeconds) countSeconds.textContent = formatWholeNumber(totalSeconds);
  }

  function updateDateTime() {
    const now = new Date();
    const timeText = now.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const dateText = now.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });

    liveTimes.forEach((el) => {
      el.textContent = timeText;
    });

    if (liveTimeLarge) liveTimeLarge.textContent = timeText;
    liveDates.forEach((el) => {
      el.textContent = dateText.charAt(0).toUpperCase() + dateText.slice(1);
    });
  }

  function renderDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('filled', index < input.length);
    });
  }

  function unlock() {
    if (phoneScreen) phoneScreen.classList.remove('is-off');
    lockscreen.classList.add('hidden');
    homescreen.classList.add('active');
    closeTopSheet();
    syncStatusbarMode();
    localStorage.setItem('unlocked', 'true');
  }

  function wakePhone() {
    if (phoneScreen) {
      phoneScreen.classList.add('is-waking');
      phoneScreen.classList.remove('is-off');
      setTimeout(() => {
        phoneScreen.classList.remove('is-waking');
      }, 260);
    }
    resetInput(false);
    homescreen.classList.remove('active');
    lockscreen.classList.remove('hidden');
    appScreen.classList.remove('active');
    appScreen.classList.remove('closing');
    closeTopSheet();
    resetAppViews();
    syncStatusbarMode();
  }

  function powerOffScreen() {
    resetInput(false);
    homescreen.classList.remove('active');
    lockscreen.classList.remove('hidden');
    appScreen.classList.remove('active');
    appScreen.classList.remove('closing');
    closeTopSheet();
    resetAppViews();
    if (phoneScreen) {
      phoneScreen.classList.remove('is-waking');
      phoneScreen.classList.add('is-off');
    }
    syncStatusbarMode();
    localStorage.removeItem('unlocked');
  }

  function lockPhone() {
    powerOffScreen();
  }

  function syncStatusbarMode() {
    const statusbar = document.querySelector('.statusbar');
    if (!statusbar) return;

    statusbar.classList.toggle('lock-mode', !lockscreen.classList.contains('hidden'));
  }

  function showErrorHint() {
    if (lockCopy) {
      lockCopy.textContent = 'Tipp! Das Passwort hat was mit eurem Jahrestag zu tun!';
      lockCopy.style.color = '#ff3b30';
    }
    hintEl.textContent = '';
    hintEl.style.color = 'white';
    lockCard.classList.remove('shake');
    void lockCard.offsetWidth;
    lockCard.classList.add('shake');
  }

  function resetHint() {
    if (lockCopy) {
      lockCopy.textContent = 'Gib dein Passwort ein, um den Homescreen zu öffnen.';
      lockCopy.style.color = 'white';
    }
    hintEl.textContent = '';
    hintEl.style.color = 'white';
  }

  function resetInput(showError = false) {
    input = '';
    renderDots();
    if (showError) {
      showErrorHint();
    } else {
      resetHint();
    }
  }

  function addNumber(num) {
    if (input.length >= 4) return;
    input += num;
    if (hintEl.style.color === 'rgb(255, 59, 48)') resetHint();
    renderDots();

    if (input.length === 4) {
      setTimeout(() => {
        if (input === correctPin) {
          unlock();
        } else {
          resetInput(true);
        }
      }, 180);
    }
  }

  function showLoveAlert(customText) {
    const textBox = document.getElementById('modalText');
    if (customText && textBox) textBox.textContent = customText;
    if (!customText && textBox) textBox.textContent = defaultModalText;
    if (!loveModal) return;

    resetModalChoices();
    loveModal.classList.add('active');
  }

  function formatCalcValue(value) {
    if (!Number.isFinite(value)) return '8';
    const normalized = Math.abs(value) % 1 === 0 ? String(value) : String(parseFloat(value.toFixed(8)));
    return normalized.replace('.', ',');
  }

  function syncCalculatorDisplay() {
    if (calcResult) calcResult.textContent = calcSpecialMessage || calcCurrent.replace('.', ',');

    if (!calcExpression) return;
    if (calcSpecialMessage) {
      calcExpression.innerHTML = '6 + 2';
      return;
    }

    if (calcStored !== null && calcOperator) {
      const preview = formatCalcValue(calcStored) + ' ' + calcOperator.replace('*', '×').replace('/', '÷').replace('-', '-');
      calcExpression.innerHTML = preview;
      return;
    }

    calcExpression.innerHTML = '&nbsp;';
  }

  function clearCalculator() {
    calcCurrent = '0';
    calcStored = null;
    calcOperator = null;
    calcWaitingForNext = false;
    calcSpecialMessage = '';
    syncCalculatorDisplay();
  }

  function appendCalcDigit(digit) {
    if (calcSpecialMessage) {
      clearCalculator();
    }

    if (calcWaitingForNext) {
      calcCurrent = digit === '.' ? '0.' : digit;
      calcWaitingForNext = false;
      syncCalculatorDisplay();
      return;
    }

    if (digit === '.') {
      if (calcCurrent.includes('.')) return;
      calcCurrent += '.';
      syncCalculatorDisplay();
      return;
    }

    calcCurrent = calcCurrent === '0' ? digit : calcCurrent + digit;
    syncCalculatorDisplay();
  }

  function runCalcOperation(first, second, operator) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return second === 0 ? Infinity : first / second;
    return second;
  }

  function chooseCalcOperator(nextOperator) {
    if (calcSpecialMessage) {
      calcSpecialMessage = '';
      calcCurrent = '0';
      calcStored = null;
      calcOperator = null;
      calcWaitingForNext = false;
    }

    const currentNumber = parseFloat(calcCurrent);

    if (calcOperator && !calcWaitingForNext && calcStored !== null) {
      calcStored = runCalcOperation(calcStored, currentNumber, calcOperator);
      calcCurrent = formatCalcValue(calcStored).replace(',', '.');
    } else if (calcStored === null) {
      calcStored = currentNumber;
    }

    calcOperator = nextOperator;
    calcWaitingForNext = true;
    syncCalculatorDisplay();
  }

  function calculateResult() {
    if (calcOperator === null || calcStored === null) return;

    const currentNumber = parseFloat(calcCurrent);
    if (calcStored === 6 && currentNumber === 2 && calcOperator === '+') {
      calcCurrent = '8';
      calcStored = null;
      calcOperator = null;
      calcWaitingForNext = true;
      calcSpecialMessage = 'wir für immer und ewig';
      syncCalculatorDisplay();
      return;
    }

    const result = runCalcOperation(calcStored, currentNumber, calcOperator);

    calcSpecialMessage = '';
    calcCurrent = formatCalcValue(result).replace(',', '.');
    calcStored = null;
    calcOperator = null;
    calcWaitingForNext = true;
    syncCalculatorDisplay();
  }

  function toggleCalcSign() {
    if (calcSpecialMessage) return;
    if (calcCurrent === '0') return;
    calcCurrent = calcCurrent.startsWith('-') ? calcCurrent.slice(1) : '-' + calcCurrent;
    syncCalculatorDisplay();
  }

  function percentCalc() {
    if (calcSpecialMessage) return;
    const value = parseFloat(calcCurrent) / 100;
    calcCurrent = formatCalcValue(value).replace(',', '.');
    syncCalculatorDisplay();
  }
  function resetAppViews() {
    if (photosView) photosView.classList.remove('active');
    if (safariView) safariView.style.display = 'none';
    if (spotifyView) spotifyView.classList.remove('active');
    setSpotifyBigPlayerVisible(false);
    setSpotifyPlayerVisible(false);
    if (timerView) timerView.classList.remove('active');
    if (weatherView) weatherView.classList.remove('active');
    if (calculatorView) calculatorView.classList.remove('active');
    if (tiktokView) tiktokView.classList.remove('active');
    if (cameraView) cameraView.classList.remove('active');
    if (mailView) mailView.classList.remove('active');
    if (bookingView) bookingView.classList.remove('active');
    if (phoneView) phoneView.classList.remove('active');
    if (messagesView) messagesView.classList.remove('active');
    if (mapView) mapView.style.display = 'none';
    showBookingPage('home');
    if (photoViewer) {
      photoViewer.classList.remove('active');
      photoViewer.classList.remove('show-placeholder');
      photoViewer.classList.remove('contain-image');
    }
    if (photoViewerImage) {
      photoViewerImage.src = '';
      photoViewerImage.alt = 'Vollbild Foto';
    }
    if (photoViewerPlaceholder) {
      photoViewerPlaceholder.textContent = '';
    }
    stopCamera();
    closeCallOverlay();
    closeTopSheet();
    document.querySelectorAll('.tiktok-media').forEach((videoEl) => videoEl.pause());
    closeTikTokComments();
    showSafariHome();
  }
  document.addEventListener('keydown', (e) => {
    if (/^[0-9]$/.test(e.key)) addNumber(e.key);
    if (e.key === 'Backspace') {
      input = input.slice(0, -1);
      renderDots();
      if (!input.length) resetHint();
    }
    if (e.key === 'Enter' && input === correctPin) unlock();
  });

  // immer beim Sperrbildschirm starten
localStorage.removeItem('unlocked');

  function initTime() {
    updateDateTime();
    syncStatusbarMode();
    powerOffScreen();
    setTimeout(() => {
      requestStartupPermissions();
    }, 350);
  }
  setTimeout(initTime, 300);

  setInterval(() => {
    updateDateTime();
    updateRelationshipTimer();
  }, 1000);
  updateRelationshipTimer();

  apps.forEach((app) => {
    app.addEventListener('click', () => {
      const name = app.querySelector('.label')?.textContent || 'App';
      if (!homescreen.classList.contains('active')) return;

      resetAppViews();
      if (name === 'Fotos') photosView.classList.add('active');
      if (name === 'Safari') safariView.style.display = 'block';
      if (name === 'Spotify') {
        spotifyView.classList.add('active');
        setSpotifyBigPlayerVisible(false);
        setSpotifyPlayerVisible(Boolean(spotifyAudio && spotifyAudio.src));
      }
      if (name === 'Uhr') timerView.classList.add('active');
      if (name === 'Wetter') weatherView.classList.add('active');
      if (name === 'Rechner') calculatorView.classList.add('active');
      if (name === 'Mail') mailView.classList.add('active');
      if (name === 'Booking.com') bookingView.classList.add('active');
      if (name === 'TikTok') {
        stopSpotifyPlayback();
        tiktokView.classList.add('active');
        setTikTokTopTab('foryou');
        setTikTokNav('home');
        setTimeout(playVisibleTikTokVideo, 120);
      }
      if (name === 'Kamera') {
        cameraView.classList.add('active');
        startCamera();
      }
      if (name === 'Anruf') {
        stopSpotifyPlayback();
        phoneView.classList.add('active');
      }
      if (name === 'Instagram') messagesView.classList.add('active');
      if (name === 'Wo ist?') mapView.style.display = 'block';

      openAppScreenAnimated();
    });
  });
  if (calcGrid) {
    calcGrid.addEventListener('click', (e) => {
      const button = e.target.closest('.calc-btn');
      if (!button) return;

      const digit = button.dataset.calcDigit;
      const action = button.dataset.calcAction;
      const operator = button.dataset.calcOp;

      if (digit) {
        appendCalcDigit(digit);
        return;
      }

      if (operator) {
        chooseCalcOperator(operator);
        return;
      }

      if (action === 'clear') {
        clearCalculator();
        return;
      }

      if (action === 'toggle-sign') {
        toggleCalcSign();
        return;
      }

      if (action === 'percent') {
        percentCalc();
        return;
      }

      if (action === 'equals') {
        calculateResult();
      }
    });
  }
  if (volumeUpButton) {
    volumeUpButton.addEventListener('click', () => adjustMediaVolume(0.1));
  }

  if (volumeDownButton) {
    volumeDownButton.addEventListener('click', () => adjustMediaVolume(-0.1));
  }

  if(modalClose){
    modalClose.addEventListener('click', ()=>{
      if(loveModal) loveModal.classList.remove('active');
      const textBox = document.getElementById('modalText');
      if(textBox) textBox.textContent = 'HEY! du brauchst niemanden anrufen du hast deinen super tollen Freund Kristijan \uD83D\uDC97';
    });
  }
  initializeSafariContent();
  initializeMapContent();
  initializePhotosContent();
  initializeBookingContent();
  buildSpotifyPlayer();
  playSpotifyTrack(0, false);
  applyMediaVolume();
  renderTikTokFeed();
  clearCalculator();
  showSafariHome();
  renderPhone('favoriten');

  homeBar.addEventListener('click', () => {
    closeAppScreenAnimated();
  });

  if (lockButton) {
    lockButton.addEventListener('click', lockPhone);
  }

  if (screenOff) {
    screenOff.addEventListener('click', wakePhone);
    screenOff.addEventListener('touchstart', wakePhone, { passive: true });
  }

  dynamicIslands.forEach((island) => {
    island.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTopSheet();
    });
    island.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleTopSheet();
    }, { passive: false });
  });
  if (topSheet) {
    topSheet.addEventListener('click', (e) => e.stopPropagation());
  }

  appScreen.classList.remove('active');
  appScreen.classList.remove('closing');
