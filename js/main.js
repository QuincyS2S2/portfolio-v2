// Portfolio ver.2 - main.js

// 화면 전환 (ikoka 만들 때 쓰던 방식)

function go(id) {
  document.querySelectorAll('.screen').forEach(function (screen) {
    screen.classList.remove('is-current');
  });
  document.getElementById(id).classList.add('is-current');
}

// 뒤로가기 : 이동할 때마다 pushState로 기록해두고 popstate에서 복원
function pushScreen(state) {
  // file://로 열면 pushState가 막힐 수 있어서 try로 감쌈
  try { history.pushState(state, ''); } catch (err) { }
}

function goHome(fromHistory) {
  go('screen-home');
  if (!fromHistory) pushScreen({ screen: 'home' });
}

function goAbout(fromHistory) {
  go('screen-about');
  markCategory('about');

  // 클래스 뗐다 붙여서 들어올 때마다 등장 모션 재생
  var screen = document.getElementById('screen-about');
  screen.classList.remove('is-entered');
  void screen.offsetHeight;
  screen.classList.add('is-entered');

  if (!fromHistory) pushScreen({ screen: 'about' });
}

window.addEventListener('popstate', function (e) {
  // 라이트박스 떠 있으면 뒤로가기 = 닫기
  var lightbox = document.getElementById('lightbox');
  if (lightbox.classList.contains('is-open')) {
    closeLightbox(true);
    return;
  }

  var state = e.state || { screen: 'home' };
  if (state.screen === 'carousel') {
    // 같은 카테고리면 재구성 안 함 (보던 슬라이드 유지)
    if (state.category === currentCategory &&
        document.getElementById('screen-carousel').classList.contains('is-current')) {
      return;
    }
    enterCategory(state.category, true);
  } else if (state.screen === 'about') {
    goAbout(true);
  } else {
    goHome(true);
  }
});

// 첫 화면(홈) 기록
try { history.replaceState({ screen: 'home' }, ''); } catch (err) { }

// 01.png ~ NN.png 처럼 번호가 규칙적이라 반복문으로 경로 생성
function pageList(prefix, count) {
  var list = [];
  for (var i = 1; i <= count; i++) {
    list.push(prefix + String(i).padStart(2, '0') + '.png');
  }
  return list;
}

