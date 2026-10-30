import { motion } from "framer-motion";
import { LOGO_NAV } from "@/lib/siteConfig";

/**
 * Medalhão 3D extrudado da logo.
 * @param {"nav"|"hero"} variant
 */
export default function LogoMedallion({
  variant = "nav",
  mouseRX,
  mouseRY,
  className = "",
  src = LOGO_NAV,
}) {
  const isNav = variant === "nav";
  const depth = isNav ? 12 : 22;
  const step = isNav ? 1.15 : 2.4;
  const layers = Array.from({ length: depth }, (_, i) => i);

  return (
    <div
      className={
        className ||
        (isNav
          ? "relative h-10 w-10 shrink-0"
          : "relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-sm lg:max-w-md")
      }
      style={{
        perspective: isNav ? 600 : 1600,
        perspectiveOrigin: "50% 45%",
      }}
    >
      {!isNav && <div className="pointer-events-none absolute inset-[8%] rounded-full bg-tiger/30 blur-3xl" aria-hidden />}
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          ...(mouseRX || mouseRY ? { rotateX: mouseRX, rotateY: mouseRY } : {}),
        }}
      >
        {!isNav && (
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-tiger/40"
            style={{ transform: "translateZ(-28px)" }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        )}

        <motion.div
          className={isNav ? "relative h-full w-full" : "relative h-[76%] w-[76%]"}
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: isNav ? [-36, 36, -36] : [-48, 48, -48],
            rotateX: isNav ? [10, -8, 10] : [14, -12, 14],
            y: isNav ? [0, -2, 0] : [0, -14, 0],
          }}
          transition={{ duration: isNav ? 6.5 : 8.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className={`absolute rounded-full bg-[#9a3412] ${isNav ? "-inset-px" : "-inset-[3px]"}`}
            style={{ transform: `translateZ(${-depth * step - 1}px)` }}
            aria-hidden
          />
          <span
            className="absolute inset-0 rounded-full bg-tiger"
            style={{ transform: `translateZ(${-depth * step}px)` }}
            aria-hidden
          />

          {layers.map((i) => {
            const t = i / (depth - 1);
            const isFront = i === 0;
            const brightness = isFront ? 1 : 0.18 + (1 - t) * 0.5;
            return (
              <img
                key={i}
                src={src}
                alt={isFront ? "Logo PA FIGHT TEAM" : ""}
                aria-hidden={!isFront}
                draggable={false}
                className="absolute inset-0 h-full w-full rounded-full object-cover"
                style={{
                  transform: `translateZ(${-i * step}px)`,
                  filter: isFront ? "none" : `brightness(${brightness}) saturate(0.9)`,
                  boxShadow: isFront
                    ? isNav
                      ? "0 4px 10px rgba(0,0,0,0.45)"
                      : "0 28px 55px rgba(0,0,0,0.6)"
                    : undefined,
                }}
              />
            );
          })}

          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ transform: "translateZ(2px)" }}
            animate={{
              background: [
                "linear-gradient(115deg, rgba(255,255,255,0.28) 0%, transparent 28%, transparent 70%, rgba(0,0,0,0.35) 100%)",
                "linear-gradient(220deg, rgba(255,255,255,0.2) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.4) 100%)",
                "linear-gradient(115deg, rgba(255,255,255,0.28) 0%, transparent 28%, transparent 70%, rgba(0,0,0,0.35) 100%)",
              ],
            }}
            transition={{ duration: isNav ? 6.5 : 8.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <span
            className={`pointer-events-none absolute inset-0 rounded-full ring-1 ring-tiger/60`}
            style={{ transform: "translateZ(3px)" }}
            aria-hidden
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
