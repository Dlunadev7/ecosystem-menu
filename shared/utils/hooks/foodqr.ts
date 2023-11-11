import { RequiredOptions } from 'qr-code-styling/lib/core/QROptions';

// {
//   type: "svg",
//   shape: 'square',
//   width: 300,
//   height: 300,
//   margin: 8,
//   data: "https://www.facebook.com/",
//   image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
//   qrOptions: {
//     typeNumber: 0,
//     mode: 'Byte',
//     errorCorrectionLevel: 'Q',
//   },
//   imageOptions: {
//     crossOrigin: "anonymous",
//     margin: 0,
//     hideBackgroundDots: true,
//     imageSize: .4,
//   },
//   dotsOptions: {
//       type: 'extra-rounded',
//       color: 'black',
//       // gradient?: Gradient,
//   },
//   cornersSquareOptions: {
//       type: 'dot',
//   },
//   cornersDotOptions: {
//       type: 'dot',
//   },
//   backgroundOptions: {
//       round: 19,
//       color: 'transparent',
//       // gradient?: Gradient,
//   },
// }

export async function GenerateQR(settings: RequiredOptions) {
  const { default: QRLibrary} = await import('qr-code-styling');
  return new QRLibrary(settings);
}