// 프로젝트 데이터. id는 css 색상 매핑이랑 연결됨
// mock : display(모니터) / duo(모니터 2대) / phone(아이폰) / tablet(아이패드) / gallery / grid / marquee / none
const CATEGORIES = {
  web: [
    {
      // name은 슬라이드 제목, navName은 상단 네비/도트용 짧은 이름
      id: 'danawa', name: '[반응형] 다나와 리디자인 퍼블리싱', navName: '다나와 리디자인', title: 'DANAWA',
      story: '최저가 가격 비교 및 판매에 중점을 둔 기존의 다나와 사이트를 리디자인했습니다. 광고로 시선이 분산되는 레이아웃을 개선하고자 카테고리를 시각적으로 재분류하고, 단순 쇼핑몰을 넘어 커뮤니티의 장으로 기능하도록 구성했습니다. 전 화면을 반응형 웹으로 직접 퍼블리싱했습니다.',
      img: 'img/Work-Image/danawa/damawa main.png',
      mobileImg: 'img/Work-Image/danawa/mobile-mokup-2.png',
      mock: 'display',
      live: 'https://quincys2s2.github.io/DANAWA-re/',
      tools: ['html', 'css', 'js', 'github', 'figma'],
      duration: '7일',
      contribution: '개인 작업 · 퍼블리싱',
      links: [
        { label: '사이트로 이동', url: 'https://quincys2s2.github.io/DANAWA-re/' },
        { label: 'GitHub', url: 'https://github.com/QuincyS2S2/DANAWA-re' },
        { label: '기획서 PDF', url: 'pdf/danawa-plan.pdf' }
      ]
    },
    {
      id: 'anaider', name: '[반응형] 애나이더 수족관 퍼블리싱', navName: '애나이더 수족관', title: 'ANAIDER',
      story: '아쿠아리움 특유의 조명 빛이 감도는 어두운 공간 분위기를 살려 진행했습니다. 개장 전이라 부족했던 이미지 자료는 어도비 파이어플라이(Firefly)로 직접 생성해 사용했고, 반응형 웹으로 빠르게 퍼블리싱을 완성했습니다.',
      img: 'img/Work-Image/Anaider-Aquarium/Anaider-Aquarium main.png',
      mock: 'display',
      live: 'https://quincys2s2.github.io/Anaider-Aquarium/',
      tools: ['html', 'css', 'js', 'github', 'figma', 'gemini'],
      duration: '6시간 30분',
      contribution: '개인 작업 · 퍼블리싱',
      links: [
        { label: '사이트로 이동', url: 'https://quincys2s2.github.io/Anaider-Aquarium/' },
        { label: 'GitHub', url: 'https://github.com/QuincyS2S2/Anaider-Aquarium' },
        { label: '기획서 PDF', url: 'pdf/Anaider-Aquarium-plan.pdf' }
      ]
    },
    {
      id: 'kej', name: '[반응형] KEJ 퍼블리싱', navName: 'KEJ', title: 'KEEP EVERY JOY',
      story: "이름의 약자를 딴 AI 다이어리 앱 'KEJ'의 브랜드/다운로드 사이트입니다. 대화와 GPS 기반의 일상 기록, SNS 연동 기능을 담았고 커스터마이징 가능한 마스코트 캐릭터를 제작했습니다. 다이어리 감성에 맞춘 블랙 톤 화면 전체를 반응형으로 직접 퍼블리싱했습니다.",
      img: 'img/Work-Image/KEJ/KEJ main.png',
      mock: 'display',
      live: 'https://quincys2s2.github.io/KEJ/KEJ.html',
      tools: ['html', 'css', 'js', 'github', 'figma'],
      duration: '9일',
      contribution: '개인 작업 · 퍼블리싱',
      links: [
        { label: '사이트로 이동', url: 'https://quincys2s2.github.io/KEJ/KEJ.html' },
        { label: 'GitHub', url: 'https://github.com/QuincyS2S2/KEJ' },
        { label: '기획서 PDF', url: 'pdf/KEJ-plan.pdf' }
      ]
    },
    {
      id: 'etc', name: '스타벅스 · 한국장학재단 리디자인', navName: '리디자인', title: 'REDESIGN',
      story: '스타벅스는 브랜드 무드를 살린 UI 리디자인, 한국장학재단은 신뢰감을 주는 웹사이트 리디자인으로 진행했습니다. 두 작업 모두 퍼블리싱 없이 디자인 중심으로 진행했습니다.',
      mock: 'duo',
      imgs: [
        { src: 'img/Work-Image/Starbucks/main.png', alt: '스타벅스 리디자인' },
        { src: 'img/Work-Image/Scholarship Foundation/main.png', alt: '한국장학재단 리디자인' }
      ],
      live: null,
      tools: ['figma', 'ps'],
      duration: null,
      contribution: '개인 작업 · 디자인',
      links: [
        { label: '스타벅스 기획서', url: 'pdf/Starbucks-plan.pdf' },
        { label: '장학재단 기획서', url: 'pdf/Scholarship Foundation-plan.pdf' }
      ]
    }
  ],
  mobile: [
    {
      id: 'ikoka', name: 'IKOKA 모바일 퍼블리싱', navName: 'IKOKA', title: 'IKOKA',
      story: '일본어를 몰라도 AI 가이드의 도움을 받아 일정, 커뮤니티, 환전까지 이용할 수 있는 일본 전문 여행 어플리케이션입니다. 가독성을 최우선으로 디자인했고, 사용자 성향에 따라 동선을 짜주는 AI 캐릭터를 이미지 생성 모델로 구현했습니다.',
      img: 'img/Work-Image/ikoka/01.png',
      // hover하면 이 순서로 넘어감
      screens: [
        'img/Work-Image/ikoka/01.png',
        'img/Work-Image/ikoka/02.png',
        'img/Work-Image/ikoka/03.png',
        'img/Work-Image/ikoka/04.png',
        'img/Work-Image/ikoka/05.png',
        'img/Work-Image/ikoka/06.png'
      ],
      mock: 'phone',
      live: 'https://quincys2s2.github.io/ikoka/',
      tools: ['html', 'css', 'js', 'github', 'figma', 'claude'],
      duration: '9일',
      contribution: '개인 작업 · 퍼블리싱',
      links: [
        { label: '사이트로 이동', url: 'https://quincys2s2.github.io/ikoka/' },
        { label: 'GitHub', url: 'https://github.com/QuincyS2S2/ikoka' },
        { label: '기획서 PDF', url: 'pdf/IKOKA-plan.pdf' }
      ]
    },
    {
      id: 'yaksok', name: '약쏙', title: 'YAKSOK',
      story: "바쁜 현대인들을 위해 복약 시간 알람, 약물 간의 상호작용 체크, 남은 약물 개수 체크 기능을 제공하는 앱 서비스입니다. 멀리 떨어진 가족의 복약 상태도 함께 챙길 수 있도록 '가족 프로필 기능'을 도입했습니다. 2인 1조 팀 협업으로 진행되었습니다.",
      img: 'img/Work-Image/Yaksok/01.png',
      // 스플래시부터 핵심 화면 순서대로
      screens: [
        'img/Work-Image/Yaksok/01.png',
        'img/Work-Image/Yaksok/02.png',
        'img/Work-Image/Yaksok/20.png',
        'img/Work-Image/Yaksok/22.png',
        'img/Work-Image/Yaksok/35.png',
        'img/Work-Image/Yaksok/37.png',
        'img/Work-Image/Yaksok/39.png'
      ],
      mock: 'phone',
      live: null,
      tools: ['figma'],
      duration: '20일',
      contribution: '팀(2인) · 기여도 80% (발표 및 조합 메뉴, 커뮤니티 · 쇼핑 메뉴 일부 담당)',
      links: [
        { label: '피그마 프로토타입', url: 'https://www.figma.com/proto/IiDOrnzGCNRlJDXswMODk6/%EC%95%BD%EC%8F%99?node-id=0-1&t=Vc7gw926k8Pd7yUs-1' },
        { label: '기획서 PDF', url: 'pdf/yacksok-plan.pdf' }
      ]
    },
    {
      id: 'haedokje', name: '해독제', title: 'HAEDOKJE',
      story: "대기업을 포함한 많은 서비스가 일시불보다 구독제 판매를 선호하는 시대에 맞춰 기획했습니다. 사용자가 인지하지 못하고 새어나가는 구독 제품들을 일괄 관리하는 앱입니다. 구독 취소 솔루션을 제안하는 '구독 해지(解) 관리' 서비스입니다.",
      img: 'img/Work-Image/haedokje/01.png',
      // 스플래시부터 핵심 화면 순서대로
      screens: [
        'img/Work-Image/haedokje/01.png',
        'img/Work-Image/haedokje/03.png',
        'img/Work-Image/haedokje/09.png',
        'img/Work-Image/haedokje/10 (2).png',
        'img/Work-Image/haedokje/11 (3).png',
        'img/Work-Image/haedokje/11.png',
        'img/Work-Image/haedokje/12.png'
      ],
      mock: 'phone',
      live: null,
      tools: ['figma'],
      duration: '20일',
      contribution: '개인 작업 · 디자인',
      links: [
        { label: '피그마 프로토타입', url: 'https://www.figma.com/proto/Y39W6QtQZO8aYLPVmCGUEt/%ED%95%B4%EB%8F%85%EC%A0%9C_%EA%B9%80%EC%9D%80%EC%A7%80?node-id=54628-131&t=XTYcLN9XzilULfdo-1' },
        { label: '기획서 PDF', url: 'pdf/hedokje-plan.pdf' }
      ]
    }
  ],
  graphic: [
    {
      id: 'g-edit', name: '편집 디자인', title: 'EDITORIAL',
      story: '편집 디자인으로 진행한 결과물입니다. 책의 표지 및 내지, 제품 패키지를 제작했습니다. 화면을 클릭하면 크게 볼 수 있습니다.',
      mock: 'tablet',
      // 피그마로 재작업한 주요 11장 (2026-07-14, 3:2 가로 규격)
      screens: pageList('img/Work-Image/Graphics-pin/new/', 11),
      links: [
        { label: '전체 PDF 보기', url: 'pdf/sub-add/graphics.pdf' }
      ]
    },
    {
      id: 'g-package', name: '제품 패키지', title: 'PACKAGE',
      story: '제품 패키지 디자인 작업입니다. 상세 페이지(폰 목업)는 hover하면 흘러가고, 클릭하면 전체를 확대해 볼 수 있습니다.',
      mock: 'gallery',
      imgs: [
        'img/Work-Image/Graphics/Product Packaging01.png',
        'img/Work-Image/Graphics/Product Packaging02.png'
      ],
      // 폰에는 썸네일, 클릭 확대할 땐 원본(detail)
      detailThumb: 'img/Work-Image/Graphics/Detailed Product Design-thum.png',
      detail: 'img/Work-Image/Graphics/Detailed Product Design.png',
      live: null
    },
    {
      id: 'g-banner', name: '배너 광고', title: 'BANNER',
      story: '가로 · 세로 배너 광고 디자인 모음입니다.',
      mock: 'marquee',
      // 윗줄 가로 배너, 아랫줄 세로 배너 (서로 반대로 흐름)
      rows: [
        [
          'img/Work-Image/Graphics/Horizontal banner ad 01.png',
          'img/Work-Image/Graphics/Horizontal banner ad 02.png',
          'img/Work-Image/Graphics/Horizontal banner ad 03.png',
          'img/Work-Image/Graphics/Horizontal banner ad 04.png',
          'img/Work-Image/Graphics/Horizontal banner ad 05.png',
          'img/Work-Image/Graphics/Text ad horizontal 01.png',
          'img/Work-Image/Graphics/Text ad horizontal 02.png',
          'img/Work-Image/Graphics/Text ad horizontal 03.png'
        ],
        [
          'img/Work-Image/Graphics/Vertical banner ad 01.png',
          'img/Work-Image/Graphics/Vertical banner ad 02.png',
          'img/Work-Image/Graphics/Vertical banner ad 03.png',
          'img/Work-Image/Graphics/Vertical banner ad 04.png',
          'img/Work-Image/Graphics/Vertical banner ad 05.png'
        ]
      ],
      live: null
    },
    {
      id: 'g-video', name: '영상 편집', title: 'VIDEO',
      story: 'AI 생성 소스를 직접 편집해 완성한 영상 작업입니다. 오른쪽 썸네일을 클릭하면 유튜브 영상이 재생됩니다.',
      mock: 'video',
      video: 'img/video/ai video.mp4',
      // 유튜브는 클릭하면 그 자리에서 iframe으로 바뀌어 재생됨
      youtube: ['JSoDJxQpp5s', 'LdQsBGDYrRA'],
      live: null
    },
    {
      id: 'g-ai', name: 'AI 생성물', title: 'AI WORKS',
      story: 'AI를 활용한 이미지 · 캐릭터 생성 작업 모음입니다.',
      mock: 'grid',
      imgs: [
        'img/Work-Image/Graphics/AI image 01.png',
        'img/Work-Image/Graphics/AI image 02.png',
        'img/Work-Image/Graphics/AI image 03.png',
        'img/Work-Image/Graphics/AI image 04.png',
        'img/Work-Image/Graphics/3D-object.png',
        'img/Work-Image/Graphics/AI character image mokup.png',
        'img/Work-Image/Graphics/3D-object2.png',
        'img/Work-Image/Graphics/AI character image 10.png'
      ],
      live: null
    }
  ]
};

