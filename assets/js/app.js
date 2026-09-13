const products=[
{id:'p1',name:'Herbal Face Wash',cat:'face',price:1850,size:'150 ml',img:'assets/images/p1.svg',desc:'මෘදු දෛනික පිරිසිදු කිරීම සඳහා කොහොඹ සහ කෝමාරිකා සාරය.',ingredients:'කොහොඹ, Aloe Vera, පොල් සාරය'},
{id:'p2',name:'Golden Glow Scrub',cat:'face',price:2150,size:'100 g',img:'assets/images/p2.svg',desc:'සහල් කුඩු සහ කහ සාරය සමඟ මෘදු exfoliation අත්දැකීමක්.',ingredients:'සහල්, වල් කහ, මී පැණි'},
{id:'p3',name:'Aloe Calm Toner',cat:'face',price:1650,size:'120 ml',img:'assets/images/p3.svg',desc:'සම සන්සුන් කර දෛනික hydration එකට සූදානම් කරන toner එකක්.',ingredients:'Aloe Vera, Gotukola, Rose Water'},
{id:'p4',name:'Rice Radiance Cream',cat:'face',price:2450,size:'50 g',img:'assets/images/p4.svg',desc:'සමට මෘදු, සැහැල්ලු moisturising care එකක්.',ingredients:'Rice Water, Squalane, Vitamin E'},
{id:'p5',name:'Coconut Silk Body Butter',cat:'body',price:2750,size:'200 g',img:'assets/images/p5.svg',desc:'වියළි සම සඳහා පොල් සාරය සහ ශාකසාර තෙල්වලින් පොහොසත් body butter.',ingredients:'Virgin Coconut, Shea Butter, Vitamin E'},
{id:'p6',name:'Lankan Botanical Soap',cat:'body',price:850,size:'100 g',img:'assets/images/p6.svg',desc:'දේශීය ශාකසාර සුවඳක් සහිත දෛනික cleansing bar එකක්.',ingredients:'Neem, Turmeric, Coconut Oil'},
{id:'p7',name:'Daily Care Set',cat:'set',price:5250,size:'3 items',img:'assets/images/p7.svg',desc:'Face Wash, Toner සහ Rice Radiance Cream එකම සත්කාර පෙට්ටියක.',ingredients:'Face Wash, Toner, Day Cream'},
{id:'p8',name:'Premium Gift Box',cat:'set',price:7950,size:'4 items',img:'assets/images/p8.svg',desc:'විශේෂ අවස්ථාවකට සුදුසු luxury skincare gift set එකක්.',ingredients:'Curated Ranliya Essentials'}];
let cart=[];const money=n=>'රු. '+n.toLocaleString('en-US');
function card(p){return `<article class="product"><img src="${p.img}" alt="${p.name}"><div class="productbody"><span class="tag">${p.size}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><div class="productactions"><button class="btn smallbtn" onclick="openDetail('${p.id}')">විස්තර බලන්න</button><button class="btn alt smallbtn" onclick="addCart('${p.id}')">Cart +</button></div></div></article>`}
function renderProducts(filter='all'){const el=document.querySelector('#productGrid');if(!el)return;el.innerHTML=products.filter(p=>filter==='all'||p.cat===filter).map(card).join('')}
function openDetail(id){const p=products.find(x=>x.id===id);document.querySelector('#modalContent').innerHTML=`<div class="detailgrid"><img src="${p.img}" alt="${p.name}"><div><span class="tag">${p.size}</span><h2>${p.name}</h2><p>${p.desc}</p><h3>${money(p.price)}</h3><p><b>ප්‍රධාන අමුද්‍රව්‍ය:</b><br>${p.ingredients}</p><p><b>භාවිතය:</b><br>නිෂ්පාදනයේ උපදෙස් අනුව මෘදු ලෙස භාවිත කරන්න. පළමුව කුඩා ප්‍රදේශයක patch test එකක් කරන්න.</p><button class="btn" onclick="addCart('${p.id}');closeModal()">Cart එකට එකතු කරන්න</button><button class="btn alt" onclick="orderSingle('${p.id}')">WhatsApp Order</button></div></div>`;document.querySelector('#modal').classList.add('open')}
function closeModal(){document.querySelector('#modal').classList.remove('open')}
function addCart(id){const p=products.find(x=>x.id===id),item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...p,qty:1});updateCart()}
function updateCart(){document.querySelector('#cartCount').textContent=cart.reduce((a,x)=>a+x.qty,0);document.querySelector('#cartItems').innerHTML=cart.length?cart.map(x=>`<div class="cartrow"><span>${x.name} × ${x.qty}</span><b>${money(x.price*x.qty)}</b></div>`).join(''):'<p class="muted">Cart එක හිස්.</p>';document.querySelector('#cartTotal').textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0))}
function toggleCart(){document.querySelector('#cartPanel').classList.toggle('open')}
function whatsapp(msg){window.open('https://wa.me/94761527652?text='+encodeURIComponent(msg),'_blank')}
function orderSingle(id){const p=products.find(x=>x.id===id);whatsapp(`ආයුබෝවන් රන්ලිය! මට ${p.name} (${p.size}) — ${money(p.price)} ඇණවුම් කිරීමට අවශ්‍යයි.`)}
function checkout(){
  if(!cart.length)return;
  let msg='ආයුබෝවන් රන්ලිය! මගේ ඇණවුම:\n\n';
  cart.forEach((x,i)=>msg+=`${i+1}. ${x.name} (${x.size}) x ${x.qty} = ${money(x.price*x.qty)}\n`);
  msg+='\nමුළු එකතුව: '+money(cart.reduce((a,x)=>a+x.price*x.qty,0))+'\n\nකරුණාකර delivery විස්තර ලබාදෙන්න.';
  whatsapp(msg);
}
document.addEventListener('DOMContentLoaded',()=>{renderProducts();updateCart();document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)}));document.querySelector('#year').textContent=new Date().getFullYear()});
