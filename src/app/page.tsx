import MinimalTextbookInterface from '@/components/minimal-textbook'
import TextbookInterface from '@/components/TextbookInterface'
import ModernBookCatalog from '@/components/book-catalog-redesign'
import ModernBookCatalogDark from '@/components/book-catalog-redesign-dark'
import ModernTableOfContents from '@/components/modern-toc-light.tsx'
import ModernTableOfContentsDark from '@/components/modern-toc-dark.tsx'
import BlogPostDark from '@/components/futuristic-blog-dark.tsx'
import BlogPost from '@/components/futuristic-blog-light.tsx'


export default function Home() {
  return (
    <main>
      {/* <TextbookInterface /> */}
      {/* <ModernBookCatalog /> */}
      {/* <ModernBookCatalogDark /> */}
      {/* <MinimalTextbookInterface/> */}
      {/* <ModernTableOfContents/> */}
      {/* <ModernTableOfContentsDark/> */}
      {/* <BlogPostDark /> */}
      <BlogPost />
    </main>
  )
}