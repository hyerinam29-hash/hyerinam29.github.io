// 다크/라이트 모드 토글 기능

(function () {
  console.log('[Theme] 테마 시스템 초기화 시작');

  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // 저장된 테마 불러오기 (없으면 시스템 설정 사용)
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  console.log('[Theme] 초기 테마 설정:', initialTheme);

  // 초기 테마 적용
  html.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);

  // 테마 토글 버튼 클릭 이벤트
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      console.log('[Theme] 테마 변경:', currentTheme, '→', newTheme);

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);

      // Giscus 테마도 변경 (게시글 페이지에서)
      updateGiscusTheme(newTheme);
    });
  }

  // 테마 아이콘 업데이트
  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Giscus 테마 업데이트
  function updateGiscusTheme(theme) {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
      const giscusTheme = theme === 'dark' ? 'dark' : 'light';
      console.log('[Theme] Giscus 테마 변경:', giscusTheme);
      giscusFrame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme } } },
        'https://giscus.app',
      );
    }
  }

  // 시스템 테마 변경 감지
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        console.log('[Theme] 시스템 테마 변경 감지:', newTheme);
        html.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
        updateGiscusTheme(newTheme);
      }
    });

  console.log('[Theme] 테마 시스템 초기화 완료');
})();

