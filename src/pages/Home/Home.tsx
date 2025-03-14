import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function Home({ children }: Props) {
  return (
    <>
      <Header />
      <main className='py-6 container'>{children}</main>
      <Footer />
    </>
  )
}
