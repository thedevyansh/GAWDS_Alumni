
const content = document.querySelector('#content');

const requestURL = 
'https://spreadsheets.google.com/feeds/cells/1DmQG7l-C4mlp3puiogcGWHiqV4Ru9rNtCLZOqJ2fr9Q/1/public/values?alt=json';

const request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';

request.send();

request.onload = function() {

	const jsonObj = request.response;

	populateContent(jsonObj);

}


function populateContent(jsonObj)
{
	let noOfAlumni = (jsonObj['feed']['entry'].length)/6 - 1;
	
	for (let i = 1; i <= noOfAlumni; i++ )
	{
		const card = document.createElement('div');
		const profile_image_container = document.createElement('div');
		const profile_image_back = document.createElement('div');
		const profile_name = document.createElement('div');
		const profile_title = document.createElement('div');

		const linkImage = document.createElement('a');
		const image = document.createElement('img');

		const linkName = document.createElement('a');
		const batch = document.createElement('p');

	/* ---------------------------------------------------------------------*/

	    image.src = jsonObj['feed']['entry'][i*6 + 2]['content']['$t'];

	    image.alt = jsonObj['feed']['entry'][i*6 + 1]['content']['$t'];

	    linkImage.href = jsonObj['feed']['entry'][i*6 + 4]['content']['$t'];

	    linkImage.target = '_blank';

	    linkImage.appendChild(image);
	    profile_image_container.appendChild(linkImage);
	    card.appendChild(profile_image_container);

	    linkName.href = jsonObj['feed']['entry'][i*6 + 4]['content']['$t'];

	    linkName.target = '_blank';

	    let name = document.createTextNode(jsonObj['feed']['entry'][i*6 + 1]['content']['$t']);
	    linkName.appendChild(name);

	    batch.textContent = jsonObj['feed']['entry'][i*6 + 5]['content']['$t'];

	    let title = document.createTextNode(jsonObj['feed']['entry'][i*6 + 3]['content']['$t']);
        profile_title.appendChild(title);

	    profile_name.appendChild(linkName);
	    profile_name.appendChild(batch);
	    profile_image_back.appendChild(profile_name);
	    profile_image_back.appendChild(profile_title);
	    card.appendChild(profile_image_back);

	    content.appendChild(card);

	/* -----------------------------------------------------------------------*/	

		card.setAttribute('class', 'card');
		profile_image_container.setAttribute('class', 'profile-image-container');
        profile_image_back.setAttribute('class', 'profile-image-back');
        profile_name.setAttribute('class', 'profile-name');
        profile_title.setAttribute('class', 'profile-title');
	}

}
