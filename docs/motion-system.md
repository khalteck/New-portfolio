# Motion system

## Principles and ownership

Motion should make hierarchy, navigation, and state changes easier to read. It must never be the
only carrier of information or delay access to meaningful content.

- GSAP and ScrollTrigger own coordinated entrances and route layers.
- Lenis has one owner in `SmoothScrollProvider` and integrates with the GSAP ticker.
- Tailwind utilities own simple hover, focus, and underline states; root CSS owns shared preloader
  keyframes.
- `requestAnimationFrame` owns cursor interpolation, particles, progress, the homepage navigation
  mark, and project-preview pointer tracking.
- Each GSAP animation uses component refs or scoped selectors. `useGSAP` contexts revert on cleanup
  and on relevant route/preference updates.
- Server/prerendered markup contains the final content. Animation is progressive enhancement.

Preferred easings are `power2.out`, `power3.out`, and `power3.inOut`. Micro-interactions normally
last 150 to 350 ms, route transitions 600 to 800 ms, and scroll reveals 700 to 1100 ms. Transforms and
opacity are preferred to layout-affecting properties.

## Named animation inventory

| Animation                       | Trigger                                  | Timing/easing                                    | Properties and cleanup                                                                                                                   | Responsive behavior                                                           | Reduced-motion result                                              |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Animated KO preloader and exit  | First page load in a browser tab session | CSS stagger within a hard 2 s bound              | Letter `opacity/transform`, rule scale, overlay exit; timeout cleared on unmount and session flag stored                                 | Same visual where motion is allowed; never receives focus or blocks semantics | Not rendered; content is available immediately                     |
| Initial page wipe               | Initial routed render                    | About 700 ms, `power3.inOut`                     | Two fixed layers use `scaleX`; GSAP context reverts on route/preference update                                                           | Full viewport but pointer-inert                                               | Overlay remains absent                                             |
| Hero line masks                 | Home hero mount                          | 700 to 1000 ms, `power3.out`, short stagger      | Line wrappers reveal through `translateY/opacity`; component-scoped timeline reverts                                                     | Smaller travel and safe fluid type prevent clipping                           | Final lines render immediately                                     |
| Hero supporting-content stagger | After hero heading begins                | 600 to 900 ms, `power2.out`                      | Intro and CTAs use transform/opacity; scoped cleanup                                                                                     | Stagger is tightened on compact layouts                                       | Final content renders immediately                                  |
| Section dock navigation         | Fixed dock link activation               | Native smooth section scroll                     | Normal hash navigation focuses the destination and bypasses route-transition layers                                                      | Vertical desktop dock becomes a liquid-glass bottom bar                       | Immediate jump and destination focus                               |
| About copy reveal               | About blocks enter viewport              | 700 to 900 ms, `power3.out`                      | Block transform/opacity; scoped cleanup                                                                                                  | Stacked layout on small screens; no pointer dependency                        | Copy is immediately visible                                        |
| Technology item entrance        | Stack group enters viewport              | 700 to 900 ms with controlled stagger            | Item transform/opacity; scoped ScrollTrigger cleanup                                                                                     | Wrapped/staked groups use shorter travel                                      | Items render in final position                                     |
| Technology hover state          | Pointer hover or keyboard focus          | 150 to 250 ms CSS transition                     | Accent/rule/arrow transforms; no scripted lifecycle                                                                                      | Focus remains equivalent; touch receives stable presentation                  | State changes remain immediate or very short                       |
| Experience row reveal           | Each row enters viewport                 | About 900 ms, `power3.out`                       | Row transform/opacity; one-shot scoped trigger                                                                                           | Compact rows stack metadata before detail                                     | Rows are immediately readable                                      |
| Experience timeline progress    | Experience list crosses the viewport     | Scroll-scrubbed, linear                          | Accent rail fill uses vertical scale in a component-scoped ScrollTrigger that reverts on cleanup                                         | Rail and milestone nodes stay aligned with the compact number column          | The complete timeline remains visible without animation            |
| Project row title/metadata      | Hover or focus of a published row        | 150 to 350 ms CSS/GSAP                           | Title fill/outline, metadata offset, rule scale; state cleared on leave/blur                                                             | Mobile/touch uses stable filled title and inline image                        | Focus/hover state remains without movement                         |
| Project image-follow preview    | Fine-pointer hover on published project  | Per-frame eased tracking                         | Preview portal `translate3d/opacity`; animation frame and listeners removed on cleanup                                                   | Disabled below desktop and for coarse pointers; inline responsive picture     | Disabled; inline/focus-associated image provides the same identity |
| Magnetic CTA and arrow          | Fine-pointer movement over selected CTA  | 250 ms `power2.out`; 450 ms `power3.out` return  | CTA `x/y` and arrow transform; overwrite prevents queued tweens; returns to origin                                                       | Touch/coarse pointers receive a normal link                                   | No pointer tracking; normal link remains                           |
| Route entry layers              | React Router location key changes        | 700 ms plus 80 ms layer stagger, `power3.inOut`  | Opaque fixed layers contract with `scaleX`; timeline reverts on the next location                                                        | Full viewport and pointer-inert                                               | No wipe; new route appears immediately                             |
| Route exit handoff              | Navigation initiates a location change   | No artificial navigation delay                   | The next route mounts before its entry layers uncover it; links/history remain native                                                    | Same route correctness on touch/mobile                                        | Immediate browser navigation                                       |
| Scroll progress                 | Scroll/resize                            | One animation frame per update                   | Vertical fill `scaleY`; frame is cancelled on unmount                                                                                    | Desktop-only rail; omitted on narrow screens                                  | May remain as a non-animated positional indicator or be omitted    |
| Homepage KO illustration morph  | Homepage scroll position                 | One animation frame per scroll/resize update     | KO and five inline-SVG drawings crossfade and transform directly from scroll position; listeners and queued frame are removed on cleanup | Compact fixed-header mark on desktop and mobile; no autonomous playback       | KO remains visible and does not morph                              |
| Custom cursor follow            | Fine-pointer move at desktop width       | Next-frame pointer position                      | `translate3d` plus contextual data state; frame, listeners, and class removed on cleanup                                                 | Not rendered under 1024 px or on coarse pointers                              | Not rendered; native cursor remains                                |
| Particle ambience               | Page mount                               | Continuous linear fall at 28 to 50 pixels/second | Canvas dots recycle above the viewport; resize, visibility, and animation frames are cleaned up                                          | Lower mobile density and capped device-pixel ratio                            | Static particle field remains visible                              |

