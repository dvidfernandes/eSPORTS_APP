










AUI.add(
	'portal-available-languages',
	function(A) {
		var available = {};

		var direction = {};

		

			available['zh_CN'] = 'chinês (China)';
			direction['zh_CN'] = 'ltr';

		

			available['es_ES'] = 'espanhol (Espanha)';
			direction['es_ES'] = 'ltr';

		

			available['ja_JP'] = 'japonês (Japão)';
			direction['ja_JP'] = 'ltr';

		

			available['nl_NL'] = 'holandês (Holanda)';
			direction['nl_NL'] = 'ltr';

		

			available['hu_HU'] = 'húngaro (Hungria)';
			direction['hu_HU'] = 'ltr';

		

			available['pt_BR'] = 'português (Brasil)';
			direction['pt_BR'] = 'ltr';

		

			available['de_DE'] = 'alemão (Alemanha)';
			direction['de_DE'] = 'ltr';

		

			available['iw_IL'] = 'hebraico (Israel)';
			direction['iw_IL'] = 'rtl';

		

			available['fi_FI'] = 'finlandês (Finlândia)';
			direction['fi_FI'] = 'ltr';

		

			available['ca_ES'] = 'catalão (Espanha)';
			direction['ca_ES'] = 'ltr';

		

			available['fr_FR'] = 'francês (França)';
			direction['fr_FR'] = 'ltr';

		

			available['en_US'] = 'inglês (Estados Unidos)';
			direction['en_US'] = 'ltr';

		

		Liferay.Language.available = available;
		Liferay.Language.direction = direction;
	},
	'',
	{
		requires: ['liferay-language']
	}
);