package com.qr

import com.facebook.react.bridge.ReactApplicationContext

abstract class QrSpec internal constructor(context: ReactApplicationContext) :
  NativeQrSpec(context) {
}
