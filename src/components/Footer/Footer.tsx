import FooterAbove from './FooterAbove'
import FooterBellow from './FooterBellow'
// interface Props {
//   children?: React.ReactNode
// }
export default function Footer() {
  return (
    <footer className='pt-top50 bg-neutral-100 text-black/54 text-sm'>
      <div className='container xl:px-0'>
        <FooterAbove />
        <FooterBellow />
      </div>
    </footer>
  )
}
