import FooterAbove from './FooterAbove'
import FooterBellow from './FooterBellow'
interface Props {
  children?: React.ReactNode
}
export default function Footer({ children }: Props) {
  return (
    <footer className='pt-top50 bg-neutral-100'>
      <div className='container max-w-container mx-auto'>
        <FooterAbove />
        <FooterBellow />
      </div>
    </footer>
  )
}