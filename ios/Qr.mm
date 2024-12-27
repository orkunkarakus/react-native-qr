#import "Qr.h"

@implementation Qr
RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(generateQrCode:(NSString *)inputString withSize:(CGFloat)size resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    UIImage *qrCodeImage = [QRCodeUtil generateQRCodeFromString:inputString withSize:size];

    if (qrCodeImage && qrCodeImage.size.width > 0) {
        NSString *base64String = [QRCodeUtil convertImageToBase64:qrCodeImage];
        if (base64String) {
            resolve(base64String);
            return;
        }
    }

    NSError *error = [NSError errorWithDomain:@"QRCodeBridge" code:500 userInfo:nil];
    reject(@"no_qrcode", @"Could not generate QR code", error);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeQrSpecJSI>(params);
}
#endif

@end
