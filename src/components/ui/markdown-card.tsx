import {useEffect, useState} from 'react'
import ContentCard from './content-card'
import {marked} from 'marked'

export default function MarkdownCard({
	title,
	markdownData,
	className
}: {
	title: string
	markdownData: string
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
					style="color:#3B82F6;text-decoration:underline;"
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
		return null
	}

	return (
		<ContentCard title={title} className={className}>
			<div dangerouslySetInnerHTML={{__html: content}} />
		</ContentCard>
	)
}
