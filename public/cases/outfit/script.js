const methodData = [
  ['功能先行', '优先梳理功能性节点：换装需要图像编辑，参考图解析需要 LLM。先明确每个节点的职责，再考虑如何连接。'],
  ['输入与输出衔接', '用流程性节点把功能节点串起来。让 Image 与 Prompt 进入图像编辑节点，再把生成结果传递到结束节点。'],
  ['先跑通最小闭环', '优先验证单一线程：上传原图、输入提示词、输出新图。确认核心能力可用，再扩展流程复杂度。'],
  ['按需求扩展', '当用户需要多套提示词时，再引入参数提取器与迭代节点，实现参考图描述的批量整合与输出。']
];
const fullPrompt = '一个约20岁的欧美少女啦啦队员，棕色皮肤，金发碧眼，面带甜美笑容，正面直视镜头，坐姿，一条腿自然垂下，另一条腿蜷曲，上半身微微倾斜，一只胳膊高高举起，另一只胳膊拿着水瓶放在嘴边。她化着精致的妆容，浅棕色眉毛，大地色眼影，眼线微微上扬，睫毛纤长浓密，涂着粉色口红，戴着小巧的钻石耳钉。穿着蓝色长袖短款啦啦队服外套，白色翻领和前襟，前襟有三颗蓝色五角星装饰，下摆是白色流苏，内搭蓝色抹胸，在胸前打结；下身是白色短裤，裤腰上系着白色腰带，腰带上有银色扣环和蓝色五角星装饰。人物占据画面约三分之二，背景是体育场看台和跑道，视角略微仰视，中景镜头。';
const promptData = [document.querySelector('#prompt-text').textContent, '她化着精致的妆容，浅棕色眉毛，大地色眼影，眼线微微上扬，睫毛纤长浓密，涂着粉色口红，戴着小巧的钻石耳钉。\n\n穿着蓝色长袖短款啦啦队服外套，白色翻领和前襟，前襟有三颗蓝色五角星装饰，下摆是白色流苏，内搭蓝色抹胸，在胸前打结；下身是白色短裤，裤腰上系着白色腰带，腰带上有银色扣环和蓝色五角星装饰。', fullPrompt];

function wireTabs(selector, onSelect) {
  const tabs = [...document.querySelectorAll(selector)];
  function activate(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    onSelect(index, tabs[index]);
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || (selector === '[data-method]' && event.key === 'ArrowDown')) next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || (selector === '[data-method]' && event.key === 'ArrowUp')) next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {event.preventDefault(); activate(next, true);}
    });
  });
}
wireTabs('[data-look]', (index, tab) => {
  const images = [...document.querySelectorAll('.study-image')];
  images.forEach((img, i) => { img.classList.toggle('is-visible', i === index); img.setAttribute('aria-hidden', String(i !== index)); });
  document.querySelector('#hero-preview').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#look-caption').textContent = index === 0 ? '人物原图 · 红白上衣造型' : '蓝银色啦啦队造型';
});
wireTabs('[data-method]', (index, tab) => {
  document.querySelector('#method-detail-label').textContent = methodData[index][0];
  document.querySelector('#method-detail-text').textContent = methodData[index][1];
  document.querySelector('#method-panel').setAttribute('aria-labelledby', tab.id);
});
wireTabs('[data-prompt]', (index, tab) => {
  document.querySelector('#prompt-text').textContent = promptData[index];
  const panel = document.querySelector('#prompt-panel');
  panel.setAttribute('aria-labelledby', tab.id);
  panel.scrollTop = 0;
});

const slider = document.querySelector('#compare-slider');
function updateComparison() {
  slider.closest('.comparison').style.setProperty('--split', `${slider.value}%`);
  slider.setAttribute('aria-valuetext', `原图显示 ${slider.value}%`);
}
slider.addEventListener('input', updateComparison);
document.querySelector('#compare-reset').addEventListener('click', () => { slider.value = 50; updateComparison(); });

let toastTimer;
function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}
document.querySelector('#copy-prompt').addEventListener('click', async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(fullPrompt);
    else {
      const text = document.createElement('textarea');
      text.value = fullPrompt;
      text.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.append(text);
      text.select();
      const copied = document.execCommand('copy');
      text.remove();
      if (!copied) throw new Error('copy unavailable');
      document.querySelector('#copy-prompt').focus();
    }
    showToast('完整提示词已复制');
  } catch {
    document.querySelector('#prompt-tab-2').click();
    showToast('请在「完整提示词」中选中文字复制');
  }
});

const navLinks = [...document.querySelectorAll('.site-header nav a')];
const chapters = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollQueued = false;
function updateReading() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = max > 0 ? Math.min(100, Math.round(window.scrollY / max * 100)) : 0;
  document.querySelector('#reading-progress').textContent = `${percentage}%`;
  document.querySelector('#progress-line').style.transform = `scaleX(${percentage / 100})`;
  let active = -1;
  chapters.forEach((chapter, index) => { if (chapter.getBoundingClientRect().top <= 180) active = index; });
  navLinks.forEach((link, index) => {
    if (index === active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateReading); } }, {passive:true});
window.addEventListener('resize', updateReading);
window.addEventListener('load', updateReading);
updateReading();



const methodMedia = window.matchMedia('(max-width:600px)');
function updateMethodOrientation(){document.querySelector('.method-tabs').setAttribute('aria-orientation',methodMedia.matches?'vertical':'horizontal');}
methodMedia.addEventListener('change',updateMethodOrientation);
updateMethodOrientation();
