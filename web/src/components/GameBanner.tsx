interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount}: GameBannerProps) {
  return (
    <a href="" className="group relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 group-hover:border-b-4 group-hover:border-zinc-600">
        <strong className="font-bold text-white block">
          {title}
        </strong>

        <span className="text-zinc-300 text-sm block group-hover:text-white">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  )
}