There is no about portrait/media animation because the design is intentionally type-led and does
not publish a profile image.

## Reduced motion

`useReducedMotion` reflects `prefers-reduced-motion: reduce` and updates when the media query
changes. Under that preference:

- Lenis is not initialized and native scrolling remains in control;
- the delayed preloader is skipped;
- GSAP reveal and page-layer timelines do not run;
- the custom cursor, particles, pointer-follow preview, parallax, and magnetic response are absent;
- the homepage navigation mark remains as the static KO initials;
- content is never hidden waiting for a ScrollTrigger; and
- CSS animation/transition duration is reduced globally except for any essential focus feedback.

Reduced motion is a complete mode, not a slower version of the cinematic experience. Keyboard and
touch access must expose every project and action without relying on an animation state.

## Responsive and input behavior

- Fine pointer + desktop: custom cursor, project hover portal, progress rail, sticky email, subtle
  particles, and magnetic response may run.
- Keyboard: a focused published project anchors its preview rather than following a pointer;
  visible focus and link text remain the primary affordances.
- Coarse pointer/touch: project images render inline; custom cursor and hover emulation are absent.
- Mobile/tablet: section order and content are unchanged, travel distances are shortened, and no
  fixed visual may obstruct a 44 × 44 CSS pixel target.
- Hidden tab: Lenis and particle work pause. Route content and native navigation do not depend on
  those loops.

## Lifecycle checklist

When adding or changing motion:

1. render the meaningful final state before JavaScript;
2. select only through a component ref or explicit data attribute;
3. use `useGSAP` context or remove every listener, frame, timeout, and ticker manually;
4. test React Strict Mode for duplicate timelines;
5. test route changes, browser back/forward, font/layout changes, and component unmount;
6. define keyboard, touch, constrained-device, and reduced-motion outcomes in this document; and
7. animate only transforms/opacity unless a measured reason requires otherwise.
