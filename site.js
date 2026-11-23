const kids = [
 ['pon','Пон','Понедельник','Спокойный и надёжный. У Пона зелёные крылья, а на макушке хохолок, похожий на молодые листочки.','#8cbb50'],
 ['vtor','Втор','Вторник','Любит подумать. Даже на семейном портрете Втор держит книгу в лапах.','#57aacb'],
 ['sreda','Среда','Среда','Внимательная и собранная. Золотистую Среду легко узнать по круглым очкам.','#e9bd4e'],
 ['chet','Чет','Четверг','Деятельный и решительный. Оранжевый Чет уже поднял очки на лоб и готов к приключению.','#f39953'],
 ['pyatni','Пятни','Пятница','Любит мечтать. Загляни на фиолетовые крылья Пятни — там целое звёздное небо.','#a58bd9'],
 ['subba','Субба','Суббота','Заботливая и добрая. Субба улыбается так широко, что глаза превращаются в две дуги.','#df8094'],
 ['voskra','Воскра','Воскресенье','Чуткая и мечтательная. Среди голубых прядей Воскры прячутся маленькие цветы.','#84bad8']
];
const sheets=[
 ['book','Обложка','Изображение книги из презентации проекта.'],
 ['spread','Семеро зилантят','Фрагмент разворота в материалах проекта. Здесь зилантята появляются рядом со своими человеческими образами.'],
 ['spread2','Сказочная Казань','Фрагмент иллюстрированного разворота из презентации проекта.']
];
const get=id=>document.getElementById(id);
const viewer=get('view');let pages=[],page=0;
function display(){
 const [file,title,description]=pages[page];get('full').src=file+'.webp';get('full').alt=title;get('title').textContent=title;get('detail').textContent=description;
 get('position').textContent=(page+1)+' из '+pages.length;get('prev').disabled=page===0;get('next').disabled=page===pages.length-1;
}
function openAlbum(entries,first,label){pages=entries;page=first;get('label').textContent=label;display();viewer.showModal()}
const portraits=kids.map(([file,name,day,desc])=>[file,name,desc]);
kids.forEach(([file,name,day,desc,color],i)=>{
 const b=document.createElement('button');b.className='kid';b.style.setProperty('--edge',color);
 const img=new Image();img.src=file+'.webp';img.alt='';const title=document.createElement('strong');title.textContent=name;
 const subtitle=document.createElement('small');subtitle.textContent=day;b.append(img,title,subtitle);b.onclick=()=>openAlbum(portraits,i,'Семейный альбом');get('portraits').append(b);
});
get('read').onclick=()=>openAlbum(sheets,1,'Первая книга');get('close').onclick=()=>viewer.close();
get('prev').onclick=()=>{page--;display()};get('next').onclick=()=>{page++;display()};
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'&&page>0){page--;display()}if(event.key==='ArrowRight'&&page<pages.length-1){page++;display()}});
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close()}});
