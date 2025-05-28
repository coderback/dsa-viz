export interface VizParams { [key: string]: number | string | boolean; }
export interface Highlight { type: string; id: string; cssClass?: string; }
export interface Frame { state: any; highlights?: Highlight[]; metrics?: Record<string, any>; }
export interface AlgorithmModule {
  name: string;
  defaultParams: VizParams;
  sourceCode?: string;
  explanation?: string[];
  init(params: VizParams): any;
  step(state: any): Frame | null;
  render(frame: Frame, svg: any): void;
  reset(params: VizParams): any;
}