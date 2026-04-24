function initializeSafariContent() {
  if (!safariView) return;

  safariView.innerHTML = `
    <div style="background:linear-gradient(180deg, rgba(90, 33, 63, 0.50), rgba(58, 18, 40, 0.36));border:1px solid rgba(255,255,255,0.14);border-radius:24px;padding:14px 12px;box-shadow:0 16px 30px rgba(92, 28, 61, 0.24);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);">
      <div id="safariHome">
        <div style="display:flex;justify-content:center;align-items:center;margin-bottom:14px;">
          <img src="https://kristijanbonic.github.io/iphone-love/images/safari/safari_google.jpg" alt="Safari Google" style="width:132px;max-width:70%;height:auto;display:block;">
        </div>
        <div style="background:linear-gradient(180deg, rgba(104, 38, 73, 0.48), rgba(67, 22, 47, 0.34));border-radius:16px;padding:10px 12px;font-size:14px;color:rgba(255,255,255,0.88);box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);">
          <div id="safariSearch" style="cursor:pointer;">Google durchsuchen</div>
        </div>
        <div style="margin-top:12px;font-size:13px;color:rgba(255,255,255,0.78);font-weight:600;">Letzte Suchen</div>
        <div style="margin-top:8px;display:grid;gap:8px;">
          <button class="safari-item" type="button" data-safari-page="friend-awesome">Warum bist du so toll?</button>
          <button class="safari-item" type="button" data-safari-page="friend-gallery">Bilder von meinem wundersch&ouml;nen Freund</button>
          <button class="safari-item" type="button" data-safari-page="why-love-him">Die beste Caillou folge</button>
          <button class="safari-item" type="button" data-safari-page="pink-ranger">Pinker Power Ranger</button>
        </div>
      </div>

      <div class="safari-page" id="safariPage-friend-awesome">
        <button class="safari-back" type="button">Zur&uuml;ck</button>
        <div class="safari-card">
          <div class="safari-title">Warum bist du so toll?</div>
          <div class="safari-text">
            Du bist toll, weil du du bist. Es ist schwer zu beschreiben, weil einfach alles an dir so perfekt ist
            und ich nichts &auml;ndern w&uuml;rde. Aber wenn ich sagen m&uuml;sste, was ich toll an dir finde, w&uuml;sste ich nicht,
            wo ich richtig anfangen soll, weil:
          </div>
          <ul class="safari-list">
            <li>du so eine s&uuml;&szlig;e Art hast: Wenn du dich &uuml;ber etwas freust, l&auml;chelst du so wundersch&ouml;n, h&uuml;pfst so s&uuml;&szlig; rum, deine B&auml;ckchen sehen so s&uuml;&szlig; aus und deine wundersch&ouml;nen Augen werden ganz gro&szlig;</li>
            <li>du so ein lebensfroher Mensch bist, der in jeder Situation versucht, etwas Gutes zu sehen und positiv zu bleiben, und mit deiner verr&uuml;ckt lustigen Art alle zum L&auml;cheln bringst und gl&uuml;cklich machst mit deinem LALALALALALA im Kopf</li>
            <li>du so wundersch&ouml;ne Ziele und Tr&auml;ume hast und sie mit aller Kraft verfolgst, &uuml;ber sie redest und f&uuml;r sie k&auml;mpfst</li>
            <li>du so ein liebevoller, liebenswerter Mensch bist, der voller Liebe ist und sooo viel Liebe gibt und sooo vieeel Liebe verdient</li>
            <li>man sich mit dir wie zuhause f&uuml;hlt (f&uuml;r mich bist du mein Zuhause)</li>
            <li>du an kleine Details denkst und damit einem eine Freude machst</li>
            <li>du Menschen zeigst, wie wichtig sie dir sind, und das so toll mit kleinen Dingen machst, die ich merke, sehe und unendlich sch&auml;tze</li>
          </ul>
          <div class="safari-text" style="margin-top:14px;">
            Du bist einfach ein wundervoller, toller, s&uuml;&szlig;er, lebensfroher, perfekter Mensch, so wie du bist.
            Und egal, was wer sagen sollte: Ich liebe dich so, wie du bist. Ich k&ouml;nnte noch unendlich lange
            erz&auml;hlen, wie toll du bist und was ich alles an dir toll finde, aber daf&uuml;r habe ich jeden Tag Zeit,
            es dir zu sagen.
          </div>
        </div>
      </div>

      <div class="safari-page" id="safariPage-friend-gallery">
        <button class="safari-back" type="button">Zur&uuml;ck</button>
        <div class="safari-card">
          <div class="safari-title">Bilder von meinem wundersch&ouml;nen Freund</div>
        </div>
        <div class="safari-gallery">
          <div class="safari-photo-slot"><img src="https://kristijanbonic.github.io/iphone-love/images/safari/safari_bild-1.jpg" alt="Wundersch&ouml;ner Freund Bild 1"></div>
          <div class="safari-photo-slot"><img src="https://kristijanbonic.github.io/iphone-love/images/safari/safari_bild-2.jpg" alt="Wundersch&ouml;ner Freund Bild 2"></div>
          <div class="safari-photo-slot"><img src="https://kristijanbonic.github.io/iphone-love/images/safari/safari_bild-3.jpg" alt="Wundersch&ouml;ner Freund Bild 3"></div>
          <div class="safari-photo-slot"><img src="https://kristijanbonic.github.io/iphone-love/images/safari/safari_bild-4.jpg" alt="Wundersch&ouml;ner Freund Bild 4"></div>
        </div>
      </div>

      <div class="safari-page" id="safariPage-why-love-him">
        <button class="safari-back" type="button">Zur&uuml;ck</button>
        <div class="safari-card">
          <div class="safari-title">Die beste Caillou folge</div>
          <div class="safari-text" style="margin-bottom:12px;">
            Tippe auf das Video, um es zu starten oder zu pausieren.
          </div>
          <div style="border-radius:22px;overflow:hidden;background:linear-gradient(180deg, rgba(58, 18, 40, 0.62), rgba(90, 33, 63, 0.42));border:1px solid rgba(255,255,255,0.14);box-shadow:inset 0 1px 0 rgba(255,255,255,0.10), 0 16px 30px rgba(92, 28, 61, 0.24);">
            <video id="safariCaillouVideo" playsinline preload="metadata" style="width:100%;display:block;aspect-ratio:9 / 16;object-fit:cover;cursor:pointer;background:#2f1023;">
              <source src="https://kristijanbonic.github.io/iphone-love/images/safari/safari_video-1.mp4" type="video/mp4">
            </video>
          </div>
        </div>
      </div>

      <div class="safari-page" id="safariPage-pink-ranger">
        <button class="safari-back" type="button">Zur&uuml;ck</button>
        <div class="safari-card">
          <div class="safari-title">Pinker Power Ranger</div>
          <div class="ranger-photo">
            <img src="https://kristijanbonic.github.io/iphone-love/images/safari/safari-power_ranger.jpg" alt="Pinker Power Ranger">
          </div>
          <div class="safari-text" style="margin-top:12px;">
            Der pinke Power Ranger erinnert mich an dich, wie ein Schmetterling, der so besonders ist, dass er selbst nicht sieht, wie wundersch&ouml;n er eigentlich ist... genau wie du, mein Schmetterling.
          </div>
        </div>
      </div>
    </div>
  `;
}

