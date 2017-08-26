window.addEventListener('load',function(){
	scroll({
				parent:'.nav',
				child :'.navInner',
				li:'a',
				ancestor:'.seParent',
				content:'.seParentInner',
				con_child:'.sectionWrap',
				mr:0.6
		 });
});
function scroll(elem)
	{
		if(!elem){
			return;
		}
		if(!elem.mr){
			elem.mr=0;
		}
		var oSection = document.querySelector(elem.parent);
		var oList = document.querySelector(elem.child);
		var oLi = oList.querySelectorAll(elem.li);
		var oAncestor = document.querySelector(elem.ancestor);
		var oContent = document.querySelector(elem.content);
		var oCon_child = oContent.querySelectorAll(elem.con_child);
		var html = parseFloat(document.documentElement.style.fontSize);
		var size = oLi.length;
		var count = oCon_child.length;
		var startEl = 0;//当前坐标位置移动的距离
		var startElY =0;
		var startPoint;//当前坐标位置
		var startPointY;
	 	var disX = 0;
	 	var disY = 0;
	 	var target = 0;
	 	var targetY = 0;
	 	var iWidth = 0;
	 	var oConWidth = 100*count;
	 	var oConChildWidth = 100/count;
	 	var index = 0;
	 	var aWidth = oAncestor.offsetWidth;
	 	for(var i = 0;i<oLi.length;i++){
	 		iWidth +=(oLi[i].offsetWidth+elem.mr*html);	
	 	}
	 	oList.style.width=iWidth-20+'px';
	 	for(var i = 0;i<oCon_child.length;i++){
	 		oCon_child[i].style.width = oConChildWidth+'%';
	 	}
	 	
	 	oContent.style.width = oConWidth+'%';
		var maxTranslateX = Math.round(oSection.clientWidth-0.4*html) - Math.round(oList.offsetWidth);
		var maxTranslateY = (document.documentElement.clientHeight-2.8*html)-oAncestor.offsetHeight;
		var minTranslateY = 1.25*html;
	    maxTranslateX = maxTranslateX>0?0:maxTranslateX;
		oContent.style.height = oCon_child[index].offsetHeight+'px';
		
	oContent.addEventListener('touchstart',function(e){
		startPoint = e.changedTouches[0].pageX;//获取按下坐标位置
		startPointY = e.changedTouches[0].pageY;
		startEl = css(this,'translateX');//获取当前对象translatex值
		startElY = css(this,'translateY');
		index = Math.round(-startEl/aWidth);
		
		return false;
	});
	oContent.addEventListener('touchmove',function(e){
	
		e.preventDefault();
		var nowDis = e.changedTouches[0].pageX;//获取滑动坐标位置
		var pageY = e.changedTouches[0].pageY;
		 
		disX = nowDis-startPoint;//滑动坐标减去按下坐标+第一次translateX距离等于移动了多少距离
		disY = pageY - startPointY;
		if(Math.abs(disX)>Math.abs(disY)){
			disX = disX+startEl;
			css(this,'translateX',disX);//设置移动的距离
			css(this,'translateY',0);
		}else{
			disY = disY+startElY;
			css(this,'translateY',disY);//设置移动的距离
		}
		
		return false;
	
	});
	oContent.addEventListener('touchend',function(e){
	
		var oListTarget = maxTranslateX/size;
		targetY = css(this,'translateY');
		target = css(this,'translateX');
		maxTranslateY = (document.documentElement.clientHeight-2.8*html)-this.offsetHeight;
		maxTranslateY = maxTranslateY >0?0:maxTranslateY;
		
		index  = Math.round(-target/aWidth);
		index = (index <=0?0:index>=size-1?size-1:index++);
		

		for(var i=0;i<oLi.length;i++){
			oLi[i].className = '';
		}
		oLi[index].className = 'current';
		css(this,'translateX',-aWidth*index);
		this.style.height = oCon_child[index].offsetHeight+'px';
		css(oList,'translateX',oListTarget*index);
		if(targetY>minTranslateY){
			targetY = 0;
		}else if(targetY < maxTranslateY){
			targetY = maxTranslateY;
		}
		css(this,'translateY',targetY);
		return false;
	 });
	 
	
};
