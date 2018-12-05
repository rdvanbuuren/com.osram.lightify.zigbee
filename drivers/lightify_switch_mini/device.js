'use strict';

const Homey = require('homey');
const ZigBeeDevice = require('homey-meshdriver').ZigBeeDevice;

let lastKey = null;
let keyHeld = false;

class LightifySwitchMiniZigBee extends ZigBeeDevice {

    async onMeshInit() {
        this.buttonMap = {
            Top: { button: 'Top button' },
            Middle: { button: 'Middle button' },
            Bottom: { button: 'Bottom button' }
        };

        this.sceneMap = {
            0: { scene: 'Short press' },
            1: { scene: 'Long press' }
        };

        this.registerAttrReportListener('genOnOff', 'cmdOn', 1, 3600, 1,
            this.onOnOffListener.bind(this), 0)
            .then(() => {
				// Registering attr reporting succeeded
				this.log('registered attr report listener - genOnOff - cmdOn');
			})
            .catch(err => {
                // Registering attr reporting failed
                this.error('failed to register attr report listener - genOnOff - cmdOn', err);
            });

        this.registerAttrReportListener('genOnOff', 'cmdOff', 1, 3600, 1,
            this.onOnOffListener.bind(this), 0)
            .then(() => {
				// Registering attr reporting succeeded
				this.log('registered attr report listener - genOnOff - cmdOff');
			})
            .catch(err => {
                // Registering attr reporting failed
                this.error('failed to register attr report listener - genOnOff - cmdOff', err);
            });



    }

    onLifelineReport(value) {
        this.log('lifeline report', new Buffer(value, 'ascii'));
    }

    onOnOffListener(repScene) {
        this.log('genOnOff - onOff', repScene, 'lastKey', lastKey, 'keyHeld', keyHeld);
    }
}

module.exports = LightifySwitchMiniZigBee;