// 유튜브 썸네일 마크업. 이미지는 유튜브가 자동으로 제공하는 걸 그대로 씀
function ytThumbHTML(id) {
  return (
    '<img src="https://img.youtube.com/vi/' + id + '/hqdefault.jpg" alt="유튜브 영상 썸네일">' +
    '<span class="yt-play" aria-hidden="true">&#9654;</span>'
  );
}

// 모니터 목업 한 대 분량 마크업
function displayInner(src, alt) {
  return (
    '<div class="mockup-viewport mockup-viewport-display">' +
      '<img class="mockup-page mockup-page-scroll" src="' + src + '" alt="' + alt + '">' +
    '</div>' +
    '<img class="mockup-frame" src="img/mockup/Apple Pro Display XDR.png" alt="" aria-hidden="true">'
  );
}

function heroHTML(p) {
  // 그래픽: 프레임 없이 이미지 그대로
  if (p.mock === 'none') {
    return '<img class="slide-hero slide-hero-plain" src="' + p.img + '" alt="' + p.name + '">';
  }

  // 태블릿 (편집 디자인). 안쪽에 미니 캐러셀: 버튼으로 좌우 넘기고 화면 클릭하면 확대
  if (p.mock === 'tablet') {
    return (
      '<div class="slide-hero mockup slide-hero-tablet">' +
        '<div class="mockup-viewport mockup-viewport-tablet">' +
          '<div class="tablet-track">' +
            p.screens.map(function (src, i) {
              // 32장을 한 번에 받으면 무거워서 첫 장만 바로, 나머진 lazy
              return '<img class="tablet-page" src="' + src + '" alt="' + p.name + ' ' + (i + 1) + '페이지"' + (i > 0 ? ' loading="lazy"' : '') + '>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<img class="mockup-frame" src="img/mockup/ipad-big-style-inner-1319x922.png" alt="" aria-hidden="true">' +
        '<div class="tablet-controls">' +
          '<span class="scroll-hint-mouse" aria-hidden="true"></span>' +
          '<span class="tablet-count"><span class="tablet-count-now">1</span> / ' + p.screens.length + '</span>' +
        '</div>' +
      '</div>'
    );
  }

  // 영상. mp4는 슬라이드가 보일 때만 재생 (syncProjectColor에서 제어)
  if (p.mock === 'video') {
    var side = '';
    if (p.youtube) {
      side =
        '<div class="video-side">' +
          p.youtube.map(function (id) {
            return '<button type="button" class="yt-thumb" data-yt="' + id + '">' + ytThumbHTML(id) + '</button>';
          }).join('') +
        '</div>';
    }
    return (
      '<div class="slide-hero slide-hero-video">' +
        '<video class="slide-video" src="' + p.video + '" controls muted loop playsinline preload="metadata"></video>' +
        side +
      '</div>'
    );
  }

  // 갤러리 (편집/패키지). detail 있으면 폰 목업을 끝에 추가
  if (p.mock === 'gallery') {
    var items = p.imgs.map(function (src) {
      return '<img src="' + src + '" alt="' + p.name + '">';
    }).join('');

    if (p.detail) {
      // data-full = 라이트박스에서 열 원본
      items +=
        '<div class="mockup">' +
          '<div class="mockup-viewport mockup-viewport-iphone">' +
            '<img class="mockup-page" src="' + (p.detailThumb || p.detail) + '" data-full="' + p.detail + '" alt="' + p.name + ' 상세 페이지">' +
          '</div>' +
          '<img class="mockup-frame" src="img/mockup/Apple iPhone 15 Pro Black Titanium 1.png" alt="" aria-hidden="true">' +
        '</div>';
    }

    return '<div class="slide-hero slide-hero-gallery">' + items + '</div>';
  }

  // 그래픽: 그리드 콜라주 (AI 생성물)
  if (p.mock === 'grid') {
    return (
      '<div class="slide-hero slide-hero-grid">' +
        p.imgs.map(function (src) {
          return '<img src="' + src + '" alt="' + p.name + '">';
        }).join('') +
      '</div>'
    );
  }

  // 마퀴. 세트가 짧으면 빈틈이 보여서 12장 이상으로 늘린 다음 2배 복제
  if (p.mock === 'marquee') {
    return (
      '<div class="slide-hero slide-hero-marquee">' +
        p.rows.map(function (row, idx) {
          var base = row.slice();
          while (base.length < 12) base = base.concat(row);
          var doubled = base.concat(base).map(function (src) {
            return '<img src="' + src + '" alt="' + p.name + '">';
          }).join('');
          return '<div class="marquee' + (idx % 2 === 1 ? ' marquee-reverse' : '') + '">' + doubled + '</div>';
        }).join('') +
      '</div>'
    );
  }

  // 그외 : 모니터 두 대
  if (p.mock === 'duo') {
    return (
      '<div class="slide-hero slide-hero-duo">' +
        p.imgs.map(function (im) {
          return '<div class="mockup">' + displayInner(im.src, im.alt) + '</div>';
        }).join('') +
      '</div>'
    );
  }

  var inner;
  if (p.mock === 'display') {
    inner = displayInner(p.img, p.name);
    // 모바일 목업 이미지가 있으면 모니터 옆에 배치
    if (p.mobileImg) {
      inner += '<img class="mockup-mobile-companion" src="' + p.mobileImg + '" alt="' + p.name + ' 모바일 버전">';
    }
  } else {
    // 폰. screens 있으면 겹쳐뒀다가 hover로 넘김
    var screens = p.screens || [p.img];
    inner =
      '<div class="mockup-viewport mockup-viewport-iphone">' +
        screens.map(function (src, i) {
          return '<img class="mockup-page mockup-page-flip' + (i === 0 ? ' is-shown' : '') + '" src="' + src + '" alt="' + p.name + '">';
        }).join('') +
      '</div>' +
      '<img class="mockup-frame" src="img/mockup/Apple iPhone 15 Pro Black Titanium 1.png" alt="" aria-hidden="true">' +
      // hover 안내 배지
      (screens.length > 1 ? '<span class="hover-hint" aria-hidden="true">HOVER</span>' : '');
  }

  var cls = 'slide-hero mockup slide-hero-' + p.mock;
  return p.live
    ? '<a class="' + cls + '" href="' + p.live + '" target="_blank" rel="noopener" title="' + p.name + ' 사이트로 이동">' + inner + '</a>'
    : '<div class="' + cls + '">' + inner + '</div>';
}

// 메타 : 툴 아이콘 + 기간 + 참여 형태
function metaHTML(p) {
  if (!p.tools) return '';
  var icons = p.tools.map(function (t) {
    return '<img class="slide-tool" src="img/tool-icon/' + t + '.png" alt="' + t + '" title="' + t + '">';
  }).join('');
  return (
    '<div class="slide-meta">' +
      '<span class="slide-tools">' + icons + '</span>' +
      (p.duration ? '<span class="slide-fact">' + p.duration + '</span>' : '') +
      (p.contribution ? '<span class="slide-fact">' + p.contribution + '</span>' : '') +
    '</div>'
  );
}

// 하단 버튼들
function linksHTML(p) {
  if (!p.links || p.links.length === 0) return '';
  return (
    '<div class="slide-links">' +
      p.links.map(function (l) {
        return '<a class="slide-cta" href="' + l.url + '" target="_blank" rel="noopener">' + l.label + '</a>';
      }).join('') +
    '</div>'
  );
}

// 캐러셀 진입. 카테고리마다 구성이 달라서 스와이퍼는 매번 새로 만듦
let carouselSwiper = null;
let currentCategory = null;
let lastSlideChangeAt = 0; // 관성 휠 구분용

function enterCategory(category, fromHistory) {
  const projects = CATEGORIES[category];
  currentCategory = category;

  if (!fromHistory) pushScreen({ screen: 'carousel', category: category });

  // 슬라이드 생성
  document.getElementById('carousel-wrapper').innerHTML = projects.map(function (p) {
    return (
      '<div class="swiper-slide" data-project="' + p.id + '">' +
        '<div class="slide">' +
          '<h2 class="slide-title">' + p.title + '</h2>' +
          heroHTML(p) +
          '<div class="slide-info">' +
            '<h3 class="slide-name">' + p.name + '</h3>' +
            '<p class="slide-story">' + p.story + '</p>' +
            metaHTML(p) +
            linksHTML(p) +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  // 상단 2단 : 현재 카테고리의 프로젝트명 목록 (네비엔 짧은 이름 우선)
  document.getElementById('carousel-nav-list').innerHTML = projects.map(function (p, i) {
    return '<button type="button" class="carousel-nav-item" data-index="' + i + '">' + (p.navName || p.name) + '</button>';
  }).join('');

  // 우측 도트 : 슬라이드 개수만큼 생성 (hover하면 프로젝트명)
  document.getElementById('quick-nav').innerHTML = projects.map(function (p, i) {
    return (
      '<button type="button" class="quick-nav-item" data-index="' + i + '">' +
        '<span class="quick-nav-label">' + (p.navName || p.name) + '</span><span class="quick-nav-dot"></span>' +
      '</button>'
    );
  }).join('');

  // display:none 상태에서 초기화하면 크기가 0으로 잡혀서 먼저 화면 전환
  go('screen-carousel');

  if (carouselSwiper) carouselSwiper.destroy(true, true);
  carouselSwiper = new Swiper('#carousel-swiper', {
    speed: 700,
    mousewheel: true,
    keyboard: { enabled: true },
    on: {
      afterInit: syncProjectColor,
      slideChange: syncProjectColor
    }
  });

  // 새로 만든 dom에 바로 클래스를 붙이면 transition이 생략됨 -> 리플로우 한 번 강제
  void document.getElementById('carousel-wrapper').offsetHeight;
  syncProjectColor(carouselSwiper);

  // 프로젝트명 / 도트 클릭하면 그 슬라이드로
  document.querySelectorAll('.carousel-nav-item, .quick-nav-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      carouselSwiper.slideTo(Number(btn.dataset.index));
    });
  });

  // 상단 카테고리 nav 현재 카테고리 표시
  markCategory(category);

  bindPhoneSlideshows();
  bindTabletCarousels();
}

// 편집 디자인 태블릿 미니 캐러셀. 태블릿 위에서 휠 굴리면 페이지 넘김, 화면 클릭하면 확대
function bindTabletCarousels() {
  document.querySelectorAll('#carousel-wrapper .slide-hero-tablet').forEach(function (hero) {
    var track = hero.querySelector('.tablet-track');
    var pages = track.querySelectorAll('.tablet-page');
    var countNow = hero.querySelector('.tablet-count-now');
    var index = 0;
    var lastWheelAt = 0;

    // 트랙이 transform으로만 움직여서 브라우저가 lazy 이미지를 안 불러옴 -> 직접 eager로 전환
    function preload(i) {
      if (i < 0 || i >= pages.length) return;
      if (pages[i].loading === 'lazy') pages[i].loading = 'eager';
    }

    function show(i) {
      index = Math.max(0, Math.min(i, pages.length - 1));
      // 트랙 전체를 페이지 폭만큼 밀어서 옆으로 넘어가는 느낌
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      // 지금 장 + 양옆 미리 로드 (넘길 때 빈 화면 안 보이게)
      preload(index); preload(index + 1); preload(index - 1);
      countNow.textContent = index + 1;
    }

    // 태블릿 안에서의 휠은 여기서 소비 (바깥 스와이퍼가 같이 안 넘어가게)
    hero.addEventListener('wheel', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // 관성 휠로 한 번에 여러 장 넘어가지 않게 시간차로 걸러냄
      var now = Date.now();
      if (now - lastWheelAt < 450) return;
      lastWheelAt = now;

      show(index + (e.deltaY > 0 ? 1 : -1));
    });

    // 화면 클릭 -> 지금 보이는 페이지를 라이트박스로 확대
    track.addEventListener('click', function () {
      openLightbox(pages[index].getAttribute('src'), pages[index].alt);
    });

    show(0);
  });
}

// 폰 목업 슬라이드쇼. hover 동안 0.9초마다 다음 장, 나가면 처음으로
function bindPhoneSlideshows() {
  document.querySelectorAll('#carousel-wrapper .slide-hero-phone').forEach(function (hero) {
    const pages = hero.querySelectorAll('.mockup-page-flip');
    if (pages.length < 2) return;

    let index = 0;
    let timer = null;

    hero.addEventListener('mouseenter', function () {
      timer = setInterval(function () {
        pages[index].classList.remove('is-shown');
        index = (index + 1) % pages.length;
        pages[index].classList.add('is-shown');
      }, 900);
    });

    hero.addEventListener('mouseleave', function () {
      clearInterval(timer);
      pages[index].classList.remove('is-shown');
      index = 0;
      pages[0].classList.add('is-shown');
    });
  });
}

// 상단 카테고리 nav 활성 표시 (캐러셀/어바웃 헤더 둘 다)
function markCategory(category) {
  document.querySelectorAll('.cat-nav-item').forEach(function (btn) {
    btn.classList.toggle('is-active', btn.dataset.category === category);
  });
}

// 카테고리 점프
document.querySelectorAll('.cat-nav-item').forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.classList.contains('is-active')) return;
    if (btn.dataset.category === 'about') goAbout();
    else enterCategory(btn.dataset.category);
  });
});

