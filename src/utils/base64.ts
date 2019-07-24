function base64UrlEncode(input: string) {
  let encoded: string;
  if (window && window.btoa) {
    encoded = window.btoa(input);
  } else {
    encoded = Buffer.from(input).toString('base64');
  }
  encoded = encoded
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return encoded;
}

function base64UrlDecode(input: string) {
  let decoded = input.replace(/-/g, '+').replace(/_/g, '/');
  if (window && window.atob) {
    decoded = window.atob(decoded);
  } else {
    decoded = Buffer.from(decoded, 'base64').toString();
  }
  return decoded;
}

export function encode(input: boolean[]) {
  if (input.length % 8) {
    throw new Error('Input length must be a integral multiple of 8');
  }
  const byteGroup =
    input
      .map(b => (b ? '1' : '0'))
      .join('')
      .match(/(.{1,8})/g) || [];
  const binaryString = byteGroup
    .map(b => parseInt(b, 2))
    .map(c => String.fromCharCode(c))
    .join('');
  const encoded = base64UrlEncode(binaryString);
  return encoded;
}

export function decode(input: string) {
  const decoded = base64UrlDecode(input);
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
