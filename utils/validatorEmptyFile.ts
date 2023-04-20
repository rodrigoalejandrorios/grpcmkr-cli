import fs from 'fs';

export const validatorEmptyFile = (filePath: string): boolean => {
  const srt = fs.readFileSync(filePath).toString();
  return srt.trim() !== ''
};
