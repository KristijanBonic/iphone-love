function formatCallDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startCallDuration() {
  callStartTime = Date.now();
  if (callDuration) callDuration.textContent = '00:00';
  callDurationInterval = setInterval(() => {
    if (!callDuration || !callStartTime) return;
    const seconds = Math.floor((Date.now() - callStartTime) / 1000);
    callDuration.textContent = formatCallDuration(seconds);
  }, 1000);
}

function closeCallOverlay() {
  if (callTimeout) {
    clearTimeout(callTimeout);
    callTimeout = null;
  }
  if (callDurationInterval) {
    clearInterval(callDurationInterval);
    callDurationInterval = null;
  }
  callStartTime = null;
  if (callBeepAudio) {
    callBeepAudio.pause();
    callBeepAudio.currentTime = 0;
  }
  if (callAudio) {
    callAudio.pause();
    callAudio.currentTime = 0;
  }
  if (callStatus) callStatus.textContent = 'Anrufen…';
  if (callDuration) callDuration.textContent = '00:00';
  if (callOverlay) callOverlay.classList.remove('active');
}

function startKristijanCall() {
  if (callTimeout) clearTimeout(callTimeout);
  if (callDurationInterval) {
    clearInterval(callDurationInterval);
    callDurationInterval = null;
  }
  callStartTime = null;
  if (callBeepAudio) {
    callBeepAudio.pause();
    callBeepAudio.currentTime = 0;
    callBeepAudio.load();
    const beepPromise = callBeepAudio.play();
    if (beepPromise && typeof beepPromise.catch === 'function') {
      beepPromise.catch(() => {});
    }
  }
  if (callAudio) {
    callAudio.pause();
    callAudio.currentTime = 0;
    callAudio.load();
  }
  if (callStatus) callStatus.textContent = 'Verbinde…';
  if (callDuration) callDuration.textContent = '00:00';
  if (callOverlay) callOverlay.classList.add('active');

  callTimeout = setTimeout(() => {
    if (callBeepAudio) {
      callBeepAudio.pause();
      callBeepAudio.currentTime = 0;
    }
    if (callStatus) callStatus.textContent = 'Telefonat läuft…';
    startCallDuration();
    if (callAudio) {
      const playPromise = callAudio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          if (callStatus) callStatus.textContent = 'Audio konnte nicht gestartet werden';
        });
      }
    }
    callTimeout = null;
  }, 5000);
}

function renderPhone(tab) {
  phoneTabs.forEach((t) => t.classList.remove('active'));
  const activeTab = document.querySelector(`[data-tab="${tab}"]`);
  if (activeTab) activeTab.classList.add('active');

  if (tab === 'favoriten') {
    phoneContent.innerHTML = `
      <div class="phone-contact-card is-callable" data-phone-call="kristijan">
        <div class="phone-avatar"><img src="https://kristijanbonic.github.io/iphone-love/images/kontakte/kontakt-kristijan_bonic.jpg" alt="Kristijan Bonic"></div>
        <div class="phone-name">Kristijan Bonic</div>
        <div class="phone-sub">Favorit</div>
        <button class="phone-call-button" type="button" data-phone-call="kristijan">📞 Anrufen</button>
      </div>
    `;
    return;
  }

  if (tab === 'liste') {
    phoneContent.innerHTML = `
      <div class="call-list">
        <div class="call-row"><div class="call-left"><div class="call-icon"><img src="https://kristijanbonic.github.io/iphone-love/images/kontakte/kontakt-kristijan_bonic.jpg" alt="Kristijan Bonic"></div><div class="call-meta"><div class="call-name">Kristijan Bonic</div><div class="call-type">Ausgehend</div></div></div><div class="call-time">Heute</div></div>
        <div class="call-row"><div class="call-left"><div class="call-icon"><img src="https://kristijanbonic.github.io/iphone-love/images/kontakte/kontakt-kristijan_bonic.jpg" alt="Kristijan Bonic"></div><div class="call-meta"><div class="call-name">Kristijan Bonic</div><div class="call-type">Eingehend</div></div></div><div class="call-time">Gestern</div></div>
        <div class="call-row"><div class="call-left"><div class="call-icon"><img src="https://kristijanbonic.github.io/iphone-love/images/kontakte/kontakt-kristijan_bonic.jpg" alt="Kristijan Bonic"></div><div class="call-meta"><div class="call-name">Kristijan Bonic</div><div class="call-type">Ausgehend</div></div></div><div class="call-time">Mo</div></div>
      </div>
    `;
    return;
  }

  if (tab === 'kontakte') {
    phoneContent.innerHTML = `
      <div class="phone-contact-card is-callable" data-phone-call="kristijan">
        <div class="phone-avatar"><img src="https://kristijanbonic.github.io/iphone-love/images/kontakte/kontakt-kristijan_bonic.jpg" alt="Kristijan Bonic"></div>
        <div class="phone-name">Kristijan Bonic</div>
        <div class="phone-sub">Einziger Kontakt 💗</div>
        <button class="phone-call-button" type="button" data-phone-call="kristijan">📞 Anrufen</button>
      </div>
    `;
    return;
  }

  if (tab === 'ziffernblock') {
    const dialButtons = [
      { n: '1', s: '' }, { n: '2', s: 'ABC' }, { n: '3', s: 'DEF' },
      { n: '4', s: 'GHI' }, { n: '5', s: 'JKL' }, { n: '6', s: 'MNO' },
      { n: '7', s: 'PQRS' }, { n: '8', s: 'TUV' }, { n: '9', s: 'WXYZ' },
      { n: '*', s: '' }, { n: '0', s: '+' }, { n: '#', s: '' }
    ];

    phoneContent.innerHTML = `
      <div class="dial-display"></div>
      <div class="dialer">
        ${dialButtons.map((btn) => `
          <div class="dial-btn" data-digit="${btn.n}">
            <div style="display:flex;flex-direction:column;align-items:center;line-height:1;">
              <span style="font-size:28px;font-weight:500;">${btn.n}</span>
              <span style="font-size:10px;opacity:0.72;margin-top:4px;letter-spacing:0.08em;">${btn.s}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="dial-call-btn">📞</div>
    `;
  }
}

function initPhoneInteractions() {
  phoneTabs.forEach((tab) => {
    tab.addEventListener('click', () => renderPhone(tab.dataset.tab));
  });

  phoneContent.addEventListener('click', (e) => {
    const phoneCallCard = e.target.closest('[data-phone-call="kristijan"]');
    if (phoneCallCard) {
      startKristijanCall();
      return;
    }

    const digitBtn = e.target.closest('.dial-btn');
    if (digitBtn) {
      showLoveAlert();
      return;
    }

    const callBtn = e.target.closest('.dial-call-btn');
    if (callBtn) {
      showLoveAlert();
    }
  });

  if (endCallButton) {
    endCallButton.addEventListener('click', closeCallOverlay);
  }

  if (callAudio) {
    callAudio.addEventListener('ended', closeCallOverlay);
  }
}

initPhoneInteractions();
