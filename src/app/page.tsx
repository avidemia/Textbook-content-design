import MinimalTextbookInterface from '@/components/minimal-textbook'
import TextbookInterface from '@/components/TextbookInterface'
import ModernBookCatalog from '@/components/book-catalog-redesign'
import ModernBookCatalogDark from '@/components/book-catalog-redesign-dark'

export default function Home() {
  return (
    <main>
      {/* <TextbookInterface /> */}
      <ModernBookCatalog />
      {/* <ModernBookCatalogDark /> */}
      {/* <MinimalTextbookInterface/> */}
    </main>
  )
}