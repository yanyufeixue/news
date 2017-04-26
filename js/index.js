window.onload = function(){
    footNavCheck();
	//页面加载完成之后 请求json
	requestData('page/content.html','html');
	requestData('js/news.json','json');
    location.hash='';
}

/**********************
****功能：ajax请求数据
请求方式：GET
参数：url---数据地址,type---数据类型（json或者html页面）
********************/
//定义全局变量 接收ajax返回数据
var jsonData=null,page='';
function requestData(url,type){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
				if(type=='json'){
					var jsonText = xhr.responseText;
					jsonData = JSON.parse(jsonText);
					//调用生成html方法 参数：点击产生的hash值，默认为空
					cretaeHtml(null);
				}
				if(type=='html'){
					page  =xhr.responseText;
					var content = document.getElementById('content');
					content.innerHTML = page;
				}

			}
		}
	}
	xhr.open('GET',url,true);
	xhr.send(null);
}
/******************
**功能：当主页面加载完成之后，获得请求到的json数据，生成相应的html
******************/
function cretaeHtml(hash){
	var newslist = document.getElementById('newslist');
	//当请求到的数据不为null时
	if(jsonData!=null&&hash==null){
		for(i in jsonData.news.newsRecom.newsRoures){
			newslist.innerHTML+=`
			<a data-value='${jsonData.news.newsRecom.newsRoures[i].newsId}'>
    			<b>${jsonData.news.newsRecom.newsRoures[i].newsTitle}</b>
				<ul class="img-item">
    				<li>
    					<div>
    						<img src="${jsonData.news.newsRecom.newsRoures[i].url}" alt="">
    					</div>
    				</li>
    				<li>
    					<div>
    						<img src="${jsonData.news.newsRecom.newsRoures[i].url}" alt="">
    					</div>
    				</li>
    				<li>
    					<div>
    						<img src="${jsonData.news.newsRecom.newsRoures[i].url}" alt="">
    					</div>
    				</li>
    			</ul>
    			<p>
    				<span>${jsonData.news.newsRecom.newsRoures[i].newsFor}</span>
    				<span>${jsonData.news.newsRecom.newsRoures[i].newsComment}</span>
    				<span>${jsonData.news.newsRecom.newsRoures[i].newsTime}</span>
    			</p>
    		</a>
			`;
		}
	}else{
		newslist.innerHTML='';
		for(j in jsonData.news[hash].newsRoures){
			newslist.innerHTML+=`
			<a data-value='${jsonData.news[hash].newsRoures[j].newsId}'>
    			<b>${jsonData.news[hash].newsRoures[j].newsTitle}</b>
				<ul class="img-item">
    				<li>
    					<div>
    						<img src="${jsonData.news[hash].newsRoures[j].url}" alt="">
    					</div>
    				</li>
    				<li>
    					<div>
    						<img src="${jsonData.news[hash].newsRoures[j].url}" alt="">
    					</div>
    				</li>
    				<li>
    					<div>
    						<img src="${jsonData.news[hash].newsRoures[j].url}" alt="">
    					</div>
    				</li>
    			</ul>
    			<p>
    				<span>${jsonData.news[hash].newsRoures[j].newsFor}</span>
    				<span>${jsonData.news[hash].newsRoures[j].newsComment}</span>
    				<span>${jsonData.news[hash].newsRoures[j].newsTime}</span>
    			</p>
    		</a>
			`;
		}
	}
	//调用为新闻列表设置点击事件的方法
	aSetclick();
//	//调用点击加好添加导航按钮列表
//	clickAddItem();
}
/*************
**功能：为新闻列表设置点击事件
************/
function aSetclick(){
	var hash  =location.hash.slice(1),
		newslist = document.getElementById('newslist'),
		newslistA = newslist.getElementsByTagName('a'),
		newslistA_len = newslistA.length,
		//获取新闻显示标签section
		content = document.getElementById('content');
	for(var i =0;i<newslistA_len;i++){
		newslistA[i].onclick = function(){
			var newsId = this.getAttribute('data-value');
			addContent(newsId);
			if(hash==''){
				for(x in jsonData.news.newsRecom.newsRoures){
					for(y in jsonData.news.newsRecom.newsRoures[x]){
						if(jsonData.news.newsRecom.newsRoures[x].newsId==newsId){
							//新闻详情页显示
								content.className="visible";

						}
					}
				}
			}else{
				for(l in jsonData.news[hash].newsRoures){
					for(m in jsonData.news[hash].newsRoures[l]){
						if(jsonData.news[hash].newsRoures[l].newsId==newsId){
							//新闻详情页显示
								content.className="visible";
						}
					}
				}
			}
		}
	}
}
/*******************************
**功能：加好扩展选项列表
*************************/
function clickAddItem(){
	var more = document.getElementById('more'),
		headNav = document.getElementsByClassName('head-nav')[0];
		headNav.addEventListener('click',function(e){
			var target = e.target.tagName.toLowerCase();
			if(target=='i'){
				headNav.innerHTML+=`<a href="#newsRecom">推荐</a>`;
			}
		});
}
/***********************
**为新闻详情页添加内容
***********************/
function addContent(newsId){
	var hash  =location.hash.slice(1),
		title = document.getElementById('title'),
		newsInfo = document.getElementById('newsInfo');
		hash=hash||'newsRecom';
	for(i in jsonData.news[hash]){
		for(y in jsonData.news[hash].newsRoures){
			if(jsonData.news[hash].newsRoures[y].newsId==newsId){
				title.textContent =jsonData.news[hash].newsRoures[y].newsTitle;
				newsInfo.innerHTML= jsonData.news[hash].newsRoures[y].newsArticle;
			}
		}
	}
	hiddenCont();
}
/*****************************
**功能：再次点击详情页时，隐藏
******************************/
function hiddenCont(){
	var content=document.getElementById('content'),
		share = document.getElementById('share'),
		shareBox = document.getElementById("share-box"),
		canleBtn = document.getElementById('canleBtn'),
		back=document.getElementById('back');
	back.onclick = function(){
		content.className = 'hidden';
	}
	//点击分享按钮
	share.onclick = function(){
		if(shareBox.style.display!='block'){
			shareBox.style.display ='block';
		}
		if(shareBox.style.display='block'){
			shareBox.onclick = function(){
				this.style.display='none';
			}
			canleBtn.onclick = function(){
				shareBox.style.display = 'none';
			}
		}
	}
}
/********************************
**功能：根据页面hash值变化请求新闻数据或者视频
*****************************/
function hashRequset(){
    var hash = location.hash,
		newslist = document.getElementById('newslist');
		hash  =hash.slice(1);
	if(hash!=''){
		for(i in jsonData.news){
			if(hash==i){
				cretaeHtml(hash);
			}
		}
		for(j in jsonData.video){
			if(hash==j){
				videoLoad(hash);
			}
		}
	}
}
/*****************
**功能:hash值发生变化时
*************/
window.onhashchange = function(){
	hashRequset();
}
/******************
**功能：设置底部导航选中状态
***********/
function footNavCheck(){
    var footerNav = document.getElementsByClassName("footer")[0].getElementsByTagName('div'),
        footerNav_len = footerNav.length;
    for(var i = 0;i<footerNav_len;i++){
        footerNav[i].onclick = function(){
            for(var j = 0;j<footerNav_len;j++){
                footerNav[j].className='';
            }
            this.className="checked";
			var checked = document.getElementsByClassName('checked')[0],
				spanText  =checked.children[1].textContent,
				newslist = document.getElementById('newslist'),
				header = document.getElementsByClassName('header')[0],
				main = document.getElementById('main');
			if(spanText=='首页'){
				location.hash='';
				header.innerHTML='';
				//如果存在newslist
				if(newslist){
					//更改main的内边距
					newslist.parentElement.className='main';
					newslist.innerHTML='';
				}else{
					var main = document.getElementById('main'),
						newslist = document.createElement('div');
					newslist.setAttribute('id','newslist');
					main.appendChild(newslist);
				}
				var homeNavStr = '',
					//找到用户登录页的user-main
					userBox = document.getElementsByClassName('user-box')[0];
				if(userBox){
					//移除userMain
					main.removeChild(userBox);
					main.className='main';
				}
				homeNavStr=`
					<header class="header">
						<div class="head-bar">
							<div class="head-title">
								<div class="logo"></div>
								<div class="search">
									<i class="icon-search"></i>
									<input type="text" placeholder="搜你想搜的">
								</div>
							</div>
						</div>
						<nav class="head-nav">
							<a href="#newsRecom">推荐</a>
							<a href="#hotNew">热点</a>
							<a href="#site">成都</a>
							<a href="#society">社会</a>
							<a href="#recreation">娱乐</a>
							<a href="#questions">问答</a>
							<a href="#image">图片</a>
							<a href="#science">科技</a>
							<a href="#car">汽车</a>
							<a href="#physical">体育</a>
							<a href="#finance">财经</a>
							<a href="#military">军事</a>
							<a href="#international">国际</a>
							<i  id='more'>+</i>
						</nav>
					</header>
				`;
				header.innerHTML = homeNavStr;
				//调用创建html文档方法
				cretaeHtml(null);
			}
			if(spanText=='视频'){
				location.hash='';
				//更改main的内边距
				main.className='main-video';
				//如果存在newslist
				if(newslist){
					//更改main的内边距
					newslist.parentElement.className='main-video';
					newslist.innerHTML='';
				}else{
					var main = document.getElementById('main'),
						newslist = document.createElement('div');
					newslist.setAttribute('id','newslist');
					main.appendChild(newslist);
				}
				var homeNavStr = '',
					//找到用户登录页的user-main
					userBox = document.getElementsByClassName('user-box')[0];
				if(userBox){
					//移除userMain
					main.removeChild(userBox);
					main.classList.remove('userMain');
				}
				header.innerHTML = '';
				//定义新的导航栏
				var videoNavStr = `
					<nav class="head-nav">
						<a href="#recommend">推荐</a>
						<a href="#music">音乐</a>
						<a href="#funny">搞笑</a>
						<a href="#videoSociety">社会</a>
						<a href="#videoXp">小品</a>
						<a href="#videoYc">原创</a>
						<a href="#videoFa">生活</a>
						<a href="#videoYs">影视</a>
						<a href="#videoYl">娱乐</a>
						<i class="videoI icon-search"></i>
					</nav>
				`;
				header.innerHTML = videoNavStr;
				videoLoad(null);
			}
			if(spanText=='登录'){
				header.innerHTML='';
				main.innerHTML = '';
				var userStr='';
				userStr = `
					<div class='login-header'>
						<div class='user-img'>
							<img src='imgage/newsimg7.jpg'>
							<span>Nopen</span>
							<i class='icon-angle-right'></i>
						</div>
						<div class='menu-box'>
							<div class='menu-item'>
								<i class='icon-star-empty'></i>
								<span>收藏</span>
							</div>
							<div class='menu-item'>
								<i class='icon-folder-open-alt'></i>
								<span>历史</span>
							</div>
							<div class='menu-item'>
								<i class='icon-adjust'></i>
								<span>夜间</span>
							</div>
						</div>
					</div>
				`;
				header.innerHTML=userStr;
				var userMianStr =`
					<div class="user-box">
						<div class='advertisement'>
							<p>
								<span>消息通知</span>
							</p>
							<p>
								<span>头条商城</span>
							</p>
						</div>
						<div class='user-set'>
							<p>
								<span>我要爆料</span>
							</p>
							<p>
								<span>用户反馈</span>
							</p>
							<p>
								<span>系统设置</span>
							</p>
						</div>
					</div>
				`;
				main.innerHTML = userMianStr;
				main.className='user-main';
			}

        }
    }
}
/*********************
**视频加载页面
**********************/
function videoLoad(hash){
	var hash = location.hash.slice(1);
	var newslist = document.getElementById('newslist'),
		videoItemStr='';
	if(hash==''){
			for(y in jsonData.video.recommend.newsRoures){
				videoItemStr+=`
					<a class='video-a' href='${jsonData.video.recommend.newsRoures[y].videoUrl}'>
						<h5>${jsonData.video.recommend.newsRoures[y].videoTitle}</h5>
						<p>
							<span id='videoPerson'>${jsonData.video.recommend.newsRoures[y].videoPerson}</span>
							<span id='videoPlayCount'>${jsonData.video.recommend.newsRoures[y].videoPlayCount}</span>
						</p>
					</a>
				`;
			}
	}else{
		for(j in jsonData.video[hash].newsRoures){
			videoItemStr+=`
				<a class='video-a' href='${jsonData.video[hash].newsRoures[j].videoUrl}'>
					<h5>${jsonData.video[hash].newsRoures[j].videoTitle}</h5>
					<p>
						<span id='videoPerson'>${jsonData.video[hash].newsRoures[j].videoPerson}</span>
						<span id='videoPlayCount'>${jsonData.video[hash].newsRoures[j].videoPlayCount}</span>
					</p>
				</a>
			`;
		}
	}
	newslist.innerHTML = videoItemStr;
}
