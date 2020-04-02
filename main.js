'use strict';

const utils         = require('@iobroker/adapter-core');
const request       = require('request');
const hmacSHA256    = require('crypto-js/hmac-sha256');

// Load your modules here, e.g.:
// const fs = require("fs");


const ENDPOINT = 'https://api.binance.com';
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
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        this.log.info('ready');
        this.log.info(JSON.stringify(this.config));

        // trigger main method in configured interval
        setInterval(this.main.bind(this), this.config.interval);
    }

    /**
     * The main update method
     */
    main() {
        this.log.info('main');
        //this.requestPrices();
        if(this.config.apiKey) this.requestAccount();
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
                timeout: this.config.interval - 2000
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
                            this.setState('price.' + entry.symbol, {val: entry.price, ack: true});
                        }

                    } else if (response.statusCode == 418 || response.statusCode == 429) {
                        // we need to back off
                        this.log.warn('need to back off');

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
        const timestamp = Date.now();
        const queryString = 'timestamp='+timestamp;
        const signature = hmacSHA256.encrypt(this.config.apiKeySecret, queryString)

        this.log.info('requestAccount');
        request(
            {
                url: ENDPOINT_ACCOUNT +'?' + queryString + '&signature=' + signature,
                json: true,
                time: true,
                timeout: this.config.interval - 2000,
                headers: {'X-MBX-APIKEY' : this.config.apiKey}
            },
            (error, response, content) => {
                if (!error) {
                    this.log.info('response.statusCode: ' + response.statusCode);

                    if (response.statusCode == 200) {
                        this.log.info('received ' + content.length + ' prices');
                        this.log.info(JSON.stringify(response));

                    } else if (response.statusCode == 418 || response.statusCode == 429) {
                        // we need to back off
                        this.log.warn('need to back off');

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
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            this.log.info('unload');
            callback();
        } catch (e) {
            callback();
        }
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
