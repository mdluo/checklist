import base64url from 'base64url';

export function encode(input: boolean[]) {
  const byteGroup =
    input
      .map(b => (b ? '1' : '0'))
      .join('')
      .match(/(.{1,8})/g) || [];
  const binaryString = byteGroup
    .map(b => parseInt(b, 2))
    .map(c => String.fromCharCode(c))
    .join('');
  const encoded = base64url.encode(binaryString);
  return encoded;
}

export function decode(input: string) {
  const decoded = base64url.decode(input);
  return decoded
    .split('')
    .map(s =>
      s
        .charCodeAt(0)
        .toString(2)
        .padStart(8, '0')
    )
    .join('')
    .split('')
    .map(s => s === '1');
}
