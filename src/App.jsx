import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const projects = [
  { slug: "lovel", name: "一拍入画", service: "运营活动设计", year: "2026", tone: "tone-a", href: "/cases/yipai/index.html?revision=20261012-kv3#cover", cover: "/work-covers/card-lovel.webp", coverPosition: "72% center" },
  { slug: "soni", name: "SoulChat AI", service: "海外虚拟社交产品体验设计", year: "2026", tone: "tone-b", href: "/cases/soulchat/index.html#cover", cover: "/work-covers/card-soni.webp", coverPosition: "center" },
  { slug: "pine-valley", name: "中国时空", service: "北斗主题企业数字人设计", year: "2026", tone: "tone-c", href: "/cases/csti/index.html", cover: "/work-covers/card-pine-valley.webp", coverPosition: "82% center" },
  { slug: "kyrosai", name: "换装工作流", service: "人物换装 · 工作流设计", year: "2026", tone: "tone-d", href: "/cases/outfit/index.html#top", cover: "/work-covers/card-kyrosai.webp", coverPosition: "center 40%" },
  { slug: "delane", name: "其他设计", service: "视觉设计 · IP 形象", year: "2026", tone: "tone-e", href: "/cases/other-design/index.html", cover: "/work-covers/card-delane.webp", coverPosition: "center" },
];

function BlurText({ children, by = "letters", delay = 0 }) {
  const ref = useRef(null);
  const text = String(children);
  const count = by === "block" ? 1 : by === "words" ? (text.match(/\S+/gu) || []).length : text.replace(/\s/gu, "").length;
  const stagger = Math.min(by === "words" ? 45 : 25, 240 / Math.max(1, count - 1));
  useEffect(() => {
    const element = ref.current;
    element.classList.remove("is-in-view");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-in-view");
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);
  let index = 0;
  return <span ref={ref} className="blur-text" aria-label={text}>
    {(by === "block" ? [text] : text.match(/\s+|[^\s]+/gu) || []).map((word, wordIndex) => /^\s+$/.test(word) ? word :
      <i className={"blur-word" + (/\p{Script=Han}/u.test(word) ? " blur-cjk" : "")} aria-hidden="true" key={wordIndex}>
        {(by === "words" || by === "block" ? [word] : Array.from(word)).map((piece, pieceIndex) => <i className="blur-piece" key={pieceIndex} style={{ animationDelay: delay + index++ * stagger + "ms" }}>{piece}</i>)}
      </i>)}
  </span>;
}

const detailCopy = {
  "lovel": "A calm digital home for a design-led hospitality brand.",
  "soni": "A flexible launch site with a focused editorial rhythm.",
  "pine-valley": "A performance-first refresh for an established studio.",
  "kyrosai": "A modular content system for a growing AI platform.",
  "delane": "A compact portfolio shaped around work and process.",
};

const experience = [
  {
    company: "思享无限（北京）科技有限公司",
    date: "2024.11 - 2026.06",
    role: "AI 设计师",
    summary: "负责公司核心 AI 产品的视觉设计与商业化落地，覆盖 AI 广告素材、数字人、产品视觉及 UI 协同，参与从视觉创意、素材生产到产品上线及市场投放的完整链路。",
    sections: [
      { title: "广告视觉与素材体系搭建", text: "独立负责 AI Vista 系列全渠道广告素材，覆盖产品海报、宣传图、品牌视频及 APP 功能演示；搭建 1 套标准化图片模板、13 套多场景视频模板及可复用素材库，结合投放反馈持续迭代视觉表现，提升素材适配与复用效率。" },
      { title: "数字人设计与项目交付", text: "独立完成真人 / 动漫双风格 AI 数字人原创形象设计及批量视频制作；参与杜丽娘、恐龙人、Vista Live、嗨秀 AI 分身等数字人项目，负责视觉设计、品牌海报及核心功能演示内容，支持产品按时上线。" },
      { title: "产品视觉与 UI 协同", text: "深度参与 SoulChat、Vista Live 等 AI 产品视觉设计，完成开屏视频、核心功能演示及部分 UI 视觉优化，强化产品功能表达与品牌视觉一致性。" },
    ],
  },
  {
    company: "北京小哆智能科技有限公司",
    date: "2024.03 - 2024.09",
    role: "视觉设计师",
    summary: "负责 AI 数字人及品牌视觉相关设计，根据项目及客户需求完成视觉方案，并协同研发、测试团队推进设计落地。",
    sections: [
      { title: "数字人视觉设计", text: "根据客户需求完成 AI 数字人形象及相关视觉设计，参与需求沟通、视觉方案制定，并协同研发及测试团队推进项目落地。" },
      { title: "新媒体视觉设计", text: "负责微信公众号、抖音、小红书等平台视觉内容，包括海报、Banner、视频及运营素材，保持品牌视觉统一并支持日常内容传播。" },
      { title: "品牌及线下物料设计", text: "负责展会及品牌宣传物料设计，包括展位视觉、宣传海报、手册及展示视频等，支持品牌展示及产品宣传。" },
    ],
  },
  {
    company: "北京好未来教育科技有限公司",
    date: "2023.11 - 2024.03",
    role: "AIGC 设计（实习）",
    summary: "参与教育业务相关 AIGC 视觉内容生产与设计探索，结合项目需求使用生成式 AI 工具辅助视觉创作。",
    sections: [
      { title: "视觉内容创作", text: "根据教研及项目需求，使用 Midjourney、DALL·E、Stable Diffusion 等工具完成场景、元素及美术素材设计，提升视觉内容生产效率。" },
      { title: "设计流程探索", text: "参与 AIGC 相关设计流程及工具使用规范整理，将 AI 生成能力融入日常视觉设计流程。" },
      { title: "素材二次设计", text: "针对 AI 生成结果进行筛选、优化及二次创作，根据实际项目需求调整画面表现，保证素材最终落地效果。" },
    ],
  },
  {
    company: "彩云科技",
    date: "2023.02 - 2023.09",
    role: "运营设计师（实习）",
    summary: "参与彩云天气产品运营视觉设计及品牌活动推广，覆盖日常运营素材、活动视觉及产品界面优化。",
    sections: [
      { title: "产品运营视觉设计", text: "参与彩云天气运营设计，制作并优化海报、开屏页、Banner 等运营素材，支持产品日常运营及品牌传播。" },
      { title: "活动视觉设计", text: "参与赏花活动推广视觉设计，完成活动海报、社交媒体广告等素材，强化活动主题表达及品牌视觉一致性。" },
      { title: "产品视觉与体验优化", text: "参与彩云天气改版项目，负责部分界面视觉设计与用户体验优化，提升产品视觉表现及使用体验。" },
    ],
  },
];

const skills = [
  { name: "Midjourney", asset: "/midjourney-mark.svg", className: "skill-midjourney" },
  { name: "GPT", asset: "/gpt-mark.svg", className: "skill-gpt" },
  { name: "即梦", asset: "/jimeng-mark.png", className: "skill-jimeng" },
  { name: "Photoshop", mark: "Ps", className: "skill-ps" },
  { name: "Illustrator", mark: "Ai", className: "skill-ai-adobe" },
  { name: "Figma", mark: "", className: "skill-figma" },
  { name: "Premiere", mark: "Pr", className: "skill-pr" },
  { name: "剪映", mark: "", className: "skill-capcut" },
];

const brandMarks = {
  flower: "/brand/flower.png",
  folder: "/brand/folder.png",
  heart: "/brand/heart.png",
  stack: "/brand/stack.png",
  video: "/brand/video.png",
  plane: "/brand/paper-plane-v2.png",
};

function SectionMark({ type, className = "" }) {
  return (
    <span className={`section-mark section-mark-${type} ${className}`.trim()} aria-hidden="true">
      <img src={brandMarks[type]} alt="" />
    </span>
  );
}

let imageDatabase;
function getImageDatabase() {
  if (!imageDatabase) {
    imageDatabase = new Promise((resolve, reject) => {
      const request = indexedDB.open("portfolio-card-images", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("images");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return imageDatabase;
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    const items = document.querySelectorAll("[data-reveal-item]");
    const itemObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          itemObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -12% 0px" },
    );
    items.forEach((item) => itemObserver.observe(item));
    return () => { observer.disconnect(); itemObserver.disconnect(); };
  }, []);
}

function Shell({ children, backgroundLocation }) {
  const location = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    const titles = { "/": "AI 视觉设计作品集", "/work": "设计作品", "/video": "动态影像", "/contact": "联系我", "/yangchuyu": "关于我" };
    const project = projects.find(item => location.pathname === `/work/${item.slug}`);
    document.title = `杨初雨｜${project?.name || titles[location.pathname] || "AI 视觉设计作品集"}`;
  }, [location.pathname]);

  useLayoutEffect(() => {
    const samePage = previousPath.current === location.pathname;
    previousPath.current = location.pathname;
    if (backgroundLocation || location.state?.preserveScroll) return;
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({
        behavior: samePage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant",
        block: "start",
        inline: "start",
      });
      return;
    }
    window.scrollTo({ left: 0, top: 0, behavior: "instant" });
  }, [location.pathname, location.hash, location.state, backgroundLocation]);

  return (
    <div className="site-shell">
      {(!location.pathname.startsWith("/work/") || backgroundLocation) && <Header page={backgroundLocation || location} />}
      <main key={backgroundLocation?.pathname || location.pathname} className="page-enter">
        {location.pathname !== "/" && !location.pathname.startsWith("/work/") && <Link className="page-exit" to="/" aria-label="退出当前页面，返回首页"><span aria-hidden="true">←</span> <BlurText>首页</BlurText></Link>}
        {children}
      </main>
    </div>
  );
}

