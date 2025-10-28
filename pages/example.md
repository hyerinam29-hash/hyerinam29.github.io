---
title: 'GitHub Pages 블로그 시작하기'
date: 2025-01-26
tags: ['GitHub Pages', 'Blog', 'Markdown']
category: 'Tutorial'
description: 'GitHub Pages를 이용한 정적 블로그 만들기 첫 번째 게시글입니다.'
---

# GitHub Pages 블로그에 오신 것을 환영합니다!

이것은 **혜리의 블로그**입니다. `pages/` 폴더에 마크다운 파일을 추가하면 자동으로 블로그에 게시됩니다.

## 주요 기능

### 1. 마크다운 지원

일반적인 마크다운 문법을 모두 지원합니다:

- **굵은 글씨**
- *기울임 글씨*
- `인라인 코드`
- [링크](https://github.com)

### 2. 코드 하이라이팅

Prism.js를 사용한 아름다운 코드 하이라이팅:

```javascript
function greet(name) {
  console.log(`안녕하세요, ${name}님!`);
}

greet('개발자');
```

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

### 3. 다크 모드

우측 상단의 버튼을 클릭하면 다크/라이트 모드를 전환할 수 있습니다.

### 4. 검색 및 필터링

- 태그와 카테고리로 게시글 필터링
- 실시간 검색 기능

## 게시글 작성 방법

1. `pages/` 폴더에 `.md` 파일 생성
2. Front Matter 작성:

```markdown
---
title: '게시글 제목'
date: 2025-01-26
tags: ['태그1', '태그2']
category: 'Development'
description: '게시글 설명'
---

# 본문 내용...
```

3. Git으로 커밋 및 푸시
4. GitHub Actions가 자동으로 배포

## 인용구

> "좋은 코드는 그 자체가 최고의 문서다."
> - Steve McConnell

## 이미지

마크다운 이미지 문법도 지원합니다:

```markdown
![대체 텍스트](이미지-URL)
```

## 표

| 기능 | 지원 여부 |
|------|-----------|
| 마크다운 | ✅ |
| 다크모드 | ✅ |
| 댓글 | ✅ (Giscus) |
| 검색 | ✅ |

## 수식 (선택사항)

필요시 KaTeX나 MathJax를 추가하여 수식도 표현할 수 있습니다.

---

이제 여러분만의 블로그를 만들어보세요! 🎉

