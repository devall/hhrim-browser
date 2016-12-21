$(document).ready(function () {
    chrome.tabs.query({
	  active: true,
	  currentWindow: true
	}, urlLoaded);

	function urlLoaded(tabs){
		var tab = tabs[0];
		var url = tab.url;
		$.ajax({
			url: url,
			type: 'GET',
			success: htmlLoaded
		});
	}

	function htmlLoaded(data){
		var about_info = $('.about_user_text', data).text();
		var skills_info = $('.user_skills_list', data).children('.skills').text();
		var username = $('.user_name', data).text();
		var profession = $('.profession', data).text();
		var status = $('.salary', data).children('.status').text();
		var salary = $('.salary', data).children('.count').text();
		var homepage = $('.homepage', data).children().attr('href');
		var friends_count = $('.statistics', data).children('a.row:first').children('div.count').text();
		var letters_count = $('.statistics', data).children('a.row:nth-child(2)').children('div.count').text();
		var registered_at = $('.activities', data).children('div.row:first').children('span.value').text();
		var last_visit = $('.activities', data).children('div.row:nth-child(2)').children('span.value').text();
		var location = $('.location', data).children('div.geo').text();
		var location_status = $('.location', data).children('div.ready_to').text();
		var age = $('.experience_and_age', data).children('div.row:first').children('div.value').text();
		var experience = $('.experience_and_age', data).children('div.row:nth-child(2)').children('div.value').text();

		$('#wrapper').html(about_info);
		var myData = {
			username: username,
			profession: profession,
			homepage: homepage,
			status: status,
			salary: salary,
			about_info: about_info,
			skills_info: skills_info,
			friends_count: friends_count,
			letters_count: letters_count,
			registered_at: registered_at,
			last_visit: last_visit,
			location: location,
			location_status: location_status,
			age: age,
			experience: experience,
			work_experience: [],
			education_show: []
		};

		$('.work_experiences', data).children('.work_experience').each(function(){
			var period = $(this).children('.period').text();
			var company_name = $(this).children('.info').children('.meta').children('.company_name').text();
			var position = $(this).children('.info').children('.meta').children('.position').text();
			var location = $(this).children('.info').children('.meta').children('.location').text();
			myData.work_experience.push({
				company_name: company_name,
				position: position,
				location: location,
				period: period
			});
		});

		$('.educations_show', data).children('.education_show').each(function(){
			var period = $(this).children('.period').text();
			var institution_name = $(this).children('.info').children('.meta').children('.institution_name').text();
			var specialization = $(this).children('.info').children('.meta').children('.specialization').text();
			var location = $(this).children('.info').children('.meta').children('.location').text();
			myData.education_show.push({
				institution_name: institution_name,
				specialization: specialization,
				location: location,
				period: period
			});
		});


		

		console.log(myData);
	}

	
});