import { Component, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

import { Chart } from '../../nodes.pipe';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  margin = { top: 10, right: 30, bottom: 30, left: 40 };
  width = 800 - this.margin.left - this.margin.right;
  height = 800 - this.margin.top - this.margin.bottom;

  created = false;

  @Input() chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chart?.currentValue) {
      this.created
        ? this.updateChart(changes.chart?.currentValue)
        : this.createChart(changes.chart?.currentValue);
    }
  }

  updateChart(chart: Chart): void {
    d3.select('#chart').selectAll('*').remove();
    this.createChart(chart);
  }

  createChart(chart: Chart): void {
    const links = chart.links.map((d) => Object.create(d));
    const nodes = chart.nodes.map((d) => Object.create(d));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => 2);

    const node = svg.selectAll().data(nodes);

    const group = node.enter().append('g');

    const circle = group.append('circle').attr('r', 6).attr('fill', '#69b3a2');

    const text = group
      .append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle');

    node.append('title').text((d) => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      circle.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      text.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });

    this.created = true;
  }
}
