"use client";

import { useClickBurst } from "./useClickBurst";

export default function ClickRipple() {
  const { bursts, remove } = useClickBurst();

  return (
    <>
      {bursts.map((burst) => (
        <div key={burst.id}>
          <div
            className="ripple"
            style={{ left: burst.x, top: burst.y }}
            onAnimationEnd={() => remove(burst.id)}
          />
          <div className="click-ring" style={{ left: burst.x, top: burst.y }} />
        </div>
      ))}
    </>
  );
}
