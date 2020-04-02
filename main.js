'use strict';

const utils = require('@iobroker/adapter-core');
const request = require('request');

// Load your modules here, e.g.:
// const fs = require("fs");


const endpoint = 'https://api.binance.com';
const endpointPrice = endpoint + '/api/v3/ticker/price';


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

        setInterval(this.main.bind(this), this.config.interval);
    }

    /**
     * The main update method
     */
    main() {
        this.log.info('main');
        request(
            {
                url: endpointPrice,
                json: true,
                time: true,
                timeout: this.config.interval - 2000
            },
            (error, response, content) => {
                if (!error) {
                    this.log.info('response.statusCode: ' + response.statusCode);
                    if (response.statusCode == 200) {
                        this.log.info('received ' + content.length() + ' prices');
                        for(const entry of content){
                            this.setObject(entry.symbol, entry);
                        }
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
