$(document).ready(function () {
    chrome.tabs.query({
	  active: true,
	  currentWindow: true
	}, urlLoaded);

	function urlLoaded(tabs){
		var tab = tabs[0];
		var url = tab.url;
		console.log(url);
		$.ajax({
	        url: url,
	        type: 'GET',
	        xhrFields: {
		        withCredentials: true
		    },
	        success: htmlLoaded
	    });
	}

	function htmlLoaded(data){
		//console.log(data);
		var about_info = $('.about_user_text', data).text();
		$('#wrapper').html(about_info);
		console.log(about_info);
	}

	
});