function Header({ page }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 72);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [page.pathname]);
  const links = [
    { label: "Home", to: "/", active: page.pathname === "/" && !page.hash },
    { label: "Work", to: "/work", active: page.pathname.startsWith("/work") && !page.hash },
    { label: "Video", to: "/video", active: page.pathname === "/video" },
    { label: "Contact", to: "/contact", active: page.pathname === "/contact" },
  ];
  return <header className={`site-header frame${page.pathname === "/" ? " site-header-home" : ""}${scrolled ? " is-scrolled" : ""}`}>
    <Link className="brand link-line name-eyes-trigger" to="/yangchuyu" aria-label="YANGCHUYU · 查看简历"><BlurText>YANGCHUYU</BlurText><span className="name-eyes" aria-hidden="true"><img src="/brand/curious-eyes.png" alt="" width="44" height="32" /></span></Link>
    <nav aria-label="Primary navigation">
      {links.map((link, index) => <Link key={link.label} className={`nav-link${link.active ? " active" : ""}`} to={link.to} onClick={event => {
        if (page.pathname === link.to) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }
      }} aria-current={link.active ? "page" : undefined}><BlurText delay={60 + index * 45}>{link.label}</BlurText></Link>)}
    </nav>
  </header>;
}

function LoopGallery({ label, children, hold = false }) {
  const ref = useRef(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);

  useEffect(() => {
    const gallery = ref.current;
    let visible = false;
    const sync = () => setRunning(visible && !document.hidden);
    const releaseHover = () => setHovered(false);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0 });
    observer.observe(gallery);
    const resizeObserver = new ResizeObserver(() => {
      const group = gallery.querySelector('.gallery-group');
      const speed = window.matchMedia('(pointer: coarse)').matches ? 24 : 35;
      gallery.style.setProperty('--loop-duration', `${group.offsetWidth / speed}s`);
    });
    resizeObserver.observe(gallery.querySelector('.gallery-group'));
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", releaseHover, { passive: true });
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", releaseHover);
    };
  }, []);

  return (
    <div ref={ref} className="loop-gallery" data-running={running && !paused && !hovered && !touching && !hold} role="region" tabIndex={0} aria-label={label + "，触碰暂停，按空格暂停或继续轮转"}
      onPointerDown={event => { if (event.pointerType !== 'mouse') setTouching(true); }}
      onPointerUp={() => setTouching(false)}
      onPointerCancel={() => setTouching(false)}
      onPointerMove={event => {
        if (event.pointerType === 'mouse' && (event.movementX || event.movementY)) setHovered(Boolean(event.target.closest('.gallery-project')));
      }}
      onPointerLeave={() => { setHovered(false); setTouching(false); }}
      onKeyDown={event => { if (event.key === " " && event.target === event.currentTarget) { event.preventDefault(); setPaused(value => !value); } }}>
      <div className="gallery-viewport">
        <div className="gallery-track">
          {[0, 1].map(copy => <div className="gallery-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{children(copy)}</div>)}
        </div>
      </div>
    </div>
  );
}

function ProjectCollection({ projectImages, intro = false }) {
  const location = useLocation();
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!intro) return;
    const section = sectionRef.current;
    const story = section.closest('.home-story');
    const stage = story.querySelector('.home-story-stage');
    const hero = story.querySelector('.reference-hero');
    const heroVideo = hero.querySelector('video');
    const navigation = document.querySelector('.site-header');
    const heading = section.querySelector('.frame');
    const gallery = section.querySelector('.loop-gallery');
    const track = section.querySelector('.gallery-track');
    const groups = section.querySelectorAll('.gallery-group');
    const cards = groups[0].querySelectorAll('.gallery-project');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let unfold = 0;
    let target = 0;
    let from = 0;
    let started = 0;
    const update = () => {
      const compact = window.innerWidth <= 600;
      const distance = Math.max(1, story.offsetHeight - stage.offsetHeight);
      const progress = compact || reduceMotion.matches || section.querySelector(':focus-visible') ? 1 : Math.min(1, Math.max(0, -story.getBoundingClientRect().top / distance));
      const nextTarget = progress >= .24 ? 1 : 0;
      if (nextTarget !== target) {
        from = unfold;
        target = nextTarget;
        started = performance.now();
      }
      const elapsed = Math.min(1, (performance.now() - started) / (target ? 520 : 120));
      unfold = compact || reduceMotion.matches ? 1 : from + (target - from) * (1 - Math.pow(1 - elapsed, 3));
      const width = cards[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(groups[0]).gap);
      // Keep the fan below the keyboard in the source video, including cover cropping.
      const pictureHeight = Math.max(heroVideo.offsetHeight, heroVideo.clientWidth * 9 / 16);
      const videoTop = window.innerWidth > 900 ? Math.min(0, Math.max(-24, navigation.getBoundingClientRect().bottom + 12 - pictureHeight * .105)) : 0;
      heroVideo.style.top = `${videoTop}px`;
      const keyboardBottom = videoTop + pictureHeight * .845;
      const clearance = window.innerWidth > 900 ? 8 : Math.max(8, Math.min(24, stage.offsetHeight - keyboardBottom - 16));
      const fanTop = keyboardBottom + clearance + width * Math.sin(4 * Math.PI / 180) / 2;
      cards.forEach((card, index) => {
        const offset = index - 2;
        const x = (stage.clientWidth - width) / 2 + offset * width * .8 - index * (width + gap);
        const y = fanTop - gallery.offsetTop + Math.abs(offset) * 8;
        card.style.transform = `translate3d(${x * (1 - unfold)}px, ${y * (1 - unfold)}px, 0) rotate(${(index % 2 ? 4 : -4) * (1 - unfold)}deg)`;
        card.style.zIndex = unfold < 1 ? 5 - Math.abs(offset) : '';
      });
      const fade = Math.max(unfold, Math.min(1, Math.max(0, (progress - .12) / .36)));
      hero.style.opacity = compact ? 1 : 1 - fade;
      const titleOpacity = Math.max(unfold, Math.min(1, Math.max(0, (progress - .34) / .22)));
      heading.style.opacity = titleOpacity;
      heading.style.filter = `blur(${8 * (1 - titleOpacity)}px)`;
      section.dataset.textVisible = titleOpacity > .1;
      groups[1].style.opacity = unfold === 1 ? 1 : 0;
      track.style.animationPlayState = unfold === 1 ? '' : 'paused';
      gallery.style.pointerEvents = unfold < .65 ? 'none' : '';
      section.dataset.unfolded = unfold === 1;
      if (!compact && !reduceMotion.matches && elapsed < 1) schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    section.addEventListener('focusin', schedule);
    section.addEventListener('focusout', schedule);
    reduceMotion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      section.removeEventListener('focusin', schedule);
      section.removeEventListener('focusout', schedule);
      reduceMotion.removeEventListener('change', schedule);
    };
  }, [intro]);

  return (
    <section ref={sectionRef} id="work" className={"project-section" + (intro ? " project-section-intro" : "")} data-reveal={intro ? undefined : true}>
      <div className="frame">
        <div className="carousel-heading">
          <h2><BlurText>Selected work</BlurText></h2>
          <SectionMark type="folder" />
        </div>
      </div>
      <LoopGallery label="作品" hold={Boolean(location.state?.backgroundLocation)}>
        {copy => projects.map(project => (
          <Link className="gallery-project" key={project.slug} to={project.href || "/work/" + project.slug}
            reloadDocument={Boolean(project.href)}
            state={project.href ? undefined : { from: location.pathname === "/" ? "/#work" : "/work", backgroundLocation: location }}
            tabIndex={copy ? -1 : undefined} aria-label={"查看 " + project.name + " 作品"}>
            <div className="gallery-project-image">
              <img src={project.cover || projectImages[project.slug] || `/work-placeholders/${project.slug}.jpg`} style={{ objectPosition: project.coverPosition }} loading="lazy" decoding="async" alt={project.name + " project cover"} />
              <span className="gallery-open" aria-hidden="true">↗</span>
            </div>
            <div className="gallery-project-caption"><strong><BlurText>{project.name}</BlurText></strong><span><BlurText by="words" delay={90}>{project.service}</BlurText></span></div>
          </Link>
        ))}
      </LoopGallery>
    </section>
  );
}

