/**
 * Copyright (c) 2015, CodiLime Inc.
 *
 * Owner: Witold Jedrzejewski
 */

package io.deepsense.deeplang.parameters.exceptions

case class TypeConversionException(source: Any, targetTypeName: String)
  extends ValidationException(s"Cannot convert ${source.getClass} to $targetTypeName.")