import * as base64 from './base64';

const boolArray = '01010100011010000110010100100000011100010111010101101001011000110110101100100000'
  .split('')
  .map(bit => bit === '1');
const base64String = 'VGhlIHF1aWNrIA';

test('encode', () => {
  const encoded = base64.encode(boolArray);
  expect(encoded).toEqual(base64String);
});

test('decode', () => {
  const decoded = base64.decode(base64String);
  expect(decoded).toEqual(boolArray);
});
