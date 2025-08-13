import { useTranslation } from 'react-i18next'

export default function FooterBellow() {
  const currentYears = new Date().getFullYear()
  const { t } = useTranslation('home')
  return (
    <div>
      <div className='flex items-center flex-wrap xl:flex-nowrap gap-2 justify-between py-10 border-t border-t-black/10'>
        <div>© {currentYears} ShopeeClone. Tất cả các quyền được bảo lưu.</div>
        <div className='flex items-center flex-wrap xl:flex-nowrap'>
          <div className=''>Quốc gia &amp; Khu vực:</div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.sg' className='jsGQO7 WfURpL'>
              Singapore
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.co.id' className='jsGQO7 WfURpL'>
              Indonesia
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.co.th' className='jsGQO7 WfURpL'>
              Thái Lan
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.com.my' className='jsGQO7 WfURpL'>
              Malaysia
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.vn' className='jsGQO7 WfURpL'>
              Việt Nam
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.ph' className='jsGQO7 WfURpL'>
              Philippines
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.com.br' className='jsGQO7 WfURpL'>
              Brazil
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.com.mx' className='jsGQO7 WfURpL'>
              México
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.com.co' className='jsGQO7 WfURpL'>
              Colombia
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.cl' className='jsGQO7 WfURpL'>
              Chile
            </a>
          </div>
          <div className='px-[5px] border-r-black/20 border-r-0.5 last:border-r-0'>
            <a href='https://shopee.tw' className='jsGQO7 WfURpL'>
              Đài Loan
            </a>
          </div>
        </div>
      </div>

      <div className='text-center py-10'>
        <div>
          <div className='flex items-center justify-center uppercase mb-10'>
            <div className='px-6.5 border-r-black/9 border-r last:border-r-0'>
              <a
                className='mG_GYE'
                href='https://help.shopee.vn/portal/article/77244'
              >
                <span>Chính sách bảo mật</span>
              </a>
            </div>
            <div className='px-6.5 border-r-black/9 border-r last:border-r-0'>
              <a
                className='mG_GYE'
                href='https://help.shopee.vn/portal/article/77245'
              >
                <span>Quy chế hoạt động</span>
              </a>
            </div>
            <div className='px-6.5 border-r-black/9 border-r last:border-r-0'>
              <a
                className='mG_GYE'
                href='https://help.shopee.vn/portal/article/77250'
              >
                <span>Chính sách vận chuyển</span>
              </a>
            </div>
            <div className='px-6.5 border-r-black/9 border-r last:border-r-0'>
              <a
                className='mG_GYE'
                href='https://help.shopee.vn/portal/article/77251'
              >
                <span>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</span>
              </a>
            </div>
          </div>
          <div className='H7KFRR'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=18375'
              className='e0BoGV'
            >
              <div className='footer-vn-background footer-vn-vn_registered_red-png sb1lXU' />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='http://online.gov.vn/HomePage/AppDisplay.aspx?DocId=29'
              className='e0BoGV'
            >
              <div className='footer-vn-background footer-vn-vn_registered_red-png sb1lXU' />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://shopee.vn/docs/170'
              className='e0BoGV'
            >
              <div className='footer-vn-background footer-vn-vn_no_fake_item-png cLHugm' />
            </a>
          </div>
          <div className='pKlpkv DA_qWT'>Công ty TNHH Shopee</div>
          <div className='pKlpkv'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
            Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng
            đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='pKlpkv'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên
            hệ: 024 73081221 (ext 4678)
          </div>
          <div className='pKlpkv'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch &amp; Đầu tư TP Hà Nội
            cấp lần đầu ngày 10/02/2015
          </div>
          <div className='pKlpkv'>
            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </div>
        </div>
        <div className='mt-4'>{t('general.disclaimer')}</div>
      </div>
    </div>
  )
}
