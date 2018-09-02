import converter from 'ussd-pdu-text-converter';

const {
  UssdEncoderDecoder: { encodeAs7bitGSM, decodeAs7bitGSM }
} = converter;

const code = (str, fn) => (str ? fn(str) : null);

const encode = (str, encodeAs7bitGSM) => code
const decode = (str, decodeAs7bitGSM) => code

export {
   encode,
   decode
}
