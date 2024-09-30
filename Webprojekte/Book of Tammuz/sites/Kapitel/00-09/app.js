// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');

  // Setze sicher, dass alle Dropdowns beim Seitenaufruf ausgeblendet sind
  const dropdowns = document.querySelectorAll('.dropdown-content');
  dropdowns.forEach(dropdown => {
    dropdown.style.display = 'none';

    // Teile die Menüpunkte auf zwei Spalten auf
    const items = Array.from(dropdown.children);
    const halfway = Math.ceil(items.length / 2);

    // Erstelle zwei Spalten-Container
    const col1 = document.createElement('div');
    const col2 = document.createElement('div');
    col1.style.display = 'inline-block';
    col2.style.display = 'inline-block';
    col1.style.width = '50%';
    col2.style.width = '50%';

    // Füge die erste Hälfte der Elemente in die erste Spalte ein
    items.slice(0, halfway).forEach(item => {
      col1.appendChild(item);
    });

    // Füge die zweite Hälfte der Elemente in die zweite Spalte ein
    items.slice(halfway).forEach(item => {
      col2.appendChild(item);
    });

    // Leere das Dropdown und füge die beiden Spalten hinzu
    dropdown.innerHTML = '';
    dropdown.appendChild(col1);
    dropdown.appendChild(col2);
  });

  dropdownBtns.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      event.preventDefault(); // Verhindert die Standardaktion des Links
      const dropdownContent = btn.nextElementSibling;

      if (dropdownContent.style.display === 'block') {
        // Ausblenden mit Slide-Up-Effekt
        dropdownContent.style.maxHeight = '0'; // Schließe das Dropdown mit Animation
        setTimeout(() => {
          dropdownContent.style.display = 'none'; // Verstecke es nach der Animation
        }, 500); // Warte bis die Animation fertig ist (entspricht der transition-Dauer im CSS)
      } else {
        // Einblenden mit Slide-Down-Effekt
        dropdownContent.style.display = 'block'; // Zeige das Menü
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px'; // Maximalhöhe auf den Inhalt setzen für Slide-Down
      }
    });
  });

  // Schließt das Dropdown, wenn außerhalb geklickt wird
  document.addEventListener('click', function(event) {
    dropdownBtns.forEach(function(btn) {
      const dropdownContent = btn.nextElementSibling;
      if (!btn.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.maxHeight = '0'; // Slide-Up-Animation
        setTimeout(() => {
          dropdownContent.style.display = 'none'; // Display auf 'none' setzen nach der Animation
        }, 500); // Warte, bis die Animation abgeschlossen ist
      }
    });
  });

  // 1. Smooth Scrolling for Internal Links
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    });
  }

  // 3. Scroll-Triggered Fade-In Effect for sections
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    for (const section of sections) {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight - 100) {
        section.classList.add('visible');
      }
    }
  });



  // 4. Hero Text Glow Effect on Hover
  const heroText = document.querySelector('.hero-content h2');
  heroText.addEventListener('mouseover', function() {
    heroText.classList.add('glow');
  });
  heroText.addEventListener('mouseout', function() {
    heroText.classList.remove('glow');
  });

});


// Scroll triggered fade-in effect CSS class
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 3s ease, transform 3s ease;
    }

    section {
      opacity: 0;
      transform: translateY(20px);
    }

    .glow {
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5);
    }

    .occult-symbol {
      position: fixed;
      font-size: 3em;
      color: rgba(255, 255, 255, 0.8);
      animation: fadeInOut 3s forwards;
    }

    @keyframes fadeInOut {
      0% { opacity: 0; transform: scale(0); }
      25% { opacity: 1; transform: scale(1.2); }
      50% { opacity: 1; }
      75% { opacity: 0.5; }
      100% { opacity: 0; transform: scale(0); }
    }
  </style>
`);



document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('playPause');
  const muteUnmuteBtn = document.getElementById('muteUnmute');
  const seekBar = document.getElementById('seekBar');

  // Versuche das Autoplay zu aktivieren
  audio.play().catch(function(error) {
    // Falls das Autoplay blockiert wird, kannst du hier eine Meldung anzeigen oder andere Maßnahmen ergreifen
    console.log('Autoplay wurde blockiert.');
  });

  // Play/Pause-Funktion
  playPauseBtn.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
      playPauseBtn.classList.add('playing');
    } else {
      audio.pause();
      playPauseBtn.classList.remove('playing');
    }
  });

  // Mute/Unmute-Funktion
  muteUnmuteBtn.addEventListener('click', function () {
    if (audio.muted) {
      audio.muted = false;
      muteUnmuteBtn.classList.remove('muted');
    } else {
      audio.muted = true;
      muteUnmuteBtn.classList.add('muted');
    }
  });

  // Fortschrittsleiste aktualisieren
  audio.addEventListener('timeupdate', function () {
    const value = (audio.currentTime / audio.duration) * 100;
    seekBar.value = value;
  });

  // Fortschrittsleiste für den Benutzer
  seekBar.addEventListener('input', function () {
    const time = (seekBar.value / 100) * audio.duration;
    audio.currentTime = time;
  });
});
