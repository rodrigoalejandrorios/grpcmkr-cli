import {
  pascalCase,
  toCamelCase,
  toTitleCase,
} from '../../utils/text-case.utils';

describe('Utils - Text case', () => {
  let str: string;
  beforeAll(() => {
    str = 'my new text';
  });
  describe('Implement use with text', () => {
    it('Recieved pascal case', () => {
      const newSrt = pascalCase(str);
      expect(newSrt).toBe('MyNewText');
    });
    it('Recieved title case', () => {
      const newSrt = toTitleCase(str);
      expect(newSrt).toBe('MyNewText');
    });
    it('Recieved camel case', () => {
      const newSrt = toCamelCase(str);
      expect(newSrt).toBe('myNewText');
    });
  });
});
