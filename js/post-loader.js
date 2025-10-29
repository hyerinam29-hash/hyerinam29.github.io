// 게시글 상세 페이지 - 마크다운 로딩 및 파싱

(function () {
  console.log('[PostLoader] 게시글 로더 초기화 시작');

  // URL에서 slug 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  console.log('[PostLoader] 요청된 게시글 slug:', slug);

  if (!slug) {
    console.error('[PostLoader] slug가 없습니다');
    showError('게시글을 찾을 수 없습니다.');
    return;
  }

  // 게시글 로드
  loadPost(slug);

  async function loadPost(slug) {
    console.log('[PostLoader] 게시글 로드 시작:', slug);

    try {
      // 마크다운 파일 로드
      const response = await fetch(`pages/${slug}.md`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const markdown = await response.text();
      console.log('[PostLoader] 마크다운 로드 완료:', markdown.length, '글자');

      // Front Matter 파싱
      const { frontMatter, content } = parseFrontMatter(markdown);
      console.log('[PostLoader] Front Matter 파싱 완료:', frontMatter);

      // HTML로 변환
      const html = marked.parse(content);
      console.log('[PostLoader] HTML 변환 완료');

      // 페이지에 렌더링
      renderPost(frontMatter, html);

      // 코드 하이라이팅 적용
      Prism.highlightAll();
      console.log('[PostLoader] 코드 하이라이팅 적용 완료');

      // Giscus 댓글 로드
      loadGiscus();
    } catch (error) {
      console.error('[PostLoader] 게시글 로드 실패:', error);
      showError('게시글을 불러올 수 없습니다.');
    }
  }

  // Front Matter 파싱
  function parseFrontMatter(markdown) {
    console.log('[PostLoader] Front Matter 파싱 시작');

    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);

    if (!match) {
      console.warn('[PostLoader] Front Matter가 없습니다');
      return { frontMatter: {}, content: markdown };
    }

    const frontMatterText = match[1];
    const content = match[2];

    // YAML 파싱 (간단한 파서)
    const frontMatter = {};
    const lines = frontMatterText.split('\n');

    lines.forEach((line) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return;

      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // 따옴표 제거
      value = value.replace(/^['"]|['"]$/g, '');

      // 배열 처리 (예: tags: ['JavaScript', 'Web'])
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
      }

      frontMatter[key] = value;
    });

    console.log('[PostLoader] Front Matter 파싱 결과:', frontMatter);
    return { frontMatter, content };
  }

  // 게시글 렌더링
  function renderPost(frontMatter, html) {
    console.log('[PostLoader] 게시글 렌더링 시작');

    // 제목
    const title = frontMatter.title || '제목 없음';
    document.getElementById('post-title').textContent = title;
    document.getElementById('article-title').textContent = title;

    // 설명
    if (frontMatter.description) {
      document
        .getElementById('post-description')
        .setAttribute('content', frontMatter.description);
    }

    // 날짜
    if (frontMatter.date) {
      const dateElement = document.getElementById('article-date');
      dateElement.setAttribute('datetime', frontMatter.date);
      dateElement.textContent = formatDate(frontMatter.date);
    }

    // 카테고리
    if (frontMatter.category) {
      const categoryElement = document.getElementById('article-category');
      categoryElement.textContent = frontMatter.category;
    }

    // 태그
    if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
      const tagsContainer = document.getElementById('article-tags');
      tagsContainer.innerHTML = frontMatter.tags
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join('');
    }

    // 본문
    document.getElementById('article-content').innerHTML = html;

    console.log('[PostLoader] 게시글 렌더링 완료');
  }

  // 날짜 포맷팅
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Giscus 댓글 시스템 로드
  function loadGiscus() {
    console.log('[PostLoader] Giscus 댓글 시스템 로드 시작');

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'hyerinam29-hash/hyerinam29.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOQKgWAw'); // GitHub API에서 조회한 실제 repo node_id
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); // Discussions 활성화 후 실제 category ID로 교체하세요
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '1');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', getCurrentTheme());
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    document.getElementById('giscus-container').appendChild(script);

    console.log('[PostLoader] Giscus 스크립트 추가 완료');
  }

  // 현재 테마 가져오기
  function getCurrentTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? 'dark' : 'light';
  }

  // 에러 표시
  function showError(message) {
    document.getElementById('article-title').textContent = '오류';
    document.getElementById('article-content').innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
        <p>${message}</p>
        <p style="margin-top: 1rem;">
          <a href="index.html">← 목록으로 돌아가기</a>
        </p>
      </div>
    `;
  }

  console.log('[PostLoader] 게시글 로더 초기화 완료');
})();

