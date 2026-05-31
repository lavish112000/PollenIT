export default function SectionHeader({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl text-left'
      }
    >
      <p className="mb-3 text-sm font-black uppercase text-ember">
        {eyebrow}
      </p>
      <h2 className="fluid-title text-balance font-black text-white">{title}</h2>
      {copy && <p className="fluid-body mt-5 text-white/68">{copy}</p>}
    </div>
  );
}
