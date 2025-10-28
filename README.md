# hyerinam29-hash's Blog

GitHub Pages로 만든 정적 블로그입니다.

## 🚀 특징

- ✨ **순수 HTML/CSS/JavaScript** - 빌드 과정 없음
- 📝 **마크다운 지원** - marked.js를 이용한 클라이언트 사이드 렌더링
- 🎨 **다크/라이트 모드** - 시스템 설정에 따라 자동 전환
- 🔍 **검색 기능** - 실시간 클라이언트 검색
- 🏷️ **태그 및 카테고리** - 게시글 필터링
- 💻 **코드 하이라이팅** - Prism.js 지원
- 💬 **Giscus 댓글** - GitHub Discussions 기반
- 📱 **반응형 디자인** - 모바일 최적화

## 📁 디렉토리 구조

```
/
├── index.html              # 메인 페이지 (게시글 목록)
├── post.html               # 게시글 상세 페이지
├── css/
│   ├── style.css           # 메인 스타일
│   └── prism.css           # 코드 하이라이팅 테마
├── js/
│   ├── app.js              # 게시글 목록 로딩
│   ├── post-loader.js      # 마크다운 파싱
│   ├── search.js           # 검색 기능
│   └── theme.js            # 테마 토글
├── pages/                  # 마크다운 게시글 폴더
│   ├── example.md
│   └── welcome.md
├── .github/workflows/
│   └── generate-posts.yml  # posts.json 자동 생성
└── posts.json              # 게시글 메타데이터 (자동 생성)
```

## ✍️ 게시글 작성 방법

### 1. 마크다운 파일 생성

`pages/` 폴더에 `.md` 파일을 생성합니다:

```markdown
---
title: '게시글 제목'
date: 2025-01-26
tags: ['JavaScript', 'Web']
category: 'Development'
description: '게시글 설명'
---

# 제목

본문 내용...
```

### 2. Git으로 푸시

```bash
git add pages/your-post.md
git commit -m "feat: Add new post"
git push origin main
```

### 3. 자동 배포

- GitHub Actions가 자동으로 `posts.json`을 생성
- GitHub Pages가 자동으로 배포
- 배포 완료 후 https://hyerinam29-hash.github.io 에서 확인

## 🔧 GitHub Pages 설정

### 1. 저장소 생성

저장소 이름을 `hyerinam29-hash.github.io`로 생성합니다.

### 2. GitHub Pages 활성화

1. 저장소 **Settings** > **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` 선택, 폴더는 `/ (root)` 선택
4. **Save** 클릭

### 3. Discussions 활성화 (Giscus 댓글용)

1. 저장소 **Settings** > **General** > **Features**
2. **Discussions** 체크박스 활성화

## 💬 Giscus 댓글 설정

### 1. Giscus 앱 설치

1. https://github.com/apps/giscus 접속
2. **Install** 클릭
3. 이 저장소 선택 후 설치

### 2. Giscus 설정

1. https://giscus.app/ko 접속
2. **저장소**: `hyerinam29-hash/hyerinam29-hash.github.io` 입력
3. 설정:
   - **매핑**: `pathname`
   - **카테고리**: `General`
   - **테마**: `preferred_color_scheme`
4. 생성된 코드에서 `data-repo-id`와 `data-category-id` 복사

### 3. 코드에 적용

`js/post-loader.js` 파일의 `loadGiscus()` 함수에서 다음 값을 변경:

```javascript
script.setAttribute('data-repo-id', 'YOUR_REPO_ID'); // 복사한 값으로 변경
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); // 복사한 값으로 변경
```

### 4. 변경사항 커밋

```bash
git add js/post-loader.js
git commit -m "feat: Configure Giscus comments"
git push origin main
```

## 🎨 커스터마이징

### 색상 변경

`css/style.css` 파일의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --accent: #0066cc;
  /* ... */
}
```

### 폰트 변경

`css/style.css`의 `body` 선택자에서 `font-family`를 변경:

```css
body {
  font-family: 'Your Font', sans-serif;
}
```

## 📝 라이선스

MIT License

---

Made with ❤️ by hyerinam29-hash

