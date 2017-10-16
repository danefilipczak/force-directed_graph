contributors = [

	/*
	Put new contributors here. Be careful about the syntax - 
	'id' can be whatever you want, but it has to be consistent. 
	'name' is what will show up on the screen. 
	template:
	{name: 'NAME WITHIN SINGLE QUOTES', id: 'ID WITHIN SINGLE QUOTES', connections: ['CONNECTIONS WITHIN SINGLE QUOTES', 'SEPERATED BY COMMAS']},
	*/

	{name: 'Jahmal B. Golden', id: 'jahmal', connections: ['lydon']},
	{name: 'Lydon MacGregor', id: 'lydon', connections: ['jahmal']},
	{name: 'Heidi Reszies', id: 'heidi', connections: ['andrea']},
	{name: 'Andrea Blancas Beltran', id: 'andrea', connections: ['heidi', 'mary-kim']},
	{name: 'Mary-Kim Arnold', id: 'mary-kim', connections: ['andrea', 'sabra']},
	{name: 'Sabra Embury', id: 'sabra', connections: ['sabra', 'hannah']},
	{name: 'Hannah Lillith Assadi', id: 'hannah', connections: ['sabra']},


	{name: 'Gillian Sze', id: 'gillian', connections: ['adèle']},
	{name: 'Adèle Barclay', id: 'adèle', connections: ['gillian', 'Inés']},
	{name: 'Inés Pujos', id: 'Inés', connections: ['adèle']},

	{name: 'Matt Nelson', id: 'Matt', connections: ['s. a.']},
	{name: 'S. A. Karaskova', id: 's. a.', connections: ['Matt']},


	{name: 'Dennis James Sweeney', id: 'dennis', connections: ['michael']},
	{name: 'Michael Wasson', id: 'michael', connections: ['dennis', 'leila']},
	{name: 'Leila Chatti', id: 'leila', connections: ['michael']},







	


	

	// {name: 'Shahira Kudsi', id: 'shahira', connections: ['lydon', 'jahmal']},
	// {name: 'Dane Filipczak', id: 'dane', connections: ['lydon']}


]


bios = {

	/*
	Put new bios here. 
	The ID must be exactly the same as that used above in the contributors list!
	the Bio can include html... for example, <a href="a_url">link to work</a>
		template: 
		'id within single quotes': "bio between double quotes",
	*/

	'jahmal': "A strapping young lass.",
	'lydon': "The best the world has.",
}
