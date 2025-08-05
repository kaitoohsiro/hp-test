// ローディング画面の制御
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hide');
    }, 1500);
});

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // モバイルメニューを閉じる
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// data-aos属性を持つ要素を監視
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ヘッダーのスクロール処理
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 下にスクロール
        header.style.transform = 'translateY(-100%)';
    } else {
        // 上にスクロール
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// プロジェクトスライダー
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');
let currentProject = 0;

function showProject(index) {
    projectCards.forEach(card => card.classList.remove('active'));
    projectCards[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentProject = (currentProject - 1 + projectCards.length) % projectCards.length;
    showProject(currentProject);
});

nextBtn.addEventListener('click', () => {
    currentProject = (currentProject + 1) % projectCards.length;
    showProject(currentProject);
});

// 自動スライド
setInterval(() => {
    currentProject = (currentProject + 1) % projectCards.length;
    showProject(currentProject);
}, 5000);

// フォーム送信処理
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // フォームデータを取得
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // ここでは実際の送信処理の代わりにアラートを表示
    alert('お問い合わせありがとうございます。内容を確認の上、ご連絡させていただきます。');
    
    // フォームをリセット
    contactForm.reset();
});

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// カウントアップアニメーション
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// 数値要素の監視
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// マウスカーソル効果
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ホバー効果
const hoverElements = document.querySelectorAll('a, button, .btn');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// スクロールトリガーアニメーション
class ScrollTrigger {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            start: options.start || 'top 80%',
            end: options.end || 'bottom 20%',
            onEnter: options.onEnter || null,
            onLeave: options.onLeave || null,
            onProgress: options.onProgress || null
        };
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.checkPosition());
        this.checkPosition();
    }
    
    checkPosition() {
        const rect = this.element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = 1 - (rect.bottom / (rect.height + windowHeight));
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
            if (this.options.onEnter && !this.element.classList.contains('scroll-triggered')) {
                this.element.classList.add('scroll-triggered');
                this.options.onEnter();
            }
            if (this.options.onProgress) {
                this.options.onProgress(progress);
            }
        } else {
            if (this.options.onLeave && this.element.classList.contains('scroll-triggered')) {
                this.element.classList.remove('scroll-triggered');
                this.options.onLeave();
            }
        }
    }
}

// テキストアニメーション
document.querySelectorAll('.animate-text').forEach(element => {
    new ScrollTrigger(element, {
        onEnter: () => {
            element.classList.add('text-animated');
        }
    });
});

// 画像の遅延読み込み
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// タッチデバイス検出
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
} else {
    document.body.classList.add('no-touch');
}

// ページトップへ戻るボタン
const backToTop = document.createElement('button');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// デバッグ用：プレースホルダー画像の生成
function generatePlaceholderImages() {
    const images = document.querySelectorAll('img:not([src])');
    images.forEach((img, index) => {
        const width = 800;
        const height = 600;
        const colors = ['1a5490', 'f39800', '333333', '666666'];
        const color = colors[index % colors.length];
        img.src = `https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=Construction+Image+${index + 1}`;
    });
}

// ページ読み込み時にプレースホルダー画像を設定
// window.addEventListener('DOMContentLoaded', generatePlaceholderImages);