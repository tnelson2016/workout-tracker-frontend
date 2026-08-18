

export default function BarbellLoader(props) {
   
    const plateHeights = [70, 60, 50, 42, 34, 28];
    const platesToShow = plateHeights.slice(0, props.count);

    const opacity = props.dim ? 0.35 : 1;

    return (
        <svg viewBox=" 0 0 300 200">

            {/* this the bar */}
            <rect x="40" y="96" width="180" height="8" fill="var(--chalk)" opacity={opacity}/>
            
          
          
            {/* the plates */}
            {platesToShow.map((height, index) => (
                <rect
                    key={index}
                    x={40 + index * 12}
                    y={100 - height / 2}
                    width={10}
                    height={height}
                    fill={index === 0 ? 'var(--load)' : 'var(--steel)'}
                    opacity={opacity}
                />

            ))}

             {/* the plates - right side (mirrored) */}
            {platesToShow.map((height, index) => (
                <rect
                    key={`right-${index}`}
                    x={220 - 10 - index * 12}
                    y={100 - height / 2}
                    width={10}
                    height={height}
                    fill={index === 0 ? 'var(--load)' : 'var(--steel)'}
                    opacity={opacity}
                />
            ))}
    
        </svg>
    
    );
}