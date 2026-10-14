const mediaDialog=document.querySelector('#media-dialog');
const dialogVideo=document.querySelector('#dialog-video');
const dialogImage=document.querySelector('#dialog-image');
const dialogTitle=document.querySelector('#media-title');
const mediaError=document.querySelector('#media-error');
const hoverPreview=matchMedia('(hover:hover) and (pointer:fine)');
const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
const previewVideos=[...document.querySelectorAll('button > video, #stage-video')];
let activePreview=null;
let dialogTransition=null;
let closing=false;
const dialogEase='cubic-bezier(.23,1,.32,1)';
function showMedia(event){
  if(dialogTransition)dialogTransition.cancel();
  closing=false;
  mediaDialog.showModal();
  if(!reducedMotion.matches&&event.detail>0){
    dialogTransition=mediaDialog.animate([{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:250,easing:dialogEase});
  }
}
function closeMedia(event){
  if(closing)return;
  dialogVideo.pause();
  if(reducedMotion.matches||!event||event.detail===0){mediaDialog.close();return;}
  closing=true;
  if(dialogTransition)dialogTransition.cancel();
  dialogTransition=mediaDialog.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.96)'}],{duration:200,easing:dialogEase});
  dialogTransition.onfinish=()=>{mediaDialog.close();closing=false;};
}
function pausePreviews(){previewVideos.forEach(video=>video.pause());activePreview=null;}
function openVideo(key,title,event){
  pausePreviews();
  dialogImage.hidden=true;
  dialogVideo.hidden=false;
  mediaError.hidden=true;
  dialogTitle.textContent=title;
  dialogVideo.poster=`assets/${key==='ambient'?'hero':key}.jpg`;
  dialogVideo.src=`assets/${key}.mp4?v=20261014`;
  dialogVideo.load();
  showMedia(event);
  dialogVideo.play().catch(()=>{});
}
document.querySelectorAll('[data-video]').forEach(button=>{
  button.addEventListener('click',event=>openVideo(button.dataset.video,button.dataset.title,event));
  const preview=button.querySelector('video');
  if(!preview)return;
  const previewState=document.createElement('span');
  previewState.className='preview-state';
  previewState.setAttribute('aria-hidden','true');
  previewState.innerHTML='<span><i></i><i></i><i></i></span>动态预览';
  button.append(previewState);
  preview.addEventListener('playing',()=>button.classList.add('is-previewing'));
  preview.addEventListener('pause',()=>button.classList.remove('is-previewing'));
  button.addEventListener('mouseenter',()=>{
    if(!hoverPreview.matches||reducedMotion.matches||mediaDialog.open)return;
    pausePreviews();
    activePreview=preview;
    preview.play().catch(()=>{});
  });
  button.addEventListener('mouseleave',()=>{
    preview.pause();
    if(activePreview===preview)activePreview=null;
  });
});
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',event=>{
  pausePreviews();
  dialogVideo.pause();
  dialogVideo.hidden=true;
  dialogImage.hidden=false;
  dialogImage.src=button.dataset.image;
  dialogImage.alt=button.querySelector('img')?.alt||button.dataset.imageTitle||'中国时空北斗主题数字人完整效果图';
  mediaError.hidden=true;
  dialogTitle.textContent=button.dataset.imageTitle||'中国时空集团 北斗主题数字人最终效果';
  showMedia(event);
}));
document.querySelector('#close-dialog').addEventListener('click',closeMedia);
mediaDialog.addEventListener('close',()=>{
  closing=false;
  if(dialogTransition)dialogTransition.cancel();
  dialogVideo.pause();
  dialogVideo.removeAttribute('src');
  dialogVideo.load();
  mediaError.hidden=true;
});
mediaDialog.addEventListener('click',event=>{
  if(event.target!==mediaDialog)return;
  const bounds=mediaDialog.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)closeMedia(event);
});
dialogVideo.addEventListener('error',()=>{if(mediaDialog.open&&!dialogVideo.hidden)mediaError.hidden=false;});
document.addEventListener('visibilitychange',()=>{if(document.hidden){pausePreviews();dialogVideo.pause();}});
const previewObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(!entry.isIntersecting){entry.target.pause();if(activePreview===entry.target)activePreview=null;}});
},{threshold:.2});
previewVideos.forEach(video=>previewObserver.observe(video));

