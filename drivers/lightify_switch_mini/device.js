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

        // short press top button
        this.registerAttrReportListener('genOnOff', 'cmdOn', 1, 3600, 1, this.onShortPressListener.bind(this), 'Top')
            .then(() => this.log('registered short press listener - genOnOff - cmdOn'))
            .catch(err => this.error('failed to register attr report listener - genOnOff - cmdOn', err));

        // TODO: is this for testing purposes or middle button??
        this.registerAttrReportListener('genOnOff', 'attReport', 1, 3600, 1, this.onShortPressListener.bind(this), 'Middle')
            .then(() => this.log('registered short press listener - genOnOff - attReport'))
            .catch(err => this.error('failed to register short press listener - genOnOff - attReport', err));

        // short press bottom button
        this.registerAttrReportListener('genOnOff', 'cmdOff', 1, 3600, 1, this.onShortPressListener.bind(this), 'Bottom')
            .then(() => this.log('registered attr report listener - genOnOff - cmdOff'))
            .catch(err => this.error('failed to register attr report listener - genOnOff - cmdOff', err));

        // long press top button - on
        this.registerAttrReportListener('genLevelCtrl', 'cmdMoveWithOnOff', 1, 3600, 1, this.onLongPressListener.bind(this), 'Top')
            .then(() => this.log('registered long press listener - genLevelCtrl - cmdMoveWithOnOff'))
            .catch(err => this.error('failed to register long press listener - genLevelCtrl - cmdMoveWithOnOff', err));

        // long press top button - off: genLevelCtrl/cmdStop 

        // long press middle button
        this.registerAttrReportListener('lightingColorCtrl', 'cmdMoveToSaturation', 1, 3600, 1, this.onLongPressListener.bind(this), 'Middle')
            .then(() => this.log('registered long press listener - lightingColorCtrl - cmdMoveToSaturation'))
            .catch(err => this.error('failed to register long press listener - lightingColorCtrl - cmdMoveToSaturation', err));

        // long middle button - off: lightingColorCtrl/cmdMoveHue

        // long press bottom button
        this.registerAttrReportListener('genLevelCtrl', 'cmdMove', 1, 3600, 1, this.onLongPressListener.bind(this), 'Bottom')
            .then(() => this.log('registered long press listener - genLevelCtrl - cmdMove'))
            .catch(err => this.error('failed to register long press listener - genLevelCtrl - cmdMove', err));

       // long press bottom button - off: genLevelCtrl/cmdStop 
    }

    onLifelineReport(value) {
        this.log('lifeline report', new Buffer(value, 'ascii'));
    }

    onShortPressListener(repScene) {
        this.log('short press', repScene, 'lastKey', lastKey, 'keyHeld', keyHeld);
    }

    onLongPressListener(repScene) {
        this.log('long press', repScene, 'lastKey', lastKey, 'keyHeld', keyHeld);
    }
}

module.exports = LightifySwitchMiniZigBee;