import {Collection, RomCollection} from '@/models/collection'

export const getCollectionType = (collection: Collection) => {
	if (collection.isSmart) {
		return RomCollection.SMART
	}
	return collection.isVirtual ? RomCollection.VIRTUAL : RomCollection.DEFAULT
}
