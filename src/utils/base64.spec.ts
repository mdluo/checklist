import * as base64 from './base64';

const table = [
  [
    '01010100011010000110010100100000011100010111010101101001011000110110101100100000',
    'VGhlIHF1aWNrIA',
  ],
];

function binaryToArray(input: string) {
  return input.split('').map(bit => bit === '1');
}

test.each(table)('encode', (binaryStr, base64Str) => {
  const booleanArr = binaryToArray(binaryStr);
  const encoded = base64.encode(booleanArr);
  expect(encoded).toEqual(base64Str);
});

test.each(table)('decode', (binaryStr, base64Str) => {
  const booleanArr = binaryToArray(binaryStr);
  const decoded = base64.decode(base64Str);
  expect(decoded).toEqual(booleanArr);
});
