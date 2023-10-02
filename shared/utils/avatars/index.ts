export const RandomAvatar = (slug: string) => `https://source.boringavatars.com/pixel/120/${slug}?colors=A69E9E,29221F,404545,AEB2B2,191919&square=true`;

export const GenerateAvatar = (prop: any, alt: string, conditional: any) => {
	if (!Boolean(conditional) || !prop.uri) return RandomAvatar(alt);
	return prop.uri;
}

/**
 * 
 * @todo Code to be Refactored, IDK WHAT THE HELL IS DOING
 */
export function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString}) as File;
}