// The gesture workspace keeps all nine choices visible and plays the selection in place.
const gestureChoices=[...document.querySelectorAll('[data-gesture]')];
const stageVideo=document.querySelector('#stage-video');
const stageName=document.querySelector('#stage-name');
const stageContext=document.querySelector('#stage-context');
const stageDescription=document.querySelector('#stage-description');
const stagePlay=document.querySelector('#stage-play');
const stagePlayLabel=document.querySelector('#stage-play-label');
const gestureDescriptions={
  greeting:'用自然的招呼动作，回应用户进入的欢迎场景。',
  intro:'以开放的引导姿态，承接企业业务介绍与信息导览。',
  'intro-alt':'通过另一组介绍动作，适配不同的内容展示节奏。',
  explain:'配合信息讲解，让业务表达更自然、更有交流感。',
  thinking:'用思索姿态承接信息处理，让等待状态也有自然表达。',
  waiting:'抱胸动作匹配思考与等待，避免僵硬的站立状态。',
  nod:'用点头传达认可，提供清楚、自然的互动反馈。',
  heart:'比心强化亲和力，降低用户与科技产品交流的距离感。',
  cheer:'用加油动作表达鼓励，回应用户的积极互动。'
};
let selectedGesture=gestureChoices.find(choice=>choice.getAttribute('aria-pressed')==='true')||gestureChoices[0];
const stageSeek=document.querySelector('#stage-seek');
const stageElapsed=document.querySelector('#stage-elapsed');
const stageDuration=document.querySelector('#stage-duration');
const formatTime=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
function updateStageTimeline(){
  const duration=Number.isFinite(stageVideo.duration)?stageVideo.duration:0;
  const progress=duration?stageVideo.currentTime/duration*100:0;
  stageSeek.disabled=!duration;
  stageSeek.value=String(progress);
  stageSeek.style.setProperty('--progress',`${progress}%`);
  stageElapsed.textContent=formatTime(stageVideo.currentTime);
  stageDuration.textContent=formatTime(duration);
}
stageVideo.addEventListener('loadedmetadata',updateStageTimeline);
stageVideo.addEventListener('timeupdate',updateStageTimeline);
stageVideo.addEventListener('emptied',updateStageTimeline);
stageSeek.addEventListener('input',()=>{
  if(Number.isFinite(stageVideo.duration))stageVideo.currentTime=Number(stageSeek.value)/100*stageVideo.duration;
});
function selectGesture(choice,event){
  pausePreviews();
  selectedGesture=choice;
  const key=choice.dataset.gesture;
  gestureChoices.forEach(item=>item.setAttribute('aria-pressed',String(item===choice)));
  stageName.textContent=choice.dataset.name;
  stageContext.textContent=choice.dataset.context;
  stageDescription.textContent=gestureDescriptions[key];
  document.querySelector('#stage-counter').textContent=`${String(gestureChoices.indexOf(choice)+1).padStart(2,'0')} / 09`;
  stageVideo.setAttribute('aria-label',`当前动作预览：${choice.dataset.name}`);
  stageVideo.poster=`assets/${key}.jpg`;
  stageVideo.src=`assets/${key}.mp4?v=20261014`;
  stageVideo.load();
  if(matchMedia('(max-width:800px)').matches){
    document.querySelector('.gesture-stage').scrollIntoView({behavior:'instant',block:'start'});
  }
  if(event.detail>0&&!reducedMotion.matches){
    document.querySelector('.stage-screen').animate([{opacity:.65},{opacity:1}],{duration:200,easing:dialogEase});
  }
  stageVideo.play().catch(()=>{});
}
gestureChoices.forEach(choice=>choice.addEventListener('click',event=>selectGesture(choice,event)));
stagePlay.addEventListener('click',()=>{
  if(stageVideo.paused){pausePreviews();stageVideo.play().catch(()=>{});}
  else stageVideo.pause();
});
stageVideo.addEventListener('play',()=>{
  stagePlayLabel.textContent='暂停动作';
  stagePlay.setAttribute('aria-label','暂停当前动作');
  stagePlay.firstElementChild.textContent='Ⅱ';
});
stageVideo.addEventListener('pause',()=>{
  stagePlayLabel.textContent='播放动作';
  stagePlay.setAttribute('aria-label','播放当前动作');
  stagePlay.firstElementChild.textContent='▶';
});
stageVideo.addEventListener('error',()=>{
  stageDescription.textContent='动作暂时无法播放，请重新选择动作或点击放大预览。';
});

document.querySelector('#stage-expand').addEventListener('click',event=>{
  openVideo(selectedGesture.dataset.gesture,`${selectedGesture.dataset.name} ${selectedGesture.dataset.context}`,event);
});

// Reveal the single full scene once as it enters the reading flow.
const finalScene=document.querySelector('.full-scene');
if(!reducedMotion.matches&&finalScene.getBoundingClientRect().top>innerHeight){
  finalScene.dataset.reveal='pending';
  const sceneObserver=new IntersectionObserver(entries=>{
    if(!entries.some(entry=>entry.isIntersecting))return;
    finalScene.dataset.reveal='visible';
    sceneObserver.disconnect();
  },{threshold:.15});
  sceneObserver.observe(finalScene);
  reducedMotion.addEventListener('change',()=>{
    if(reducedMotion.matches){finalScene.dataset.reveal='visible';sceneObserver.disconnect();}
  });
}
