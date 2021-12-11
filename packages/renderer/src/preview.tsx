import React from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import RemarkCode from './remark-code'
import remarkRehype from 'remark-rehype'
import rehypeMathjax from 'rehype-mathjax'
import rehypeReact from 'rehype-react'
import { defaultSchema } from 'rehype-sanitize'
import './preview.css'
import 'github-markdown-css/github-markdown.css'
import rehypeSanitize from 'rehype-sanitize'


interface Props {
    doc: string
}

const schema = {
    ...defaultSchema,
          attributes: {
            ...defaultSchema.attributes,
            code: [...(defaultSchema.attributes?.code || []), 'className'],
            div: [
              ...(defaultSchema.attributes.div || []),
              ['className', 'math', 'math-display']
            ],
            span: [
              ...(defaultSchema.attributes.span || []),
              ['className', 'math', 'math-inline']
            ]
          }
  }

const Preview: React.FC<Props> = (props) => {
    const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSanitize, schema)
    .use(rehypeMathjax)
    .use(rehypeReact, {
        createElement: React.createElement,
        components: {
            code: RemarkCode
        }
    })
    .processSync(props.doc)
    .result

    return <div className='preview markdown-body'>{md}</div>
}

export default Preview