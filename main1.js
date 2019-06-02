(function musicDB (){
	this.init = function() {
		this.search() ;
		
	};
	this.search = function() {
		var form = document.querySelector("#form");
		form.addEventListener("submit",function (e) {
			e.preventDefault();
			var value = document.querySelector("#input_search").value;
			form.reset();
			getData(value.split(' ' ).join("+"));
		});
	};
	var container = document.querySelector("#album_list_container");
	container.innerHTML = "" ;
	this.getData = function (artist) {
		var http = new XMLHttpRequest();
		var url ="https://itunes.apple.com/search?term="+ artist +"&entity=album";
		
		var method = "GET";
		http.open(method,url);
		http.onreadystatechange = function () {
			if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
				showArtist(JSON.parse(http.response));
			}
			else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200)
		    {
				
			}
		}
		http.send();
		
	};
	
	this.showArtist  = function(obj) {
		var container = document.querySelector("#album_list_container");
		var template = " " ;
		console.log(obj.results[0]);
		if(obj.results.length > 0) {
			document.querySelector('#not_match').style.display = 'none';
			 for(var i=0;i<obj.results.length;i++) { 
			template += '<div class="col-sm-3 album_list">';
				template += '<div class="item_thmb" style="background: url('+obj.results[i].artworkUrl100+')"></div>';
				template +=  '<div class="item_title">'+obj.results[i].collectionName+'</div>';
				template +='  <div class="item_price"><span>'+obj.results[i].collectionPrice+'</span>200 USD</div>';
					template +='<a href="'+obj.results[i].collectionViewUrl+'" target="_blank">Buy Now</a>';
					template +='</div>';
			 }
			 container.innerHTML = "" ;
			 container.insertAdjacentHTML('afterbegin',template);
		}
			 else {
				 document.querySelector('#not_match').style.display = 'block';
				 
			 }
					
					
					
					
					
				 
		
			
	};
			
			this.init();
		})();
		