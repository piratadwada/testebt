
function ESTATISTIC() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let estati = JSON.parse(this.responseText);
            var d1     = document.getElementById('t01');
            console.log(estati);

            for(var i=1;i < estati.length;i++){
                var black = estati[i].posicao === 'NULL' ? 'black' : '';
                var priority = (estati[i].posicao === 'NULL' || get_page(estati[i].posicao) > 3) ? 'priority' : 'no-priority';

                d1.insertAdjacentHTML('beforeend',
                `<tr class="${priority} palavra-${estati[i].palavra}" style="border: 1px solid black;border-collapse: collapse;padding: 5px;">
                <td style="border: 1px solid black;border-collapse: collapse;padding: 5px;" >${estati[i].id-1}</td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 5px;">${estati[i].palavra.replace('%2C',',')}</td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 5px;">${get_page(estati[i].posicao)}</td>
                <td class="num ${black}" style="border: 1px solid black;border-collapse: collapse;padding: 5px;text-align:center">${estati[i].posicao === 'NULL' ? 'Não Encontrado' : estati[i].posicao}</td>
                </tr style="border: 1px solid black;border-collapse: collapse;padding: 5px;">`);
            }

            stylePrint();
            var b = document.querySelectorAll('.palavra-undefined');
            for( var i= 0 ;i< b.length;i++) {
                b[i].style.display = "none";
            }
        }
    };
    xhttp.open("GET", "https://seo-miguel.glitch.me/estatistica", true);
    xhttp.send();
    console.log("run 5");

    tornarOrndenavel();
}

function site() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            var sit    = document.getElementById('site-url');
            sit.innerText = 'SITE: ' + obj[0].url;
            var date = document.getElementById('date');
            date.innerText = 'DATA: ' + new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
        }
    };
    xhttp.open("GET", "https://seo-miguel.glitch.me/palavras", true);
    xhttp.send();
    console.log("run 6");
}

// Retorna a página baseado na posição
function get_page(position) {
  if(position === 'NULL')
    return '10+';

  return Math.floor(position / 10) + (position % 10 > 0 ? 1 : 0);
}

function stylePrint() {
  var $position = document.querySelectorAll('.num');

  let count1Page = 0,count2Page = 0,count3Page = 0, countNaoEncontrado = 0;
  for( i= 0 ;i< $position.length;i++){
    // segunda página
    if (parseInt($position[i].innerText) > 10 && parseInt($position[i].innerText) <= 20) {
      $position[i].style.background = "yellow"
      count2Page++;
    }

    // primeira página
    if (parseInt($position[i].innerText) <=  10) {
      $position[i].style.background = "green"
    }

    //  3 página
    if (parseInt($position[i].innerText) >  20 && parseInt($position[i].innerText) <= 30) {
      $position[i].style.background = "#ffc107"
      count3Page++;
    }

    if (parseInt($position[i].innerText) <=  10) {
      count1Page++;
    }

    if (parseInt($position[i].innerText) >  30) {
      $position[i].style.background = "#ed070726"
    }
  }
  
  var $black = document.querySelectorAll('.black');
  countNaoEncontrado = $black.length;

  var info = document.getElementById('info');
  info.innerHTML = `1ª PÁGINA: <span>${count1Page}</span> <br>  2ª PÁGINA: <span> ${count2Page}</span> <br> 3ª PÁGINA: <span>${count3Page}</span><br>TOTAL DE PALAVRAS: <span>${$position.length - 1}</span><br><br>
  PORCENTAGEM NA 1ª PÁGINA:  <span>${(((count1Page / ($position.length - 1))) * 100).toFixed(2)} %</span>
  `;

  var firstPage  = 0,
      secondPage = 0,
      thirdPage  = 0,
      notFound = 0,
      otherPages = 0;

  // grafic(($position.length - 1),
  //        (((count1Page / ($position.length - 1)).toFixed(2)) * 100),
  //        (((count2Page / ($position.length - 1)).toFixed(2)) * 100));

  firstPage = count1Page;
  secondPage = count2Page;
  otherPages = ($position.length - 1) - firstPage - secondPage - countNaoEncontrado;

   grafic((((otherPages / ($position.length - 1)).toFixed(2)) * 100),
          (((count1Page / ($position.length - 1)).toFixed(2)) * 100),
          (((count2Page / ($position.length - 1)).toFixed(2)) * 100),
          (((countNaoEncontrado / ($position.length - 1)).toFixed(2)) * 100)
          );
}

