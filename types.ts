
export interface ImageData {
  base64: string;
  mimeType: string;
}

export type StyleOption = 'polaroid' | '80s' | 'watercolor' | 'bw';

export interface Style {
  id: StyleOption;
  name: string;
  promptFragment: string;
}
