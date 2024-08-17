import metaData from './data/metadata.json'
import type { Metadata } from './types'

export * from './services/province'
export * from './services/district'
export * from './services/subdistrict'
export * from './services/postal-code'
export * from './utils/criteria-matcher'

export * from './types'
export const metadata: Metadata = metaData