site();
ESTATISTIC();

function grafic(totalPage, porc, porc2Page, porc3Page){
  console.log('total', totalPage);
  console.log('porc ', porc);
  console.log('porc2', porc2Page);
  console.log('porc3', porc3Page);

  // var data2 = [
  //   type: 'pie',
  //   data: {
  //     labels: [
  //       'Palavras na 1ª página',
  //       'Palavras na 2ª página',
  //       'Palavras na 3ª página',
  //       'Palavras em outras páginas',
  //       'Palavras não encontradas'
  //     ],
  //     datasets: [{
  //
  //     }]
  //   }
  // ];

  var ctx = document.getElementById("myChart").getContext('2d');

  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: [
                  "Outras páginas",
                  "Palavras na 1º página",
                  "Palavras na 2º página",
                  "Não Encontrados"
          ],
          datasets: [{
              label: '# of Votes',
              data: [totalPage, porc.toFixed(2), porc2Page.toFixed(2), porc3Page.toFixed(2)],
              backgroundColor: [
                  'rgba(0, 0, 255, 0.2)',
                  'rgba(0, 128, 0, 1)',
                  'rgba(255, 255, 0, 1)',
                  'rgba(0, 0, 0, 1)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 255, 0, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        cutoutPercentage:20,
      }
  });
}

btnImprimirSalvar = document.querySelector('.btn-imprimir');
btnImprimirSalvar.addEventListener('click',function(){
    window.print();
});

btnShowPriority = document.querySelector('.btn-show-priority');
btnShowPriority.addEventListener('click',function(){
  var b = document.querySelectorAll('.no-priority');

  for( var i= 0 ;i< b.length;i++) {
      if(b[i].style.display === "none")
        b[i].style.display = "table-row";
      else 
        b[i].style.display = "none";
  }
});

