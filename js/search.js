// 검색 기능 (app.js에서 처리하지만, 향후 확장을 위해 별도 파일로 분리)

(function () {
  console.log('[Search] 검색 모듈 초기화');

  // 검색 기능은 app.js에서 구현되어 있습니다.
  // 향후 고급 검색 기능 (예: fuzzy search, 가중치 검색 등)을 추가할 수 있습니다.

  // 검색 하이라이트 기능 (선택사항)
  function highlightSearchTerm(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // 전역으로 내보내기 (필요시 사용)
  window.searchUtils = {
    highlightSearchTerm,
  };

  console.log('[Search] 검색 모듈 초기화 완료');
})();

