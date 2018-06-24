import { Transformer } from "../types"
import _ from "lodash"

export const compose = <T>(...transformers: Transformer<T>[]): Transformer<T> =>
  _.flowRight(transformers)

export const duplicate = <T>(transform: Transformer<T>): Transformer<T> => notes => 
  [...notes, ...transform(notes)]