function HeroPortal() {
  const heroRef = useRef(null);
  const effectsRef = useRef(null);
  const videoRef = useRef(null);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    let visible = true;
    const resume = () => {
      if (document.hidden || !visible) video.pause();
      else if (video.paused) video.play().catch(error => {
        if (error.name === 'NotAllowedError') setPlaybackBlocked(true);
      });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    observer.observe(video);
    resume();
    video.addEventListener('canplay', resume);
    document.addEventListener('visibilitychange', resume);
    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', resume);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = effectsRef.current;
    if (!hero || !canvas) return undefined;

    const context = canvas.getContext("2d");
    const butterfly = new Image();
    butterfly.src = "/assets/butterfly-3d.png";
    const particleSource = new Image();
    particleSource.src = "/assets/source.png";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const pointer = { x: 0, y: 0 };
    const position = { x: 0, y: 0, vx: 0, vy: 0 };
    const lastFlight = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let unit = 1;
    let frame = 0;
    let lastTime = performance.now();
    let startTime = lastTime;
    let arcLength = 0;
    let flightAngle = 0;
    let particles = [];
    let particleArt = [];

    particleSource.addEventListener("load", () => {
      particleArt = [[427, 411, 17, 18], [386, 408, 26, 27]].map(([x, y, w, h]) => {
        const art = document.createElement("canvas");
        art.width = w;
        art.height = h;
        const artContext = art.getContext("2d");
        artContext.drawImage(particleSource, x, y, w, h, 0, 0, w, h);
        const pixels = artContext.getImageData(0, 0, w, h);
        const corners = [0, (w - 1) * 4, (h - 1) * w * 4, (w * h - 1) * 4];
        const background = [0, 1, 2].map((channel) => corners.reduce((sum, index) => sum + pixels.data[index + channel], 0) / 4);
        for (let py = 0; py < h; py += 1) {
          for (let px = 0; px < w; px += 1) {
            const index = (py * w + px) * 4;
            const light = Math.max(
              (pixels.data[index + 1] - background[1] - 5) * 7,
              (pixels.data[index] - background[0] - 5) * 8,
            );
            const edge = Math.min(1, Math.min(px, py, w - 1 - px, h - 1 - py) / 3);
            pixels.data[index + 3] = Math.max(0, Math.min(255, light)) * edge;
          }
        }
        artContext.putImageData(pixels, 0, 0);
        return art;
      });
    }, { once: true });

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      unit = width / 1672;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!position.x) {
        position.x = pointer.x = width * (585 / 1672);
        position.y = pointer.y = height * (330 / 941);
        lastFlight.x = position.x;
        lastFlight.y = position.y;
      }
    };

    const move = (event) => {
      if (reduceMotion.matches || !finePointer.matches) return;
      const bounds = hero.getBoundingClientRect();
      pointer.x = Math.max(38, Math.min(width - 38, event.clientX - bounds.left));
      pointer.y = Math.max(38, Math.min(height - 38, event.clientY - bounds.top));
    };
    const resetPointer = () => {
      pointer.x = width * (585 / 1672);
      pointer.y = height * (330 / 941);
    };

    const paint = (time) => {
      const delta = Math.min(.032, (time - lastTime) / 1000);
      lastTime = time;
      const elapsed = (time - startTime) / 1000;
      if (reduceMotion.matches) {
        position.x = pointer.x;
        position.y = pointer.y;
        position.vx = 0;
        position.vy = 0;
      } else {
        position.vx += (100 * (pointer.x - position.x) - 10 * position.vx) * delta;
        position.vy += (100 * (pointer.y - position.y) - 10 * position.vy) * delta;
        position.x += position.vx * delta;
        position.y += position.vy * delta;
      }

      const distance = Math.hypot(position.x - lastFlight.x, position.y - lastFlight.y);
      arcLength += distance;
      if (distance > .15) {
        const desiredAngle = Math.atan2(position.y - lastFlight.y, position.x - lastFlight.x);
        let difference = desiredAngle - flightAngle;
        while (difference > Math.PI) difference -= Math.PI * 2;
        while (difference < -Math.PI) difference += Math.PI * 2;
        flightAngle += difference * Math.min(1, delta * 8);
      }
      const moving = Math.hypot(position.vx, position.vy) > 12;
      if (!reduceMotion.matches && moving && distance > 1) {
        const count = Math.min(18, Math.max(1, Math.floor(distance / (12 * unit))));
        for (let index = 0; index < count; index += 1) {
          const progress = (index + 1) / count;
          particles.push({
            x: lastFlight.x + (position.x - lastFlight.x) * progress - 18 * unit * Math.cos(flightAngle),
            y: lastFlight.y + (position.y - lastFlight.y) * progress - 18 * unit * Math.sin(flightAngle),
            born: time,
            arc: arcLength - distance * (1 - progress),
            kind: Math.floor(arcLength / (12 * unit) + index) % 6 === 0 ? 1 : 0,
          });
        }
      }
      particles = particles.filter((particle) => time - particle.born < 1000 && arcLength - particle.arc < 194 * unit);
      context.clearRect(0, 0, width, height);

      if (!moving && particleArt.length) {
        const idleLights = [[-47, 40], [-64, 16], [-83, 34], [-100, 43], [-112, 54], [-125, 66], [-136, 78], [-149, 90], [-166, 95], [-184, 102], [-207, 104]];
        context.save();
        context.translate(position.x, position.y);
        context.rotate(flightAngle * .16);
        idleLights.forEach(([x, y], index) => {
          const kind = index === 1 || index === 9 ? 1 : 0;
          const size = (kind ? 27 : 14) * unit;
          context.globalAlpha = (particles.length ? .25 : 1) * (.7 + .3 * Math.sin(elapsed * 3 - index * .8) ** 2);
          context.drawImage(particleArt[kind], x * unit - size / 2, y * unit + Math.sin(elapsed * 1.5 + index) * 1.3 * unit - size / 2, size, size);
        });
        context.restore();
      }
      if (particleArt.length) particles.forEach((particle) => {
        const life = (time - particle.born) / 1000;
        const size = (particle.kind ? 27 : 14) * unit;
        context.save();
        context.globalAlpha = (1 - life) ** 2;
        context.translate(particle.x, particle.y);
        context.rotate(particle.kind ? elapsed * .35 : 0);
        context.drawImage(particleArt[particle.kind], -size / 2, -size / 2, size, size);
        context.restore();
      });

      if (butterfly.complete) {
        const size = Math.max(64, Math.min(108, width * .072));
        context.save();
        context.translate(position.x, position.y);
        context.rotate(Math.max(-.25, Math.min(.25, Math.sin(flightAngle) * .22)));
        context.transform(1, 0, .04 * Math.sin(elapsed * 9), 1, 0, 0);
        context.drawImage(butterfly, -size / 2, -size / 2, size, size);
        context.restore();
      }
      lastFlight.x = position.x;
      lastFlight.y = position.y;
      frame = requestAnimationFrame(paint);
    };

    resize();
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(paint);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={heroRef} className="reference-hero hero-video-cover" aria-label="视频作品集封面，蝴蝶跟随鼠标">
      <h1 className="visually-hidden">杨初雨的 AI 视觉设计作品集</h1>
      <video ref={videoRef} className="hero-video-static" src="/hero-loop-final.mp4" poster="/hero-poster.jpg" autoPlay muted loop playsInline preload="auto" onPlaying={() => setPlaybackBlocked(false)} />
      {playbackBlocked && <button className="hero-play-button" type="button" onClick={() => videoRef.current.play().catch(() => {})}>播放首页动画 <span aria-hidden="true">▷</span></button>}
      <p className="hero-identity">AI视觉设计</p>
      <canvas ref={effectsRef} className="hero-effects-canvas" aria-hidden="true" />
    </section>
  );
}

