const OFFERS = [
  'Super Saver Deal — AED 50 off your first order',
  'Free UAE delivery on orders over AED 200',
  'Buy 3, Pay for 2 on selected fragrances',
  'Easy 15-day returns across the Emirates',
]

export function AnnouncementBar() {
  const track = [...OFFERS, ...OFFERS]
  return (
    <div className="overflow-hidden bg-ink py-2 text-white">
      <div className="flex w-max animate-marquee items-center [animation-duration:30s]">
        {track.map((o, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-white/85">
            {o}
            <span className="mx-6 text-gold">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
