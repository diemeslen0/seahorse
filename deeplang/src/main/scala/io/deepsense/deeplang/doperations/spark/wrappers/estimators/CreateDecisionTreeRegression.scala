/**
 * Copyright 2016, deepsense.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.deepsense.deeplang.doperations.spark.wrappers.estimators

import io.deepsense.commons.utils.Version
import io.deepsense.deeplang.DOperation.Id
import io.deepsense.deeplang.documentation.SparkOperationDocumentation
import io.deepsense.deeplang.doperables.spark.wrappers.estimators.DecisionTreeRegression
import io.deepsense.deeplang.doperations.EstimatorAsFactory

class CreateDecisionTreeRegression
  extends EstimatorAsFactory[DecisionTreeRegression]
  with SparkOperationDocumentation {

  override val id: Id = "a88db4fb-695e-4f44-8435-4999ccde36de"
  override val name: String = "Decision Tree Regression"
  override val description: String =
    "Creates a decision tree regression. It supports both continuous and categorical features."

  override protected[this] val docsGuideLocation =
    Some("ml-classification-regression.html#decision-tree-regression")
  override val since: Version = Version(1, 1, 0)
}
