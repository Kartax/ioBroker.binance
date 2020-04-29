/*global systemDictionary:true */
'use strict';

systemDictionary = {
    'adapter-title': {
        'en': 'Binance API Adapter',
        'de': 'Binance API adapter',
        "ru": "Binance API адаптер",
        "pt": "Adaptador API Binance",
        "nl": "Binance API adapter",
        "fr": "Adaptateur d'API Binance",
        "it": "Adattatore API Binance",
        "es": "Adaptador API Binance",
        "pl": "Adapter API Binance",
        "zh-cn": "Binance API适配器"
    },
    'adapter-description': {
        "en": "The adapter downloads prices of currencies in the configured update interval. If you configure an API Key and the corresponding secret, it will pull account balances as well. You may create an API Key on binance.com - i suggest to restrict it to \"read-only",
        "de": "Der Adapter lädt Währungspreise im konfigurierten Aktualisierungsintervall herunter. Wenn Sie einen API-Schlüssel und das entsprechende Geheimnis konfigurieren, werden auch Kontensalden abgerufen. Sie können einen API-Schlüssel auf binance.com erstellen. Ich empfehle, ihn auf \"schreibgeschützt\" zu beschränken",
        "ru": "Адаптер загружает цены валют в заданном интервале обновления. Если вы настроите ключ API и соответствующий секретный ключ, он также потянет остатки на счетах. Вы можете создать ключ API на binance.com - я предлагаю ограничить его только для чтения",
        "pt": "O adaptador baixa os preços das moedas no intervalo de atualização configurado. Se você configurar uma chave de API e o segredo correspondente, também obterá saldos da conta. Você pode criar uma chave de API no binance.com - sugiro restringi-la a \"somente leitura\"",
        "nl": "De adapter downloadt prijzen van valuta's in het geconfigureerde update-interval. Als u een API-sleutel en het bijbehorende geheim configureert, worden ook de rekeningsaldi opgehaald. U kunt op binance.com een API-sleutel maken. Ik raad u aan deze te beperken tot 'alleen-lezen'",
        "fr": "L'adaptateur télécharge les prix des devises dans l'intervalle de mise à jour configuré. Si vous configurez une clé API et le secret correspondant, elle tirera également les soldes des comptes. Vous pouvez créer une clé API sur binance.com - je suggère de la limiter à \"lecture seule\"",
        "it": "L'adattatore scarica i prezzi delle valute nell'intervallo di aggiornamento configurato. Se si configura una chiave API e il segreto corrispondente, verranno estratti anche i saldi degli account. È possibile creare una chiave API su binance.com - suggerisco di limitarla a \"sola lettura",
        "es": "El adaptador descarga los precios de las monedas en el intervalo de actualización configurado. Si configura una clave API y el secreto correspondiente, también extraerá los saldos de las cuentas. Puede crear una clave API en binance.com; sugiero restringirla a \"solo lectura\"",
        "pl": "Adapter pobiera ceny walut w skonfigurowanym interwale aktualizacji. Jeśli skonfigurujesz klucz API i odpowiedni klucz tajny, spowoduje to również wyciągnięcie sald kont. Możesz utworzyć Klucz API na binance.com - sugeruję ograniczenie go do „tylko do odczytu",
        "zh-cn": "适配器以配置的更新间隔下载货币价格。如果您配置了API密钥和相应的机密，它也会提取帐户余额。您可以在binance.com上创建一个API密钥-我建议将其限制为“只读”"
    },
    'update-interval': {
        "en": "Update Interval",
        "de": "Updateintervall",
        "ru": "Интервал обновления",
        "pt": "Intervalo de atualização",
        "nl": "Bijwerkingsonderbreking",
        "fr": "Intervalle de mise à jour",
        "it": "Intervallo di aggiornamento",
        "es": "Intervalo de actualización",
        "pl": "Interwał aktualizacji",
        "zh-cn": "更新间隔"
    },
    'allPrices': {
        "en": "All prices<br/>Prices of every currency pair will be downloaded - but only the current price, no more details.",
        "de": "Alle Preise <br/> Die Preise für jedes Währungspaar werden heruntergeladen - aber nur der aktuelle Preis, keine weiteren Details.",
        "ru": "Все цены <br/> Будут загружены цены каждой валютной пары - но только текущая цена, без подробностей.",
        "pt": "Todos os preços <br/> Os preços de cada par de moedas serão baixados - mas apenas o preço atual, sem mais detalhes.",
        "nl": "Alle prijzen <br/> De prijzen van elk valutapaar worden gedownload - maar alleen de huidige prijs, geen details meer.",
        "fr": "Tous les prix <br/> Les prix de chaque paire de devises seront téléchargés - mais uniquement le prix actuel, pas plus de détails.",
        "it": "Tutti i prezzi <br/> Verranno scaricati i prezzi di ogni coppia di valute, ma solo il prezzo corrente, senza ulteriori dettagli.",
        "es": "Todos los precios <br/> Se descargarán los precios de cada par de divisas, pero solo el precio actual, sin más detalles.",
        "pl": "Wszystkie ceny <br/> Ceny każdej pary walut zostaną pobrane - ale tylko aktualna cena, bez dalszych szczegółów.",
        "zh-cn": "所有价格<br/>将下载每个货币对的价格-但仅下载当前价格，没有更多详细信息。"
    },
    'yes': {
        "en": "Yes",
        "de": "Ja",
        "ru": "да",
        "pt": "sim",
        "nl": "Ja",
        "fr": "Oui",
        "it": "sì",
        "es": "si",
        "pl": "tak",
        "zh-cn": "是"
    },
    'no': {
        "en": "No",
        "de": "Nein",
        "ru": "нет",
        "pt": "Não",
        "nl": "Nee",
        "fr": "Non",
        "it": "No",
        "es": "No",
        "pl": "Nie",
        "zh-cn": "没有"
    },
    'symbols': {
        "en": "24hr details for<br/>Enter symbols (currencypairs like BTCETH, ETCUSDT etc.) you wish to download details for.",
        "de": "24 Stunden Details für <br/> Geben Sie Symbole (Währungspaare wie BTCETH, ETCUSDT usw.) ein, für die Sie Details herunterladen möchten.",
        "ru": "24 часа детали для <br/> Введите символы (валютные пары, такие как BTCETH, ETCUSDT и т. Д.), Для которых вы хотите загрузить данные.",
        "pt": "Detalhes de 24 horas para <br/> Insira símbolos (pares de moedas como BTCETH, ETCUSDT etc.) para os quais deseja fazer o download de detalhes.",
        "nl": "24 uur details voor <br/> Voer symbolen in (valuta zoals BTCETH, ETCUSDT enz.) Waarvoor u details wilt downloaden.",
        "fr": "Détails 24h pour <br/> Entrez les symboles (currencypairs comme BTCETH, ETCUSDT etc.) pour lesquels vous souhaitez télécharger les détails.",
        "it": "Dettagli 24 ore per <br/> Inserisci i simboli (valute come BTCETH, ETCUSDT ecc.) Per i quali desideri scaricare i dettagli.",
        "es": "Detalles de 24 horas para <br/> Ingrese los símbolos (pares de divisas como BTCETH, ETCUSDT, etc.) para los que desea descargar los detalles.",
        "pl": "Szczegóły 24 godziny na <br/> Wprowadź symbole (pary walut, takie jak BTCETH, ETCUSDT itp.), Dla których chcesz pobrać szczegóły.",
        "zh-cn": "24小时的详细信息<br/>输入您想要下载其详细信息的符号（BTCETH，ETCUSDT等货币对）。"
    },
    'apiKey': {
        "en": "API Key",
        "de": "API Schlüssel",
        "ru": "Ключ API",
        "pt": "Chave API",
        "nl": "API sleutel",
        "fr": "clé API",
        "it": "Chiave API",
        "es": "Clave API",
        "pl": "Klucz API",
        "zh-cn": "API密钥"
    },
    'apiKeySecret': {
        "en": "API Key secret",
        "de": "API Schlüssel Geheimnis",
        "ru": "Секретный ключ API",
        "pt": "Segredo da chave da API",
        "nl": "API-sleutelgeheim",
        "fr": "Secret de clé API",
        "it": "Segreto chiave API",
        "es": "Secreto clave de API",
        "pl": "Klucz tajny API",
        "zh-cn": "API密钥机密"
    }
};
