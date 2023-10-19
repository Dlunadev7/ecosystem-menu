import { SocialNetworks } from "@ecosystem-ar/sdk";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandPinterest, IconBrandReddit, IconBrandSnapchat, IconBrandTelegram, IconBrandTiktok, IconBrandTwitter, IconBrandWhatsapp, IconBrandYoutube, IconFloatNone } from "@tabler/icons-react";

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
    case SocialNetworks.YOUTUBE:
      Icon = IconBrandYoutube;
      break;
    case SocialNetworks.WHATSAPP:
      Icon = IconBrandWhatsapp;
      break;
    case SocialNetworks.TELEGRAM:
      Icon = IconBrandTelegram;
      break;
    case SocialNetworks.SNAPCHAT:
      Icon = IconBrandSnapchat;
      break;
    case SocialNetworks.PINTEREST:
      Icon = IconBrandPinterest;
      break;
    case SocialNetworks.LINKEDIN:
      Icon = IconBrandLinkedin;
      break;
    case SocialNetworks.REDDIT:
      Icon = IconBrandReddit;
      break;
    default:
      Icon = IconFloatNone;
      break;
  }

  return <Icon size={size} stroke={1} />;
}