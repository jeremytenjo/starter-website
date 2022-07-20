import React from 'react'

import ChildofReasonslistUi, {
  type ChildofReasonslistUiProps,
} from './ChildofReasonslistUi/ChildofReasonslist.ui'

export default function ChildofReasonslist() {
  const uiProps: ChildofReasonslistUiProps = {
    title: 'ChildofReasonslist',
  }

  return <ChildofReasonslistUi {...uiProps} />
}
