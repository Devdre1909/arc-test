import React, { useEffect, useLayoutEffect } from "react";

const Arc = ({
  mainStrokeColor,
  secondaryStrokeColor,
  width,
  height,
  strokeWidth,
  value,
}) => {
  const [sizeAndRadius, setSizeAndRadius] = React.useState({
    cxMain: 0,
    cyMain: 0,
    radiusMain: 0,
    cxSecondary: 0,
    cySecondary: 0,
    radiusSecondary: 0,
    widthSecondary: 0,
    heightSecondary: 0,
  });

  const [valueWhole, setValueWhole] = React.useState(0);
  const [valueDecimal, setValueDecimal] = React.useState(0);

  const refCirleMain = React.useRef();
  const refCirleSecondary = React.useRef();
  const backgroundCircleRef = React.useRef();

  useLayoutEffect(() => {
    var circleMain = refCirleMain.current;
    var circleSecondary = refCirleSecondary.current;

    setValueWhole(Number(value.toString().split(".")[0]));
    setValueDecimal(Math.round(Number(value.toString().split(".")[1])));

    var radiusMain = circleMain.r.baseVal.value;
    var radiusSecondary = circleSecondary.r.baseVal.value;

    var circumferenceMain = radiusMain * 2 * Math.PI;
    var circumferenceSecondary = radiusSecondary * 2 * Math.PI;

    circleMain.style.strokeDasharray = `${circumferenceMain} ${circumferenceMain}`;
    circleSecondary.style.strokeDasharray = `${circumferenceSecondary} ${circumferenceSecondary}`;
    backgroundCircleRef.current.style.strokeDasharray = `${circumferenceMain} ${circumferenceMain}`;

    circleMain.style.strokeDashoffset = `${circumferenceMain}`;
    circleSecondary.style.strokeDashoffset = `${circumferenceSecondary}`;

    const offsetMain =
      circumferenceMain - (valueWhole / 2 / 100) * circumferenceMain;
    const offsetGeneral = circumferenceMain - (50 / 100) * circumferenceMain;
    const offsetSecondary =
      circumferenceSecondary -
      ((valueDecimal * 10) / 2 / 100) * circumferenceSecondary;

    refCirleSecondary.current.style.strokeDashoffset = offsetSecondary;
    circleMain.style.strokeDashoffset = offsetMain;
    backgroundCircleRef.current.style.strokeDashoffset = offsetGeneral;
  }, [value, valueDecimal, valueWhole]);

  useEffect(() => {
    setSizeAndRadius((prev) => ({
      ...prev,
      cxMain: width / 2,
      cyMain: height / 2,
      radiusMain: width / 2 - strokeWidth,
    }));

    setSizeAndRadius((prev) => ({
      ...prev,
      widthSecondary: prev.radiusMain * 2,
      heightSecondary: prev.radiusMain * 2,
    }));

    setSizeAndRadius((prev) => ({
      ...prev,
      cxSecondary: prev.radiusMain,
      cySecondary: prev.radiusMain,
      radiusSecondary: prev.radiusMain - strokeWidth,
    }));

    console.log(sizeAndRadius);
  }, []);

  return (
    <>
      <div
        style={{
          width: width + "px",
        }}
        className="wrapper"
      >
        <svg className="progress-ring" width={width} height={height}>
          <circle
            ref={backgroundCircleRef}
            className="progress-ring__circle main"
            stroke="#efefef"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={sizeAndRadius.radiusMain}
            cx={sizeAndRadius.cxMain}
            cy={sizeAndRadius.cyMain}
          />
          <circle
            ref={refCirleMain}
            className="progress-ring__circle main"
            stroke={mainStrokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={sizeAndRadius.radiusMain}
            cx={sizeAndRadius.cxMain}
            cy={sizeAndRadius.cyMain}
          />
        </svg>
        <svg
          className="progress-ring"
          width={sizeAndRadius.widthSecondary}
          height={sizeAndRadius.heightSecondary}
        >
          <circle
            ref={refCirleSecondary}
            className="progress-ring__circle secondary"
            stroke={secondaryStrokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={sizeAndRadius.radiusSecondary}
            cx={sizeAndRadius.cxSecondary}
            cy={sizeAndRadius.cySecondary}
          />
        </svg>
        <div className="values">
          <div className="leading">
            <span className="value-main">0</span>
            <span className="value-sec">{valueDecimal * 10}</span>
          </div>
          <div className="center">
            <img alt="our logo" />
            <span className="value-actual">{valueWhole}</span>
          </div>
          <div className="ending">
            <span className="value-main">{valueDecimal * 10 + 1}</span>
            <span className="value-sec">100</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Arc;
