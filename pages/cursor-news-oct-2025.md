---
title: '2025년 10월 Cursor IDE 이슈 브리핑'
date: 2025-10-29
tags: ['Cursor IDE', '보안', '생산성', '업데이트']
category: 'News'
description: '10월에 발표된 Cursor IDE 보안 취약점 경고, 1.7 버전 업그레이드 가이드, 생산성 및 사업 성과 소식을 정리했습니다.'
---

# 2025년 10월 Cursor IDE 이슈 브리핑

2025년 10월, Cursor IDE는 보안 경고와 함께 새로운 버전 업그레이드, 생산성 보고 등 굵직한 소식이 이어졌습니다. 주요 내용을 한눈에 정리했습니다.

## 1. Chromium 기반 취약점 94건 노출

10월 21일, 보안 연구사 Ox Security는 Cursor와 Windsurf IDE가 **Chromium 및 V8 엔진의 알려진 취약점 94건**을 그대로 안고 있다고 발표했습니다. 연구팀은 `CVE-2025-7656` 정수 오버플로 취약점을 이용해 Cursor를 원격에서 크래시시키는 데 성공했고, 실제 공격에서는 임의 코드 실행도 가능하다고 경고했습니다. Cursor 측은 보고를 접수했지만 "자체 서비스 거부(DOS)는 범위 밖"이라는 답변을 내놓아 추가 대응이 필요하다는 지적이 나옵니다. [[BleepingComputer]](https://www.bleepingcomputer.com/news/security/cursor-windsurf-ides-riddled-with-94-plus-n-day-chromium-vulnerabilities/) [[Ox Security]](https://www.ox.security/blog/94-vulnerabilities-in-cursor-and-windsurf-put-1-8m-developers-at-risk/)

## 2. Cursor 1.7 업그레이드: 탭 모델과 보안 설정 강화

10월 1일에 공개된 비교 가이드에 따르면 Cursor 1.7은 1.6 대비 다음과 같은 개선 사항을 제공합니다. [[Skywork.ai]](https://skywork.ai/blog/cursor-1-7-vs-1-6-2025-comparison-upgrade-guide/)

- **탭 모델 개선**: 문맥 전환 속도가 빨라지고, 긴 세션에서도 답변 품질이 유지됩니다.
- **Background Agents**: 반복 태스크를 백그라운드에서 처리해 IDE UI를 차단하지 않습니다.
- **보안 설정**: 다운로드, 데이터 사용 정책이 재정비되어 기업 환경에서 활용하기 쉬워졌습니다.

업그레이드 가이드는 팀/엔터프라이즈 사용자가 업데이트 전 사내 Electron 버전 관리와 플러그인 호환성을 점검할 것을 권장합니다.

## 3. 기업 채택과 생산성 지표 업데이트

동월 공개된 리포트에 따르면 Cursor는 **1초당 100만 개 이상의 쿼리**를 처리하며, 2024년 대비 100배 성장했습니다. 애니스피어는 9월 투자 라운드에서 **9억 달러 투자**와 **99억 달러 가치평가**를 기록했고, Cursor는 올해 GitHub Copilot의 연간 매출(5억 달러)에 근접할 것으로 전망됩니다. 오픈AI, 삼성, 미드저니, 퍼플렉시티, 쇼피파이 등이 Cursor를 기본 IDE로 사용 중이라는 점도 강조되었습니다. [[Grow-fast.co.uk]](https://www.grow-fast.co.uk/blog/cursor-ai-development-teams-shipping-3x-faster-october-2025)

이 보고서는 또한 5월에 도입된 요청 기반 통합 요금제를 재차 설명하며, Pro/Business/Enterprise 단계별 용량 및 관리 기능(관리자 제어, 사용량 분석, SSO/SCIM 지원)을 기업용 장점으로 꼽았습니다.

## 4. 개인정보 및 보안 공지 업데이트

Cursor 공식 보안 페이지는 10월 15일 이후 생성된 계정의 경우 **Share Data 모드**에서 프롬프트와 일부 텔레메트리를 OpenAI와 공유할 수 있다는 점을 명시했습니다. 반면 Privacy Mode에서는 여전히 **제로 데이터 보존** 협약을 유지합니다. 조직 차원에서는 계정 가입 시점·모드 설정을 확인해 데이터 거버넌스를 강화해야 합니다. [[Cursor Security]](https://cursor.com/security)

## 요약 및 대응 가이드

- **보안**: Electron/Chromium 업데이트가 지연된 환경에서 최신 패치를 적용하거나, 네트워크 제어 및 실행 정책을 강화해야 합니다.
- **업그레이드**: 1.7 버전은 에이전트 기능과 협업 워크플로 지원이 강화됐으므로 팀 생산성 향상을 노린다면 검토할 가치가 있습니다.
- **비즈니스**: 거대 기업의 채택과 새로운 가격 정책은 장기적으로 Cursor 생태계 확장을 시사합니다.
- **데이터 보호**: 조직 정책에 따라 Privacy Mode 적용과 업로드 가능한 데이터 범위를 정의해야 합니다.

## 참고 자료

- [Cursor, Windsurf IDEs riddled with 94+ n-day Chromium vulnerabilities](https://www.bleepingcomputer.com/news/security/cursor-windsurf-ides-riddled-with-94-plus-n-day-chromium-vulnerabilities/)
- [94 Vulnerabilities in Cursor and Windsurf Put 1.8M Developers at Risk](https://www.ox.security/blog/94-vulnerabilities-in-cursor-and-windsurf-put-1-8m-developers-at-risk/)
- [Cursor 1.7 vs 1.6 (2025): Upgrade Guide & Key Differences](https://skywork.ai/blog/cursor-1-7-vs-1-6-2025-comparison-upgrade-guide/)
- [How Development Teams Are Shipping 3x Faster in October 2025](https://www.grow-fast.co.uk/blog/cursor-ai-development-teams-shipping-3x-faster-october-2025)
- [Cursor Security](https://cursor.com/security)

*작성일: 2025년 10월 29일*
