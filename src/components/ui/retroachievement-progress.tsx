import {Progress} from '@/components/ui/progress'

export default function RetroachievementProgress({value}: {value: number}) {
	return <Progress value={value} className={'!bg-[#644F10] h-1'} indicatorClassName={'!bg-[#D97706]'} />
}
