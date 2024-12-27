package com.qr

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.google.zxing.BarcodeFormat
import com.google.zxing.EncodeHintType
import com.google.zxing.WriterException
import com.google.zxing.qrcode.QRCodeWriter
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel
import android.graphics.Bitmap
import android.graphics.Bitmap.CompressFormat
import android.util.Base64
import java.io.ByteArrayOutputStream
import java.util.EnumMap

class QrModule internal constructor(context: ReactApplicationContext) :
  QrSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun generateQrCode(text: String, size: Int, promise:Promise) {
    try {
        val hints = EnumMap<EncodeHintType, Any>(EncodeHintType::class.java).apply {
            put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L)
            put(EncodeHintType.MARGIN, 1)
        }

        if (text.isEmpty()) {
            promise.reject("QR_ERROR", "Text cannot be empty")
            return
        }

        if (size <= 0) {
            promise.reject("QR_ERROR", "Invalid size")
            return
        }

        val qrCodeWriter = QRCodeWriter()
        val bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, size, size, hints)

        val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.RGB_565)
        for (x in 0 until size) {
            for (y in 0 until size) {
                bitmap.setPixel(x, y, if (bitMatrix.get(x, y)) android.graphics.Color.BLACK else android.graphics.Color.WHITE)
            }
        }

        val outputStream = ByteArrayOutputStream()
        if (!bitmap.compress(CompressFormat.PNG, 100, outputStream)) {
            promise.reject("QR_ERROR", "Failed to compress bitmap")
            return
        }

        val base64Code = Base64.encodeToString(outputStream.toByteArray(), Base64.DEFAULT)
        promise.resolve(base64Code)

    } catch (e: WriterException) {
        promise.reject("QR_ERROR", "Failed to generate QR code", e)
    } catch (e: Exception) {
        promise.reject("QR_ERROR", "Unknown error occurred", e)
    }
  }

  companion object {
    const val NAME = "Qr"
  }
}
