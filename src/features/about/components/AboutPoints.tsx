import {
  CompassToolIcon,
  ShieldCheckIcon,
  TrendUpIcon,
  UserFocusIcon,
} from "@phosphor-icons/react/dist/ssr";

type AboutPointsProps = { points: string[] };

// Paired with the dictionary's points by position.
const icons = [CompassToolIcon, UserFocusIcon, ShieldCheckIcon, TrendUpIcon];

export function AboutPoints({ points }: AboutPointsProps) {
  return (
    <ul data-reveal="0.2" className="flex flex-col">
      {points.map((point, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li
            key={point}
            className="flex items-center gap-4 border-b border-divider py-4 text-[14px] text-ink last:border-b-0"
          >
            <Icon aria-hidden className="size-5 flex-none text-brand" />
            {point}
          </li>
        );
      })}
    </ul>
  );
}
