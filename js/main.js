// Mobile nav
document.addEventListener('click',e=>{if(e.target.closest('.burger'))document.querySelector('.nav').classList.toggle('open')});
// Reviews carousel
document.querySelectorAll('.carousel').forEach(c=>{const t=c.querySelector('.track'),n=t.children.length,d=c.parentElement.querySelector('.dots');let i=0,timer;
 for(let k=0;k<n;k++){const b=document.createElement('button');b.setAttribute('aria-label','Review '+(k+1));b.onclick=()=>go(k);d&&d.appendChild(b)}
 function go(k){i=(k+n)%n;t.style.transform=`translateX(-${i*100}%)`;d&&[...d.children].forEach((b,j)=>b.classList.toggle('on',j===i));clearInterval(timer);timer=setInterval(()=>go(i+1),9000)}
 c.querySelector('.prev').onclick=()=>go(i-1);c.querySelector('.next').onclick=()=>go(i+1);go(0)});
// Placeholder form handler: never sends anything
document.querySelectorAll('form[data-placeholder]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();let m=f.querySelector('.form-msg');if(!m){m=document.createElement('div');m.className='form-msg';f.appendChild(m)}
 m.textContent='Thanks! (Demo only: this form is a placeholder and nothing was sent. Please call +1(702) 703-9343 or email lasvegasdolly@gmail.com.)';m.style.display='block'}));
// Calculators
const $=id=>document.getElementById(id),num=id=>parseFloat(($(id)||{}).value)||0,money=v=>'$'+Math.round(v).toLocaleString();
function pmt(P,rate,years){const r=rate/100/12,n=years*12;return r?P*r/(1-Math.pow(1+r,-n)):P/n}
if($('mc-form')){const dp=$('mc-down'),dpp=$('mc-downpct'),hp=$('mc-price'),tx=$('mc-tax'),txp=$('mc-taxpct');
 dp.oninput=()=>dpp.value=hp.value?(dp.value/hp.value*100).toFixed(1):0;dpp.oninput=()=>dp.value=Math.round(hp.value*dpp.value/100);
 tx.oninput=()=>txp.value=hp.value?(tx.value/hp.value*100).toFixed(2):0;txp.oninput=()=>tx.value=Math.round(hp.value*txp.value/100);
 hp.oninput=()=>{dp.value=Math.round(hp.value*dpp.value/100);tx.value=Math.round(hp.value*txp.value/100)};
 const calc=e=>{e&&e.preventDefault();const P=num('mc-price')-num('mc-down'),y=num('mc-term'),pi=pmt(P,num('mc-rate'),y),tax=num('mc-tax')/12,ins=num('mc-ins')/12,hoa=num('mc-hoa'),tot=pi+tax+ins+hoa;
  $('mc-total').textContent=money(tot);$('mc-pi').textContent=money(pi);$('mc-taxm').textContent=money(tax);$('mc-insm').textContent=money(ins);$('mc-hoam').textContent=money(hoa);
  $('mc-sum').textContent=`Your mortgage payments over ${y} years will add up to ${money(tot*y*12)}.`;
  let bal=P,r=num('mc-rate')/100/12,rows='';for(let yr=1;yr<=y;yr++){let ip=0,pp=0;for(let m=0;m<12;m++){const i=bal*r,p=Math.min(pi-i,bal);ip+=i;pp+=p;bal-=p}rows+=`<tr><td>${yr}</td><td>${money(pp)}</td><td>${money(ip)}</td><td>${money(Math.max(bal,0))}</td></tr>`}
  $('mc-sched').innerHTML=rows};$('mc-form').addEventListener('submit',calc);calc()}
if($('ac-form')){const calc=e=>{e&&e.preventDefault();const inc=num('ac-income')/12,debts=num('ac-debts'),dti=num('ac-dti')/100,y=num('ac-term'),rate=num('ac-rate'),taxr=num('ac-taxpct')/100,ins=num('ac-ins')/12,hoa=num('ac-hoa'),down=num('ac-down');
  const budget=Math.max(inc*dti-debts,0);const r=rate/100/12,n=y*12,f=r?(1-Math.pow(1+r,-n))/r:n;
  // solve price: pmt(price-down)+price*taxr/12+ins+hoa = budget
  let price=(budget-ins-hoa+down/f)/(1/f+taxr/12);price=Math.max(price,down);const loan=Math.max(price-down,0),pi=pmt(loan,rate,y);
  $('ac-price').textContent=money(price);$('ac-dtiout').textContent=num('ac-dti')+'%';$('ac-month').textContent=money(pi+price*taxr/12+ins+hoa);
  $('ac-pi').textContent=money(pi);$('ac-taxm').textContent=money(price*taxr/12);$('ac-insm').textContent=money(ins);$('ac-hoam').textContent=money(hoa);
  const d=num('ac-dti');$('ac-verdict').textContent=d<=36?'Quite affordable.':''};
 $('ac-form').addEventListener('submit',calc);calc()}
