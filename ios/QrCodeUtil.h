//
//  QrCodeUtil.h
//  react-native-qr
//
//  Created by Orkun Karakuş
//

#ifndef QrCodeUtil_h
#define QrCodeUtil_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <CoreImage/CoreImage.h>

@interface QRCodeUtil : NSObject

+ (UIImage *)generateQRCodeFromString:(NSString *)string withSize:(CGFloat)size;
+ (NSString *)convertImageToBase64:(UIImage *)image;

@end

#endif /* QrCodeUtil_h */
