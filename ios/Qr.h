#import "QrCodeUtil.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNQrSpec.h"

@interface Qr : NSObject <NativeQrSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Qr : NSObject <RCTBridgeModule>
#endif

@end
