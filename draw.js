const minuteToSeconds = (minutes) => minutes * 60;

export const drawClockwork = () => {
    for (let second = 0; second < minuteToSeconds(60); second += minuteToSeconds(1)) {
      minute = second / 60;
      let angle = timeToAngle(second);
      textSize(32);
      fill(0);
      const l1 = coordsOffsetFromEdge(0, angle);
      const textPos = coordsOffsetFromEdge(-60, angle);
      let l2;
      if (minute % 5 === 0) {
        l2 = coordsOffsetFromEdge(30, angle);
        noStroke();
        textAlign(CENTER, CENTER);
        text(minute, textPos.x, textPos.y);
        strokeWeight(4);
      } else {
        l2 = coordsOffsetFromEdge(20, angle);
        strokeWeight(2);
      }
      strokeCap(SQUARE);
      stroke(0);
      line(l1.x, l1.y, l2.x, l2.y);
    }
  };