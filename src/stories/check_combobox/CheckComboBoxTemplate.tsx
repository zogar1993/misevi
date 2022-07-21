import React from 'react'
import CheckComboBox from 'components/CheckComboBox'
import type { ComboBoxProps } from 'components/inner_components/ComboBox'

export function Template({ ...args }: ComboBoxProps) {
  return <CheckComboBox {...args} />
}

export const items = [
  { code: 'apothecary', name: 'Apothecary' },
  { code: 'apostle', name: 'Apostle' },
  { code: 'hexer', name: 'Hexer' }
]

export const number_items = [
  { code: 0, name: 'Item 0' },
  { code: 1, name: 'Item 1' },
  { code: 2, name: 'Item 2' }
]

export const long_items = [
  { code: 'apothecary', name: 'Apothecary' },
  { code: 'apostle', name: 'Apostle' },
  { code: 'hexer', name: 'Hexer' },
  { code: 'satire', name: 'Satire' },
  { code: 'seer', name: 'Seer' },
  { code: 'trapper', name: 'Trapper' },
  { code: 'zoroastrian', name: 'Zoroastrian' }
]
