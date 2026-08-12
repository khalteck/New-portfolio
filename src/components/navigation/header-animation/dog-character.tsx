import { forwardRef } from "react";

export const DogCharacter = forwardRef<SVGSVGElement>(function DogCharacter(_, ref) {
  return (
    <svg
      ref={ref}
      className="header-character header-dog"
      viewBox="0 0 30 19"
      aria-hidden="true"
      focusable="false"
      data-ui="header-dog"
      data-animal="dog"
    >
      <g className="header-character-figure" data-part="figure" data-header-motion>
        <g className="header-character-far" data-part="far-hind-leg" data-header-motion>
          <g data-part="far-hind-thigh" data-header-motion>
            <path
              className="header-dog-haunch"
              d="M6.45 8.65c1-.45 2.05.1 2.1 1.15l-1.15 4.1c-.35.65-1.2.7-1.6.1l-.3-2.35.95-3Z"
            />
            <g data-part="far-hind-hock" data-header-motion>
              <path className="header-dog-leg" d="m6.15 13.7 1.25 3.75" />
              <path className="header-dog-paw" d="M7.35 17.45H9" />
            </g>
          </g>
        </g>

        <g className="header-character-far" data-part="far-front-leg" data-header-motion>
          <g data-part="far-front-upper" data-header-motion>
            <path className="header-dog-leg" d="m18.45 8.3.25 5" />
            <g data-part="far-front-knee" data-header-motion>
              <path className="header-dog-leg" d="m18.7 13.3-.1 4.3" />
              <path className="header-dog-paw" d="M18.55 17.6h1.65" />
            </g>
          </g>
        </g>

        <g data-part="dog-body" data-header-motion>
          <path
            className="header-character-fill"
            d="M5.1 6.35c2.5-1.8 7.65-2.2 12.15-1.1 1.8.45 3.05 1.45 3.55 3.2l-1.85 3.15-3.15-1.5c-2.6-.35-4.45-.05-6.2 1.1l-3.2-.75-1.3-4.1Z"
          />
          <path
            className="header-character-detail"
            d="M9.4 6.2c2.6-.5 5.25-.4 7.45.35M9.6 11.15c1.3-1.55 2.25-2.05 3.7-2.25"
          />
          <path
            className="header-dog-chest"
            d="M17.1 5.45c2.65-.3 4.25 1.15 4.35 3.6l-1 4.15-2.7-.15.25-4.15-.9-3.45Z"
          />
        </g>

        <g data-part="dog-tail" data-header-motion>
          <path
            className="header-dog-tail"
            d="M5.95 6.35C3.35 5.35.8 5.2-1.9 5.85l-2.35-.7.8 1.5-1 1.7 2.75-.75c2.65-.25 5.05.7 7.65-.05v-1.2Z"
          />
        </g>

        <g className="header-dog-seated-hind" data-part="dog-seated-hind" data-header-motion>
          <path
            className="header-dog-seated-haunch header-character-far"
            d="M6.05 9.4c-1.8.85-2.75 3.15-2.15 5.45.3 1.2 1.25 2.05 2.5 2.15l2.35-.15-.05-1.4-1.8-.15c-.65-1.25-.15-2.85 1.2-4.25l-2.05-1.65Z"
          />
          <path className="header-dog-seated-paw header-character-far" d="M5.7 17h3.85" />
          <path
            className="header-dog-seated-haunch"
            d="M7.65 9.45c-1.95.95-2.85 3.45-2.05 5.8.4 1.25 1.45 2.05 2.8 2.15l2.65-.2-.1-1.55-2-.2c-.7-1.4-.15-3.05 1.35-4.55l-2.65-1.45Z"
          />
          <path className="header-dog-seated-paw" d="M7.5 17.4h4.2" />
        </g>

        <g data-part="near-hind-leg" data-header-motion>
          <g data-part="near-hind-thigh" data-header-motion>
            <path
              className="header-dog-haunch header-dog-haunch-near"
              d="M7.7 8.75c1.1-.45 2.2.15 2.25 1.25L8.7 14.25c-.4.65-1.3.65-1.7 0l-.3-2.4 1-3.1Z"
            />
            <g data-part="near-hind-hock" data-header-motion>
              <path className="header-dog-leg header-dog-leg-near" d="m7.35 14 1.35 3.65" />
              <path className="header-dog-paw header-dog-paw-near" d="M8.65 17.65h1.8" />
            </g>
          </g>
        </g>

        <g data-part="near-front-leg" data-header-motion>
          <g data-part="near-front-upper" data-header-motion>
            <path className="header-dog-leg header-dog-leg-near" d="m20.2 8.25.3 5.1" />
            <g data-part="near-front-knee" data-header-motion>
              <path className="header-dog-leg header-dog-leg-near" d="m20.5 13.35-.05 4.35" />
              <path className="header-dog-paw header-dog-paw-near" d="M20.4 17.7h1.85" />
            </g>
          </g>
        </g>

        <g data-part="dog-head" data-header-motion>
          <path
            className="header-character-fill"
            d="M19.35 5.45c.35-2.8 2.2-4.4 4.65-3.75 1.2.3 1.85 1.15 2.25 2.05l2.45 1.15c.6.3.65 1.05.1 1.4l-1.45.9c-.7 1.35-2.35 1.75-4.25 1.15l-2.75 1.55-1-4.45Z"
          />
          <path className="header-character-hair" d="m20.15 4.1-.55-3.45 3.3 1.2-2.75 2.25Z" />
          <path className="header-character-hair" d="m23.2 2.25 1.7-1.7.15 3.15-1.85-1.45Z" />
          <circle className="header-character-eye" cx="24.75" cy="4.15" r=".43" />
          <circle className="header-character-detail-fill" cx="28.7" cy="5.6" r=".62" />
        </g>
      </g>
    </svg>
  );
});
