import React, {useEffect, useState} from 'react'
import {marked} from 'marked'
import HeroCard from './hero-card'
import clsx from 'clsx'

function MarkdownCard({
	id,
	title,
	markdownData,
	disableDialog,
	className
}: {
	id: string
	title: string
	markdownData: string
	disableDialog?: boolean
	className?: string
}) {
	const [content, setContent] = useState<string | null>(null)

	useEffect(() => {
		const parseMarkdown = async (data: string) => {
			const renderer = new marked.Renderer()
			renderer.link = ({href, title, text}: {href: string; title?: string | null; text: string}) => {
				const titleAttr = title ? ` title="${title}"` : ''
				return `<a 
					href="${href}"
					style="color:#3B82F6;text-decoration:underline"
					target="_blank" 
					rel="noopener noreferrer"${titleAttr}
				>${text}</a>`
			}
			const content = await marked.parse(data, {renderer, breaks: true, gfm: true})
			setContent(content)
		}

		parseMarkdown(markdownData)
	}, [markdownData])

	if (!content) {
		return <div>&nbsp;</div>
	}

	return (
		<HeroCard
			id={id}
			title={title}
			className={clsx(['break-words', className])}
			collapsedCardClassName='max-h-96'
			disableDialog={disableDialog}
			component={<div dangerouslySetInnerHTML={{__html: content}} />}
			dialogComponent={<div dangerouslySetInnerHTML={{__html: content}} />}
		/>
	)
}

export default React.memo(MarkdownCard)
