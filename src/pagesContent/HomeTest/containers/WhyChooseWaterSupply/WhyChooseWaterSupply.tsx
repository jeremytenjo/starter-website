import React from 'react'

import WhyChooseWaterSupplyUi, {
  type WhyChooseWaterSupplyUiProps,
} from './WhyChooseWaterSupplyUi/WhyChooseWaterSupply.ui'

export default function WhyChooseWaterSupply() {
  const uiProps: WhyChooseWaterSupplyUiProps = {
    title: 'WhyChooseWaterSupply',
  }

  return <WhyChooseWaterSupplyUi {...uiProps} />
}
