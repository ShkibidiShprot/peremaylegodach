export function toMaylego(input) {
  const sentences = input.match(/[^.!?]+[.!?]*|\s+/g) || [input];
  return sentences
    .map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length === 0 || words[0] === '') return sentence;

      return words
        .map((word, index) => `${index === 0 ? 'Майлего' : 'майлего'} ${word}`)
        .join(' ');
    })
    .join(' ');
}

export function fromMaylego(input) {
  return input
    .replace(/майлего\s*/gi, '')
    .trim()
    .replace(/(^\s*|[.!?]\s*)([a-zа-щьюяєіїґ])/g, (_match, separator, letter) =>
      separator + letter.toUpperCase());
}
