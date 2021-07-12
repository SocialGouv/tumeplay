import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@buffetjs/styles';
import MediaPreviewList from '../../MediaPreviewList';
import RelationPreviewList from '../../RelationPreviewList';
import Truncate from '../../Truncate';
import Truncated from '../../Truncated';
import { Success, Fail  } from '@buffetjs/icons';

const Cell = ({ options }) => {
  const [tooltipIsDisplayed, setDisplayTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setDisplayTooltip(prev => !prev);
  };

  const transformValue = (value) => {
    if (value === 'true') {
        return <Success fill='#2ecc71' width="29.5px" height="29.5px"/>
    } else if (value === 'false') {
        return <Fail fill='#e74c3c' width="22.5px" height="22.5px" style={{position: 'relative', left: '4px'}} />
    }

    return value
  }

  const { type, cellId, value } = options;

  if (type === 'media') {
    return <MediaPreviewList files={value} />;
  }

  if (type === 'relation') {
    return <RelationPreviewList options={options} />;
  }

  return (
    <Truncate onMouseEnter={handleTooltipToggle} onMouseLeave={handleTooltipToggle}>
      <Truncated>
        <span data-for={cellId} data-tip={value}>
          {transformValue(value)}
        </span>
      </Truncated>
      {tooltipIsDisplayed && <Tooltip id={cellId} />}
    </Truncate>
  );
};

Cell.propTypes = {
  options: PropTypes.shape({
    cellId: PropTypes.string.isRequired,
    metadatas: PropTypes.shape({
      mainField: PropTypes.object,
    }).isRequired,
    name: PropTypes.string.isRequired,
    relationType: PropTypes.string,
    rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,
    queryInfos: PropTypes.shape({
      endPoint: PropTypes.string.isRequired,
    }),
    value: PropTypes.any,
  }).isRequired,
};

export default memo(Cell);
