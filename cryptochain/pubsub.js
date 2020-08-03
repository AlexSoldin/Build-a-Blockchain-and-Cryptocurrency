const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-7531d1f9-2baf-4e10-b4f6-105cfe158b53',
    subscribeKey: 'sub-c-10e57546-d596-11ea-9485-d6b39d8ad52f',
    secretKey: 'sec-c-YjVkMzM2MDYtMjEyMC00YmY2LTlmYmEtYWFiNDAwZmI1MTVj'
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor({blockchain}) {
        this.blockchain = blockchain;

        this.pubnub = new PubNub(credentials);
        this.pubnub.subscribe({channels: Object.values(CHANNELS)});
        this.pubnub.addListener(this.listener());
    }

    subscribeToChannels() {
        this.pubnub.subscribe({
            channels: [Object.values(CHANNELS)]
        });
    }

    listener(){
        return {
            message: messageObject => {
                const {channel, message} = messageObject;
                console.log(`Message received \t Channel: ${channel} \t Message: ${message}`);
                const parsedMessage = JSON.parse(message);

                switch(channel){
                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain(parsedMessage);
                }
            }
        };
    }

    publish({channel, message}){
        this.pubnub.publish({channel, message});
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}

module.exports = PubSub;