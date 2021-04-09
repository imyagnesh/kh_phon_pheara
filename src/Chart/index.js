import React from 'react';
import PropTypes from 'prop-types';
import { VictoryTooltip, VictoryChart, VictoryLine, VictoryScatter, VictoryGroup } from 'victory';

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
  { x: 5, y: 5 },
];

const Chart = (props) => {
  return (
    <VictoryChart height={400} width={400}>
      <VictoryGroup
        color="#c43a31"
        labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
        data={[
          { x: 1, y: -3 },
          { x: 2, y: 5 },
          { x: 3, y: 3 },
          { x: 4, y: 0 },
          { x: 5, y: -2 },
          { x: 6, y: -2 },
          { x: 7, y: 5 },
        ]}>
        <VictoryLine />
        <VictoryScatter size={({ active }) => (active ? 8 : 3)} />
      </VictoryGroup>
      <VictoryGroup
        labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
        data={[
          { x: 1, y: 3 },
          { x: 2, y: 1 },
          { x: 3, y: 2 },
          { x: 4, y: -2 },
          { x: 5, y: -1 },
          { x: 6, y: 2 },
          { x: 7, y: 3 },
        ]}>
        <VictoryLine />
        <VictoryScatter size={({ active }) => (active ? 8 : 3)} />
      </VictoryGroup>
    </VictoryChart>
  );
};

Chart.propTypes = {};

export default Chart;
