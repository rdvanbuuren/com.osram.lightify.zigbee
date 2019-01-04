'use strict';

const Homey = require('homey');
const ZigBeeDevice = require('homey-meshdriver').ZigBeeDevice;

let lastKey = null;
let keyHeld = false;

class LightifySwitchMiniZigBee extends ZigBeeDevice {

    async onMeshInit() {

        this.triggerButton1_short = new Homey.FlowCardTriggerDevice('button1_pressed');
        this.triggerButton1_short.register();

        this.triggerButton1_hold = new Homey.FlowCardTriggerDevice('button1_hold');
        this.triggerButton1_hold.register();

        this.triggerButton1_released = new Homey.FlowCardTriggerDevice('button1_released');
        this.triggerButton1_released.register();

        //this.enableDebug();

        // print the node's info to the console
        //this.printNode();

        // this.node.on('command', (command) => {
        //     console.log('------');
        //     console.log(command);
        //     console.log('------');
        // });

        // top
        this.registerReportListener('genOnOff', 'on', () => {
            this.log('top button pressed');
            this.triggerButton1_short.trigger(this, null, null);
        }, 0);

        // top (long)
        this.registerReportListener('genLevelCtrl', 'moveWithOnOff', () => {
            this.log('top button hold');
            this.triggerButton1_hold.trigger(this, null, null);
        }, 0);

        // top stop (long)
        this.registerReportListener('genLevelCtrl', 'stop', () => {
            this.log('top button released');
            this.triggerButton1_released.trigger(this, null, null);
        }, 0);

        // // middle
        // this.registerReportListener('genLevelCtrl', 'moveToLevelWithOnOff', report => {
        //     console.log(report);
        // }, 2);

        // // bottom
        // this.registerReportListener('genOnOff', 'off', report => {
        //     console.log(report);
        // }, 1);

        // // bottom (long)
        // this.registerReportListener('genLevelCtrl', 'move', report => {
        //     console.log(report);
        // }, 1);

        // // bottom stop (long)
        // this.registerReportListener('genLevelCtrl', 'stop', report => {
        //     console.log(report);
        // }, 1);
    }
}

module.exports = LightifySwitchMiniZigBee;