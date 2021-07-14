import { NullReplacerPipe } from './null-replacer.pipe';

describe('NullReplacerPipe', () => {
  it('create an instance', () => {
    const pipe = new NullReplacerPipe();
    expect(pipe).toBeTruthy();
  });
});
