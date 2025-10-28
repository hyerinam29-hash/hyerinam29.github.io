// 메인 페이지 - 게시글 목록 로딩 및 필터링

(function () {
  console.log('[App] 메인 애플리케이션 초기화 시작');

  let allPosts = [];
  let filteredPosts = [];
  let activeCategory = null;
  let activeTags = new Set();

  // DOM 요소
  const postsContainer = document.getElementById('posts-container');
  const categoryFilter = document.getElementById('category-filter');
  const tagFilter = document.getElementById('tag-filter');
  const searchInput = document.getElementById('search-input');

  // 게시글 목록 로드
  async function loadPosts() {
    console.log('[App] 게시글 목록 로드 시작');
    try {
      const response = await fetch('posts.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      allPosts = await response.json();
      console.log('[App] 게시글 로드 완료:', allPosts.length, '개');

      // 날짜순 정렬 (최신순)
      allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

      filteredPosts = [...allPosts];
      renderFilters();
      renderPosts();
    } catch (error) {
      console.error('[App] 게시글 로드 실패:', error);
      postsContainer.innerHTML = `
        <div class="no-posts">
          <p>게시글을 불러올 수 없습니다.</p>
          <p style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
            posts.json 파일이 없거나 형식이 잘못되었습니다.
          </p>
        </div>
      `;
    }
  }

  // 필터 UI 렌더링
  function renderFilters() {
    console.log('[App] 필터 UI 렌더링');

    // 카테고리 추출
    const categories = [...new Set(allPosts.map((post) => post.category))];
    console.log('[App] 카테고리 목록:', categories);

    categoryFilter.innerHTML = '';
    categories.forEach((category) => {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.textContent = category;
      tag.addEventListener('click', () => toggleCategory(category));
      categoryFilter.appendChild(tag);
    });

    // 태그 추출
    const tags = [
      ...new Set(allPosts.flatMap((post) => post.tags || [])),
    ].sort();
    console.log('[App] 태그 목록:', tags);

    tagFilter.innerHTML = '';
    tags.forEach((tag) => {
      const tagElement = document.createElement('span');
      tagElement.className = 'filter-tag';
      tagElement.textContent = tag;
      tagElement.addEventListener('click', () => toggleTag(tag));
      tagFilter.appendChild(tagElement);
    });
  }

  // 카테고리 필터 토글
  function toggleCategory(category) {
    console.log('[App] 카테고리 필터 토글:', category);

    if (activeCategory === category) {
      activeCategory = null;
    } else {
      activeCategory = category;
    }

    updateFilterUI();
    applyFilters();
  }

  // 태그 필터 토글
  function toggleTag(tag) {
    console.log('[App] 태그 필터 토글:', tag);

    if (activeTags.has(tag)) {
      activeTags.delete(tag);
    } else {
      activeTags.add(tag);
    }

    updateFilterUI();
    applyFilters();
  }

  // 필터 UI 업데이트
  function updateFilterUI() {
    // 카테고리 active 클래스
    categoryFilter.querySelectorAll('.filter-tag').forEach((tag) => {
      if (tag.textContent === activeCategory) {
        tag.classList.add('active');
      } else {
        tag.classList.remove('active');
      }
    });

    // 태그 active 클래스
    tagFilter.querySelectorAll('.filter-tag').forEach((tag) => {
      if (activeTags.has(tag.textContent)) {
        tag.classList.add('active');
      } else {
        tag.classList.remove('active');
      }
    });
  }

  // 필터 적용
  function applyFilters() {
    const searchQuery = searchInput.value.toLowerCase().trim();
    console.log('[App] 필터 적용 - 카테고리:', activeCategory, '태그:', [...activeTags], '검색:', searchQuery);

    filteredPosts = allPosts.filter((post) => {
      // 카테고리 필터
      if (activeCategory && post.category !== activeCategory) {
        return false;
      }

      // 태그 필터 (OR 조건)
      if (activeTags.size > 0) {
        const hasMatchingTag = post.tags?.some((tag) => activeTags.has(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      // 검색 필터
      if (searchQuery) {
        const searchableText = `${post.title} ${post.description} ${post.tags?.join(' ')}`.toLowerCase();
        if (!searchableText.includes(searchQuery)) {
          return false;
        }
      }

      return true;
    });

    console.log('[App] 필터링 결과:', filteredPosts.length, '개 게시글');
    renderPosts();
  }

  // 게시글 목록 렌더링
  function renderPosts() {
    console.log('[App] 게시글 목록 렌더링:', filteredPosts.length, '개');

    if (filteredPosts.length === 0) {
      postsContainer.innerHTML = '<p class="no-posts">게시글이 없습니다.</p>';
      return;
    }

    postsContainer.innerHTML = filteredPosts
      .map(
        (post) => `
      <article class="post-card">
        <h2><a href="post.html?slug=${post.slug}">${post.title}</a></h2>
        <div class="post-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          ${post.category ? `<span class="category-badge">${post.category}</span>` : ''}
        </div>
        ${post.description ? `<p class="post-description">${post.description}</p>` : ''}
        ${post.tags && post.tags.length > 0 ? `
          <div class="post-tags">
            ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </article>
    `,
      )
      .join('');
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

  // 검색 이벤트
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // 초기화
  loadPosts();

  console.log('[App] 메인 애플리케이션 초기화 완료');
})();

