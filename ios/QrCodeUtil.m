//
//  GenerateQrCode.m
//  react-native-qr
//
//  Created by Orkun Karakuş
//

#import "QrCodeUtil.h"

@implementation QRCodeUtil

+ (UIImage *)generateQRCodeFromString:(NSString *)string withSize:(CGFloat)size {
    NSData *stringData = [string dataUsingEncoding:NSUTF8StringEncoding];

    CIFilter *filter = [CIFilter filterWithName:@"CIQRCodeGenerator"];
    [filter setValue:stringData forKey:@"inputMessage"];
    [filter setValue:@"H" forKey:@"inputCorrectionLevel"];

    CIImage *ciImage = filter.outputImage;

    CGFloat scaleX = size / ciImage.extent.size.width;
    CGFloat scaleY = size / ciImage.extent.size.height;
    CIImage *transformedImage = [ciImage imageByApplyingTransform:CGAffineTransformMakeScale(scaleX, scaleY)];

    UIImage *qrCodeImage = [UIImage imageWithCIImage:transformedImage];

    return qrCodeImage;
}

+ (NSString *)convertImageToBase64:(UIImage *)image {
    NSData *imageData = UIImagePNGRepresentation(image);
    NSString *base64String = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    return base64String;
}

@end
