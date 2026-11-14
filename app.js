/* ZAKO PS4 HOST V3.1 — information portal only */
"use strict";
const OFFICIAL_RELEASES_API="https://api.github.com/repos/GoldHEN/GoldHEN/releases?per_page=5";
const OFFICIAL_RELEASES_PAGE="https://github.com/GoldHEN/GoldHEN/releases";
const CACHE_KEY="zako_goldhen_releases_v1";
const fwData={
"9.00":{type:"official",en:"Listed in the official GoldHEN v2.4b18 supported firmware notes.",ar:"مدرج في قائمة إصدارات النظام المدعومة رسمياً في GoldHEN v2.4b18.",src:OFFICIAL_RELEASES_PAGE},
"9.60":{type:"official",en:"Listed in the official GoldHEN v2.4b18 supported firmware notes.",ar:"مدرج في قائمة الإصدارات المدعومة رسمياً في GoldHEN v2.4b18.",src:OFFICIAL_RELEASES_PAGE},
"10.00":{type:"official",en:"Listed in the official GoldHEN v2.4b18 supported firmware notes.",ar:"مدرج في قائمة الإصدارات المدعومة رسمياً في GoldHEN v2.4b18.",src:OFFICIAL_RELEASES_PAGE},
"10.01":{type:"official",en:"Listed in the official GoldHEN v2.4b18 supported firmware notes.",ar:"مدرج في قائمة الإصدارات المدعومة رسمياً في GoldHEN v2.4b18.",src:OFFICIAL_RELEASES_PAGE},
"11.00":{type:"official",en:"Listed in the official GoldHEN v2.4b18 supported firmware notes.",ar:"مدرج في قائمة الإصدارات المدعومة رسمياً في GoldHEN v2.4b18.",src:OFFICIAL_RELEASES_PAGE},
"13.52":{type:"community",en:"An independent community host reports this version. This is not official GoldHEN firmware support.",ar:"مضيف مجتمعي مستقل يذكر هذا الإصدار. هذا ليس دعماً رسمياً من GoldHEN.",src:"https://github.com/X-F1REBALL-X/ps4-jb"},
"14.00":{type:"community",en:"An independent community host reports this version. This is not official GoldHEN firmware support.",ar:"مضيف مجتمعي مستقل يذكر هذا الإصدار. هذا ليس دعماً رسمياً من GoldHEN.",src:"https://github.com/X-F1REBALL-X/ps4-jb"},
"14.02":{type:"community",en:"An independent community host reports this version. This is not official GoldHEN firmware support.",ar:"مضيف مجتمعي مستقل يذكر هذا الإصدار. هذا ليس دعماً رسمياً من GoldHEN.",src:"https://github.com/X-F1REBALL-X/ps4-jb"}
};
const versions=["9.00","9.03","9.04","9.50","9.51","9.60","10.00","10.01","10.50","10.70","10.71","11.00","11.02","11.50","11.52","12.00","12.02","12.50","12.52","13.00","13.02","13.04","13.50","13.52","14.00","14.02"];
const $=id=>document.getElementById(id);
const sel=$("fw");
versions.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent="Firmware "+v;sel.appendChild(o)});
let lang="en";
function renderLanguage(){
 document.documentElement.lang=lang;document.body.dir=lang==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-en]").forEach(el=>{el.textContent=el.dataset[lang]||el.dataset.en});
 $("lang").textContent=lang==="en"?"العربية":"English";
}
function checkFirmware(){
 const v=sel.value,r=$("result");
 if(!v){r.replaceChildren();const b=document.createElement("b");b.textContent=lang==="en"?"Select a firmware first":"اختر إصدار النظام أولاً";r.appendChild(b);return}
 const d=fwData[v];r.replaceChildren();
 const b=document.createElement("b"),p=document.createElement("p");
 if(!d){b.className="unknown";b.textContent=lang==="en"?"UNVERIFIED / NO CONFIRMED ENTRY":"غير مؤكد / لا توجد معلومة موثقة";p.textContent=lang==="en"?"No verified compatibility entry is recorded for this exact version. Do not infer support from nearby firmware numbers.":"لا توجد معلومة توافق مؤكدة لهذا الإصدار تحديداً. لا تستنتج الدعم من إصدارات قريبة."}
 else{b.className=d.type;b.textContent=d.type==="official"?(lang==="en"?"OFFICIAL GOLDHEN DOCUMENTATION":"توثيق GoldHEN الرسمي"):(lang==="en"?"INDEPENDENT COMMUNITY REPORT":"تقرير مجتمعي مستقل");p.textContent=d[lang]}
 r.append(b,p);
 if(d){const a=document.createElement("a");a.href=d.src;a.target="_blank";a.rel="noopener";a.textContent=lang==="en"?"Open original source ↗":"فتح المصدر الأصلي ↗";r.appendChild(a)}
}
function safeDate(value){const d=new Date(value);return Number.isNaN(d.getTime())?"":d.toLocaleDateString(lang==="ar"?"ar-IQ":"en-GB",{year:"numeric",month:"short",day:"numeric"})}
function setReleaseStatus(key){const el=$("release-status");if(el)el.textContent=el.dataset[key]||key}
function renderReleases(items,fromCache){
 const list=$("release-list");if(!list)return;list.replaceChildren();
 items.slice(0,5).forEach(item=>{
  const card=document.createElement("article");card.className="release-item";
  const title=document.createElement("b");title.textContent=item.name||item.tag_name||"GoldHEN release";
  const meta=document.createElement("span");meta.textContent=[item.tag_name,safeDate(item.published_at),item.prerelease?(lang==="ar"?"نسخة تجريبية":"PRE-RELEASE"):""].filter(Boolean).join(" · ");
  const body=document.createElement("p");body.textContent=(item.body||"").replace(/\r/g,"").slice(0,360)|| (lang==="ar"?"لا توجد ملاحظات إصدار منشورة.":"No release notes provided.");
  const link=document.createElement("a");link.href=item.html_url||OFFICIAL_RELEASES_PAGE;link.target="_blank";link.rel="noopener";link.textContent=lang==="ar"?"عرض الإصدار الرسمي ↗":"View official release ↗";
  card.append(title,meta,body,link);list.appendChild(card);
 });
 setReleaseStatus(fromCache?"cached":"success");
}
async function loadReleases(){
 const btn=$("refresh-releases");if(btn)btn.disabled=true;
 setReleaseStatus("loading");
 try{
  const response=await fetch(OFFICIAL_RELEASES_API,{headers:{Accept:"application/vnd.github+json"}});
  if(!response.ok)throw new Error("HTTP "+response.status);
  const data=await response.json();
  if(!Array.isArray(data)||!data.length)throw new Error("No release records");
  const safe=data.slice(0,5).map(x=>({name:x.name,tag_name:x.tag_name,published_at:x.published_at,body:x.body,html_url:x.html_url,prerelease:!!x.prerelease}));
  renderReleases(safe,false);
  try{localStorage.setItem(CACHE_KEY,JSON.stringify({savedAt:new Date().toISOString(),items:safe}))}catch(_){}
 }catch(error){
  let cached=null;try{cached=JSON.parse(localStorage.getItem(CACHE_KEY)||"null")}catch(_){}
  if(cached&&Array.isArray(cached.items)&&cached.items.length){renderReleases(cached.items,true);setReleaseStatus("offline-cache")}
  else{setReleaseStatus("error");const list=$("release-list");if(list){list.replaceChildren();const p=document.createElement("p");p.textContent=lang==="ar"?"تعذر الاتصال بواجهة GitHub الآن. افتح صفحة الإصدارات الرسمية مباشرةً أو أعد المحاولة لاحقاً.":"Could not reach GitHub right now. Open the official releases page or try again later.";const a=document.createElement("a");a.href=OFFICIAL_RELEASES_PAGE;a.target="_blank";a.rel="noopener";a.textContent=lang==="ar"?"صفحة الإصدارات الرسمية ↗":"Official releases page ↗";list.append(p,a)}}
 }finally{if(btn)btn.disabled=false}
}
const statusText={
 loading:{en:"Checking GitHub for the latest releases…",ar:"جارٍ التحقق من أحدث الإصدارات عبر GitHub…"},
 success:{en:"Live data loaded from the official GoldHEN GitHub releases.",ar:"تم جلب البيانات المباشرة من إصدارات GoldHEN الرسمية على GitHub."},
 cached:{en:"Showing the last successfully saved release data.",ar:"نعرض آخر بيانات إصدارات تم حفظها بنجاح."},
 "offline-cache":{en:"GitHub is unavailable. Showing saved data from the previous successful refresh.",ar:"GitHub غير متاح حالياً. نعرض البيانات المحفوظة من آخر تحديث ناجح."},
 error:{en:"Live update failed. No cached data is available.",ar:"فشل التحديث المباشر ولا توجد بيانات محفوظة."}
};
setReleaseStatus=function(key){const el=$("release-status");if(el)el.textContent=(statusText[key]&&statusText[key][lang])||key};
$("lang").addEventListener("click",()=>{lang=lang==="en"?"ar":"en";renderLanguage();if(sel.value)checkFirmware();loadReleases()});
$("check").addEventListener("click",checkFirmware);sel.addEventListener("change",checkFirmware);
if($("refresh-releases"))$("refresh-releases").addEventListener("click",loadReleases);
renderLanguage();loadReleases();