// 라이트박스. 히스토리에도 쌓아서 뒤로가기로도 닫힘
function openLightbox(src, alt) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-img').alt = alt || '';
  document.getElementById('lightbox').classList.add('is-open');
  pushScreen({ screen: 'lightbox' });
}

function closeLightbox(fromHistory) {
  document.getElementById('lightbox').classList.remove('is-open');
  // 직접 닫았으면 쌓아둔 히스토리 한 칸 되돌림
  if (!fromHistory) { try { history.back(); } catch (err) { } }
}

// 유튜브 썸네일 클릭 -> 그 자리에서 iframe으로 교체해 재생 (이벤트 위임)
document.getElementById('carousel-wrapper').addEventListener('click', function (e) {
  var btn = e.target.closest('.yt-thumb');
  if (!btn || btn.querySelector('iframe')) return;
  // referrerpolicy : 유튜브가 출처(Referer) 없는 임베드를 오류 153으로 거부해서 명시
  btn.innerHTML =
    '<iframe src="https://www.youtube.com/embed/' + btn.dataset.yt + '?autoplay=1&rel=0"' +
    ' title="유튜브 영상" allow="autoplay; encrypted-media; fullscreen" allowfullscreen' +
    ' referrerpolicy="strict-origin-when-cross-origin"></iframe>';
});

