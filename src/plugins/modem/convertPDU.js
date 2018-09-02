import converter from 'ussd-pdu-text-converter';

const {
  UssdEncoderDecoder: { encodeAs7bitGSM, decodeAs7bitGSM }
} = converter;

const code = (str, fn) => (str ? fn(str) : null);

const encode = (str) => code(str, encodeAs7bitGSM);
const decode = (str) => code(str, decodeAs7bitGSM);

export {
   encode,
   decode
}