function ProfilePage() {
  useReveal();
  const [openExperience, setOpenExperience] = useState(null);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoSrc, setPhotoSrc] = useState("/profile-photo.jpg");
  const photoInputRef = useRef(null);
  const photoClickTimer = useRef(null);
  const profileTiltRef = useRef(null);
  const profileCoverRef = useRef(null);
  const profilePhotoRef = useRef(null);
  const profilePhotoInnerRef = useRef(null);
  const hoverOpenedExperience = useRef(null);

  useEffect(() => {
    let mounted = true;
    getImageDatabase().then(database => {
      const request = database.transaction("images").objectStore("images").get("profile-photo");
      request.onsuccess = () => {
        if (mounted && request.result) setPhotoSrc(URL.createObjectURL(request.result));
      };
    }).catch(() => {});
    return () => { mounted = false; window.clearTimeout(photoClickTimer.current); };
  }, []);

  useEffect(() => () => {
    if (photoSrc.startsWith("blob:")) URL.revokeObjectURL(photoSrc);
  }, [photoSrc]);

  const replaceProfilePhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("请选择图片文件。");
      return;
    }
    try {
      const database = await getImageDatabase();
      await new Promise((resolve, reject) => {
        const transaction = database.transaction("images", "readwrite");
        transaction.objectStore("images").put(file, "profile-photo");
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
      });
      setPhotoSrc(URL.createObjectURL(file));
    } catch {
      window.alert("图片未能保存，请重试。原照片没有改变。");
    }
  };

  const playProfilePhoto = async (opening) => {
    const photo = profilePhotoRef.current;
    const inner = profilePhotoInnerRef.current;
    const cover = profileCoverRef.current;
    if (photoBusy || !photo || !inner || !cover) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhotoOpen(opening);
      return;
    }

    setPhotoBusy(true);
    const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
    // The same white card remains tucked behind the cover, clears its right
    // edge, then flips above it. Reverse this exact path to put it back.
    const path = [
      { transform: "translate3d(18%, 0, 0) rotate(1deg)", offset: 0, easing: ease },
      { transform: "translate3d(112%, -1%, 0) rotate(3deg)", offset: .38, easing: ease },
      { transform: "translate3d(112%, -1%, 130px) rotate(3deg)", offset: .44, easing: ease },
      { transform: "translate3d(0, -3%, 130px) rotate(-4deg)", offset: .88, easing: ease },
      { transform: "translate3d(1%, -2%, 130px) rotate(-3deg)", offset: 1 },
    ];
    const flip = [
      { transform: "rotateY(-180deg)", offset: 0 },
      { transform: "rotateY(-180deg)", offset: .4, easing: ease },
      { transform: "rotateY(6deg)", offset: .9, easing: ease },
      { transform: "rotateY(0deg)", offset: 1 },
    ];
    const slit = [
      { transform: "translateZ(18px) rotateY(0deg)", offset: 0, easing: ease },
      { transform: "translateZ(18px) rotateY(-12deg)", offset: .15 },
      { transform: "translateZ(18px) rotateY(-12deg)", offset: .44, easing: ease },
      { transform: "translateZ(18px) rotateY(0deg)", offset: .62 },
      { transform: "translateZ(18px) rotateY(0deg)", offset: 1 },
    ];
    const animations = [
      photo.animate(path, { duration: 1150, direction: opening ? "normal" : "reverse", fill: "both" }),
      inner.animate(flip, { duration: 1150, direction: opening ? "normal" : "reverse", fill: "both" }),
      cover.animate(slit, { duration: 1150, direction: opening ? "normal" : "reverse", fill: "both" }),
    ];
    try {
      await Promise.all(animations.map(animation => animation.finished));
      setPhotoOpen(opening);
      // Keep the finished pose until React has applied the matching class.
      requestAnimationFrame(() => requestAnimationFrame(() => animations.forEach(animation => animation.cancel())));
    } finally {
      setPhotoBusy(false);
    }
  };

  const tiltProfilePhoto = (event) => {
    if (event.pointerType !== "mouse" || !profileTiltRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    profileTiltRef.current.style.transform = `rotateX(${-y * 5}deg) rotateY(${x * 6}deg)`;
  };

  const resetProfileTilt = () => {
    if (profileTiltRef.current) profileTiltRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };
  return (
    <>

      <div className="portfolio-body">
      <section id="profile" className="profile-screen" data-reveal>
        <div className="profile-sticky">
          <div className="profile-title-row">
            <h2 className="profile-title"><span><BlurText>About</BlurText></span> <span><BlurText>me</BlurText></span></h2>
            <SectionMark type="flower" />
          </div>
          <div
            className={`profile-photo-showcase${photoOpen ? " is-open" : ""}${photoBusy ? " is-busy" : ""}`}
            onPointerMove={tiltProfilePhoto}
            onPointerLeave={resetProfileTilt}
            data-reveal-item
          >
            <span className="profile-card-stage">
              <span className="profile-card-tilt" ref={profileTiltRef}>
                <span className="profile-card-shadow" aria-hidden="true" />
                <span className="profile-folder-base" aria-hidden="true" />
                <button
                  ref={profilePhotoRef}
                  className="profile-photo-card"
                  type="button"
                  aria-label="个人照片：单击收回，双击替换"
                  disabled={!photoOpen || photoBusy}
                  onClick={(event) => {
                    window.clearTimeout(photoClickTimer.current);
                    if (event.detail === 0) playProfilePhoto(false);
                    else if (event.detail === 1) photoClickTimer.current = window.setTimeout(() => playProfilePhoto(false), 500);
                  }}
                  onDoubleClick={() => {
                    window.clearTimeout(photoClickTimer.current);
                    photoInputRef.current?.click();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "F2") { event.preventDefault(); photoInputRef.current?.click(); }
                  }}
                >
                  <span className="profile-photo-card-inner" ref={profilePhotoInnerRef}>
                    <span className="profile-photo-card-face profile-photo-card-back" aria-hidden="true">
                      <img src="/profile-card-back.png" alt="" />
                    </span>
                    <span className="profile-photo-card-face profile-photo-card-front">
                      <img src={photoSrc} alt="个人照片" />
                    </span>
                  </span>
                </button>
                <button
                  ref={profileCoverRef}
                  className="profile-card-cover"
                  type="button"
                  aria-label="打开折叠卡纸并展示照片"
                  disabled={photoOpen || photoBusy}
                  onClick={() => playProfilePhoto(true)}
                >
                  <img className="profile-folder-art" src="/profile-folder.png" alt="点击图片" />
                </button>
              </span>
            </span>
            <input ref={photoInputRef} type="file" accept="image/*" hidden onChange={replaceProfilePhoto} />
          </div>
        </div>
        <div className="profile-resume">
          <div className="profile-summary">
            <p className="profile-summary-lead" data-reveal-item>
              <span className="profile-hello"><BlurText>HELLO，</BlurText></span><BlurText delay={90}>我是杨初雨，一名专注于 AI 视觉与数字人方向的视觉设计师。</BlurText>
            </p>
            <p className="profile-summary-ink" data-reveal-item><BlurText delay={160}>我擅长将 AI 创意转化为可落地的商业视觉，从数字人形象、广告素材到产品演示与品牌内容，都能完成从创意构思到最终交付。我喜欢探索 AI 与设计结合的更多可能，也希望用更高效、更有表现力的视觉方案，帮助产品被看见、被理解。</BlurText></p>
          </div>
          <div className="profile-experience">
            <h3 data-reveal-item><BlurText>工作经历</BlurText></h3>
            {experience.map((job, index) => (
              <div className="profile-job-reveal" data-reveal-item key={job.company}>
                <div
                  className={`profile-job${openExperience === index ? " is-open" : ""}`}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") {
                      hoverOpenedExperience.current = null;
                      setOpenExperience(null);
                    }
                  }}
                >
                  <button
                    className="profile-job-trigger"
                    type="button"
                    aria-expanded={openExperience === index}
                    aria-controls={`experience-${index}`}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        hoverOpenedExperience.current = index;
                        setOpenExperience(index);
                      }
                    }}
                    onClick={() => {
                      if (hoverOpenedExperience.current === index) {
                        hoverOpenedExperience.current = null;
                        setOpenExperience(index);
                        return;
                      }
                      setOpenExperience((current) => current === index ? null : index);
                    }}
                  >
                    <span><BlurText>{job.company}</BlurText></span><time><BlurText delay={90}>{job.date}</BlurText></time>
                    <svg className="profile-job-toggle" aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                  <div className="profile-job-panel" id={`experience-${index}`} aria-hidden={openExperience !== index}>
                    <div className="profile-job-content">
                      <strong><BlurText>{job.role}</BlurText></strong>
                      <p className="profile-job-summary"><BlurText delay={90}>{job.summary}</BlurText></p>
                      <ol className="profile-job-details">
                        {job.sections.map((section) => (
                          <li key={section.title}>
                            <h4><BlurText>{section.title}</BlurText></h4>
                            <p><BlurText delay={90}>{section.text}</BlurText></p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="profile-skills" aria-label="设计工具">
            {skills.map((skill) => <div className="profile-skill" data-reveal-item key={skill.name} role="img" aria-label={skill.name} title={skill.name}>
              <span className={`profile-skill-mark ${skill.className}`} aria-hidden="true">
                {skill.asset ? <img src={skill.asset} alt="" /> : skill.className === "skill-capcut" ? <svg viewBox="0 0 40 40" fill="none"><path d="M6 10h28L6 30h28L6 10Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="m10 12 20 16" stroke="currentColor" strokeWidth="2.5"/></svg> : skill.mark}
              </span>
            </div>)}
          </div>
        </div>
      </section>

      <ContactCallout />
      </div>
    </>
  );
}

function HomePage({ projectImages }) {
  useReveal();
  return <>
    <div className="home-story">
      <div className="home-story-stage">
        <HeroPortal />
        <ProjectCollection projectImages={projectImages} intro />
      </div>
    </div>
    <div className="portfolio-body">
      <div className="portfolio-outro">
        <VideoShowcase />
        <PersonalStrengths />
        <PortfolioEnding />
      </div>
    </div>
  </>;
}

function WorkPage({ projectImages }) {
  useReveal();
  return (
    <div className="portfolio-body work-page">
      <ProjectCollection projectImages={projectImages} />
    </div>
  );
}

function VideoPage() {
  useReveal();
  return <div className="portfolio-body standalone-page"><VideoShowcase /></div>;
}

function ContactPage() {
  useReveal();
  return <div className="portfolio-body standalone-page"><ContactCallout title="Contact" /></div>;
}

function PersonalStrengths() {
  const strengths = [
    { title: ["审美好", "重细节"], text: "对配色、构图、材质和比例有清晰判断，善于发现画面中的问题，把握整体风格与精致感。", mark: "flower", tint: "#eee7f8" },
    { title: ["会设计", "会制作"], text: "熟练使用 Photoshop、剪映，结合 ComfyUI 等 AI 工具，完成图片设计、精修和视频制作。", mark: "folder", tint: "#fff1cc" },
    { title: ["重执行", "善协作"], text: "有设计与运营项目经验，能结合推广需求制作内容，独立跟进交付，并根据反馈调整。", mark: "stack", tint: "#f6e8e6" },
  ];
  const tilt = event => {
    if (event.pointerType !== "mouse" || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) scale(1.015)`;
  };
  return <section className="strengths-section frame" aria-labelledby="strengths-title">
    <div className="strengths-heading"><h2 id="strengths-title"><BlurText>Advantages</BlurText></h2><SectionMark type="plane" /></div>
    <div className="strengths-grid">
      {strengths.map((strength, index) => <article className="strength-card" style={{ '--strength-tint': strength.tint }} key={strength.title[0]} tabIndex={0} data-reveal-item onPointerMove={tilt} onPointerLeave={event => event.currentTarget.style.removeProperty('transform')}>
        <span className="strength-number"><BlurText delay={index * 60}>{String(index + 1).padStart(2, '0')}</BlurText></span>
        <h3><BlurText delay={index * 60}>{strength.title[0]}</BlurText><br /><BlurText delay={60 + index * 60}>{strength.title[1]}</BlurText></h3>
        <p><BlurText by="block" delay={120 + index * 60}>{strength.text}</BlurText></p>
        <SectionMark type={strength.mark} className="strength-ornament" />
      </article>)}
    </div>
  </section>;
}

function PortfolioEnding() {
  return <section id="contact" className="portfolio-ending frame">
    <div className="ending-content">
      <div className="ending-signoff">
        <div className="ending-title"><h2><BlurText>Thank you</BlurText></h2><SectionMark type="heart" /></div>
        <p><BlurText delay={90}>很高兴，在这里与你相遇。</BlurText></p>
      </div>
    </div>
    <div className="ending-body">
      <ContactDetails presentation="ending" />
      <div className="ending-stage"><EndingAnimation /></div>
    </div>
    <footer className="ending-bottom">
      <span><BlurText by="words">© 2026 YANGCHUYU</BlurText></span>
      <a href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}><BlurText>返回顶部</BlurText><span aria-hidden="true">↑</span></a>
    </footer>
  </section>;
}

function ContactDetails({ presentation = "rows" }) {
  const [copied, setCopied] = useState("");

  const copyValue = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("");
    }
  };

  if (presentation === "ending") return <div className="ending-contacts" aria-label="个人联系方式">
    <div className="ending-contact-intro">
      <h3><BlurText>把想法，</BlurText><br /><BlurText delay={70}>变成下一次创作。</BlurText></h3>
      <p><BlurText delay={120}>我用 AI 探索角色、画面与故事。如果你也有一个想法，欢迎一起聊聊。</BlurText></p>
    </div>
    <button className="ending-email" type="button" onClick={() => copyValue("邮箱", "1942643495@qq.com")} aria-label="复制邮箱地址">
      <span className="ending-contact-label"><BlurText delay={90}>邮箱</BlurText></span><span className="ending-email-value"><BlurText delay={90}>1942643495@qq.com</BlurText><CopyMark /></span>
    </button>
    <div className="ending-contact-options">
      <button type="button" onClick={() => copyValue("电话", "13121143149")} aria-label="复制电话号码"><span><BlurText delay={160}>电话</BlurText></span><strong><BlurText delay={160}>131 2114 3149</BlurText></strong><CopyMark /></button>
      <button type="button" onClick={() => copyValue("微信", "X1942643495")} aria-label="复制微信号"><span><BlurText delay={220}>微信</BlurText></span><strong><BlurText delay={220}>X1942643495</BlurText></strong><CopyMark /></button>
    </div>
    <p className={`ending-copy-feedback${copied ? ' is-copied' : ''}`} role="status">{copied ? `${copied}已复制` : '点击联系方式即可复制'}</p>
  </div>;

  return <><address className="contact-ending-details" aria-label="个人联系方式" data-reveal>
        <div className="contact-detail-row contact-detail-primary">
          <span><BlurText>EMAIL</BlurText></span>
          <strong><a href="mailto:1942643495@qq.com"><BlurText>1942643495@qq.com</BlurText></a></strong>
          <button type="button" onClick={() => copyValue("EMAIL", "1942643495@qq.com")} aria-label="复制邮箱地址">
            <BlurText>{copied === "EMAIL" ? "已复制" : "复制"}</BlurText>
          </button>
        </div>
        <div className="contact-detail-row">
          <span><BlurText>NAME</BlurText></span>
          <strong><BlurText>YANG CHUYU</BlurText></strong>
          <button type="button" onClick={() => copyValue("NAME", "YANG CHUYU")} aria-label="复制姓名"><BlurText>{copied === "NAME" ? "已复制" : "复制"}</BlurText></button>
        </div>
        <div className="contact-detail-row">
          <span><BlurText>PHONE</BlurText></span>
          <strong><a href="tel:13121143149"><BlurText>131 2114 3149</BlurText></a></strong>
          <button type="button" onClick={() => copyValue("PHONE", "13121143149")} aria-label="复制电话号码">
            <BlurText>{copied === "PHONE" ? "已复制" : "复制"}</BlurText>
          </button>
        </div>
        <div className="contact-detail-row">
          <span><BlurText>WECHAT</BlurText></span>
          <strong><BlurText>X1942643495</BlurText></strong>
          <button type="button" onClick={() => copyValue("WECHAT", "X1942643495")} aria-label="复制微信号">
            <BlurText>{copied === "WECHAT" ? "已复制" : "复制"}</BlurText>
          </button>
        </div>
      </address><span className="copy-status" role="status">{copied ? "已复制到剪贴板" : ""}</span></>;
}

function CopyMark() {
  return <svg className="contact-copy-mark" aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M15 5V4H4v11h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ContactCallout({ title = "Thank you" }) {
  return (
    <section id="contact" className="contact-ending frame" data-reveal>
      <div className="contact-ending-copy">
        <div className="contact-title-row">
          <h2><BlurText>{title}</BlurText></h2>
          <SectionMark type="heart" />
        </div>
        <p className="contact-ending-subtitle"><BlurText by="words">很高兴，在这里与你相遇。</BlurText></p>
      </div>
      <ContactDetails />
      <EndingAnimation />
      <footer className="contact-colophon"><span><BlurText>YANGCHUYU</BlurText> <small><BlurText by="words" delay={90}>AI visual / Digital human</BlurText></small></span><a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}><BlurText by="words">Back to top</BlurText> <span aria-hidden="true">↑</span></a></footer>
    </section>
  );
}

function EndingAnimation() {
  const videoRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (!videoRef.current) return;
      if (visible && videoRef.current.readyState >= 2) setHasEntered(true);
      if (visible && !document.hidden && !media.matches) {
        videoRef.current.play().catch(() => {});
      } else videoRef.current.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= 0.18; syncPlayback(); }, { threshold: [0, 0.18] });
    observer.observe(videoRef.current);
    syncPlayback();
    const video = videoRef.current;
    video.addEventListener('loadeddata', syncPlayback);
    media.addEventListener("change", syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      video.removeEventListener('loadeddata', syncPlayback);
      media.removeEventListener("change", syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`contact-ending-animation${hasEntered ? ' has-entered' : ''}`}
      src="/ending-cat.mp4"
      poster="/ending-cat-poster.jpg"
      preload="none"
      loop
      muted
      playsInline
      aria-hidden="true"
    />
  );
}

const showcaseVideos = [
  { src: "/video-01.mp4", poster: "/video-01-poster.jpg", duration: "00:50", title: "AI character study", description: "角色、场景与镜头节奏的动态视觉实验。" },
  { src: "/video-02.mp4", poster: "/video-02-poster.jpg", duration: "01:04", title: "Digital human", description: "数字人内容与品牌表达的动态设计。" },
  { src: "/video-03.mp4", poster: "/video-03-poster.jpg", duration: "01:09", title: "Festival campaign", description: "节日氛围、角色表演与短片剪辑。" },
];

function VideoShowcase() {
  const inlineVideos = useRef([]);
  const expandedVideo = useRef(null);
  const dialogRef = useRef(null);
  const visibleVideos = useRef(new Set());
  const closeTimer = useRef(null);
  const playbackState = useRef({ time: 0, wasPlaying: true });
  const [activeVideo, setActiveVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(1);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      inlineVideos.current.forEach((video) => {
        if (!video) return;
        if (video === inlineVideos.current[previewVideo] && visibleVideos.current.has(video) && !reduceMotion.matches && !document.hidden && activeVideo === null) video.play().catch(() => {});
        else video.pause();
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleVideos.current.add(entry.target);
        else visibleVideos.current.delete(entry.target);
      });
      syncPlayback();
    }, { threshold: 0.35 });

    inlineVideos.current.forEach((video) => video && observer.observe(video));
    reduceMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [activeVideo, previewVideo]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (activeVideo === null) return;
    const dialog = dialogRef.current;
    const video = expandedVideo.current;
    if (!dialog || !video) return;

    if (!dialog.open) dialog.showModal();
    const continuePlayback = () => {
      video.currentTime = playbackState.current.time;
      if (playbackState.current.wasPlaying) video.play().catch(() => {});
    };
    if (video.readyState >= 1) continuePlayback();
    else video.addEventListener("loadedmetadata", continuePlayback, { once: true });
  }, [activeVideo]);

  const openVideo = (index) => {
    const source = inlineVideos.current[index];
    playbackState.current = {
      time: source?.currentTime || 0,
      wasPlaying: true,
    };
    inlineVideos.current.forEach((video) => video?.pause());
    setActiveVideo(index);
  };

  const closeVideo = () => {
    if (activeVideo === null || isClosing) return;
    const modalVideo = expandedVideo.current;
    if (modalVideo) {
      playbackState.current.time = modalVideo.currentTime;
      playbackState.current.wasPlaying = !modalVideo.paused;
      modalVideo.pause();
    }
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      dialogRef.current?.close();
      const source = inlineVideos.current[activeVideo];
      if (source) {
        source.currentTime = playbackState.current.time;
      }
      setActiveVideo(null);
      setIsClosing(false);
    }, 220);
  };

  const active = activeVideo === null ? null : showcaseVideos[activeVideo];

  return (
    <section id="motion" className="video-showcase video-composition frame">
        <header className="video-showcase-heading">
          <h2><BlurText>Video</BlurText></h2>
          <SectionMark type="video" />
        </header>
      <div className="video-composition-body">
      <div className="video-intro" data-reveal-item>
        <p className="video-intro-lead"><BlurText>让想象，</BlurText><br /><BlurText delay={90}>有了新的生命。</BlurText></p>
        <div className="video-intro-notes"><p><BlurText delay={160}>从 AI 角色到数字人，从品牌叙事到节日短片。用影像连接创意、情绪与真实的体验。</BlurText></p><p><BlurText delay={240}>探索角色的表情与动作、场景的光影，以及镜头之间的节奏。让每一个想法，从静态画面走向生动的故事。</BlurText></p><span><BlurText by="words" delay={300}>AI character · Digital human · Brand film</BlurText></span></div>
      </div>
      <div className="video-mosaic" data-scene={previewVideo} data-reveal-item onPointerLeave={() => setPreviewVideo(1)}>
        {showcaseVideos.map((video, index) => (
          <button className={"video-tile video-tile-" + (index + 1)} key={video.src} type="button"
            onPointerEnter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setPreviewVideo(index); }}
            onFocus={() => setPreviewVideo(index)} onBlur={() => setPreviewVideo(1)}
            onClick={() => openVideo(index)} aria-label={"放大播放视频 " + (index + 1)}>
            <video ref={node => { inlineVideos.current[index] = node; }} src={video.src} poster={video.poster} muted loop playsInline preload="none" />
            <span className="video-tile-title"><strong><BlurText by="words">{video.title}</BlurText></strong><span><BlurText delay={90}>{video.duration}</BlurText></span></span>
            <span className="video-tile-play" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      </div>

      {active && (
        <dialog
          ref={dialogRef}
          className={`video-lightbox${isClosing ? " is-closing" : ""}`}
          onCancel={(event) => { event.preventDefault(); closeVideo(); }}
          onClick={(event) => { if (event.target === event.currentTarget) closeVideo(); }}
          aria-label={`视频 ${activeVideo + 1} 放大播放`}
        >
          <div className="video-lightbox-panel">
            <button className="video-lightbox-close" type="button" onClick={closeVideo} aria-label="关闭放大视频">×</button>
            <video ref={expandedVideo} src={active.src} poster={active.poster} muted playsInline controls autoPlay />
          </div>
        </dialog>
      )}
    </section>
  );
}

function ProjectPage({ projectImages }) {
  useReveal();
  const { slug } = useParams();
  const location = useLocation();
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) return <Navigate to="/work" replace />;

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="frame project-detail page-content">
      <Link className="project-close" to={location.state?.from || "/work"} aria-label="Close project">×</Link>
      <header className="detail-heading" data-reveal>
        <div>
          <Link className="back-link link-line" to="/work"><BlurText by="words">Back to work</BlurText></Link>
          <h1><BlurText>{project.name}</BlurText></h1>
        </div>
        <dl>
          <div><dt><BlurText>Service</BlurText></dt><dd><BlurText by="words" delay={90}>{project.service}</BlurText></dd></div>
          <div><dt><BlurText>Year</BlurText></dt><dd><BlurText delay={90}>{project.year}</BlurText></dd></div>
          <div><dt><BlurText>Role</BlurText></dt><dd><BlurText by="words" delay={90}>Design & Development</BlurText></dd></div>
        </dl>
      </header>

      <figure className={`detail-cover ${project.tone}`} data-reveal>
        <img src={projectImages[project.slug] || `/work-placeholders/${project.slug}.jpg`} alt={`${project.name} project cover`} />
      </figure>

      <section className="detail-story" data-reveal>
        <h2><BlurText>{detailCopy[project.slug]}</BlurText></h2>
        <p><BlurText by="words" delay={90}>This foundation keeps project content deliberately simple. Replace this copy and the imagery when the final art direction is ready.</BlurText></p>
      </section>

      <div className="detail-gallery" data-reveal>
        <figure className={project.tone}><img src="/project-cover.png" alt="Project detail placeholder" /></figure>
        <figure className={project.tone}><img src="/project-cover.png" alt="Project detail placeholder" /></figure>
      </div>

      <nav className="project-pagination" aria-label="Project pagination" data-reveal>
        <Link to={previous.href || `/work/${previous.slug}`} reloadDocument={Boolean(previous.href)} state={previous.href ? undefined : location.state}><span><BlurText>Previous</BlurText></span><strong><BlurText delay={90}>{previous.name}</BlurText></strong></Link>
        <Link to={next.href || `/work/${next.slug}`} reloadDocument={Boolean(next.href)} state={next.href ? undefined : location.state}><span><BlurText>Next</BlurText></span><strong><BlurText delay={90}>{next.name}</BlurText></strong></Link>
      </nav>
    </article>
  );
}

function ProjectModal({ projectImages }) {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const project = projects.find((item) => item.slug === slug);
  const returnTo = location.state?.from || "/work";

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => navigate(returnTo, { state: { preserveScroll: true } }), 220);
    return () => clearTimeout(timer);
  }, [closing, navigate, returnTo]);

  if (!project) return null;

  return (
    <dialog ref={dialogRef} className={`project-modal${closing ? " is-closing" : ""}`} aria-labelledby="modal-project-title" onCancel={(event) => { event.preventDefault(); setClosing(true); }}>
      <button type="button" className="project-modal-close" onClick={() => setClosing(true)} aria-label="Close project">×</button>
      <header className="project-modal-heading">
        <h1 id="modal-project-title"><BlurText>{project.name}</BlurText></h1>
        <p><BlurText by="words" delay={90}>{detailCopy[project.slug]}</BlurText></p>
      </header>
      <div className="project-modal-gallery">
        <img src={projectImages[project.slug] || `/work-placeholders/${project.slug}.jpg`} alt={`${project.name} project artwork`} />
        <img src="/project-cover.png" alt={`${project.name} project artwork detail`} />
      </div>
    </dialog>
  );
}

export default function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const [projectImages, setProjectImages] = useState({});

  useEffect(() => {
    let mounted = true;
    getImageDatabase().then((database) => {
      for (const project of projects) {
        const request = database.transaction("images").objectStore("images").get(project.slug);
        request.onsuccess = () => {
          if (mounted && request.result) {
            setProjectImages((current) => ({ ...current, [project.slug]: URL.createObjectURL(request.result) }));
          }
        };
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <Shell backgroundLocation={backgroundLocation}>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomePage projectImages={projectImages} />} />
        <Route path="/work" element={<WorkPage projectImages={projectImages} />} />
        <Route path="/yangchuyu" element={<ProfilePage />} />
        <Route path="/work/:slug" element={<ProjectPage projectImages={projectImages} />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {backgroundLocation && <Routes><Route path="/work/:slug" element={<ProjectModal projectImages={projectImages} />} /></Routes>}
    </Shell>
  );
}