function tornarOrndenavel() {
  var stIsIE=false;sorttable={init:function(){if(arguments.callee.done)return;arguments.callee.done=true;if(_timer)clearInterval(_timer);if(!document.createElement||!document.getElementsByTagName)return;sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;forEach(document.getElementsByTagName('table'),function(table){if(table.className.search(/\bsortable\b/)!=-1){sorttable.makeSortable(table);}});},makeSortable:function(table){if(table.getElementsByTagName('thead').length==0){the=document.createElement('thead');the.appendChild(table.rows[0]);table.insertBefore(the,table.firstChild);}
if(table.tHead==null)table.tHead=table.getElementsByTagName('thead')[0];if(table.tHead.rows.length!=1)return;sortbottomrows=[];for(var i=0;i<table.rows.length;i++){if(table.rows[i].className.search(/\bsortbottom\b/)!=-1){sortbottomrows[sortbottomrows.length]=table.rows[i];}}
if(sortbottomrows){if(table.tFoot==null){tfo=document.createElement('tfoot');table.appendChild(tfo);}
for(var i=0;i<sortbottomrows.length;i++){tfo.appendChild(sortbottomrows[i]);}
delete sortbottomrows;}
headrow=table.tHead.rows[0].cells;for(var i=0;i<headrow.length;i++){if(!headrow[i].className.match(/\bsorttable_nosort\b/)){mtch=headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);if(mtch){override=mtch[1];}
if(mtch&&typeof sorttable["sort_"+override]=='function'){headrow[i].sorttable_sortfunction=sorttable["sort_"+override];}else{headrow[i].sorttable_sortfunction=sorttable.guessType(table,i);}
headrow[i].sorttable_columnindex=i;headrow[i].sorttable_tbody=table.tBodies[0];dean_addEvent(headrow[i],"click",function(e){if(this.className.search(/\bsorttable_sorted\b/)!=-1){sorttable.reverse(this.sorttable_tbody);this.className=this.className.replace('sorttable_sorted','sorttable_sorted_reverse');this.removeChild(document.getElementById('sorttable_sortfwdind'));sortrevind=document.createElement('span');sortrevind.id="sorttable_sortrevind";sortrevind.innerHTML=stIsIE?'&nbsp<font face="webdings">5</font>':'&nbsp;&#x25B4;';this.appendChild(sortrevind);return;}
if(this.className.search(/\bsorttable_sorted_reverse\b/)!=-1){sorttable.reverse(this.sorttable_tbody);this.className=this.className.replace('sorttable_sorted_reverse','sorttable_sorted');this.removeChild(document.getElementById('sorttable_sortrevind'));sortfwdind=document.createElement('span');sortfwdind.id="sorttable_sortfwdind";sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':'&nbsp;&#x25BE;';this.appendChild(sortfwdind);return;}
theadrow=this.parentNode;forEach(theadrow.childNodes,function(cell){if(cell.nodeType==1){cell.className=cell.className.replace('sorttable_sorted_reverse','');cell.className=cell.className.replace('sorttable_sorted','');}});sortfwdind=document.getElementById('sorttable_sortfwdind');if(sortfwdind){sortfwdind.parentNode.removeChild(sortfwdind);}
sortrevind=document.getElementById('sorttable_sortrevind');if(sortrevind){sortrevind.parentNode.removeChild(sortrevind);}
this.className+=' sorttable_sorted';sortfwdind=document.createElement('span');sortfwdind.id="sorttable_sortfwdind";sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':'&nbsp;&#x25BE;';this.appendChild(sortfwdind);row_array=[];col=this.sorttable_columnindex;rows=this.sorttable_tbody.rows;for(var j=0;j<rows.length;j++){row_array[row_array.length]=[sorttable.getInnerText(rows[j].cells[col]),rows[j]];}
row_array.sort(this.sorttable_sortfunction);tb=this.sorttable_tbody;for(var j=0;j<row_array.length;j++){tb.appendChild(row_array[j][1]);}
delete row_array;});}}},guessType:function(table,column){sortfn=sorttable.sort_alpha;for(var i=0;i<table.tBodies[0].rows.length;i++){text=sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);if(text!=''){if(text.match(/^-?[�$�]?[\d,.]+%?$/)){return sorttable.sort_numeric;}
possdate=text.match(sorttable.DATE_RE)
if(possdate){first=parseInt(possdate[1]);second=parseInt(possdate[2]);if(first>12){return sorttable.sort_ddmm;}else if(second>12){return sorttable.sort_mmdd;}else{sortfn=sorttable.sort_ddmm;}}}}
return sortfn;},getInnerText:function(node){hasInputs=(typeof node.getElementsByTagName=='function')&&node.getElementsByTagName('input').length;if(node.getAttribute("sorttable_customkey")!=null){return node.getAttribute("sorttable_customkey");}
else if(typeof node.textContent!='undefined'&&!hasInputs){return node.textContent.replace(/^\s+|\s+$/g,'');}
else if(typeof node.innerText!='undefined'&&!hasInputs){return node.innerText.replace(/^\s+|\s+$/g,'');}
else if(typeof node.text!='undefined'&&!hasInputs){return node.text.replace(/^\s+|\s+$/g,'');}
else{switch(node.nodeType){case 3:if(node.nodeName.toLowerCase()=='input'){return node.value.replace(/^\s+|\s+$/g,'');}
case 4:return node.nodeValue.replace(/^\s+|\s+$/g,'');break;case 1:case 11:var innerText='';for(var i=0;i<node.childNodes.length;i++){innerText+=sorttable.getInnerText(node.childNodes[i]);}
return innerText.replace(/^\s+|\s+$/g,'');break;default:return '';}}},reverse:function(tbody){newrows=[];for(var i=0;i<tbody.rows.length;i++){newrows[newrows.length]=tbody.rows[i];}
for(var i=newrows.length-1;i>=0;i--){tbody.appendChild(newrows[i]);}
delete newrows;},sort_numeric:function(a,b){aa=parseFloat(a[0].replace(/[^0-9.-]/g,''));if(isNaN(aa))aa=0;bb=parseFloat(b[0].replace(/[^0-9.-]/g,''));if(isNaN(bb))bb=0;return aa-bb;},sort_alpha:function(a,b){if(a[0]==b[0])return 0;if(a[0]<b[0])return-1;return 1;},sort_ddmm:function(a,b){mtch=a[0].match(sorttable.DATE_RE);y=mtch[3];m=mtch[2];d=mtch[1];if(m.length==1)m='0'+m;if(d.length==1)d='0'+d;dt1=y+m+d;mtch=b[0].match(sorttable.DATE_RE);y=mtch[3];m=mtch[2];d=mtch[1];if(m.length==1)m='0'+m;if(d.length==1)d='0'+d;dt2=y+m+d;if(dt1==dt2)return 0;if(dt1<dt2)return-1;return 1;},sort_mmdd:function(a,b){mtch=a[0].match(sorttable.DATE_RE);y=mtch[3];d=mtch[2];m=mtch[1];if(m.length==1)m='0'+m;if(d.length==1)d='0'+d;dt1=y+m+d;mtch=b[0].match(sorttable.DATE_RE);y=mtch[3];d=mtch[2];m=mtch[1];if(m.length==1)m='0'+m;if(d.length==1)d='0'+d;dt2=y+m+d;if(dt1==dt2)return 0;if(dt1<dt2)return-1;return 1;},shaker_sort:function(list,comp_func){var b=0;var t=list.length-1;var swap=true;while(swap){swap=false;for(var i=b;i<t;++i){if(comp_func(list[i],list[i+1])>0){var q=list[i];list[i]=list[i+1];list[i+1]=q;swap=true;}}
t--;if(!swap)break;for(var i=t;i>b;--i){if(comp_func(list[i],list[i-1])<0){var q=list[i];list[i]=list[i-1];list[i-1]=q;swap=true;}}
b++;}}}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",sorttable.init,false);}
if(/WebKit/i.test(navigator.userAgent)){var _timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){sorttable.init();}},10);}
window.onload=sorttable.init;function dean_addEvent(element,type,handler){if(element.addEventListener){element.addEventListener(type,handler,false);}else{if(!handler.$$guid)handler.$$guid=dean_addEvent.guid++;if(!element.events)element.events={};var handlers=element.events[type];if(!handlers){handlers=element.events[type]={};if(element["on"+type]){handlers[0]=element["on"+type];}}
handlers[handler.$$guid]=handler;element["on"+type]=handleEvent;}};dean_addEvent.guid=1;function removeEvent(element,type,handler){if(element.removeEventListener){element.removeEventListener(type,handler,false);}else{if(element.events&&element.events[type]){delete element.events[type][handler.$$guid];}}};function handleEvent(event){var returnValue=true;event=event||fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);var handlers=this.events[event.type];for(var i in handlers){this.$$handleEvent=handlers[i];if(this.$$handleEvent(event)===false){returnValue=false;}}
return returnValue;};function fixEvent(event){event.preventDefault=fixEvent.preventDefault;event.stopPropagation=fixEvent.stopPropagation;return event;};fixEvent.preventDefault=function(){this.returnValue=false;};fixEvent.stopPropagation=function(){this.cancelBubble=true;}
if(!Array.forEach){Array.forEach=function(array,block,context){for(var i=0;i<array.length;i++){block.call(context,array[i],i,array);}};}
Function.prototype.forEach=function(object,block,context){for(var key in object){if(typeof this.prototype[key]=="undefined"){block.call(context,object[key],key,object);}}};String.forEach=function(string,block,context){Array.forEach(string.split(""),function(chr,index){block.call(context,chr,index,string);});};var forEach=function(object,block,context){if(object){var resolve=Object;if(object instanceof Function){resolve=Function;}else if(object.forEach instanceof Function){object.forEach(block,context);return;}else if(typeof object=="string"){resolve=String;}else if(typeof object.length=="number"){resolve=Array;}
resolve.forEach(object,block,context);}};
}