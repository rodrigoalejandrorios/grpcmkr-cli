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
    it('Func - pascalCase', () => {
      const newSrt = pascalCase(str);
      expect(newSrt).toBe('MyNewText');
    });
    it('Func - toTitleCase', () => {
      const newSrt = toTitleCase(str);
      expect(newSrt).toBe('MyNewText');
    });
    it('Func - toCamelCase', () => {
      const newSrt = toCamelCase(str);
      expect(newSrt).toBe('myNewText');
    });
  });
});
