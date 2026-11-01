import logoForLight from "@/assets/Elektiger-Logo-Paket-v1/02_Web/Elektiger_Logo_Web_600.webp";
import logoForDark from "@/assets/Elektiger-Logo-Paket-v1/02_Web/Elektiger_Logo_Hell_fuer_dunklen_Hintergrund.png";
import { SITE_NAME } from "@/data/brand";

type BrandLogoProps = {
  className?: string;
  heightClass?: string;
  loading?: "eager" | "lazy";
};

const BrandLogo = ({
  className = "",
  heightClass = "h-14",
  loading = "lazy",
}: BrandLogoProps) => (
  <span className={`inline-flex items-center ${className}`}>
    <img
      src={logoForLight}
      alt={`${SITE_NAME} Logo`}
      width={600}
      height={400}
      className={`${heightClass} w-auto dark:hidden`}
      loading={loading}
      decoding="async"
    />
    <img
      src={logoForDark}
      alt={`${SITE_NAME} Logo`}
      width={1536}
      height={1024}
      className={`${heightClass} hidden w-auto dark:block`}
      loading={loading}
      decoding="async"
    />
  </span>
);

export default BrandLogo;