function initializeMapContent() {
  if (!mapView) return;

  mapView.innerHTML = `
    <div style="width:100%;border-radius:28px;padding:22px;margin-bottom:16px;background:linear-gradient(180deg, rgba(90, 33, 63, 0.46), rgba(58, 18, 40, 0.34));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.14);box-shadow:0 16px 30px rgba(92, 28, 61, 0.24);">
      <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;margin-bottom:8px;">&#128149; Hier hat alles angefangen</div>
      <div style="font-size:26px;line-height:1.1;font-weight:700;margin-bottom:10px;letter-spacing:-0.03em;">Das erste Treffen &#10024;</div>
      <div style="font-size:14px;opacity:0.92;margin-bottom:18px;line-height:1.45;">Eine kleine Erinnerung an unser erstes Treffen und an einen Moment, der einfach nur uns zwei geh&ouml;rt. &#128149;</div>

      <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;margin-bottom:16px;">
        <div style="background:linear-gradient(180deg, rgba(90, 33, 63, 0.42), rgba(58, 18, 40, 0.30));border:1px solid rgba(255,255,255,0.14);border-radius:22px;padding:18px 10px;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);">
          <div style="font-size:24px;margin-bottom:6px;">&#128151;</div>
          <div style="font-size:12px;font-weight:700;opacity:0.92;">Unser Moment</div>
        </div>
        <div style="background:linear-gradient(180deg, rgba(90, 33, 63, 0.42), rgba(58, 18, 40, 0.30));border:1px solid rgba(255,255,255,0.14);border-radius:22px;padding:18px 10px;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);">
          <div style="font-size:24px;margin-bottom:6px;">&#128205;</div>
          <div style="font-size:12px;font-weight:700;opacity:0.92;">Nur wir zwei</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="background:linear-gradient(180deg, rgba(90, 33, 63, 0.42), rgba(58, 18, 40, 0.30));border:1px solid rgba(255,255,255,0.14);border-radius:22px;padding:12px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);"><div style="height:132px;border-radius:16px;overflow:hidden;"><img src="https://kristijanbonic.github.io/iphone-love/images/wo-ist/wo-ist_handelskai.jpg" alt="Handelskai" style="width:100%;height:100%;object-fit:cover;display:block;"></div></div>
        <div style="background:linear-gradient(180deg, rgba(90, 33, 63, 0.42), rgba(58, 18, 40, 0.30));border:1px solid rgba(255,255,255,0.14);border-radius:22px;padding:12px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);"><div style="height:132px;border-radius:16px;overflow:hidden;"><img src="https://kristijanbonic.github.io/iphone-love/images/wo-ist/wo-ist_spielehalle.jpg" alt="Spielehalle" style="width:100%;height:100%;object-fit:cover;display:block;"></div></div>
        <div style="background:linear-gradient(180deg, rgba(90, 33, 63, 0.42), rgba(58, 18, 40, 0.30));border:1px solid rgba(255,255,255,0.14);border-radius:22px;padding:12px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);"><div style="height:132px;border-radius:16px;overflow:hidden;"><img src="https://kristijanbonic.github.io/iphone-love/images/wo-ist/wo-ist_tanzen.jpg" alt="Tanzen" style="width:100%;height:100%;object-fit:cover;display:block;"></div></div>
        <div style="background:linear-gradient(180deg, rgba(90, 33, 63, 0.42), rgba(58, 18, 40, 0.30));border:1px solid rgba(255,255,255,0.14);border-radius:22px;padding:12px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);"><div style="height:132px;border-radius:16px;overflow:hidden;"><img src="https://kristijanbonic.github.io/iphone-love/images/wo-ist/wo-ist_bank.jpg" alt="Bank" style="width:100%;height:100%;object-fit:cover;display:block;"></div></div>
      </div>

      <button type="button" data-map-open style="display:block;width:100%;padding:14px 12px;border-radius:20px;background:linear-gradient(180deg, rgba(104, 38, 73, 0.50), rgba(67, 22, 47, 0.36));text-align:center;font-weight:700;color:white;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.12);cursor:pointer;">&#128205; Standort &ouml;ffnen</button>
      <div data-map-panel style="display:none;margin-top:12px;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,0.14);background:
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 26%),
        radial-gradient(circle at 78% 28%, rgba(255,255,255,0.14), transparent 24%),
        linear-gradient(135deg, rgba(246, 196, 219, 0.95), rgba(231, 153, 194, 0.92) 52%, rgba(199, 113, 162, 0.90));">
        <div style="position:relative;height:220px;overflow:hidden;">
          <div style="position:absolute;inset:0;opacity:0.28;background:
            linear-gradient(90deg, rgba(255,255,255,0.65) 0 10px, transparent 10px 58px),
            linear-gradient(rgba(255,255,255,0.6) 0 10px, transparent 10px 58px);
            background-size:58px 58px;"></div>
          <div style="position:absolute;left:-8%;top:50%;width:118%;height:16px;border-radius:999px;background:rgba(255,255,255,0.85);transform:rotate(-16deg);box-shadow:0 0 0 6px rgba(233,145,188,0.28);"></div>
          <div style="position:absolute;left:-6%;top:26%;width:112%;height:14px;border-radius:999px;background:rgba(255,255,255,0.78);transform:rotate(9deg);box-shadow:0 0 0 6px rgba(233,145,188,0.22);"></div>
          <div style="position:absolute;left:18%;top:-4%;width:14px;height:108%;border-radius:999px;background:rgba(255,255,255,0.72);transform:rotate(8deg);box-shadow:0 0 0 6px rgba(233,145,188,0.18);"></div>
          <div style="position:absolute;right:21%;top:-8%;width:14px;height:116%;border-radius:999px;background:rgba(255,255,255,0.72);transform:rotate(-6deg);box-shadow:0 0 0 6px rgba(233,145,188,0.18);"></div>
          <div style="position:absolute;left:50%;top:50%;transform:translate(-50%, -58%);display:flex;flex-direction:column;align-items:center;">
            <div style="font-size:34px;filter:drop-shadow(0 8px 14px rgba(126, 28, 76, 0.32));">&#128205;</div>
            <div style="margin-top:6px;padding:7px 10px;border-radius:14px;background:rgba(126, 28, 76, 0.78);color:white;font-size:12px;font-weight:700;backdrop-filter:blur(6px);">Unser erstes Treffen &#128149;</div>
          </div>
          <div style="position:absolute;left:12px;right:12px;bottom:12px;padding:10px 12px;border-radius:16px;background:rgba(126, 28, 76, 0.28);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.18);color:white;">
            <div style="font-size:12px;font-weight:700;opacity:0.92;margin-bottom:4px;">Handelskai, Wien</div>
            <div style="font-size:11px;opacity:0.82;">48.241394, 16.385046</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function showSafariHome() {
  const safariHome = document.getElementById('safariHome');
  const safariPages = document.querySelectorAll('.safari-page');

  stopSafariVideo();
  safariPages.forEach((page) => page.classList.remove('active', 'entering', 'leaving'));
  if (safariHome) safariHome.style.display = 'block';
}

function openSafariPage(pageId) {
  const safariHome = document.getElementById('safariHome');
  const targetPage = document.getElementById('safariPage-' + pageId);

  if (safariHome) safariHome.style.display = 'none';
  if (!targetPage || !safariView) return;
  switchAnimatedPanel(safariView, '.safari-page', targetPage);
}

function stopSafariVideo() {
  const safariCaillouVideo = document.getElementById('safariCaillouVideo');
  if (!safariCaillouVideo) return;
  safariCaillouVideo.pause();
  safariCaillouVideo.currentTime = 0;
}

function initSafariInteractions() {
  if (mapView) {
    mapView.addEventListener('click', (e) => {
      const mapButton = e.target.closest('[data-map-open]');
      if (!mapButton) return;

      e.preventDefault();
      e.stopPropagation();

      const mapCard = mapButton.closest('div[style], section, article') || mapView;
      const mapPanel = mapCard.querySelector('[data-map-panel]');
      if (!mapPanel) return;

      const isOpen = mapPanel.style.display === 'block';
      if (isOpen) {
        mapPanel.style.display = 'none';
        mapButton.textContent = mapButton.textContent.includes('schlie') ? '📍 Standort öffnen' : 'Standort öffnen';
        return;
      }

      mapPanel.style.display = 'block';
      mapButton.textContent = mapButton.textContent.includes('📍') ? '📍 Standort schließen' : 'Standort schließen';
    });
  }

  if (safariView) {
    safariView.addEventListener('click', (e) => {
      const searchButton = e.target.closest('#safariSearch');
      if (searchButton) {
        showLoveAlert('wonach willst du suchen du hast doch mit Kristijan schon alles wonach du gesucht hast!');
        return;
      }

      const safariItem = e.target.closest('[data-safari-page]');
      if (safariItem) {
        openSafariPage(safariItem.dataset.safariPage);
        return;
      }

      const backButton = e.target.closest('.safari-back');
      if (backButton) {
        showSafariHome();
        return;
      }

      const safariCaillouVideo = e.target.closest('#safariCaillouVideo');
      if (safariCaillouVideo) {
        if (safariCaillouVideo.paused) {
          safariCaillouVideo.play().catch(() => {});
        } else {
          safariCaillouVideo.pause();
        }
      }
    });
  }
}

initSafariInteractions();
