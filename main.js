'use strict';

const utils = require('@iobroker/adapter-core');
const request = require('request');
const hmacSHA256 = require('crypto-js/hmac-sha256');

const ENDPOINT = 'https://api.binance.com';
const ENDPOINT_24HR_PREFIX = ENDPOINT + '/api/v3/ticker/24hr?symbol=';
const ENDPOINT_PRICE = ENDPOINT + '/api/v3/ticker/price';
const ENDPOINT_ACCOUNT = ENDPOINT + '/api/v3/account';

class Binance extends utils.Adapter {

    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: 'binance',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
        this.intervalHandle = null;
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        this.log.info('ready');

        // trigger main method in configured interval
        this.intervalHandle = setInterval(this.main.bind(this), this.config.interval);
    }

    /**
     * The main update method
     */
    main() {
        if (this.config.allPrices) this.requestPrices();
        if (this.config.symbols) this.request24hr();
        if (this.config.apiKey && this.config.apiKeySecret) this.requestAccount();
    }

    /**
     * Request 24hr
     */
    request24hr() {
        this.log.info('request24hr');

        for(const symbol of this.config.symbols.split(',')) {

            request(
                {
                    url: ENDPOINT_24HR_PREFIX + symbol.trim(),
                    json: true,
                    time: true,
                    timeout: 5000
                },
                (error, response, content) => {
                    if (!error) {
                        if (response.statusCode == 200) {
                            this.log.info('received 24hr data for ' + symbol);
                            for (const key of Object.keys(content)) {
                                this.setObjectNotExists('24hr.' + symbol + '.' + key, {
                                    type: 'state',
                                    common: {
                                        name: symbol + '.' + key,
                                        type: 'string',
                                        role: 'value',
                                        read: true,
                                        write: false
                                    },
                                    native: {}
                                });
                                this.setState('24hr.' + symbol + '.' + key, content[key]);
                            }

                        } else if (response.statusCode == 418 || response.statusCode == 429) {
                            // we need to back off
                            this.log.warn('need to back off');
                            // TODO

                        } else {
                            // unexpected
                            this.log.error('unexpected response.statusCode');
                        }

                    } else {
                        this.log.error('request error');
                        this.log.error(error);
                    }
                }
            );
        }
    }

    /**
     * Request prices
     */
    requestPrices() {
        this.log.info('requestPrices');

        request(
            {
                url: ENDPOINT_PRICE,
                json: true,
                time: true,
                timeout: 5000
            },
            (error, response, content) => {
                if (!error) {
                    this.log.info('response.statusCode: ' + response.statusCode);

                    if (response.statusCode == 200) {
                        this.log.info('received ' + content.length + ' prices');
                        for (const entry of content) {
                            this.setObjectNotExists('price.' + entry.symbol, {
                                type: 'state',
                                common: {
                                    name: entry.symbol,
                                    type: 'number',
                                    role: 'value',
                                    read: true,
                                    write: false
                                },
                                native: {}
                            });
                            this.setState('price.' + entry.symbol, entry.price);
                        }

                    } else if (response.statusCode == 418 || response.statusCode == 429) {
                        // we need to back off
                        this.log.warn('need to back off');
                        // TODO

                    } else {
                        // unexpected
                        this.log.error('unexpected response.statusCode');
                    }

                } else {
                    this.log.error('request error');
                    this.log.error(error);
                }
            }
        );
    }

    /**
     * Request account
     */
    requestAccount() {
        this.log.info('requestAccount');

        const timestamp = Date.now();
        const queryString = 'timestamp=' + timestamp;

        this.getForeignObject('system.config', (err, obj) => {
            let apiKeySecret = this.config.apiKeySecret
            if (obj && obj.native && obj.native.secret) {
                //noinspection JSUnresolvedVariable
                apiKeySecret = this.decrypt(obj.native.secret, apiKeySecret);
            } else {
                //noinspection JSUnresolvedVariable
                apiKeySecret = this.decrypt('Raxu82gIe87jJOZ', apiKeySecret);
            }

            const signature = hmacSHA256(queryString, apiKeySecret);

            request(
                {
                    url: ENDPOINT_ACCOUNT + '?' + queryString + '&signature=' + signature,
                    json: true,
                    time: true,
                    timeout: this.config.interval - 2000,
                    headers: {'X-MBX-APIKEY': this.config.apiKey}
                },
                (error, response, content) => {
                    if (!error) {
                        this.log.info('response.statusCode: ' + response.statusCode);

                        if (response.statusCode == 200) {
                            this.log.info('got account response');

                            // balances
                            for(const balance of content.balances){
                                if(balance.free > 0) {
                                    this.setObjectNotExists('account.balance.' + balance.asset, {
                                        type: 'state',
                                        common: {
                                            name: balance.asset,
                                            type: 'number',
                                            role: 'value',
                                            read: true,
                                            write: false
                                        },
                                        native: {}
                                    });
                                    this.setState('account.balance.' + balance.asset, balance.free);
                                }
                            }

                        } else if (response.statusCode == 418 || response.statusCode == 429) {
                            // we need to back off
                            this.log.warn('need to back off');
                            // TODO

                        } else {
                            // unexpected
                            this.log.error('unexpected response.statusCode');
                            this.log.error(JSON.stringify(response));
                        }

                    } else {
                        this.log.error('request error');
                        this.log.error(error);
                    }
                }
            );
        });
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            this.log.info('unload');
            this.intervalHandle && clearInterval(this.intervalHandle);
            this.intervalHandle = null;
            callback();
        } catch (e) {
            callback();
        }
    }

    // Function to decrypt passwords
    decrypt(key, value) {
        let result = '';
        for (let i = 0; i < value.length; ++i) {
            result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
        }
        this.log.debug('client_secret decrypt ready');
        return result;
    }
}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new Binance(options);
} else {
    // otherwise start the instance directly
    new Binance();
}
