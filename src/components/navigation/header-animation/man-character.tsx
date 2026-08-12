import { forwardRef } from "react";

export const ManCharacter = forwardRef<SVGSVGElement>(function ManCharacter(_, ref) {
  return (
    <svg
      ref={ref}
      className="header-character header-man"
      viewBox="0 0 15 42"
      aria-hidden="true"
      focusable="false"
      data-ui="header-man"
      data-profile="side"
    >
      <g className="header-character-figure" data-part="figure" data-header-motion>
        <g className="header-character-far" data-part="far-leg" data-header-motion>
          <g data-part="far-thigh" data-header-motion>
            <path
              className="header-man-trouser"
              d="M5.25 19.1c.7-.35 1.75-.3 2.4.15l.15 4.25-.3 6.35c-.7.45-1.75.45-2.45 0l-.5-6.2.7-4.55Z"
            />
            <g data-part="far-knee" data-header-motion>
              <circle className="header-man-knee-cap" cx="6.95" cy="29.45" r=".85" />
              <circle className="header-man-knee-seam" cx="6.25" cy="29.5" r=".52" />
              <g data-part="far-dangle" data-header-motion>
                <path
                  className="header-man-trouser"
                  d="M5.05 28.9c.7-.35 1.7-.35 2.4.05l.35 4.7-.95 6.15c-.65.4-1.55.35-2.1-.1l-.2-6 .5-4.8Z"
                />
                <g data-part="far-ankle" data-header-motion>
                  <path
                    className="header-character-shoe-fill"
                    d="M4.55 38.75h2.3l1.4 1.35c.2.35-.05.8-.5.8H4.6c-.55 0-.8-.4-.55-.85l.5-1.3Z"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>

        <g className="header-character-far" data-part="far-arm" data-header-motion>
          <g data-part="far-upper-arm" data-header-motion>
            <path className="header-man-arm" d="M6.05 10.1 5.35 16.6" />
            <g data-part="far-forearm" data-header-motion>
              <path className="header-man-arm" d="m5.35 16.6-.6 6.25" />
              <circle className="header-character-fill" cx="4.7" cy="23.2" r=".85" />
            </g>
          </g>
        </g>

        <g data-part="torso" data-header-motion>
          <path
            className="header-character-fill"
            d="M5.35 8.35c.85-.65 2.7-.7 3.65-.05l1.05 4.4-.45 7.45c-1.2.65-3.2.7-4.45.05l-.35-7.25.55-4.6Z"
          />
          <path className="header-character-detail" d="m5.8 9.1 1.55 1.65L8.65 9" />
        </g>

        <g data-part="pelvis" data-header-motion>
          <path
            className="header-man-trouser"
            d="M5.1 18.65c1.2-.65 3.45-.65 4.65 0l.4 2.75c-1.35.8-4.1.8-5.4 0l.35-2.75Z"
          />
          <path className="header-character-detail" d="M7.5 19v2.55" />
        </g>

        <g data-part="near-leg" data-header-motion>
          <g data-part="near-thigh" data-header-motion>
            <path
              className="header-man-trouser header-man-trouser-near"
              d="M7.4 19.2c.8-.4 1.9-.3 2.55.2l.15 4.2-.45 6.35c-.75.5-1.85.45-2.55-.05l-.4-6.25.7-4.45Z"
            />
            <g data-part="near-knee" data-header-motion>
              <circle
                className="header-man-knee-cap header-man-knee-cap-near"
                cx="9.05"
                cy="29.45"
                r="1.05"
              />
              <circle className="header-man-knee-seam" cx="8.25" cy="29.55" r=".58" />
              <g data-part="near-dangle" data-header-motion>
                <path
                  className="header-man-trouser header-man-trouser-near"
                  d="M7.1 29c.75-.4 1.8-.35 2.55.1l.25 4.55-.85 6.2c-.7.45-1.65.4-2.25-.1l-.2-6 .5-4.75Z"
                />
                <g data-part="near-ankle" data-header-motion>
                  <path
                    className="header-character-shoe-fill"
                    d="M6.6 38.8h2.45l1.55 1.25c.3.4.05.85-.45.85h-3.5c-.55 0-.8-.4-.55-.85l.5-1.25Z"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>

        <g data-part="near-arm" data-header-motion>
          <g data-part="near-upper-arm" data-header-motion>
            <path className="header-man-arm header-man-arm-near" d="M8.55 10.15 9.05 16.7" />
            <g data-part="near-forearm" data-header-motion>
              <path className="header-man-arm header-man-arm-near" d="m9.05 16.7.45 6.15" />
              <circle className="header-character-fill" cx="9.55" cy="23.2" r=".9" />
            </g>
          </g>
        </g>

        <g data-part="head" data-header-motion>
          <path
            className="header-character-fill"
            d="M5.25 2.2C6.15.35 9.3-.2 10.55 1.8c.55.85.5 1.7.65 2.2l1.25.85c.35.25.25.75-.15.9l-1.05.35c-.15 1.45-.85 2.3-2.05 2.55l-.1 1.15H6.05V8.35c-1.65-.85-2.15-4.05-.8-6.15Z"
          />
          <circle className="header-character-eye" cx="9.8" cy="3.45" r=".42" />
        </g>
      </g>
    </svg>
  );
});