// 그래픽 이미지 클릭 -> 라이트박스 (이벤트 위임)
document.getElementById('carousel-wrapper').addEventListener('click', function (e) {
  var img = e.target.closest('.slide-hero-gallery img, .slide-hero-grid img, .marquee img');
  if (!img) return;
  // 프레임을 클릭했으면 안에 든 화면 이미지로 (넘김 중이면 지금 보이는 장)
  var page = img.classList.contains('mockup-frame')
    ? (img.parentElement.querySelector('.mockup-page.is-shown') || img.parentElement.querySelector('.mockup-page'))
    : img;
  openLightbox(page.dataset.full || page.getAttribute('src'), page.alt);
});

// 배경이나 x 누르면 닫기
document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target.id === 'lightbox' || e.target.closest('.lightbox-close')) {
    closeLightbox();
  }
});

// esc로 닫기
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' &&
      document.getElementById('lightbox').classList.contains('is-open')) {
    closeLightbox();
  }
});

// 마지막 슬라이드에서 더 굴리면 다음 카테고리로 (관성 휠은 시간차로 걸러냄)
const NEXT_CATEGORY = { web: 'mobile', mobile: 'graphic', graphic: 'about' };
let lastCategoryJumpAt = 0;

document.getElementById('screen-carousel').addEventListener('wheel', function (e) {
  if (!carouselSwiper || !carouselSwiper.isEnd || e.deltaY <= 0) return;

  const next = NEXT_CATEGORY[currentCategory];
  if (!next) return;

  const now = Date.now();
  if (now - lastSlideChangeAt < 700) return;
  if (now - lastCategoryJumpAt < 1500) return;
  lastCategoryJumpAt = now;

  if (next === 'about') goAbout();
  else enterCategory(next);
});

