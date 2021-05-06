import React from "react"
import ItemsModal from "components/ItemsModal"

export function Template(args: any) {
  return <ItemsModal {...args}>{args.children}</ItemsModal>
}

