import { SocialNetworks } from "@ecosystem-ar/sdk";

export function getSocialNetworkByURL(url: string) {
    
  const expresionesRegulares: Record<SocialNetworks, RegExp> = {
    [SocialNetworks.FACEBOOK]: /facebook\.com/i,
    [SocialNetworks.TWITTER]: /twitter\.com/i,
    [SocialNetworks.INSTAGRAM]: /instagram\.com/i,
    [SocialNetworks.YOUTUBE]: /youtube\.com/i,
    [SocialNetworks.WHATSAPP]: /whatsapp\.com/i,
    [SocialNetworks.TELEGRAM]: /telegram\.org/i,
    [SocialNetworks.TIKTOK]: /tiktok\.com/i,
    [SocialNetworks.PINTEREST]: /pinterest\.com/i,
    [SocialNetworks.SNAPCHAT]: /snapchat\.com/i,
    [SocialNetworks.LINKEDIN]: /linkedin\.com/i,
    [SocialNetworks.REDDIT]: /reddit\.com/i,
  };

  for (const redSocial in expresionesRegulares) {
    if (expresionesRegulares[redSocial as SocialNetworks].test(url)) {
      return redSocial;
    }
  }
  
  return "Desconocido";
}