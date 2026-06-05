import type { ListingsValue } from "./listings.type"

export type TCompareList = Array<TCompareItem | "empty">

export type TCompareItem = {
  property: ListingsValue
}
