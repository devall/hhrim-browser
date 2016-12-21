$(document).ready(function () {
    chrome.tabs.query({
	  active: true,
	  currentWindow: true
	}, urlLoaded);

	function urlLoaded(tabs){
		var url = tab.url;
		$.ajax({
	        url: url,
	        type: 'GET',
	        success: htmlLoaded
	    });
	}

	function htmlLoaded(data){
		var myData = {};
		var about_info = $('.about_user_text', data).text();
		$('#wrapper').html(about_info);
		myData.about_info = about_info;
		console.log(myData.about_info);
	}

	
});