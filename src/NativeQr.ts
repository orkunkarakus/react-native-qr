import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
	generateQrCode(content: string, size: number): Promise<string | undefined>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Qr');
