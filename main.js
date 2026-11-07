(function(){
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,$=function(i){return document.getElementById(i)};
  var pre=$('pre'),root=document.documentElement;
  if(pre&&root.classList.contains('show-pre')){
    var pn=$('pn'),p=0;
    var fin=function(instant){
      try{sessionStorage.setItem('pre','1')}catch(e){}
      root.classList.remove('pre-lock');
      if(instant){root.classList.remove('show-pre');return}
      pre.classList.add('done');setTimeout(function(){root.classList.remove('show-pre')},1000);
    };
    if(rm){fin(true)}else{var t=setInterval(function(){p+=Math.ceil(Math.random()*9);if(p>=100){p=100;clearInterval(t);setTimeout(fin,250)}pn.textContent=p+'%'},55)}
  }
  var m=$('menu'),mb=$('mb');
  function tog(o){m.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o)}
  mb.onclick=function(){tog(true)};$('mc').onclick=function(){tog(false)};
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){tog(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')tog(false)});
  var tr=$('track');if(tr)tr.innerHTML+=tr.innerHTML;
  var els=document.querySelectorAll('[data-n]');
  function run(el){var to=+el.dataset.n,d=+(el.dataset.d||0),s=el.dataset.s||'',st=performance.now();
    if(rm){el.textContent=to.toFixed(d)+s;return}
    (function f(now){var k=Math.min((now-st)/1400,1),e=1-Math.pow(1-k,3);el.textContent=(to*e).toFixed(d)+(k===1?s:'');if(k<1)requestAnimationFrame(f)})(st)}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.6});
    els.forEach(function(e){io.observe(e)});
  }else{els.forEach(run)}
})();
