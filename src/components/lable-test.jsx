export function NameLabel(props) {
    const { text,sourceX,sourceY, ...otherProps } = props;
    return (
      <g>
        {/* Dummy to compute text length */}
            <text
              fill="blue"
              style={{fontSize: 3}}
              x={sourceX} 
              y={sourceY}
              {...otherProps}
            >
              {text}
            </text>
      </g>
    );
  }