import styles from './Footer.module.scss'

export default function FooterAbove() {
  return (
    <div className='grid grid-cols-5'>
      <div className='text-xs '>
        <div className={styles.title}>CHĂM SÓC KHÁCH HÀNG</div>
        <ul className='text-gray-600'>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Trung Tâm Trợ Giúp</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://shopee.vn/blog/'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Shopee Blog</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/79090-[Th%C3%A0nh-vi%C3%AAn-m%E1%BB%9Bi]-Shopee-Mall-l%C3%A0-g%C3%AC?previousPage=search%20recommendation%20bar'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Shopee Mall</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/79180-[Th%c3%a0nh-vi%c3%aan-m%e1%bb%9bi]-L%c3%a0m-sao-%c4%91%e1%bb%83-mua-h%c3%a0ng-%2F-%c4%91%e1%ba%b7t-h%c3%a0ng-tr%c3%aan-%e1%bb%a9ng-d%e1%bb%a5ng-Shopee%3F'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Hướng Dẫn Mua Hàng</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://banhang.shopee.vn/edu/article/13243/ban-hang-online-bat-dau-tu-dau'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Hướng Dẫn Bán Hàng</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/category/59-Thanh-To%C3%A1n/708-V%C3%AD-ShopeePay?page=1'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Thanh Toán</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/79144-[Shopee-Xu]-C%c3%a1c-c%c3%a2u-h%e1%bb%8fi-th%c6%b0%e1%bb%9dng-g%e1%ba%b7p'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Shopee Xu</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/category/60-%C4%90%C6%A1n-H%C3%A0ng-V%E1%BA%ADn-Chuy%E1%BB%83n/703-%C4%90%C6%A1n-h%C3%A0ng?page=1'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Vận Chuyển</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/79258-Tr%e1%ba%a3-h%c3%a0ng%2FHo%c3%a0n-ti%e1%bb%81n]-C%e1%ba%a9m-nang-Tr%e1%ba%a3-h%c3%a0ng-ho%c3%a0n-ti%e1%bb%81n'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Trả Hàng &amp; Hoàn Tiền</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/79191-%5BD%E1%BB%8Bch-v%E1%BB%A5%5D-L%C3%A0m-sao-%C4%91%E1%BB%83-li%C3%AAn-h%E1%BB%87-Ch%C4%83m-s%C3%B3c-Kh%C3%A1ch-h%C3%A0ng'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Chăm Sóc Khách Hàng</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/79046-[Quy-%c4%91%e1%bb%8bnh]-Ch%c3%adnh-s%c3%a1ch-b%e1%ba%a3o-h%c3%a0nh-cho-s%e1%ba%a3n-ph%e1%ba%a9m-mua-t%e1%ba%a1i-Shopee'
              className='text-gray-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Chính Sách Bảo Hành</span>
            </a>
          </li>
        </ul>
      </div>
      <div className='text-xs '>
        <div className={styles.title}>VỀ SHOPEE</div>
        <ul className='text-gray-600'>
          <li className={styles.listItem}>
            <a
              href='https://careers.shopee.vn/about'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Giới Thiệu Về Shopee Việt Nam</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://careers.shopee.vn/jobs'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Tuyển Dụng</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/77242'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Điều Khoản Shopee</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://help.shopee.vn/portal/article/77244'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Chính Sách Bảo Mật</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://shopee.vn/mall/'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Chính Hãng</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://banhang.shopee.vn/'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Kênh Người Bán</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://shopee.vn/flash_sale/'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Flash Sales</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://shopee.vn/affiliate/'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>
                Chương Trình Tiếp Thị Liên Kết Shopee
              </span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='mailto:media.vn%40shopee.com'
              className='C0sjnV'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='DMQMn2'>Liên Hệ Với Truyền Thông</span>
            </a>
          </li>
        </ul>
      </div>
      <div className='text-xs'>
        <div className={styles.title}>THANH TOÁN</div>
        <ul className='flex flex-wrap mb-4'>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492'
                alt='logo'
              />
            </a>
          </li>
        </ul>
        <div className={styles.title}>ĐƠN VỊ VẬN CHUYỂN</div>
        <ul className='flex flex-wrap mb-4'>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6'
                alt='logo'
              />
            </a>
          </li>
          <li className={styles.listItemImage}>
            <a
              href='/#'
              target='_blank'
              rel='noopener noreferrer'
              className='nW3cn4'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/vn-50009109-ec3ae587db6309b791b78eb8af6793fd'
                alt='logo'
              />
            </a>
          </li>
        </ul>
      </div>
      <div className='text-xs'>
        <div className={styles.title}>THEO DÕI CHÚNG TÔI TRÊN</div>
        <ul>
          <li className={styles.listItem}>
            <a
              href='https://www.facebook.com/ShopeeVN'
              className='flex gap-x-2'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                alt='logo'
                className='IlIvTm'
                src='https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5'
              />
              <span className='DMQMn2'>Facebook</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://instagram.com/Shopee_VN'
              className='flex gap-x-2'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                alt='logo'
                className='IlIvTm'
                src='https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91'
              />
              <span className='DMQMn2'>Instagram</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              href='https://www.linkedin.com/company/shopee'
              className='flex gap-x-2'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                alt='logo'
                className='IlIvTm'
                src='https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a'
              />
              <span className='DMQMn2'>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
      <div className='text-xs'>
        <div className={styles.title}>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</div>
        <div className='flex'>
          <a
            href='https://shopee.vn/web'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472'
              alt='download_qr_code'
              className='bg-white rounded-sm shadow-sm h-20 mr-3 p-1 mb-2 w-20'
            />
          </a>
          <div className='text-sm'>
            <a
              href='https://shopee.vn/web'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-sm shadow-sm h-4 p-1 mb-2 w-68 flex justify-center items-center'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163'
                alt='app'
              />
            </a>
            <a
              href='https://shopee.vn/web'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-sm shadow-sm h-4 p-1 mb-2 w-68 flex justify-center items-center'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def'
                alt='app'
              />
            </a>
            <a
              href='https://shopee.vn/web'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-sm shadow-sm h-4 p-1  w-68 flex justify-center items-center'
            >
              <img
                src='https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0'
                alt='app'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