// 활성 슬라이드의 data-project를 화면에 복사 -> css가 색을 갈아끼움
function syncProjectColor(swiper) {
  // 스와이퍼 준비 전이면 통과 (afterInit에서 다시 불림)
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (!activeSlide) return;

  const projectId = activeSlide.dataset.project;
  document.getElementById('screen-carousel').dataset.project = projectId;
  lastSlideChangeAt = Date.now();

  // 프로젝트명 + 도트 하이라이트
  document.querySelectorAll('.carousel-nav-item, .quick-nav-item').forEach(function (btn) {
    btn.classList.toggle('is-active', Number(btn.dataset.index) === swiper.activeIndex);
  });

  // 등장 모션 트리거 + 영상은 보이는 슬라이드에서만 재생
  swiper.slides.forEach(function (slide, i) {
    slide.classList.toggle('is-active', i === swiper.activeIndex);
    var video = slide.querySelector('video');
    if (video) {
      if (i === swiper.activeIndex) video.play().catch(function () { });
      else video.pause();
    }
    // 떠난 슬라이드에서 재생 중이던 유튜브는 썸네일로 되돌림 (정지 효과)
    if (i !== swiper.activeIndex) {
      slide.querySelectorAll('.yt-thumb iframe').forEach(function (iframe) {
        var btn = iframe.closest('.yt-thumb');
        btn.innerHTML = ytThumbHTML(btn.dataset.yt);
      });
    }
  });

  // 스크롤 안내는 첫 슬라이드에서만
  document.getElementById('screen-carousel')
    .classList.toggle('is-first-slide', swiper.activeIndex === 0);

  // 화살표는 끝에 닿으면 흐리게
  document.querySelector('.carousel-arrow-prev').classList.toggle('is-disabled', swiper.isBeginning);
  document.querySelector('.carousel-arrow-next').classList.toggle('is-disabled', swiper.isEnd);
}

// 화살표 클릭
document.querySelector('.carousel-arrow-prev').addEventListener('click', function () {
  if (carouselSwiper) carouselSwiper.slidePrev();
});
document.querySelector('.carousel-arrow-next').addEventListener('click', function () {
  if (carouselSwiper) carouselSwiper.slideNext();
});

// 아코디언 패널 클릭 (about만 전용 화면)
document.querySelectorAll('.panel').forEach(function (panel) {
  panel.addEventListener('click', function () {
    if (panel.dataset.category === 'about') {
      goAbout();
      return;
    }
    enterCategory(panel.dataset.category);
  });
});
