/* eslint-disable import/prefer-default-export */
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
	`The package 'react-native-qr' doesn't seem to be linked. Make sure: \n\n${Platform.select(
		{ ios: "- You have run 'pod install'\n", default: '' }
	)}- You rebuilt the app after installing the package\n` +
	`- You are not using Expo Go\n`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const QrModule = isTurboModuleEnabled
	? // eslint-disable-next-line @typescript-eslint/no-var-requires
	  require('./NativeQr').default
	: NativeModules.Qr;

const Qr =
	QrModule ||
	new Proxy(
		{},
		{
			get() {
				throw new Error(LINKING_ERROR);
			}
		}
	);

export async function generateQrCode(
	content: string,
	size: number = 200
): Promise<string | undefined> {
	const base64 = await Qr.generateQrCode(content, size);

	if (!base64) {
		return undefined;
	}

	return `data:image/png;base64,${base64}`;
}
