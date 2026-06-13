/**
 * SETUP LOCAL INTERFACE
 */
interface Props {
  fill: keyof typeof fills
}

const fills = {
  white: 'white',
  primary: 'rgb(255, 228, 48)',
  default: '#d9d9d9',
}

export default function Hole({ fill }: Props) {
  const fillColor = fills[fill]
  return (
    <div className="relative h-8 w-8">
      {/* Background (shows through the hole) */}
      <div className="absolute inset-0 bg-cover bg-center" />

      {/* Mask layer */}
      <svg viewBox="0 0 128 128" className="absolute inset-0 h-full w-full">
        <defs>
          <mask id="holeMask">
            {/* Visible area */}
            <rect width="100%" height="100%" fill={fillColor} />

            {/* Single hole */}
            <circle cx="64" cy="64" r="30" fill="black" />
          </mask>
        </defs>

        {/* Foreground (the layer with hole) */}
        <rect width="100%" height="100%" fill={fillColor} mask="url(#holeMask)" />
      </svg>
    </div>
  )
}
