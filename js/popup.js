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
				hh_parse();
				break;
			default:
				console.log('nothing :(');
		}
		function mk_parse(){
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
			$.get(chrome.extension.getURL('views/popup.html'), function(data2) {
				var data2 = $(data2);
			    $('#username', data2).val(username);
				$('#profession', data2).val(profession);
				$('#homepage', data2).val(homepage);
				$('#status', data2).val(status);
				$('#salary', data2).val(salary);
				$('#about_info', data2).val(about_info);
				$('#friends_count', data2).val(friends_count);
				$('#letters_count', data2).val(letters_count);
				$('#registered_at', data2).val(registered_at);
				$('#last_visit', data2).val(last_visit);
				$('#location', data2).val(location);
				$('#location_status', data2).val(location_status);
				$('#age', data2).val(age);
				$('#experience', data2).val(experience);

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
					$('#jobs', data2).append("<small><b>"+ company_name +"</b> - "+ position +"</small><br>");
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
					$('#edu', data2).append("<small><b>"+ institution_name +"</b> - "+ specialization +"</small><br>");
				});

				$('.user_skills_list', data).children('.skills').children('.skill').each(function(){
					var skill = $(this).text();
					myData.skills.push(skill);
					$('#skills', data2).tagsinput('add', skill)
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

				$('input', data2).each(function(){

					if($(this).val() === '' && $(this).attr('id')){
						$(this).parent().hide();
					}
				});

			   	$(data2).appendTo('body');

			   	$('#username').change(function(){
					myData.username = $(this).val();
					console.log(myData);
				});
				$('#profession').change(function(){
					myData.profession = $(this).val();
				});
				$('#homepage').change(function(){
					myData.homepage = $(this).val();
					console.log(myData);
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

		}
		function hh_parse(){
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


			var about_info = $("div[data-qa='resume-block-skills']", data).text();
			var username = $('.resume-header-name', data).text();
			var profession = $("span.resume-block__title-text[data-qa='resume-block-title-position']", data).text();
			var status = $('.resume-header-block', data).children('p:nth-child(2)').text();
			var salary = $('span.resume-block__salary', data).text();

			// var homepage = $('.homepage', data).children().attr('href');
			// var friends_count = $('.statistics', data).children('a.row:first').children('div.count').text();
			// var letters_count = $('.statistics', data).children('a.row:nth-child(2)').children('div.count').text();
			// var registered_at = $('.activities', data).children('div.row:first').children('span.value').text();
			// var last_visit = $('.activities', data).children('div.row:nth-child(2)').children('span.value').text();
			var location = $('.resume-header-block', data).children('p:nth-child(2)').children('span').children('span').text();
			//var location_status = $('.location', data).children('div.ready_to').text();
			var age = $("span[data-qa='resume-personal-age']", data).text();
			var experience = $('span.resume-block__title-text_sub:first', data).text();
			var prof_desc = $('div.resume-block', data).children('div.bloko-columns-row:nth-child(2)').children('div.bloko-column').children('div.bloko-gap').text();
			var langs = $("div[data-qa='resume-block-languages']", data).children('.bloko-columns-row').children('.bloko-column').not('h2').text();
			var nation = $("span[itemprop='nationality']").text();
			var phone = $.trim($("span[itemprop='telephone']").text());
			var mail = $("a[itemprop='email']").text();

			$.get(chrome.extension.getURL('views/popup.html'), function(data2) {
				var data2 = $(data2);
			    $('#username', data2).val(username);
				$('#profession', data2).val(profession);
				//$('#homepage', data2).val(homepage);
				$('#status', data2).val(status);
				$('#salary', data2).val(salary);
				$('#about_info', data2).val(about_info);
				//$('#friends_count', data2).val(friends_count);
				//$('#letters_count', data2).val(letters_count);
				//$('#registered_at', data2).val(registered_at);
				//$('#last_visit', data2).val(last_visit);
				$('#location', data2).val(location);
				//$('#location_status', data2).val(location_status);
				$('#age', data2).val(age);
				$('#exp', data2).val(experience);
				$('#prof_desc', data2).val(prof_desc);
				$('#langs', data2).val(langs);
				$('#nation', data2).val(nation);
				$('#phone', data2).val(phone);
				$('#mail', data2).val(mail);
				$("div.resume-block[data-qa='resume-block-experience']", data).children('.resume-block-item-gap').each(function(){
					var period = $(this).children('.bloko-columns-row').children('.bloko-column:first').text();
					var company_name = $(this).children('.bloko-columns-row').children('.bloko-column:nth-child(2)').children('.resume-block-container').children("div[itemprop='name']").text();
					var position = $(this).children('.bloko-columns-row').children('.bloko-column:nth-child(2)').children('.resume-block-container').children("div[data-qa='resume-block-experience-position']").text();
					var location = $(this).children('.bloko-columns-row').children('.bloko-column:nth-child(2)').children('.resume-block-container').children("span[itemprop='addressLocality']").text();
					myData.work_experience.push({
						company_name: company_name,
						position: position,
						location: location,
						period: period
					});
					$('#jobs', data2).append("<small><b>"+ company_name +"</b> - "+ position +"</small><br>");
				});

				$("div[data-qa='resume-block-education']", data).children('.resume-block-item-gap').each(function(){
					var period = $(this).children('.bloko-columns-row').children('.bloko-column').text();
					var institution_name = $(this).children('.bloko-columns-row').children('.bloko-column:nth-child(2)').children('.resume-block-container').children("div[data-qa='resume-block-education-name']").text();
					var specialization = $(this).children('.bloko-columns-row').children('.bloko-column:nth-child(2)').children('.resume-block-container').children("div[data-qa='resume-block-education-organization']").text();
					myData.education_show.push({
						institution_name: institution_name,
						specialization: specialization,
						period: period
					});
					$('#edu', data2).append("<small><b>"+ institution_name +"</b> - "+ specialization +"</small><br>");

				});
				$('.HH-Endorsement-Countable-TagList', data).children('span.bloko-tag').each(function(){
					var skill = $(this).children('span.bloko-tag__layout-slim').text();
					console.log(skill);
					myData.skills.push(skill);
					$('#skills', data2).tagsinput('add', skill)
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

				$('input', data2).each(function(){
					if($(this).val() === '' && $(this).attr('id')){
						$(this).parent().hide();
					}
				});

			   	$(data2).appendTo('body');

			   	$('#username').change(function(){
					myData.username = $(this).val();
					console.log(myData);
				});
				$('#profession').change(function(){
					myData.profession = $(this).val();
				});
				$('#homepage').change(function(){
					myData.homepage = $(this).val();
					console.log(myData);
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

			});

			var myData = {
				username: username,
				profession: profession,
				status: status,
				salary: salary,
				about_info: about_info,
				location: location,
				age: age,
				experience: experience,
				work_experience: [],
				education_show: [],
				skills: []
			};

		}
		
	}

	
});