	// 按钮响应事件
	function btnajax(){
		var text = document.getElementById("text");
		var btn = document.getElementById("button");
		var value = text.value;
		if(value == ""){
			btn.disable=true;
			document.getElementById("contain").innerHTML=("您输入的内容为空，请重新输入。。。");
		}else{
			btn.disable=false;
			// document.getElementById("contain").innerHTML=("局部刷新啦！");
			
		// ajax异步请求
			$.ajax({
				type:"post",
				url:"http://localhost:4000/sousuo",
				data:{key:value},
				dataType:"json",
				success:function(res){ 
					console.log(res);
					console.log(typeof(res));
					//判断为空时候报错
					if(JSON.stringify(res)==="[]"){
						document.getElementById("contain").innerHTML=("抱歉，没有你要找的结果！请重新输入...");
					}
					// var jsondata = JSON.parse(res);
					//清屏
					document.getElementById("contain").innerHTML=("");
					//遍历并打印查询结果
					for(var i=0;i<res.length;i++){
						var father = document.getElementById("contain");
						var h3 = document.createElement("h3");
						var a = document.createElement("a");
						father.appendChild(a);
						a.appendChild(h3);
						a.href = (res[i]["son_path"]);
						h3.style.height = "6vh";		
						h3.style.width = "70vw";
						h3.style.marginLeft = "15vw";
						h3.style.lineHeight = "6vh"
						h3.innerHTML = (res[i]["son_name"]);
						
						a.style.textDecoration = "none";
						a.style.color = "black";
						h3.style.fontWeight = "10";
						
						$(function(){
						    var h=document.getElementsByTagName("h3");
						    changBkColor(h);
						});
						function changBkColor(obj){
						    obj.onmouseover=function(){ this.className="over"; };//鼠标悬停事件
						    obj.onmouseout=function(){ this.className="out"; };//鼠标离开事件
						}
						
					}
					// document.getElementById("contain").innerHTML=(res);
					
				},
				error:function(err){
					console.log(err);
				}
			})
		}
	}
	
	
	// 回车响应事件（绑定按钮单击事件）
    $('#text').bind('keyup', function(event) {
			if(event.keyCode == "13"){
			    $('#button').click();
			}
	});

	// 输入框键入响应事件
	$("#text").keyup(function(){
		if(!($("#text").value = "")){
			document.getElementById("button").style.color = "orange";
			$('#button').click();
		}else{
			document.getElementById("button").remove.style = "balck";
		}
	})	
	


