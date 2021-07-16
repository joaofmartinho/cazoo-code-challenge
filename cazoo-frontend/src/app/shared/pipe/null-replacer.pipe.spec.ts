import { NullReplacerPipe } from './null-replacer.pipe';

const pipe = new NullReplacerPipe();

describe('NullReplacerPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    expect(pipe.transform('')).toBe('n/a');
    expect(pipe.transform('text')).toBe('text');
    expect(pipe.transform(null)).toBe('n/a');
    expect(pipe.transform('€')).toBe('n/a');
    expect(pipe.transform('%')).toBe('n/a');
    expect(pipe.transform(undefined)).toBe('n/a');
  });
});
