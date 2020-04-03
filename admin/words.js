/*global systemDictionary:true */
'use strict';

systemDictionary = {
    'adapter-title': {
        'en': 'Binance API Adapter',
        'de': 'Binance API Adapter'
    },
    'adapter-description': {
        'en':   'The adapter pulls prices of currencies in the configured update interval.' +
                'If you configure an API Key and the corresponding secret, it will pull account balances as well.' +
                'You may create an API Key on binance.com - i suggest to restrict it to "read-only".',
        'de':   'Der Adapter lädt die Preise sämtlicher Währungen innerhalb des konfigurierten Intervalls' +
                'Wenn sie einen API Schlüssel und das zugehörige Geheimnis konfigurieren, werden zusätzlich die Kontostände des accounts abgerufen.' +
                'Einen API Schlüssel können Sie sich auf binance.com erzeugen - ich empfehlen diesen auf "nur lesen" zu beschränken.'
    },
    'update-interval': {
        'en': 'Update Interval',
        'de': 'Update Intervall'
    },
    'apiKey': {
        'en': 'API Key',
        'de': 'API Schlüssel',
    },
    'apiKeySecret': {
        'en': 'API Key secret',
        'de': 'API Schlüssel Geheimnis',
    }
};
