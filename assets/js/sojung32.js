$(document).ready(function(){

  /* sidebar button */
    $('.sj_header .toggle_open').click(function(){
        $('.sj_header .navigation').addClass('open');
        $('.back_shield').addClass('show');
    });
    $('.sj_header .toggle_close').click(function(){
        $('.sj_header .navigation').removeClass('open');
        $('.back_shield').removeClass('show');
    });

    /* post 목차 button */
    $('.sj_page .summary_open').click(function(){
        $('.summary_list').addClass('open');
        $('.summary_open').hide();
    });
    $('.sj_page .xi-hamburger-out').click(function(){
        $('.summary_list').removeClass('open');
        $('.summary_open').show();
    });

    /* sidebar 클릭 시 배경 블러 효과 */
    $('.back_shield').click(function(){
        $('.sj_header .navigation').removeClass('open');
        $('.back_shield').removeClass('show');
    });

    /* sidebar 스크롤 내릴 경우 그림자 효과 */
    $('.sj_header .navigation .categories').scroll(function(){
      if($('.sj_header .navigation .categories').scrollTop() > 10){
        $('.sj_header .navigation .nav_logo').addClass('shadow');
      } else {
        $('.sj_header .navigation .nav_logo').removeClass('shadow');
      }
    });
  
    /* 스크롤 내릴 경우 위로가기 버튼 보여주기 */
    $(window).scroll(function(){
      if($(window).scrollTop() > 100){
        $('.gototop').addClass('visible');
      } else {
        $('.gototop').removeClass('visible');
      }
    });
  
});

/* MOUSE EFFECT - SPADE */
var colours=new Array('#004000', '#189718', '#86e322', '#c1f12f', '#e6f542', '#f8ff3f'); // colours of the hearts
var minisize=10; // smallest size of hearts in pixels
var maxisize=14; // biggest size of hearts in pixels
var hearts=40; // maximum number of hearts on screen
var over_or_under="over"; // set to "over" for hearts to always be on top, or "under" to allow them to float behind other objects

/*****************************
*JavaScript Love Heart Cursor*
*  (c)2013+ mf2fm web-design *
*   http://www.mf2fm.com/rv  *
*  DON'T EDIT BELOW THIS BOX *
*****************************/
var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var herz=new Array();
var herzx=new Array();
var herzy=new Array();
var herzs=new Array();
var kiss=false;

if (typeof('addRVLoadEvent')!='function') function addRVLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addRVLoadEvent(mwah);

function mwah() { if (document.getElementById) {
  var i, heart;
  for (i=0; i<hearts; i++) {
    heart=createDiv("auto", "auto");
    heart.style.visibility="hidden";
	heart.style.zIndex=(over_or_under=="over")?"1001":"0";
    heart.style.color=colours[i%colours.length];
	heart.style.pointerEvents="none";
    if (navigator.appName=="Microsoft Internet Explorer") heart.style.filter="alpha(opacity=75)";
    else heart.style.opacity=0.75;
    heart.appendChild(document.createTextNode(String.fromCharCode(9824)));
    document.body.appendChild(heart);
    herz[i]=heart;
	herzy[i]=false;
  }
  set_scroll();
  set_width();
  herzle();
}}

function herzle() {
  var c;
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x;
    oy=y;
    for (c=0; c<hearts; c++) if (herzy[c]===false) {
	  herz[c].firstChild.nodeValue=String.fromCharCode(9824);
      herz[c].style.left=(herzx[c]=x-minisize/2)+"px";
      herz[c].style.top=(herzy[c]=y-minisize)+"px";
      herz[c].style.fontSize=minisize+"px";
	  herz[c].style.fontWeight='normal';
      herz[c].style.visibility='visible';
      herzs[c]=minisize;
      break;
    }
  }
  for (c=0; c<hearts; c++) if (herzy[c]!==false) blow_me_a_kiss(c);
  setTimeout("herzle()", 40);
}

document.onmousedown=pucker;
document.onmouseup=function(){clearTimeout(kiss);};

function pucker() {
  ox=-1;
  oy=-1;
  kiss=setTimeout('pucker()', 100);
}

function blow_me_a_kiss(i) {
  herzy[i]-=herzs[i]/minisize+i%2;
  herzx[i]+=(i%5-2)/5;
  if (herzy[i]<sdown-herzs[i] || herzx[i]<sleft-herzs[i] || herzx[i]>sleft+swide-herzs[i]) {
    herz[i].style.visibility="hidden";
    herzy[i]=false;
  }
  else if (herzs[i]>minisize+2 && Math.random()<.5/hearts) break_my_heart(i);
  else {
    if (Math.random()<maxisize/herzy[i] && herzs[i]<maxisize) herz[i].style.fontSize=(++herzs[i])+"px";
    herz[i].style.top=herzy[i]+"px";
    herz[i].style.left=herzx[i]+"px";
  }
}

function break_my_heart(i) {
  var t;
  herz[i].firstChild.nodeValue=String.fromCharCode(9676);
  herz[i].style.fontWeight='bold';
  herzy[i]=false;
  for (t=herzs[i]; t<=maxisize; t++) setTimeout('herz['+i+'].style.fontSize="'+t+'px"', 60*(t-herzs[i]));
  setTimeout('herz['+i+'].style.visibility="hidden";', 60*(t-herzs[i]));
}

document.onmousemove=mouse;
function mouse(e) {
  if (e) {
    y=e.pageY;
    x=e.pageX;
  }
  else {
    set_scroll();
    y=event.y+sdown;
    x=event.x+sleft;
  }
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
}

window.onscroll=set_scroll;
function set_scroll() {
  if (typeof(self.pageYOffset)=='number') {
    sdown=self.pageYOffset;
    sleft=self.pageXOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown=document.body.scrollTop;
    sleft=document.body.scrollLeft;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
  }
  else {
    sdown=0;
    sleft=0;
  }
}

function createDiv(height, width) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height;
  div.style.width=width;
  div.style.overflow="hidden";
  div.style.backgroundColor="transparent";
  return (div);
}
