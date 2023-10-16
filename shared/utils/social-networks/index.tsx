import { SocialNetworks } from "@ecosystem-ar/sdk";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandTwitter, IconFloatNone } from "@tabler/icons-react";

/**
 * @todo add the complete social network list
 */
export function SocialNetworkIcon(network: SocialNetworks, size: number) {
  let Icon;
  
  switch (network) {
    case SocialNetworks.FACEBOOK:
      Icon = IconBrandFacebook;
      break;
    case SocialNetworks.TIKTOK:
      Icon = IconBrandTiktok;
      break;
    case SocialNetworks.TWITTER:
      Icon = IconBrandTwitter;
      break;
    case SocialNetworks.INSTAGRAM:
      Icon = IconBrandInstagram;
      break;
    default:
      Icon = IconFloatNone;
      break;
  }

  return <Icon size={size} stroke={1} />;
}