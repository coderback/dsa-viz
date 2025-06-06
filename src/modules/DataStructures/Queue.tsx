import type { AlgorithmModule, VizParams, Frame } from '@/types/types';
import * as d3 from 'd3';

export const QueueModule: AlgorithmModule = {
  name: 'Queue',
  defaultParams: { arraySize: 10 },
  sourceCode: `// Queue placeholder`,
  explanation: ['Displays a linear queue.'],

  init(params: VizParams) {
    const size = params.arraySize as number;
    return { queue: Array.from({ length: size }, (_, i) => i + 1) };
  },

  step() {
    return null;
  },

  render(frame: Frame, svgContainer: any) {
  const svg: d3.Selection<SVGSVGElement, unknown, null, undefined> =
    svgContainer.select
      ? svgContainer
      : d3.select(svgContainer as SVGSVGElement);

  const data = frame.state.list as number[];
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const nodeW = 50;
  const nodeH = 40;
  const gap = 10;
  const y = height / 2 - nodeH / 2;

  const group = svg.selectAll<SVGGElement, number>('g').data(data);
  const enterGroup = group.enter().append('g');
  enterGroup.append('rect');
  enterGroup.append('text');

  group.merge(enterGroup)
    .attr('transform', (_d: number, i: number) => `translate(${i * (nodeW + gap)}, ${y})`)
    .select('rect')
    .attr('width', nodeW)
    .attr('height', nodeH)
    .attr('fill', '#ddd');

  group.merge(enterGroup)
    .select('text')
    .attr('x', nodeW / 2)
    .attr('y', nodeH / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'middle')
    .text((d: number) => String(d));
},

  reset(params: VizParams) {
    return this.init(params);
  },
};
