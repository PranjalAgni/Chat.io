const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object' , () => {
        const from = "Jen";
        const text = "Some Message";
        const message = generateMessage(from , text);



        expect(typeof message.createdAt).toBe('number');

        expect(message).toMatchObject({from , text});
    });
});


describe('generateLocationMessage' , () => {
    it('should generate correct location object', () => {
        const from = 'wes bos';
        const latitude = 1;
        const longitude = 1;
        const url = 'https://www.google.com/maps?q=1,1';
        const desiredMessage = generateLocationMessage(from,latitude,longitude);

        expect(typeof desiredMessage.createdAt).toBe('number');
        expect(desiredMessage).toMatchObject({from,url});
    });
})