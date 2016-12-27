$(document).ready(function () {

	$.ajax({
		url: window.location.href,
		type: 'GET',
		success: htmlLoaded
	});

	function htmlLoaded(data){
		var parts = window.location.hostname.split('.');
		var domain = parts.slice(-2).join('.');


		switch(domain){
			case 'moikrug.ru':
				mk_parse();
				break;
			case 'hh.ru':
				alert('hey from HH');
				break;
			default:
				console.log('nothing :(');
		}

		function mk_parse(){
			alert('hey from MK');
			$("body").append("<button data-toggle='modal' data-target='#rp-modal' class='rp-btn'>Parse it now!</button>");
			$(".rp-btn").css({
				'width': '150px',
				'height': '45px',
				'border-top-right-radius': '5px',
				'border': '0',
				'color': 'white',
				'left': '0',
				'bottom': '0',
				'position': 'fixed',
				'background-color': '#CC0033'
			});


			var about_info = $('.about_user_text', data).text() || $("div[data-qa='resume-block-skills']", data).text();
			var username = $('.user_name', data).text() || $('.resume-header-name', data).text();
			var profession = $('.profession', data).text() || $("span.resume-block__title-text[data-qa='resume-block-title-position']");
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
			var experience = $('.experience_and_age', data).children('div.row:nth-child(3)').children('div.value').text();

			console.log(about_info);
			$.get(chrome.extension.getURL('views/popup.html'), function(data) {
				
			    $('#username', data).val(username);
				$('#profession', data).val(profession);
				$('#homepage', data).val(homepage);
				$('#status', data).val(status);
				$('#salary', data).val(salary);
				$('#about_info', data).val(about_info);
				$('#friends_count', data).val(friends_count);
				$('#letters_count', data).val(letters_count);
				$('#registered_at', data).val(registered_at);
				$('#last_visit', data).val(last_visit);
				$('#location', data).val(location);
				$('#location_status', data).val(location_status);
				$('#age', data).val(age);
				$('#experience', data).val(experience);
				console.log(data);
				console.log(username);
				
			    	$(data).appendTo('body');
			    	console.log($('#username', data).val());

			    
			});

			var myData = {
				username: username,
				profession: profession,
				homepage: homepage,
				status: status,
				salary: salary,
				about_info: about_info,
				friends_count: friends_count,
				letters_count: letters_count,
				registered_at: registered_at,
				last_visit: last_visit,
				location: location,
				location_status: location_status,
				age: age,
				experience: experience,
				work_experience: [],
				education_show: [],
				skills: []
			};

			$('#username').change(function(){
				myData.username = $(this).val();
			});
			$('#profession').change(function(){
				myData.profession = $(this).val();
			});
			$('#homepage').change(function(){
				myData.homepage = $(this).val();
			});
			$('#status').change(function(){
				myData.status = $(this).val();
			});
			$('#salary').change(function(){
				myData.salary = $(this).val();
			});
			$('#about_info').change(function(){
				myData.about_info = $(this).val();
			});
			$('#friends_count').change(function(){
				myData.friends_count = $(this).val();
			});
			$('#letters_count').change(function(){
				myData.letters_count = $(this).val();
			});
			$('#registered_at').change(function(){
				myData.registered_at = $(this).val();
			});
			$('#last_visit').change(function(){
				myData.last_visit = $(this).val();
			});
			$('#location').change(function(){
				myData.location = $(this).val();
			});
			$('#location_status').change(function(){
				myData.location_status = $(this).val();
			});
			$('#age').change(function(){
				myData.age = $(this).val();
			});
			$('#experience').change(function(){
				myData.experience = $(this).val();
			});


			$('.user_skills_list', data).children('.skills').children('.skill').each(function(){
				var skill = $(this).text();
				myData.skills.push(skill);
				$('#skills').tagsinput('add', skill)
			});

			$('#skills').on('itemAdded', function(event) {
			  console.log(event.item);
			  myData.skills.push(event.item);
			});
			$('#skills').on('itemRemoved', function(event) {
				console.log(event.item);
				if(myData.skills.indexOf(event.item) > -1){
					myData.skills.splice(myData.skills.indexOf(event.item), 1);
				}
			});

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
				$('#jobs').append("<small><b>"+ company_name +"</b> - "+ position +"</small><br>");
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
				//$('#edu').append("<small><b>"+ institution_name +"</b> - "+ specialization +"</small><br>");

			});

		}
	}

	
});